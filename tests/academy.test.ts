import { after, beforeEach, test } from 'node:test';
import assert from 'node:assert/strict';
import { login, provisionUser } from '../src/lib/auth.ts';
import { db, exportMember, getUser, requestDeletion, resolveDeletionRequest } from '../src/lib/db.ts';
import { getAcademyCourse, getMemberLearning, getMemberLesson, getPreviewLesson, listAcademyCourses } from '../src/lib/academy.ts';
import { seedAcademyCourses } from '../src/lib/academy-seed.ts';
import { POST as enroll } from '../src/app/api/member/academy/enroll/route.ts';
import { POST as complete } from '../src/app/api/member/academy/complete/route.ts';

process.env.HMB_DATABASE_PATH = ':memory:';
const origin = 'https://hmb.example.test';
process.env.HMB_ORIGIN = origin;
const database = db();
beforeEach(() => { database.exec('DELETE FROM academy_courses'); });
after(() => database.close());

function account(name: string, role: 'member' | 'admin' = 'member') {
  const email = name + '@example.test';
  const password = 'test-only-password';
  const id = provisionUser({ name, email, password, role });
  return { user: getUser(id)!, token: login(email, password).token };
}

function request(path: string, payload: object, token?: string, source = origin) {
  return new Request(origin + '/api/member/academy/' + path, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', origin: source, cookie: 'hmb_session=' + (token || '') },
    body: JSON.stringify(payload),
  });
}

test('academy migrates empty, seeds atomically and preserves edited courses on repeat', () => {
  assert.equal(database.prepare('PRAGMA user_version').get()?.user_version, 3);
  assert.deepEqual(listAcademyCourses(), []);
  database.exec(`CREATE TEMP TRIGGER interrupt_seed BEFORE INSERT ON academy_lessons
    WHEN NEW.course_slug='risk-workshop' BEGIN SELECT RAISE(ABORT, 'interrupted'); END;`);
  assert.throws(seedAcademyCourses, /interrupted/);
  assert.deepEqual(listAcademyCourses(), []);
  database.exec('DROP TRIGGER interrupt_seed');
  assert.equal(seedAcademyCourses(), 3);
  const courses = listAcademyCourses();
  assert.deepEqual(courses.map(course => course.slug), ['decision-journal', 'risk-workshop', 'trading-plan']);
  for (const course of courses) {
    const lessons = course.modules.flatMap(module => module.lessons);
    assert.equal(lessons.length, 4);
    assert.equal(course.minutes, lessons.reduce((minutes, lesson) => minutes + lesson.minutes, 0));
    assert.equal(lessons.filter(lesson => lesson.isPreview).length, 1);
    for (const lesson of lessons) {
      assert.equal('body' in lesson || 'exercise' in lesson, false);
      const preview = getPreviewLesson(course.slug, lesson.slug);
      assert.equal(Boolean(preview?.body && preview.exercise), lesson.isPreview);
    }
  }
  database.prepare('UPDATE academy_courses SET title=? WHERE slug=?').run('Edited course', 'risk-workshop');
  database.prepare('UPDATE academy_lessons SET title=? WHERE course_slug=? AND slug=?').run('Edited lesson', 'risk-workshop', 'two-paths');
  assert.equal(seedAcademyCourses(), 0);
  assert.equal(getAcademyCourse('risk-workshop')?.title, 'Edited course');
  assert.equal(getPreviewLesson('risk-workshop', 'two-paths')?.title, 'Edited lesson');
});

test('enrollment and completion bind to a signed-in member, survive retries and drive resume', async () => {
  seedAcademyCourses();
  const { user, token } = account('learner');
  const other = account('other');
  const staff = account('staff', 'admin');
  const courseSlug = 'decision-journal';
  const lessonSlug = 'observation';
  const lesson = { courseSlug, lessonSlug };

  assert.equal((await enroll(request('enroll', { courseSlug }))).status, 401);
  assert.equal((await enroll(request('enroll', { courseSlug }, token, 'https://other.example'))).status, 403);
  assert.equal((await enroll(request('enroll', { courseSlug }, staff.token))).status, 403);
  assert.equal((await enroll(request('enroll', { courseSlug, userId: other.user.id }, token))).status, 400);
  assert.equal((await complete(request('complete', lesson, token))).status, 404);
  assert.equal((await enroll(request('enroll', { courseSlug }, token))).status, 200);
  const [initial] = getMemberLearning(user);
  assert.equal(initial.nextLessonSlug, lessonSlug);
  assert.equal(initial.completedCount, 0);
  assert.ok(getMemberLesson(user, courseSlug, 'before-decision')?.body);
  assert.equal(getMemberLesson(other.user, courseSlug, 'before-decision'), null);
  assert.equal((await complete(request('complete', lesson, other.token))).status, 404);
  assert.equal((await complete(request('complete', { ...lesson, lessonSlug: 'two-paths' }, token))).status, 404);
  assert.equal((await complete(request('complete', lesson, token))).status, 200);
  const [first] = getMemberLearning(user);
  assert.equal(first.nextLessonSlug, 'before-decision');
  assert.equal(first.completedCount, 1);
  await Promise.all([enroll(request('enroll', { courseSlug }, token)), complete(request('complete', lesson, token))]);
  assert.deepEqual(getMemberLearning(user)[0], first);
  assert.deepEqual(getMemberLearning(other.user), []);
  for (const module of first.modules) {
    for (const item of module.lessons) {
      await complete(request('complete', { courseSlug, lessonSlug: item.slug }, token));
    }
  }
  assert.equal(getMemberLearning(user)[0].nextLessonSlug, null);
  assert.equal(getMemberLearning(user)[0].completedCount, 4);

  database.prepare('UPDATE academy_enrollments SET active=0 WHERE user_id=?').run(user.id);
  assert.equal((await enroll(request('enroll', { courseSlug }, token))).status, 403);
  assert.equal((await complete(request('complete', lesson, token))).status, 404);
  assert.deepEqual(getMemberLearning(user), []);
  assert.equal(getMemberLesson(user, courseSlug, lessonSlug), null);
  database.prepare('UPDATE users SET active=0 WHERE id=?').run(user.id);
  assert.equal((await enroll(request('enroll', { courseSlug }, token))).status, 403);
});

test('unpublished courses and non-sample enrollments require separate access', async () => {
  seedAcademyCourses();
  const { user, token } = account('access');
  const courseSlug = 'risk-workshop';
  database.prepare('UPDATE academy_courses SET is_sample=0 WHERE slug=?').run(courseSlug);
  assert.equal((await enroll(request('enroll', { courseSlug }, token))).status, 404);
  database.prepare('INSERT INTO academy_enrollments(user_id,course_slug,enrolled_at) VALUES(?,?,?)')
    .run(user.id, courseSlug, new Date().toISOString());
  assert.ok(getMemberLesson(user, courseSlug, 'invalidation'));
  database.prepare('UPDATE academy_courses SET published=0 WHERE slug=?').run(courseSlug);
  assert.equal(getAcademyCourse(courseSlug), null);
  assert.equal(getPreviewLesson(courseSlug, 'two-paths'), null);
  assert.equal(getMemberLesson(user, courseSlug, 'invalidation'), null);
  assert.deepEqual(getMemberLearning(user), []);
  assert.equal((await complete(request('complete', { courseSlug, lessonSlug: 'invalidation' }, token))).status, 404);
});

test('export and fulfilled erasure include only the requesting member’s learning data', async () => {
  seedAcademyCourses();
  const owner = account('erase');
  const peer = account('keep');
  const admin = account('privacy-admin', 'admin');
  const courseSlug = 'decision-journal';
  const lessonSlug = 'observation';
  for (const {token} of [owner, peer]) {
    await enroll(request('enroll', { courseSlug }, token));
    await complete(request('complete', { courseSlug, lessonSlug }, token));
  }
  const snapshot = exportMember(owner.user);
  assert.equal(snapshot.learning.enrollments.length, 1);
  assert.equal(snapshot.learning.completions.length, 1);
  assert.equal(snapshot.learning.completions[0].lessonSlug, lessonSlug);
  resolveDeletionRequest(admin.user, requestDeletion(owner.user, '').reference, 'fulfill');
  assert.deepEqual(exportMember(getUser(owner.user.id)!).learning, { enrollments: [], completions: [] });
  assert.equal((await complete(request('complete', { courseSlug, lessonSlug }, owner.token))).status, 401);
  assert.equal(getMemberLearning(peer.user)[0].completedCount, 1);
  assert.deepEqual(database.prepare('PRAGMA foreign_key_check').all(), []);
});

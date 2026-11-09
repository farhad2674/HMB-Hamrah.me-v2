import { db, DomainError, getUser, now, requireRole, transaction, type User } from './db.ts';

export type AcademyLesson = {
  slug: string;
  title: string;
  minutes: number;
  kind: 'reading' | 'exercise';
  isPreview: boolean;
};
export type AcademyLessonDetail = AcademyLesson & { body: string; exercise: string };
export type AcademyModule = { slug: string; title: string; lessons: AcademyLesson[] };
export type AcademyCourse = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  category: string;
  level: string;
  cover: string;
  minutes: number;
  outcomes: string[];
  prerequisite: string;
  isSample: boolean;
  modules: AcademyModule[];
};
export type MemberCourse = AcademyCourse & {
  completedSlugs: string[];
  completions: { lessonSlug: string; completedAt: string }[];
  completedCount: number;
  totalLessons: number;
  nextLessonSlug: string | null;
  enrolledAt: string;
  lastActivityAt: string;
};

type CourseRow = Pick<AcademyCourse, 'slug'|'title'|'summary'|'description'|'category'|'level'|'cover'|'prerequisite'> & {
  outcomes: string;
  is_sample: number;
  moduleSlug: string | null;
  moduleTitle: string;
  lessonSlug: string | null;
  lessonTitle: string;
  minutes: number;
  kind: AcademyLesson['kind'];
  isPreview: number;
};

// Keep locked lesson text out of catalog and dashboard payloads.
function readCourses(filter: { slug?: string; memberId?: string } = {}): AcademyCourse[] {
  const clauses = ['c.published = 1'];
  const values: string[] = [];
  if (filter.slug !== undefined) {
    clauses.push('c.slug = ?');
    values.push(filter.slug);
  }
  if (filter.memberId !== undefined) {
    clauses.push('EXISTS (SELECT 1 FROM academy_enrollments e WHERE e.course_slug=c.slug AND e.user_id=? AND e.active=1)');
    values.push(filter.memberId);
  }
  const rows = db().prepare(`
    SELECT c.slug,c.title,c.summary,c.description,c.category,c.level,c.cover,c.prerequisite,c.outcomes,c.is_sample,
           m.slug AS moduleSlug,m.title AS moduleTitle,l.slug AS lessonSlug,l.title AS lessonTitle,
           l.minutes,l.kind,l.is_preview AS isPreview
    FROM academy_courses c
    LEFT JOIN academy_modules m ON m.course_slug=c.slug
    LEFT JOIN academy_lessons l ON l.course_slug=m.course_slug AND l.module_slug=m.slug
    WHERE ${clauses.join(' AND ')}
    ORDER BY c.position,c.slug,m.position,l.position
  `).all(...values) as unknown as CourseRow[];

  const courses = new Map<string, AcademyCourse>();
  for (const row of rows) {
    let course = courses.get(row.slug);
    if (!course) {
      course = {
        slug: row.slug, title: row.title, summary: row.summary, description: row.description,
        category: row.category, level: row.level, cover: row.cover, prerequisite: row.prerequisite,
        outcomes: JSON.parse(row.outcomes) as string[], isSample: Boolean(row.is_sample), modules: [], minutes: 0,
      };
      courses.set(row.slug, course);
    }
    if (row.moduleSlug === null) continue;
    let module = course.modules.at(-1);
    if (module?.slug !== row.moduleSlug) {
      module = { slug: row.moduleSlug, title: row.moduleTitle, lessons: [] };
      course.modules.push(module);
    }
    if (row.lessonSlug !== null) {
      module.lessons.push({
        slug: row.lessonSlug, title: row.lessonTitle, kind: row.kind, minutes: row.minutes, isPreview: Boolean(row.isPreview),
      });
      course.minutes += row.minutes;
    }
  }
  return [...courses.values()];
}

export function listAcademyCourses(): AcademyCourse[] { return readCourses(); }
export function getAcademyCourse(slug: string): AcademyCourse | null { return readCourses({ slug })[0] ?? null; }

function requireMember(user: User) {
  const current = getUser(user.id);
  if (!current) throw new DomainError('حساب پیدا نشد.', 403);
  requireRole(current, ['member']);
}

function readLesson(courseSlug: string, lessonSlug: string, memberId?: string): AcademyLessonDetail | null {
  const condition = memberId === undefined
    ? 'l.is_preview = 1'
    : 'EXISTS (SELECT 1 FROM academy_enrollments e WHERE e.course_slug=c.slug AND e.user_id=? AND e.active=1)';
  const values = memberId === undefined ? [courseSlug, lessonSlug] : [courseSlug, lessonSlug, memberId];
  const row = db().prepare(`
    SELECT l.slug,l.title,l.minutes,l.kind,l.is_preview AS isPreview,l.body,l.exercise
    FROM academy_lessons l JOIN academy_courses c ON c.slug=l.course_slug
    WHERE c.published=1 AND c.slug=? AND l.slug=? AND ${condition}
  `).get(...values) as (Omit<AcademyLessonDetail, 'isPreview'> & { isPreview: number }) | undefined;
  return row ? { ...row, isPreview: Boolean(row.isPreview) } : null;
}

export function getPreviewLesson(courseSlug: string, lessonSlug: string): AcademyLessonDetail | null {
  return readLesson(courseSlug, lessonSlug);
}
export function getMemberLesson(user: User, courseSlug: string, lessonSlug: string): AcademyLessonDetail | null {
  requireMember(user);
  return readLesson(courseSlug, lessonSlug, user.id);
}

export function getMemberLearning(user: User): MemberCourse[] {
  requireMember(user);
  const enrollments = db().prepare(`
    SELECT e.course_slug AS courseSlug,e.enrolled_at AS enrolledAt,k.lesson_slug AS lessonSlug,k.completed_at AS completedAt
    FROM academy_enrollments e JOIN academy_courses c ON c.slug=e.course_slug
    LEFT JOIN academy_completions k ON k.course_slug=e.course_slug AND k.user_id=e.user_id
    WHERE e.active=1 AND c.published=1 AND e.user_id=? ORDER BY k.completed_at,k.lesson_slug
  `).all(user.id) as { courseSlug: string; enrolledAt: string; lessonSlug: string|null; completedAt: string|null }[];
  const progress = new Map<string, Pick<MemberCourse, 'completions'|'enrolledAt'>>();
  for (const row of enrollments) {
    const item = progress.get(row.courseSlug) ?? { enrolledAt: row.enrolledAt, completions: [] };
    if (row.lessonSlug !== null && row.completedAt !== null) item.completions.push({ lessonSlug: row.lessonSlug, completedAt: row.completedAt });
    progress.set(row.courseSlug, item);
  }
  const courses: MemberCourse[] = [];
  for (const course of readCourses({ memberId: user.id })) {
    const item = progress.get(course.slug);
    if (!item) continue;
    const lessons = course.modules.flatMap(module => module.lessons);
    const completed = new Set(item.completions.map(event => event.lessonSlug));
    courses.push({
      ...course, ...item, completedSlugs: [...completed], completedCount: completed.size, totalLessons: lessons.length,
      nextLessonSlug: lessons.find(lesson => !completed.has(lesson.slug))?.slug ?? null,
      lastActivityAt: item.completions.at(-1)?.completedAt ?? item.enrolledAt,
    });
  }
  return courses.sort((a, b) => b.lastActivityAt.localeCompare(a.lastActivityAt));
}

export function enrollInAcademyCourse(user: User, courseSlug: string) {
  return transaction(() => {
    requireMember(user);
    if (!db().prepare('SELECT 1 FROM academy_courses WHERE slug=? AND published=1 AND is_sample=1').get(courseSlug)) {
      throw new DomainError('این دوره برای ثبت‌نام نمونه در دسترس نیست.', 404);
    }
    const existing = db().prepare('SELECT active FROM academy_enrollments WHERE user_id=? AND course_slug=?').get(user.id, courseSlug);
    if (existing && !existing.active) throw new DomainError('دسترسی شما به این دوره غیرفعال است.', 403);
    if (!existing) db().prepare('INSERT INTO academy_enrollments(user_id,course_slug,enrolled_at) VALUES(?,?,?)').run(user.id, courseSlug, now());
    return { ok: true };
  });
}

export function completeAcademyLesson(user: User, courseSlug: string, lessonSlug: string) {
  return transaction(() => {
    if (!getMemberLesson(user, courseSlug, lessonSlug)) throw new DomainError('این درس در دوره‌های شما پیدا نشد.', 404);
    db().prepare(`
      INSERT INTO academy_completions(user_id,course_slug,lesson_slug,completed_at) VALUES(?,?,?,?)
      ON CONFLICT(user_id,course_slug,lesson_slug) DO NOTHING
    `).run(user.id, courseSlug, lessonSlug, now());
    return { ok: true };
  });
}

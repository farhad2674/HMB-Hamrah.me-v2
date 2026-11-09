import { listAcademyCourses, type MemberCourse } from '@/lib/academy';
import MemberFrame from '../member/MemberFrame';
import { LearningLibrary, LearningOverview, type JournalEvent } from '../member/LearningViews';
import '../member/member.css';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'پیش‌نمایش میز یادگیری همراه', robots: { index: false, follow: false } };

// Preview activity is fictional and calculated without opening a member session.
function previewLearning(): { courses: MemberCourse[]; entries: JournalEvent[] } {
  const now = Date.now();
  const daysAgo = (days: number) => new Date(now - days * 86_400_000).toISOString();
  const courses = listAcademyCourses().slice(0, 2).map((course, i) => {
    const lessons = course.modules.flatMap(module => module.lessons);
    const done = lessons.slice(0, Math.min(2 - i, Math.max(0, lessons.length - 1)));
    const completions = done.map((lesson, j) => ({ lessonSlug: lesson.slug, completedAt: daysAgo(i * 3 + done.length - j) }));
    return { ...course, completedSlugs: done.map(lesson => lesson.slug), completions,
      completedCount: done.length, totalLessons: lessons.length, nextLessonSlug: lessons[done.length]?.slug ?? null,
      enrolledAt: daysAgo(10 + i), lastActivityAt: completions.at(-1)?.completedAt || daysAgo(10 + i) };
  });
  return { courses, entries: [
    { updatedAt: daysAgo(2), instrument: 'مرور تصمیم تمرینی', status: 'feedback_ready' },
    { updatedAt: daysAgo(4), instrument: 'تمرین ثبت ریسک', status: 'submitted' },
    { updatedAt: daysAgo(6), instrument: 'مرور برنامه هفتگی', status: 'draft' },
  ] };
}

export default async function DashboardPreview({ searchParams }: { searchParams: Promise<{ view?: string }> }) {
  const { courses, entries } = previewLearning();
  const library = (await searchParams).view === 'learning';
  return <MemberFrame preview name="هنرجوی نمونه" library={library}>
    {library ? <LearningLibrary courses={courses} preview/> : <LearningOverview name="هنرجوی نمونه" courses={courses} entries={entries} preview/>}
  </MemberFrame>;
}

import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle2, ChevronDown, ChevronLeft, Circle, Clock3, ListTree, NotebookPen } from 'lucide-react';
import { getMemberLearning, getMemberLesson } from '@/lib/academy';
import { currentMember } from '../../../currentMember';
import { numberFa } from '../../../LearningViews';
import CompleteLesson from './CompleteLesson';

export const metadata = { title: 'مطالعه درس' };

export default async function LessonReader({ params }: { params: Promise<{ course: string; lesson: string }> }) {
  const user = await currentMember();
  if (!user.active) redirect('/member/learning');
  const { course: courseSlug, lesson: lessonSlug } = await params;
  const course = getMemberLearning(user).find(item => item.slug === courseSlug);
  const lesson = getMemberLesson(user, courseSlug, lessonSlug);
  if (!course || !lesson) notFound();
  const lessons = course.modules.flatMap(module => module.lessons);
  const index = lessons.findIndex(item => item.slug === lesson.slug);
  const lessonHref = (slug: string) => '/member/learning/' + encodeURIComponent(course.slug) + '/' + encodeURIComponent(slug);
  const previous = lessons[index - 1], next = lessons[index + 1];
  const moduleTitle = course.modules.find(module => module.lessons.some(item => item.slug === lesson.slug))?.title;
  return <section className="member-page member-reader">
    <nav className="member-crumb" aria-label="مسیر درس"><Link href="/member/learning">دوره‌های من</Link><ChevronLeft size={14}/><Link href={'/programs/' + course.slug}>{course.title}</Link></nav>
    <div className="member-page-heading"><div><h1>{lesson.title}</h1>
      <p className="member-reader-meta"><span><BookOpen size={15}/>{moduleTitle}</span><span><Clock3 size={15}/>{numberFa(lesson.minutes)} دقیقه</span></p></div>
    </div>
    <div className="member-reader-columns">
      <div className="member-reading-column">
        <article className="member-panel member-reading-card">
          <div className="member-reading-info"><span>{lesson.kind === 'exercise' ? <NotebookPen size={18}/> : <BookOpen size={18}/>}
            {lesson.kind === 'exercise' ? 'درس تمرینی' : 'درس خواندنی'}</span><span>درس {numberFa(index + 1)} از {numberFa(course.totalLessons)}</span></div>
          <div className="member-lesson-body">{lesson.body.split(/\n\s*\n/).filter(Boolean).map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div>
          {lesson.exercise && <section className="member-assignment"><h2><NotebookPen size={19}/>تمرین این درس</h2><p>{lesson.exercise}</p><Link href="/member">رفتن به ژورنال من <ArrowLeft size={15}/></Link></section>}
          <CompleteLesson key={lesson.slug} courseSlug={course.slug} lessonSlug={lesson.slug} completed={course.completedSlugs.includes(lesson.slug)}/>
        </article>
        <nav className="member-lesson-neighbors" aria-label="جابه‌جایی میان درس‌ها">
          {previous ? <Link href={lessonHref(previous.slug)}><ArrowRight size={17}/><span>درس قبل<strong>{previous.title}</strong></span></Link> :
            <Link href="/member/learning"><ArrowRight size={17}/><span>بازگشت<strong>دوره‌های من</strong></span></Link>}
          {next ? <Link href={lessonHref(next.slug)}><span>درس بعد<strong>{next.title}</strong></span><ArrowLeft size={17}/></Link> :
            <Link href="/member/learning"><span>بازگشت<strong>دوره‌های من</strong></span><ArrowLeft size={17}/></Link>}
        </nav>
      </div>
      <aside className="member-panel member-syllabus" aria-label="مسیر درس‌ها">
        <div className="member-panel-heading"><h2>سرفصل دوره</h2><ListTree size={19}/></div>
        <p className="member-syllabus-total">{numberFa(course.completedCount)} از {numberFa(course.totalLessons)} درس تکمیل شده</p>
        <progress aria-label="پیشرفت دوره" max={course.totalLessons || 1} value={course.completedCount}/>
        {course.modules.map((module, i) => <details key={module.slug} open={module.lessons.some(item => item.slug === lesson.slug)}>
          <summary><span><small>فصل {numberFa(i + 1)}</small>{module.title}</span><ChevronDown size={16}/></summary>
          <ul>{module.lessons.map(item => {
            const done = course.completedSlugs.includes(item.slug);
            return <li key={item.slug}><Link href={lessonHref(item.slug)} aria-current={item.slug === lesson.slug ? 'step' : undefined}>
              {done ? <CheckCircle2 size={16} aria-label="تکمیل‌شده"/> : <Circle size={13} aria-hidden="true"/>}<span>{item.title}</span>
              <small>{numberFa(item.minutes)} دق</small></Link></li>;
          })}</ul>
        </details>)}
      </aside>
    </div>
  </section>;
}

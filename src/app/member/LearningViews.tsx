import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowUpLeft, BookOpen, Bookmark, CheckCheck, ChevronLeft, Clock3, Compass, GraduationCap, History, MessageSquareText, NotebookPen } from 'lucide-react';
import type { MemberCourse } from '@/lib/academy';

export const numberFa = (n: number) => new Intl.NumberFormat('fa-IR').format(n);
const date = new Intl.DateTimeFormat('fa-IR', { day: 'numeric', month: 'long', timeZone: 'Asia/Tehran' });
const learningPath = (slug: string) => '/member/learning/' + encodeURIComponent(slug);
export type JournalEvent = { updatedAt: string; instrument: string; status: string };

export function PreviewNotice() {
  return <p className="member-preview-note"><span/>پیش‌نمایش میز یادگیری با دوره‌ها و فعالیت‌های یک هنرجوی فرضی</p>;
}

function ProgressBar({ course }: { course: MemberCourse }) {
  const label = numberFa(course.completedCount) + ' از ' + numberFa(course.totalLessons) + ' درس';
  return <div className="member-progress"><span>{label}</span>
    <progress aria-label={'پیشرفت در ' + course.title} max={course.totalLessons || 1} value={course.completedCount}>{label}</progress>
  </div>;
}

function CourseList({ courses, preview, wide = false }: { courses: MemberCourse[]; preview: boolean; wide?: boolean }) {
  if (!courses.length) return <div className="member-empty">
    <BookOpen size={30}/><h3>کتابخانه‌تان را بسازید</h3>
    <p>از فهرست دوره‌ها یک موضوع انتخاب کنید تا درس‌ها و پیشرفتتان اینجا در دسترس باشند.</p>
    <Link className="member-action" href="/programs">دیدن دوره‌ها <ArrowLeft size={16}/></Link>
  </div>;
  return <ul className={'member-course-list' + (wide ? ' member-course-list-wide' : '')}>
    {courses.map(course => <li key={course.slug}>
      <Link className="member-course-row" href={preview ? '/programs/' + course.slug : learningPath(course.slug)}>
        <Image className="member-course-thumb" src={course.cover} width={100} height={90} alt=""/>
        <div className="member-course-copy">
          <span>{course.category} <i/> {course.level}</span>
          <h3>{course.title}</h3>
          {wide && <p>{course.summary}</p>}
          <ProgressBar course={course}/>
        </div>
        <span className="member-row-go" aria-hidden="true"><ChevronLeft size={18}/></span>
      </Link>
    </li>)}
  </ul>;
}

export function LearningLibrary({ courses, preview = false, active = true }: { courses: MemberCourse[]; preview?: boolean; active?: boolean }) {
  return <section className="member-page">
    {preview && <PreviewNotice/>}
    <div className="member-page-heading"><div><h1>دوره‌های من</h1><p>از همین‌جا به درس‌ها و تمرین‌های هر دوره برگردید.</p></div>
      <Link className="member-secondary" href="/programs"><Compass size={17}/>فهرست دوره‌ها</Link>
    </div>
    {active ? <div className="member-panel"><div className="member-panel-heading"><h2>کتابخانه من</h2><span className="member-count">{numberFa(courses.length)} دوره</span></div>
      <CourseList courses={courses} preview={preview} wide/></div> : <InactiveAccount/>}
  </section>;
}

function InactiveAccount() {
  return <div className="member-empty member-panel"><h2>دسترسی آموزشی حساب غیرفعال است</h2>
    <p>برای پیگیری عضویت با پشتیبانی همراه تماس بگیرید. از صفحه ژورنال هم می‌توانید نسخه اطلاعات خود را بگیرید.</p>
    <Link className="member-action" href="/contact">تماس با پشتیبانی <ArrowLeft size={16}/></Link>
    <Link className="member-text-link" href="/member">رفتن به ژورنال</Link></div>;
}

function NextLesson({ course, preview }: { course?: MemberCourse; preview: boolean }) {
  const lesson = course?.modules.flatMap(module => module.lessons).find(lesson => lesson.slug === course.nextLessonSlug);
  const percent = course?.totalLessons ? Math.round(course.completedCount * 100 / course.totalLessons) : 0;
  const href = course && lesson ? (preview ? '/programs/' + course.slug : learningPath(course.slug) + '/' + lesson.slug) : '/programs';
  return <section className="member-next">
    <div className="member-next-body">
      <span className="member-next-label"><span/> {lesson ? 'ادامه مسیر یادگیری' : 'شروع مسیر یادگیری'}</span>
      <h2>{course && lesson ? course.title : 'موضوع بعدی یادگیری شما چیست؟'}</h2>
      {lesson ? <p><Bookmark size={15}/>درس بعدی <b>·</b> {lesson.title}</p> : <p>دوره‌ها را ورق بزنید و از اولین درس موضوعی که دوست دارید شروع کنید.</p>}
      <Link className="member-action" href={href}>{lesson ? preview ? 'دیدن این دوره' : 'ادامه درس' : 'کشف دوره‌ها'}<ArrowLeft size={17}/></Link>
    </div>
    <div className="member-gauge-field" aria-hidden="true"><div className="member-gauge-orbit">
      <svg viewBox="0 0 144 144" className="member-gauge"><circle cx="72" cy="72" r="61" fill="none" stroke="currentColor" strokeWidth="4"/>
        <circle className="member-gauge-value" cx="72" cy="72" r="61" fill="none" pathLength="100" strokeWidth="4" strokeDasharray={percent + ' 100'} strokeLinecap="round" transform="rotate(-90 72 72)"/></svg>
      <span>{course ? <><strong>{numberFa(percent)}<small>٪</small></strong><em>پیشرفت دوره</em></> : <Compass size={45}/>}</span>
    </div></div>
    {course && <span className="sr-only">پیشرفت دوره {numberFa(percent)} درصد</span>}
  </section>;
}

function ActivityList({ courses, entries, preview }: { courses: MemberCourse[]; entries: JournalEvent[]; preview: boolean }) {
  const study = courses.flatMap(course => {
    const lessonNames = new Map(course.modules.flatMap(module => module.lessons).map(lesson => [lesson.slug, lesson.title]));
    const href = preview ? '/programs/' + course.slug : learningPath(course.slug);
    return [
      { id: 'start-' + course.slug, title: course.title, caption: 'شروع دوره', at: course.enrolledAt, href, icon: BookOpen },
      ...course.completions.map(item => ({ id: course.slug + '/' + item.lessonSlug, title: lessonNames.get(item.lessonSlug) || course.title,
        caption: 'تکمیل درس', at: item.completedAt, href: preview ? href : href + '/' + item.lessonSlug, icon: CheckCheck })),
    ];
  });
  const journal = entries.map((entry, i) => ({ id: 'journal-' + i, title: entry.instrument || 'یادداشت ژورنال',
    caption: entry.status === 'feedback_ready' ? 'بازخورد آماده' : 'به‌روزرسانی ژورنال', at: entry.updatedAt,
    href: preview ? '/journal' : '/member', icon: NotebookPen }));
  const items = [...study, ...journal].sort((a, b) => b.at.localeCompare(a.at)).slice(0, 4);
  return <section className="member-panel" data-reveal><div className="member-panel-heading"><h2>فعالیت اخیر</h2><History size={20}/></div>
    {items.length ? <ol className="member-events">{items.map(({ id, title, caption, at, href, icon: Icon }) => <li key={id}>
      <span className="member-event-icon"><Icon size={15}/></span><div><small>{caption} <i/> <time dateTime={at}>{date.format(new Date(at))}</time></small>
        <Link href={href}>{title}</Link></div></li>)}</ol> :
      <div className="member-empty-small"><Clock3 size={25}/><p>با شروع یک دوره یا ثبت یادداشت در ژورنال، سابقه آن را اینجا می‌بینید.</p></div>}
  </section>;
}

export function LearningOverview({ name, courses, entries, preview = false, active = true }: {
  name: string; courses: MemberCourse[]; entries: JournalEvent[]; preview?: boolean; active?: boolean;
}) {
  const resume = [...courses].sort((a, b) => b.lastActivityAt.localeCompare(a.lastActivityAt)).find(course => course.nextLessonSlug);
  const library = preview ? '/dashboard-preview?view=learning' : '/member/learning';
  const journal = preview ? '/journal' : '/member';
  const pending = entries.filter(entry => ['submitted', 'in_review'].includes(entry.status)).length;
  const stats = [
    { label: 'دوره‌های من', value: courses.length, icon: BookOpen, href: library },
    { label: 'درس‌های تکمیل‌شده', value: courses.reduce((n, c) => n + c.completedCount, 0), icon: GraduationCap, href: library },
    { label: 'یادداشت‌های ژورنال', value: entries.length, icon: NotebookPen, href: journal },
    { label: 'بازخورد آماده', value: entries.filter(entry => entry.status === 'feedback_ready').length, icon: MessageSquareText, href: journal },
  ];
  return <section className="member-page">
    {preview && <PreviewNotice/>}
    <div className="member-page-heading"><div><h1>سلام، {name}</h1><p>درس‌ها، تمرین‌ها و مرور تصمیم‌هایتان در یک نگاه.</p></div>
      <Link className="member-secondary" href="/programs">کاوش در دوره‌ها<ArrowUpLeft size={17}/></Link>
    </div>
    {active ? <>
      <NextLesson course={resume} preview={preview}/>
      <dl className="member-stats">{stats.map(({ label, value, icon: Icon, href }) => <div key={label}><dt><Icon size={19}/><Link href={href}>{label}</Link></dt><dd>{numberFa(value)}</dd></div>)}</dl>
      <div className="member-lower"><section className="member-panel" data-reveal>
        <div className="member-panel-heading"><h2>کتابخانه من</h2><Link href={library}>همه دوره‌ها <ArrowLeft size={15}/></Link></div>
        <CourseList courses={courses.slice(0, 3)} preview={preview}/>
      </section>
      <ActivityList courses={courses} entries={entries} preview={preview}/></div>
      <div className="member-journal-link" data-reveal><span><NotebookPen size={20}/></span><div><h2>ژورنال تصمیم‌ها</h2>
        <p>{pending ? numberFa(pending) + ' یادداشت در انتظار بازبینی است.' : 'دلیل تصمیم و تمرین بعدی‌تان را در ژورنال بنویسید.'}</p></div>
        <Link href={journal}>{preview ? 'آشنایی با ژورنال' : 'ورود به ژورنال'}<ArrowLeft size={16}/></Link></div>
    </> : <InactiveAccount/>}
  </section>;
}

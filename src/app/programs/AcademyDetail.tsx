import Link from 'next/link';
import { cookies } from 'next/headers';
import { ArrowLeft, BookOpen, Check, ChevronDown, Clock3, Eye, Layers3, LockKeyhole, NotebookPen } from 'lucide-react';
import { getMemberLearning, type AcademyCourse } from '@/lib/academy';
import { SESSION_COOKIE, sessionUser } from '@/lib/auth';
import { breadcrumbSchema, JsonLd, organizationSchema, SITE_URL } from '@/lib/site';
import { AcademyArt, numberFa } from './AcademyArt';
import EnrollButton from './EnrollButton';

export default async function AcademyDetail({ course }: { course: AcademyCourse }) {
  const path = '/programs/' + course.slug;
  const memberPath = '/member/learning/' + course.slug;
  const user = sessionUser((await cookies()).get(SESSION_COOKIE)?.value);
  const isMember = user?.role === 'member' && user.active;
  const enrolled = isMember && user ? getMemberLearning(user).find(item => item.slug === course.slug) : undefined;
  const lessons = course.modules.flatMap(module => module.lessons);
  const preview = lessons.find(lesson => lesson.isPreview);
  const schema = {
    '@context': 'https://schema.org', '@type': 'Course', '@id': SITE_URL + path + '#course',
    url: SITE_URL + path, name: course.title, description: course.summary, inLanguage: 'fa-IR',
    educationalLevel: course.level, provider: { '@id': organizationSchema['@id'] },
    timeRequired: 'PT' + course.minutes + 'M',
    syllabusSections: course.modules.map((module, i) => ({ '@type': 'Syllabus', name: module.title, position: i + 1 })),
  };
  const courseAction = enrolled
    ? <Link className="ac-button ac-action" href={memberPath}>{enrolled.completedCount === enrolled.totalLessons ? 'مرور دوره' : 'ادامهٔ یادگیری'} <ArrowLeft size={17}/></Link>
    : !course.isSample ? <Link className="ac-button ac-action" href="/contact">پیگیری دسترسی دوره <ArrowLeft size={17}/></Link>
    : isMember ? <EnrollButton slug={course.slug}/>
    : user ? <p>دسترسی به درس‌ها به حساب فعال یادگیرنده نیاز دارد.</p>
    : <Link className="ac-button ac-action" href={'/login?next=' + encodeURIComponent(path)}>ورود برای شروع دوره <ArrowLeft size={17}/></Link>;
  return <article className="subpage-shell ac-site ac-detail">
    <JsonLd data={[schema, breadcrumbSchema([{name:'خانه',path:'/'},{name:'آکادمی همراه',path:'/programs'},{name:course.title,path}])]}/>
    <header className="ac-mast container">
      <div className="ac-mast-copy">
        <nav className="ac-breadcrumb" aria-label="مسیر صفحه"><Link href="/">همراه</Link><span>/</span><Link href="/programs">آکادمی</Link><span>/</span><span>{course.category}</span></nav>
        <h1>{course.title}</h1><p>{course.summary}</p>
        <div className="ac-mast-actions">{courseAction}{preview && <Link className="ac-button ac-light-outline" href={path + '/preview/' + preview.slug}><Eye size={17}/> خواندن نمونه درس</Link>}</div>
      </div>
      <div className="ac-mast-art"><AcademyArt cover={course.cover} large/></div>
    </header>
    <div className="container ac-course-body">
      <div className="ac-course-main">
        <nav className="ac-detail-nav" aria-label="بخش‌های دوره"><a href="#about-course">معرفی دوره</a><a href="#outcomes">آنچه یاد می‌گیرید</a><a href="#curriculum">سرفصل و درس‌ها</a></nav>
        <section id="about-course" className="ac-content-block" data-reveal><h2>دربارهٔ این دوره</h2><p>{course.description}</p></section>
        <section id="outcomes" className="ac-content-block" data-reveal><h2>آنچه یاد می‌گیرید</h2><ul className="ac-outcomes">{course.outcomes.map(outcome => <li key={outcome}><Check size={16}/><span>{outcome}</span></li>)}</ul></section>
        <section id="curriculum" className="ac-content-block ac-curriculum"><div className="ac-section-head"><div><h2>سرفصل و درس‌ها</h2><p>{numberFa(course.modules.length)} فصل · {numberFa(lessons.length)} درس</p></div></div>
          {course.modules.map((module, index) => <details className="ac-module" key={module.slug} open={index === 0}>
            <summary><span className="ac-module-sequence">{numberFa(index + 1)}</span><span>{module.title}</span><span className="ac-module-count">{numberFa(module.lessons.length)} درس</span><ChevronDown size={18}/></summary>
            <ol>{module.lessons.map(lesson => {
              const href = enrolled ? memberPath + '/' + lesson.slug : lesson.isPreview ? path + '/preview/' + lesson.slug : '';
              const Icon = lesson.kind === 'exercise' ? NotebookPen : BookOpen;
              return <li key={lesson.slug}><div className="ac-lesson-info"><Icon size={17}/>{href ? <Link href={href}>{lesson.title}</Link> : <span>{lesson.title}</span>}</div>
                <span className="ac-lesson-meta">{lesson.isPreview && !enrolled && <Link href={href}>نمونه درس</Link>}{!href && <LockKeyhole size={15} aria-label="پس از عضویت در دوره"/>}{numberFa(lesson.minutes)} دقیقه</span>
              </li>;
            })}</ol>
          </details>)}
        </section>
      </div>
      <aside className="ac-facts">
        <span className="ac-category">{course.isSample ? 'دورهٔ نمونه' : 'دورهٔ آکادمی'}</span><h2>در یک نگاه</h2>
        <dl><div><dt><Layers3 size={17}/> سطح</dt><dd>{course.level}</dd></div><div><dt><BookOpen size={17}/> تعداد درس</dt><dd>{numberFa(lessons.length)} درس</dd></div><div><dt><Clock3 size={17}/> زمان یادگیری</dt><dd>{numberFa(course.minutes)} دقیقه</dd></div></dl>
        <h3>پیش‌نیاز</h3><p>{course.prerequisite}</p>
        <Link href="/programs#courses" className="ac-backlink">مشاهدهٔ همهٔ دوره‌ها <ArrowLeft size={16}/></Link>
      </aside>
    </div>
  </article>;
}

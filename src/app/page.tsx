import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpLeft, BookOpen, Check, LibraryBig, MessageSquareText, NotebookPen, PanelsTopLeft } from 'lucide-react';
import DecisionStudio from '@/components/DecisionStudio';
import { BlogCover } from '@/components/BlogVisual';
import { FAQ } from '@/components/HomeExperience';
import { articles } from '@/lib/content';
import { listAcademyCourses } from '@/lib/academy';
import './atlas-home.css';

export const dynamic = 'force-dynamic';

const paths = [
  { title: 'از پایه، با شناخت بازار', audience: 'برای شروع یادگیری', description: 'مفاهیم فارکس، ساختار نمودار و مدیریت ریسک را یاد بگیرید و برای یک موقعیت فرضی، برنامه بنویسید.', href: '/programs/foundations', action: 'سرفصل‌های آموزش پایه', image: 'capability-learning.png', icon: BookOpen },
  { title: 'از دانستن، به اجرای منظم', audience: 'برای ادامهٔ تمرین', description: 'شروط تصمیم را روشن کنید، در محیط آزمایشی تمرین کنید و فاصلهٔ اجرای خود با برنامه را ببینید.', href: '/programs/practice', action: 'مسیر تمرین و مدیریت ریسک', image: 'capability-journal.png', icon: NotebookPen },
  { title: 'یک نگاه دیگر، به تصمیم شما', audience: 'برای مرور با مربی', description: 'تصمیم‌های ثبت‌شده را با مربی مرور کنید و یک مسئلهٔ مشخص را به موضوع تمرین بعدی تبدیل کنید.', href: '/coaching', action: 'آشنایی با کوچینگ', image: 'capability-feedback.png', icon: MessageSquareText },
];

export default function HomePage() {
  const featured = articles.filter(article => article.featured).slice(0, 3);
  const courses = listAcademyCourses().slice(0, 3);
  const firstCourse = courses[0];
  const preview = firstCourse?.modules.flatMap(module => module.lessons).find(lesson => lesson.isPreview);
  const cards = courses.length ? courses.map(course => ({
    title: course.title, audience: course.category, description: course.summary,
    href: `/programs/${course.slug}`, action: 'سرفصل‌ها و نمونهٔ درس', image: course.cover, icon: BookOpen,
  })) : paths.map(path => ({ ...path, image: `/images/hamrah/${path.image}` }));
  return <div className="next-home">
    <section className="nh-hero nh-container" aria-labelledby="nh-title" data-scene="H1">
      <div className="nh-hero-copy">
        <p className="nh-eyebrow">آکادمی معامله‌گری همراه</p>
        <h1 id="nh-title">از اولین درس<br/><span>تا تصمیم بعدی.</span></h1>
        <p className="nh-lead">با یک درس کوتاه شروع کنید، روی کاغذ تمرین کنید و از داشبوردتان به همان‌جایی برگردید که یادگیری را متوقف کردید.</p>
        <div className="nh-actions"><a className="nh-button" href="#learning-paths">انتخاب دوره <ArrowUpLeft size={20}/></a><Link className="nh-text-link" href="/dashboard-preview"><PanelsTopLeft size={18}/> دیدن داشبورد نمونه</Link></div>
        <p className="nh-risk">آموزش و تمرین، تضمین بازده مالی نیست.</p>
      </div>
      <div className="nh-hero-art nh-academy-window">
        <div className="nh-window-mast"><span><LibraryBig size={18}/> استودیوی یادگیری همراه</span><bdi>HMB ACADEMY</bdi></div>
        <div className="nh-window-image" data-parallax="16"><Image src="/images/hamrah/footer-marble-book-brand-v4.png" alt="" fill preload sizes="(max-width: 949px) 94vw, 46vw"/></div>
        {firstCourse && preview ? <Link className="nh-window-lesson" href={`/programs/${firstCourse.slug}/preview/${preview.slug}`}>
          <span className="nh-window-glyph"><BookOpen size={23}/></span><span><small>یک درس را امتحان کنید</small><strong>{preview.title}</strong></span><ArrowUpLeft size={20}/>
        </Link> : <Link className="nh-window-lesson" href="/programs"><span className="nh-window-glyph"><BookOpen size={23}/></span><strong>کاوش در مسیرهای آموزشی</strong><ArrowUpLeft size={20}/></Link>}
      </div>
      <div className="nh-hero-bridge"><span><BookOpen size={19}/> یادگیری با هدف روشن</span><span><NotebookPen size={19}/> تمرین در محیط آزمایشی</span><span><MessageSquareText size={19}/> مرور با بازخورد انسانی</span></div>
    </section>

    <section className="nh-section nh-container" id="learning-paths" aria-labelledby="nh-path-title" data-scene="H2">
      <div className="nh-section-heading" data-reveal><div><p className="nh-eyebrow">{courses.length ? 'کتابخانهٔ دوره‌ها' : 'مسیرهای یادگیری'}</p><h2 id="nh-path-title">روی چه مهارتی کار می‌کنید؟</h2></div><Link className="nh-text-link" href="/programs">همهٔ دوره‌ها و مسیرها <ArrowUpLeft size={19}/></Link></div>
      <div className="nh-path-grid" data-stagger>{cards.map(path => <Link className="nh-path-card" href={path.href} key={path.href}>
        <div className="nh-path-media"><Image src={path.image} alt="" fill sizes="(max-width: 600px) 90vw, (max-width: 949px) 44vw, 30vw"/></div>
        <div className="nh-path-body"><p className="nh-card-audience"><path.icon size={17}/>{path.audience}</p><h3>{path.title}</h3><p>{path.description}</p><span className="nh-card-action">{path.action}<ArrowUpLeft size={19}/></span></div>
      </Link>)}</div>
    </section>

    <section className="nh-journal" id="decision-practice" aria-labelledby="nh-journal-title" data-scene="H3">
      <div className="nh-container nh-feature-grid">
        <div className="nh-journal-demo"><DecisionStudio/></div>
        <div className="nh-feature-copy" data-reveal><p className="nh-eyebrow">ژورنال معاملاتی همراه</p><h2 id="nh-journal-title">هر تصمیم،<br/><span>چیزی برای یاد گرفتن دارد.</span></h2><p>برنامه چه بود و چه کردید؟ این دو را کنار هم ثبت کنید تا مرور تصمیم به حافظه و نتیجهٔ یک معامله وابسته نباشد.</p>
          <ul className="nh-feature-list"><li><Check size={17}/>برنامه و مرز ریسک، پیش از اجرا</li><li><Check size={17}/>ثبت آنچه واقعاً انجام دادید</li><li><Check size={17}/>یک تغییر مشخص برای تمرین بعدی</li></ul>
          <Link className="nh-button nh-button-lime" href="/journal">کاوش در ژورنال <ArrowUpLeft size={20}/></Link><p className="nh-demo-hint">نمونه را امتحان کنید. مراحل «برنامه»، «اجرا» و «مرور» قابل انتخاب‌اند.</p>
        </div>
      </div>
    </section>

    <section className="nh-section nh-container nh-coaching" aria-labelledby="nh-coach-title" data-scene="H4">
      <div className="nh-coach-art" aria-hidden="true" data-reveal><Image src="/images/hamrah/hamrah-principles-sculpture.webp" alt="" fill sizes="(max-width:949px) 90vw, 45vw"/></div>
      <div className="nh-feature-copy" data-reveal><p className="nh-eyebrow">همراهی انسانی</p><h2 id="nh-coach-title">یک گفت‌وگوی دقیق.<br/>یک تمرین روشن‌تر.</h2><p>ژورنال شما، نقطهٔ شروع گفت‌وگو با مربی است. از مرور تصمیم‌های واقعی، یک رفتار مشخص را برای تمرین بعدی انتخاب می‌کنید.</p><div className="nh-coach-example"><span>نمونهٔ پرسش در مرور تصمیم</span><p>«کدام شرط برنامه هنوز کامل نشده بود؟»</p></div><Link className="nh-text-link" href="/coaching">شیوهٔ همراهی مربی <ArrowUpLeft size={19}/></Link></div>
    </section>

    <section className="nh-reading" aria-labelledby="nh-reading-title" data-scene="H5"><div className="nh-container nh-section">
      <div className="nh-section-heading" data-reveal><div><p className="nh-eyebrow">مجلهٔ همراه</p><h2 id="nh-reading-title">برای یک نگاه دقیق‌تر.</h2></div><Link className="nh-text-link" href="/insights">همهٔ یادداشت‌ها <ArrowUpLeft size={19}/></Link></div>
      <div className="nh-reading-grid" data-stagger>{featured.map(article => <Link className="nh-article" href={`/insights/${article.slug}`} key={article.slug}><div className="nh-article-media" aria-hidden="true"><BlogCover title={({ 'leverage-and-margin': 'اهرم، روی دیگر ریسک', 'broker-due-diligence': 'اعتماد، پس از بررسی', 'one-page-trading-plan': 'برنامه، پیش از معامله' } as Record<string, string>)[article.slug] || article.category} category={article.category}/></div><div className="nh-article-copy"><span>{article.category} · {article.minutes} دقیقه مطالعه</span><h3>{article.title}</h3><p>{article.summary}</p><span className="nh-card-action">خواندن یادداشت <ArrowUpLeft size={18}/></span></div></Link>)}</div>
    </div></section>

    <section className="nh-section nh-container nh-faq" aria-labelledby="nh-faq-title" data-scene="H6"><div data-reveal><p className="nh-eyebrow">پیش از شروع</p><h2 id="nh-faq-title">با آگاهی،<br/>قدم بعدی را بردارید.</h2><p>پاسخ پرسش‌های متداول دربارهٔ مسیر، تمرین و شرایط درخواست.</p><Link className="nh-text-link" href="/contact">پرسش دیگری دارید؟ <ArrowUpLeft size={18}/></Link></div><FAQ/></section>
    <section className="nh-container nh-final" data-reveal data-scene="H7"><div><p className="nh-eyebrow">انتخاب مسیر با شناخت بیشتر</p><h2>از تجربه و هدفتان بگویید.</h2><p>درخواست شما را بررسی می‌کنیم تا دربارهٔ مسیر متناسب با شرایطتان گفت‌وگو کنیم.</p></div><Link className="nh-button" href="/apply?offer=consultation">درخواست بررسی مسیر <ArrowUpLeft size={20}/></Link></section>
  </div>;
}

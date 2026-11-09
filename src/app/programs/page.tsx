import Link from 'next/link';
import { ArrowDown, ArrowLeft, BookOpen, Clock3, Layers3, Search } from 'lucide-react';
import { listAcademyCourses } from '@/lib/academy';
import { programs, published } from '@/lib/content';
import { pageMetadata } from '@/lib/site';
import { NextStep } from '../approach/PublicShell';
import { AcademyArt, numberFa } from './AcademyArt';

export const dynamic = 'force-dynamic';
export const metadata = pageMetadata({
  title: 'آکادمی همراه | دوره‌های فارکس، ژورنال و مدیریت ریسک',
  description: 'دوره‌ها و مسیرهای آموزشی همراه را بر اساس موضوع پیدا کنید، نمونه درس بخوانید و سرفصل و شرایط شروع هر دوره را ببینید.',
  path: '/programs',
});

type Query = Record<string, string | string[] | undefined>;
const single = (value: Query[string]) => (Array.isArray(value) ? value[0] : value)?.trim() || '';
const normalize = (value: string) => value.normalize('NFKC').replaceAll('ي', 'ی').replaceAll('ك', 'ک').replace(/[\s\u200c]+/g, ' ').trim().toLowerCase();

type CatalogCard = {
  slug: string; title: string; summary: string; category: string; level: string; cover: string;
  access: string; scope: string; duration?: number;
};

export default async function Programs({ searchParams }: { searchParams: Promise<Query> }) {
  const filters = await searchParams;
  const term = single(filters.q).slice(0, 120);
  const topic = single(filters.topic);
  const records = published('program');
  const listed = programs.map(program => {
    const edited = records.find(item => item.slug === program.slug);
    return edited ? { ...program, title: edited.title, description: edited.summary, level: edited.courseLevel || program.level, format: edited.deliveryFormat || program.format, saleStatus: edited.saleStatus || program.saleStatus } : program;
  });
  const additional = records.filter(item => !programs.some(program => program.slug === item.slug));
  const existing: CatalogCard[] = [
    ...listed.map(program => ({
      slug: program.slug, title: program.title, summary: program.description, category: 'مسیرهای آموزشی',
      cover: '/images/hamrah/' + (program.slug === 'practice' ? 'capability-journal.png' : 'capability-learning.png'),
      level: program.level, scope: numberFa(program.syllabus.length) + ' سرفصل',
      access: program.saleStatus === 'closed' ? 'ثبت‌نام بسته' : program.saleStatus === 'ready' ? 'آماده ثبت‌نام' : 'پذیرش با درخواست',
    })),
    ...additional.map(program => ({
      slug: program.slug, title: program.title, summary: program.summary, category: 'مسیرهای آموزشی',
      cover: '/images/hamrah/hamrah-guidance-sculpture.webp', level: program.courseLevel || '',
      scope: program.deliveryFormat || '', access: program.saleStatus === 'closed' ? 'ثبت‌نام بسته' : 'مشاهده شرایط',
    })),
  ];
  const courses: CatalogCard[] = [
    ...listAcademyCourses().filter(course => !existing.some(item => item.slug === course.slug)).map(course => ({
      ...course, access: course.isSample ? 'دورهٔ نمونه' : 'دورهٔ آکادمی', duration: course.minutes,
      scope: numberFa(course.modules.reduce((count, module) => count + module.lessons.length, 0)) + ' درس',
    })),
    ...existing,
  ];
  const topics = [...new Set(courses.map(course => course.category))];
  const results = courses.filter(course => (!topic || course.category === topic) &&
    normalize([course.title, course.summary, course.category, course.level].join(' ')).includes(normalize(term)));
  function topicLink(value: string) {
    const params = new URLSearchParams();
    if (term) params.set('q', term);
    if (value) params.set('topic', value);
    return '/programs' + (params.size ? '?' + params.toString() : '') + '#courses';
  }
  return <div className="subpage-shell ac-site">
    <header className="ac-mast container">
      <div className="ac-mast-copy">
        <nav className="ac-breadcrumb" aria-label="مسیر صفحه"><Link href="/">همراه</Link><span aria-hidden="true">/</span><span>آکادمی</span></nav>
        <h1>آکادمی <em>همراه</em></h1>
        <p>برای تصمیم‌های معاملاتی خود تمرین کنید. از یک درس کوتاه شروع کنید یا یک مسیر آموزشی را از ابتدا دنبال کنید.</p>
        <a className="ac-button ac-action" href="#courses">پیدا کردن دوره <ArrowDown size={18}/></a>
      </div>
      <div className="ac-mast-art"><AcademyArt cover="/images/hamrah/hamrah-principles-sculpture.webp" large/></div>
    </header>
    <section className="container ac-catalog" id="courses" aria-labelledby="catalog-title">
      <div className="ac-section-head"><div><h2 id="catalog-title">فهرست دوره‌ها</h2><p>{numberFa(results.length)} دوره و مسیر آموزشی</p></div>
        <form action="/programs#courses" method="get" role="search" className="ac-search">
          {topic && <input type="hidden" name="topic" value={topic}/>}
          <label className="sr-only" htmlFor="academy-query">جست‌وجو در دوره‌ها</label>
          <input id="academy-query" type="search" name="q" defaultValue={term} maxLength={120} placeholder="جست‌وجو در دوره‌ها…"/>
          <button type="submit" aria-label="جست‌وجو"><Search size={19}/></button>
        </form>
      </div>
      <nav className="ac-topics" aria-label="فیلتر موضوع دوره‌ها">
        {['', ...topics].map(value => <Link key={value} href={topicLink(value)} aria-current={topic === value ? 'true' : undefined}>{value || 'همهٔ دوره‌ها'}</Link>)}
      </nav>
      {results.length ? <div className="ac-cards" data-stagger>{results.map(course => <article className="ac-card" key={course.slug}>
        <Link className="ac-card-link" href={'/programs/' + course.slug}>
          <div className="ac-card-media"><AcademyArt cover={course.cover}/><span className="ac-access">{course.access}</span></div>
          <div className="ac-card-copy"><span className="ac-category">{course.category}</span>
            <h3>{course.title}</h3><p>{course.summary}</p>
            <div className="ac-card-foot"><div className="ac-meta">
              {course.scope && <span><BookOpen size={15}/>{course.scope}</span>}
              {course.duration ? <span><Clock3 size={15}/>{numberFa(course.duration)} دقیقه</span> : course.level && <span><Layers3 size={15}/>{course.level}</span>}
            </div><span className="ac-circle"><ArrowLeft size={16}/></span></div>
          </div>
        </Link>
      </article>)}</div> : <div className="ac-empty"><Search size={24}/><h3>دوره‌ای پیدا نشد.</h3><p>موضوع دیگری انتخاب کنید یا عبارت کوتاه‌تری بنویسید.</p><Link className="ac-button ac-outline" href="/programs#courses">نمایش همهٔ دوره‌ها</Link></div>}
    </section>
    <section className="section program-table-section" data-reveal><div className="container">
      <div className="section-heading"><div><p className="eyebrow">مقایسه سریع</p><h2>کدام مسیر به تجربه شما نزدیک‌تر است؟</h2></div><p>اگر هنوز مفاهیم پایه را نمی‌شناسید، دوره پایه مناسب‌تر است. اگر دانش اولیه دارید اما در اجرای برنامه منظم نیستید، مسیر تمرین را بررسی کنید.</p></div>
      <div className="ac-compare-mobile">{listed.map(program => <article key={program.slug}>
        <h3>{program.title}</h3><dl>{[['مناسب برای', program.audience], ['سطح', program.level], ['پیش‌نیاز', program.prerequisite], ['شیوهٔ یادگیری', program.format]].map(([label, value]) =>
          <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        <Link className="ac-backlink" href={'/programs/' + program.slug}>دیدن جزئیات مسیر <ArrowLeft size={16}/></Link>
      </article>)}</div>
      <div className="table-wrap"><table className="program-table"><caption className="sr-only">مقایسه مسیر پایه و مسیر تمرین فارکس</caption><thead><tr><th scope="col">معیار</th>{listed.map(program=><th scope="col" key={program.slug}>{program.title}</th>)}</tr></thead><tbody><tr><th scope="row">مناسب برای</th>{listed.map(program=><td key={program.slug}>{program.audience}</td>)}</tr><tr><th scope="row">سطح</th>{listed.map(program=><td key={program.slug}>{program.level}</td>)}</tr><tr><th scope="row">پیش‌نیاز</th>{listed.map(program=><td key={program.slug}>{program.prerequisite}</td>)}</tr><tr><th scope="row">شیوه یادگیری</th>{listed.map(program=><td key={program.slug}>{program.format}</td>)}</tr><tr><th scope="row">قدم بعدی</th>{listed.map(program=><td key={program.slug}><Link className="text-link" href={`/programs/${program.slug}`}>دیدن جزئیات {program.label}</Link></td>)}</tr></tbody></table></div>
    </div></section>

    <section className="container ac-disclosure" data-reveal><div><h2>شرایط پذیرش در مسیرهای آموزشی</h2><p>جزئیات هزینه، زمان برگزاری و پشتیبانی پس از نهایی شدن در صفحهٔ مسیر منتشر می‌شود. ثبت درخواست، خرید یا رزرو ظرفیت نیست.</p></div><Link className="ac-button ac-outline" href="/services">راهنمای انتخاب مسیر <ArrowLeft size={16}/></Link></section>
    <NextStep title="برای انتخاب مسیر به گفت‌وگو نیاز دارید؟" offer="consultation"/>
  </div>;
}

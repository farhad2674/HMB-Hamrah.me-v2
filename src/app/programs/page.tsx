import Link from 'next/link';
import { ArrowUpLeft, BookOpen, Check, ListChecks } from 'lucide-react';
import { programs, published } from '@/lib/content';
import { pageMetadata } from '@/lib/site';
import { PageIntro, NextStep } from '../approach/PublicShell';

export const dynamic = 'force-dynamic';
export const metadata = pageMetadata({
  title: 'دوره‌های آموزش فارکس | مقایسه سطح و سرفصل | همراه',
  description: 'مسیر پایه و تمرین عملی فارکس را بر اساس سطح، پیش‌نیاز، شیوه ارائه و وضعیت ثبت‌نام مقایسه کنید و مسیر مناسب خود را انتخاب کنید.',
  path: '/programs',
});

export default function Programs() {
  const records = published('program');
  const listed = programs.map(program => {
    const edited = records.find(item => item.slug === program.slug);
    return edited ? { ...program, title: edited.title, description: edited.summary, level: edited.courseLevel || program.level, format: edited.deliveryFormat || program.format, saleStatus: edited.saleStatus || program.saleStatus } : program;
  });
  const additional = records.filter(item => !programs.some(program => program.slug === item.slug));
  return <div className="subpage-shell">
    <PageIntro eyebrow="مسیرهای آموزشی / پایه و تمرین" title="آموزش را از نیاز خود انتخاب کنید." description="برای شناخت بازار، مسیر پایه را ببینید. برای کار روی اجرای برنامه، مسیر تمرین را بررسی کنید. سرفصل‌ها، پیش‌نیازها و روش هر مسیر، مبنای انتخاب شماست."/>
    <section className="section" data-reveal><div className="container program-compare">
      {listed.map((program,index)=><article className="card program-card interactive-card" data-reveal data-reveal-index={index} key={program.slug}>
        <div className="program-card-top">{index ? <ListChecks size={30}/> : <BookOpen size={30}/>}<span className="badge">{program.label}</span></div>
        <p className="eyebrow">{program.audience}</p><h2>{program.title}</h2><p>{program.description}</p>
        <dl className="program-specs"><div><dt>سطح</dt><dd>{program.level}</dd></div><div><dt>پیش‌نیاز</dt><dd>{program.prerequisite}</dd></div><div><dt>قالب</dt><dd>{program.format}</dd></div></dl>
        <p className="sale-state"><Check size={17}/>{program.saleStatus === 'closed' ? 'ثبت‌نام بسته است' : program.saleStatus === 'ready' ? 'آماده ثبت‌نام' : 'اطلاع از شرایط پس از ثبت درخواست'}</p>
        <Link className="btn btn-dark" href={`/programs/${program.slug}`}>دیدن سرفصل و شرایط <ArrowUpLeft size={18}/></Link>
      </article>)}
      {additional.map(program=><article className="card program-card" key={program.id}><p className="eyebrow">مسیر یادگیری</p><h2>{program.title}</h2><p>{program.summary}</p><Link className="btn btn-secondary" href={`/programs/${program.slug}`}>جزئیات مسیر <ArrowUpLeft size={18}/></Link></article>)}
    </div></section>
    <section className="section program-table-section" data-reveal><div className="container">
      <div className="section-heading"><div><p className="eyebrow">مقایسه سریع</p><h2>کدام مسیر به تجربه شما نزدیک‌تر است؟</h2></div><p>اگر هنوز مفاهیم پایه را نمی‌شناسید، دوره پایه مناسب‌تر است. اگر دانش اولیه دارید اما در اجرای برنامه منظم نیستید، مسیر تمرین را بررسی کنید.</p></div>
      <div className="table-wrap"><table className="program-table"><caption className="sr-only">مقایسه مسیر پایه و مسیر تمرین فارکس</caption><thead><tr><th scope="col">معیار</th>{listed.map(program=><th scope="col" key={program.slug}>{program.title}</th>)}</tr></thead><tbody><tr><th scope="row">مناسب برای</th>{listed.map(program=><td key={program.slug}>{program.audience}</td>)}</tr><tr><th scope="row">سطح</th>{listed.map(program=><td key={program.slug}>{program.level}</td>)}</tr><tr><th scope="row">پیش‌نیاز</th>{listed.map(program=><td key={program.slug}>{program.prerequisite}</td>)}</tr><tr><th scope="row">شیوه یادگیری</th>{listed.map(program=><td key={program.slug}>{program.format}</td>)}</tr><tr><th scope="row">قدم بعدی</th>{listed.map(program=><td key={program.slug}><Link className="text-link" href={`/programs/${program.slug}`}>دیدن جزئیات {program.label}</Link></td>)}</tr></tbody></table></div>
    </div></section>
    <section className="section" data-reveal><div className="container purchase-disclosure" data-reveal><div><h2>شرایط ثبت‌نام باید پیش از تعهد روشن باشد.</h2><p>قیمت، مدرس، مدت، زمان‌بندی، ظرفیت، شیوه برگزاری و حدود پشتیبانی فقط پس از تأیید نهایی در صفحه دوره منتشر می‌شوند. ثبت درخواست به معنی خرید یا رزرو ظرفیت نیست.</p></div><Link className="btn btn-secondary" href="/services">راهنمای انتخاب مسیر</Link></div></section>
    <NextStep title="برای انتخاب مسیر به گفت‌وگو نیاز دارید؟" offer="consultation"/>
  </div>;
}
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpLeft, Check, Clock3, GraduationCap, MessagesSquare, ShieldCheck } from 'lucide-react';
import Companion from '@/components/Companion';
import { CourseGeoAnswer } from '@/components/GeoAnswers';
import { programs, published } from '@/lib/content';
import { breadcrumbSchema, JsonLd, organizationSchema, pageMetadata, SITE_URL } from '@/lib/site';
import { PageIntro, TextBody } from '../../approach/PublicShell';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const base = programs.find(item => item.slug === slug);
  const edited = published('program').find(item => item.slug === slug);
  const title = edited?.seoTitle || (slug === 'foundations' ? 'دوره آموزش فارکس از صفر | سرفصل و شرایط ثبت‌نام | همراه' : edited?.title || base?.title || 'مسیر پیدا نشد');
  const description = edited?.metaDescription || (slug === 'foundations' ? 'فارکس را از شناخت بازار و نمودار تا مدیریت ریسک و پلن معاملاتی یاد بگیرید. سرفصل، پیش‌نیاز و وضعیت ثبت‌نام را ببینید و درخواست مشاوره ثبت کنید.' : edited?.summary || base?.description || 'جزئیات مسیر آموزشی همراه.');
  return pageMetadata({ title, description, path: `/programs/${slug}`, image: edited?.socialImage, imageAlt: edited?.imageAlt });
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const base = programs.find(item => item.slug === slug);
  const edited = published('program').find(item => item.slug === slug);
  if (!base && !edited) notFound();
  const program = base ? {
    ...base,
    title: edited?.title || base.title,
    description: edited?.summary || base.description,
    level: edited?.courseLevel || base.level,
    format: edited?.deliveryFormat || base.format,
    saleStatus: edited?.saleStatus || base.saleStatus,
  } : null;
  const courseSchema = program ? {
    '@context': 'https://schema.org', '@type': 'Course', '@id': `${SITE_URL}/programs/${slug}#course`,
    name: program.title, description: program.description, url: `${SITE_URL}/programs/${slug}`,
    inLanguage: 'fa-IR', educationalLevel: program.level, provider: { '@id': organizationSchema['@id'] },
    syllabusSections: program.syllabus.map((name,index)=>({ '@type':'Syllabus', name, position:index+1 })),
  } : null;
  const schemaItems: Record<string, unknown>[] = [breadcrumbSchema([{name:'خانه',path:'/'},{name:'آموزش‌ها',path:'/programs'},{name:program?.title || edited!.title,path:`/programs/${slug}`}])];
  if(courseSchema) schemaItems.push(courseSchema);
  return <>
    <JsonLd data={schemaItems}/>
    <PageIntro eyebrow={`آموزش‌ها / ${program?.label || 'مسیر یادگیری'}`} title={slug === 'foundations' ? 'دوره آموزش فارکس از صفر، با تمرین و ژورنال' : program?.title || edited!.title} description={program?.description || edited!.summary}/>
    {slug === 'foundations' && <div className="container"><CourseGeoAnswer/></div>}
    {edited?.body && !program ? <section className="section"><div className="container narrow"><TextBody body={edited.body}/></div></section> : program && <>
      <nav className="container course-jump-nav" aria-label="بخش‌های صفحه دوره"><a href="#course-fit">مناسب شماست؟</a><a href="#course-outcomes">خروجی دوره</a><a href="#course-syllabus">سرفصل‌ها</a><a href="#course-method">روش تمرین</a><a href="#course-registration">شرایط ثبت‌نام</a></nav>
      <section className="section" id="course-fit"><div className="container course-intro-grid">
        <div data-reveal><p className="eyebrow">مناسب چه کسانی است؟</p><h2>{program.audience}</h2><p>{program.prerequisite}</p><ul className="feature-list course-checks" id="course-outcomes">{program.outcomes.map(item=><li key={item}><Check size={18}/>{item}</li>)}</ul>{slug === 'foundations' && <div className="course-fit-note"><h3>چه زمانی مسیر دیگری مناسب‌تر است؟</h3><p>اگر مفاهیم پایه را می‌دانید و مسئله اصلی شما پایبندی به برنامه، ثبت تصمیم یا مرور اجرای واقعی است، ابتدا <Link href="/programs/practice">مسیر تمرین عملی فارکس</Link> را ببینید.</p></div>}</div>
        <aside className="course-summary-card" id="course-registration" data-reveal>
          <Companion mood="explain" size="sm"/>
          <span className="badge">{program.saleStatus === 'closed' ? 'ثبت‌نام بسته' : program.saleStatus === 'ready' ? 'آماده ثبت‌نام' : 'فقط درخواست اطلاع و مشاوره'}</span>
          <h2>خلاصه دوره</h2>
          <dl><div><dt><GraduationCap size={17}/> سطح</dt><dd>{program.level}</dd></div><div><dt><Clock3 size={17}/> شیوه ارائه</dt><dd>{program.format}</dd></div><div><dt><MessagesSquare size={17}/> پشتیبانی</dt><dd>{edited?.support || 'حدود پشتیبانی پیش از ثبت‌نام اعلام می‌شود'}</dd></div></dl>
          <div className="course-unknowns"><p><b>مدرس:</b> {edited?.instructorName || 'هنوز اعلام عمومی نشده است'}</p><p><b>مدت:</b> {edited?.duration || 'هنوز اعلام عمومی نشده است'}</p><p><b>هزینه:</b> هنوز اعلام عمومی نشده است</p></div>
          <Link className="btn btn-primary" href={`/apply?offer=${slug}`}>درخواست اطلاع از ثبت‌نام <ArrowUpLeft size={17}/></Link>
          <Link className="btn btn-secondary" href={`/apply?offer=consultation`}>مشاوره برای انتخاب دوره</Link>
        </aside>
      </div></section>
      <section className="section course-syllabus" id="course-syllabus"><div className="container"><p className="eyebrow">سرفصل‌های دوره</p><h2>از شناخت بازار تا مرور عملکرد</h2><div className="syllabus-list">{program.syllabus.map((item,index)=><article data-reveal data-reveal-index={index % 4} key={item}><span>{new Intl.NumberFormat('fa-IR',{minimumIntegerDigits:2}).format(index+1)}</span><h3>{item}</h3></article>)}</div></div></section>
      {slug === 'foundations' && <section className="section container course-sample" data-reveal><div><p className="eyebrow">نمونه درس واقعی</p><h2>پیش از هر معامله، سه سؤال بنویسید.</h2><p>نمونه درس همراه نشان می‌دهد چطور مشاهده را از پیش‌بینی جدا کنید، شرط بی‌اعتبار شدن فرضیه را بنویسید و دلیل انجام ندادن معامله را هم به‌عنوان یک تصمیم ثبت کنید.</p></div><Link className="btn btn-secondary" href="/insights/risk-before-trade">خواندن نمونه درس <ArrowUpLeft size={17}/></Link></section>}
      <section className="section" id="course-method"><div className="container grid-2"><article data-reveal><p className="eyebrow">روش ارائه</p><h2>آموزش به یک تمرین قابل مشاهده می‌رسد.</h2><p>هر مفهوم با یک پرسش یا تمرین ادامه پیدا می‌کند. اجرای تمرین در محیط آزمایشی ثبت می‌شود تا برنامه و عمل کنار هم قابل مرور باشند.</p><Link className="text-link" href="/approach">چرخه آموزش تا بازخورد <ArrowUpLeft size={17}/></Link></article><article className="card" data-reveal><ShieldCheck size={28}/><h2>شفافیت پیش از تعهد</h2><p>قیمت، مدرس، مدت دسترسی، ظرفیت، سیاست انصراف و جزئیات پشتیبانی تا زمان تأیید نهایی خالی می‌مانند. هیچ پرداختی در نسخه فعلی انجام نمی‌شود.</p><Link className="text-link" href="/risk-disclosure">ریسک معامله‌گری را بخوانید</Link></article></div></section>
      <section className="section"><div className="container"><p className="eyebrow">پرسش‌های متداول</p><h2>پیش از ثبت درخواست</h2><div className="course-faq"><details><summary>آیا دانش قبلی لازم است؟</summary><p>{program.prerequisite}</p></details><details><summary>آیا دوره سود یا قبولی در ارزیابی را تضمین می‌کند؟</summary><p>خیر. آموزش و تمرین نتیجه مالی مشخصی را تضمین نمی‌کند و معامله‌گری با احتمال زیان همراه است.</p></details><details><summary>چطور از زمان و هزینه مطلع شوم؟</summary><p>پس از قطعی شدن شرایط، همین صفحه به‌روزرسانی می‌شود. اکنون می‌توانید فقط درخواست اطلاع و مشاوره ثبت کنید.</p></details><details><summary>آیا پرداخت آنلاین فعال است؟</summary><p>خیر. صفحه خرید تنها وضعیت و خلاصه دوره را نشان می‌دهد و سفارش یا دسترسی آموزشی ایجاد نمی‌کند.</p></details></div></div></section>
    </>}
    <section className="container final-cta"><div><p className="eyebrow">قدم بعدی</p><h2>برای شرایط دوره درخواست ثبت کنید.</h2><p>این درخواست خرید یا رزرو قطعی نیست؛ جزئیات پس از بررسی اعلام می‌شوند.</p></div><Link className="btn btn-primary" href={`/apply?offer=${slug}`}>ثبت درخواست دوره <ArrowUpLeft size={17}/></Link></section>
  </>;
}

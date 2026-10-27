import Link from 'next/link';
import { ArrowUpLeft, BookOpen, Check, ClipboardCheck, MessageSquareText, NotebookPen, PlayCircle, ShieldCheck } from 'lucide-react';
import Companion from '@/components/Companion';
import { HomeGeoAnswers } from '@/components/GeoAnswers';
import { FAQ, PathPicker, ProcessDemo } from '@/components/HomeExperience';
import { articles } from '@/lib/content';

export default function HomePage() {
  return <>
    <section className="container redesign-hero" data-scene="H1">
      <div className="redesign-hero-copy">
        <p className="eyebrow"><span className="tiny-dot"/> آموزش فارکس، تمرین و بازخورد در یک مسیر</p>
        <h1>آموزش فارکس از پایه، با <span className="highlight-word">تمرین و ژورنال معاملاتی</span></h1>
        <p className="hero-description">از شناخت بازار و مدیریت ریسک شروع کنید، تصمیم‌هایتان را در ژورنال ثبت کنید و برای قدم بعدی بازخوردی روشن بگیرید؛ بدون وعده سود و بدون میان‌بُر.</p>
        <div className="hero-actions">
          <Link href="/programs/foundations" className="btn btn-dark">دیدن سرفصل دوره فارکس <ArrowUpLeft size={17}/></Link>
          <Link href="/apply?offer=foundations" className="btn btn-secondary">انتخاب مسیر با مشاوره</Link>
        </div>
        <ul className="hero-proof" aria-label="ویژگی‌های مسیر">
          <li><Check size={15}/> مناسب شروع از پایه</li>
          <li><Check size={15}/> تمرین در محیط آزمایشی</li>
          <li><Check size={15}/> ژورنال و مرور تصمیم</li>
        </ul>
      </div>
      <div className="companion-stage" aria-label="همراه؛ راهنمای آموزشی مسیر">
        <Companion mood="welcome" size="lg"/>
        <div className="companion-note"><span>همراه می‌گوید</span><strong>قدم اول: بدانید چرا وارد یک تصمیم می‌شوید.</strong></div>
        <div className="lesson-chip lesson-chip-one"><BookOpen size={17}/> درس کوتاه و روشن</div>
        <div className="lesson-chip lesson-chip-two"><NotebookPen size={17}/> تمرین قابل ثبت</div>
      </div>
    </section>

    <div className="journey-strip" aria-label="چرخه یادگیری همراه"><div className="container redesign-journey">
      <span>آموزش</span><i aria-hidden="true"/> <span>تمرین</span><i aria-hidden="true"/> <span>ثبت در ژورنال</span><i aria-hidden="true"/> <span>بازخورد</span><i aria-hidden="true"/> <span>اصلاح</span>
    </div></div>

    <div data-reveal><HomeGeoAnswers/></div>

    <section className="section container" data-scene="H2" data-reveal>
      <div className="section-heading"><div><p className="eyebrow"><span className="tiny-dot"/> از نیاز امروز شما</p><h2>کدام مسیر برای شما مناسب‌تر است؟</h2></div><p>اگر تازه شروع می‌کنید، مسیر پایه را ببینید. اگر مفاهیم را می‌دانید اما اجرای منظم دشوار است، تمرین یا کوچینگ می‌تواند قدم بعدی باشد.</p></div>
      <PathPicker/>
    </section>

    <section className="section method-section" data-scene="H3" data-reveal><div className="container">
      <div className="section-heading"><div><p className="eyebrow"><span className="tiny-dot"/> نمونه‌ای از روش همراه</p><h2>یک درس، یک تمرین، یک قدم بعدی</h2></div><div><p>این نمونه با داده ساختگی نشان می‌دهد آموزش چگونه به ثبت تصمیم و بازخورد تبدیل می‌شود.</p><Link className="text-link" href="/approach">روش همراه را کامل ببینید <ArrowUpLeft size={17}/></Link></div></div>
      <ProcessDemo/>
    </div></section>

    <section className="section container feature-course" data-scene="H4" data-reveal>
      <div className="feature-course-copy">
        <span className="badge">دوره اصلی همراه</span>
        <h2>دوره آموزش ترید فارکس از پایه</h2>
        <p>یک مسیر ساختارمند برای شناخت بازار فارکس، خواندن نمودار، مدیریت سرمایه، روان‌شناسی تصمیم و ساخت پلن معاملاتی؛ هر بخش با تمرین و ژورنال همراه می‌شود.</p>
        <div className="course-facts">
          <span><BookOpen size={18}/><b>سطح</b> مقدماتی تا میانی</span>
          <span><ClipboardCheck size={18}/><b>پیش‌نیاز</b> بدون دانش قبلی</span>
          <span><MessageSquareText size={18}/><b>ثبت‌نام</b> پس از اعلام شرایط</span>
        </div>
        <div className="button-row">
          <Link className="btn btn-dark" href="/programs/foundations">سرفصل و شرایط ثبت‌نام <ArrowUpLeft size={17}/></Link>
          <Link className="text-link" href="/checkout?course=foundations">پیش‌نمایش مسیر خرید</Link>
        </div>
      </div>
      <div className="sample-lesson-card">
        <div className="sample-lesson-head"><span><PlayCircle size={20}/> نمونه درس</span><small>حدود ۳ دقیقه مطالعه</small></div>
        <h3>پیش از هر معامله، چه چیزی را باید بنویسیم؟</h3>
        <p>یک موقعیت فرضی را انتخاب کنید. دلیل بررسی، شرط بی‌اعتبار شدن فرضیه و دلیل انجام ندادن معامله را پیش از دیدن نتیجه ثبت کنید.</p>
        <ul><li>مشاهده را از پیش‌بینی جدا کنید.</li><li>مرز ریسک را پیش از اجرا بنویسید.</li><li>کیفیت تصمیم را جدا از سود و زیان مرور کنید.</li></ul>
        <Link className="text-link" href="/insights/risk-before-trade">خواندن نمونه درس <ArrowUpLeft size={17}/></Link>
      </div>
    </section>

    <section className="section journal-home" data-scene="H5" data-reveal><div className="container journal-home-grid">
      <div className="journal-home-art"><Companion mood="practice" size="md"/><div className="journal-paper"><span>نمونه ژورنال</span><strong>برنامه: فقط پس از کامل شدن سه شرط</strong><p>اجرا: شرط دوم کامل نبود؛ تصمیم را متوقف کردم.</p><small>قدم بعدی: همین چک‌لیست را در سه تمرین تکرار کن.</small></div></div>
      <div><p className="eyebrow"><span className="tiny-dot"/> ژورنال معاملاتی</p><h2>چیزی را ثبت کنید که بعداً به کارتان بیاید.</h2><p>در ژورنال همراه، برنامه پیش از تصمیم، آنچه واقعاً اجرا شد و بازخورد مربی کنار هم دیده می‌شوند. دموی عمومی فقط از داده‌های نمونه استفاده می‌کند.</p><div className="button-row"><Link className="btn btn-primary" href="/journal">دموی ژورنال را ببینید <ArrowUpLeft size={17}/></Link><Link className="text-link" href="/coaching">آشنایی با کوچینگ</Link></div></div>
    </div></section>

    <section className="section container" data-scene="H6" data-reveal>
      <div className="section-heading"><div><p className="eyebrow"><span className="tiny-dot"/> محتوای آموزشی</p><h2>برای تصمیم بهتر، کوتاه و کاربردی بخوانید.</h2></div><Link className="text-link" href="/insights">همه مقاله‌ها <ArrowUpLeft size={17}/></Link></div>
      <div className="grid-3">{articles.filter(article=>article.featured).slice(0,3).map((article,index)=><article className="card insight-card" key={article.slug}><div className={`article-illustration illustration-${index+1}`} aria-hidden="true">۰{index+1}</div><span className="badge">{article.category}</span><h3>{article.title}</h3><p>{article.summary}</p><Link className="text-link" href={`/insights/${article.slug}`}>مطالعه مقاله <ArrowUpLeft size={16}/></Link></article>)}</div>
    </section>

    <section className="section faq-home" data-scene="H7" data-reveal><div className="container faq-section"><div><p className="eyebrow"><span className="tiny-dot"/> پرسش‌های پیش از ثبت‌نام</p><h2>پیش از شروع، پاسخ روشن بگیرید.</h2><p>قیمت، زمان، مدرس و ظرفیت فقط پس از قطعی شدن در سایت منتشر می‌شوند. ثبت درخواست، خرید یا رزرو قطعی نیست.</p></div><FAQ/></div></section>

    <section className="container final-cta" data-scene="H8" data-reveal><div><p className="eyebrow"><ShieldCheck size={16}/> شروع مسئولانه</p><h2>مسیر فارکس را با یک قدم روشن شروع کنید.</h2><p>سرفصل‌ها را ببینید یا برای انتخاب مسیر مناسب، درخواست مشاوره ثبت کنید.</p></div><div className="button-row"><Link className="btn btn-primary" href="/programs/foundations">دیدن سرفصل دوره <ArrowUpLeft size={17}/></Link><Link className="btn btn-secondary" href="/apply?offer=foundations">انتخاب مسیر با مشاوره</Link></div></section>
  </>;
}

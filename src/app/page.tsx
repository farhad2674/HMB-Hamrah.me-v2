import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpLeft, ArrowDown, BookOpen, NotebookPen, MessageSquareText, MoveLeft } from 'lucide-react';
import DecisionStudio from '@/components/DecisionStudio';
import ScrollJourney from '@/components/ScrollJourney';
import { FAQ, PathPicker } from '@/components/HomeExperience';
import { articles } from '@/lib/content';
import { PrinciplesChapter, GuidanceChapter } from '@/components/HomeChapters';
import './home-chapters.css';

const capabilities = [
  { number: '01', title: 'دانشی که به کار می‌آید.', text: 'از ساختار بازار تا مدیریت ریسک؛ مفاهیم را با تمرینی دنبال کنید که بتوانید دلیل انجامش را توضیح دهید.', href: '/programs/foundations', link: 'مسیر یادگیری', icon: BookOpen, art: 'learning' },
  { number: '02', title: 'تصمیمی که ثبت می‌شود.', text: 'پیش از اجرا، برنامه را بنویسید. پس از آن، فاصلهٔ میان قصد و عمل را در ژورنال ببینید.', href: '/journal', link: 'کاوش در ژورنال', icon: NotebookPen, art: 'journal' },
  { number: '03', title: 'بازخوردی که جهت می‌دهد.', text: 'با مرور تصمیم‌های ثبت‌شده، مسئلهٔ مشخصی برای گفت‌وگو و تمرین بعدی پیدا کنید.', href: '/coaching', link: 'آشنایی با کوچینگ', icon: MessageSquareText, art: 'feedback' },
];
export default function HomePage() {
  return <div className="pro-home">
    <section className="pro-hero container" data-scene="H1"><div className="pro-hero-copy">
      <p className="pro-kicker"><span/> همراه؛ آموزش و توسعهٔ مهارت معامله‌گری</p>
      <h1>هر تصمیم،<br/><span>پشتوانه‌ای</span><br/>می‌خواهد.</h1>
      <p className="pro-hero-description">معامله‌گری را با شناخت بازار شروع کنید؛ با تمرین، ثبت تصمیم و بازخورد ادامه دهید. همراه، جایی برای ساختن این پیوستگی است.</p>
      <div className="pro-actions"><Link href="/programs" className="btn pro-button">مسیرهای یادگیری <ArrowUpLeft size={18}/></Link><Link href="/approach" className="pro-quiet-link">نگاه ما به معامله‌گری <MoveLeft size={17}/></Link></div>
      <div className="pro-hero-foot"><span>آموزش فارکس · ژورنال · کوچینگ</span><span>آموزش، تضمین بازده مالی نیست.</span></div>
    </div><div className="home-studio-layer" data-parallax="16"><DecisionStudio/></div><a className="pro-scroll" href="#capabilities"><ArrowDown size={15}/><span>از شناخت تا عمل</span></a></section>
    <div className="pro-principles"><div className="container"><span dir="ltr">HMB / THE PRACTICE OF DECISION</span><p>شناخت <i/> تمرین <i/> ثبت <i/> بازخورد</p><span>یک مسیرِ به‌هم‌پیوسته</span></div></div>
    <div className="pro-capabilities-band"><section className="pro-section container" id="capabilities" data-scene="H2" data-reveal>
      <div className="pro-section-index"><span>۰۱ — نگاه همراه</span><span dir="ltr">BUILT AROUND YOUR DECISIONS</span></div>
      <div className="pro-section-heading"><h2>دانستن، آغاز ماجراست.<br/><span>مهارت، در ادامه شکل می‌گیرد.</span></h2><p>فاصلهٔ میان یادگیری و اجرا را با یک چرخهٔ مشخص دنبال می‌کنیم: فهمیدن، آزمودن و برگشتن به تصمیم‌ها.</p></div>
      <div className="pro-capabilities" data-stagger>{capabilities.map(item=><Link className="pro-capability" href={item.href} key={item.number}><div className="pro-card-index"><span dir="ltr">{item.number}</span><item.icon size={17}/></div><div className="capability-art" aria-hidden="true"><Image src={`/images/hamrah/capability-${item.art}.png`} alt="" fill sizes="(max-width:600px) calc(100vw - 88px), (max-width:800px) 42vw, 28vw"/></div><h3>{item.title}</h3><p>{item.text}</p><span className="pro-card-link">{item.link}<ArrowUpLeft size={17}/></span></Link>)}</div>
    </section>
    </div><PrinciplesChapter/><ScrollJourney/><GuidanceChapter/>
    <section className="pro-section container pro-path-section" data-scene="H4" data-reveal><div className="pro-section-index"><span>۰۵ — مسیر شما</span><span dir="ltr">A CONSIDERED NEXT STEP</span></div><div className="pro-section-heading"><h2>از جایی شروع کنید<br/>که <span>امروز ایستاده‌اید.</span></h2><p>شروع از پایه، نظم در تمرین یا مرور با مربی؛ نیاز امروزتان را انتخاب کنید و جزئیات مسیر را ببینید.</p></div><PathPicker/><p className="pro-path-note">زمان، هزینه و ظرفیت هر مسیر پیش از پذیرش اعلام می‌شود. ثبت درخواست، خرید یا رزرو قطعی نیست.</p></section>
    <section className="pro-section container pro-reading" data-scene="H5" data-reveal><div className="pro-section-index"><span>۰۶ — مجلهٔ همراه</span><span dir="ltr">NOTES WORTH RETURNING TO</span></div><div className="pro-section-heading"><h2>کمی مکث.<br/><span>یک نگاه دقیق‌تر.</span></h2><Link href="/insights" className="pro-quiet-link">همهٔ یادداشت‌ها <ArrowUpLeft size={18}/></Link></div><div className="pro-article-grid" data-stagger>{articles.filter(a=>a.featured).slice(0,3).map((article,i)=><Link href={`/insights/${article.slug}`} className="pro-article" key={article.slug}><div className={`pro-article-art pro-article-art-${i}`} aria-hidden="true"><div data-parallax="16"/><span dir="ltr">HMB / FIELD NOTES</span><b>{({ 'leverage-and-margin': 'اهرم، روی دیگر ریسک', 'broker-due-diligence': 'اعتماد، پس از بررسی', 'one-page-trading-plan': 'برنامه، پیش از معامله' } as Record<string,string>)[article.slug] || article.category}</b></div><span className="pro-article-category">{article.category}</span><h3>{article.title}</h3><p>{article.summary}</p><span className="pro-card-link">خواندن یادداشت <ArrowUpLeft size={16}/></span></Link>)}</div></section>
    <section className="pro-section container pro-faq" data-scene="H6" data-reveal><div><div className="pro-section-index"><span>۰۷ — پیش از شروع</span></div><h2>انتخاب آگاهانه،<br/><span>با پاسخ روشن.</span></h2><p>دربارهٔ مسیر، شیوهٔ تمرین و شرایط درخواست بیشتر بدانید.</p><Link href="/contact" className="pro-quiet-link">پرسش دیگری دارید؟ <ArrowUpLeft size={17}/></Link></div><FAQ/></section>
    <section className="pro-closing" data-scene="H7" data-reveal><div className="container"><span className="pro-closing-orbit" data-parallax="16" aria-hidden="true"/><p className="pro-kicker"><span/> ۰۸ — قدم بعدی، با شناخت بیشتر</p><h2>مسیر شما،<br/><span>از یک تصمیم آغاز می‌شود.</span></h2><p>مسیرها را بررسی کنید. اگر برای انتخاب به گفت‌وگو نیاز دارید، از تجربه و هدفتان برای ما بنویسید.</p><div className="pro-actions"><Link href="/apply?offer=consultation" className="btn pro-button">درخواست بررسی مسیر <ArrowUpLeft size={18}/></Link><Link href="/programs" className="pro-quiet-link">بررسی مسیرهای آموزشی <MoveLeft size={18}/></Link></div></div></section>
  </div>;
}

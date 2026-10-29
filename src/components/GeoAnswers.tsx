import Link from 'next/link';
import { ArrowUpLeft } from 'lucide-react';

export function HomeGeoAnswers() {
  return <section className="section geo-answer-section" aria-labelledby="geo-home-title"><div className="container">
    <div className="geo-answer-lead"><p className="eyebrow"><span className="tiny-dot"/> آموزش، با تمرکز بر تصمیم</p><h2 id="geo-home-title">دانش بازار را به روش کار تبدیل کنید.</h2><p>در همراه، آموزش فارکس با تمرین آزمایشی، ژورنال و مرور تصمیم ادامه پیدا می‌کند. از شناخت بازار و تعریف ریسک تا نوشتن برنامه و بررسی اجرای آن؛ هر مرحله، موضوع مشخصی برای تمرین دارد.</p></div>
    <div className="geo-question-grid">
      <article><h3>از مبانی شروع کنید.</h3><p>ساختار بازار، خواندن نمودار و مدیریت ریسک را بشناسید و برای یک موقعیت فرضی برنامه بنویسید. دانش قبلی شرط شروع مسیر پایه نیست.</p></article>
      <article><h3>اجرای خود را ثبت کنید.</h3><p>برنامه، دلیل تصمیم و آنچه انجام داده‌اید را در ژورنال کنار هم بگذارید؛ کیفیت اجرا را جدا از نتیجه مالی مرور کنید.</p></article>
      <article><h3>با یک تمرین ادامه دهید.</h3><p>در مسیر کوچینگ، تصمیم ثبت‌شده را با مربی مرور کنید و بازخورد را به موضوعی مشخص برای تمرین بعدی تبدیل کنید.</p></article>
    </div>
    <Link className="text-link" href="/approach">آشنایی با روش همراه <ArrowUpLeft size={17}/></Link>
  </div></section>;
}

export function CourseGeoAnswer() {
  return <aside className="geo-course-answer" aria-labelledby="geo-course-title"><p className="eyebrow">آنچه در این مسیر می‌آموزید</p><h2 id="geo-course-title">مبانی بازار، در خدمت یک برنامه روشن.</h2><p>از سازوکار فارکس و خواندن نمودار تا سناریوی ورود و خروج، مدیریت ریسک و نوشتن پلن معاملاتی پیش می‌روید. تمرین‌های آزمایشی و ژورنال به شما امکان می‌دهند برنامه را با اجرا مقایسه کنید. این مسیر از پایه آغاز می‌شود و سود یا قبولی در ارزیابی معاملاتی را تضمین نمی‌کند.</p></aside>;
}

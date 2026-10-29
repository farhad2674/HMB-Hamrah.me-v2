import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpLeft, MoveLeft } from 'lucide-react';

export function PrinciplesChapter() {
  return <section id="principles" className="home-chapter home-chapter--principles" aria-labelledby="principles-title">
    <div className="container">
      <div className="pro-section-index" data-reveal><span>۰۲ — اصول همراه</span><span dir="ltr">CLARITY BEFORE COMMITMENT</span></div>
      <div className="home-chapter-grid">
        <div className="home-chapter-copy" data-reveal>
          <h2 id="principles-title">معیارهای روشن،<br/><span>پیش از شروع همراهی.</span></h2>
          <p className="home-chapter-intro">همراه، آموزش فارکس را به تمرین آزمایشی، ثبت تصمیم و بازخورد پیوند می‌دهد. هدف، روشن‌تر شدن شیوهٔ تصمیم‌گیری شماست؛ با هدف آموزشی مشخص و حدود خدماتی که پیش از شروع می‌شناسید.</p>
          <dl className="home-principle-list" data-stagger>
            <div><dt><span aria-hidden="true">۰۱</span>شفافیت</dt><dd>هدف، شیوه و حدود همراهی را پیش از شروع روشن می‌کنیم.</dd></div>
            <div><dt><span aria-hidden="true">۰۲</span>احترام</dt><dd>تصمیم را بررسی می‌کنیم و برای فهم زمینهٔ آن وقت می‌گذاریم.</dd></div>
            <div><dt><span aria-hidden="true">۰۳</span>مسئولیت</dt><dd>تمرین و بازخورد، بخشی از مسیر یادگیری‌اند. نتیجهٔ مالی تضمین نمی‌شود.</dd></div>
          </dl>
          <Link className="pro-quiet-link home-chapter-link" href="/about">نگاه و اصول همراه <ArrowUpLeft size={18}/></Link>
        </div>
        <div className="home-chapter-art" aria-hidden="true" data-reveal><div data-parallax="16"><Image src="/images/hamrah/hamrah-principles-sculpture.webp" alt="" fill sizes="(max-width:800px) calc(100vw - 40px), 45vw"/></div></div>
      </div>
    </div>
  </section>;
}

export function GuidanceChapter() {
  return <section id="human-guidance" className="home-chapter home-chapter--guidance" aria-labelledby="guidance-title">
    <div className="container">
      <div className="pro-section-index" data-reveal><span>۰۴ — همراهی انسانی</span><span dir="ltr">A CONVERSATION WITH PURPOSE</span></div>
      <div className="home-chapter-grid">
        <div className="home-chapter-copy" data-reveal>
          <h2 id="guidance-title">یک گفت‌وگوی دقیق،<br/><span>برای تمرین بعدی.</span></h2>
          <p className="home-chapter-intro">در کوچینگ همراه، برنامه و اجرای ثبت‌شده در ژورنال، مبنای گفت‌وگو با مربی است. مرور این اطلاعات کمک می‌کند یک رفتار مشخص را برای تمرین بعدی انتخاب کنید.</p>
          <div className="home-guidance-example">
            <p className="home-example-label"><span/>نمونهٔ آموزشی</p>
            <dl>
              <div><dt>ثبت شما</dt><dd>قرار بود تا کامل شدن شروط برنامه صبر کنم؛ زودتر وارد شدم.</dd></div>
              <div><dt>پرسش مربی</dt><dd>کدام شرط هنوز کامل نشده بود؟</dd></div>
              <div><dt>تمرین بعدی</dt><dd>پیش از اجرای آزمایشی بعد، شروط برنامه را علامت بزنید و موارد ناقص را ثبت کنید.</dd></div>
            </dl>
          </div>
          <div className="pro-actions"><Link className="btn pro-button" href="/apply?offer=coaching">درخواست بررسی کوچینگ <ArrowUpLeft size={18}/></Link><Link className="pro-quiet-link" href="/coaching">شیوهٔ همراهی مربی <MoveLeft size={17}/></Link></div>
          <p className="home-chapter-note">موضوع، مربی، زمان پاسخ و شرایط همراهی پیش از پذیرش مشخص می‌شود. ثبت درخواست، رزرو قطعی نیست.</p>
        </div>
        <div className="home-chapter-art" aria-hidden="true" data-reveal><div data-parallax="16"><Image src="/images/hamrah/hamrah-guidance-sculpture.webp" alt="" fill sizes="(max-width:800px) calc(100vw - 40px), 45vw"/></div></div>
      </div>
    </div>
  </section>;
}

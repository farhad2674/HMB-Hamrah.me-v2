import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpLeft } from 'lucide-react';

function introKind(eyebrow: string) {
  if (/حریم|شرایط|ریسک و حدود|اعتماد و شفافیت/.test(eyebrow)) return 'policy';
  if (/مجله/.test(eyebrow)) return 'editorial';
  if (/ژورنال/.test(eyebrow)) return 'journal';
  if (/آموزش|مسیر/.test(eyebrow)) return 'learning';
  return 'practice';
}

const introArtwork = {
  policy: 'hamrah-principles-sculpture.webp',
  editorial: 'capability-learning.png',
  journal: 'capability-journal.png',
  learning: 'hamrah-principles-sculpture.webp',
  practice: 'hamrah-guidance-sculpture.webp',
};

export function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  const kind = introKind(eyebrow);
  const context = eyebrow.split('/')[0].trim();
  return <header className="page-intro nv-intro" data-intro-kind={kind}>
    <div className="container">
      <nav className="nv-breadcrumb" aria-label="مسیر صفحه"><Link href="/">همراه</Link><span aria-hidden="true">/</span><span>{context}</span></nav>
      <div className="nv-intro-grid">
        <div className="nv-intro-copy"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{description}</p></div>
        <div className="nv-intro-art" aria-hidden="true"><Image src={`/images/hamrah/${introArtwork[kind]}`} alt="" fill sizes="(max-width: 599px) 80vw, (max-width: 949px) 35vw, 380px"/></div>
      </div>
    </div>
  </header>;
}

export function NextStep({ title = 'مسیر بعدی را با شناخت نیازتان انتخاب کنید.', text = 'از تجربه و نیاز فعلی خود بنویسید. تناسب مسیر بررسی می‌شود و شرایط، زمان و ظرفیت پیش از پذیرش اعلام خواهد شد.', offer = 'consultation' }: { title?: string; text?: string; offer?: string }) {
  return <section className="section subpage-next-section" data-reveal><div className="container"><div className="nv-next-step"><div><p className="eyebrow">قدم بعدی، متناسب با شما</p><h2>{title}</h2><p>{text}</p></div><Link className="btn btn-primary" href={`/apply?offer=${offer}`}>{offer === 'events' ? 'ثبت علاقه‌مندی به رویداد' : offer === 'coaching' ? 'درخواست بررسی کوچینگ' : 'ثبت درخواست مشاوره'} <ArrowUpLeft size={18}/></Link></div></div></section>;
}

export function TextBody({ body }: { body: string }) {
  return <div className="prose">{body.split('\n\n').map((paragraph, index) => <p key={index} style={{ whiteSpace: 'pre-line' }}>{paragraph}</p>)}</div>;
}

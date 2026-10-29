import Link from 'next/link';
import { ArrowUpLeft, ArrowLeft } from 'lucide-react';

function introKind(eyebrow: string) {
  if (/حریم|شرایط|ریسک و حدود|اعتماد و شفافیت/.test(eyebrow)) return 'policy';
  if (/مجله/.test(eyebrow)) return 'editorial';
  if (/ژورنال/.test(eyebrow)) return 'journal';
  if (/آموزش|مسیر/.test(eyebrow)) return 'learning';
  return 'practice';
}

export function PageIntro({eyebrow,title,description}:{eyebrow:string;title:string;description:string}) {
  const kind = introKind(eyebrow);
  const context = eyebrow.split('/')[0].trim();
  return <header className="page-intro subpage-intro" data-intro-kind={kind}>
    <div className="container">
      <div className="subpage-intro-top"><nav aria-label="مسیر صفحه"><Link href="/">همراه</Link><span aria-hidden="true">/</span><span>{context}</span></nav><span dir="ltr">HMB / {kind === 'editorial' ? 'FIELD NOTES' : kind === 'policy' ? 'PRINCIPLES' : kind === 'journal' ? 'THE DECISION RECORD' : 'LEARNING IN PRACTICE'}</span></div>
      <div className="subpage-intro-grid"><div className="subpage-intro-copy"><p className="eyebrow"><span className="subpage-intro-dot"/>{eyebrow}</p><h1>{title}</h1><p className="muted">{description}</p></div>
        <div className="subpage-intro-art" aria-hidden="true"><div className="subpage-art-orbit"/><div className="subpage-art-orbit subpage-art-orbit-two"/><div className="subpage-art-sheet subpage-art-sheet-back"/><div className="subpage-art-sheet"><span className="subpage-art-mark">HMB<span/></span><div className="subpage-art-lines"><i/><i/><i/></div><div className="subpage-art-checks"><b/><b/><b/></div><span className="subpage-art-rule"/></div><span className="subpage-art-point"/><span className="subpage-art-coordinate" dir="ltr">LEARN. PRACTISE. REFLECT.</span></div>
      </div>
      <div className="subpage-intro-bottom"><span>شناخت، پشتوانهٔ تصمیم.</span><ArrowLeft size={16} strokeWidth={1.25}/><span dir="ltr">HAMRAH / A CONSIDERED APPROACH</span></div>
    </div>
  </header>;
}

export function NextStep({title='مسیر بعدی را با شناخت نیازتان انتخاب کنید.',text='از تجربه و نیاز فعلی خود بنویسید. تناسب مسیر بررسی می‌شود و شرایط، زمان و ظرفیت پیش از پذیرش اعلام خواهد شد.',offer='consultation'}:{title?:string;text?:string;offer?:string}) {
 return <section className="section subpage-next-section" data-reveal><div className="container"><div className="card next-step subpage-next-step"><div><p className="eyebrow"><span className="subpage-intro-dot"/> قدم بعدی، متناسب با شما</p><h2>{title}</h2><p className="muted">{text}</p></div><Link className="btn btn-primary" href={`/apply?offer=${offer}`}>{offer === 'events' ? 'ثبت علاقه‌مندی به رویداد' : offer === 'coaching' ? 'درخواست بررسی کوچینگ' : 'ثبت درخواست مشاوره'} <ArrowUpLeft size={18}/></Link><span className="subpage-next-orbit" aria-hidden="true"/></div></div></section>;
}
export function TextBody({body}:{body:string}) { return <div className="prose">{body.split('\n\n').map((p,i)=><p key={i} style={{whiteSpace:'pre-line'}}>{p}</p>)}</div>; }

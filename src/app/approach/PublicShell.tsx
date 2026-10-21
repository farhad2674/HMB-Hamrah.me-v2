import Link from 'next/link';
import { ArrowUpLeft } from 'lucide-react';

export function PageIntro({eyebrow,title,description}:{eyebrow:string;title:string;description:string}) {
  return <header className="page-intro"><div className="container"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="muted">{description}</p></div></header>;
}
export function NextStep({title='از نقطهٔ خودتان شروع کنید.',text='درخواست شما برای شناخت نیاز و بررسی تناسب مسیر است. زمان، ظرفیت و شرایط پیش از پذیرش مشخص می‌شود.',offer='consultation'}:{title?:string;text?:string;offer?:string}) {
 return <section className="section"><div className="container"><div className="card next-step"><div><p className="eyebrow">قدم بعدی</p><h2>{title}</h2><p className="muted">{text}</p></div><Link className="btn btn-primary" href={`/apply?offer=${offer}`}>درخواست بررسی مسیر <ArrowUpLeft size={18}/></Link></div></div></section>;
}
export function TextBody({body}:{body:string}) { return <div className="prose">{body.split('\n\n').map((p,i)=><p key={i} style={{whiteSpace:'pre-line'}}>{p}</p>)}</div>; }

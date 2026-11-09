import Link from 'next/link';
import { ArrowUpLeft, CalendarDays, CircleHelp, Compass, LogIn, UserRound } from 'lucide-react';
import MemberNavigation from './MemberNavigation';
import SignOut from './SignOut';

export default function MemberFrame({ children, preview = false, name, library = false }: {
  children: React.ReactNode; preview?: boolean; name?: string; library?: boolean;
}) {
  const today = new Intl.DateTimeFormat('fa-IR', { weekday: 'long', day: 'numeric', month: 'long', timeZone: 'Asia/Tehran' }).format(new Date());
  return <div className="member-layout" data-library={library || undefined}>
    <aside className="member-rail">
      <div className="member-rail-inner">
        <Link className="member-brand" href="/" aria-label="همراه، صفحه اصلی"><b dir="ltr">HMB<i/></b><span>آکادمی همراه</span></Link>
        <div className="member-identity"><span className="member-avatar" aria-hidden="true"><UserRound size={21}/></span>
          <div><strong>{name || 'فضای اعضا'}</strong><small>{preview ? 'حساب نمایشی' : 'میز یادگیری همراه'}</small></div>
        </div>
        <MemberNavigation preview={preview} library={library}/>
        <div className="member-rail-links">
          <Link href="/programs"><Compass size={18}/>کشف دوره‌ها<ArrowUpLeft size={15}/></Link>
          <Link href="/contact"><CircleHelp size={18}/>پشتیبانی همراه<ArrowUpLeft size={15}/></Link>
        </div>
      </div>
    </aside>
    <div className="member-body">
      <header className="member-top">
        <div className="member-top-brand"><Link className="member-mobile-brand" href="/" aria-label="همراه، صفحه اصلی"><b dir="ltr">HMB</b></Link><span className="member-live-dot"/>میز یادگیری همراه</div>
        <div className="member-top-actions"><span className="member-today"><CalendarDays size={16}/>{today}</span>
          {preview || !name ? <Link href="/login"><LogIn size={16}/>ورود اعضا</Link> : <SignOut/>}
        </div>
      </header>
      {children}
      <footer className="member-footer"><Link href="/">همراه</Link><Link href="/contact">پشتیبانی</Link><Link href="/privacy">حریم خصوصی</Link><Link href="/terms">شرایط استفاده</Link></footer>
    </div>
  </div>;
}

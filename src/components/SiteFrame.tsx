'use client';

import { usePathname } from 'next/navigation';
import { Header, Footer } from './Shell';

export function SiteFrame({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const privateArea = path === '/member' || path.startsWith('/member/') || path === '/dashboard-preview';
  return <>
    {!privateArea && <><Header/><div className="reading-progress" aria-hidden="true"><span/></div></>}
    <main id="main" className={privateArea ? undefined : 'public-content'}>{children}</main>
    {!privateArea && <Footer/>}
  </>;
}

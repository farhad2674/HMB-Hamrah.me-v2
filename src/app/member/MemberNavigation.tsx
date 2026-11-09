'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, LayoutGrid, LogIn, NotebookPen, ShieldCheck } from 'lucide-react';

export default function MemberNavigation({ preview = false, library = false }: { preview?: boolean; library?: boolean }) {
  const pathname = usePathname();
  const destinations = [
    { href: preview ? '/dashboard-preview' : '/member/overview', label: 'نمای کلی', icon: LayoutGrid },
    { href: preview ? '/dashboard-preview?view=learning' : '/member/learning', label: 'دوره‌های من', icon: BookOpen },
    { href: preview ? '/journal' : '/member', label: preview ? 'آشنایی با ژورنال' : 'ژورنال من', icon: NotebookPen },
    { href: preview ? '/login' : '/member/security', label: preview ? 'ورود به حساب' : 'امنیت حساب', icon: preview ? LogIn : ShieldCheck },
  ];
  return <nav className="member-nav" aria-label="مسیرهای میز یادگیری">
    {destinations.map(({ href, label, icon: Icon }) => {
      const current = preview ? href === (library ? '/dashboard-preview?view=learning' : '/dashboard-preview') :
        href === pathname || (href === '/member/learning' && pathname.startsWith(href + '/'));
      return <Link key={href}
        aria-current={current ? 'page' : undefined} href={href}><Icon size={19} aria-hidden="true"/><span>{label}</span></Link>;
    })}
  </nav>;
}

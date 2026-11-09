'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpLeft, ArrowLeft, Menu, X, ArrowUp, LogIn } from 'lucide-react';
import { homeFor, useUser } from './WorkflowUI';
import './public-shell.css';

const navigation = [
  ['/approach', 'نگاه همراه'],
  ['/programs', 'دوره‌ها و مسیرها'],
  ['/coaching', 'کوچینگ'],
  ['/journal', 'ژورنال'],
  ['/insights', 'مجله'],
  ['/dashboard-preview', 'نمای داشبورد'],
];

export function Logo({ onClick }: { onClick?: () => void } = {}) {
  return <Link onClick={onClick} href="/" className="brand" aria-label="همراه؛ صفحهٔ اصلی">
    <span className="brand-word" dir="ltr">HMB<span className="brand-dot"/></span>
    <span className="brand-sub">همراهِ مسیر معامله‌گری</span>
  </Link>;
}

export function Header() {
  const path = usePathname();
  const { user } = useUser();
  const accountHref = user ? homeFor(user.role) : '/login';
  const accountLabel = user ? 'فضای من' : 'ورود اعضا';
  const slot = useRef<HTMLDivElement>(null);
  const drawer = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!slot.current || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      setCompact(!entry.isIntersecting && entry.boundingClientRect.bottom <= 0);
    });
    observer.observe(slot.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => { drawer.current?.close(); }, [path]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const desktop = window.matchMedia('(min-width: 950px)');
    const closeOnResize = () => drawer.current?.close();
    desktop.addEventListener('change', closeOnResize);
    return () => {
      desktop.removeEventListener('change', closeOnResize);
      document.body.style.overflow = previous;
    };
  }, [open]);

  const current = (href: string) => path === href || path.startsWith(href + '/') ? 'page' : undefined;

  return <>
    <div className="hmb-header-slot" ref={slot}>
      <header className="site-header hmb-public-header" data-compact={compact}>
        <div className="hmb-header-top">
          <button className="hmb-shell-button hmb-menu-button" ref={trigger}
            aria-label="باز کردن فهرست" aria-controls="hmb-navigation" aria-expanded={open}
            onClick={() => { drawer.current?.showModal(); setOpen(true); }}>
            <Menu size={22} aria-hidden="true"/>
          </button>
          <Logo/>
          <div className="hmb-header-actions">
            <Link className="hmb-account-link" href={accountHref} aria-label={accountLabel}><LogIn size={20} aria-hidden="true"/><span>{accountLabel}</span></Link>
            <Link className="hmb-header-apply" href="/apply?offer=consultation">بررسی مسیر شما <ArrowUpLeft size={18} aria-hidden="true"/></Link>
          </div>
        </div>
        <nav aria-label="ناوبری اصلی" className="hmb-header-navigation">
          {navigation.map(([href, label]) => <Link key={href} href={href} aria-current={current(href)}>{label}</Link>)}
          <Link href="/contact" className="hmb-nav-contact">گفت‌وگو با همراه <ArrowUpLeft size={16} aria-hidden="true"/></Link>
        </nav>
      </header>
    </div>
    <dialog ref={drawer} id="hmb-navigation" className="hmb-nav-drawer" aria-label="فهرست همراه"
      onClick={event => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right) drawer.current?.close();
      }}
      onClose={() => { setOpen(false); trigger.current?.focus({ preventScroll: true }); }}>
      <div className="hmb-drawer-top">
        <Logo onClick={() => drawer.current?.close()}/>
        <button autoFocus className="hmb-shell-button" aria-label="بستن فهرست" onClick={() => drawer.current?.close()}><X size={22} aria-hidden="true"/></button>
      </div>
      <nav aria-label="ناوبری اصلی">
        {[...navigation, ['/events', 'رویدادها'], ['/contact', 'گفت‌وگو با همراه'], [accountHref, accountLabel]].map(([href, label]) =>
          <Link href={href} key={href} aria-current={current(href)} onClick={() => drawer.current?.close()}>{label}<ArrowLeft size={17} aria-hidden="true"/></Link>)}
      </nav>
      <Link className="hmb-header-apply" href="/apply?offer=consultation" onClick={() => drawer.current?.close()}>بررسی مسیر شما <ArrowUpLeft size={18} aria-hidden="true"/></Link>
    </dialog>
  </>;
}

export function Footer() {
  return <footer className="hmb-public-footer">
    <div className="hmb-footer-content">
      <div className="hmb-footer-heading"><Logo/><button className="hmb-shell-button" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })} aria-label="بازگشت به ابتدای صفحه"><ArrowUp size={20} aria-hidden="true"/></button></div>
      <div className="hmb-footer-columns">
        <div className="hmb-footer-intro"><p>شناخت بازار.<br/>تمرین هدفمند.<br/><span>مرور تصمیم.</span></p><p>همراهِ پیوند میان آنچه می‌دانید و آنچه در عمل انجام می‌دهید.</p><Link href="/contact">گفت‌وگو با همراه <ArrowUpLeft size={18} aria-hidden="true"/></Link></div>
        <div><h2>یادگیری و تمرین</h2><Link href="/programs/foundations">آموزش پایهٔ فارکس</Link><Link href="/programs/practice">تمرین و مدیریت ریسک</Link><Link href="/coaching">کوچینگ معامله‌گری</Link><Link href="/journal">ژورنال معاملاتی</Link><Link href="/insights">مجلهٔ همراه</Link></div>
        <div><h2>دربارهٔ همراه</h2><Link href="/about">نگاه و اصول ما</Link><Link href="/approach">روش یادگیری</Link><Link href="/events">رویدادهای آموزشی</Link><Link href="/services">خدمات همراه</Link><Link href="/editorial-policy">سیاست تحریریه</Link></div>
      </div>
      <div className="hmb-footer-bottom"><span><bdi>© {new Date().getFullYear()} HMB</bdi> · همراه</span><nav aria-label="قوانین همراه"><Link href="/privacy">حریم خصوصی</Link><Link href="/terms">شرایط استفاده</Link><Link href="/risk-disclosure">ریسک معامله‌گری</Link></nav><p>آموزش، تضمین بازده مالی نیست.</p></div>
    </div>
    <div className="hmb-footer-art" aria-hidden="true"><Image src="/images/hamrah/footer-marble-book-brand-v4.png" alt="" width={2172} height={724} sizes="100vw"/></div>
    <p className="hmb-footer-company">شرکت بین المللی همراه معامله گر بازار</p>
  </footer>;
}

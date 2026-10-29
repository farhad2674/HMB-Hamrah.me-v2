'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpLeft, Check, Eye, EyeOff, LockKeyhole, NotebookPen } from 'lucide-react';
import { request, homeFor, Feedback, type User } from '@/components/WorkflowUI';
import './login.css';

export default function Page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    setError('');
    try {
      const data = await request<{ user: User }>('/api/auth', 'POST', { email, password });
      location.assign(homeFor(data.user.role));
    } catch (cause) {
      setError((cause as Error).message);
      setPending(false);
    }
  }

  return <section className="pro-login" aria-labelledby="login-title">
    <div className="pro-login-shell container">
      <div className="pro-login-story">
        <p className="pro-login-kicker"><span /> فضای اختصاصی همراه <span dir="ltr">MEMBER SPACE</span></p>
        <h1 id="login-title">ادامهٔ مسیر،<br /><span>از همین‌جا.</span></h1>
        <p className="pro-login-lead">تمرین‌های شما، یادداشت‌های تصمیم و بازخورد مربی؛ کنار هم، برای مرور قدمی که برداشته‌اید و انتخاب قدم بعدی.</p>
        <div className="pro-login-light" aria-hidden="true"><span /><i /><b /></div>
        <div className="pro-login-note">
          <div className="pro-login-note-top"><span><NotebookPen size={15} /> از یک ژورنال تمرینی</span><small>نمونهٔ آموزشی</small></div>
          <p>«شرایط ورود کامل نبود. این بار صبر کردم و دلیل تصمیمم را نوشتم.»</p>
          <div className="pro-login-note-bottom"><Check size={15} /><span>موضوع مرور: پایبندی به برنامه، پیش از نتیجه</span></div>
        </div>
        <Link className="pro-login-preview" href="/journal">آشنایی با ژورنال همراه <ArrowUpLeft size={17} /></Link>
      </div>

      <div className="pro-login-form-panel">
        <div className="pro-login-form-head"><span className="pro-login-lock"><LockKeyhole size={23} strokeWidth={1.5} /></span><span dir="ltr">HMB / SIGN IN</span></div>
        <h2>خوش برگشتید.</h2>
        <p className="pro-login-form-copy">با اطلاعات حسابی که برای شما ایجاد شده است، وارد شوید.</p>
        <form onSubmit={submit} className="pro-login-form" aria-busy={pending}>
          <Feedback error={error} />
          <label htmlFor="login-email">ایمیل</label>
          <input id="login-email" required type="email" dir="ltr" inputMode="email" autoComplete="username" placeholder="name@example.com" value={email} onChange={event => setEmail(event.target.value)} />
          <label htmlFor="login-password">رمز عبور</label>
          <div className="pro-login-password"><input id="login-password" required type={showPassword ? 'text' : 'password'} dir="ltr" autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} /><button type="button" aria-label={showPassword ? 'پنهان کردن رمز عبور' : 'نمایش رمز عبور'} aria-pressed={showPassword} aria-controls="login-password" onClick={() => setShowPassword(value => !value)}>{showPassword ? <EyeOff size={18} /> : <Eye size={18} />}</button></div>
          <button className="pro-login-submit" type="submit" disabled={pending}><span>{pending ? 'در حال ورود…' : 'ورود به فضای من'}</span><ArrowUpLeft size={19} /></button>
        </form>
        <div className="pro-login-support"><p>برای دسترسی به حساب به راهنمایی نیاز دارید؟</p><Link href="/contact">درخواست پشتیبانی <ArrowUpLeft size={15} /></Link></div>
        <div className="pro-login-legal"><LockKeyhole size={13} /><p>ژورنال و بازخوردها در فضای اختصاصی حساب شما نگهداری می‌شوند. <Link href="/privacy">حریم خصوصی</Link></p></div>
      </div>
    </div>
  </section>;
}

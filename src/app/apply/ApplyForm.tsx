'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { ApiError, request, offers, Feedback } from '@/components/WorkflowUI';

const empty = { name: '', contactMethod: 'email', contact: '', offer: 'consultation', experience: 'beginner', difficulty: '', outcome: '', format: 'either', consent: false, marketing: false, website: '' };
type Field = keyof typeof empty;
const fieldSteps: Partial<Record<Field, number>> = { offer: 0, experience: 0, format: 0, difficulty: 1, outcome: 1, name: 2, contactMethod: 2, contact: 2, consent: 2, marketing: 2 };
const normalizeDigits = (value: string) => value.replace(/[۰-۹٠-٩]/g, char => String(char.charCodeAt(0) - (char >= '۰' ? 1776 : 1632)));

export default function ApplyForm({ initialOffer = 'consultation' }: { initialOffer?: string }) {
 const router = useRouter();
 const [data, setData] = useState({ ...empty, offer: offers[initialOffer] ? initialOffer : 'consultation' });
 const [step, setStep] = useState(0);
 const [error, setError] = useState('');
 const [fields, setFields] = useState<Record<string, string>>({});
 const [pending, setPending] = useState(false);
 const key = useRef('');
 const heading = useRef<HTMLHeadingElement>(null);

 useEffect(() => {
  key.current = crypto.randomUUID();
  fetch('/api/analytics', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event: 'application_start', properties: { offer_id: data.offer, source_route: '/apply' } }) }).catch(() => {});
 }, []);

 function set<K extends Field>(name: K, value: (typeof data)[K]) {
  setData(d => ({ ...d, [name]: value }));
  setFields(current => { const next = { ...current }; delete next[name]; return next; });
  setError('');
 }
 function inputProps(name: Field) {
  return { id: `application-${name}`, name, 'aria-invalid': Boolean(fields[name]), 'aria-describedby': fields[name] ? `application-${name}-error` : undefined };
 }
 function fieldError(name: Field) {
  return fields[name] ? <span id={`application-${name}-error`} className="error" role="alert">{fields[name]}</span> : null;
 }
 function displayErrors(errors: Record<string, string>, summary: string) {
  const localized = Object.fromEntries(Object.entries(errors).map(([name, message]) => [name, /[\u0600-\u06FF]/.test(message) ? message : 'مقدار این قسمت معتبر نیست؛ آن را بررسی کنید.']));
  setFields(localized);
  setError(summary);
  const first = Object.keys(fieldSteps).find(name => localized[name]);
  if (first) {
   setStep(fieldSteps[first as Field]!);
   setTimeout(() => document.getElementById(`application-${first}`)?.focus(), 0);
  } else {
   setTimeout(() => heading.current?.focus(), 0);
  }
 }
 function validateStep() {
  const errors: Record<string, string> = {};
  if (step === 0) {
   if (!offers[data.offer]) errors.offer = 'یکی از مسیرهای موجود را انتخاب کنید.';
   if (!['beginner', 'active', 'experienced'].includes(data.experience)) errors.experience = 'سطح تجربه خود را انتخاب کنید.';
  }
  if (step === 1) {
   if (data.difficulty.trim().length < 5) errors.difficulty = 'چالش اصلی خود را در دست‌کم ۵ نویسه توضیح دهید.';
   if (data.outcome.trim().length < 5) errors.outcome = 'هدف یادگیری خود را در دست‌کم ۵ نویسه توضیح دهید.';
  }
  if (step === 2) {
   if (data.name.trim().length < 2) errors.name = 'نام و نام خانوادگی خود را وارد کنید.';
   if (data.contactMethod === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.contact.trim())) errors.contact = 'یک نشانی ایمیل معتبر وارد کنید.';
   if (data.contactMethod === 'phone' && !/^\+?[\d ()-]{8,22}$/.test(normalizeDigits(data.contact.trim()))) errors.contact = 'شماره تماس معتبر، همراه با پیش‌شماره وارد کنید.';
   if (!data.consent) errors.consent = 'برای بررسی درخواست، اجازه پاسخ‌گویی و تأیید مطالعه اطلاعیه لازم است.';
  }
  if (Object.keys(errors).length) { displayErrors(errors, 'موارد مشخص‌شده را اصلاح کنید.'); return false; }
  return true;
 }
 async function submit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  if (pending || !validateStep()) return;
  if (step < 2) { setError(''); setStep(s => s + 1); setTimeout(() => heading.current?.focus(), 0); return; }
  setPending(true);
  setError('');
  setFields({});
  try {
   const result = await request<{ ok: true; reference: string }>('/api/applications', 'POST', { ...data, idempotencyKey: key.current });
   try { sessionStorage.setItem('hmb-application-reference', result.reference); } catch {}
   router.push('/apply/received');
  } catch (failure) {
   if (failure instanceof ApiError && Object.keys(failure.fields).length) displayErrors(failure.fields, failure.message);
   else setError(failure instanceof Error ? failure.message : 'ثبت درخواست ممکن نشد. دوباره تلاش کنید.');
   setPending(false);
  }
 }

 return <div className="container section application-layout">
  <aside className="application-aside">
   <p className="eyebrow">درخواست بررسی مسیر</p>
   <h1>انتخاب مسیر،<br />از شناخت شما شروع می‌شود.</h1>
   <p className="muted">تجربه، موضوع تمرین و راه تماس را بنویسید. این اطلاعات مبنای بررسی تناسب آموزش یا کوچینگ با نیاز شماست.</p>
   <ol className="application-steps">{['مسیر و تجربه شما', 'نیاز و هدف شما', 'راه ارتباطی و ثبت درخواست'].map((s, i) => <li key={s} aria-current={step === i ? 'step' : undefined}><span>{i < step ? <Check size={16} /> : new Intl.NumberFormat('fa-IR').format(i + 1)}</span>{s}</li>)}</ol>
   <div className="notice"><ShieldCheck size={22} /><p>این فرم به معنی رزرو دوره یا پذیرش قطعی نیست. هیچ مبلغی در این مرحله دریافت نمی‌شود.</p></div>
  </aside>
  <div className="card application-form">
   <p className="eyebrow">مرحله {new Intl.NumberFormat('fa-IR').format(step + 1)} از ۳</p>
   <h2 ref={heading} tabIndex={-1}>{['تجربه فعلی و مسیر موردنظر شما چیست؟', 'مسئله و هدف تمرین شما چیست؟', 'اطلاعات تماس و تأیید درخواست'][step]}</h2>
   <form onSubmit={submit} className="stack" noValidate aria-busy={pending}>
    <Feedback error={error} />
    <div className="application-step-panel" key={step}>
    {step === 0 && <>
     <label className="field">مسیر موردنظر<select {...inputProps('offer')} value={data.offer} onChange={e => set('offer', e.target.value)}>{Object.entries(offers).map(([v, t]) => <option key={v} value={v}>{t}</option>)}</select>{fieldError('offer')}</label>
     <label className="field">تجربه شما<select {...inputProps('experience')} value={data.experience} onChange={e => set('experience', e.target.value)}><option value="beginner">در شروع یادگیری هستم</option><option value="active">با مفاهیم آشنا هستم و تمرین می‌کنم</option><option value="experienced">تجربه معامله دارم و بازخورد می‌خواهم</option></select>{fieldError('experience')}</label>
     {['foundations', 'practice', 'events'].includes(data.offer) && <label className="field">ترجیح شما برای برگزاری<select {...inputProps('format')} value={data.format} onChange={e => set('format', e.target.value)}><option value="either">تفاوتی ندارد</option><option value="online">آنلاین</option><option value="in_person">حضوری</option></select>{fieldError('format')}<small className="muted">شیوه برگزاری و زمان نهایی پس از بررسی ظرفیت اعلام می‌شود.</small></label>}
     {data.offer === 'events' && <p className="notice">درخواست شما برای اطلاع از برنامه‌های آینده ثبت می‌شود؛ رویداد قطعی یا صندلی رزروشده‌ای در این مرحله وجود ندارد.</p>}
    </>}
    {step === 1 && <>
     <label className="field">مهم‌ترین چالش شما چیست؟<textarea {...inputProps('difficulty')} required minLength={5} maxLength={2000} rows={4} value={data.difficulty} onChange={e => set('difficulty', e.target.value)} placeholder="مثلاً پیش از معامله برنامه دارم، اما هنگام اجرا از آن فاصله می‌گیرم." />{fieldError('difficulty')}</label>
     <label className="field">می‌خواهید چه مهارتی را بهبود دهید؟<textarea {...inputProps('outcome')} required minLength={5} maxLength={2000} rows={3} value={data.outcome} onChange={e => set('outcome', e.target.value)} placeholder="مثلاً یک روال مشخص برای مرور تصمیم‌ها داشته باشم." />{fieldError('outcome')}</label>
     <p className="muted">رمز حساب، کلید API یا اطلاعات مالی خصوصی خود را در این فرم ننویسید.</p>
    </>}
    {step === 2 && <>
     <label className="field">نام و نام خانوادگی<input {...inputProps('name')} autoComplete="name" required minLength={2} maxLength={100} value={data.name} onChange={e => set('name', e.target.value)} />{fieldError('name')}</label>
     <label className="field">روش ارتباطی<select {...inputProps('contactMethod')} value={data.contactMethod} onChange={e => { set('contactMethod', e.target.value); set('contact', ''); }}><option value="email">ایمیل</option><option value="phone">تلفن</option></select>{fieldError('contactMethod')}</label>
     <label className="field">{data.contactMethod === 'email' ? 'نشانی ایمیل' : 'شماره تماس'}<input {...inputProps('contact')} dir="ltr" type={data.contactMethod === 'email' ? 'email' : 'tel'} autoComplete={data.contactMethod === 'email' ? 'email' : 'tel'} required minLength={5} maxLength={150} value={data.contact} onChange={e => set('contact', e.target.value)} />{fieldError('contact')}</label>
     <section className="application-review" aria-labelledby="application-review-title"><h3 id="application-review-title">مرور پیش از ارسال</h3><dl><div><dt>مسیر</dt><dd>{offers[data.offer]}</dd></div><div><dt>تجربه</dt><dd>{data.experience === 'beginner' ? 'در شروع یادگیری' : data.experience === 'active' ? 'آشنا با مفاهیم و در حال تمرین' : 'دارای تجربه و نیازمند بازخورد'}</dd></div><div><dt>چالش اصلی</dt><dd>{data.difficulty}</dd></div><div><dt>هدف</dt><dd>{data.outcome}</dd></div><div><dt>راه پاسخ‌گویی</dt><dd>{data.contactMethod === 'email' ? 'ایمیل' : 'تلفن'}: <bdi>{data.contact || 'پس از تکمیل این مرحله'}</bdi></dd></div></dl><button type="button" className="text-link" onClick={() => { setStep(0); setError(''); }}>ویرایش مسیر و پاسخ‌ها</button></section>
     <label className="check-field"><input {...inputProps('consent')} type="checkbox" required checked={data.consent} onChange={e => set('consent', e.target.checked)} /><span><Link href="/privacy" target="_blank">اطلاعیه حریم خصوصی</Link> را خوانده‌ام و برای پاسخ به این درخواست اجازه تماس می‌دهم.</span></label>{fieldError('consent')}
     <label className="check-field"><input {...inputProps('marketing')} type="checkbox" checked={data.marketing} onChange={e => set('marketing', e.target.checked)} /><span>مایلم اطلاع‌رسانی آموزشی دریافت کنم. (اختیاری)</span></label>{fieldError('marketing')}
     <div aria-hidden="true" style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', clipPath: 'inset(50%)', whiteSpace: 'nowrap', border: 0 }}><label>وب‌سایت<input {...inputProps('website')} tabIndex={-1} autoComplete="off" value={data.website} onChange={e => set('website', e.target.value)} /></label></div>
     <p className="notice">پس از ذخیره درخواست، کد پیگیری نمایش داده می‌شود. بررسی درخواست به معنی تضمین پذیرش یا نتیجه معاملاتی نیست.</p>
    </>}
    </div>
    <div className="button-row">
     {step > 0 && <button type="button" disabled={pending} className="btn btn-secondary" onClick={() => { setStep(s => s - 1); setError(''); }}><ArrowRight size={18} />مرحله قبل</button>}
     <button className="btn btn-primary" disabled={pending}>{pending ? 'در حال ثبت…' : step === 2 ? 'ثبت درخواست' : 'ادامه'}<ArrowLeft size={18} /></button>
    </div>
   </form>
  </div>
 </div>;
}

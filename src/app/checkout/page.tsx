import Link from 'next/link';
import { AlertCircle, ArrowUpLeft, CheckCircle2, CircleOff, CreditCard, Info, RotateCcw } from 'lucide-react';
import { programs } from '@/lib/content';
import { pageMetadata } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'بررسی وضعیت ثبت‌نام دوره | همراه',
  description: 'خلاصه دوره و وضعیت ثبت‌نام؛ پرداخت آنلاین در نسخه فعلی فعال نیست.',
  path: '/checkout',
  noIndex: true,
});

const previewStates = {
  success: { icon: CheckCircle2, title: 'نمونه نمایشی: بازگشت موفق', text: 'در اتصال واقعی، نتیجه فقط پس از تأیید سمت سرور نمایش داده می‌شود. اکنون هیچ پرداخت یا سفارشی ثبت نشده است.' },
  failed: { icon: AlertCircle, title: 'نمونه نمایشی: پرداخت ناموفق', text: 'این وضعیت صرفاً پیش‌نمایش رابط است. مبلغی دریافت نشده و سفارشی وجود ندارد.' },
  return: { icon: RotateCcw, title: 'نمونه نمایشی: بازگشت از درگاه', text: 'در نسخه عملیاتی، وضعیت تراکنش از سرور بررسی می‌شود. این صفحه هیچ تراکنشی را تأیید نمی‌کند.' },
} as const;

export default async function CheckoutPage({ searchParams }: { searchParams: Promise<{ course?: string; preview?: string }> }) {
  const query = await searchParams;
  const course = programs.find(item => item.slug === query.course) || programs[0];
  const preview = query.preview && query.preview in previewStates ? previewStates[query.preview as keyof typeof previewStates] : null;
  const PreviewIcon = preview?.icon;
  return <div className="container checkout-page">
    <header className="checkout-heading"><div><p className="eyebrow">خلاصه ثبت‌نام / بدون پرداخت</p><h1>شرایط ثبت‌نام را مرور کنید.</h1><p>ثبت‌نام و پرداخت آنلاین در حال حاضر فعال نیست. مشخصات مسیر را بررسی کنید و در صورت تمایل، درخواست اطلاع از شرایط ثبت کنید.</p></div></header>
    {preview && PreviewIcon && <section className="preview-state" role="status" aria-live="polite" aria-label="پیش‌نمایش وضعیت"><PreviewIcon size={24}/><div><h2>{preview.title}</h2><p>{preview.text}</p></div></section>}
    <div className="checkout-grid">
      <section className="checkout-summary" data-reveal><span className="badge">{course.label}</span><h2>{course.title}</h2><p>{course.description}</p><dl><div><dt>سطح</dt><dd>{course.level}</dd></div><div><dt>شیوه ارائه</dt><dd>{course.format}</dd></div><div><dt>مدرس</dt><dd>هنوز اعلام عمومی نشده است</dd></div><div><dt>مدت و دسترسی</dt><dd>هنوز اعلام عمومی نشده است</dd></div><div><dt>قیمت</dt><dd>هنوز اعلام عمومی نشده است</dd></div></dl><Link className="text-link" href={`/programs/${course.slug}`}>بازگشت به جزئیات دوره <ArrowUpLeft size={17}/></Link></section>
      <aside className="checkout-action" data-reveal data-reveal-index="1"><div className="checkout-lock"><CircleOff size={26}/><div><h2>پرداخت آنلاین فعال نیست</h2><p>پرداخت پس از نهایی شدن قیمت، شرایط ثبت‌نام و اتصال درگاه در دسترس قرار می‌گیرد.</p></div></div><button className="btn btn-dark" disabled aria-disabled="true"><CreditCard size={18}/> پرداخت غیرفعال</button><Link className="btn btn-primary" href={`/apply?offer=${course.slug}`}>درخواست اطلاع از ثبت‌نام <ArrowUpLeft size={17}/></Link><p className="checkout-note"><Info size={16}/> ثبت این درخواست به معنی خرید، رزرو یا پذیرش در دوره نیست.</p></aside>
    </div>
    <section className="checkout-preview-links"><h2>پیش‌نمایش حالت‌های بازگشت پرداخت</h2><p>این لینک‌ها فقط برای مرور طراحی‌اند و هیچ سفارش یا تراکنشی ایجاد نمی‌کنند.</p><div className="button-row"><Link href={`/checkout?course=${course.slug}&preview=success`}>نمایش حالت موفق</Link><Link href={`/checkout?course=${course.slug}&preview=failed`}>نمایش حالت ناموفق</Link><Link href={`/checkout?course=${course.slug}&preview=return`}>نمایش حالت بازگشت</Link></div></section>
  </div>;
}

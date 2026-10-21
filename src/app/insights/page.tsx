import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpLeft } from 'lucide-react';
import { articles,published } from '@/lib/content';
import { PageIntro } from '../approach/PublicShell';
export const dynamic='force-dynamic';
export const metadata:Metadata={title:'مجلهٔ همراه',description:'یادداشت‌های آموزشی دربارهٔ آماده‌سازی، ژورنال و مرور تصمیم‌های معاملاتی.'};
export default function Insights(){const custom=published('article');const merged=[...articles.filter(a=>!custom.some(c=>c.slug===a.slug)),...custom.map(c=>({...c,topic:'یادداشت آموزشی',minutes:''}))];return <><PageIntro eyebrow="مجلهٔ همراه / یک پرسش، یک تمرین" title="برای فکر کردن به تصمیم بعدی." description="یادداشت‌های کوتاه دربارهٔ آمادگی، ثبت تصمیم و مرور اجرا؛ با یک تمرین مشخص که می‌توانید در محیط آزمایشی امتحان کنید."/><section className="section"><div className="container grid-3">{merged.map((a,i)=><article className="card insight-card" key={a.slug}><div className={`article-illustration illustration-${i%3}`} aria-hidden="true"><span>{['↗','≡','↺'][i%3]}</span></div><p className="eyebrow">{a.topic}{a.minutes?` · ${a.minutes} دقیقه مطالعه`:''}</p><h2><Link href={`/insights/${a.slug}`}>{a.title}</Link></h2><p className="muted">{a.summary}</p><Link className="btn btn-secondary" href={`/insights/${a.slug}`}>خواندن یادداشت <ArrowUpLeft size={18}/></Link></article>)}</div></section><section className="section"><div className="container notice"><p>این یادداشت‌ها تمرین آموزشی‌اند؛ توصیهٔ شخصی برای خریدوفروش، خدمات درمانی یا اثبات نتیجهٔ یک روش نیستند.</p></div></section></>}

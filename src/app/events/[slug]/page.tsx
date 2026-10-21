import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { published } from '@/lib/content';
import { PageIntro,TextBody,NextStep } from '../../approach/PublicShell';
export const dynamic='force-dynamic';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;return {title:published('event').find(x=>x.slug===slug)?.title||'رویداد پیدا نشد'};}
export default async function Event({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=published('event').find(x=>x.slug===slug);if(!item)notFound();return <><PageIntro eyebrow="رویدادها / جزئیات" title={item.title} description={item.summary}/><section className="section"><div className="container narrow"><TextBody body={item.body}/><div className="notice"><p>ثبت علاقه‌مندی به معنای رزرو ظرفیت نیست. زمان دقیق با منطقهٔ زمانی تهران، شیوهٔ حضور و شرایط پیش از پذیرش تأیید می‌شود.</p></div></div></section><NextStep title="علاقه‌مندی خود را ثبت کنید." offer="events"/></>}

import Link from 'next/link';
import { CalendarDays, ArrowUpLeft } from 'lucide-react';
import { published } from '@/lib/content';
import { PageIntro } from '../approach/PublicShell';
import { pageMetadata } from '@/lib/site';
export const dynamic='force-dynamic';
export const metadata=pageMetadata({title:'رویدادها و کارگاه‌های آموزش فارکس | همراه',description:'رویدادها و کارگاه‌های آموزشی همراه؛ زمان، مدرس، ظرفیت و شرایط فقط پس از تأیید منتشر می‌شوند.',path:'/events'});
export default function Events(){const items=published('event');return <><PageIntro eyebrow="رویدادها / فرصتی برای تمرین و گفت‌وگو" title="کنار هم، دقیق‌تر نگاه کنیم." description="کارگاه و گفت‌وگو می‌تواند فرصتی برای بررسی یک مسئلهٔ مشخص در تمرین معامله‌گری باشد. جزئیات هر رویداد پس از نهایی شدن منتشر می‌شود."/><section className="section"><div className="container">{items.length?<div className="grid-2">{items.map(e=><article className="card" key={e.id}><CalendarDays size={28}/><h2>{e.title}</h2><p>{e.summary}</p><Link className="btn btn-secondary" href={`/events/${e.slug}`}>جزئیات رویداد <ArrowUpLeft size={18}/></Link></article>)}</div>:<div className="card empty-state"><CalendarDays size={44}/><h2>هنوز رویدادی با زمان قطعی اعلام نشده است.</h2><p className="muted">اگر به کارگاه‌ها علاقه‌مندید، موضوع مورد نظر خود را ثبت کنید. این درخواست، رزرو صندلی یا ثبت‌نام در رویداد نیست.</p><Link className="btn btn-primary" href="/apply?offer=events">ثبت علاقه‌مندی به رویدادها <ArrowUpLeft size={18}/></Link></div>}</div></section></>}

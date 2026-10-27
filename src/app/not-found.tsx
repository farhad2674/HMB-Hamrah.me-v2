import Link from 'next/link';
import { ArrowUpLeft, Search } from 'lucide-react';
import Companion from '@/components/Companion';

export default function NotFound(){return <section className="container section empty-page not-found-page"><Companion mood="think" size="md"/><p className="eyebrow">خطای ۴۰۴</p><h1>این صفحه در مسیر همراه نیست.</h1><p>ممکن است نشانی تغییر کرده باشد. از دوره فارکس، مجله یا فرم ارتباط به مسیر اصلی برگردید.</p><div className="button-row"><Link className="btn btn-primary" href="/programs/foundations">دوره جامع فارکس <ArrowUpLeft size={17}/></Link><Link className="btn btn-secondary" href="/insights"><Search size={17}/> جست‌وجو در مجله</Link><Link className="text-link" href="/contact">ارتباط با همراه</Link></div></section>}

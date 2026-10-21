import { Suspense } from 'react';
import ApplyForm from './ApplyForm';
export const metadata={title:'درخواست بررسی مسیر | HMB',description:'برای شناخت مسیر آموزش، تمرین یا کوچینگ، نیاز خود را با HMB در میان بگذارید.'};
export default function Page(){return <Suspense fallback={<div className="container section">در حال آماده‌سازی فرم…</div>}><ApplyForm/></Suspense>}

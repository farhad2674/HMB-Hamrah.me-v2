'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ArrowLeft, LogOut, LockKeyhole } from 'lucide-react';
export type User={id:string;name:string;email:string;role:string;active:boolean};
export class ApiError extends Error {
 readonly fields: Record<string, string>;
 readonly status: number;
 constructor(message: string, status: number, fields: Record<string, string> = {}) {
  super(message);
  this.name = 'ApiError';
  this.status = status;
  this.fields = fields;
 }
}
export async function request<T=Record<string,unknown>>(url:string, method='GET', body?:unknown):Promise<T>{
 let res: Response;
 try {
  res = await fetch(url,{method,cache:'no-store',headers:body?{'Content-Type':'application/json'}:undefined,body:body?JSON.stringify(body):undefined});
 } catch {
  throw new ApiError('ارتباط با سرور برقرار نشد. اطلاعات شما در همین صفحه حفظ شده است؛ اتصال را بررسی و دوباره تلاش کنید.', 0);
 }
 let data;
 try { data = await res.json(); } catch { throw new ApiError('پاسخ سرور قابل خواندن نیست. اطلاعات این صفحه حفظ شده است؛ دوباره تلاش کنید.', res.status); }
 if(!res.ok) {
  const fields: Record<string, string> = {};
  if (data.fields && typeof data.fields === 'object') {
   for (const [key, value] of Object.entries(data.fields)) if (typeof value === 'string') fields[key] = value;
  }
  throw new ApiError(data.error||'انجام این درخواست ممکن نیست.', res.status, fields);
 }
 return data;
}
export function useUser(){const [user,setUser]=useState<User|null>(null);const [loading,setLoading]=useState(true);const [error,setError]=useState('');useEffect(()=>{let live=true;request<{user:User|null}>('/api/auth').then(d=>{if(live)setUser(d.user)}).catch(e=>{if(live)setError(e.message)}).finally(()=>{if(live)setLoading(false)});return()=>{live=false}},[]);return {user,loading,error};}
export function Gate({loading,user,error,roles,children}:{loading:boolean;user:User|null;error?:string;roles:string[];children:React.ReactNode}){
 if(loading)return <div className="container section" role="status">در حال بررسی دسترسی…</div>;
 if(error)return <div className="container section"><p className="error" role="alert">{error}</p><button className="btn btn-secondary" onClick={()=>location.reload()}>تلاش دوباره</button></div>;
 if(!user)return <section className="container section"><div className="card stack"><LockKeyhole size={32}/><h1>به فضای اختصاصی خود وارد شوید.</h1><p>ژورنال و بازخوردها فقط در دسترس شما و افراد مجاز است.</p><Link className="btn btn-primary" href="/login">ورود به حساب <ArrowLeft size={18}/></Link></div></section>;
 if(!roles.includes(user.role))return <section className="container section"><h1>دسترسی این بخش برای حساب شما فعال نیست.</h1><Link className="btn btn-secondary" href={homeFor(user.role)}>بازگشت به فضای من</Link></section>;
 if(!user.active)return <section className="container section"><h1>دسترسی عضویت شما غیرفعال است.</h1><p>برای بررسی وضعیت، درخواست پشتیبانی ثبت کنید. دریافت نسخه اطلاعات همچنان از مسیر مجاز حساب در دسترس است.</p><a className="btn btn-secondary" href="/api/member/export">دریافت اطلاعات من</a><Link href="/contact" className="btn btn-primary">درخواست پشتیبانی</Link></section>;
 return <>{children}</>;
}
export function homeFor(role:string){return role==='admin'||role==='reviewer'?'/admin':role==='editor'?'/admin/content':role==='coach'?'/coach':'/member'}
export function WorkspaceBar({user,title}:{user:User;title:string}){const[error,setError]=useState('');return <div className="workspace-bar"><div><p className="eyebrow">فضای اختصاصی HMB</p><h1>{title}</h1><p className="muted">{user.name}، خوش آمدید.</p></div><div className="button-row"><Link href={homeFor(user.role)} className="btn btn-secondary">فضای من</Link>{user.role==='admin'&&<Link href="/admin/content" className="btn btn-secondary">مدیریت محتوا</Link>}<button className="btn btn-secondary" onClick={async()=>{try{await request('/api/auth','DELETE');location.assign('/login')}catch(e){setError((e as Error).message)}}}><LogOut size={17}/>خروج</button></div>{error&&<p role="alert" className="error">{error}</p>}</div>}
export function Feedback({error,message}:{error?:string;message?:string}){return <>{error&&<p className="error" role="alert">{error}</p>}{message&&<p className="success" role="status">{message}</p>}</>}
export const statusLabels:Record<string,string>={draft:'پیش‌نویس',submitted:'ارسال‌شده',under_review:'در حال بررسی',information_requested:'نیازمند اطلاعات',accepted:'پذیرفته‌شده',waitlisted:'فهرست انتظار',declined:'پذیرفته‌نشده',closed:'بسته‌شده',in_review:'در حال بازبینی',feedback_ready:'بازخورد آماده',acknowledged:'بازخورد خوانده‌شده',follow_up:'پیگیری تمرین',published:'منتشرشده',archived:'بایگانی‌شده'};
export const offers:Record<string,string>={foundations:'آموزش پایه',practice:'تمرین ساختارمند',coaching:'کوچینگ و بازخورد',consultation:'مشاوره مسیر',events:'اطلاع از رویدادها'};
export function dateFa(value:string){return new Intl.DateTimeFormat('fa-IR',{dateStyle:'medium',timeZone:'Asia/Tehran'}).format(new Date(value))}

import { api, body, json, checkOrigin } from '@/lib/api';
import { login, logout, readSessionCookie, sessionUser, sessionCookie } from '@/lib/auth';
import { rateLimit } from '@/lib/db';
import { loginSchema } from '@/lib/validation';
export const runtime='nodejs';
export async function GET(request:Request){return api(()=>({user:sessionUser(readSessionCookie(request))}));}
export async function POST(request:Request){return api(async()=>{rateLimit('login-global',60,60000);const data=await body(request,loginSchema);rateLimit('login-email:'+data.email.toLowerCase(),10,900000);const result=login(data.email,data.password);return json({ok:true,user:result.user},200,{'Set-Cookie':sessionCookie(result.token)});});}
export async function DELETE(request:Request){return api(()=>{checkOrigin(request);logout(readSessionCookie(request));return json({ok:true},200,{'Set-Cookie':sessionCookie('',true)});});}

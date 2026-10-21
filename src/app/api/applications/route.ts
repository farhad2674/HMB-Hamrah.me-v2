import { api, body } from '@/lib/api';
import { createApplication, rateLimit } from '@/lib/db';
import { applicationSchema } from '@/lib/validation';
export const runtime='nodejs';
export async function POST(request:Request){return api(async()=>{rateLimit('application-global',120,60000);const data=await body(request,applicationSchema);rateLimit('application-contact:'+data.contact,10,3600000);return {ok:true,...createApplication(data)};});}

import { api, body } from '@/lib/api';
import { requireUser } from '@/lib/auth';
import { saveContent } from '@/lib/db';
import { contentSchema } from '@/lib/validation';
export const runtime='nodejs';
export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}){return api(async()=>{const user=requireUser(request);const input=await body(request,contentSchema);return {ok:true,item:saveContent(user,input,(await params).id)};});}

import { api, body } from '@/lib/api';
import { requireUser } from '@/lib/auth';
import { listContent, saveContent } from '@/lib/db';
import { contentSchema } from '@/lib/validation';
export const runtime='nodejs';
export async function GET(request:Request){return api(()=>({items:listContent(requireUser(request))}));}
export async function POST(request:Request){return api(async()=>{const user=requireUser(request);const input=await body(request,contentSchema);return {ok:true,item:saveContent(user,input)};});}

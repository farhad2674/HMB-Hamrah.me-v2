import { api, body } from '@/lib/api';
import { requireUser } from '@/lib/auth';
import { listEntries, createEntry } from '@/lib/db';
import { entrySchema } from '@/lib/validation';
export const runtime='nodejs';
export async function GET(request:Request){return api(()=>({entries:listEntries(requireUser(request))}));}
export async function POST(request:Request){return api(async()=>{const user=requireUser(request);const input=await body(request,entrySchema);return {ok:true,entry:createEntry(user,input)};});}

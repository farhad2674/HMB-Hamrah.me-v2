import { api, body } from '@/lib/api';
import { requireUser } from '@/lib/auth';
import { getEntry, updateEntry } from '@/lib/db';
import { entryPatchSchema } from '@/lib/validation';
export const runtime='nodejs';
type Context={params:Promise<{id:string}>};
export async function GET(request:Request,{params}:Context){return api(async()=>({entry:getEntry(requireUser(request),(await params).id)}));}
export async function PATCH(request:Request,{params}:Context){return api(async()=>{const user=requireUser(request);const input=await body(request,entryPatchSchema);return {ok:true,entry:updateEntry(user,(await params).id,input)};});}

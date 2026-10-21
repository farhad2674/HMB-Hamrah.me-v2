import { api, body } from '@/lib/api';
import { requireUser } from '@/lib/auth';
import { updateUser } from '@/lib/db';
import { userPatchSchema } from '@/lib/validation';
export const runtime='nodejs';
export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}){return api(async()=>{const user=requireUser(request);const input=await body(request,userPatchSchema);return {ok:true,user:updateUser(user,(await params).id,input)};});}

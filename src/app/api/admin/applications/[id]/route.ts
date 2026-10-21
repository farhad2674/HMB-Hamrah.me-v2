import { api, body } from '@/lib/api';
import { requireUser } from '@/lib/auth';
import { updateApplication } from '@/lib/db';
import { applicationPatchSchema } from '@/lib/validation';
export const runtime='nodejs';
export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}){return api(async()=>{const user=requireUser(request);const input=await body(request,applicationPatchSchema);return {ok:true,application:updateApplication(user,(await params).id,input)};});}

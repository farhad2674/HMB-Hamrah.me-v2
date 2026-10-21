import { z } from 'zod';
import { api, body } from '@/lib/api';
import { requireUser } from '@/lib/auth';
import { requestDeletion } from '@/lib/db';
export const runtime='nodejs';
export async function POST(request:Request){return api(async()=>{const user=requireUser(request,true);const input=await body(request,z.object({reason:z.string().max(2000).optional()}).strict());return {ok:true,...requestDeletion(user,input.reason||'')};});}

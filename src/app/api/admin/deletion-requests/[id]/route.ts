import { z } from 'zod';
import { api,body } from '@/lib/api';
import { requireUser } from '@/lib/auth';
import { resolveDeletionRequest } from '@/lib/db';
export const runtime='nodejs';
export async function PATCH(request:Request,{params}:{params:Promise<{id:string}>}){return api(async()=>{const user=requireUser(request);const input=await body(request,z.object({action:z.enum(['fulfill','decline'])}).strict());return resolveDeletionRequest(user,(await params).id,input.action);});}

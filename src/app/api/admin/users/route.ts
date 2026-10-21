import { api } from '@/lib/api';
import { requireUser } from '@/lib/auth';
import { listUsers } from '@/lib/db';
export const runtime='nodejs';
export async function GET(request:Request){return api(()=>({users:listUsers(requireUser(request))}));}

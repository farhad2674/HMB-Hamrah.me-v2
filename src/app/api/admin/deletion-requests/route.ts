import { api } from '@/lib/api';
import { requireUser } from '@/lib/auth';
import { listDeletionRequests } from '@/lib/db';
export const runtime='nodejs';
export async function GET(request:Request){return api(()=>({requests:listDeletionRequests(requireUser(request))}));}

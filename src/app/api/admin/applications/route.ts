import { api } from '@/lib/api';
import { requireUser } from '@/lib/auth';
import { listApplications } from '@/lib/db';
export const runtime='nodejs';
export async function GET(request:Request){return api(()=>({applications:listApplications(requireUser(request))}));}

import { api, json } from '@/lib/api';
import { requireUser } from '@/lib/auth';
import { exportMember } from '@/lib/db';
export const runtime='nodejs';
export async function GET(request:Request){return api(()=>json(exportMember(requireUser(request,true)),200,{'Content-Disposition':'attachment; filename="hmb-journal-export.json"'}));}

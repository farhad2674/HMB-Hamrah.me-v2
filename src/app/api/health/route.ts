import { api } from '@/lib/api';
import { db } from '@/lib/db';
export const runtime='nodejs';
export async function GET(){return api(()=>{db().prepare('SELECT 1').get();return {ok:true,service:'hmb',database:'ready'};});}

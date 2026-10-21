import { api } from '@/lib/api';
import { getPublishedContent } from '@/lib/db';
export const runtime='nodejs';
export async function GET(request:Request){return api(()=>{const type=new URL(request.url).searchParams.get('type')||undefined;return {items:getPublishedContent(type)};});}

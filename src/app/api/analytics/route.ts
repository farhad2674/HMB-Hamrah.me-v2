import { api, body } from '@/lib/api';
import { recordMetric, rateLimit } from '@/lib/db';
import { analyticsSchema, safeMetricProperties } from '@/lib/validation';
export const runtime='nodejs';
export async function POST(request:Request){return api(async()=>{rateLimit('analytics-global',300,60000);const input=await body(request,analyticsSchema);recordMetric(input.event,safeMetricProperties(input.properties||{}));return {ok:true};});}

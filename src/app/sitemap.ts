import type { MetadataRoute } from 'next';
import { articles, programs, published } from '@/lib/content';
import { isPublicSite, SITE_URL } from '@/lib/site';

export const dynamic = 'force-dynamic';

export default function sitemap(): MetadataRoute.Sitemap {
  if(!isPublicSite)return [];
  const staticPaths=['','/approach','/programs','/coaching','/journal','/events','/insights','/about','/editorial-policy','/services','/services/consultation','/contact','/privacy','/terms','/risk-disclosure'];
  const customArticles=published('article');
  const staticEntries=staticPaths.map(path=>({url:`${SITE_URL}${path}`}));
  const programEntries=[...programs.map(p=>({url:`${SITE_URL}/programs/${p.slug}`})),...published('program').map(p=>({url:`${SITE_URL}/programs/${p.slug}`,lastModified:p.updatedAt}))];
  const articleEntries=[...articles.filter(a=>!customArticles.some(c=>c.slug===a.slug)).map(a=>({url:`${SITE_URL}/insights/${a.slug}`,lastModified:a.dateModified,images:[`${SITE_URL}/insights/${a.slug}/opengraph-image`]})),...customArticles.map(a=>({url:`${SITE_URL}/insights/${a.slug}`,lastModified:a.updatedAt,...(a.socialImage?{images:[a.socialImage]}:{})}))];
  const eventEntries=published('event').map(e=>({url:`${SITE_URL}/events/${e.slug}`,lastModified:e.updatedAt}));
  return [...staticEntries,...programEntries,...articleEntries,...eventEntries].filter((entry,index,all)=>all.findIndex(candidate=>candidate.url===entry.url)===index);
}

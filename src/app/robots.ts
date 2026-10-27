import type { MetadataRoute } from 'next';
import { isPublicSite, SITE_URL } from '@/lib/site';
export default function robots(): MetadataRoute.Robots {
  if(!isPublicSite)return {rules:{userAgent:'*',disallow:'/'}};
  const privatePaths = ['/admin','/api','/member','/coach','/login','/apply/received','/checkout'];
  return {
    rules: [
      { userAgent: ['OAI-SearchBot','Claude-SearchBot','PerplexityBot'], allow: '/', disallow: privatePaths },
      { userAgent: ['ChatGPT-User','Claude-User','Perplexity-User'], allow: '/', disallow: privatePaths },
      { userAgent: '*', allow: '/', disallow: privatePaths },
    ],
    sitemap:`${SITE_URL}/sitemap.xml`,
    host:SITE_URL,
  };
}

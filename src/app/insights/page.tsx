import Link from 'next/link';
import { ArrowUpLeft } from 'lucide-react';
import { articles,published } from '@/lib/content';
import { PageIntro } from '../approach/PublicShell';
import { pageMetadata } from '@/lib/site';
import { BlogCover } from '@/components/BlogVisual';

export const dynamic='force-dynamic';
export const metadata=pageMetadata({title:'مجله آموزش فارکس و ژورنال معاملاتی | همراه',description:'راهنماها و تمرین‌های منبع‌دار درباره مبانی فارکس، مدیریت ریسک، برنامه معاملاتی، ژورنال و امنیت حساب.',path:'/insights'});

export default function Insights(){
  const custom=published('article');
  const merged=[...articles.filter(a=>!custom.some(c=>c.slug===a.slug)).map(article=>({...article,minutes:article.minutes})),...custom.map(article=>({...article,category:article.category||'یادداشت آموزشی',tags:article.tags||[],minutes:article.readingMinutes||''}))];
  const categories=[...new Set(merged.map(article=>article.category))];
  return <div className="subpage-shell">
    <PageIntro eyebrow="مجله همراه / مفاهیم، روش‌ها و تمرین‌ها" title="برای فهم بازار و شناخت تصمیم‌های خود." description="راهنماهای آموزشی درباره فارکس، مدیریت ریسک، برنامه معاملاتی و ژورنال؛ با توضیح مفاهیم، مثال و تمرین برای ادامه یادگیری."/>
    <section className="section" data-reveal><div className="container">
      <nav className="blog-category-list" aria-label="دسته‌های مجله">{categories.map(category=><span className="badge" key={category}>{category}</span>)}</nav>
      <div className="grid-3 blog-grid" data-stagger>{merged.map((article,index)=><article className="card insight-card blog-card" key={article.slug}>
        <BlogCover title={article.title} category={article.category} index={index}/>
        <p className="eyebrow">{article.category}{article.minutes?` · ${article.minutes} دقیقه مطالعه`:''}</p>
        <h2><Link href={`/insights/${article.slug}`}>{article.title}</Link></h2><p className="muted">{article.summary}</p>
        {!!article.tags.length&&<ul className="tag-list" aria-label="برچسب‌ها">{article.tags.slice(0,4).map(tag=><li key={tag}>{tag}</li>)}</ul>}
        <Link className="btn btn-secondary" href={`/insights/${article.slug}`}>خواندن مقاله <ArrowUpLeft size={18}/></Link>
      </article>)}</div>
    </div></section>
    <section className="section" data-reveal><div className="container notice"><p>این مقاله‌ها برای آموزش و تمرین نوشته شده‌اند؛ توصیهٔ شخصی خریدوفروش، تضمین نتیجه یا جایگزین بررسی مقررات محل زندگی شما نیستند.</p></div></section>
  </div>;
}
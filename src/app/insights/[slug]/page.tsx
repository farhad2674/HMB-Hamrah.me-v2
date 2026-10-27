import Link from 'next/link';
import { notFound } from 'next/navigation';
import { articles,published } from '@/lib/content';
import { PageIntro,TextBody } from '../../approach/PublicShell';
import { breadcrumbSchema, JsonLd, organizationSchema, pageMetadata, SITE_URL } from '@/lib/site';
import { BlogBody, BlogSources } from '@/components/BlogArticle';
import BlogVisual, { BlogCover } from '@/components/BlogVisual';

export const dynamic='force-dynamic';

export async function generateMetadata({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const custom=published('article').find(item=>item.slug===slug);
  const staticArticle=articles.find(item=>item.slug===slug);
  const article=custom||staticArticle;
  return pageMetadata({title:custom?.seoTitle||staticArticle?.seoTitle||`${article?.title||'یادداشت پیدا نشد'} | همراه`,description:custom?.metaDescription||staticArticle?.metaDescription||article?.summary||'یادداشت آموزشی همراه',path:`/insights/${slug}`,image:custom?.socialImage||`${SITE_URL}/insights/${slug}/opengraph-image`,imageAlt:custom?.imageAlt||staticArticle?.heroAlt});
}

export default async function Article({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const custom=published('article').find(item=>item.slug===slug);
  const staticArticle=articles.find(item=>item.slug===slug);
  const article=custom||staticArticle;
  if(!article)notFound();
  const modified=custom?.updatedAt||staticArticle?.dateModified||'2026-10-27';
  const publishedAt=custom?.createdAt||staticArticle?.datePublished||modified;
  const category=custom?.category||staticArticle?.category||'یادداشت آموزشی';
  const tags=custom?.tags||staticArticle?.tags||[];
  const citations=custom?.sourceUrls||staticArticle?.sources.map(source=>source.url)||[];
  const image=custom?.socialImage||`${SITE_URL}/insights/${slug}/opengraph-image`;
  const schema={'@context':'https://schema.org','@type':'Article','@id':`${SITE_URL}/insights/${slug}#article`,headline:article.title,description:article.summary,datePublished:publishedAt,dateModified:modified,inLanguage:'fa-IR',mainEntityOfPage:`${SITE_URL}/insights/${slug}`,author:{'@id':organizationSchema['@id']},publisher:{'@id':organizationSchema['@id']},isPartOf:{'@id':`${SITE_URL}/#website`},articleSection:category,keywords:tags,image:[image],about:['آموزش فارکس',category,...tags],citation:citations};
  const related=staticArticle?staticArticle.related.map(relatedSlug=>articles.find(item=>item.slug===relatedSlug)).filter(Boolean):[];
  return <>
    <JsonLd data={[breadcrumbSchema([{name:'خانه',path:'/'},{name:'مجله',path:'/insights'},{name:article.title,path:`/insights/${slug}`}]),schema]}/>
    <PageIntro eyebrow={`مجلهٔ همراه / ${category}`} title={article.title} description={article.summary}/>
    <section className="section"><article className="container narrow blog-article">
      <div className="article-meta"><span>ناشر و مسئول تحریریه: همراه</span><span> · </span><time dateTime={modified}>آخرین بازبینی: {new Intl.DateTimeFormat('fa-IR',{dateStyle:'long',timeZone:'Asia/Tehran'}).format(new Date(modified))}</time></div>
      {!!tags.length&&<ul className="tag-list" aria-label="برچسب‌های مقاله">{tags.map(tag=><li key={tag}>{tag}</li>)}</ul>}
      {staticArticle?<><BlogVisual visual={staticArticle.visuals[0]} id={`${slug}-hero`} hero/><BlogBody post={staticArticle}/><BlogSources sources={staticArticle.sources}/></>:<><BlogCover title={article.title} category={category}/><TextBody body={article.body}/>{citations.length>0&&<section className="article-sources"><h2>منابع</h2><ol>{citations.map(url=><li key={url}><a href={url} target="_blank" rel="noreferrer">{url}</a></li>)}</ol></section>}</>}
      <aside className="notice"><strong>مرز این مقاله</strong><p>این متن برای آموزش و تمرین است و توصیهٔ شخصی سرمایه‌گذاری نیست. مقررات، نوع قرارداد و حمایت‌های قانونی را متناسب با کشور و ارائه‌دهندهٔ خود بررسی کنید.</p></aside>
      {related.length>0&&<section className="related-posts"><h2>برای ادامهٔ این مسیر</h2><div>{related.slice(0,4).map((item,index)=><Link className="related-post-card" href={`/insights/${item!.slug}`} key={item!.slug}><span>۰{index+1}</span><strong>{item!.title}</strong><small>{item!.category}</small></Link>)}</div></section>}
      <div className="article-next-links"><h2>این تمرین را ادامه دهید</h2><Link className="btn btn-primary" href="/journal">تمرین در دموی ژورنال</Link><Link className="btn btn-secondary" href="/programs/foundations">دیدن مسیر آموزش فارکس</Link><Link className="text-link" href="/editorial-policy">روش تولید و بازبینی محتوا</Link><Link className="text-link" href="/insights">بازگشت به مجله</Link></div>
    </article></section>
  </>;
}

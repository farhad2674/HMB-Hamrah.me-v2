import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, BookOpen, Clock3, NotebookPen } from 'lucide-react';
import { getAcademyCourse, getPreviewLesson } from '@/lib/academy';
import { pageMetadata } from '@/lib/site';
import { numberFa } from '../../../AcademyArt';

type PreviewProps = { params: Promise<{ slug: string; lesson: string }> };
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: PreviewProps) {
  const { slug, lesson } = await params;
  const sample = getPreviewLesson(slug, lesson);
  if (!sample) notFound();
  return pageMetadata({ title: sample.title + ' | نمونه درس آکادمی همراه', description: sample.body.slice(0, 140), path: '/programs/' + slug + '/preview/' + lesson });
}

export default async function PreviewLesson({ params }: PreviewProps) {
  const { slug, lesson } = await params;
  const course = getAcademyCourse(slug);
  const sample = getPreviewLesson(slug, lesson);
  if (!course || !sample) notFound();
  const path = '/programs/' + slug;
  return <article className="subpage-shell ac-site ac-reading">
    <div className="container ac-reading-shell">
      <nav className="ac-breadcrumb" aria-label="مسیر صفحه"><Link href="/programs">آکادمی</Link><span>/</span><Link href={path}>{course.title}</Link><span>/</span><span>نمونه درس</span></nav>
      <header><div className="ac-reading-meta"><span><BookOpen size={17}/> نمونه درس</span><span><Clock3 size={17}/>{numberFa(sample.minutes)} دقیقه</span></div><h1>{sample.title}</h1></header>
      <div className="ac-reading-text">{sample.body.split(/\n\s*\n/).map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div>
      {sample.exercise && <section className="ac-exercise"><h2><NotebookPen size={22}/> تمرین این درس</h2><p>{sample.exercise}</p></section>}
      <footer><Link className="ac-button ac-dark" href={path}>برگشت به دوره <ArrowLeft size={16}/></Link><Link href={path + '#curriculum'} className="ac-backlink">دیدن همهٔ درس‌ها</Link></footer>
    </div>
  </article>;
}

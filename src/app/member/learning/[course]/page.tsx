import { notFound, redirect } from 'next/navigation';
import { getMemberLearning } from '@/lib/academy';
import { currentMember } from '../../currentMember';

export default async function ResumeCourse({ params }: { params: Promise<{ course: string }> }) {
  const user = await currentMember();
  if (!user.active) redirect('/member/learning');
  const { course } = await params;
  const owned = getMemberLearning(user).find(item => item.slug === course);
  if (!owned) notFound();
  const next = owned.nextLessonSlug || owned.modules.flatMap(module => module.lessons)[0]?.slug;
  if (!next) redirect('/member/learning');
  redirect('/member/learning/' + encodeURIComponent(course) + '/' + encodeURIComponent(next));
}

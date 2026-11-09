import { getMemberLearning } from '@/lib/academy';
import { currentMember } from '../currentMember';
import { LearningLibrary } from '../LearningViews';

export const metadata = { title: 'دوره‌های من' };

export default async function MyLearning() {
  const user = await currentMember();
  return <LearningLibrary active={user.active} courses={user.active ? getMemberLearning(user) : []}/>;
}

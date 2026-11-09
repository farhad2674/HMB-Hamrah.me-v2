import { getMemberLearning } from '@/lib/academy';
import { listEntries } from '@/lib/db';
import { currentMember } from '../currentMember';
import { LearningOverview } from '../LearningViews';

export const metadata = { title: 'نمای کلی میز یادگیری' };

export default async function Overview() {
  const user = await currentMember();
  return <LearningOverview name={user.name} active={user.active}
    courses={user.active ? getMemberLearning(user) : []} entries={user.active ? listEntries(user) : []}/>;
}

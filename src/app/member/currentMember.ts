import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_COOKIE, sessionUser } from '@/lib/auth';

export async function currentMember() {
  const user = sessionUser((await cookies()).get(SESSION_COOKIE)?.value);
  if (!user) redirect('/login');
  if (user.role !== 'member') redirect('/member');
  return user;
}

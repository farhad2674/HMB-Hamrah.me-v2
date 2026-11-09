import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { SESSION_COOKIE, sessionUser } from '@/lib/auth';
import MemberFrame from './MemberFrame';
import './member.css';

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function MemberLayout({ children }: { children: React.ReactNode }) {
  const user = sessionUser((await cookies()).get(SESSION_COOKIE)?.value);
  return <MemberFrame name={user?.name}>{children}</MemberFrame>;
}

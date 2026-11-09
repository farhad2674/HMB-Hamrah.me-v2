import Link from 'next/link';
import { currentMember } from '../currentMember';
import Sessions from './Sessions';

export const metadata = { title: 'امنیت حساب' };
export default async function Security() {
  await currentMember();
  return <section className="member-page"><h1>امنیت حساب</h1>
    <p>نشست‌های فعال حساب خود را بررسی کنید و از دستگاه‌هایی که دیگر استفاده نمی‌کنید خارج شوید.</p>
    <Sessions/>
    <Link className="member-help" href="/contact">برای بازیابی دسترسی کمک می‌خواهم</Link>
  </section>;
}

'use client';

import { useEffect, useState } from 'react';
import { request } from '@/components/WorkflowUI';

type Session = { id: string; createdAt: string; expiresAt: string; current: boolean };
const date = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'medium', timeStyle: 'short' });

export default function Sessions() {
  const [sessions, setSessions] = useState<Session[] | null>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState('');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    let live = true;
    request<{sessions: Session[]}>('/api/member/sessions')
      .then(result => { if (live) setSessions(result.sessions); })
      .catch(cause => { if (live) setError(cause.message); });
    return () => { live = false; };
  }, [attempt]);
  async function revoke(session: Session) {
    setError('');
    setBusy(session.id);
    try {
      if (session.current) {
        await request('/api/auth', 'DELETE');
        location.assign('/login');
      } else {
        await request('/api/member/sessions/' + encodeURIComponent(session.id), 'DELETE');
        setSessions(items => items?.filter(item => item.id !== session.id) ?? null);
      }
    } catch (cause) { setError((cause as Error).message); }
    finally { setBusy(''); }
  }
  return <div className="member-sessions"><h2>نشست‌های فعال</h2>
    {error && <p role="alert">{error} <button onClick={() => {setError(''); setAttempt(n => n + 1);}}>تلاش دوباره</button></p>}
    {!sessions && !error && <p role="status">در حال دریافت نشست‌ها…</p>}
    {sessions?.length === 0 && <p>نشست فعالی پیدا نشد.</p>}
    {sessions?.map(item => <article key={item.id}><div>
      <h3>{item.current ? 'نشست کنونی' : 'نشست دیگر'}</h3>
      <p>شروع · {date.format(new Date(item.createdAt))}</p>
      <p>انقضا · {date.format(new Date(item.expiresAt))}</p></div>
      <button disabled={!!busy} onClick={() => revoke(item)}>{busy === item.id ? 'در حال خروج…' : item.current ? 'خروج از این دستگاه' : 'پایان نشست'}</button>
    </article>)}
  </div>;
}

'use client';

import { useState } from 'react';
import { LogOut } from 'lucide-react';
import { request } from '@/components/WorkflowUI';

export default function SignOut() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  async function signOut() {
    if (pending) return;
    setPending(true);
    setError('');
    try {
      await request('/api/auth', 'DELETE');
      window.location.replace('/login');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'خروج از حساب انجام نشد.');
      setPending(false);
    }
  }

  return <div className="member-signout">
    <button type="button" onClick={signOut} disabled={pending}><LogOut size={16}/>{pending ? 'در حال خروج…' : 'خروج از حساب'}</button>
    {error && <p role="alert">{error}</p>}
  </div>;
}

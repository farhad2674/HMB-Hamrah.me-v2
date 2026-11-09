'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, CheckCheck } from 'lucide-react';
import { request } from '@/components/WorkflowUI';

export default function CompleteLesson({ courseSlug, lessonSlug, completed }: { courseSlug: string; lessonSlug: string; completed: boolean }) {
  const [saving, setSaving] = useState(false);
  const [recorded, setRecorded] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  async function markComplete() {
    if (saving || completed || recorded) return;
    setSaving(true);
    setError('');
    try {
      await request('/api/member/academy/complete', 'POST', { courseSlug, lessonSlug });
      setRecorded(true);
      router.refresh();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'ذخیره انجام نشد. دوباره تلاش کنید.');
    } finally {
      setSaving(false);
    }
  }
  return <div className="member-completion">
    {completed || recorded ? <span className="member-complete-state" role="status"><CheckCheck size={18}/>این درس را تکمیل کرده‌اید</span> :
      <button type="button" className="member-action" onClick={markComplete} disabled={saving}><Check size={18}/>{saving ? 'در حال ذخیره…' : 'ثبت تکمیل درس'}</button>}
    {error && <p role="alert">{error}</p>}
  </div>;
}

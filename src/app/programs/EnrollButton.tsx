'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { ApiError, request } from '@/components/WorkflowUI';

export default function EnrollButton({ slug }: { slug: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState('');
  async function enroll() {
    if (pending) return;
    setPending(true);
    setMessage('');
    try {
      await request('/api/member/academy/enroll', 'POST', { courseSlug: slug });
      router.push('/member/learning/' + slug);
      router.refresh();
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        router.push('/login?next=' + encodeURIComponent('/programs/' + slug));
        return;
      }
      setMessage(error instanceof Error ? error.message : 'دوره اضافه نشد. دوباره تلاش کنید.');
      setPending(false);
    }
  }
  return <div><button type="button" className="ac-button ac-action" disabled={pending} onClick={enroll}>
    {pending ? 'در حال افزودن دوره…' : 'افزودن به دوره‌های من'} <ArrowLeft size={18}/>
  </button>{message && <p role="alert" className="ac-error">{message}</p>}</div>;
}

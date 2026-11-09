import { api, checkOrigin } from '@/lib/api';
import { revokeSession } from '@/lib/auth';

export const runtime = 'nodejs';

export function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  return api(async () => {
    checkOrigin(request);
    return revokeSession(request, (await params).id);
  });
}

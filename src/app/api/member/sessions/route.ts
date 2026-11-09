import { api } from '@/lib/api';
import { listSessions } from '@/lib/auth';

export const runtime = 'nodejs';

export function GET(request: Request) {
  return api(() => ({ sessions: listSessions(request) }));
}

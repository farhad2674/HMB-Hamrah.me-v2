import { enrollInAcademyCourse } from '../../../../../lib/academy.ts';
import { api, body } from '../../../../../lib/api.ts';
import { requireUser } from '../../../../../lib/auth.ts';
import { academyEnrollmentSchema } from '../../../../../lib/validation.ts';

export const runtime = 'nodejs';

export function POST(request: Request) {
  return api(async () => {
    const { courseSlug } = await body(request, academyEnrollmentSchema);
    return enrollInAcademyCourse(requireUser(request), courseSlug);
  });
}

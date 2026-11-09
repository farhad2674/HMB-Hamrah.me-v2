import { completeAcademyLesson } from '../../../../../lib/academy.ts';
import { api, body } from '../../../../../lib/api.ts';
import { requireUser } from '../../../../../lib/auth.ts';
import { academyCompletionSchema } from '../../../../../lib/validation.ts';

export const runtime = 'nodejs';

export function POST(request: Request) {
  return api(async () => {
    const { courseSlug, lessonSlug } = await body(request, academyCompletionSchema);
    return completeAcademyLesson(requireUser(request), courseSlug, lessonSlug);
  });
}

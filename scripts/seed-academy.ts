import { seedAcademyCourses } from '../src/lib/academy-seed.ts';

const created = seedAcademyCourses();
console.log(`Added ${created} sample courses. Existing courses were preserved.`);

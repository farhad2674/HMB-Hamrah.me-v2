// Applied inside the same transaction as the legacy session migration.
export const academySchema = `
  CREATE TABLE academy_courses (
    slug TEXT PRIMARY KEY NOT NULL,
    title TEXT NOT NULL, summary TEXT NOT NULL, description TEXT NOT NULL,
    category TEXT NOT NULL, level TEXT NOT NULL, cover TEXT NOT NULL,
    outcomes TEXT NOT NULL, prerequisite TEXT NOT NULL, position INTEGER NOT NULL,
    published INTEGER NOT NULL DEFAULT 0 CHECK(published IN (0,1)),
    is_sample INTEGER NOT NULL DEFAULT 0 CHECK(is_sample IN (0,1))
  );
  CREATE TABLE academy_modules (
    course_slug TEXT NOT NULL REFERENCES academy_courses(slug) ON DELETE CASCADE,
    slug TEXT NOT NULL, title TEXT NOT NULL, position INTEGER NOT NULL,
    PRIMARY KEY(course_slug, slug), UNIQUE(course_slug, position)
  );
  CREATE TABLE academy_lessons (
    course_slug TEXT NOT NULL, module_slug TEXT NOT NULL, slug TEXT NOT NULL,
    title TEXT NOT NULL, minutes INTEGER NOT NULL CHECK(minutes > 0),
    kind TEXT NOT NULL CHECK(kind IN ('reading','exercise')),
    is_preview INTEGER NOT NULL DEFAULT 0 CHECK(is_preview IN (0,1)),
    body TEXT NOT NULL, exercise TEXT NOT NULL, position INTEGER NOT NULL,
    PRIMARY KEY(course_slug, slug), UNIQUE(course_slug, module_slug, position),
    FOREIGN KEY(course_slug, module_slug) REFERENCES academy_modules(course_slug, slug) ON DELETE CASCADE
  );
  CREATE TABLE academy_enrollments (
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    course_slug TEXT NOT NULL REFERENCES academy_courses(slug) ON DELETE CASCADE,
    active INTEGER NOT NULL DEFAULT 1 CHECK(active IN (0,1)),
    enrolled_at TEXT NOT NULL, PRIMARY KEY(user_id, course_slug)
  );
  CREATE TABLE academy_completions (
    user_id TEXT NOT NULL, course_slug TEXT NOT NULL, lesson_slug TEXT NOT NULL, completed_at TEXT NOT NULL,
    PRIMARY KEY(user_id, course_slug, lesson_slug),
    FOREIGN KEY(user_id, course_slug) REFERENCES academy_enrollments(user_id, course_slug) ON DELETE CASCADE,
    FOREIGN KEY(course_slug, lesson_slug) REFERENCES academy_lessons(course_slug, slug) ON DELETE CASCADE
  );
`;

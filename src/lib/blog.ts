import 'server-only';

import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export type BlogSource = {
  title: string;
  publisher: string;
  url: string;
  scope: string;
};

export type BlogVisual = {
  type: 'flow' | 'cards' | 'matrix' | 'scale' | 'checklist' | 'cycle';
  title: string;
  alt: string;
  caption: string;
  labels: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  seoTitle: string;
  metaDescription: string;
  datePublished: string;
  dateModified: string;
  minutes: string;
  heroAlt: string;
  sources: BlogSource[];
  visuals: BlogVisual[];
  related: string[];
  featured: boolean;
  body: string;
};

const BLOG_DIR = join(process.cwd(), 'content', 'blog');
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const allowedVisuals = new Set(['flow', 'cards', 'matrix', 'scale', 'checklist', 'cycle']);

function isPublicUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

function assertString(value: unknown, field: string): asserts value is string {
  if (typeof value !== 'string' || !value.trim()) throw new Error(`Blog frontmatter field "${field}" must be a non-empty string.`);
}

export function parseBlogFile(raw: string, filename = 'blog.md'): BlogPost {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]+)$/);
  if (!match) throw new Error(`${filename}: expected JSON frontmatter between --- lines.`);
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(match[1]) as Record<string, unknown>;
  } catch (error) {
    throw new Error(`${filename}: invalid JSON frontmatter: ${(error as Error).message}`);
  }

  for (const field of ['slug', 'title', 'summary', 'category', 'seoTitle', 'metaDescription', 'datePublished', 'dateModified', 'minutes', 'heroAlt']) {
    assertString(data[field], field);
  }
  if (!slugPattern.test(data.slug as string)) throw new Error(`${filename}: slug must use lowercase kebab-case.`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.datePublished as string) || !/^\d{4}-\d{2}-\d{2}$/.test(data.dateModified as string)) {
    throw new Error(`${filename}: dates must use YYYY-MM-DD.`);
  }
  if ((data.dateModified as string) < (data.datePublished as string)) throw new Error(`${filename}: dateModified cannot precede datePublished.`);
  if (!Array.isArray(data.tags) || data.tags.length < 2 || data.tags.some(tag => typeof tag !== 'string' || !tag.trim())) {
    throw new Error(`${filename}: tags must contain at least two non-empty strings.`);
  }
  if (!Array.isArray(data.sources) || data.sources.length < 2) throw new Error(`${filename}: at least two sources are required.`);
  const sources = data.sources as Array<Record<string, unknown>>;
  for (const source of sources) {
    for (const field of ['title', 'publisher', 'url', 'scope']) assertString(source[field], `sources.${field}`);
    if (!isPublicUrl(source.url as string)) throw new Error(`${filename}: source URLs must use http or https.`);
  }
  if (!Array.isArray(data.visuals) || data.visuals.length < 2 || data.visuals.length > 3) {
    throw new Error(`${filename}: each post needs two or three visuals.`);
  }
  const visuals = data.visuals as Array<Record<string, unknown>>;
  for (const visual of visuals) {
    for (const field of ['type', 'title', 'alt', 'caption']) assertString(visual[field], `visuals.${field}`);
    if (!allowedVisuals.has(visual.type as string)) throw new Error(`${filename}: unsupported visual type "${visual.type}".`);
    if (!Array.isArray(visual.labels) || visual.labels.length < 3 || visual.labels.some(label => typeof label !== 'string' || !label.trim())) {
      throw new Error(`${filename}: every visual needs at least three labels.`);
    }
  }
  if (!Array.isArray(data.related) || data.related.some(slug => typeof slug !== 'string' || !slugPattern.test(slug))) {
    throw new Error(`${filename}: related must be an array of slugs.`);
  }
  const body = match[2].trim();
  if (!body || /^# /m.test(body)) throw new Error(`${filename}: body is empty or contains an H1; the page supplies the H1.`);
  if (/<[A-Za-z][^>]*>/.test(body)) throw new Error(`${filename}: raw HTML is not allowed.`);

  return {
    ...(data as Omit<BlogPost, 'body'>),
    sources: sources as BlogSource[],
    visuals: visuals as BlogVisual[],
    body,
    featured: data.featured === true,
  };
}

export function getStaticArticles(): BlogPost[] {
  return readdirSync(BLOG_DIR)
    .filter(name => name.endsWith('.md'))
    .sort()
    .map(name => parseBlogFile(readFileSync(join(BLOG_DIR, name), 'utf8'), name))
    .sort((a, b) => b.dateModified.localeCompare(a.dateModified) || a.title.localeCompare(b.title, 'fa'));
}

export function getStaticArticle(slug: string) {
  return getStaticArticles().find(article => article.slug === slug);
}

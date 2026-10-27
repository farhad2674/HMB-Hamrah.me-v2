import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const blogDir=join(process.cwd(),'content','blog');
const files=readdirSync(blogDir).filter(name=>name.endsWith('.md')).sort();

function read(name:string){
  const raw=readFileSync(join(blogDir,name),'utf8');
  const match=raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]+)$/);
  assert.ok(match,`${name} has JSON frontmatter`);
  return {meta:JSON.parse(match[1]),body:match[2].trim()};
}

const posts=files.map(file=>({file,...read(file)}));

test('blog contains twelve valid, distinct Persian posts',()=>{
  assert.equal(posts.length,12);
  assert.equal(new Set(posts.map(post=>post.meta.slug)).size,12);
  for(const post of posts){
    assert.match(post.meta.slug,/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.equal(post.file,`${post.meta.slug}.md`);
    for(const field of ['title','summary','category','seoTitle','metaDescription','datePublished','dateModified','minutes','heroAlt'])assert.ok(post.meta[field],`${post.file}: ${field}`);
    assert.ok(Array.isArray(post.meta.tags)&&post.meta.tags.length>=2,`${post.file}: tags`);
    assert.ok(Array.isArray(post.meta.sources)&&post.meta.sources.length>=2,`${post.file}: sources`);
    assert.ok(Array.isArray(post.meta.related)&&post.meta.related.length>=2,`${post.file}: related`);
    assert.ok(post.body.length>2500,`${post.file}: substantive body`);
  }
});

test('visual, GEO and safe-markdown contracts hold',()=>{
  const slugs=new Set(posts.map(post=>post.meta.slug));
  for(const post of posts){
    assert.ok(post.meta.visuals.length>=2&&post.meta.visuals.length<=3,`${post.file}: 2-3 visuals`);
    assert.equal(post.meta.visuals.length,3,`${post.file}: hero plus two inline visuals`);
    assert.deepEqual([...post.body.matchAll(/\[\[visual:(\d+)\]\]/g)].map(match=>match[1]),['1','2'],`${post.file}: inline visual markers`);
    for(const visual of post.meta.visuals){assert.ok(visual.alt&&visual.caption&&visual.labels.length>=3,`${post.file}: accessible visual`);}
    for(const source of post.meta.sources){assert.match(source.url,/^https:\/\//,`${post.file}: secure source URL`);assert.ok(source.title&&source.publisher&&source.scope);}
    for(const related of post.meta.related)assert.ok(slugs.has(related),`${post.file}: related slug ${related} resolves`);
    assert.ok((post.body.match(/^## /gm)||[]).length>=4,`${post.file}: useful H2 structure`);
    assert.match(post.body,/^> \*\*خلاصه/m,`${post.file}: summary box`);
    assert.doesNotMatch(post.body,/^# /m,`${post.file}: page supplies H1`);
    assert.doesNotMatch(post.body,/<[A-Za-z][^>]*>/,`${post.file}: no raw HTML`);
    assert.doesNotMatch(post.body,/\[(?:INTERNAL-LINK|IMAGE|CHART)/i,`${post.file}: no unresolved markers`);
    assert.doesNotMatch(post.body,/—/,`${post.file}: no em dash`);
  }
});

test('content cluster spans categories and tags without thin duplication',()=>{
  assert.ok(new Set(posts.map(post=>post.meta.category)).size>=6);
  assert.ok(new Set(posts.flatMap(post=>post.meta.tags)).size>=20);
  const normalizedIntroductions=posts.map(post=>post.body.split(/\n\n/)[0].replace(/\s+/g,' ').trim());
  assert.equal(new Set(normalizedIntroductions).size,posts.length);
});

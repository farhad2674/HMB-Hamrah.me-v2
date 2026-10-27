import Link from 'next/link';
import { Fragment, type ReactNode } from 'react';
import type { BlogPost } from '@/lib/blog';
import BlogVisual from './BlogVisual';

function safeHref(value:string) {
  if (value.startsWith('/') && !value.startsWith('//')) return value;
  try { const url=new URL(value); return ['http:','https:'].includes(url.protocol)?value:null; } catch { return null; }
}

function inline(text:string):ReactNode[] {
  const nodes:ReactNode[]=[];
  const pattern=/(\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
  let cursor=0,match:RegExpExecArray|null;
  while((match=pattern.exec(text))){
    if(match.index>cursor)nodes.push(text.slice(cursor,match.index));
    if(match[2])nodes.push(<strong key={`${match.index}-strong`}>{match[2]}</strong>);
    else { const href=safeHref(match[4]); nodes.push(href?(href.startsWith('/')?<Link key={`${match.index}-link`} href={href}>{match[3]}</Link>:<a key={`${match.index}-link`} href={href} target="_blank" rel="noreferrer">{match[3]}</a>):match[3]); }
    cursor=pattern.lastIndex;
  }
  if(cursor<text.length)nodes.push(text.slice(cursor));
  return nodes;
}

type Block = {kind:'h2'|'h3'|'p'|'quote'|'ul'|'ol'|'table'|'visual';lines:string[];index?:number};
function parseBlocks(body:string):Block[] {
  const lines=body.split(/\r?\n/),blocks:Block[]=[];
  for(let i=0;i<lines.length;){
    const line=lines[i].trim(); if(!line){i++;continue;}
    if(line.startsWith('## ')){blocks.push({kind:'h2',lines:[line.slice(3)]});i++;continue;}
    if(line.startsWith('### ')){blocks.push({kind:'h3',lines:[line.slice(4)]});i++;continue;}
    const marker=line.match(/^\[\[visual:(\d+)\]\]$/); if(marker){blocks.push({kind:'visual',lines:[],index:Number(marker[1])});i++;continue;}
    if(line.startsWith('> ')){const group=[];while(i<lines.length&&lines[i].trim().startsWith('> '))group.push(lines[i++].trim().slice(2));blocks.push({kind:'quote',lines:group});continue;}
    if(/^[-*] /.test(line)){const group=[];while(i<lines.length&&/^[-*] /.test(lines[i].trim()))group.push(lines[i++].trim().slice(2));blocks.push({kind:'ul',lines:group});continue;}
    if(/^\d+\. /.test(line)){const group=[];while(i<lines.length&&/^\d+\. /.test(lines[i].trim()))group.push(lines[i++].trim().replace(/^\d+\. /,''));blocks.push({kind:'ol',lines:group});continue;}
    if(line.startsWith('|')){const group=[];while(i<lines.length&&lines[i].trim().startsWith('|'))group.push(lines[i++].trim());blocks.push({kind:'table',lines:group});continue;}
    const group=[line];i++;while(i<lines.length&&lines[i].trim()&&!/^(## |### |> |[-*] |\d+\. |\||\[\[visual:)/.test(lines[i].trim()))group.push(lines[i++].trim());blocks.push({kind:'p',lines:[group.join(' ')]});
  }
  return blocks;
}

function Table({lines}:{lines:string[]}) {
  const rows=lines.map(line=>line.replace(/^\||\|$/g,'').split('|').map(cell=>cell.trim())).filter((_,index)=>index!==1);
  if(rows.length<2)return null;
  return <div className="table-wrap blog-table"><table><thead><tr>{rows[0].map(cell=><th key={cell} scope="col">{inline(cell)}</th>)}</tr></thead><tbody>{rows.slice(1).map((row,index)=><tr key={index}>{row.map((cell,cellIndex)=><td key={cellIndex}>{inline(cell)}</td>)}</tr>)}</tbody></table></div>;
}

export function BlogBody({post}:{post:BlogPost}) {
  return <div className="prose blog-prose">{parseBlocks(post.body).map((block,index)=>{
    if(block.kind==='h2')return <h2 key={index}>{inline(block.lines[0])}</h2>;
    if(block.kind==='h3')return <h3 key={index}>{inline(block.lines[0])}</h3>;
    if(block.kind==='p')return <p key={index}>{inline(block.lines[0])}</p>;
    if(block.kind==='ul')return <ul key={index}>{block.lines.map((item,itemIndex)=><li key={itemIndex}>{inline(item)}</li>)}</ul>;
    if(block.kind==='ol')return <ol key={index}>{block.lines.map((item,itemIndex)=><li key={itemIndex}>{inline(item)}</li>)}</ol>;
    if(block.kind==='quote')return <aside className="blog-summary" key={index}>{block.lines.map((line,lineIndex)=>line.startsWith('- ')?<Fragment key={lineIndex}/>:<p key={lineIndex}>{inline(line)}</p>)}{block.lines.some(line=>line.startsWith('- '))&&<ul>{block.lines.filter(line=>line.startsWith('- ')).map((line,lineIndex)=><li key={lineIndex}>{inline(line.slice(2))}</li>)}</ul>}</aside>;
    if(block.kind==='table')return <Table key={index} lines={block.lines}/>;
    const visual=post.visuals[block.index??-1];return visual?<BlogVisual key={index} visual={visual} id={`${post.slug}-${block.index}`}/>:null;
  })}</div>;
}

export function BlogSources({sources}:{sources:BlogPost['sources']}) {
  return <section className="article-sources" aria-labelledby="article-sources-title"><h2 id="article-sources-title">منابع و دامنهٔ استناد</h2><p>این منابع برای ادعاهای مشخص همین مقاله استفاده شده‌اند. آن‌ها نتیجهٔ معاملاتی، اثربخشی دوره یا تناسب یک تصمیم با شرایط شخصی شما را تضمین نمی‌کنند.</p><ol>{sources.map(source=><li key={source.url}><a href={source.url} target="_blank" rel="noreferrer"><strong>{source.title}</strong>، {source.publisher}</a><span>{source.scope}</span></li>)}</ol></section>;
}

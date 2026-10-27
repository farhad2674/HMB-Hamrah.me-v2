import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { articles, published } from '@/lib/content';

export const runtime='nodejs';
export const alt='تصویر مقالهٔ مجله همراه';
export const size={width:1200,height:630};
export const contentType='image/png';

export default async function Image({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params;
  const custom=published('article').find(item=>item.slug===slug);
  const article=custom||articles.find(item=>item.slug===slug);
  const title=article?.title||'مجلهٔ همراه';
  const category=custom?.category||(!custom&&article&&'category' in article?article.category:'یادداشت آموزشی');
  const font=await readFile(join(process.cwd(),'node_modules','@fontsource','vazirmatn','files','vazirmatn-arabic-600-normal.woff'));
  return new ImageResponse(<div lang="fa" dir="rtl" style={{width:'100%',height:'100%',display:'flex',position:'relative',background:'#f8f7f3',color:'#1c302d',fontFamily:'Vazirmatn',padding:'64px'}}>
    <div style={{position:'absolute',inset:'38px',display:'flex',border:'1px solid #cfd5c4',borderRadius:'20px'}}/>
    <div style={{position:'absolute',left:'110px',top:'64px',width:'350px',height:'350px',borderRadius:'999px',background:'#d6ec9b',display:'flex'}}/>
    <div style={{position:'absolute',left:'55px',top:'205px',width:'470px',height:'260px',border:'2px solid #8fa269',borderRadius:'999px',transform:'rotate(-18deg)',display:'flex'}}/>
    <div style={{display:'flex',flexDirection:'column',justifyContent:'space-between',width:'100%',zIndex:2}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:24}}><span>hamrah.me</span><span style={{color:'#596851'}}>{category}</span></div>
      <div style={{display:'flex',flexDirection:'column',maxWidth:'820px',gap:'18px'}}><span style={{fontSize:22,color:'#596851'}}>مجلهٔ همراه / آموزش مسئولانهٔ فارکس</span><strong style={{fontSize:58,lineHeight:1.55,letterSpacing:'-1px'}}>{title}</strong></div>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',fontSize:20}}><span>آموزش، تمرین، ژورنال، بازخورد</span><span>HMB / 2026</span></div>
    </div>
  </div>,{...size,fonts:[{name:'Vazirmatn',data:font,weight:600,style:'normal'}]});
}

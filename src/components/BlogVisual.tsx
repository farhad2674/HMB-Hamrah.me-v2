import type { BlogVisual as BlogVisualData } from '@/lib/blog';

function Flow({labels}:{labels:string[]}) {
  return <g>{labels.slice(0,4).map((label,index)=>{const x=30+index*150;return <g key={label}><rect x={x} y="105" width="120" height="70" rx="14"/><text x={x+60} y="147" textAnchor="middle">{label}</text>{index<Math.min(labels.length,4)-1&&<path d={`M ${x+120} 140 H ${x+145}`} />}</g>})}</g>;
}
function Cards({labels}:{labels:string[]}) { return <g>{labels.slice(0,4).map((label,index)=>{const x=45+(index%2)*290,y=65+Math.floor(index/2)*115;return <g key={label}><rect x={x} y={y} width="250" height="82" rx="16"/><circle cx={x+28} cy={y+27} r="9"/><text x={x+125} y={y+48} textAnchor="middle">{label}</text></g>})}</g>; }
function Matrix({labels}:{labels:string[]}) { return <g><path d="M320 45V275M45 160H595"/>{labels.slice(0,4).map((label,index)=><g key={label}><rect x={65+(index%2)*285} y={65+Math.floor(index/2)*115} width="220" height="70" rx="14"/><text x={175+(index%2)*285} y={107+Math.floor(index/2)*115} textAnchor="middle">{label}</text></g>)}</g>; }
function Scale({labels}:{labels:string[]}) { return <g><path d="M120 190H520M320 80V235"/><circle cx="320" cy="80" r="20"/><path d="M175 190L125 245H225ZM465 190L415 245H515Z"/>{labels.slice(0,4).map((label,index)=><text key={label} x={[175,465,320,320][index]} y={[275,275,55,225][index]} textAnchor="middle">{label}</text>)}</g>; }
function Checklist({labels}:{labels:string[]}) { return <g>{labels.slice(0,4).map((label,index)=><g key={label}><rect x="80" y={55+index*56} width="32" height="32" rx="8"/><path d={`M88 ${70+index*56}l7 7 12-15`}/><text x="132" y={78+index*56}>{label}</text></g>)}</g>; }
function Cycle({labels}:{labels:string[]}) { const points=[[320,58],[520,160],[320,262],[120,160]];return <g><ellipse cx="320" cy="160" rx="200" ry="102"/>{labels.slice(0,4).map((label,index)=><g key={label}><circle cx={points[index][0]} cy={points[index][1]} r="42"/><text x={points[index][0]} y={points[index][1]+5} textAnchor="middle">{label}</text></g>)}</g>; }

export default function BlogVisual({visual,id,hero=false}:{visual:BlogVisualData;id:string;hero?:boolean}) {
  const titleId=`${id}-title`,descId=`${id}-desc`;
  const Graphic=visual.type==='flow'?Flow:visual.type==='cards'?Cards:visual.type==='matrix'?Matrix:visual.type==='scale'?Scale:visual.type==='checklist'?Checklist:Cycle;
  return <figure className={`blog-visual ${hero?'blog-visual-hero':''}`}>
    <div className="blog-visual-head"><span>همراه / تصویر آموزشی</span><strong>{visual.title}</strong></div>
    <svg viewBox="0 0 640 320" role="img" aria-labelledby={`${titleId} ${descId}`}>
      <title id={titleId}>{visual.title}</title><desc id={descId}>{visual.alt}</desc><Graphic labels={visual.labels}/>
    </svg>
    <figcaption>{visual.caption}</figcaption>
  </figure>;
}

export function BlogCover({title,category,index=0}:{title:string;category:string;index?:number}) {
  return <div className={`blog-cover blog-cover-${index%4}`} role="img" aria-label={`تصویر مقالهٔ ${title}`}>
    <span className="blog-cover-grid" aria-hidden="true"/><span className="blog-cover-orbit" aria-hidden="true"/>
    <div><small>HAMRAH.ME / INSIGHT</small><strong>{category}</strong><p>{title}</p></div>
  </div>;
}

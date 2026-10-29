'use client';
import { useEffect, useRef, useState } from 'react';
import { BookOpen, ListChecks, NotebookPen, MessageSquareText, ArrowUpLeft, Check, CornerDownLeft } from 'lucide-react';
import Link from 'next/link';
const steps = [
  { id:'understand', label:'شناخت', english:'UNDERSTAND', icon:BookOpen, title:'اول، منطق تصمیم را بشناسید.', text:'ساختار بازار و مدیریت ریسک را یاد بگیرید. هدف این است که بتوانید دلیل بررسی یک موقعیت را با زبان خودتان توضیح دهید.', prompt:'چه چیزی را می‌بینم؟', lines:['مشاهده را از برداشت جدا می‌کنم.','سناریو را پیش از نتیجه می‌نویسم.','شرط تغییر دیدگاه را مشخص می‌کنم.'], note:'یک مفهوم، با یک مثال قابل بررسی.', href:'/programs/foundations', cta:'دیدن مسیر آموزش پایه' },
  { id:'practise', label:'تمرین', english:'PRACTISE', icon:ListChecks, title:'دانسته‌ها را در عمل بیازمایید.', text:'در محیط آزمایشی، یک قاعدهٔ مشخص را تمرین کنید. پیش از اجرا، شرایط تصمیم و مرز ریسک را روی کاغذ بیاورید.', prompt:'آیا شروط برنامه کامل است؟', lines:['دلیل بررسی موقعیت را نوشته‌ام.','مرز ریسک را مشخص کرده‌ام.','اگر شرطی کامل نیست، مکث می‌کنم.'], note:'تمرین آزمایشی؛ با معیار مشخص.', href:'/programs/practice', cta:'جزئیات تمرین هدفمند' },
  { id:'record', label:'ثبت', english:'RECORD', icon:NotebookPen, title:'آنچه رخ داد را ثبت کنید.', text:'برنامه چه بود و چه کردید؟ این دو را کنار هم بنویسید تا مرور شما به حدس و حافظه وابسته نباشد.', prompt:'کجا از برنامه فاصله گرفتم؟', lines:['برنامه: پس از تکمیل سه شرط.','اجرا: شرط سوم را دیر بررسی کردم.','مشاهده: ترتیب تمرین رعایت نشد.'], note:'یادداشت روشن، موضوع مرور می‌سازد.', href:'/journal', cta:'کاوش در ژورنال' },
  { id:'reflect', label:'بازخورد', english:'REFLECT', icon:MessageSquareText, title:'برای تمرین بعد، یک تغییر انتخاب کنید.', text:'از مرور تصمیم‌های ثبت‌شده، یک مسئلهٔ مشخص بیرون بکشید. گفت‌وگو با مربی می‌تواند به انتخاب تمرین بعدی جهت بدهد.', prompt:'بار بعد چه چیزی را تغییر می‌دهم؟', lines:['پیش از تصمیم، چک‌لیست را مرور می‌کنم.','زمان تکمیل آن را ثبت می‌کنم.','پایبندی به برنامه را جدا از نتیجه می‌سنجم.'], note:'یک مشاهده، یک تمرین قابل انجام.', href:'/coaching', cta:'شیوهٔ کار با مربی' },
];
export default function ScrollJourney() {
  const [active,setActive] = useState(0);
  const root = useRef<HTMLElement>(null);
  useEffect(()=>{
    const section=root.current;
    if(!section)return;
    const targets=Array.from(section.querySelectorAll<HTMLElement>('[data-journey-step]'));
    let frame=0;
    let current=-1;
    const update=()=>{
      frame=0;
      const viewport=window.innerHeight;
      const bounds=section.getBoundingClientRect();
      let index=0;
      if(bounds.bottom<0)index=steps.length-1;
      else if(bounds.top<viewport){
        const readingLine=viewport*.38;
        targets.forEach((target,i)=>{if(target.getBoundingClientRect().top<=readingLine)index=i;});
      }
      if(index!==current){current=index;setActive(index);}
    };
    const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
    update();
    window.addEventListener('scroll',schedule,{passive:true});
    window.addEventListener('resize',schedule,{passive:true});
    return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);};
  },[]);
  const step=steps[active];
  return <section ref={root} className="scroll-journey" data-scene="H3" aria-labelledby="journey-title">
    <div className="container"><div className="pro-section-index"><span>۰۳ — از شناخت تا مرور</span><span dir="ltr">KNOWLEDGE, PUT INTO PRACTICE</span></div>
      <div className="journey-introduction"><h2 id="journey-title">یادگیری را دنبال کنید.<br/><span>تا جایی که به عمل می‌رسد.</span></h2><p>چهار بخشِ یک مسیر؛ هر کدام با کاری مشخص و اثری که می‌توانید به آن برگردید.</p></div>
      <div className="journey-layout">
        <div className="journey-visual-column"><div className="journey-sticky">
          <nav className="journey-navigation" aria-label="بخش‌های مسیر یادگیری">{steps.map((item,i)=><a href={`#journey-${item.id}`} key={item.id} aria-current={active===i?'step':undefined} onClick={()=>setActive(i)}><span dir="ltr">0{i+1}</span>{item.label}</a>)}</nav>
          <div className="journey-art" aria-hidden="true" data-active-step={active}>
            <div className="journey-orbits"><i/><i/><i/><span/></div>
            <div className="journey-sheet" key={step.id}><div className="journey-sheet-top"><span><step.icon size={16}/>{step.label}</span><span>نمونهٔ آموزشی</span></div><div className="journey-sheet-body"><span className="journey-english" dir="ltr">0{active+1} / {step.english}</span><h3>{step.prompt}</h3><div className="journey-sheet-lines">{step.lines.map((line,i)=><p key={line}><span>{active<2?<Check size={12}/>:`۰${i+1}`}</span>{line}</p>)}</div><div className="journey-sheet-note"><CornerDownLeft size={16}/>{step.note}</div></div><div className="journey-sheet-progress">{steps.map((item,i)=><span key={item.id} className={i<=active?'filled':''}/>)}</div></div>
            <div className="journey-art-caption"><span dir="ltr">HMB / DECISION WORKSPACE</span><span>تصمیم، موضوعِ یادگیری است.</span></div>
          </div>
        </div></div>
        <div className="journey-narrative">{steps.map((item,i)=><article className={active===i?'journey-step is-active':'journey-step'} data-journey-step={i} id={`journey-${item.id}`} key={item.id}><div className="journey-step-count"><span>۰{i+1}</span><item.icon size={19}/></div><span className="journey-step-label">{item.label}</span><h3>{item.title}</h3><p>{item.text}</p><Link href={item.href}>{item.cta}<ArrowUpLeft size={17}/></Link></article>)}</div>
      </div>
    </div>
  </section>;
}

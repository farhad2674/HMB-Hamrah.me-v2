'use client';

import { useId, useRef, useState } from 'react';
import { ArrowDownLeft, Check, Circle, CornerDownLeft, NotebookPen } from 'lucide-react';
import './decision-studio.css';

const scenes = [
  {
    tab: 'برنامه',
    label: 'پیش از تصمیم',
    code: '01 / PREPARE',
    title: 'هر تصمیم، یک دلیل.',
    rows: ['دلیل ورود روشن است؟', 'مرز ریسک مشخص است؟', 'با برنامه هم‌خوان است؟'],
    note: 'اگر پاسخ روشن نیست، مکث کنید.',
    footer: 'برنامه را پیش از دیدن نتیجه بنویسید.',
  },
  {
    tab: 'اجرا',
    label: 'هنگام تمرین',
    code: '02 / PRACTISE',
    title: 'به برنامه برگردید.',
    rows: ['شرط اول را بررسی کردم.', 'شرط دوم هنوز کامل نبود.', 'این بار، وارد معامله نشدم.'],
    note: 'معامله نکردن هم یک تصمیم است.',
    footer: 'آنچه انجام دادید را دقیق ثبت کنید.',
  },
  {
    tab: 'مرور',
    label: 'پس از تمرین',
    code: '03 / REFLECT',
    title: 'از تصمیم، یاد بگیرید.',
    rows: ['کجا به برنامه پایبند ماندم؟', 'کجا از آن فاصله گرفتم؟', 'در تمرین بعد چه تغییری می‌دهم؟'],
    note: 'یک نکته برای تمرین بعد انتخاب کنید.',
    footer: 'کیفیت تصمیم را جدا از نتیجه مرور کنید.',
  },
];

export default function DecisionStudio() {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const id = useId().replace(/:/g, '');
  const scene = scenes[active];

  function moveTab(event: React.KeyboardEvent<HTMLButtonElement>) {
    let next = active;
    if (event.key === 'ArrowLeft') next = (active + 1) % scenes.length;
    else if (event.key === 'ArrowRight') next = (active + scenes.length - 1) % scenes.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = scenes.length - 1;
    else return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }

  return <div className="decision-studio" aria-label="از برنامه تا مرور؛ نمونهٔ تعاملی ژورنال همراه">
    <div className="ds-coordinate ds-coordinate-top" aria-hidden="true" dir="ltr">HMB / THE DECISION STUDIO <span>+</span></div>
    <div className="ds-ambient" aria-hidden="true" />
    <svg className="ds-sculpture" viewBox="0 0 650 600" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-ribbon`} x1="90" y1="470" x2="540" y2="100" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3f512b" stopOpacity="0" />
          <stop offset=".3" stopColor="#79914b" />
          <stop offset=".61" stopColor="#e2f6b0" />
          <stop offset=".8" stopColor="#8ba362" />
          <stop offset="1" stopColor="#253323" stopOpacity=".1" />
        </linearGradient>
        <linearGradient id={`${id}-edge`} x1="100" y1="520" x2="520" y2="60" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d2f36b" stopOpacity="0" />
          <stop offset=".5" stopColor="#d2f36b" stopOpacity=".3" />
          <stop offset=".76" stopColor="#edf7d6" />
          <stop offset="1" stopColor="#d2f36b" stopOpacity="0" />
        </linearGradient>
        <filter id={`${id}-glow`} x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="12" /></filter>
      </defs>
      <ellipse cx="328" cy="300" rx="276" ry="119" transform="rotate(-48 328 300)" stroke={`url(#${id}-ribbon)`} strokeWidth="30" opacity=".18" filter={`url(#${id}-glow)`} />
      <ellipse cx="328" cy="300" rx="276" ry="119" transform="rotate(-48 328 300)" stroke={`url(#${id}-ribbon)`} strokeWidth="23" />
      {Array.from({ length: 8 }, (_, index) => <ellipse key={index} cx="328" cy="300" rx={264 + index * 3.3} ry={107 + index * 3.3} transform="rotate(-48 328 300)" stroke={`url(#${id}-edge)`} strokeWidth=".7" opacity={.2 + index * .08} />)}
      <path d="M64 471h51m-25-25v50M548 110h35m-17-17v35" stroke="#91a16b" strokeOpacity=".45" strokeWidth=".8" />
      <circle cx="517" cy="126" r="4" fill="#e1f1b9" />
      <circle cx="517" cy="126" r="10" stroke="#d2f36b" strokeOpacity=".28" />
    </svg>

    <div className="ds-backplate" aria-hidden="true"><span /><span /><span /></div>
    <div className="ds-workbook">
      <div className="ds-workbook-bar"><span className="ds-book-title"><NotebookPen size={15} strokeWidth={1.5} /> دفتر تصمیم</span><span className="ds-sample">نمونهٔ آموزشی</span></div>
      <div className="ds-tabs" role="tablist" aria-label="مراحل ثبت تصمیم">{scenes.map((item, index) => <button key={item.tab} ref={element => { tabs.current[index] = element; }} type="button" role="tab" id={`${id}-tab-${index}`} aria-controls={`${id}-panel`} aria-selected={active === index} tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={moveTab}><span aria-hidden="true">۰{index + 1}</span>{item.tab}</button>)}</div>
      <div className="ds-panel" role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`} tabIndex={0}>
        <div className="ds-panel-inner" key={active}>
          <div className="ds-panel-label"><span>{scene.label}</span><span dir="ltr">{scene.code}</span></div>
          <h2>{scene.title}</h2>
          <div className="ds-question-list">{scene.rows.map((row, index) => <div className="ds-question" key={row}><span className={`ds-check ${index === 2 ? 'ds-check-open' : ''}`} aria-hidden="true">{index === 2 ? <Circle size={12} /> : <Check size={12} />}</span><span>{row}</span><span className="ds-question-index" aria-hidden="true">۰{index + 1}</span></div>)}</div>
          <div className="ds-panel-footer"><CornerDownLeft size={14} /><span>{scene.footer}</span></div>
        </div>
      </div>
    </div>
    <div className="ds-insight" aria-live="polite" aria-atomic="true"><span className="ds-insight-icon" aria-hidden="true"><ArrowDownLeft size={21} strokeWidth={1.2} /></span><div><span className="ds-insight-caption">یادداشت همراه</span><p>{scene.note}</p></div></div>
    <div className="ds-coordinate ds-coordinate-bottom" aria-hidden="true" dir="ltr"><span>LEARN. PRACTISE. REFLECT.</span><span className="ds-coordinate-mark">↗</span></div>
  </div>;
}

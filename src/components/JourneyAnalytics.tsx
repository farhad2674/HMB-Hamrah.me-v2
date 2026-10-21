'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function JourneyAnalytics(){
 const pathname=usePathname();
 useEffect(()=>{
  if(pathname!=='/'||!('IntersectionObserver' in window))return;
  const seen=new Set<string>();
  const observer=new IntersectionObserver(entries=>{for(const entry of entries){const section=(entry.target as HTMLElement).dataset.scene;if(entry.isIntersecting&&section&&!seen.has(section)){seen.add(section);void fetch('/api/analytics',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({event:'story_section_view',properties:{section_id:section,route:'/',locale:'fa-IR'}})}).catch(()=>{});observer.unobserve(entry.target)}}},{threshold:.25});
  document.querySelectorAll('[data-scene]').forEach(section=>observer.observe(section));
  return()=>observer.disconnect();
 },[pathname]);
 return null;
}

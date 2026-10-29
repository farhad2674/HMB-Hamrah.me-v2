'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
export default function MotionObserver() {
  const pathname=usePathname();
  useEffect(()=>{
    const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
    const root=document.documentElement;
    const header=document.querySelector<HTMLElement>('.site-header');
    const progress=document.querySelector<HTMLElement>('.reading-progress');
    const cleanups:Array<()=>void>=[];
    let disposeMotion=()=>{};
    const configure=()=>{
      disposeMotion();
      const nodes=Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
      const layers=Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
      const groups=Array.from(document.querySelectorAll<HTMLElement>('[data-stagger]'));
      const targets=groups.flatMap(group=>Array.from(group.children).filter((node):node is HTMLElement=>node instanceof HTMLElement));
      nodes.forEach(node=>delete node.dataset.revealState);
      targets.forEach(node=>{delete node.dataset.revealState;delete node.dataset.motionItem;node.style.removeProperty('--reveal-delay');});
      layers.forEach(node=>node.style.removeProperty('--parallax-y'));
      if(preference.matches){root.dataset.motion='reduced';disposeMotion=()=>{};return;}
      root.dataset.motion='full';
      const revealNodes=[...nodes,...targets];
      groups.forEach(group=>Array.from(group.children).forEach((node,i)=>{if(node instanceof HTMLElement){node.dataset.motionItem='';const delay=group.closest('.pro-home')?Math.min(i*80,160):Math.min(i,5)*85;node.style.setProperty('--reveal-delay',`${delay}ms`);}}));
      const observer='IntersectionObserver' in window?new IntersectionObserver(entries=>{
        entries.forEach(entry=>{if(entry.isIntersecting){(entry.target as HTMLElement).dataset.revealState='visible';observer?.unobserve(entry.target);}});
      },{rootMargin:'0px 0px -32px 0px',threshold:0}):null;
      revealNodes.forEach(node=>{if(node.getBoundingClientRect().top>=window.innerHeight&&observer){node.dataset.revealState='pending';observer.observe(node);}});
      let frame=0;
      const update=()=>{
        frame=0;
        const height=window.innerHeight;
        const total=Math.max(1,root.scrollHeight-height);
        progress?.style.setProperty('--page-progress',String(Math.min(1,Math.max(0,window.scrollY/total))));
        if(header)header.dataset.scrolled=window.scrollY>28?'true':'false';
        if(window.innerWidth<900){layers.forEach(layer=>layer.style.removeProperty('--parallax-y'));return;}
        layers.forEach(layer=>{
          const bounds=layer.getBoundingClientRect();
          if(bounds.bottom< -100||bounds.top>height+100)return;
          const amount=Number(layer.dataset.parallax)||20;
          const offset=Math.max(-1,Math.min(1,(height/2-bounds.top-bounds.height/2)/height));
          layer.style.setProperty('--parallax-y',`${(offset*amount).toFixed(2)}px`);
        });
      };
      const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
      window.addEventListener('scroll',schedule,{passive:true});
      window.addEventListener('resize',schedule,{passive:true});
      update();
      disposeMotion=()=>{observer?.disconnect();cancelAnimationFrame(frame);window.removeEventListener('scroll',schedule);window.removeEventListener('resize',schedule);revealNodes.forEach(node=>delete node.dataset.revealState);layers.forEach(layer=>layer.style.removeProperty('--parallax-y'));};
    };
    configure();
    preference.addEventListener('change',configure);
    cleanups.push(()=>preference.removeEventListener('change',configure));
    return()=>{disposeMotion();cleanups.forEach(cleanup=>cleanup());delete root.dataset.motion;header?.removeAttribute('data-scrolled');progress?.style.removeProperty('--page-progress');};
  },[pathname]);
  return null;
}

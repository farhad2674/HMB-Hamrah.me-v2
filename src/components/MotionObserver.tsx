'use client';

import { useEffect } from 'react';

export default function MotionObserver() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches || !('IntersectionObserver' in window)) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const viewportHeight = window.innerHeight;

    for (const element of elements) {
      const rect = element.getBoundingClientRect();
      if (rect.top > viewportHeight * 0.92) element.dataset.revealState = 'pending';
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const element = entry.target as HTMLElement;
        element.dataset.revealState = 'visible';
        observer.unobserve(element);
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    for (const element of elements) {
      if (element.dataset.revealState === 'pending') observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}

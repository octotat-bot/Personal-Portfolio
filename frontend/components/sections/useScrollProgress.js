import { useEffect, useState } from 'react';

export function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const { top, height } = ref.current.getBoundingClientRect();
      const scrollable = height - window.innerHeight;
      const p = Math.max(0, Math.min(1, -top / scrollable));
      setProgress(p);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial call
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [ref]);

  return progress;
}

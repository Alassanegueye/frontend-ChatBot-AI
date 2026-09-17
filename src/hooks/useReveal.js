import { useEffect, useRef, useState } from 'react';

// Révèle un élément au scroll (apparition progressive + micro-interaction).
export function useReveal(options = {}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px', ...options }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, shown];
}

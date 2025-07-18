import { useState, useEffect, useRef } from 'react';

// This hook is now reusable across the application
const useIntersectionObserver = (options: IntersectionObserverInit & { triggerOnce?: boolean }) => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);
  const ref = useRef<HTMLElement>(null);

  // Memoize options to prevent re-running effect on every render.
  const memoizedOptions = JSON.stringify(options);

  useEffect(() => {
    const node = ref?.current;
    if (!node) return;

    const currentOptions = JSON.parse(memoizedOptions);
    const { triggerOnce, ...observerOptions } = currentOptions;

    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setEntry(entry);
        if (triggerOnce && observer.current) {
          observer.current.unobserve(node);
        }
      }
    }, observerOptions);

    observer.current.observe(node);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [memoizedOptions]);

  return [ref, entry?.isIntersecting] as const;
};

export default useIntersectionObserver;

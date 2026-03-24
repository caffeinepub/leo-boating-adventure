import { useEffect, useRef } from "react";

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.1 },
    );
    const elements = el.querySelectorAll(".fade-up");
    for (const e of Array.from(elements)) {
      observer.observe(e);
    }
    return () => observer.disconnect();
  }, []);

  return ref;
}

"use client";

import { useEffect, useState } from "react";

const SECTION_IDS = ["hero", "work", "experience", "about", "contact"] as const;

export function useActiveSection() {
  const [active, setActive] = useState<string>("work");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-15% 0px -25% 0px", threshold: 0 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return active;
}

"use client";

import { useEffect, useRef, useState } from "react";

export type ParallaxPoint = { x: number; y: number };

/**
 * Normalized pointer position in [-1, 1] relative to a container.
 * Throttled via rAF for performance.
 */
export function useMouseParallax(
  containerRef: React.RefObject<HTMLElement | null>,
  enabled = true,
) {
  const [point, setPoint] = useState<ParallaxPoint>({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const latest = useRef<ParallaxPoint>({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) {
      setPoint({ x: 0, y: 0 });
      return;
    }

    const onMove = (e: MouseEvent) => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      latest.current = {
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      };

      if (rafId.current !== null) return;

      rafId.current = requestAnimationFrame(() => {
        setPoint(latest.current);
        rafId.current = null;
      });
    };

    const onLeave = () => {
      latest.current = { x: 0, y: 0 };
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        setPoint({ x: 0, y: 0 });
        rafId.current = null;
      });
    };

    const el = containerRef.current;
    if (!el) return;

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [containerRef, enabled]);

  return point;
}

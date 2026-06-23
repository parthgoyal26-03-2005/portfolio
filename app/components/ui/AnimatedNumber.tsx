"use client";

import { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue } from "framer-motion";

export function AnimatedNumber({
  value,
  className,
  suffix = "",
  duration = 1.8,
  delay = 0.1,
}: {
  value: number;
  className?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
}) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  const count = useMotionValue(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, value, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
    });
    return controls.stop;
  }, [isInView, count, value, duration, delay]);

  useEffect(() => {
    return count.on("change", (v) => {
      if (textRef.current) {
        textRef.current.textContent = Math.round(v).toLocaleString() + suffix;
      }
    });
  }, [count, suffix]);

  return (
    <span ref={containerRef}>
      <span ref={textRef} className={className}>
        0{suffix}
      </span>
    </span>
  );
}

"use client";

import { useId, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedNumber } from "./AnimatedNumber";

export function CircularProgress({
  value,
  max,
  size = 150,
  strokeWidth = 12,
  centerLabel,
  centerSublabel,
  className,
}: {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  centerLabel?: string;
  centerSublabel?: string;
  className?: string;
}) {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9]/g, "");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = max > 0 ? Math.max(0, Math.min(value, max)) / max : 0;
  const offset = circumference * (1 - pct);

  return (
    <div
      ref={ref}
      className={`relative inline-flex items-center justify-center ${className ?? ""}`}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
        <defs>
          <linearGradient id={`${uid}g`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(124,58,237,1)" />
            <stop offset="100%" stopColor="rgba(99,179,237,1)" />
          </linearGradient>
        </defs>
        {/* Track ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth={strokeWidth}
        />
        {/* Animated progress ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${uid}g)`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={isInView ? { strokeDashoffset: offset } : undefined}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ filter: "drop-shadow(0 0 6px rgba(124,58,237,0.55))" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center gap-0.5 text-center">
        <AnimatedNumber
          value={value}
          className="font-display text-2xl font-bold text-on-surface sm:text-3xl"
          duration={1.8}
          delay={0.2}
        />
        {centerLabel && (
          <span className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
            {centerLabel}
          </span>
        )}
        {centerSublabel && (
          <span className="font-mono text-[10px] text-secondary">
            {centerSublabel}
          </span>
        )}
      </div>
    </div>
  );
}

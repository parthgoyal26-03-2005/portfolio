"use client";

import { motion } from "framer-motion";
import { easeOut } from "@/app/lib/motion";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";
import Shuffle from "@/components/Shuffle";

export function StaggeredHeadline() {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return (
      <h1 className="font-[family-name:var(--font-sora)]">
        <span className="block text-[clamp(2.5rem,8vw,4.5rem)] font-extrabold leading-[0.95] tracking-[-0.04em] text-on-surface">
          DIGITAL
        </span>
        <span className="gradient-text mt-1 block text-[clamp(2.75rem,9vw,5rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
          ARCHITECT
        </span>
      </h1>
    );
  }

  return (
    <div style={{ perspective: "1200px" }}>
      <h1 className="font-[family-name:var(--font-sora)]">
        {/* "DIGITAL" — Shuffle right-to-left, replays on hover */}
        <Shuffle
          tag="span"
          text="FULL-STACK"
          style={{
            fontFamily: "var(--font-sora), system-ui, sans-serif",
            fontSize: "clamp(2.5rem,8vw,4.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            display: "block",
            color: "#f8fafc",
          }}
          shuffleDirection="right"
          duration={0.4}
          stagger={0.03}
          shuffleTimes={1}
          threshold={0.05}
          rootMargin="0px"
          triggerOnHover
          colorFrom="#94a3b8"
          colorTo="#f8fafc"
        />

        {/* "ARCHITECT" — Shuffle top-to-bottom, replays on hover */}
        <Shuffle
          tag="span"
          text="DEVELOPER"
          style={{
            fontFamily: "var(--font-sora), system-ui, sans-serif",
            fontSize: "clamp(2.75rem,9vw,5rem)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            display: "block",
            marginTop: "0.25rem",
            color: "#d2bbff",
          }}
          shuffleDirection="down"
          duration={0.4}
          stagger={0.035}
          shuffleTimes={1}
          threshold={0.05}
          rootMargin="0px"
          triggerOnHover
          colorFrom="#adc6ff"
          colorTo="#d2bbff"
        />
      </h1>

      <motion.p
        className="mt-4 font-mono text-[11px] uppercase tracking-[0.35em] text-text-muted sm:text-xs"
        initial={{ opacity: 0, letterSpacing: "0.5em" }}
        animate={{ opacity: 1, letterSpacing: "0.35em" }}
        transition={{ delay: 1.15, duration: 0.8, ease: easeOut }}
      >
        Software Engineer
      </motion.p>
    </div>
  );
}

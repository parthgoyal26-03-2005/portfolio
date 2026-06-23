"use client";

import {
  motion,
  useTransform,
  type MotionProps,
  type MotionStyle,
  type MotionValue,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";
import type { ParallaxPoint } from "@/app/hooks/useMouseParallax";

type HeroAmbientProps = {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
};

function GlowOrb({
  className,
  style,
  animate,
}: {
  className: string;
  style?: MotionStyle;
  animate?: MotionProps["animate"];
}) {
  return (
    <motion.div
      className={className}
      style={style}
      animate={animate}
      transition={
        animate
          ? { duration: 10, repeat: Infinity, ease: "easeInOut" }
          : undefined
      }
      aria-hidden
    />
  );
}

export function HeroAmbient({ mouseX, mouseY }: HeroAmbientProps) {
  const reducedMotion = usePrefersReducedMotion();

  const purpleX = useTransform(mouseX, [-1, 1], [-40, 40]);
  const purpleY = useTransform(mouseY, [-1, 1], [-30, 30]);
  const blueX = useTransform(mouseX, [-1, 1], [30, -30]);
  const blueY = useTransform(mouseY, [-1, 1], [25, -25]);
  const centerX = useTransform(mouseX, [-1, 1], [-15, 15]);
  const centerY = useTransform(mouseY, [-1, 1], [-10, 10]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Vignette */}
      <motion.div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,transparent_0%,#050505_75%)]" />

      {/* Animated light sweeps — subtler */}
      {!reducedMotion && (
        <motion.div
          className="absolute -top-1/2 left-1/2 h-[120%] w-[35%] -translate-x-1/2 rotate-12 bg-gradient-to-b from-primary/6 via-primary/3 to-transparent blur-3xl"
          animate={{ opacity: [0.2, 0.38, 0.2], x: ["-5%", "5%", "-5%"] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Parallax glow orbs — reduced opacity */}
      <GlowOrb
        className="absolute top-[15%] -left-[10%] h-[min(480px,65vw)] w-[min(480px,65vw)] rounded-full bg-primary/12 blur-[130px]"
        style={
          reducedMotion
            ? undefined
            : { x: purpleX, y: purpleY, willChange: "transform" }
        }
        animate={
          reducedMotion
            ? undefined
            : { scale: [1, 1.06, 1], opacity: [0.2, 0.32, 0.2] }
        }
      />
      <GlowOrb
        className="absolute -right-[12%] bottom-[10%] h-[min(440px,60vw)] w-[min(440px,60vw)] rounded-full bg-secondary/10 blur-[130px]"
        style={
          reducedMotion
            ? undefined
            : { x: blueX, y: blueY, willChange: "transform" }
        }
        animate={
          reducedMotion
            ? undefined
            : { scale: [1.04, 1, 1.04], opacity: [0.18, 0.28, 0.18] }
        }
      />

      {/* Grid + scan line */}
      <div className="grid-dots absolute inset-0 opacity-[0.07]" />
      {!reducedMotion && (
        <motion.div
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
          animate={{ top: ["0%", "100%", "0%"], opacity: [0, 0.6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      )}
    </div>
  );
}

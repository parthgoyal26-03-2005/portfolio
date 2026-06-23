"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { IMAGES } from "@/app/lib/data";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

type HeroOrbProps = {
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
};

export function HeroOrb({ mouseX, mouseY }: HeroOrbProps) {
  const reducedMotion = usePrefersReducedMotion();

  const rotateX = useTransform(mouseY, [-1, 1], [14, -14]);
  const rotateY = useTransform(mouseX, [-1, 1], [-14, 14]);
  const translateX = useTransform(mouseX, [-1, 1], [-20, 20]);
  const translateY = useTransform(mouseY, [-1, 1], [-16, 16]);

  return (
    <div
      className="relative flex h-44 w-44 items-center justify-center sm:h-52 sm:w-52"
      style={{ perspective: 900 }}
    >
      <div className="absolute inset-0 animate-spin-slow rounded-full border-2 border-primary/25" />
      <div className="absolute inset-4 animate-spin-reverse rounded-full border border-secondary/20" />

      <motion.div
        className="absolute inset-0 rounded-full bg-primary/20 blur-2xl"
        animate={{ opacity: [0.35, 0.65, 0.35], scale: [0.92, 1.06, 0.92] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <motion.div
        className="relative z-10"
        style={
          reducedMotion
            ? undefined
            : {
                rotateX,
                rotateY,
                x: translateX,
                y: translateY,
                transformStyle: "preserve-3d",
                willChange: "transform",
              }
        }
        animate={reducedMotion ? undefined : { y: [0, -10, 0] }}
        transition={
          reducedMotion
            ? undefined
            : { y: { duration: 5.5, repeat: Infinity, ease: "easeInOut" } }
        }
      >
        <Image
          src={IMAGES.heroOrb}
          alt="3D abstract tech centerpiece"
          width={208}
          height={208}
          className="h-44 w-44 object-contain mix-blend-screen opacity-95 drop-shadow-[0_0_48px_rgba(124,58,237,0.5)] sm:h-52 sm:w-52"
          priority
        />
      </motion.div>
    </div>
  );
}

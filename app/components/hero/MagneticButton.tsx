"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/app/lib/utils";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  strength?: number;
};

export function MagneticButton({
  href,
  children,
  variant = "primary",
  className,
  strength = 0.32,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reducedMotion = usePrefersReducedMotion();

  const variants = {
    primary:
      "neon-glow-btn relative overflow-hidden rounded-lg bg-gradient-to-r from-primary-container to-secondary-container px-8 py-4 text-on-primary-container",
    secondary:
      "relative overflow-hidden rounded-lg border border-glass-stroke bg-surface-variant/30 px-8 py-4 text-on-surface backdrop-blur-sm hover:border-primary/30",
  };

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty("--x", `${px}%`);
    ref.current.style.setProperty("--y", `${py}%`);

    if (reducedMotion) return;
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setOffset({ x, y });
  };

  const handleLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 280, damping: 22, mass: 0.4 }}
      whileHover={{ scale: reducedMotion ? 1 : 1.02 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 font-mono text-sm font-medium tracking-wider uppercase",
        variants[variant],
        className,
      )}
    >
      {variant === "primary" && (
        <span
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(circle at var(--x,50%) var(--y,50%), rgba(255,255,255,0.15), transparent 55%)",
          }}
        />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.a>
  );
}

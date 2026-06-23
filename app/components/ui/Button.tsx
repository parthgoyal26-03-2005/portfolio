"use client";

import { motion } from "framer-motion";
import { cn } from "@/app/lib/utils";

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost" | "nav";
  href?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function Button({
  variant = "primary",
  href,
  children,
  className,
  onClick,
  type = "button",
  disabled,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-mono text-sm font-medium tracking-wider uppercase transition-colors";

  const variants = {
    primary:
      "neon-glow-btn rounded-lg bg-gradient-to-r from-primary-container to-secondary-container px-8 py-4 text-on-primary-container",
    secondary:
      "rounded-lg border border-glass-stroke bg-surface-variant/40 px-8 py-4 text-on-surface hover:bg-surface-variant/60",
    ghost:
      "rounded-full border border-primary px-8 py-3 text-primary hover:bg-primary/10",
    nav: "rounded-full bg-primary-container px-6 py-2 text-on-primary-container hover:bg-primary/20 hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]",
  };

  const classes = cn(base, variants[variant], className);

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto:");
    return (
      <motion.a
        href={href}
        onClick={onClick}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={classes}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.03 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      className={cn(classes, disabled && "cursor-not-allowed opacity-60")}
    >
      {children}
    </motion.button>
  );
}

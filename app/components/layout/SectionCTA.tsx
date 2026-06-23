"use client";

import { motion } from "framer-motion";
import { easeOut } from "@/app/lib/motion";
import { MOTION_VIEWPORT } from "@/app/lib/constants";

type SectionCTAProps = {
  eyebrow?: string;
  title: string;
  href: string;
  className?: string;
};

export function SectionCTA({
  eyebrow = "Ready to start a project?",
  title,
  href,
  className,
}: SectionCTAProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={MOTION_VIEWPORT}
      transition={{ duration: 0.7, ease: easeOut }}
    >
      <div className="light-streak mx-auto mb-8 max-w-md opacity-30" />
      <p className="mb-6 text-center font-mono-label text-text-muted">
        {eyebrow}
      </p>
      <a
        href={href}
        className="group mx-auto block w-fit text-center font-display text-2xl font-bold text-on-surface transition-colors hover:text-primary sm:text-3xl md:text-4xl"
      >
        {title}
        <span className="mt-2 block h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />
      </a>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";

export function AtmosphericGlow() {
  return (
    <motion.div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute -left-1/4 top-1/4 h-[min(600px,80vw)] w-[min(600px,80vw)] rounded-full bg-primary/20 blur-[120px]"
        animate={{ opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-1/4 bottom-1/4 h-[min(600px,80vw)] w-[min(600px,80vw)] rounded-full bg-secondary/20 blur-[120px]"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </motion.div>
  );
}

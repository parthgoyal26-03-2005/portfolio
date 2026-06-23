"use client";

import { motion } from "framer-motion";
import { PROJECTS } from "@/app/lib/data";
import { MOTION_VIEWPORT } from "@/app/lib/constants";
import { bentoCardReveal, bentoStagger } from "@/app/lib/motion";
import {
  CtaProjectCard,
  FeaturedProjectCard,
  TallProjectCard,
  WideProjectCard,
} from "@/app/components/projects/ProjectCard";

export function ProjectBentoGrid() {
  const featured = PROJECTS.find((p) => p.span === "lg");
  const tall = PROJECTS.find((p) => p.span === "sm");
  const wide = PROJECTS.find((p) => p.span === "md");
  // const cta = PROJECTS.find((p) => p.span === "cta");

  return (
    <motion.div
      className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-12 md:gap-6"
      variants={bentoStagger}
      initial="hidden"
      whileInView="visible"
      viewport={MOTION_VIEWPORT}
    >
      {/* Row 1+2 left: featured spans 2 rows */}
      {featured && (
        <motion.div
          variants={bentoCardReveal}
          className="md:col-span-8 md:row-span-2"
        >
          <FeaturedProjectCard project={featured} className="h-full" />
        </motion.div>
      )}

      {/* Row 1 right: tall card */}
      {tall && (
        <motion.div variants={bentoCardReveal} className="md:col-span-4">
          <TallProjectCard project={tall} className="h-full" />
        </motion.div>
      )}

      {/* Row 2 right: wide card fills the remaining 4 cols */}
      {wide && (
        <motion.div variants={bentoCardReveal} className="md:col-span-4">
          <WideProjectCard project={wide} className="h-full" />
        </motion.div>
      )}

      {/* Row 3: full-width CTA card */}
      {/* {cta && (
        <motion.div variants={bentoCardReveal} className="md:col-span-12">
          <CtaProjectCard project={cta} className="h-full w-full" />
        </motion.div>
      )} */}
    </motion.div>
  );
}

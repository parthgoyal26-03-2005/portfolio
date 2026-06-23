"use client";

import { ProjectBentoGrid } from "@/app/components/projects/ProjectBentoGrid";
import { Section } from "@/app/components/layout/Section";
import { SectionCTA } from "@/app/components/layout/SectionCTA";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { SITE } from "@/app/lib/data";

export function WorkSection() {
  return (
    <Section id="work" ambient="dual">
      <SectionHeader
        eyebrow="Portfolio"
        title="Featured"
        highlight="Projects"
        description="Selected works engineered for performance, immersion, and pixel-perfect craft."
        aside="( Selected Works 2024 )"
      />

      <ProjectBentoGrid />

      <SectionCTA
        className="mt-20 md:mt-28"
        title="LET'S TALK.EXE"
        href={`mailto:${SITE.email}`}
      />
    </Section>
  );
}

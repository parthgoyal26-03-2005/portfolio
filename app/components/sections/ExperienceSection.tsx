"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const FallingText = dynamic(() => import("@/components/FallingText"), { ssr: false });
import { Box, Code2, Database, Sparkles } from "lucide-react";
import {
  CORE_STACK,
  EXPERIENCE,
  SKILL_CHIPS,
} from "@/app/lib/data";
import { MOTION_VIEWPORT } from "@/app/lib/constants";
import { bentoCardReveal, bentoStagger } from "@/app/lib/motion";
import { cn } from "@/app/lib/utils";
import { Section } from "@/app/components/layout/Section";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { GlassCard } from "@/app/components/ui/GlassCard";
import { Button } from "@/app/components/ui/Button";
import CardSwap, { Card } from "@/components/CardSwap";

const coreIcons = {
  database: Database,
  cube: Box,
  sparkles: Sparkles,
  code: Code2,
} as const;

/* ── Inline styles for CardSwap experience cards ── */
const CARD_STYLE: CSSProperties = {
  background: "rgba(18,17,17,0.92)",
  border: "1px solid rgba(210,187,255,0.14)",
  backdropFilter: "blur(16px)",
  borderRadius: "16px",
  padding: "1.4rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.35rem",
  overflow: "hidden",
};

function cardStyleForWidth(w: number): CSSProperties {
  return {
    ...CARD_STYLE,
    padding: w < 300 ? "0.65rem" : w < 360 ? "0.9rem" : "1.4rem",
    borderRadius: w < 360 ? "12px" : "16px",
    gap: w < 360 ? "0.2rem" : "0.35rem",
  };
}

/* ── Brand icons for Core Stack items (Simple Icons CDN) ── */
const CORE_BRAND_ICONS: Record<string, { slug: string; color: string } | null> = {
  "MERN":       { slug: "mongodb",    color: "47A248" },
  "Next.js":    { slug: "nextdotjs",  color: "ffffff" },
  "LangChain":  { slug: "python",     color: "3776AB" },
  "WebSockets": null,
};

/* ── All skills as a single string for FallingText physics ── */
const SKILL_TEXT = SKILL_CHIPS.join(" ");

/* ── Simple Icons CDN mapping: slug + brand hex colour ── */
const SKILL_ICONS: Record<string, { slug: string; color: string }> = {
  "ReactJS":                  { slug: "react",          color: "61DAFB" },
  "Next.js":                  { slug: "nextdotjs",      color: "ffffff" },
  "TypeScript":               { slug: "typescript",     color: "3178C6" },
  "JavaScript":               { slug: "javascript",     color: "F7DF1E" },
  "Tailwind CSS":             { slug: "tailwindcss",    color: "06B6D4" },
  "SCSS":                     { slug: "sass",           color: "CC6699" },
  "Node.js":                  { slug: "nodedotjs",      color: "5FA04E" },
  "Express.js":               { slug: "express",        color: "ffffff" },
  "Django REST Framework":    { slug: "django",         color: "44B78B" },
  "Python":                   { slug: "python",         color: "3776AB" },
  "C++":                      { slug: "cplusplus",      color: "00599C" },
  "MongoDB":                  { slug: "mongodb",        color: "47A248" },
  "PostgreSQL":               { slug: "postgresql",     color: "4169E1" },
  "Prisma ORM":               { slug: "prisma",         color: "A8B2C0" },
  "Git":                      { slug: "git",            color: "F05032" },
  "GitHub":                   { slug: "github",         color: "ffffff" },
  "Postman":                  { slug: "postman",        color: "FF6C37" },
  "Vercel":                   { slug: "vercel",         color: "ffffff" },
  "Ollama":                   { slug: "ollama",         color: "ffffff" },
};

export function ExperienceSection() {
  /* ── Technical Arsenal toggle state ── */
  const [fallingMode, setFallingMode] = useState(false);
  const [fallingKey, setFallingKey] = useState(0);

  /* Responsive CardSwap width */
  const swapContainerRef = useRef<HTMLDivElement>(null);
  const [swapWidth, setSwapWidth] = useState(400);
  useEffect(() => {
    const el = swapContainerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setSwapWidth(Math.min(400, Math.floor(entry.contentRect.width)));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const launchPhysics = () => {
    setFallingKey((k) => k + 1);
    setFallingMode(true);
  };
  const resetPhysics = () => setFallingMode(false);

  return (
    <Section id="experience" ambient="dual">
      <SectionHeader
        eyebrow="Mastery & Journey"
        title="Engineering"
        highlight="Experiences"
        description="Precision-engineered solutions through modern stacks — from immersive frontends to scalable backends."
      />

      <motion.div
        className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6"
        variants={bentoStagger}
        initial="hidden"
        whileInView="visible"
        viewport={MOTION_VIEWPORT}
      >
        {/* ── Core Stack ── */}
        <motion.div variants={bentoCardReveal} className="md:col-span-7">
          <GlassCard
            hover
            padding="md"
            className="group relative flex h-full flex-col justify-between overflow-hidden"
          >
            <div>
              <h3 className="font-display text-2xl font-semibold text-text-primary">
                Core Stack
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-text-muted sm:text-base">
                High-performance libraries and modern JavaScript frameworks.
              </p>
            </div>

            <div className="relative z-10 mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 md:mt-10">
              {CORE_STACK.map((tech, idx) => {
                const FallbackIcon = coreIcons[tech.icon];
                const brandIcon = CORE_BRAND_ICONS[tech.label];
                const isPrimary = tech.accent === "primary";
                return (
                  <motion.div
                    key={tech.label}
                    className="group flex flex-col items-center gap-2 rounded-xl p-3 transition-colors hover:bg-primary/5 sm:gap-3 sm:p-4"
                    whileHover={{ y: -4, scale: 1.04 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={MOTION_VIEWPORT}
                    transition={{ duration: 0.5, delay: idx * 0.07 }}
                  >
                    <div
                      className={cn(
                        "relative flex h-14 w-14 items-center justify-center rounded-2xl border border-glass-stroke bg-surface-container-high transition-all duration-300 sm:h-16 sm:w-16",
                        "group-hover:border-opacity-60",
                        isPrimary
                          ? "shadow-[0_0_20px_rgba(124,58,237,0.2)] group-hover:shadow-[0_0_30px_rgba(124,58,237,0.45)]"
                          : "shadow-[0_0_20px_rgba(59,130,246,0.2)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.45)]",
                      )}
                    >
                      {brandIcon ? (
                        <img
                          src={`https://cdn.simpleicons.org/${brandIcon.slug}/${brandIcon.color}`}
                          alt={tech.label}
                          className="h-7 w-7 object-contain sm:h-8 sm:w-8 transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                        />
                      ) : (
                        <FallbackIcon
                          className={cn(
                            "h-6 w-6 sm:h-7 sm:w-7 transition-transform duration-300 group-hover:scale-110",
                            isPrimary ? "text-primary" : "text-secondary",
                          )}
                        />
                      )}
                      {/* glow pulse on hover */}
                      <div
                        className={cn(
                          "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                          isPrimary
                            ? "bg-primary/10"
                            : "bg-secondary/10",
                        )}
                      />
                    </div>
                    <span className="font-mono text-xs font-medium text-on-surface sm:text-sm">
                      {tech.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            <div className="pointer-events-none absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-primary/10 blur-[80px] transition-all duration-700 group-hover:bg-primary/20" />
          </GlassCard>
        </motion.div>

        {/* ── Technical Arsenal ── */}
        <motion.div variants={bentoCardReveal} className="md:col-span-5">
          <GlassCard hover padding="md" className="flex h-full flex-col overflow-hidden">
            {/* Header row */}
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-display text-2xl font-semibold text-text-primary">
                  Technical Arsenal
                </h3>
                <p className="mt-0.5 font-mono text-[11px] text-text-muted">
                  {fallingMode ? "Drag the words · click ↺ to reset" : "Icons · click ↓ to launch physics"}
                </p>
              </div>
              {fallingMode ? (
                <button
                  onClick={resetPhysics}
                  className="shrink-0 rounded-full border border-glass-stroke bg-surface-container px-3 py-1 font-mono text-[11px] text-on-surface-variant transition-colors hover:border-primary/50 hover:text-primary"
                >
                  ↺ Reset
                </button>
              ) : (
                <button
                  onClick={launchPhysics}
                  className="shrink-0 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[11px] text-primary transition-colors hover:bg-primary/20"
                >
                  ↓ Physics
                </button>
              )}
            </div>

            {/* Content area */}
            <div className="relative mt-4 flex-1" style={{ minHeight: "260px" }}>
              {fallingMode ? (
                /* Physics mode — FallingText with auto trigger */
                <FallingText
                  key={fallingKey}
                  text={SKILL_TEXT}
                  highlightWords={["ReactJS", "Next.js", "Node.js", "Python", "MongoDB"]}
                  highlightClass="arsenal-highlight"
                  trigger="auto"
                  gravity={0.55}
                  mouseConstraintStiffness={0.14}
                  fontSize="0.68rem"
                />
              ) : (
                /* Normal mode — icon chips with Simple Icons */
                <div className="flex flex-wrap content-start gap-2">
                  {SKILL_CHIPS.map((skill, i) => {
                    const icon = SKILL_ICONS[skill];
                    const isPrimary = i % 2 === 0;
                    return (
                      <motion.div
                        key={skill}
                        className="group relative"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.02 }}
                        whileHover={{ y: -2 }}
                      >
                        <div
                          className={cn(
                            "flex items-center gap-1.5 rounded-full border px-2.5 py-1 transition-all duration-200",
                            "font-mono text-[10px] uppercase tracking-[0.08em]",
                            isPrimary
                              ? "border-primary/30 text-primary hover:border-primary/60 hover:shadow-[0_0_8px_rgba(124,58,237,0.3)]"
                              : "border-secondary/30 text-secondary hover:border-secondary/60 hover:shadow-[0_0_8px_rgba(59,130,246,0.3)]",
                          )}
                        >
                          {icon && (
                            <img
                              src={`https://cdn.simpleicons.org/${icon.slug}/${icon.color}`}
                              alt=""
                              aria-hidden
                              className="h-3 w-3 shrink-0 object-contain"
                              loading="lazy"
                            />
                          )}
                          {skill}
                        </div>
                        {/* Tooltip */}
                        <span className="pointer-events-none absolute -top-7 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded border border-glass-stroke bg-surface-container-high px-2 py-0.5 font-mono text-[9px] text-on-surface opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
                          {skill}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </GlassCard>
        </motion.div>

        {/* ── Professional Chronicles — CardSwap ── */}
        <motion.div variants={bentoCardReveal} className="md:col-span-12">
          <GlassCard padding="md" className="relative sm:p-10">
            <div className="relative z-10 flex flex-col gap-10 lg:flex-row lg:gap-12">
              {/* Left: title + compact list */}
              <div className="lg:w-2/5">
                <h3 className="font-display text-2xl font-bold text-text-primary sm:text-3xl lg:sticky lg:top-36">
                  Professional <br />
                  <span className="text-secondary">Chronicles.</span>
                </h3>
                <p className="mt-3 text-sm text-text-muted sm:text-base">
                  A legacy of building digital products that scale.
                </p>

                {/* Quick-glance list */}
                <div className="mt-6 space-y-4">
                  {EXPERIENCE.map((job) => (
                    <div key={job.role} className="flex items-start gap-3">
                      <div
                        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                          job.accent === "primary"
                            ? "bg-primary shadow-[0_0_8px_rgba(124,58,237,0.8)]"
                            : job.accent === "secondary"
                              ? "bg-secondary shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                              : "bg-text-muted"
                        }`}
                      />
                      <div>
                        <p className="font-display text-sm font-semibold text-on-surface">
                          {job.role}
                        </p>
                        <p className="font-mono text-xs text-secondary">
                          {job.company}
                        </p>
                        <p className="mt-0.5 font-mono text-[11px] text-text-muted">
                          {job.period}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: CardSwap — contained via overflow-hidden + CSS reposition */}
              <div
                ref={swapContainerRef}
                className="chronicles-swap relative overflow-hidden rounded-2xl border border-glass-stroke/40 bg-surface-container/20 lg:w-3/5"
                style={{
                  minHeight:
                    swapWidth < 300 ? "220px" : swapWidth < 360 ? "260px" : "400px",
                }}
              >
                <CardSwap
                  width={swapWidth}
                  height={swapWidth < 300 ? 150 : swapWidth < 360 ? 190 : 280}
                  cardDistance={swapWidth < 300 ? 28 : swapWidth < 360 ? 36 : 50}
                  verticalDistance={swapWidth < 300 ? 32 : swapWidth < 360 ? 42 : 60}
                  delay={3500}
                  pauseOnHover
                  easing="elastic"
                >
                  {EXPERIENCE.map((job) => (
                    <Card key={job.role} style={cardStyleForWidth(swapWidth)}>
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontSize: swapWidth < 300 ? "8px" : "10px",
                          textTransform: "uppercase",
                          letterSpacing: "0.2em",
                          color:
                            job.accent === "primary"
                              ? "#d2bbff"
                              : job.accent === "secondary"
                                ? "#adc6ff"
                                : "#94a3b8",
                        }}
                      >
                        {job.period}
                      </span>
                      <h4
                        style={{
                          fontFamily: "Sora, system-ui, sans-serif",
                          fontSize: swapWidth < 300 ? "13px" : swapWidth < 360 ? "15px" : "17px",
                          fontWeight: 700,
                          color: "#f8fafc",
                          lineHeight: 1.3,
                          marginTop: "4px",
                        }}
                      >
                        {job.role}
                      </h4>
                      <p
                        style={{
                          fontFamily: "monospace",
                          fontSize: swapWidth < 300 ? "9px" : "11px",
                          color:
                            job.accent === "secondary" ? "#adc6ff" : "#d2bbff",
                        }}
                      >
                        {job.company}
                      </p>
                      <p
                        style={{
                          fontSize: swapWidth < 300 ? "9px" : "11px",
                          lineHeight: 1.65,
                          color: "#94a3b8",
                          marginTop: swapWidth < 360 ? "4px" : "6px",
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: swapWidth < 360 ? 3 : 4,
                          WebkitBoxOrient: "vertical",
                        }}
                      >
                        {job.description}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "4px",
                          marginTop: swapWidth < 360 ? "5px" : "8px",
                        }}
                      >
                        {job.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              background:
                                job.accent === "primary"
                                  ? "rgba(124,58,237,0.18)"
                                  : "rgba(59,130,246,0.15)",
                              color:
                                job.accent === "primary" ? "#d2bbff" : "#adc6ff",
                              borderRadius: "4px",
                              padding: swapWidth < 300 ? "1px 5px" : "2px 7px",
                              fontSize: swapWidth < 300 ? "8px" : "10px",
                              fontFamily: "monospace",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Card>
                  ))}
                </CardSwap>
              </div>
            </div>

            <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-secondary/5 blur-[120px]" />
          </GlassCard>
        </motion.div>

        {/* ── CTA ── */}
        <motion.div variants={bentoCardReveal} className="md:col-span-12">
          <GlassCard padding="lg" className="relative overflow-hidden text-center">
            <div className="relative z-10">
              <h3 className="font-display text-2xl font-bold text-text-primary sm:text-3xl md:text-4xl">
                Want to see the code?
              </h3>
              <p className="mx-auto mt-4 mb-8 max-w-2xl text-sm text-text-muted sm:text-base sm:leading-7 md:text-lg">
                Explore my GitHub repositories to see how I architect systems
                and write clean, maintainable code.
              </p>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                <Button
                  href="https://github.com/parthgoyal26-03-2005"
                  variant="primary"
                >
                  View GitHub
                </Button>
                <Button
                  href="https://drive.google.com/file/d/1IeWrhWVEJUccD7EH-3vOyBhFlfHQfZ-K/view?usp=sharing"
                  variant="secondary"
                >
                  Download CV
                </Button>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-15">
              <div className="h-[min(400px,70vw)] w-[min(400px,70vw)] rounded-full border border-primary/20" />
              <div className="absolute h-[min(560px,90vw)] w-[min(560px,90vw)] rounded-full border border-secondary/10" />
            </div>
          </GlassCard>
        </motion.div>
      </motion.div>
    </Section>
  );
}

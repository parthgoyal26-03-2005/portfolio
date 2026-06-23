"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import { SITE, IMAGES } from "@/app/lib/data";
import TextType from "@/components/TextType";

const PixelTransition = dynamic(() => import("@/components/PixelTransition"), { ssr: false });
import {
  heroBlock,
  heroContentStagger,
  heroEntrance,
} from "@/app/lib/motion";
import { GlassCard } from "@/app/components/ui/GlassCard";
import { HeroAmbient } from "@/app/components/hero/HeroAmbient";
import { HeroParticles } from "@/app/components/hero/HeroParticles";
import { MagneticButton } from "@/app/components/hero/MagneticButton";
import { StaggeredHeadline } from "@/app/components/hero/StaggeredHeadline";
import { useMouseParallax } from "@/app/hooks/useMouseParallax";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";

type BrandIcon = { slug: string; color: string; label: string };

const STACK_CARDS = [
  {
    title: "Frontend",
    subtitle: "Pixel-perfect UIs",
    accent: "#61DAFB",
    gradFrom: "rgba(97,218,251,0.12)",
    gradTo: "rgba(124,58,237,0.06)",
    icons: [
      { slug: "react", color: "61DAFB", label: "React" },
      { slug: "nextdotjs", color: "ffffff", label: "Next.js" },
      { slug: "typescript", color: "3178C6", label: "TypeScript" },
    ] as BrandIcon[],
  },
  {
    title: "Backend",
    subtitle: "Scalable services",
    accent: "#339933",
    gradFrom: "rgba(51,153,51,0.12)",
    gradTo: "rgba(59,130,246,0.06)",
    icons: [
      { slug: "nodedotjs", color: "339933", label: "Node.js" },
      { slug: "express", color: "ffffff", label: "Express" },
      { slug: "python", color: "3776AB", label: "Python" },
    ] as BrandIcon[],
  },
  {
    title: "APIs & Tools",
    subtitle: "Ship & deploy fast",
    accent: "#FF6C37",
    gradFrom: "rgba(255,108,55,0.12)",
    gradTo: "rgba(124,58,237,0.06)",
    icons: [
      { slug: "postman", color: "FF6C37", label: "Postman" },
      { slug: "vercel", color: "ffffff", label: "Vercel" },
      { slug: "github", color: "ffffff", label: "GitHub" },
    ] as BrandIcon[],
  },
  {
    title: "AI Systems",
    subtitle: "RAG · LLM · Agents",
    accent: "#a78bfa",
    gradFrom: "rgba(167,139,250,0.14)",
    gradTo: "rgba(124,58,237,0.06)",
    icons: [
      { slug: "langchain", color: "1C3C3C", label: "LangChain" },
      { slug: "openai", color: "412991", label: "OpenAI" },
      { slug: "python", color: "3776AB", label: "Python" },
    ] as BrandIcon[],
  },
] as const;

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = usePrefersReducedMotion();
  const parallax = useMouseParallax(sectionRef, !reducedMotion);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 90, damping: 22, mass: 0.3 });
  const smoothY = useSpring(mouseY, { stiffness: 90, damping: 22, mass: 0.3 });

  useEffect(() => {
    mouseX.set(parallax.x);
    mouseY.set(parallax.y);
  }, [parallax.x, parallax.y, mouseX, mouseY]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-x relative flex min-h-dvh flex-col items-center justify-center overflow-hidden pb-28 pt-28 sm:pt-32"
    >
      <HeroAmbient mouseX={smoothX} mouseY={smoothY} />
      <HeroParticles />

      <motion.div
        className="container-site relative z-10 grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-[var(--spacing-bento-gap)]"
        variants={heroEntrance}
        initial="hidden"
        animate="visible"
      >
        {/* Main copy */}
        <motion.div
          variants={heroBlock}
          className="col-span-12 md:col-span-7"
        >
          <GlassCard className="relative overflow-hidden p-6 sm:p-8 md:p-10">
            {/* Card inner glow */}
            <div
              className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/15 blur-[80px]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-secondary/10 blur-[60px]"
              aria-hidden
            />

            <motion.div
              variants={heroContentStagger}
              initial="hidden"
              animate="visible"
              className="relative z-10 flex flex-col gap-7"
            >
              <motion.div variants={heroBlock} className="flex items-center gap-3">
                <motion.span
                  className="h-px bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ delay: 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-primary sm:text-sm">
                  <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-primary shadow-[0_0_8px_#d2bbff]" />
                  Available for projects
                </span>
              </motion.div>

              <motion.div variants={heroBlock}>
                <StaggeredHeadline />
              </motion.div>

              <motion.p
                variants={heroBlock}
                className="max-w-xl text-base leading-relaxed text-text-muted sm:text-lg sm:leading-8"
                style={{ minHeight: "3.5rem" }}
              >
                <TextType
                  as="span"
                  text={[
  "I design and develop end-to-end web applications, from responsive user interfaces to robust backend systems and databases.",
  "Driven by curiosity and continuous learning, I enjoy building products that solve real-world problems and deliver measurable value.",
  "Experienced with the MERN stack, REST APIs, authentication systems, and deploying applications to production environments.",
  "Always exploring new technologies, improving engineering skills, and turning ambitious ideas into working software."
                ]}
                  typingSpeed={38}
                  deletingSpeed={18}
                  pauseDuration={2600}
                  loop
                  showCursor
                  cursorCharacter="|"
                  cursorClassName="text-primary opacity-70"
                  initialDelay={900}
                />
              </motion.p>

              <motion.div
                variants={heroBlock}
                className="flex flex-wrap gap-4 pt-1"
              >
                <MagneticButton href="#work" variant="primary">
                  View Projects
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </MagneticButton>
                <MagneticButton href="#contact" variant="secondary">
                  Get in Touch
                </MagneticButton>
              </motion.div>
            </motion.div>
          </GlassCard>
        </motion.div>

        {/* PixelTransition profile card */}
        <motion.div
          variants={heroBlock}
          transition={{ delay: 0.12 }}
          className="col-span-12 flex justify-center md:col-span-5"
        >
          <PixelTransition
            gridSize={9}
            pixelColor="#7c3aed"
            animationStepDuration={0.4}
            aspectRatio="133%"
            style={{
              width: "100%",
              maxWidth: "340px",
              borderRadius: "24px",
              border: "1px solid rgba(210,187,255,0.15)",
              backgroundColor: "transparent",
              boxShadow: "0 0 40px rgba(124,58,237,0.18)",
            }}
            firstContent={
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  overflow: "hidden",
                  borderRadius: "inherit",
                }}
              >
                <img
                  src={IMAGES.heroOrb}
                  alt="Parth Goyal"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top center",
                    display: "block",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "16px",
                    background: "linear-gradient(to top, rgba(5,5,5,0.85) 0%, transparent 100%)",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-jetbrains), monospace",
                      fontSize: "10px",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: "rgba(210,187,255,0.7)",
                    }}
                  >
                    Hover to reveal ↗
                  </p>
                </div>
              </div>
            }
            secondContent={
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "22px",
                  background:
                    "linear-gradient(145deg, rgba(12,11,11,0.97) 0%, rgba(124,58,237,0.12) 100%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "14px",
                  padding: "28px 24px",
                  textAlign: "center",
                }}
              >
                {/* Mini avatar */}
                <div
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "2px solid rgba(124,58,237,0.7)",
                    boxShadow: "0 0 24px rgba(124,58,237,0.45)",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={IMAGES.heroOrb}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                  />
                </div>

                {/* Name + title */}
                <div>
                  <h3
                    style={{
                      fontFamily: "var(--font-sora), system-ui, sans-serif",
                      fontSize: "clamp(1.15rem,3vw,1.4rem)",
                      fontWeight: 700,
                      color: "#f8fafc",
                      margin: 0,
                    }}
                  >
                    {SITE.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-jetbrains), monospace",
                      fontSize: "12px",
                      color: "#d2bbff",
                      marginTop: "4px",
                    }}
                  >
                    Full Stack Developer
                  </p>
                </div>

                {/* Details */}
                <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                  <p style={{ fontFamily: "monospace", fontSize: "11px", color: "#adc6ff" }}>
                    @draftpunk6996 · MERN Stack
                  </p>
                  <p style={{ fontFamily: "monospace", fontSize: "11px", color: "#94a3b8" }}>
                    B.Tech IT · BVCOE, New Delhi
                  </p>
                  <p style={{ fontFamily: "monospace", fontSize: "11px", color: "#94a3b8" }}>
                    GPA 9.12 / 10 · 2023 – 2027
                  </p>
                </div>

                {/* Skill tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", justifyContent: "center" }}>
                  {["React", "Node.js", "MongoDB", "Next.js", "AI / RAG"].map((t) => (
                    <span
                      key={t}
                      style={{
                        borderRadius: "9999px",
                        border: "1px solid rgba(124,58,237,0.45)",
                        padding: "2px 10px",
                        fontFamily: "monospace",
                        fontSize: "10px",
                        color: "#d2bbff",
                        background: "rgba(124,58,237,0.12)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={() =>
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                  }
                  style={{
                    marginTop: "4px",
                    borderRadius: "9999px",
                    border: "1px solid rgba(124,58,237,0.55)",
                    padding: "8px 22px",
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: "11px",
                    color: "#d2bbff",
                    background: "rgba(124,58,237,0.18)",
                    cursor: "pointer",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Hire Me →
                </button>
              </div>
            }
          />
        </motion.div>

        {/* Stack row */}
        <motion.div
          variants={heroBlock}
          transition={{ delay: 0.2 }}
          className="col-span-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4"
        >
          {STACK_CARDS.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 + index * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reducedMotion ? undefined : { y: -6, scale: 1.03 }}
              className="group"
            >
              <div
                className="relative overflow-hidden rounded-2xl border border-glass-stroke p-4 transition-all duration-300 hover:border-opacity-60 sm:p-5"
                style={{
                  background: `linear-gradient(135deg, ${card.gradFrom} 0%, ${card.gradTo} 100%)`,
                  backdropFilter: "blur(14px)",
                  WebkitBackdropFilter: "blur(14px)",
                  boxShadow: `0 0 0 1px rgba(255,255,255,0.04) inset`,
                }}
              >
                {/* Hover glow blob */}
                <div
                  className="pointer-events-none absolute -top-6 -right-6 h-20 w-20 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
                  style={{ background: card.accent }}
                />

                {/* Title */}
                <p
                  className="font-mono text-[11px] font-semibold uppercase tracking-widest sm:text-xs"
                  style={{ color: card.accent }}
                >
                  {card.title}
                </p>
                <p className="mt-0.5 font-mono text-[10px] text-text-muted sm:text-[11px]">
                  {card.subtitle}
                </p>

                {/* Brand icons row */}
                <div className="mt-3 flex items-center gap-2">
                  {card.icons.map((icon, i) => (
                    <motion.div
                      key={icon.label}
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.1 + index * 0.09 + i * 0.06, duration: 0.4, ease: "backOut" }}
                      title={icon.label}
                      className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/8 bg-surface-container/60 transition-transform duration-200 group-hover:scale-110 sm:h-8 sm:w-8"
                      style={{ transitionDelay: `${i * 40}ms` }}
                    >
                      <img
                        src={`https://cdn.simpleicons.org/${icon.slug}/${icon.color}`}
                        alt={icon.label}
                        className="h-4 w-4 object-contain sm:h-4.5 sm:w-4.5"
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.45 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-muted">
          Scroll
        </span>
        <motion.div
          className="h-14 w-px bg-gradient-to-b from-primary/80 to-transparent"
          animate={reducedMotion ? undefined : { scaleY: [0.6, 1, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

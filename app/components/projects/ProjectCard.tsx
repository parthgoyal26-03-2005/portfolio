"use client";

import Image from "next/image";
import { ArrowUpRight, ExternalLink, Github, Terminal } from "lucide-react";
import type { Project } from "@/app/lib/data";
import { cn } from "@/app/lib/utils";
import { usePrefersReducedMotion } from "@/app/hooks/usePrefersReducedMotion";
import { BrowserChrome } from "@/app/components/projects/BrowserChrome";
import { LiveBadge } from "@/app/components/projects/LiveBadge";
import { TechChip } from "@/app/components/ui/TechChip";

type ProjectCardProps = {
  project: Project;
  className?: string;
};

function useCardGlowHandlers() {
  const reducedMotion = usePrefersReducedMotion();

  return {
    onMouseMove: (e: React.MouseEvent<HTMLElement>) => {
      if (reducedMotion) return;
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      el.style.setProperty(
        "--glow-x",
        `${((e.clientX - rect.left) / rect.width) * 100}%`,
      );
      el.style.setProperty(
        "--glow-y",
        `${((e.clientY - rect.top) / rect.height) * 100}%`,
      );
    },
  };
}

function cardBase(className?: string) {
  return cn(
    "project-card glass-card group relative flex overflow-hidden rounded-2xl border border-glass-stroke outline-none",
    "transition-[transform,box-shadow] duration-500 hover:-translate-y-1",
    "focus-visible:ring-2 focus-visible:ring-primary/50",
    className,
  );
}

function PreviewOverlay({ href, label = "Live Preview" }: { href: string; label?: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-background/50 opacity-0 backdrop-blur-[3px] transition-opacity duration-400 group-hover:pointer-events-auto group-hover:opacity-100">
      <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/15 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-primary shadow-[0_0_24px_rgba(124,58,237,0.3)] backdrop-blur-md">
        {label}
        <ExternalLink className="h-3.5 w-3.5" />
      </span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0"
        aria-label={label}
      />
    </div>
  );
}

function ProjectMeta({ project }: { project: Project }) {
  if (!("year" in project)) return null;
  return (
    <div className="mb-2 flex items-center gap-3">
      <span className="font-mono text-xs text-text-muted">{project.year}</span>
      <span className="h-px max-w-12 flex-1 bg-glass-stroke" />
    </div>
  );
}

/** Featured — large cinematic card with browser chrome */
export function FeaturedProjectCard({ project, className }: ProjectCardProps) {
  const glow = useCardGlowHandlers();
  if (!("image" in project) || !project.image) return null;

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cardBase(cn("h-full min-h-[420px] flex-col", className))}
      {...glow}
    >
      <div className="relative z-10 flex flex-1 flex-col">
        <BrowserChrome
          url={"previewUrl" in project ? project.previewUrl : undefined}
        />

        <div className="relative min-h-[220px] flex-1 overflow-hidden sm:min-h-[280px]">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="project-image-zoom object-cover opacity-55"
            sizes="(max-width: 768px) 100vw, 66vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/25 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <PreviewOverlay href={project.href} />
        </div>

        <div className="relative z-10 space-y-5 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <TechChip key={tag} variant="secondary">
                  {tag}
                </TechChip>
              ))}
            </div>
            {"status" in project && <LiveBadge status={project.status} />}
          </div>

          <div>
            <ProjectMeta project={project} />
            <h3 className="font-[family-name:var(--font-sora)] text-2xl font-bold tracking-tight text-on-surface sm:text-3xl lg:text-[2rem] lg:leading-tight">
              {project.title}
            </h3>
            <p className="mt-3 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg sm:leading-8">
              {project.description}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 font-mono text-sm text-primary transition-colors group-hover:text-secondary">
              Open project
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
            {"github" in project && project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label="View source on GitHub"
                className="relative z-30 flex items-center gap-1.5 rounded-lg border border-glass-stroke px-3 py-1.5 font-mono text-xs text-text-muted transition-all duration-200 hover:border-primary/40 hover:text-primary"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}

/** Tall vertical card */
export function TallProjectCard({ project, className }: ProjectCardProps) {
  const glow = useCardGlowHandlers();
  if (!("image" in project) || !project.image) return null;

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cardBase(cn("h-full min-h-[440px] flex-col", className))}
      {...glow}
    >
      <div className="relative z-10 flex min-h-0 flex-1 flex-col">
        <div className="relative min-h-[220px] flex-1 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="project-image-zoom object-cover opacity-50"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/35 to-transparent" />
          <PreviewOverlay href={project.href} />
          <div className="absolute top-4 left-4 z-20">
            {"status" in project && <LiveBadge status={project.status} />}
          </div>
        </div>

        <div className="space-y-4 p-6 sm:p-8">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] uppercase tracking-wider text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
          <h3 className="font-[family-name:var(--font-sora)] text-xl font-bold tracking-tight text-on-surface sm:text-2xl">
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed text-text-muted sm:text-base sm:leading-7">
            {project.description}
          </p>
          <div className="flex items-center justify-between border-t border-glass-stroke pt-5">
            <span className="font-mono text-xs text-text-muted">
              {"year" in project ? project.year : ""}
            </span>
            <div className="flex items-center gap-2">
              {"github" in project && project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="View source on GitHub"
                  className="relative z-30 flex items-center gap-1 rounded-md border border-glass-stroke px-2.5 py-1 font-mono text-[10px] text-text-muted transition-all hover:border-primary/40 hover:text-primary"
                >
                  <Github className="h-3 w-3" />
                  Code
                </a>
              )}
              <ArrowUpRight className="h-5 w-5 text-primary transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

/** Wide card with inline preview */
export function WideProjectCard({ project, className }: ProjectCardProps) {
  const glow = useCardGlowHandlers();
  if (!("image" in project) || !project.image) return null;

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cardBase(cn("h-full min-h-70 flex-col p-6 sm:p-8", className))}
      {...glow}
    >
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-secondary">
              {project.tags[0]}
            </span>
            <h3 className="mt-2 font-[family-name:var(--font-sora)] text-xl font-bold tracking-tight text-on-surface sm:text-2xl">
              {project.title}
            </h3>
          </div>
          {"status" in project && (
            <LiveBadge status={project.status} className="shrink-0" />
          )}
        </div>

        <div className="relative mb-6 aspect-video overflow-hidden rounded-xl border border-glass-stroke">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="project-image-zoom object-cover opacity-55"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
          <PreviewOverlay href={project.href} label="Live Preview" />
        </div>

        <p className="text-sm leading-relaxed text-text-muted sm:text-base sm:leading-7">
          {project.description}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Explore project
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
          {"github" in project && project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label="View source on GitHub"
              className="relative z-30 flex items-center gap-1.5 rounded-md border border-glass-stroke px-2.5 py-1 font-mono text-[10px] text-text-muted transition-all hover:border-primary/40 hover:text-primary"
            >
              <Github className="h-3 w-3" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </a>
  );
}

/** CTA / repository card */
export function CtaProjectCard({ project, className }: ProjectCardProps) {
  const glow = useCardGlowHandlers();

  return (
    <div
      className={cardBase(
        cn(
          "min-h-[320px] items-center justify-center bg-gradient-to-br from-[#0f172a] via-surface-container-low to-background p-8 sm:min-h-[360px] sm:p-12",
          className,
        ),
      )}
      {...glow}
    >
      <span className="pointer-events-none absolute top-0 right-0 p-4 font-mono text-[72px] leading-none text-primary/[0.07] sm:text-[110px]">
        {"{}"}
      </span>
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at var(--glow-x,50%) var(--glow-y,50%), rgba(124,58,237,0.14), transparent 55%)",
        }}
      />

      <div className="relative z-10 text-center">
        <div className="mb-6 inline-flex rounded-2xl border border-primary/25 bg-primary/10 p-5 shadow-[0_0_32px_rgba(124,58,237,0.2)] transition-transform duration-500 group-hover:scale-105">
          <Terminal className="h-10 w-10 text-primary sm:h-12 sm:w-12" />
        </div>
        {"status" in project && (
          <div className="mb-4 flex justify-center">
            <LiveBadge status={project.status} />
          </div>
        )}
        <h3 className="font-[family-name:var(--font-sora)] text-2xl font-bold tracking-tight text-on-surface sm:text-3xl">
          {project.title}
        </h3>
        <p className="mx-auto mt-3 mb-8 max-w-sm text-sm leading-relaxed text-text-muted sm:text-base sm:leading-7">
          {project.description}
        </p>
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-primary/50 px-8 py-3 font-mono text-sm uppercase tracking-wider text-primary transition-all duration-300 hover:bg-primary/10 hover:shadow-[0_0_24px_rgba(124,58,237,0.25)]"
        >
          View Repository
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from "lucide-react";
import { PROJECTS } from "@/app/lib/data";

export function ProjectSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    sliderRef.current?.scrollBy({
      left: (sliderRef.current.clientWidth * 0.82) * (direction === "left" ? -1 : 1),
      behavior: "smooth",
    });
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between gap-4">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-text-muted">
          Scroll to explore
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Show previous projects"
            className="grid h-10 w-10 place-items-center rounded-full border border-glass-stroke text-on-surface transition-colors hover:border-primary/50 hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Show next projects"
            className="grid h-10 w-10 place-items-center rounded-full border border-glass-stroke text-on-surface transition-colors hover:border-primary/50 hover:text-primary"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={sliderRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {PROJECTS.map((project) => (
          <article
            key={project.id}
            className="flex w-[86vw] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-glass-stroke bg-surface-container-lowest sm:w-[68vw] lg:w-[48rem]"
          >
            <div className="relative aspect-[16/8] overflow-hidden border-b border-glass-stroke bg-surface-container">
              <Image
                src={project.image}
                alt={`${project.title} project preview`}
                fill
                sizes="(max-width: 640px) 86vw, (max-width: 1024px) 68vw, 48rem"
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-text-muted">{project.year}</p>
                  <h3 className="mt-2 font-display text-2xl font-semibold text-on-surface sm:text-3xl">
                    {project.title}
                  </h3>
                </div>
                <span className="shrink-0 rounded-full border border-primary/25 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-primary">
                  {project.status}
                </span>
              </div>

              <p className="mt-4 text-sm leading-7 text-text-muted sm:text-base">
                {project.description}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-glass-stroke px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-on-surface-variant"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex items-center gap-4">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-sm text-primary transition-colors hover:text-secondary"
                >
                  View project <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} source on GitHub`}
                  className="inline-flex items-center gap-2 font-mono text-sm text-text-muted transition-colors hover:text-on-surface"
                >
                  <Github className="h-4 w-4" /> Source
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

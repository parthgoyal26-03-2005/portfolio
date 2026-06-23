"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Award, Code2, Terminal } from "lucide-react";
import { MOTION_VIEWPORT } from "@/app/lib/constants";
import { bentoCardReveal, bentoStagger } from "@/app/lib/motion";
import { Section } from "@/app/components/layout/Section";
import { SectionHeader } from "@/app/components/ui/SectionHeader";
import { GlassCard } from "@/app/components/ui/GlassCard";
import { AnimatedNumber } from "@/app/components/ui/AnimatedNumber";
import { CircularProgress } from "@/app/components/ui/CircularProgress";

const MERN_CHIPS = ["MONGODB", "EXPRESS", "REACT", "NODE.JS"] as const;

type GitHubStats = {
  repos: number;
  followers: number;
  contributions: number;
  byYear?: { year: number; count: number }[];
};
type LeetCodeStats = {
  solved: number;
  total: number;
  easy: number;
  medium: number;
  hard: number;
  ranking: number;
};

function useGitHubStats() {
  const [data, setData] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/github-stats")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);
  return { data, loading };
}

function useLeetCodeStats() {
  const [data, setData] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/leetcode-stats")
      .then((r) => r.json())
      .then((d) => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);
  return { data, loading };
}

/* Counts up immediately when value is set — no IntersectionObserver, so
   async data that arrives while the section is already visible works correctly. */
function ContribCounter({ value }: { value: number }) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const span = spanRef.current;
    if (!span || !value) return;
    const startTime = performance.now();
    const duration = 2000;
    const tick = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      span.textContent = Math.round(eased * value).toLocaleString();
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [value]);

  return <span ref={spanRef}>0</span>;
}

function AnimatedBar({
  value,
  max,
  delay = 0,
}: {
  value: number;
  max: number;
  delay?: number;
}) {
  const width = max > 0 ? `${Math.min((value / max) * 100, 100)}%` : "0%";
  return (
    <div className="h-1 overflow-hidden rounded-full bg-surface-container">
      <motion.div
        className="h-full bg-primary"
        initial={{ width: 0 }}
        whileInView={{ width }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-lg bg-surface-container ${className ?? ""}`} />
  );
}

export function AboutSection() {
  const { data: gh, loading: ghLoading } = useGitHubStats();
  const { data: lc, loading: lcLoading } = useLeetCodeStats();

  return (
    <>
      <Section id="about" ambient="purple">
        <div className="space-y-8 md:space-y-10">
          <SectionHeader
            eyebrow="Milestones & contributions"
            title="Technical Prowess"
            className="mb-0! md:mb-2!"
          />

          <motion.div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-2 md:gap-5"
            variants={bentoStagger}
            initial="hidden"
            whileInView="visible"
            viewport={MOTION_VIEWPORT}
          >
            {/* ── GitHub Activity (left large, 2-row) ── */}
            <motion.div
              variants={bentoCardReveal}
              className="flex flex-col sm:col-span-2 md:col-span-2 md:row-span-2"
            >
              <GlassCard
                hover
                padding="md"
                className="flex h-full flex-col gap-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <Terminal className="h-9 w-9 text-on-surface sm:h-10 sm:w-10" />
                    <span className="rounded-full bg-primary/10 px-3 py-1 font-mono-label text-primary">
                      Active
                    </span>
                  </div>
                  <h4 className="font-display text-xl font-semibold sm:text-2xl">
                    GitHub Activity
                  </h4>

                  {ghLoading ? (
                    <div className="space-y-2">
                      <SkeletonBlock className="h-12 w-3/4" />
                      <SkeletonBlock className="h-4 w-1/2" />
                    </div>
                  ) : (
                    <div>
                      <p className="font-display text-4xl font-bold text-primary sm:text-5xl">
                        <ContribCounter value={gh?.contributions ?? 0} />
                      </p>
                      <p className="mt-1 font-mono text-sm text-text-muted">
                        total contributions
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {ghLoading ? (
                    <>
                      <SkeletonBlock className="h-4 w-1/3" />
                      <SkeletonBlock className="h-5" />
                      <SkeletonBlock className="h-5" />
                      <SkeletonBlock className="h-5" />
                      <SkeletonBlock className="h-5 mt-2" />
                      <SkeletonBlock className="h-5" />
                    </>
                  ) : (
                    <>
                      {/* Year-by-year contribution bars */}
                      {gh?.byYear && gh.byYear.length > 0 && (() => {
                        const maxCount = Math.max(...gh.byYear!.map((y) => y.count));
                        return (
                          <div className="space-y-2">
                            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
                              Yearly Activity
                            </p>
                            {gh.byYear!.map(({ year, count }) => (
                              <div key={year} className="space-y-1">
                                <div className="flex justify-between font-mono text-[11px] text-text-muted">
                                  <span>{year}</span>
                                  <span className="text-primary">{count}</span>
                                </div>
                                <AnimatedBar value={count} max={maxCount} delay={0.3} />
                              </div>
                            ))}
                          </div>
                        );
                      })()}

                      <div className="light-streak opacity-20 my-1" />

                      {/* Repo / Follower stats */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-xs text-text-muted">
                          <span>Public Repos</span>
                          <span className="text-primary">{gh?.repos ?? 0}</span>
                        </div>
                        <AnimatedBar value={gh?.repos ?? 0} max={80} delay={0.5} />
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between font-mono text-xs text-text-muted">
                          <span>Followers</span>
                          <span className="text-on-surface">{gh?.followers ?? 0}</span>
                        </div>
                        <AnimatedBar value={gh?.followers ?? 0} max={200} delay={0.65} />
                      </div>
                    </>
                  )}
                </div>
              </GlassCard>
            </motion.div>

            {/* ── LeetCode — circular progress (top right) ── */}
            <motion.div
              variants={bentoCardReveal}
              className="sm:col-span-2 md:col-span-2"
            >
              <GlassCard
                hover
                padding="md"
                className="flex h-full flex-col gap-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono-label text-secondary">LeetCode</span>
                    <h4 className="mt-0.5 font-display text-xl font-semibold sm:text-2xl">
                      Problem Solving
                    </h4>
                  </div>
                  <Code2 className="h-8 w-8 text-secondary" />
                </div>

                <div className="flex flex-1 flex-col items-center justify-center gap-4">
                  {lcLoading ? (
                    <div className="h-[150px] w-[150px] animate-pulse rounded-full bg-surface-container" />
                  ) : (
                    <CircularProgress
                      value={lc?.solved ?? 0}
                      max={lc?.total ?? 3500}
                      size={150}
                      strokeWidth={12}
                      centerLabel="solved"
                      centerSublabel={`/ ${(lc?.total ?? 3500).toLocaleString()}`}
                    />
                  )}

                  {/* Difficulty breakdown */}
                  {!lcLoading && (
                    <div className="flex w-full gap-2">
                      {(
                        [
                          { label: "Easy", value: lc?.easy ?? 0, color: "text-emerald-400" },
                          { label: "Medium", value: lc?.medium ?? 0, color: "text-amber-400" },
                          { label: "Hard", value: lc?.hard ?? 0, color: "text-rose-400" },
                        ] as const
                      ).map(({ label, value, color }) => (
                        <div
                          key={label}
                          className="flex flex-1 flex-col items-center rounded-lg border border-glass-stroke bg-surface-container/50 py-2"
                        >
                          <span className={`font-mono text-[10px] ${color}`}>
                            {label}
                          </span>
                          <span className="font-mono text-sm font-semibold text-on-surface">
                            {value}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Global ranking */}
                  {!lcLoading && lc && lc.ranking > 0 && (
                    <div className="flex w-full items-center justify-between rounded-lg border border-primary/20 bg-primary/5 px-3 py-2">
                      <span className="font-mono text-xs text-text-muted">
                        Global Ranking
                      </span>
                      <span className="font-mono text-sm font-semibold text-primary">
                        #{lc.ranking.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </GlassCard>
            </motion.div>

            {/* ── Awwwards (bottom right, left half) ── */}
            <motion.div variants={bentoCardReveal}>
              <GlassCard
                hover
                padding="md"
                className="flex h-full flex-col justify-between gap-2 py-3"
              >
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 flex-shrink-0 text-on-tertiary-container" />
                  <div>
                    <h4 className="font-display text-base font-semibold leading-tight">
                      Awwwards
                    </h4>
                    <p className="font-mono text-[10px] text-text-muted">Developer Choice</p>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* ── MERN Focus (bottom right, right half) ── */}
            <motion.div variants={bentoCardReveal}>
              <GlassCard
                hover
                padding="md"
                className="flex h-full flex-col justify-between gap-2 py-3 bg-linear-to-br from-primary/10 to-transparent"
              >
                <span className="font-mono-label text-[9px] text-primary">MERN Focus</span>
                <div className="flex flex-wrap gap-1">
                  {MERN_CHIPS.map((chip) => (
                    <span
                      key={chip}
                      className="rounded border border-glass-stroke px-1.5 py-0.5 font-mono text-[9px]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        </div>
      </Section>
    </>
  );
}

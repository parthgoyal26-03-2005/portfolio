/** Shared Tailwind class compositions for visual consistency */
export const styles = {
  section: "section-x section-y relative",
  container: "container-site relative z-10",
  fontDisplay: "font-display",
  fontMono: "font-mono-label",
  headingSection:
    "font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl lg:text-6xl",
  headingCard: "font-display text-xl font-bold tracking-tight text-text-primary sm:text-2xl",
  bodyDefault: "text-base leading-relaxed text-text-muted sm:text-lg sm:leading-8",
  cardBase: "glass-card rounded-2xl border border-glass-stroke",
  cardHover:
    "transition-[transform,box-shadow,border-color] duration-500 hover:-translate-y-0.5 neon-border-hover",
} as const;

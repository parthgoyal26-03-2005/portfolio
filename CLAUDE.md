# Portfolio — CLAUDE.md

## Project Overview

Cinematic developer portfolio for **Parth Goyal** (MERN stack / full-stack developer, IT student at BVCOE, New Delhi). Built with a dark "Aetheric Flux" design language: glassmorphism cards, neon-purple/blue palette, and Framer Motion scroll animations.

---

## Tech Stack

| Layer | Library / Version |
|---|---|
| Framework | Next.js 16.2.6 (App Router, Turbopack) |
| UI Runtime | React 19.2.4 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 (`@theme inline` API — no `tailwind.config.js`) |
| Animations | Framer Motion 12.38.0 (primary) |
| Scroll | `@studio-freight/lenis` 1.0.42 (installed, not yet wired up) |
| 3D | Three.js + `@react-three/fiber` + `@react-three/drei` (installed, not yet used) |
| Motion extras | GSAP 3.15.0 (installed, not yet used) |
| Icons | Lucide React |
| Fonts | Sora (display), Inter (body), JetBrains Mono (code) — Next.js Google Fonts |

---

## Commands

```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint
```

---

## Folder Structure

```
app/
├── components/
│   ├── animations/     # FadeIn.tsx, Stagger.tsx — generic animation wrappers
│   ├── effects/        # AtmosphericGlow.tsx — fixed full-page ambient orbs
│   ├── hero/           # HeroAmbient, HeroOrb, HeroParticles, MagneticButton, StaggeredHeadline
│   ├── layout/         # Navbar, Footer, Section, SectionAmbient, SectionCTA
│   ├── projects/       # ProjectCard (4 variants), ProjectBentoGrid, BrowserChrome, LiveBadge
│   ├── sections/       # HeroSection, AboutSection, WorkSection, ExperienceSection, ContactSection
│   └── ui/             # GlassCard, Button, FormField, SectionHeader, TechChip
├── hooks/
│   ├── useActiveSection.ts      # IntersectionObserver — highlights active nav link
│   ├── useMouseParallax.ts      # rAF-throttled normalized [-1,1] mouse position
│   └── usePrefersReducedMotion.ts
├── lib/
│   ├── data.ts          # SINGLE SOURCE OF TRUTH — all content lives here
│   ├── motion.ts        # Framer Motion variant presets (bentoStagger, bentoCardReveal, etc.)
│   ├── constants.ts     # MOTION_VIEWPORT, SECTION_GAP, BENTO_GAP
│   ├── styles.ts        # Shared style string helpers
│   └── utils.ts         # cn() (clsx/twMerge helper)
├── globals.css          # Tailwind v4 @theme, custom utilities, CSS component classes
├── layout.tsx           # Root layout — fonts, metadata, html/body wrapper
└── page.tsx             # Home page — assembles sections
```

---

## Architecture Patterns

### Content — edit `app/lib/data.ts` only
All text, links, projects, experience entries, and skill chips are defined as `as const` exports in `data.ts`. **Never hardcode content in component files.**

Key exports: `SITE`, `NAV_LINKS`, `SOCIAL_LINKS`, `HERO_STACK`, `CORE_STACK`, `SKILL_CHIPS`, `EXPERIENCE`, `PROJECTS`, `IMAGES`.

### Animations — use presets from `app/lib/motion.ts`
The canonical animation pair for new sections:
```tsx
variants={bentoStagger}   // parent container
variants={bentoCardReveal} // each card child
```
`staggerContainer` and `staggerItem` are marked `@deprecated` — do not use for new work.

Always pair `whileInView` with `viewport={MOTION_VIEWPORT}` from `app/lib/constants.ts`:
```tsx
whileInView="visible"
viewport={MOTION_VIEWPORT}  // { once: true, margin: "-10%" }
```

### Design System — `GlassCard` is the foundational primitive
```tsx
<GlassCard hover padding="md" rounded="2xl">
```
Props: `hover` (adds neon border on hover), `padding` (`none` | `sm` | `md` | `lg`), `rounded` (`xl` | `2xl` | `3xl`).

### CSS — Tailwind v4 custom tokens
Design tokens are defined in `globals.css` under `@theme inline`. Reference them as Tailwind classes:
- Colors: `text-primary`, `bg-secondary`, `border-glass-stroke`, `text-text-muted`, etc.
- Fonts: `font-display` (Sora), `font-mono` (JetBrains), `font-body` (Inter)
- Layout utilities: `section-x`, `section-y`, `container-site`
- CSS classes: `.glass-card`, `.gradient-text`, `.neon-border-hover`, `.grid-dots`

### Accessibility — always respect reduced motion
```tsx
const reducedMotion = usePrefersReducedMotion();
animate={reducedMotion ? undefined : { ... }}
```

---

## Known Issues / Areas for Improvement

### Critical
1. **`HeroSection` is not rendered** — `app/page.tsx` renders `AboutSection`, `WorkSection`, `ExperienceSection` but is missing `<HeroSection />`. The component exists at `app/components/sections/HeroSection.tsx` and is fully built.
2. **Contact form has no backend** — `onSubmit={(e) => e.preventDefault()}` is a stub. Needs an API route or a service like Resend / EmailJS.

### Content / Data
3. **Project links all point to GitHub profile root** — Every `PROJECTS[n].href` is `https://github.com/parthgoyal26-03-2005` instead of the specific repo URL.
4. **Project images are placeholder SVGs** — `/window.svg`, `/globe.svg`, `/file.svg` should be replaced with real screenshots.
5. **Download CV button is `href="#"`** — Non-functional; needs a real PDF URL in `public/`.
6. **GitHub stats are hardcoded** — "1,200+ contributions", "42 repos", "Awwwards Developer Choice" appear aspirational/placeholder.

### Unused Dependencies (bundle weight)
7. **Three.js / R3F / Drei** — Installed but zero usage in any component.
8. **GSAP** — Installed but zero usage; Framer Motion handles all animations.
9. **Lenis** — Installed but not initialized anywhere; smooth scroll is not active.

### Missing
10. **Open Graph / Twitter meta** — No `og:image`, `twitter:card`, or `metadataBase` in `layout.tsx`.
11. **`ContactSection` is inside `Footer`** — Architecturally awkward; `#contact` anchor works but the section is not a true page section in `<main>`.
12. **Deprecated motion variants still used** — `staggerItem` (deprecated) is still called in `HeroSection.tsx`.

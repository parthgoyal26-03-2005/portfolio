"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NAV_LINKS, SITE } from "@/app/lib/data";
import { useActiveSection } from "@/app/hooks/useActiveSection";
import { cn } from "@/app/lib/utils";
import { Button } from "@/app/components/ui/Button";
import GooeyNav from "@/components/GooeyNav";
import FlowingMenu from "@/components/FlowingMenu";

const MOBILE_NAV_ITEMS = [
  { text: "Work",       link: "#work",       image: "/homepageui.png" },
  { text: "Experience", link: "#experience", image: "/melody.png" },
  { text: "About",      link: "#about",      image: "/planora.png" },
  { text: "Contact",    link: "#contact",    image: "/homepageui.png" },
];

export function Navbar() {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="fixed top-3 left-1/2 z-50 w-[min(calc(100%-1.5rem),90rem)] -translate-x-1/2 sm:top-4"
      >
        <nav
          className={cn(
            "flex items-center justify-between gap-3 rounded-full border border-white/8 px-4 py-2.5 backdrop-blur-md transition-all duration-300 sm:gap-4 sm:px-6 sm:py-3 md:px-8",
            scrolled
              ? "bg-[#0e0e10]/90 shadow-[0_1px_0_rgba(255,255,255,0.06),0_8px_32px_rgba(0,0,0,0.4)]"
              : "bg-[#0e0e10]/70 shadow-[0_1px_0_rgba(255,255,255,0.04)]",
          )}
        >
          <a
            href="#hero"
            className="font-display text-base font-bold tracking-tighter text-on-surface sm:text-lg md:text-xl"
          >
            {SITE.name}
          </a>

          <div className="hidden md:flex items-center">
            <GooeyNav
              items={NAV_LINKS.map((l) => ({ label: l.label, href: l.href }))}
              animationTime={600}
              particleCount={12}
              particleDistances={[80, 8]}
              particleR={80}
              timeVariance={300}
              colors={[1, 2, 3, 4]}
              initialActiveIndex={Math.max(
                0,
                NAV_LINKS.findIndex((l) => l.href === `#${active}`),
              )}
              controlledIndex={Math.max(
                0,
                NAV_LINKS.findIndex((l) => l.href === `#${active}`),
              )}
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              href="#contact"
              variant="nav"
              className="hidden !px-5 !py-2 !text-xs sm:!inline-flex sm:!text-sm"
            >
              Connect
            </Button>
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-glass-stroke text-on-surface transition-colors hover:bg-surface-container md:hidden"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Close button */}
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-glass-stroke bg-surface-container text-on-surface"
            >
              <X className="h-4 w-4" />
            </button>

            {/* FlowingMenu — clicking any link closes the menu via bubbling */}
            <div className="h-full" onClick={() => setMobileOpen(false)}>
              <FlowingMenu
                items={MOBILE_NAV_ITEMS}
                textColor="#d2bbff"
                bgColor="#080707"
                marqueeBgColor="rgba(124,58,237,0.92)"
                marqueeTextColor="#ede0ff"
                borderColor="rgba(210,187,255,0.14)"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

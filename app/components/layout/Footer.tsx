import { SITE, SOCIAL_LINKS } from "@/app/lib/data";
import { FadeIn } from "@/app/components/animations/FadeIn";
import { ContactSection } from "@/app/components/sections/ContactSection";

export function Footer() {
  return (
    <FadeIn>
      <footer className="section-x mt-8 border-t border-glass-stroke bg-surface-container-lowest py-10 sm:py-12">
        <ContactSection />

        <div className="container-site flex flex-col items-center justify-between gap-6 md:flex-row md:gap-8">
          <div className="font-display text-lg font-semibold text-primary sm:text-xl">
            {SITE.name}
          </div>
          <p className="text-center font-mono text-xs text-text-muted sm:text-sm">
            © {SITE.year} Digital Craftsman • Built with Next.js
          </p>
          <div className="flex flex-wrap justify-center gap-5 sm:gap-6">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-text-muted transition-colors duration-200 hover:text-primary sm:text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </FadeIn>
  );
}

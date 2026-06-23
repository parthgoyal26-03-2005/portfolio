import { AtmosphericGlow } from "@/app/components/effects/AtmosphericGlow";
import { Footer } from "@/app/components/layout/Footer";
import { Navbar } from "@/app/components/layout/Navbar";
import { HeroSection } from "@/app/components/sections/HeroSection";
import { AboutSection } from "@/app/components/sections/AboutSection";
import { ExperienceSection } from "@/app/components/sections/ExperienceSection";
import { WorkSection } from "@/app/components/sections/WorkSection";

export default function Home() {
  return (
    <>
      <AtmosphericGlow />
      <Navbar />
      <main className="relative overflow-x-hidden">
        <HeroSection />
        <WorkSection />
        <ExperienceSection />
        <AboutSection />
      </main>

      <Footer />
    </>
  );
}

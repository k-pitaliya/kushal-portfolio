"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import Preloader from "@/components/layout/Preloader";
import CustomCursor from "@/components/layout/CustomCursor";
import Spotlight from "@/components/ui/Spotlight";
import CommandPalette from "@/components/ui/CommandPalette";
import KonamiEaster from "@/components/ui/KonamiEaster";
import SoundToggle from "@/components/ui/SoundToggle";
import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/ui/ScrollProgress";
import MarqueeDivider from "@/components/ui/MarqueeDivider";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Certifications from "@/components/sections/Certifications";
import Blog from "@/components/sections/Blog";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  useSmoothScroll();

  return (
    <>
      {/* Skip to content — accessibility */}
      <a href="#about" className="skip-to-content">
        Skip to content
      </a>

      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <CustomCursor />
      <Spotlight />
      <CommandPalette />
      <KonamiEaster />
      <SoundToggle />
      <ScrollProgress />
      <Navbar />

      <main id="main-content">
        <Hero />
        <MarqueeDivider text="ABOUT" />
        <About />
        <MarqueeDivider text="SKILLS & TECHNOLOGIES" />
        <Skills />
        <MarqueeDivider text="SELECTED WORK" />
        <Projects />
        <MarqueeDivider text="EXPERIENCE" />
        <Experience />
        <MarqueeDivider text="EDUCATION" />
        <Education />
        <MarqueeDivider text="CERTIFICATIONS" />
        <Certifications />
        <MarqueeDivider text="WRITING" />
        <Blog />
        <MarqueeDivider text="TESTIMONIALS" />
        <Testimonials />
        <MarqueeDivider text="GET IN TOUCH" />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

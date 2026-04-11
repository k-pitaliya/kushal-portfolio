"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import Preloader from "@/components/layout/Preloader";
import CustomCursor from "@/components/layout/CustomCursor";
import CursorTrail from "@/components/ui/CursorTrail";
import Spotlight from "@/components/ui/Spotlight";
import CommandPalette from "@/components/ui/CommandPalette";
import KonamiEaster from "@/components/ui/KonamiEaster";
import SoundToggle from "@/components/ui/SoundToggle";
import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/ui/ScrollProgress";
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
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <CustomCursor />
      <CursorTrail />
      <Spotlight />
      <CommandPalette />
      <KonamiEaster />
      <SoundToggle />
      <ScrollProgress />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Blog />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

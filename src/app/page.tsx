"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import Preloader from "@/components/layout/Preloader";
import CommandPalette from "@/components/ui/CommandPalette";
import Navbar from "@/components/layout/Navbar";
import ScrollProgress from "@/components/ui/ScrollProgress";
import FloatingCTA from "@/components/ui/FloatingCTA";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import SignalPath from "@/components/ui/SignalPath";

import Hero from "@/components/sections/Hero";
import CredibilityStrip from "@/components/ui/CredibilityStrip";
import NowPanel from "@/components/sections/NowPanel";
import Projects from "@/components/sections/Projects";
import StackAndApproach from "@/components/sections/StackAndApproach";
import Background from "@/components/sections/Background";
import Writeups from "@/components/sections/Writeups";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  useSmoothScroll();

  return (
    <>
      <a href="#projects" className="skip-to-content">
        Skip to content
      </a>

      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <CommandPalette />
      <ScrollProgress />
      <FloatingCTA />
      <Navbar />

      {/* Background signature: animated SVG signal path weaving through sections */}
      <SignalPath />

      <main
        id="main-content"
        className="relative"
        aria-label="Kushal Pitaliya — VLSI Design Verification Engineer Portfolio"
      >
        <ErrorBoundary>
          <Hero loaded={!isLoading} />
        </ErrorBoundary>
        <ErrorBoundary>
          <CredibilityStrip />
        </ErrorBoundary>
        <ErrorBoundary>
          <NowPanel />
        </ErrorBoundary>
        <ErrorBoundary>
          <Projects />
        </ErrorBoundary>
        <ErrorBoundary>
          <StackAndApproach />
        </ErrorBoundary>
        <ErrorBoundary>
          <Background />
        </ErrorBoundary>
        <ErrorBoundary>
          <Writeups />
        </ErrorBoundary>
        <ErrorBoundary>
          <About />
        </ErrorBoundary>
        <ErrorBoundary>
          <Contact />
        </ErrorBoundary>
      </main>

      <Footer />
    </>
  );
}

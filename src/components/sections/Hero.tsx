"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, FolderOpen, ArrowDown } from "lucide-react";
import ResumePreviewModal from "@/components/ui/ResumePreviewModal";

/**
 * Hero — v2.
 *
 * Surgical minimum: name, role, one positioning sentence, a live "now"
 * indicator, two CTAs. No 3D scene, no typewriter, no floating badges.
 *
 * Background: subtle animated dot grid (GPU-cheap, on-brand for engineering).
 * Foreground: massive name in Geist variable weight, with gentle scroll-fade.
 */

interface HeroProps {
  loaded?: boolean;
}

export default function Hero({ loaded = true }: HeroProps) {
  const [resumeOpen, setResumeOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(() => setReady(true), 120);
    return () => clearTimeout(t);
  }, [loaded]);

  // Subtle parallax — content fades and shrinks slightly on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6"
    >
      {/* Subtle animated dot grid background */}
      <div aria-hidden="true" className="absolute inset-0 grid-bg" />
      <div aria-hidden="true" className="grid-bg-fade" />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8 text-center"
      >
        {/* Availability label */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-3"
        >
          <span className="h-px w-8 bg-accent/60" aria-hidden="true" />
          <span className="text-mono-xs text-accent">
            Open to VLSI / Design Verification roles
          </span>
          <span className="h-px w-8 bg-accent/60" aria-hidden="true" />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-display-xl text-text"
          style={{
            fontWeight: 800,
            background: "linear-gradient(180deg, var(--color-text) 0%, var(--color-text-muted) 130%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Kushal Pitaliya
        </motion.h1>

        {/* Role + tagline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-3"
        >
          <p className="text-display-md text-accent">
            Design Verification Engineer
          </p>
          <p className="mx-auto max-w-2xl text-body-lg text-text-muted">
            I find bugs in silicon before silicon finds them in production.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-4 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-bg shadow-[0_0_40px_rgba(0,191,255,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-dark hover:shadow-[0_0_50px_rgba(0,191,255,0.3)]"
          >
            <FolderOpen className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
            View Selected Work
          </a>

          <button
            type="button"
            onClick={() => setResumeOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={resumeOpen}
            className="group inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-7 py-3 text-sm font-semibold text-text backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
          >
            <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            Resume
            <span className="hidden text-mono-xs text-text-dim sm:inline">
              ⌘R
            </span>
          </button>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 sm:-bottom-24"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-text-dim"
          >
            <span className="text-mono-xs">scroll</span>
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </motion.div>
        </motion.div>
      </motion.div>

      <ResumePreviewModal
        open={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </section>
  );
}

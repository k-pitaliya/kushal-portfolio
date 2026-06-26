"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Download, FolderOpen, ArrowDown } from "lucide-react";
import ResumePreviewModal from "@/components/ui/ResumePreviewModal";
import Magnetic from "@/components/ui/Magnetic";
import { cn } from "@/lib/utils";

/**
 * Hero — the signature moment.
 *
 * The name resolves char-by-char out of a clip mask in Fraunces (surname in
 * animated aurora), CTAs are magnetic, and the whole thing reveals on an
 * orchestrated timeline off the `ready` flag (hydration-safe — no useScroll on
 * content). The aurora behind it reacts to the pointer (AuroraBackground).
 */

const FIRST = "Kushal";
const LAST = "Pitaliya";

function Masked({
  text,
  ready,
  base,
  accent,
  reduce,
}: {
  text: string;
  ready: boolean;
  base: number;
  accent?: boolean;
  reduce: boolean;
}) {
  if (reduce) return <span className={accent ? "aurora-text" : undefined}>{text}</span>;
  return (
    <span className={cn("inline-block whitespace-nowrap", accent && "aurora-text")}>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden"
          style={{ paddingBottom: "0.16em", marginBottom: "-0.16em" }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "115%" }}
            animate={ready ? { y: "0%" } : { y: "115%" }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: base + i * 0.045 }}
          >
            {ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function Hero({ loaded = true }: { loaded?: boolean }) {
  const reduce = useReducedMotion() ?? false;
  const [resumeOpen, setResumeOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(() => setReady(true), 120);
    return () => clearTimeout(t);
  }, [loaded]);

  const show = (y: number) => (ready ? { opacity: 1, y: 0 } : { opacity: 0, y });

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6"
    >
      <div aria-hidden className="absolute inset-0 grid-bg opacity-60" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center gap-7 text-center">
        {/* availability chip */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={show(8)}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="glass glass-edge flex items-center gap-2.5 rounded-full px-4 py-1.5"
        >
          <span className="live-dot" aria-hidden />
          <span className="text-mono-xs text-text-muted">
            Open to VLSI / Design Verification roles
          </span>
        </motion.div>

        {/* name — char-by-char mask reveal */}
        <h1 className="text-display-xl text-text" aria-label="Kushal Pitaliya">
          <Masked text={FIRST} ready={ready} base={0.2} reduce={reduce} />{" "}
          <Masked text={LAST} ready={ready} base={0.5} accent reduce={reduce} />
        </h1>

        {/* role + tagline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={show(16)}
          transition={{ duration: 0.6, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <p className="text-display-md text-text-muted">Design Verification Engineer</p>
          <p className="mx-auto max-w-2xl text-pretty text-body-lg text-text-muted">
            I find bugs in silicon before silicon finds them in production — and build
            the cloud &amp; embedded systems around the work.
          </p>
        </motion.div>

        {/* magnetic CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={show(12)}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="mt-3 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Magnetic strength={0.4}>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-white shadow-[0_0_40px_var(--color-accent-glow)] transition-colors duration-300 hover:bg-accent-dark"
            >
              <FolderOpen className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              View Selected Work
            </a>
          </Magnetic>

          <Magnetic strength={0.4}>
            <button
              type="button"
              onClick={() => setResumeOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={resumeOpen}
              className="glass glass-edge group inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-semibold text-text transition-colors duration-300 hover:text-accent"
            >
              <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              Resume
            </button>
          </Magnetic>
        </motion.div>
      </div>

      {/* scroll cue — anchored to the section so it never clips on short viewports */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={ready && !reduce ? { y: [0, 6, 0] } : {}}
          transition={
            ready && !reduce ? { repeat: Infinity, duration: 2.2, ease: "easeInOut" } : {}
          }
          className="flex flex-col items-center gap-2 text-text-dim"
        >
          <span className="text-mono-xs">scroll</span>
          <ArrowDown className="h-4 w-4" aria-hidden />
        </motion.div>
      </motion.div>

      <ResumePreviewModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </section>
  );
}

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, blurReveal } from "@/lib/animations";
import { testimonials } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

const INTERVAL_MS = 6000;

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const startRef = useRef(Date.now());
  const rafRef = useRef<number>(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
    startRef.current = Date.now();
    setProgress(0);
  }, []);

  // Progress bar animation
  useEffect(() => {
    if (paused) {
      cancelAnimationFrame(rafRef.current);
      return;
    }

    const tick = () => {
      const elapsed = Date.now() - startRef.current;
      const pct = Math.min(elapsed / INTERVAL_MS, 1);
      setProgress(pct);

      if (pct >= 1) {
        next();
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused, current, next]);

  const goTo = (i: number) => {
    setCurrent(i);
    startRef.current = Date.now();
    setProgress(0);
  };

  const t = testimonials[current];

  return (
    <section
      id="testimonials"
      className="relative bg-bg-secondary px-6 py-40 md:px-12 lg:px-24 xl:py-48"
    >
      <div className="mx-auto max-w-4xl">
        <SectionHeading number="08" title="What People Say" />

        <motion.div
          className="relative min-h-[280px]"
          variants={blurReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Decorative quote marks */}
          <span className="pointer-events-none absolute -left-2 -top-4 select-none text-[8rem] font-bold leading-none text-accent/8 md:-left-8">
            &ldquo;
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="relative"
            >
              <p className="text-xl font-light leading-relaxed text-text/90 md:text-2xl md:leading-relaxed">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                  {t.name.split(" ").map((w) => w[0]).join("")}
                </div>
                <div>
                  <p className="font-semibold text-text">{t.name}</p>
                  <p className="text-sm text-text-muted">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots + progress */}
          <div className="mt-12 flex flex-col items-center gap-4">
            {/* Progress bar */}
            <div className="h-[2px] w-full max-w-xs overflow-hidden rounded-full bg-glass-border">
              <motion.div
                className="h-full rounded-full bg-accent"
                style={{ width: `${progress * 100}%` }}
              />
            </div>

            {/* Dots */}
            <div className="flex items-center gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    i === current
                      ? "h-2.5 w-2.5 bg-accent shadow-[0_0_10px_rgba(0,191,255,0.5)]"
                      : "h-2 w-2 bg-text-dim hover:bg-text-muted"
                  )}
                />
              ))}

              {/* Pause/play button */}
              <button
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Resume auto-play" : "Pause auto-play"}
                className="ml-2 rounded-full p-1 text-text-dim transition-colors hover:text-accent"
              >
                {paused ? (
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                ) : (
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

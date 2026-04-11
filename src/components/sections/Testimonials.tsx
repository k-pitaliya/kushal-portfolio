"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/animations";
import { testimonials } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, next]);

  const t = testimonials[current];

  return (
    <section
      id="testimonials"
      className="relative px-6 py-32 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-4xl">
        <SectionHeading number="08" title="What People Say" />

        <motion.div
          className="relative min-h-[280px]"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Decorative quote marks */}
          <span className="pointer-events-none absolute -left-2 -top-4 select-none text-[8rem] font-bold leading-none text-accent/10 md:-left-8">
            &ldquo;
          </span>
          <span className="pointer-events-none absolute -bottom-12 right-0 select-none text-[8rem] font-bold leading-none text-accent/10 md:-right-8">
            &rdquo;
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="relative"
            >
              <p className="text-xl font-light italic leading-relaxed text-text md:text-2xl">
                {t.text}
              </p>
              <div className="mt-8">
                <p className="font-semibold text-text">{t.name}</p>
                <p className="text-sm text-text-muted">
                  {t.role}, {t.company}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="mt-10 flex items-center justify-center gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={cn(
                  "rounded-full transition-all duration-300",
                  i === current
                    ? "h-3 w-3 bg-accent shadow-[0_0_10px_rgba(0,191,255,0.5)]"
                    : "h-2 w-2 bg-text-dim hover:bg-text-muted"
                )}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

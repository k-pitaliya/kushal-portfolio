"use client";

import { motion } from "framer-motion";
import { aboutData } from "@/lib/data";
import Counter from "@/components/ui/Counter";
import { fadeUp } from "@/lib/animations";

/**
 * Credibility strip — the first proof point after the Hero.
 *
 * Senior-dev intent: a recruiter scrolling past the name shouldn't have to dig
 * for the numbers. Display the strongest evidence (bugs found, coverage points,
 * UVM components) as the first row of content — before About, before Skills.
 *
 * Restrained styling on purpose: thin border, mono numerals, generous padding.
 * The numbers themselves carry the weight; the chrome stays out of the way.
 */
export default function CredibilityStrip() {
  return (
    <section
      aria-label="Verification output by the numbers"
      className="relative border-y border-glass-border/40 bg-bg-secondary/40"
    >
      {/* Subtle accent line at top — visual continuity with section dividers */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="mx-auto max-w-6xl px-6 py-14 md:px-12 md:py-20 lg:px-24">
        {/* Micro-label */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mb-8 text-center font-mono text-[10px] uppercase tracking-[0.4em] text-text-dim md:mb-10 md:text-xs"
        >
          Verification output — Internship 2026
        </motion.p>

        {/* Stats grid */}
        <div className="grid grid-cols-1 divide-y divide-glass-border/40 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {aboutData.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-center px-4 py-8 sm:py-2"
            >
              <span className="flex items-baseline gap-1">
                <Counter
                  value={stat.value}
                  className="font-mono text-5xl font-bold text-text tabular-nums md:text-6xl lg:text-7xl"
                />
                <span className="font-mono text-3xl font-bold text-accent md:text-4xl lg:text-5xl">
                  +
                </span>
              </span>
              <span className="mt-4 text-center font-mono text-[10px] uppercase tracking-[0.32em] text-text-muted md:text-xs">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Subtle accent line at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </section>
  );
}

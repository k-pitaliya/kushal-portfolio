"use client";

import { motion } from "framer-motion";
import { aboutData } from "@/lib/data";
import Counter from "@/components/ui/Counter";

/**
 * CredibilityStrip — first proof point after the Hero.
 *
 * Senior-dev intent: a recruiter scrolling past the name shouldn't have to
 * dig for the numbers. Display the strongest evidence as the first row of
 * content — before any narrative.
 *
 * Restrained styling on purpose: thin border, mono numerals, generous
 * padding. The numbers themselves carry the weight; the chrome stays out
 * of the way.
 */

type Stat = {
  label: string;
  value: number;
  desc?: string;
};

export default function CredibilityStrip() {
  const stats = aboutData.stats as Stat[];

  return (
    <section
      aria-label="Verification output by the numbers"
      className="relative border-y border-divider bg-bg-secondary/30"
    >
      {/* Subtle accent line at top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="mx-auto max-w-6xl px-6 py-12 md:px-12 md:py-16 lg:px-24">
        {/* Micro-label */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center text-mono-xs text-text-dim md:mb-10"
        >
          Verification output · Internship 2026
        </motion.p>

        {/* 4-column grid on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 divide-y divide-divider sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: 0.08 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-center px-4 py-8 sm:py-4 lg:py-2"
            >
              {/* Big number */}
              <span className="flex items-baseline gap-1">
                <Counter
                  value={stat.value}
                  className="font-mono text-5xl font-bold text-text tabular-nums md:text-6xl"
                />
                {stat.label !== "Protocols verified" && (
                  <span className="font-mono text-3xl font-bold text-accent md:text-4xl">
                    +
                  </span>
                )}
              </span>

              {/* Label */}
              <span className="mt-3 text-center text-mono-xs text-text-muted">
                {stat.label}
              </span>

              {/* Optional desc */}
              {stat.desc && (
                <span className="mt-1.5 max-w-[180px] text-center text-[11px] leading-tight text-text-dim">
                  {stat.desc}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </section>
  );
}

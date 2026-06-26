"use client";

import { motion } from "framer-motion";
import { aboutData } from "@/lib/data";
import Counter from "@/components/ui/Counter";
import Tilt from "@/components/ui/Tilt";
import { ease } from "@/lib/animations";

/**
 * CredibilityStrip — first proof point after the Hero.
 *
 * Senior-dev intent: a recruiter scrolling past the name shouldn't have to dig
 * for the numbers. The four strongest metrics sit here, before any narrative —
 * each in its own aurora-tinted glass cell, counting up on view. The chrome
 * stays restrained; the numerals carry the weight.
 */

type Stat = {
  label: string;
  value: number;
  desc?: string;
};

// Aurora hue + matching glow per cell — indigo → cyan → teal → magenta,
// echoing the silicon → cloud → embedded breadth shown elsewhere on the page.
const hues = [1, 2, 3, 4] as const;
const glows = [
  "rgba(110,91,255,0.20)",
  "rgba(43,217,255,0.18)",
  "rgba(47,230,184,0.18)",
  "rgba(255,95,200,0.18)",
];

export default function CredibilityStrip() {
  const stats = aboutData.stats as Stat[];

  return (
    <section
      aria-label="Verification output by the numbers"
      className="relative border-y border-divider bg-bg-secondary/20"
    >
      {/* Subtle accent line at top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="mx-auto max-w-6xl px-6 py-12 md:px-12 md:py-14 lg:px-24">
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

        {/* Slim strip: 2×2 on mobile/tablet, single row of four on desktop */}
        <div className="grid grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const hue = hues[i % hues.length];
            const glow = glows[i % glows.length];
            const showPlus = stat.label !== "Protocols verified";
            return (
              <Tilt key={stat.label} className="rounded-2xl" max={5}>
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    delay: 0.08 * i,
                    duration: 0.5,
                    ease: ease.out,
                  }}
                  whileHover={{
                    y: -4,
                    boxShadow: `0 0 0 1px ${glow}, 0 14px 40px rgba(3,2,10,0.5), 0 0 36px ${glow}`,
                    transition: { type: "spring", stiffness: 260, damping: 22 },
                  }}
                  className="glass glass-edge flex flex-col items-start rounded-2xl px-5 py-6 md:px-6 md:py-7"
                >
                  {/* Big mono numeral, aurora-tinted */}
                  <span
                    className="flex items-baseline gap-0.5"
                    style={{ color: `var(--aurora-${hue})` }}
                  >
                    <Counter
                      value={stat.value}
                      className="font-mono text-4xl font-bold tabular-nums md:text-5xl"
                    />
                    {showPlus && (
                      <span className="font-mono text-2xl font-bold md:text-3xl">
                        +
                      </span>
                    )}
                  </span>

                  {/* Label */}
                  <span className="mt-3 text-sm font-medium text-text">
                    {stat.label}
                  </span>

                  {/* Optional desc */}
                  {stat.desc && (
                    <span className="mt-1 text-xs leading-snug text-text-dim">
                      {stat.desc}
                    </span>
                  )}
                </motion.div>
              </Tilt>
            );
          })}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </section>
  );
}

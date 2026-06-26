"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Cpu, CircuitBoard, Cloud, Wrench, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Tilt from "@/components/ui/Tilt";
import { ease } from "@/lib/animations";
import { skillCategories, methodologyData } from "@/lib/data";

/**
 * StackAndApproach — Skills + Methodology, restyled for the Aurora × Silicon look.
 *
 * The four skill categories (silicon → embedded → cloud → tooling) are the
 * primary block: one glass card per domain, each tinted with its own aurora
 * hue so the breadth reads intentional rather than accidental. We deliberately
 * drop the big percent bars — they read junior — and keep only a subtle
 * three-tick strength hint. Methodology follows as a quieter 2×2 secondary block.
 */

type CategoryMeta = { tag: string; icon: LucideIcon; hue: 1 | 2 | 3 | 4 };

const categoryMeta: Record<string, CategoryMeta> = {
  "VLSI Design Verification": { tag: "Silicon · DV", icon: Cpu, hue: 1 },
  "Embedded Systems": { tag: "Embedded · Firmware", icon: CircuitBoard, hue: 2 },
  "Cloud & Software": { tag: "Cloud · Software", icon: Cloud, hue: 3 },
  "Tools & Build": { tag: "Tooling · Build", icon: Wrench, hue: 4 },
};

const fallbackMeta: CategoryMeta = { tag: "Stack", icon: Workflow, hue: 1 };

// Per-hue hover glow, mirroring GlassCard's aurora lift.
const hueGlow: Record<CategoryMeta["hue"], string> = {
  1: "rgba(110,91,255,0.20)",
  2: "rgba(43,217,255,0.18)",
  3: "rgba(47,230,184,0.18)",
  4: "rgba(255,95,200,0.18)",
};

// Primary domain cards — expo-out reveal with a tasteful per-card index stagger.
const domainCardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: ease.out, delay: i * 0.08 },
  }),
};

// Calmer secondary (methodology) cards — same easing, container-driven stagger.
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: ease.out },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

/** Understated 3-segment strength hint — a signal-meter, not a progress bar. */
function StrengthTicks({ level, hue }: { level: number; hue: number }) {
  const filled = level >= 82 ? 3 : level >= 75 ? 2 : 1;
  return (
    <span
      className="mt-1.5 flex shrink-0 items-center gap-1"
      aria-hidden="true"
    >
      {[0, 1, 2].map((s) => (
        <span
          key={s}
          className="h-1 w-3 rounded-full"
          style={{
            background:
              s < filled ? `var(--aurora-${hue})` : "rgba(255,255,255,0.10)",
            opacity: s < filled ? 0.85 : 1,
          }}
        />
      ))}
    </span>
  );
}

export default function StackAndApproach() {
  return (
    <section id="stack" className="relative section-y px-6 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          number="02"
          title="Stack & Approach"
          subtitle="Four domains, one engineering discipline — the stack I build with, and the verification methodology behind it."
          icon={Workflow}
        />

        {/* Primary block — skill domains as aurora-tinted glass cards.
            Each is wrapped in a shared <Tilt> for subtle pointer-tracked 3D. */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {skillCategories.map((cat, i) => {
            const meta = categoryMeta[cat.title] ?? fallbackMeta;
            const Icon = meta.icon;
            return (
              <Tilt key={cat.title} className="rounded-2xl" max={5}>
                <motion.div
                  custom={i}
                  variants={domainCardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  whileHover={{
                    y: -6,
                    boxShadow: `0 0 0 1px ${hueGlow[meta.hue]}, 0 18px 50px rgba(3,2,10,0.5), 0 0 42px ${hueGlow[meta.hue]}`,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="glass glass-edge group rounded-2xl p-6 md:p-7"
                >
                  <div className="mb-5 flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-glass-border bg-white/[0.03]"
                    style={{ color: `var(--aurora-${meta.hue})` }}
                  >
                    <Icon
                      className="h-4 w-4"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <span
                      className="text-mono-xs"
                      style={{ color: `var(--aurora-${meta.hue})` }}
                    >
                      {String(i + 1).padStart(2, "0")} / {meta.tag}
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight text-text md:text-xl">
                      {cat.title}
                    </h3>
                  </div>
                </div>

                  <ul className="space-y-2.5">
                    {cat.skills.map((skill) => (
                      <li
                        key={skill.name}
                        className="flex items-start justify-between gap-4"
                      >
                        <span className="text-sm leading-snug text-text-muted transition-colors group-hover:text-text">
                          {skill.name}
                        </span>
                        <StrengthTicks level={skill.level} hue={meta.hue} />
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </Tilt>
            );
          })}
        </div>

        {/* Secondary block — methodology in practice */}
        <div className="mt-16 md:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45 }}
            className="mb-8 flex items-center gap-3"
          >
            <span className="h-px w-6 bg-accent/60" aria-hidden="true" />
            <h3 className="text-mono-xs text-accent">
              Methodology in practice
            </h3>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={containerVariants}
          >
            {methodologyData.map((block) => (
              <motion.div
                key={block.title}
                variants={cardVariants}
                className="glass glass-edge rounded-2xl p-6"
              >
                <h4 className="text-mono-sm font-medium text-text">
                  {block.title}
                </h4>
                <ul className="mt-4 space-y-2">
                  {block.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-snug text-text-muted"
                    >
                      <span
                        className="mt-px shrink-0 font-mono text-xs text-accent"
                        aria-hidden="true"
                      >
                        &rsaquo;
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

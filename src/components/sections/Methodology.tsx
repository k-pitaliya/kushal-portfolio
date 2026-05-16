"use client";

import { motion } from "framer-motion";
import {
  Workflow,
  ShieldCheck,
  Wrench,
  GitBranch,
  Code2,
  type LucideIcon,
} from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { methodologyData, type MethodologyCategory } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

/* Per-tile icon mapping — each tile gets a distinct lucide glyph that
   reads as a category cue, not just decoration. */
const TILE_ICONS: Record<string, LucideIcon> = {
  "Verification Methodology": ShieldCheck,
  "Tools in Practice": Wrench,
  "Workflow & Documentation": GitBranch,
  "Languages & Build": Code2,
};

function MethodologyTile({ category }: { category: MethodologyCategory }) {
  const Icon = TILE_ICONS[category.title];

  return (
    <motion.div
      variants={staggerItem}
      className="group relative h-full overflow-hidden rounded-2xl border border-glass-border bg-glass/40 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-accent/30 hover:shadow-[0_0_40px_rgba(0,191,255,0.10)] md:p-8"
    >
      {/* Subtle accent gradient on hover */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120% 60% at 0% 0%, rgba(0,191,255,0.06), transparent 60%)",
        }}
      />

      {/* Header — icon + mono uppercase title */}
      <div className="mb-5 flex items-center gap-3 md:mb-6 md:gap-4">
        {Icon && (
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/5 text-accent transition-colors duration-300 group-hover:border-accent/40 group-hover:bg-accent/10 md:h-10 md:w-10"
            style={{ filter: "drop-shadow(0 0 6px rgba(0,191,255,0.15))" }}
            aria-hidden="true"
          >
            <Icon className="h-4 w-4 md:h-5 md:w-5" strokeWidth={1.75} />
          </span>
        )}
        <h3 className="min-w-0 flex-1 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-text md:text-sm md:tracking-[0.2em]">
          {category.title}
        </h3>
      </div>

      {/* Bullet list */}
      <ul className="space-y-2.5 md:space-y-3">
        {category.items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-sm leading-relaxed text-text-muted"
          >
            <span
              className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-accent/70"
              aria-hidden="true"
            />
            <span className="break-words">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Methodology() {
  return (
    <section
      id="methodology"
      className="relative overflow-x-hidden px-6 py-40 md:px-12 lg:px-24 xl:py-48"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          number="03"
          title="Stack & Methodology"
          subtitle="How I actually work — methodology, tools, and the workflow behind the testbenches."
          icon={Workflow}
        />

        <motion.div
          className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {methodologyData.map((category) => (
            <MethodologyTile key={category.title} category={category} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

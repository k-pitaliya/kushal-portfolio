"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Cpu } from "lucide-react";
import { cn } from "@/lib/utils";
import { blurStagger, blurStaggerItem } from "@/lib/animations";
import { skillCategories } from "@/lib/data";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import RevealMask from "@/components/ui/RevealMask";

function SkillBar({ level, name }: { level: number; name: string }) {
  const label =
    level >= 90 ? "Expert" : level >= 75 ? "Advanced" : level >= 55 ? "Proficient" : "Familiar";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-text">{name}</span>
        <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[10px] font-medium text-accent/70">
          {label}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-glass shadow-[inset_0_0_4px_rgba(0,191,255,0.1)]">
        <motion.div
          className="relative h-full rounded-full bg-gradient-to-r from-accent to-accent/80"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            type: "spring",
            stiffness: 60,
            damping: 12,
            mass: 0.8,
            delay: 0.2,
          }}
        >
          <div className="absolute inset-0 rounded-full shadow-[0_0_10px_rgba(0,191,255,0.5)]" />
          <div className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.15)_50%,transparent_100%)] bg-[length:200%_100%] animate-[bar-shimmer_2s_ease-in-out_infinite]" />
        </motion.div>
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" className="relative px-6 py-40 md:px-12 lg:px-24 xl:py-48">
      <div className="mx-auto max-w-6xl">
        <SectionHeading number="02" title="Skills & Technologies" icon={Cpu} />

        {/* Category Tabs */}
        <LayoutGroup>
          <motion.div
            className="mb-12 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Skill categories"
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {skillCategories.map((cat, i) => (
              <button
                key={cat.title}
                role="tab"
                aria-selected={activeCategory === i}
                onClick={() => setActiveCategory(i)}
                className={cn(
                  "relative rounded-lg px-5 py-2.5 text-sm font-medium transition-colors",
                  activeCategory === i
                    ? "text-accent"
                    : "text-text-muted hover:text-text"
                )}
              >
                {cat.title}
                {activeCategory === i && (
                  <motion.div
                    layoutId="skill-tab-underline"
                    className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-accent shadow-[0_0_10px_rgba(0,191,255,0.3)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </motion.div>
        </LayoutGroup>

        {/* Skills Grid */}
        <RevealMask direction="center">
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3"
                variants={blurStagger}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, filter: "blur(6px)", transition: { duration: 0.2 } }}
              >
                {skillCategories[activeCategory].skills.map((skill) => (
                  <motion.div key={skill.name} variants={blurStaggerItem}>
                    <GlassCard className="space-y-3">
                      <SkillBar name={skill.name} level={skill.level} />
                    </GlassCard>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </RevealMask>
      </div>
    </section>
  );
}

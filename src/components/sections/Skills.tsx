"use client";

import { useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { skillCategories } from "@/lib/data";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";

function SkillBar({ level, name }: { level: number; name: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-text">{name}</span>
        <span className="text-xs tabular-nums text-text-muted">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-glass">
        <motion.div
          className="relative h-full rounded-full bg-accent"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.2 }}
        >
          <div className="absolute inset-0 rounded-full shadow-[0_0_12px_rgba(0,191,255,0.5)]" />
        </motion.div>
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="skills" className="relative px-6 py-32 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading number="02" title="Skills & Technologies" />

        {/* Category Tabs */}
        <LayoutGroup>
          <div className="mb-12 flex flex-wrap gap-2">
            {skillCategories.map((cat, i) => (
              <button
                key={cat.title}
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
                    className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </LayoutGroup>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
          >
            {skillCategories[activeCategory].skills.map((skill) => (
              <motion.div key={skill.name} variants={staggerItem}>
                <GlassCard className="space-y-3">
                  <SkillBar name={skill.name} level={skill.level} />
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

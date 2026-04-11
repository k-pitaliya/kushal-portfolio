"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";
import { education } from "@/lib/data";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Education() {
  return (
    <section id="education" className="relative px-6 py-32 md:px-12 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading number="05" title="Education" />

        <motion.div
          className="grid gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {education.map((edu) => (
            <motion.div key={edu.id} variants={staggerItem}>
              <GlassCard className="relative overflow-hidden">
                {/* Decorative accent element */}
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent/10 blur-2xl" />
                <div className="absolute -right-2 top-4 text-4xl text-accent/15 select-none">
                  🎓
                </div>

                <div className="relative">
                  <h3 className="text-2xl font-bold text-text">
                    {edu.institution}
                  </h3>
                  <p className="mt-1 text-lg text-text-muted">
                    {edu.degree} — {edu.field}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-glass px-4 py-1.5 text-sm text-text-muted">
                      {edu.period}
                    </span>
                    {edu.gpa && (
                      <span className="rounded-full bg-accent/15 px-4 py-1.5 text-sm font-medium text-accent">
                        GPA: {edu.gpa}
                      </span>
                    )}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

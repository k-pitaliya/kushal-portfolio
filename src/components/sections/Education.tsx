"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { education } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Education() {
  return (
    <section id="education" className="relative px-6 py-40 md:px-12 lg:px-24 xl:py-48">
      <div className="mx-auto max-w-5xl">
        <SectionHeading number="06" title="Education" icon={GraduationCap} />

        <motion.div
          className="space-y-12"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {education.map((edu) => (
            <motion.div key={edu.id} variants={staggerItem}>
              {/* Timeline card with left accent */}
              <div className="relative grid gap-8 md:grid-cols-[auto_1fr] md:gap-12">
                {/* Left: Meta info */}
                <div className="relative pl-8 md:pl-0 md:text-right">
                  {/* Timeline dot + line (mobile) */}
                  <div className="absolute left-0 top-1 h-full md:hidden">
                    <div className="h-3 w-3 rounded-full border-2 border-accent bg-bg" />
                    <div className="ml-1 h-full w-0.5 bg-gradient-to-b from-accent/40 to-transparent" />
                  </div>

                  <span className="inline-block rounded-full bg-accent/15 px-4 py-1.5 text-xs font-medium tracking-wide text-accent">
                    {edu.period}
                  </span>
                  {edu.gpa && (
                    <p className="mt-3 font-mono text-sm text-text-muted">
                      GPA: <span className="text-accent">{edu.gpa}</span>
                    </p>
                  )}
                </div>

                {/* Right: Content */}
                <div className="relative">
                  {/* Timeline dot (desktop) */}
                  <div className="absolute -left-5 top-1 hidden md:block">
                    <div className="h-3 w-3 rounded-full border-2 border-accent bg-bg shadow-[0_0_12px_rgba(0,191,255,0.4)]" />
                  </div>
                  {/* Desktop vertical line */}
                  <div className="absolute -left-3.5 top-4 hidden h-[calc(100%-1rem)] w-0.5 bg-gradient-to-b from-accent/30 to-transparent md:block" />

                  <div className="rounded-xl border border-glass-border bg-bg-secondary p-6 md:p-8 lg:p-10">
                    <h3 className="text-2xl font-bold text-text">
                      {edu.institution}
                    </h3>
                    <p className="mt-1 text-lg text-text-muted">
                      {edu.degree} — {edu.field}
                    </p>

                    {/* Coursework */}
                    {edu.coursework && edu.coursework.length > 0 && (
                      <div className="mt-6">
                        <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-dim">
                          Key Coursework
                        </h4>
                        <div className="flex flex-wrap gap-2.5">
                          {edu.coursework.map((course) => (
                            <span
                              key={course}
                              className="inline-flex items-center whitespace-nowrap rounded-full border border-glass-border bg-glass px-3 py-1.5 text-xs font-medium text-text-muted transition-colors duration-200 hover:border-accent/30 hover:text-accent"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Achievements */}
                    {edu.achievements && edu.achievements.length > 0 && (
                      <div className="mt-6">
                        <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-dim">
                          Achievements
                        </h4>
                        <ul className="space-y-2">
                          {edu.achievements.map((achievement) => (
                            <li
                              key={achievement}
                              className="flex items-start gap-2.5 text-sm leading-relaxed text-text-muted"
                            >
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

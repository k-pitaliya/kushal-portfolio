"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeLeft, fadeRight, fadeUp } from "@/lib/animations";
import { experiences } from "@/lib/data";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 60%"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="relative px-6 py-32 md:px-12 lg:px-24">
      <div className="mx-auto max-w-5xl">
        <SectionHeading number="04" title="Experience" />

        <div ref={timelineRef} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 top-0 hidden h-full w-0.5 bg-glass-border md:left-1/2 md:-translate-x-1/2 md:block">
            <motion.div
              className="w-full origin-top bg-accent"
              style={{ height: lineHeight }}
            />
          </div>
          {/* Mobile timeline line */}
          <div className="absolute left-4 top-0 block h-full w-0.5 bg-glass-border md:hidden">
            <motion.div
              className="w-full origin-top bg-accent"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Cards */}
          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={exp.id}
                  className={cn(
                    "relative flex items-start",
                    "pl-12 md:pl-0",
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                >
                  {/* Dot */}
                  <div
                    className={cn(
                      "absolute left-2.5 top-6 z-10 md:left-1/2 md:-translate-x-1/2",
                    )}
                  >
                    <motion.div
                      className="h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    />
                    <motion.div
                      className="absolute inset-0 rounded-full bg-accent/40"
                      animate={{ scale: [1, 2, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>

                  {/* Card */}
                  <motion.div
                    className={cn(
                      "w-full md:w-[calc(50%-2rem)]",
                      isLeft ? "md:pr-4" : "md:pl-4"
                    )}
                    variants={isLeft ? fadeLeft : fadeRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <GlassCard>
                      <span className="mb-2 inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
                        {exp.period}
                      </span>
                      <h3 className="text-lg font-semibold text-text">
                        {exp.role}
                      </h3>
                      <p className="mb-4 text-sm text-text-muted">
                        {exp.company}
                      </p>
                      <ul className="space-y-2">
                        {exp.description.map((item, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2 text-sm text-text-muted"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </GlassCard>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

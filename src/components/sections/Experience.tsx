"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { experiences } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

function ExperienceCard({
  exp,
  index,
  total,
  progress,
}: {
  exp: (typeof experiences)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const rangeStart = index / total;
  const rangeEnd = (index + 1) / total;

  const scale = useTransform(progress, [rangeStart, rangeEnd], [1, 0.93]);
  const opacity = useTransform(progress, [rangeStart, rangeEnd], [1, 0.5]);

  // Only scale DOWN completed (scrolled past) cards
  const finalScale = useTransform(scale, (v) => (index < total - 1 ? v : 1));
  const finalOpacity = useTransform(opacity, (v) => (index < total - 1 ? v : 1));

  return (
    <div
      className="sticky"
      style={{ top: `calc(120px + ${index * 44}px)`, zIndex: index + 1 }}
    >
      <motion.div
        style={{ scale: finalScale, opacity: finalOpacity }}
        className="origin-top"
      >
        {/* Opaque card — solid background so stacked cards properly hide content beneath */}
        <div className="mx-auto max-w-3xl rounded-xl border border-glass-border bg-bg-secondary p-8 shadow-lg shadow-black/20 md:p-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <span className="mb-3 inline-block rounded-full bg-accent/15 px-3 py-1 text-xs font-medium text-accent">
                {exp.period}
              </span>
              <h3 className="text-xl font-bold text-text md:text-2xl">{exp.role}</h3>
              <p className="mt-1 text-sm text-text-muted">{exp.company}</p>
            </div>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 font-mono text-lg font-bold text-accent">
              {String(index + 1).padStart(2, "0")}
            </div>
          </div>
          <ul className="mt-6 space-y-3">
            {exp.description.map((item, j) => (
              <li key={j} className="flex items-start gap-3 text-sm leading-relaxed text-text-muted">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative px-6 py-40 md:px-12 lg:px-24 xl:py-48"
      style={{ minHeight: `${experiences.length * 250 + 400}px` }}
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading number="04" title="Experience" />
        <div className="relative mt-16 space-y-6">
          {/* Vertical timeline line that draws on scroll */}
          <motion.div
            className="absolute -left-1 top-0 hidden h-full w-[2px] origin-top bg-gradient-to-b from-accent/50 via-accent/20 to-transparent md:left-6 md:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />
          {experiences.map((exp, i) => (
            <ExperienceCard
              key={exp.id}
              exp={exp}
              index={i}
              total={experiences.length}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

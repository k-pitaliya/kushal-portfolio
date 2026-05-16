"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * Background — vertical timeline that merges Experience + Education + Certifications.
 *
 * One scrollable chronological list rather than three separate sections.
 * Visually simpler, denser, easier to scan.
 */

type TimelineEntry = {
  date: string;
  rangeEnd?: string;
  org: string;
  role: string;
  bullets?: string[];
  kind: "work" | "education" | "cert";
};

const entries: TimelineEntry[] = [
  {
    date: "May 2026",
    rangeEnd: "Present",
    org: "CHARUSAT — VLSI Summer Internship 2026",
    role: "Design Verification Intern · Faculty-led",
    bullets: [
      "Shipping two full UVM 1.2 verification environments — AXI4-Lite 4×4 crossbar and I2C slave controller — with documented bug reports, coverage closure analysis, and reproducible EDA Playground flows",
      "Built reusable UVM infrastructure: virtual sequencers, layered scoreboards with reference models, per-byte coverage tracking, and SVA property libraries for protocol invariants",
      "Authored verification plans and coverage closure reports; 41 RTL bugs identified and fixed across both projects",
    ],
    kind: "work",
  },
  {
    date: "Aug 2024",
    rangeEnd: "Present",
    org: "CHARUSAT ECE — Undergraduate Student Fellow (UGSF)",
    role: "Merit-based fellowship",
    bullets: [
      "Digital design, FPGA prototyping, and verification methodology research",
      "Led hands-on workshops on Verilog RTL, Xilinx FPGA bring-up, and PCB layout for 50+ students",
      "iChip 3.0 Verilog Hackathon — timed collaborative RTL design challenge",
    ],
    kind: "work",
  },
  {
    date: "May 2025",
    rangeEnd: "Jul 2025",
    org: "Kudos Technolabs",
    role: "Engineering Intern · Cloud Track",
    bullets: [
      "Delivered a production document-processing pipeline end-to-end — architecture, implementation, deployment",
      "Applied verification-style discipline (test plans, IAM least-privilege, failure injection) to cloud infrastructure",
    ],
    kind: "work",
  },
  {
    date: "2024",
    org: "Design of Digital Circuits with VHDL Programming",
    role: "L&T EduTech · Certification",
    kind: "cert",
  },
  {
    date: "2023",
    rangeEnd: "2027 (Expected)",
    org: "Charotar University of Science and Technology (CHARUSAT)",
    role: "B.Tech in Electronics & Communication Engineering · CGPA 8.74 / 10",
    bullets: [
      "Coursework: Digital VLSI Design · Design Testing & Verification · Computer Architecture · Embedded Systems",
      "Achievements: UGSF Fellowship · Second Runner-up Idea Show 3.0 · iChip 3.0 Verilog Hackathon",
    ],
    kind: "education",
  },
  {
    date: "2021",
    rangeEnd: "2023",
    org: "Shree G.K. Dholakiya School",
    role: "Higher Secondary — Gujarat Board · JEE 93 percentile",
    kind: "education",
  },
];

const kindBadge: Record<TimelineEntry["kind"], { label: string; color: string }> = {
  work: { label: "Work", color: "text-accent border-accent/30 bg-accent/5" },
  education: { label: "Education", color: "text-text-muted border-glass-border bg-glass" },
  cert: { label: "Cert", color: "text-success border-success/30 bg-success/5" },
};

export default function Background() {
  return (
    <section
      id="background"
      className="relative section-y px-6 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          number="04"
          title="Background"
          subtitle="Experience, education, and credentials — reverse-chronological."
          icon={Briefcase}
        />

        <ol className="relative space-y-12 border-l border-divider pl-6 md:pl-10">
          {entries.map((entry, i) => {
            const badge = kindBadge[entry.kind];
            return (
              <motion.li
                key={`${entry.org}-${entry.date}`}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative"
              >
                {/* Dot on the timeline */}
                <span
                  aria-hidden="true"
                  className="absolute -left-[33px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-bg bg-accent md:-left-[43px]"
                />

                {/* Date + badge */}
                <div className="mb-2 flex flex-wrap items-center gap-3">
                  <span className="text-mono-xs text-text-muted">
                    {entry.date}
                    {entry.rangeEnd && (
                      <span className="text-text-dim"> · {entry.rangeEnd}</span>
                    )}
                  </span>
                  <span
                    className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-widest ${badge.color}`}
                  >
                    {badge.label}
                  </span>
                </div>

                {/* Org */}
                <h3 className="mb-1 text-lg font-semibold text-text md:text-xl">
                  {entry.org}
                </h3>

                {/* Role */}
                <p className="mb-3 text-sm text-text-muted md:text-base">
                  {entry.role}
                </p>

                {/* Bullets */}
                {entry.bullets && (
                  <ul className="space-y-2 text-sm text-text-muted md:text-base">
                    {entry.bullets.map((b, idx) => (
                      <li key={idx} className="flex items-baseline gap-2">
                        <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-accent/40" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { ease } from "@/lib/animations";

/**
 * Background — Aurora × Silicon.
 *
 * One vertical timeline that merges Experience + Education + Certifications
 * into a single reverse-chronological rail rather than three separate sections.
 * An aurora gradient line runs the spine; each entry is a frosted glass card
 * pinned to a glowing node dot tinted by kind. Visually denser, easy to scan.
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

/**
 * Per-kind styling — the badge label/class, plus a node tint (aurora hue) and a
 * matching rgba glow so dots and hover shadows stay cohesive with the palette.
 */
const kindMeta: Record<
  TimelineEntry["kind"],
  { label: string; badge: string; tint: string; glow: string }
> = {
  work: {
    label: "Work",
    badge: "text-accent border-accent/30 bg-accent/5",
    tint: "var(--aurora-1)",
    glow: "rgba(110,91,255,0.28)",
  },
  education: {
    label: "Education",
    badge: "text-text-muted border-glass-border bg-glass",
    tint: "var(--aurora-2)",
    glow: "rgba(43,217,255,0.26)",
  },
  cert: {
    label: "Cert",
    badge: "text-success border-success/30 bg-success/5",
    tint: "var(--aurora-3)",
    glow: "rgba(47,230,184,0.26)",
  },
};

export default function Background() {
  return (
    <section id="background" className="relative section-y px-6 md:px-12 lg:px-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          number="03"
          title="Background"
          subtitle="Experience, education, and credentials — one reverse-chronological rail."
          icon={Briefcase}
        />

        <ol className="relative">
          {/* Aurora gradient timeline rail */}
          <span
            aria-hidden="true"
            className="absolute left-[6px] top-3 bottom-3 w-[2px] rounded-full"
            style={{
              background:
                "linear-gradient(180deg, var(--aurora-2) 0%, var(--aurora-1) 48%, var(--aurora-4) 100%)",
              opacity: 0.55,
            }}
          />

          {entries.map((entry, i) => {
            const meta = kindMeta[entry.kind];
            return (
              <motion.li
                key={`${entry.org}-${entry.date}`}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.06,
                  ease: ease.out,
                }}
                className="relative pb-6 pl-9 last:pb-0 md:pl-12"
              >
                {/* Glowing node dot on the rail */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-[26px] h-3.5 w-3.5 rounded-full border-2 border-bg"
                  style={{
                    background: meta.tint,
                    boxShadow: `0 0 12px ${meta.glow}`,
                  }}
                />

                {/* Glass entry card */}
                <motion.div
                  whileHover={{
                    y: -4,
                    boxShadow: `0 0 0 1px ${meta.glow}, 0 16px 44px rgba(3,2,10,0.55), 0 0 38px ${meta.glow}, inset 0 1px 0 rgba(255,255,255,0.1)`,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  className="glass glass-edge rounded-2xl p-5 md:p-6"
                >
                  {/* Date + kind badge */}
                  <div className="mb-2.5 flex flex-wrap items-center gap-3">
                    <span className="text-mono-xs text-text-muted">
                      {entry.date}
                      {entry.rangeEnd && (
                        <span className="text-text-dim"> · {entry.rangeEnd}</span>
                      )}
                    </span>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-mono-xs ${meta.badge}`}
                    >
                      {meta.label}
                    </span>
                  </div>

                  {/* Org */}
                  <h3 className="mb-1 text-lg font-semibold text-text md:text-xl">
                    {entry.org}
                  </h3>

                  {/* Role */}
                  <p className="text-mono-sm text-accent">{entry.role}</p>

                  {/* Bullets */}
                  {entry.bullets && (
                    <ul className="mt-3.5 space-y-2 text-sm text-text-muted md:text-base">
                      {entry.bullets.map((b, idx) => (
                        <li key={idx} className="flex items-baseline gap-2.5">
                          <span
                            aria-hidden="true"
                            className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full"
                            style={{ background: meta.tint }}
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Code2, Wrench, Workflow } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * StackAndApproach — the merger of Skills + Methodology.
 *
 * Three columns: Languages | Tools | Methodology. No bars, no percentages.
 * Each column is a tagged list. Below, a single paragraph of philosophy.
 */

const columns = [
  {
    title: "Languages",
    icon: Code2,
    items: [
      "SystemVerilog",
      "Verilog HDL",
      "C / C++",
      "Python",
      "GNU Make",
      "Bash",
    ],
  },
  {
    title: "Tools",
    icon: Wrench,
    items: [
      "QuestaSim",
      "ModelSim",
      "Riviera-PRO",
      "EDA Playground",
      "Xilinx Vivado / ISE",
      "Git / GitHub",
    ],
  },
  {
    title: "Methodology",
    icon: Workflow,
    items: [
      "UVM 1.2 architecture",
      "Constrained-random verification",
      "Coverage-driven closure",
      "SVA property binding",
      "Scoreboard with reference model",
      "Spec → testplan → RCA workflow",
    ],
  },
];

export default function StackAndApproach() {
  return (
    <section
      id="stack"
      className="relative section-y px-6 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          number="03"
          title="Stack & Approach"
          subtitle="The toolchain, language stack, and verification methodology I actually use."
          icon={Workflow}
        />

        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {columns.map((col) => {
            const Icon = col.icon;
            return (
              <motion.div
                key={col.title}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="group rounded-2xl border border-glass-border bg-bg-secondary/30 p-6 transition-all duration-300 hover:border-accent/30 md:p-8"
              >
                <div className="mb-5 flex items-center gap-2.5">
                  <Icon
                    className="h-4 w-4 text-accent"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <h3 className="text-mono-xs font-medium text-accent">
                    {col.title}
                  </h3>
                </div>

                <ul className="space-y-2.5">
                  {col.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-baseline gap-2 text-sm text-text-muted transition-colors group-hover:text-text md:text-base"
                    >
                      <span className="mt-1 inline-block h-1 w-1 shrink-0 rounded-full bg-accent/50" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Verification philosophy — one paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 max-w-3xl text-center text-base leading-relaxed text-text-muted md:text-lg"
        >
          I treat verification as a documentation problem first and a code
          problem second. A coverage report nobody can read is worse than no
          coverage. Every bug I&apos;ve filed has a markdown RCA, every
          covergroup has a traced reason, every test has a spec line behind
          it. The methodology shows in the docs, not the LOC count.
        </motion.p>
      </div>
    </section>
  );
}

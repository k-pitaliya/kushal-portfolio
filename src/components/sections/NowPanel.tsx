"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/**
 * NowPanel — current focus block (Aurora × Silicon).
 *
 * The live-feeling status update: a single frosted glass strip with a pulsing
 * live-dot and a mono "NOW —" label. Tells visitors the portfolio is alive,
 * not frozen. Update the `nowState` string manually whenever you ship
 * something meaningful — the `weekOf` date is intentionally hardcoded.
 *
 * Inspired by Derek Sivers' "/now" pages but as a hero-flow section.
 */

const nowState = {
  weekOf: "May 16, 2026",
  focus:
    "Closing the remaining coverage holes on the I2C UVM testbench — stretch×read (CG17) and rep_dir×WRITE (CG14). Targeting 17/17 covergroup closure by end of week.",
  nextCommit: "github.com/k-pitaliya/i2c-protocol-dv",
  nextCommitUrl: "https://github.com/k-pitaliya/i2c-protocol-dv",
};

export default function NowPanel() {
  return (
    <section
      id="now"
      aria-label="Current focus"
      className="relative px-6 py-20 md:px-12 md:py-24 lg:px-24"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="glass glass-edge relative overflow-hidden rounded-2xl p-6 md:p-8"
        >
          {/* Aurora accent strip on the left edge */}
          <span
            aria-hidden="true"
            className="absolute inset-y-6 left-0 w-[2px] md:inset-y-8"
            style={{
              background:
                "linear-gradient(180deg, transparent, var(--aurora-2) 30%, var(--aurora-1) 70%, transparent)",
            }}
          />

          {/* Header — live dot + mono NOW label */}
          <div className="mb-4 flex items-center gap-3">
            <span className="live-dot shrink-0" aria-hidden="true" />
            <span className="text-mono-xs text-accent">
              NOW{" "}
              <span className="text-text-dim">— week of {nowState.weekOf}</span>
            </span>
          </div>

          {/* Body — the honest, current focus sentence */}
          <p className="mb-5 text-body-lg leading-relaxed text-text">
            {nowState.focus}
          </p>

          {/* Footer — optional next-commit link */}
          <a
            href={nowState.nextCommitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-mono-sm text-text-muted transition-colors hover:text-accent"
          >
            <span className="opacity-60">next.commit →</span>
            <span>{nowState.nextCommit}</span>
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { projects } from "@/lib/data";
import { ease } from "@/lib/animations";
import { cn } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";
import Tilt from "@/components/ui/Tilt";
import type { ProjectAccent } from "@/types";

const accentVar: Record<ProjectAccent, string> = {
  indigo: "var(--aurora-1)",
  cyan: "var(--aurora-2)",
  teal: "var(--aurora-3)",
  magenta: "var(--aurora-4)",
  amber: "var(--aurora-5)",
};

/**
 * WorkPreview — the home page's "Selected Work" teaser. Shows the two featured
 * DV case studies as premium cards that route into their detail pages, then
 * sends visitors to the full gallery. Keeps the landing short.
 */
export default function WorkPreview() {
  const featured = projects.filter((p) => p.featured).slice(0, 2);

  return (
    <section className="relative section-y px-6 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading
            number="01"
            title="Selected Work"
            subtitle="Two verification environments, in depth. The full silicon · cloud · embedded gallery lives on the work page."
          />
          <Link
            href="/work"
            className="group mb-10 hidden shrink-0 items-center gap-2 text-mono-sm text-text-muted transition-colors hover:text-accent md:inline-flex md:mb-14"
          >
            All work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {featured.map((p, i) => {
            const accent = p.accent ?? "indigo";
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, ease: ease.out, delay: i * 0.1 }}
                style={{ "--card-accent": accentVar[accent] } as React.CSSProperties}
              >
                <Tilt className="rounded-3xl" max={5}>
                  <Link
                    href={`/work/${p.id}`}
                    className="glass glass-edge group relative flex h-full flex-col overflow-hidden rounded-3xl p-7 md:p-8"
                  >
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{ boxShadow: "0 0 60px -18px var(--card-accent)" }}
                    />
                    <div className="mb-4 flex items-center gap-3">
                      <span className="text-mono-xs text-text-dim">
                        {p.domain} · {p.year}
                      </span>
                    </div>
                    <h3 className="text-display-md mb-3 text-text transition-colors group-hover:text-accent">
                      {p.title}
                    </h3>
                    <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-text-muted">
                      {p.description}
                    </p>

                    {p.metrics && (
                      <div className="mb-6 mt-auto flex flex-wrap gap-x-6 gap-y-3">
                        {p.metrics.map((m) => (
                          <div key={m.label}>
                            <div
                              className="font-mono text-xl font-semibold"
                              style={{ color: "var(--card-accent)" }}
                            >
                              {m.value}
                            </div>
                            <div className="text-[10px] uppercase tracking-wide text-text-dim">
                              {m.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 text-mono-sm font-medium text-text-muted",
                        "transition-colors group-hover:text-accent"
                      )}
                    >
                      Read case study
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Tilt>
              </motion.div>
            );
          })}
        </div>

        <Link
          href="/work"
          className="group mt-8 inline-flex items-center gap-2 text-mono-sm text-text-muted transition-colors hover:text-accent md:hidden"
        >
          View all work
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

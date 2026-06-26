"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Boxes, ArrowUpRight, ArrowRight } from "lucide-react";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";
import SectionHeading from "@/components/ui/SectionHeading";
import Tilt from "@/components/ui/Tilt";
import Magnetic from "@/components/ui/Magnetic";
import { ease } from "@/lib/animations";
import {
  AxiCrossbarDiagram,
  I2cUvmDiagram,
  FsmDiagram,
} from "@/components/ui/ArchitectureDiagrams";
import type { Project, ProjectAccent, ProjectStatus } from "@/types";

/**
 * Projects gallery (the /work page).
 *
 * DV case studies lead as full-width blocks with inline architecture; the rest
 * sits in a client-filtered breadth grid. Every card routes to its own
 * /work/[slug] case-study page — external repo/live links live there.
 */

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

const diagramMap: Record<string, React.FC> = {
  "axi-xbar-uvm": AxiCrossbarDiagram,
  "i2c-protocol-dv": I2cUvmDiagram,
  "fsm-controller": FsmDiagram,
};

const accentVar: Record<ProjectAccent, string> = {
  indigo: "var(--aurora-1)",
  cyan: "var(--aurora-2)",
  teal: "var(--aurora-3)",
  magenta: "var(--aurora-4)",
  amber: "var(--aurora-5)",
};

const statusConfig: Record<ProjectStatus, { label: string; tone: string }> = {
  verified: { label: "Verified", tone: "text-success" },
  hardware: { label: "Hardware", tone: "text-success" },
  shipped: { label: "Shipped", tone: "text-success" },
  demo: { label: "Demo", tone: "text-accent" },
  "in-progress": { label: "In Progress", tone: "text-warning" },
};

function StatusBadge({ status }: { status?: ProjectStatus }) {
  if (!status) return null;
  const cfg = statusConfig[status];
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-mono-xs", cfg.tone)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {cfg.label}
    </span>
  );
}

type FilterId = "all" | Project["category"];

const filters: { id: FilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "vlsi", label: "Silicon" },
  { id: "cloud", label: "Cloud" },
  { id: "embedded", label: "Embedded" },
  { id: "web", label: "Web" },
];

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const supporting = projects.filter((p) => !p.featured);
  const [active, setActive] = useState<FilterId>("all");

  const countFor = (id: FilterId) =>
    id === "all" ? supporting.length : supporting.filter((p) => p.category === id).length;

  const filtered =
    active === "all" ? supporting : supporting.filter((p) => p.category === active);

  return (
    <section id="projects" className="relative section-y px-6 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          number="01"
          title="Selected Work"
          subtitle="Design-verification work leads; cloud, embedded and full-stack systems show the range. Every project opens a case study — or names why it's closed."
          icon={Boxes}
        />

        {/* ── Featured DV case studies ── */}
        <div className="space-y-24 md:space-y-32">
          {featured.map((project, i) => {
            const Diagram = diagramMap[project.id];
            const accent = project.accent ?? "indigo";
            const reverse = i % 2 === 1;

            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: ease.out }}
                style={{ "--proj-accent": accentVar[accent] } as CSSProperties}
                className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12"
              >
                <div className={cn("lg:col-span-5", reverse ? "lg:col-start-8" : "lg:col-start-1")}>
                  <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="text-mono-xs text-text-dim">
                      {project.domain}
                      {project.year ? ` · ${project.year}` : ""}
                    </span>
                    <StatusBadge status={project.status} />
                  </div>

                  <h3 className="text-display-md mb-4 text-text">{project.title}</h3>
                  <p className="mb-6 text-pretty text-sm leading-relaxed text-text-muted md:text-base">
                    {project.description}
                  </p>

                  {project.metrics && project.metrics.length > 0 && (
                    <div className="mb-6 grid grid-cols-3 gap-3">
                      {project.metrics.map((m) => (
                        <div key={m.label} className="glass rounded-lg px-3 py-2.5 text-center">
                          <div
                            className="font-mono text-base font-semibold md:text-lg"
                            style={{ color: "var(--proj-accent)" }}
                          >
                            {m.value}
                          </div>
                          <div className="mt-0.5 text-[10px] uppercase leading-tight tracking-wide text-text-dim">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mb-6 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-glass-border bg-glass px-2 py-0.5 text-xs font-medium text-text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Magnetic strength={0.3}>
                      <Link
                        href={`/work/${project.id}`}
                        className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-mono-sm font-semibold text-white shadow-[0_0_30px_var(--color-accent-glow)] transition-colors hover:bg-accent-dark"
                      >
                        Read case study
                        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Magnetic>
                    {project.github && (
                      <Magnetic strength={0.3}>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.title} repository on GitHub`}
                          className="group inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-4 py-2.5 text-mono-sm font-medium text-text transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
                        >
                          <GithubIcon className="h-3.5 w-3.5" />
                          Repo
                        </a>
                      </Magnetic>
                    )}
                  </div>
                </div>

                <div
                  className={cn(
                    "lg:col-span-7",
                    reverse ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-6"
                  )}
                >
                  <Tilt className="rounded-2xl" max={4}>
                    <div className="glass glass-edge group relative aspect-[16/10] overflow-hidden rounded-2xl">
                      <div aria-hidden="true" className="absolute inset-0 grid-bg opacity-50" />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 opacity-[0.10] transition-opacity duration-500 group-hover:opacity-20"
                        style={{
                          background:
                            "radial-gradient(60% 60% at 50% 40%, var(--proj-accent), transparent 70%)",
                        }}
                      />
                      <div className="relative h-full w-full p-6 md:p-8">
                        {Diagram ? (
                          <Diagram />
                        ) : (
                          <div className="flex h-full items-center justify-center text-text-dim">
                            <span className="text-mono-xs">{"// diagram pending"}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </Tilt>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* ── Filterable breadth gallery ── */}
        {supporting.length > 0 && (
          <div className="mt-28 md:mt-36">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: ease.out }}
              className="mb-8"
            >
              <h3 className="mb-2 text-mono-xs text-text-dim">ALSO IN THE PORTFOLIO</h3>
              <p className="mb-6 text-pretty text-sm text-text-muted md:text-base">
                Silicon RTL, cloud infrastructure, embedded firmware and full-stack
                systems — the breadth around the verification core.
              </p>

              <div role="tablist" aria-label="Filter projects by domain" className="flex flex-wrap gap-2">
                {filters.map((f) => {
                  const isActive = active === f.id;
                  return (
                    <button
                      key={f.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActive(f.id)}
                      className={cn(
                        "inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-mono-xs transition-all",
                        isActive
                          ? "glass glass-edge text-accent"
                          : "border border-glass-border text-text-dim hover:-translate-y-0.5 hover:text-text-muted"
                      )}
                    >
                      {f.label}
                      <span className={cn("tabular-nums", isActive ? "text-accent/70" : "text-text-dim/70")}>
                        {countFor(f.id)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, index) => {
                  const accent = project.accent ?? "indigo";
                  return (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.4, ease: ease.out, delay: Math.min(index * 0.05, 0.3) },
                      }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.4, ease: ease.out }}
                      whileHover={{ y: -6 }}
                      style={{ "--card-accent": accentVar[accent] } as CSSProperties}
                      className="group glass glass-edge relative flex h-full flex-col overflow-hidden rounded-2xl p-5"
                    >
                      {/* Whole card routes to the case study */}
                      <Link
                        href={`/work/${project.id}`}
                        aria-label={`View the ${project.title} case study`}
                        className="absolute inset-0 z-10 rounded-2xl"
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-5 top-0 h-px opacity-40"
                        style={{ background: "linear-gradient(90deg, transparent, var(--card-accent), transparent)" }}
                      />
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        style={{ boxShadow: "0 0 38px -12px var(--card-accent)" }}
                      />

                      <div className="mb-3 flex items-center justify-between gap-2">
                        <span className="text-mono-xs text-text-dim">{project.domain}</span>
                        <StatusBadge status={project.status} />
                      </div>

                      <h4 className="mb-2 text-base font-semibold text-text transition-colors group-hover:text-accent">
                        {project.title}
                      </h4>

                      <p className="mb-4 line-clamp-3 text-pretty text-xs leading-relaxed text-text-muted md:text-sm">
                        {project.description}
                      </p>

                      <div className="mb-4 flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="rounded-md border border-glass-border bg-glass px-1.5 py-0.5 text-[10px] font-medium text-text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-2">
                        <span className="text-mono-xs text-text-dim">{project.year}</span>
                        <span className="inline-flex items-center gap-1 text-mono-xs text-text-muted transition-colors group-hover:text-accent">
                          View
                          <ArrowUpRight className="h-3 w-3" />
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

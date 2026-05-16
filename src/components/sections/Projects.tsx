"use client";

import { motion } from "framer-motion";
import { Boxes, ArrowUpRight } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
import { projects } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  AxiCrossbarDiagram,
  I2cUvmDiagram,
  FsmDiagram,
} from "@/components/ui/ArchitectureDiagrams";

/**
 * Projects — v2 "Selected Work".
 *
 * Featured projects render as full-width case studies with inline SVG
 * architecture diagrams. Below, a compact "Also" grid for the remaining
 * supporting projects.
 *
 * Drops the horizontal-scroll pattern (impressive but disorienting on
 * laptops and broken on touch).
 */

const diagramMap: Record<string, React.FC> = {
  "axi-xbar-uvm": AxiCrossbarDiagram,
  "i2c-protocol-dv": I2cUvmDiagram,
  "fsm-controller": FsmDiagram,
};

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const supporting = projects.filter((p) => !p.featured);

  return (
    <section
      id="projects"
      className="relative section-y px-6 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          number="02"
          title="Selected Work"
          subtitle="Featured UVM verification environments. Each case study links to source, EDA Playground flow, and the engineering writeup."
          icon={Boxes}
        />

        {/* Featured case studies — full width, alternating layout */}
        <div className="space-y-24 md:space-y-32">
          {featured.map((project, i) => {
            const Diagram = diagramMap[project.id];
            const reverse = i % 2 === 1;
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12"
              >
                {/* Content column */}
                <div
                  className={`lg:col-span-5 ${
                    reverse ? "lg:col-start-8" : "lg:col-start-1"
                  }`}
                >
                  {/* Date + repo */}
                  <div className="mb-4 flex items-center gap-3">
                    <span className="text-mono-xs text-text-dim">
                      FEATURED · MAY 2026
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-display-md mb-4 text-text">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-6 text-sm leading-relaxed text-text-muted md:text-base">
                    {project.description}
                  </p>

                  {/* Metrics — if any */}
                  {project.metrics && project.metrics.length > 0 && (
                    <div className="mb-6 grid grid-cols-3 gap-3">
                      {project.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="rounded-lg border border-glass-border bg-bg-secondary/40 px-3 py-2.5 text-center"
                        >
                          <div className="font-mono text-base font-semibold text-accent md:text-lg">
                            {m.value}
                          </div>
                          <div className="mt-0.5 text-[10px] uppercase tracking-wide text-text-dim leading-tight">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Stack */}
                  <div className="mb-6 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md bg-accent/8 px-2 py-0.5 text-xs font-medium text-accent/85"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-4 py-2 text-mono-sm font-medium text-text transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
                      >
                        <GithubIcon className="h-3.5 w-3.5" />
                        View Repo
                        <ArrowUpRight className="h-3 w-3 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-4 py-2 text-mono-sm font-medium text-text transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
                      >
                        EDA Playground
                        <ArrowUpRight className="h-3 w-3 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Diagram column */}
                <div
                  className={`lg:col-span-7 ${
                    reverse ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-6"
                  }`}
                >
                  <div className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-glass-border bg-bg-secondary/30 transition-all duration-500 hover:border-accent/30">
                    {/* Subtle grid background inside the card */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 grid-bg opacity-50"
                    />
                    {/* Architecture diagram */}
                    <div className="relative h-full w-full p-6 md:p-8">
                      {Diagram ? (
                        <Diagram />
                      ) : (
                        <div className="flex h-full items-center justify-center text-text-dim">
                          <span className="text-mono-xs">
                            // diagram pending
                          </span>
                        </div>
                      )}
                    </div>
                    {/* Hover gradient */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-accent/0 via-transparent to-accent/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Supporting projects — compact grid */}
        {supporting.length > 0 && (
          <div className="mt-32">
            <h3 className="mb-2 text-mono-xs text-text-dim">
              ALSO IN THE PORTFOLIO
            </h3>
            <p className="mb-8 text-sm text-text-muted md:text-base">
              Supporting projects across embedded and digital design.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {supporting.map((project, i) => (
                <motion.a
                  key={project.id}
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group block rounded-xl border border-glass-border bg-bg-secondary/30 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:bg-bg-secondary/60"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-mono-xs text-text-dim uppercase">
                      {project.category}
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-text-dim transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                  </div>
                  <h4 className="mb-2 text-base font-semibold text-text transition-colors group-hover:text-accent">
                    {project.title}
                  </h4>
                  <p className="line-clamp-2 text-xs leading-relaxed text-text-muted md:text-sm">
                    {project.description}
                  </p>
                </motion.a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

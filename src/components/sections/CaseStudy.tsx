"use client";

import { type CSSProperties } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ArrowRight } from "lucide-react";
import { projects, blogPosts } from "@/lib/data";
import { ease } from "@/lib/animations";
import { cn } from "@/lib/utils";
import Magnetic from "@/components/ui/Magnetic";
import Tilt from "@/components/ui/Tilt";
import {
  AxiCrossbarDiagram,
  I2cUvmDiagram,
  FsmDiagram,
} from "@/components/ui/ArchitectureDiagrams";
import type { Project, ProjectAccent, ProjectStatus } from "@/types";

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
  hardware: { label: "Hardware-proven", tone: "text-success" },
  shipped: { label: "Shipped", tone: "text-success" },
  demo: { label: "Working demo", tone: "text-accent" },
  "in-progress": { label: "In progress", tone: "text-warning" },
};

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
};

export default function CaseStudy({ project }: { project: Project }) {
  const accent = project.accent ?? "indigo";
  const Diagram = diagramMap[project.id];
  const status = project.status ? statusConfig[project.status] : null;

  const idx = projects.findIndex((p) => p.id === project.id);
  const next = projects[(idx + 1) % projects.length];

  const related = blogPosts
    .filter((b) => b.tags.some((t) => project.tags.includes(t)))
    .slice(0, 2);

  return (
    <article
      className="relative px-6 pt-28 pb-24 md:px-12 md:pt-36 lg:px-24"
      style={{ "--proj-accent": accentVar[accent] } as CSSProperties}
    >
      <div className="mx-auto max-w-4xl">
        <Link
          href="/work"
          className="group inline-flex items-center gap-2 text-mono-sm text-text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          All work
        </Link>

        {/* Header */}
        <motion.header {...reveal} transition={{ duration: 0.7, ease: ease.out }} className="mt-8">
          <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="text-mono-xs text-text-dim">
              {project.domain}
              {project.year ? ` · ${project.year}` : ""}
            </span>
            {status && (
              <span className={cn("inline-flex items-center gap-1.5 text-mono-xs", status.tone)}>
                <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
                {status.label}
              </span>
            )}
          </div>
          <h1 className="text-display-lg text-text">{project.title}</h1>
          <p className="mt-5 max-w-2xl text-pretty text-body-lg text-text-muted">
            {project.description}
          </p>

          {/* Actions */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            {project.github && (
              <Magnetic strength={0.3}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-mono-sm font-semibold text-white shadow-[0_0_30px_var(--color-accent-glow)] transition-colors hover:bg-accent-dark"
                >
                  <GithubIcon className="h-3.5 w-3.5" />
                  View repository
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </Magnetic>
            )}
            {project.live && (
              <Magnetic strength={0.3}>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-4 py-2.5 text-mono-sm font-medium text-text transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
                >
                  EDA Playground
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </Magnetic>
            )}
            {!project.github && !project.live && project.closedReason && (
              <span className="rounded-full border border-glass-border px-4 py-2.5 text-mono-xs text-text-dim">
                {project.closedReason} — walkthrough available on request
              </span>
            )}
          </div>
        </motion.header>

        {/* Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <motion.div
            {...reveal}
            transition={{ duration: 0.6, ease: ease.out }}
            className="mt-12 grid grid-cols-3 gap-4"
          >
            {project.metrics.map((m) => (
              <div key={m.label} className="glass glass-edge rounded-2xl p-4 text-center md:p-5">
                <div
                  className="font-mono text-2xl font-semibold md:text-3xl"
                  style={{ color: "var(--proj-accent)" }}
                >
                  {m.value}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-wide text-text-dim md:text-xs">
                  {m.label}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Architecture diagram */}
        {Diagram && (
          <motion.div {...reveal} transition={{ duration: 0.7, ease: ease.out }} className="mt-12">
            <p className="mb-3 text-mono-xs text-text-dim">{"// architecture"}</p>
            <Tilt className="rounded-2xl" max={3}>
              <div className="glass glass-edge relative aspect-[16/9] overflow-hidden rounded-2xl">
                <div aria-hidden className="absolute inset-0 grid-bg opacity-50" />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.10]"
                  style={{ background: "radial-gradient(60% 60% at 50% 40%, var(--proj-accent), transparent 70%)" }}
                />
                <div className="relative h-full w-full p-6 md:p-10">
                  <Diagram />
                </div>
              </div>
            </Tilt>
          </motion.div>
        )}

        {/* Deep dive */}
        {project.longDescription && (
          <motion.section {...reveal} transition={{ duration: 0.7, ease: ease.out }} className="mt-12">
            <p className="mb-3 text-mono-xs text-text-dim">{"// the work"}</p>
            <p className="text-pretty text-base leading-relaxed text-text-muted md:text-lg">
              {project.longDescription}
            </p>
          </motion.section>
        )}

        {/* Stack */}
        <motion.div {...reveal} transition={{ duration: 0.6, ease: ease.out }} className="mt-10">
          <p className="mb-3 text-mono-xs text-text-dim">{"// stack"}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-glass-border bg-glass px-2.5 py-1 text-xs font-medium text-text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Related writeups */}
        {related.length > 0 && (
          <motion.div {...reveal} transition={{ duration: 0.6, ease: ease.out }} className="mt-12">
            <p className="mb-3 text-mono-xs text-text-dim">{"// related writeups"}</p>
            <div className="space-y-3">
              {related.map((post) => (
                <a
                  key={post.id}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass glass-edge group flex items-center justify-between gap-4 rounded-2xl p-4 transition-transform hover:-translate-y-0.5"
                >
                  <span className="text-sm font-medium text-text transition-colors group-hover:text-accent">
                    {post.title}
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-text-dim transition-colors group-hover:text-accent" />
                </a>
              ))}
            </div>
          </motion.div>
        )}

        {/* Next project */}
        <div className="mt-16 border-t border-divider pt-8">
          <Link
            href={`/work/${next.id}`}
            className="group flex items-center justify-between gap-4"
          >
            <span className="text-mono-xs text-text-dim">Next project</span>
            <span className="inline-flex items-center gap-2 text-base font-semibold text-text transition-colors group-hover:text-accent md:text-lg">
              {next.title}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

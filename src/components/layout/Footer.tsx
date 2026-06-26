"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";
import { navItems, socialLinks, siteConfig } from "@/lib/data";
import Magnetic from "@/components/ui/Magnetic";

function Github({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function Linkedin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/**
 * Footer — v2 "engineering metadata" flavor.
 *
 * Reads like a __version__ block. Dim, monospace, left-aligned.
 * Conveys "alive, maintained, technical" rather than "marketing footer."
 */

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

// Build metadata — exposed in the footer.
// Values are stable across server + client to avoid hydration mismatches.
const buildMeta = {
  version: "v2.0",
  commit: process.env.NEXT_PUBLIC_COMMIT_SHA?.slice(0, 7) ?? "main",
  // Build year is acceptable to differ slightly; we suppress hydration on it below
  built: "2026-05",
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-divider bg-bg">
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-12 lg:px-24">
        {/* Top: big CTA — glass panel with a soft aurora wash */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="glass glass-edge relative mb-16 overflow-hidden rounded-3xl px-8 py-12 md:px-12 md:py-14"
        >
          {/* Decorative aurora glows — purely atmospheric, behind content */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full opacity-20 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--aurora-1), transparent 70%)" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full opacity-15 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--aurora-3), transparent 70%)" }}
          />

          <div className="relative z-10 flex flex-col items-start gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-mono-xs text-text-dim">Have a project?</p>
              <h2 className="text-display-lg text-text">
                Let&apos;s <span className="aurora-text">build.</span>
              </h2>
            </div>

            <Magnetic strength={0.35}>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_0_30px_var(--color-accent-glow)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-dark hover:shadow-[0_0_50px_var(--color-accent-glow)]"
              >
                Start a conversation
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Magnetic>
          </div>
        </motion.div>

        {/* Divider line */}
        <div className="mb-10 h-px w-full bg-divider" />

        {/* Bottom: 3-column engineering metadata */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Identity */}
          <div>
            <p className="text-base font-semibold text-text">Kushal Pitaliya</p>
            <p className="mt-1 text-sm text-text-muted">
              Design Verification Engineer · Rajkot, Gujarat
            </p>
          </div>

          {/* Nav links — compact */}
          <div>
            <p className="mb-3 text-mono-xs text-text-dim">Sitemap</p>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-text-muted transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <p className="mb-3 text-mono-xs text-text-dim">Connect</p>
            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon];
                if (!Icon) return null;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target={link.icon === "mail" ? undefined : "_blank"}
                    rel={link.icon === "mail" ? undefined : "noopener noreferrer"}
                    aria-label={link.name}
                    className="glass glass-edge flex h-10 w-10 items-center justify-center rounded-xl text-text-muted transition-all duration-200 hover:-translate-y-0.5 hover:text-accent"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Engineering metadata block */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-divider pt-8 md:flex-row md:items-center">
          <ul className="space-y-1 font-mono text-[11px] leading-relaxed text-text-dim">
            <li>
              <span className="text-text-muted">signal-path </span>
              <span className="text-accent">{buildMeta.version}</span>
              <span className="text-text-dim"> · last build {buildMeta.built}</span>
              <span className="text-text-dim"> · commit {buildMeta.commit}</span>
            </li>
            <li className="text-text-dim">
              built with Next.js 16 · React 19 · Tailwind 4 · Framer Motion
            </li>
            <li className="text-text-dim">
              source ·{" "}
              <a
                href="https://github.com/k-pitaliya/kushal-portfolio"
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-4 hover:text-accent hover:underline"
              >
                github.com/k-pitaliya/kushal-portfolio
              </a>
            </li>
          </ul>

          <div className="flex items-center gap-4">
            <p className="text-mono-xs text-text-dim" suppressHydrationWarning>
              © {new Date().getFullYear()} {siteConfig.name}
            </p>
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-mono-xs text-text-muted transition-colors hover:text-accent"
              aria-label="Back to top"
            >
              Back to top
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-glass-border transition-all group-hover:border-accent/40">
                <ArrowUp className="h-3 w-3 transition-transform group-hover:-translate-y-0.5" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

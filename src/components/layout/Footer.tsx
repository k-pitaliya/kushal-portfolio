"use client";

import { motion } from "framer-motion";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { navItems, socialLinks, siteConfig } from "@/lib/data";
import { fadeUp, staggerContainer, staggerItem, blurReveal } from "@/lib/animations";
import MagneticButton from "@/components/ui/MagneticButton";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
};

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden bg-bg-secondary">
      {/* Top accent gradient line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      {/* Large CTA section */}
      <motion.div
        className="mx-auto max-w-6xl px-6 pt-32 pb-20"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Big statement */}
        <motion.div variants={blurReveal} className="mb-20 text-center">
          <p className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-text-dim">
            Have a project in mind?
          </p>
          <h2 className="text-4xl font-bold leading-[0.9] tracking-tight text-text sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl">
            Let&apos;s work
            <br />
            <span className="text-shimmer" style={{
              background: "linear-gradient(110deg, var(--color-accent) 45%, #fff 50%, var(--color-accent) 55%)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 3s ease-in-out infinite",
            }}>together.</span>
          </h2>
          <div className="mt-10">
            <MagneticButton>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-sm font-semibold text-bg transition-all duration-300 hover:-translate-y-1 hover:bg-accent-dark hover:shadow-[0_0_40px_rgba(0,191,255,0.3)]"
              >
                Start a conversation
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:rotate-12" />
              </a>
            </MagneticButton>
          </div>
        </motion.div>

        {/* Footer grid */}
        <div className="grid gap-12 border-t border-glass-border pt-12 md:grid-cols-3">
          {/* Brand */}
          <motion.div variants={staggerItem}>
            <h3 className="mb-3 text-2xl font-bold text-text">
              Kushal
              <span className="text-accent">.</span>
            </h3>
            <p className="max-w-xs text-sm leading-relaxed text-text-muted">
              {siteConfig.description}
            </p>
          </motion.div>

          {/* Quick links */}
          <motion.div variants={staggerItem}>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-dim">
              Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group/link relative text-sm text-text-muted transition-colors duration-300 hover:text-accent"
                  >
                    {item.label}
                    <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-accent/50 transition-all duration-300 group-hover/link:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Socials */}
          <motion.div variants={staggerItem}>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-text-dim">
              Connect
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon];
                return (
                  <MagneticButton key={link.name} strength={0.3}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.name}
                       className="flex h-10 w-10 items-center justify-center rounded-full border border-glass-border bg-glass text-text-muted transition-all duration-300 hover:border-accent/40 hover:text-accent hover:scale-110 hover:-translate-y-1 hover:rotate-6 hover:shadow-[0_0_20px_rgba(0,191,255,0.12)]"
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                    </a>
                  </MagneticButton>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-glass-border pt-6 sm:flex-row"
          variants={fadeUp}
        >
          <p className="text-xs text-text-dim">
            © {new Date().getFullYear()} Kushal Pitaliya. Crafted with precision.
          </p>

          <MagneticButton strength={0.25}>
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-xs text-text-muted transition-colors hover:text-accent"
            >
              Back to top
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-glass-border transition-all group-hover:border-accent/40 group-hover:shadow-[0_0_10px_rgba(0,191,255,0.1)]">
                <ArrowUp className="h-3 w-3 transition-transform group-hover:-translate-y-0.5" />
              </span>
            </button>
          </MagneticButton>
        </motion.div>
      </motion.div>
    </footer>
  );
}

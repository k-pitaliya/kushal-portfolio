"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * SignalPath — vertical section navigator on the right edge.
 *
 * Replaces the previous decorative S-curve (which read as "AI-generated
 * line that does nothing"). Now functional:
 *  - One dot per page section, anchored to its actual scroll position
 *  - Active section dot lights up (intersection observer)
 *  - Hover any dot → shows the section name as a label
 *  - Click any dot → smooth-scroll to that section
 *  - Thin progress line on the right edge fills proportional to scroll
 *
 * Same scroll-driven animation language; now serves navigation, not aesthetics.
 * Visible on lg+ only — mobile has the navbar.
 */

type Section = { id: string; label: string };

const SECTIONS: Section[] = [
  { id: "home", label: "Home" },
  { id: "now", label: "Now" },
  { id: "projects", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "background", label: "Background" },
  { id: "writeups", label: "Writeups" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function SignalPath() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<string>("home");
  const { scrollYProgress } = useScroll();

  // Single hook for the progress line — same number every render
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    setMounted(true);

    // Active-section detection via IntersectionObserver
    const targets = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry with the largest visible area near the top of the viewport
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length === 0) return;
        const top = intersecting.reduce((best, cur) =>
          cur.intersectionRatio > best.intersectionRatio ? cur : best
        );
        setActive(top.target.id);
      },
      {
        rootMargin: "-30% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Section navigator"
      className="pointer-events-none fixed inset-y-0 right-6 z-[2] hidden items-center lg:flex xl:right-10"
    >
      <div className="relative flex h-[min(70vh,560px)] flex-col items-center justify-between">
        {/* Background track — full-height vertical line */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-glass-border"
        />

        {/* Scroll-progress line — fills from top */}
        <motion.span
          aria-hidden="true"
          className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-accent shadow-[0_0_6px_rgba(0,191,255,0.5)]"
          style={{ height: lineHeight }}
        />

        {/* Section dots */}
        {SECTIONS.map((section) => {
          const isActive = active === section.id;
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => handleClick(section.id)}
              aria-label={`Jump to ${section.label} section`}
              aria-current={isActive ? "true" : undefined}
              className="group pointer-events-auto relative z-[3] flex h-6 w-6 items-center justify-center"
            >
              {/* The dot itself */}
              <span
                className={[
                  "block rounded-full transition-all duration-300",
                  isActive
                    ? "h-2.5 w-2.5 bg-accent shadow-[0_0_8px_rgba(0,191,255,0.7)]"
                    : "h-1.5 w-1.5 bg-text-dim/50 group-hover:h-2 group-hover:w-2 group-hover:bg-accent/70",
                ].join(" ")}
              />

              {/* Label — appears on hover or when active */}
              <span
                className={[
                  "pointer-events-none absolute right-full mr-3 whitespace-nowrap text-mono-xs transition-all duration-200",
                  isActive
                    ? "translate-x-0 text-accent opacity-100"
                    : "translate-x-2 text-text-muted opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                ].join(" ")}
              >
                {section.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

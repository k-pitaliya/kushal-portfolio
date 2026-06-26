"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * SignalPath — vertical section navigator on the right edge (Aurora × Silicon).
 *
 * Functional, not decorative:
 *  - One dot per page section, anchored to its actual scroll position
 *  - Active section dot lights up (IntersectionObserver) with an aurora glow
 *  - Hover any dot → shows the section name in a glass label
 *  - Click any dot → smooth-scroll to that section
 *  - Thin progress rail on the right edge fills proportional to scroll
 *
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

/**
 * Client-only mount flag without a setState-in-effect.
 *
 * `useSyncExternalStore` returns the server snapshot (`false`) during SSR /
 * hydration and the client snapshot (`true`) afterwards — so the navigator only
 * renders after mount, dodging the framer-motion `useTransform` hydration
 * mismatch *without* the "setState synchronously within an effect" lint error
 * that a `setMounted(true)` inside `useEffect` triggers on React 19 / Next 16.
 */
const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function SignalPath() {
  const mounted = useSyncExternalStore(
    subscribe,
    getClientSnapshot,
    getServerSnapshot
  );
  const [active, setActive] = useState<string>("home");
  const { scrollYProgress } = useScroll();

  // Single hook for the progress rail — same number of hooks every render
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
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
        {/* Background rail — full-height vertical line */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-glass-border"
        />

        {/* Scroll-progress rail — fills from top with an aurora gradient */}
        <motion.span
          aria-hidden="true"
          className="absolute left-1/2 top-0 w-px -translate-x-1/2 rounded-full shadow-[0_0_8px_rgba(124,108,255,0.55)]"
          style={{
            height: lineHeight,
            background:
              "linear-gradient(180deg, var(--aurora-2), var(--aurora-1))",
          }}
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
                    ? "h-2.5 w-2.5 bg-accent shadow-[0_0_10px_rgba(124,108,255,0.8)] ring-2 ring-accent/25"
                    : "h-1.5 w-1.5 bg-text-dim/50 group-hover:h-2 group-hover:w-2 group-hover:bg-accent/70",
                ].join(" ")}
              />

              {/* Label — appears on hover or when active */}
              <span
                className={[
                  "glass glass-edge pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full px-2.5 py-1 text-mono-xs transition-all duration-200",
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

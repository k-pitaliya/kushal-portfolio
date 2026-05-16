"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Boxes } from "lucide-react";
import { cn } from "@/lib/utils";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { projects } from "@/lib/data";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { Project } from "@/types";

/* Stopwords filtered out of initials computation */
const INITIAL_STOPWORDS = new Set([
  "with",
  "and",
  "for",
  "the",
  "on",
  "of",
  "in",
  "a",
  "an",
  "to",
  "from",
]);

/**
 * Compute display initials for a project title.
 * - Strips non-alphanumeric characters from each word
 * - Filters stopwords ("with", "and", etc.)
 * - Uppercases the first character of each remaining word
 * - Caps result at 3 characters
 * Examples:
 *   "FSM Controller with Assertion-Based Verification" -> "FCV"
 *   "Audio Spectrum Analyzer (STM32 Bare-Metal)"       -> "ASA"
 *   "AXI4-Lite 4×4 Crossbar UVM Testbench"             -> "AXI"
 *   "I2C Protocol Full UVM Verification"               -> "IPF"
 */
function projectInitials(title: string): string {
  return title
    .split(/\s+/)
    .map((word) => word.replace(/[^A-Za-z0-9]/g, ""))
    .filter((word) => word.length > 0 && !INITIAL_STOPWORDS.has(word.toLowerCase()))
    .map((word) => word[0].toUpperCase())
    .slice(0, 3)
    .join("");
}

const filters = ["All", "VLSI", "Embedded"] as const;
type Filter = (typeof filters)[number];

const categoryGradients: Record<string, string> = {
  vlsi: "from-purple-500/30 to-blue-500/30",
  embedded: "from-orange-500/30 to-red-500/30",
  tools: "from-teal-500/30 to-cyan-500/30",
  other: "from-gray-500/30 to-zinc-500/30",
};

export default function Projects() {
  const [active, setActive] = useState<Filter>("All");
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1023px)");
  const useVerticalLayout = isMobile || isTablet;
  const sectionRef = useRef<HTMLElement>(null);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filtered = active === "All"
    ? projects
    : projects.filter((p) => p.category === active.toLowerCase());

  const cardWidth = 420;
  const gap = 24;
  const totalScrollWidth = filtered.length * (cardWidth + gap);
  const sectionHeight = useVerticalLayout || !windowWidth ? "auto" : `${totalScrollWidth + windowWidth}px`;

  // Reset scroll to section top when filter changes (desktop only)
  useEffect(() => {
    if (useVerticalLayout || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    if (window.scrollY > sectionTop) {
      window.scrollTo({ top: sectionTop, behavior: "smooth" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(totalScrollWidth - (windowWidth * 0.6 || 800))]
  );

  // MOBILE / TABLET: simple vertical layout
  if (useVerticalLayout) {
    return (
      <section id="projects" className="relative overflow-x-hidden px-6 py-40 xl:py-48">
        <div className="mx-auto max-w-6xl">
          <SectionHeading number="02" title="Selected Work" subtitle="Featured UVM verification environments and supporting projects." icon={Boxes} />
          <FilterBar active={active} setActive={setActive} />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="grid gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              {filtered.map((project, idx) => (
                <motion.div key={project.id} variants={staggerItem}>
                  <ProjectCard project={project} index={idx} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    );
  }

  // DESKTOP: horizontal scroll
  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        {/* Header + Filters */}
        <div className="px-6 pt-20 md:px-12 lg:px-24">
          <div className="mx-auto max-w-6xl">
            <SectionHeading number="02" title="Selected Work" subtitle="Featured UVM verification environments and supporting projects." icon={Boxes} />
            <FilterBar active={active} setActive={setActive} />
          </div>
        </div>

        {/* Horizontal track */}
        <div className="flex flex-1 items-center">
          <motion.div
            className="flex items-stretch gap-6 pl-12 pr-[40vw] lg:pl-24"
            style={{ x }}
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                className="w-[420px] shrink-0"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06, duration: 0.5 }}
              >
                <ProjectCard project={project} index={i} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Scroll progress indicator */}
        <div className="px-12 pb-8 lg:px-24">
          <div className="mx-auto max-w-md">
            <div className="h-[2px] overflow-hidden rounded-full bg-glass-border">
              <motion.div
                className="h-full origin-left bg-accent"
                style={{ scaleX: scrollYProgress }}
              />
            </div>
            <p className="mt-2 text-center font-mono text-xs text-text-dim">
              {filtered.length} projects · scroll to explore
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Extracted filter bar */
function FilterBar({ active, setActive }: { active: Filter; setActive: (f: Filter) => void }) {
  return (
    <div className="mb-8 flex flex-wrap gap-3" role="group" aria-label="Filter projects">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setActive(f)}
          aria-pressed={active === f}
          className={cn(
            "relative rounded-lg px-5 py-2 text-sm font-medium transition-all duration-300",
            active === f
              ? "bg-accent text-bg shadow-[0_0_20px_rgba(0,191,255,0.3)]"
              : "border border-glass-border bg-glass text-text-muted hover:bg-glass-hover hover:text-text"
          )}
        >
          {f}
        </button>
      ))}
    </div>
  );
}

/* Category-themed minimal SVG glyph — replaces the gibberish initials placeholder.
   VLSI: stylized DIP/IC chip with pins on all four sides.
   Embedded: stylized MCU board with pin headers + trace lines. */
function CategoryGlyph({ category }: { category: Project["category"] }) {
  if (category === "vlsi") {
    // IC chip motif: body, indent notch, pins on 4 sides
    const pinPositions = [22, 38, 54, 70];
    return (
      <svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        className="h-32 w-32 text-white opacity-20 transition-all duration-700 group-hover:scale-110 group-hover:opacity-30 md:h-36 md:w-36"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
      >
        {/* Chip body */}
        <rect x="22" y="22" width="56" height="56" rx="3" strokeWidth="1.5" />
        {/* Pin-1 indent notch */}
        <circle cx="30" cy="30" r="1.6" fill="currentColor" />
        {/* Left pins */}
        {pinPositions.map((y) => (
          <line key={`l${y}`} x1="22" y1={y + 4} x2="14" y2={y + 4} strokeWidth="1.5" />
        ))}
        {/* Right pins */}
        {pinPositions.map((y) => (
          <line key={`r${y}`} x1="78" y1={y + 4} x2="86" y2={y + 4} strokeWidth="1.5" />
        ))}
        {/* Top pins */}
        {pinPositions.map((x) => (
          <line key={`t${x}`} x1={x + 4} y1="22" x2={x + 4} y2="14" strokeWidth="1.5" />
        ))}
        {/* Bottom pins */}
        {pinPositions.map((x) => (
          <line key={`b${x}`} x1={x + 4} y1="78" x2={x + 4} y2="86" strokeWidth="1.5" />
        ))}
        {/* Inner core hint */}
        <rect x="38" y="38" width="24" height="24" rx="1" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    );
  }
  // embedded / tools / other -> MCU dev-board motif
  return (
    <svg
      viewBox="0 0 100 100"
      aria-hidden="true"
      className="h-32 w-32 text-white opacity-20 transition-all duration-700 group-hover:scale-110 group-hover:opacity-30 md:h-36 md:w-36"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
    >
      {/* PCB outline */}
      <rect x="14" y="22" width="72" height="56" rx="2" strokeWidth="1.5" />
      {/* MCU square in centre */}
      <rect x="40" y="42" width="20" height="20" rx="1" strokeWidth="1.5" />
      <circle cx="44" cy="46" r="1" fill="currentColor" />
      {/* Pin headers — top row */}
      {[20, 28, 36, 44, 52, 60, 68, 76].map((x) => (
        <rect key={`ht${x}`} x={x - 1.5} y="18" width="3" height="4" rx="0.5" strokeWidth="1" />
      ))}
      {/* Pin headers — bottom row */}
      {[20, 28, 36, 44, 52, 60, 68, 76].map((x) => (
        <rect key={`hb${x}`} x={x - 1.5} y="78" width="3" height="4" rx="0.5" strokeWidth="1" />
      ))}
      {/* Trace lines */}
      <path d="M14 32 H32 V42" strokeWidth="1" />
      <path d="M86 68 H68 V62" strokeWidth="1" />
      <path d="M40 52 H28 V72" strokeWidth="1" />
      {/* Decoupling cap / LED dots */}
      <circle cx="22" cy="68" r="2" strokeWidth="1" />
      <circle cx="78" cy="32" r="2" strokeWidth="1" />
    </svg>
  );
}

/* Extracted project card with 3D tilt on hover */
function ProjectCard({ project, index }: { project: Project; index?: number }) {
  const num = index !== undefined ? String(index + 1).padStart(2, "0") : "";
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-12px) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (card) card.style.transform = "perspective(800px) rotateY(0) rotateX(0) translateY(0) scale(1)";
  };

  const stopBubble = (e: React.MouseEvent | React.PointerEvent) => {
    // Prevent parent card's tilt/hover handlers from firing while interacting with the link
    e.stopPropagation();
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="h-full"
      style={{ transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1)", transformStyle: "preserve-3d" }}
    >
    <GlassCard
      hover={false}
      className="group relative flex h-full flex-col overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4),0_0_40px_rgba(0,191,255,0.12)] hover:border-accent/20"
    >
      {/* Large project number */}
      {num && (
        <span className="absolute -top-2 right-4 z-0 select-none font-mono text-[5rem] font-bold leading-none text-white/[0.03] transition-colors duration-500 group-hover:text-accent/[0.06]">
          {num}
        </span>
      )}

      {/* Gradient preview — taller for impact */}
      <div
        className={cn(
          "relative mb-4 flex h-52 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br transition-all duration-700 md:h-56",
          categoryGradients[project.category] ?? categoryGradients.other
        )}
      >
        {/* Category-themed minimal glyph (replaces gibberish initials placeholder) */}
        <CategoryGlyph category={project.category} />

        {/* Subtle title-initials watermark in corner — keeps a textual fingerprint without dominating */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-2 left-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/30"
        >
          {projectInitials(project.title)}
        </span>

        {/* Always-visible action icons (top-right) — discoverable without hover.
            stopPropagation prevents the tilt handler from glitching when clicking. */}
        <div className="absolute right-2 top-2 z-20 flex gap-1.5">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={stopBubble}
              onMouseDown={stopBubble}
              aria-label={`${project.title} — GitHub repository`}
              title="View source on GitHub"
              className="flex h-8 w-8 items-center justify-center rounded-md border border-glass-border bg-glass/80 text-text backdrop-blur-md transition-all duration-200 hover:border-accent hover:bg-glass hover:text-accent hover:shadow-[0_0_12px_rgba(0,191,255,0.35)]"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
              </svg>
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={stopBubble}
              onMouseDown={stopBubble}
              aria-label={`${project.title} — live demo`}
              title="Open live demo"
              className="flex h-8 w-8 items-center justify-center rounded-md border border-glass-border bg-glass/80 text-text backdrop-blur-md transition-all duration-200 hover:border-accent hover:bg-glass hover:text-accent hover:shadow-[0_0_12px_rgba(0,191,255,0.35)]"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          )}
        </div>

      </div>

      {/* Category label */}
      <span className="mb-2 inline-block font-mono text-[10px] uppercase tracking-widest text-text-dim">
        {project.category}
      </span>

      <h3 className="mb-2 text-lg font-semibold text-text transition-colors group-hover:text-accent">{project.title}</h3>

      {/* Verification metrics: prominent for DV recruiters */}
      {project.metrics && project.metrics.length > 0 && (
        <div className="mb-3 grid grid-cols-3 gap-1.5 sm:gap-2">
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="min-w-0 rounded-md border border-glass-border bg-glass/40 px-1.5 py-1.5 text-center sm:px-2"
            >
              <div className="font-mono text-sm font-semibold text-accent break-words">{m.value}</div>
              <div className="font-mono text-[9px] uppercase tracking-wide text-text-dim leading-tight mt-0.5 break-words">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-text-muted">{project.description}</p>

      <div className="mt-auto flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-accent/8 px-3 py-1 text-xs text-accent/80">
            {tag}
          </span>
        ))}
      </div>
    </GlassCard>
    </div>
  );
}

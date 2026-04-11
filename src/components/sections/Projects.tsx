"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { projects } from "@/lib/data";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const filters = ["All", "VLSI", "Cloud", "Embedded"] as const;
type Filter = (typeof filters)[number];

const categoryGradients: Record<string, string> = {
  vlsi: "from-purple-500/30 to-blue-500/30",
  cloud: "from-cyan-500/30 to-emerald-500/30",
  embedded: "from-orange-500/30 to-red-500/30",
  web: "from-pink-500/30 to-violet-500/30",
  other: "from-gray-500/30 to-zinc-500/30",
};

export default function Projects() {
  const [active, setActive] = useState<Filter>("All");
  const isMobile = useMediaQuery("(max-width: 768px)");
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
  const sectionHeight = isMobile || !windowWidth ? "auto" : `${totalScrollWidth + windowWidth}px`;

  // Reset scroll to section top when filter changes (desktop only)
  useEffect(() => {
    if (isMobile || !sectionRef.current) return;
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

  // MOBILE: simple vertical layout
  if (isMobile) {
    return (
      <section id="projects" className="relative px-6 py-32">
        <div className="mx-auto max-w-6xl">
          <SectionHeading number="03" title="Featured Projects" />
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
              {filtered.map((project) => (
                <motion.div key={project.id} variants={staggerItem}>
                  <ProjectCard project={project} />
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
            <SectionHeading number="03" title="Featured Projects" />
            <FilterBar active={active} setActive={setActive} />
          </div>
        </div>

        {/* Horizontal track */}
        <div className="flex flex-1 items-center">
          <motion.div
            className="flex gap-6 pl-12 pr-[40vw] lg:pl-24"
            style={{ x }}
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                className="w-[420px] shrink-0"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <ProjectCard project={project} />
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
    <div className="mb-8 flex flex-wrap gap-3">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setActive(f)}
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

/* Extracted project card */
function ProjectCard({ project }: { project: typeof projects[number] }) {
  return (
    <GlassCard
      hover={false}
      className="group h-full overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_50px_rgba(0,191,255,0.15)] hover:border-accent/30"
    >
      {/* Gradient preview */}
      <div
        className={cn(
          "mb-5 flex h-48 items-center justify-center rounded-lg bg-gradient-to-br transition-transform duration-700 group-hover:scale-[1.02]",
          categoryGradients[project.category] ?? categoryGradients.other
        )}
      >
        <span className="text-4xl font-bold text-white/20 transition-all duration-500 group-hover:text-white/40 group-hover:tracking-wider">
          {project.title.split(" ").map((w) => w[0]).join("")}
        </span>
      </div>

      <h3 className="mb-2 text-lg font-semibold text-text">{project.title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-text-muted">{project.description}</p>

      <div className="mb-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-accent/10 px-3 py-1 text-xs text-accent">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-4">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-accent">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
            </svg>
            GitHub
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-accent">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            Live
          </a>
        )}
      </div>
    </GlassCard>
  );
}

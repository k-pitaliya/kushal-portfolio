"use client";

import { useRef, useCallback, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { staggerContainer, staggerItem, blurStagger, blurStaggerItem } from "@/lib/animations";
import { aboutData } from "@/lib/data";
import AnimatedText from "@/components/ui/AnimatedText";
import GlassCard from "@/components/ui/GlassCard";
import Counter from "@/components/ui/Counter";
import SectionHeading from "@/components/ui/SectionHeading";
import DotGrid from "@/components/ui/DotGrid";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = photoRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setTilt({ rotateX: -y * 15, rotateY: x * 15 });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0 });
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative px-6 py-40 md:px-12 lg:px-24 xl:py-48"
    >
      {/* Interactive dot grid background */}
      <DotGrid className="absolute inset-0 h-full w-full opacity-60" />
      <div className="mx-auto max-w-6xl">
        <SectionHeading number="01" title="About Me" />

        <div className="grid gap-12 md:grid-cols-2 md:gap-12 lg:gap-16">
          {/* Photo with 3D tilt */}
          <motion.div style={{ y: photoY }} className="flex justify-center">
            <div
              ref={photoRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative"
              style={{ perspective: 800 }}
            >
              <motion.div
                className="relative h-80 w-72 overflow-hidden rounded-2xl border border-accent/30 shadow-[0_0_40px_rgba(0,191,255,0.15)] md:h-96 md:w-80 lg:h-[28rem] lg:w-96"
                animate={{
                  rotateX: tilt.rotateX,
                  rotateY: tilt.rotateY,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-accent/20 via-bg-secondary to-accent-dark/20">
                  <span className="select-none text-7xl font-bold text-accent/60">
                    KP
                  </span>
                  <span className="mt-2 text-xs font-medium uppercase tracking-[0.25em] text-text-dim">
                    VLSI · DV Engineer
                  </span>
                </div>
                {/* Glow overlay */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-accent/10 to-transparent" />
                {/* Rotating border glow */}
                <div className="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-40"
                  style={{
                    background: "conic-gradient(from 0deg, transparent, rgba(0,191,255,0.4), transparent, rgba(123,104,238,0.3), transparent)",
                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    maskComposite: "exclude",
                    WebkitMaskComposite: "xor",
                    padding: "1.5px",
                    animation: "spin 6s linear infinite",
                  }}
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Description — blur-reveal on scroll */}
          <motion.div
            className="flex flex-col justify-center space-y-6"
            variants={blurStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            {aboutData.description.map((paragraph, i) => (
              <motion.div key={i} variants={blurStaggerItem}>
                <AnimatedText
                  text={paragraph}
                  as="p"
                  mode="words"
                  delay={0}
                  className="text-base leading-relaxed text-text-muted md:text-lg"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-20 md:grid-cols-3 md:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {aboutData.stats.map((stat) => (
            <motion.div key={stat.label} variants={staggerItem}>
              <GlassCard className="flex min-h-[160px] flex-col items-center justify-center text-center md:min-h-[180px]">
                <Counter
                  value={stat.value}
                  suffix="+"
                  className="text-4xl font-bold text-accent md:text-5xl"
                />
                <span className="mt-3 text-sm text-text-muted">
                  {stat.label}
                </span>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

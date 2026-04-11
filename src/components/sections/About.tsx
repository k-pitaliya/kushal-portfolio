"use client";

import { useRef, useCallback, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/animations";
import { aboutData } from "@/lib/data";
import AnimatedText from "@/components/ui/AnimatedText";
import GlassCard from "@/components/ui/GlassCard";
import Counter from "@/components/ui/Counter";
import SectionHeading from "@/components/ui/SectionHeading";

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
      className="relative px-6 py-32 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading number="01" title="About Me" />

        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
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
                className="relative h-80 w-72 overflow-hidden rounded-2xl border border-accent/30 shadow-[0_0_40px_rgba(0,191,255,0.15)] md:h-96 md:w-80"
                animate={{
                  rotateX: tilt.rotateX,
                  rotateY: tilt.rotateY,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent/20 via-bg-secondary to-accent-dark/20">
                  <span className="select-none text-7xl font-bold text-accent/60">
                    KP
                  </span>
                </div>
                {/* Glow overlay */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-accent/10 to-transparent" />
              </motion.div>
            </div>
          </motion.div>

          {/* Description */}
          <div className="flex flex-col justify-center space-y-6">
            {aboutData.description.map((paragraph, i) => (
              <AnimatedText
                key={i}
                text={paragraph}
                as="p"
                mode="words"
                delay={i * 0.15}
                className="text-base leading-relaxed text-text-muted md:text-lg"
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {aboutData.stats.map((stat) => (
            <motion.div key={stat.label} variants={staggerItem}>
              <GlassCard className="flex flex-col items-center py-8 text-center">
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

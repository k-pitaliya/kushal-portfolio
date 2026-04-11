"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Download, FolderOpen } from "lucide-react";
import { motion as m } from "framer-motion";
import Scene from "@/components/three/Scene";
import MagneticButton from "@/components/ui/MagneticButton";
import MeshGradient from "@/components/ui/MeshGradient";
import ScrollVelocityText from "@/components/ui/ScrollVelocityText";
import { staggerContainer, staggerItem, fadeUp } from "@/lib/animations";

const skillBadges = [
  "SystemVerilog",
  "UVM",
  "AWS",
  "FPGA",
  "Terraform",
  "RTL Design",
  "Serverless",
  "Python",
];

const firstName = "KUSHAL";
const lastName = "PITALIYA";

export default function Hero() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const renderLetters = (text: string, baseDelay: number) =>
    text.split("").map((char, i) => (
      <m.span
        key={`${text}-${i}`}
        className="inline-block"
        initial={{ y: "120%", opacity: 0 }}
        animate={ready ? { y: "0%", opacity: 1 } : {}}
        transition={{
          duration: 0.6,
          delay: baseDelay + i * 0.04,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {char === " " ? "\u00A0" : char}
      </m.span>
    ));

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* 3D particle background */}
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      {/* Mesh gradient atmosphere */}
      <div className="absolute inset-0 z-[0]">
        <MeshGradient opacity={0.12} />
      </div>

      {/* Gradient overlays for readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-bg/60 via-transparent to-bg" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-bg/40 via-transparent to-bg/40" />

      {/* Content */}
      <motion.div
        className="relative z-10 mx-auto max-w-6xl px-6 text-center"
        variants={staggerContainer}
        initial="hidden"
        animate={ready ? "visible" : "hidden"}
      >
        {/* Mono label */}
        <motion.div
          className="mb-6 flex items-center justify-center gap-3"
          variants={staggerItem}
        >
          <span className="h-[1px] w-8 bg-accent/60" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
            VLSI Design Verification · Cloud Architecture
          </span>
          <span className="h-[1px] w-8 bg-accent/60" />
        </motion.div>

        {/* Large name — two lines for visual weight */}
        <div className="overflow-hidden">
          <motion.h1
            className="flex flex-col items-center gap-0 leading-[0.9]"
            variants={staggerItem}
          >
            <span className="inline-block text-5xl font-bold tracking-tight text-text sm:text-7xl md:text-9xl lg:text-[10rem]">
              {renderLetters(firstName, 0.4)}
            </span>
            <span className="inline-block text-5xl font-bold tracking-tight sm:text-7xl md:text-9xl lg:text-[10rem]">
              {lastName.split("").map((char, i) => (
                <m.span
                  key={`last-${i}`}
                  className="inline-block text-shimmer"
                  style={{
                    background: "linear-gradient(110deg, var(--color-accent) 45%, #fff 50%, var(--color-accent) 55%)",
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "shimmer 3s ease-in-out infinite",
                  }}
                  initial={{ y: "120%", opacity: 0 }}
                  animate={ready ? { y: "0%", opacity: 1 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.7 + i * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {char}
                </m.span>
              ))}
            </span>
          </motion.h1>
        </div>

        {/* Bold statement tagline */}
        <ScrollVelocityText skewFactor={0.6}>
          <motion.p
            className="mt-8 text-lg font-light tracking-wide text-text-muted sm:text-xl md:text-2xl"
            variants={staggerItem}
          >
            I design <span className="font-medium text-text">silicon</span> and architect the{" "}
            <span className="font-medium text-text">cloud</span>
          </motion.p>
        </ScrollVelocityText>

        {/* Sub-tagline */}
        <motion.p
          className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-text-dim sm:text-base"
          variants={staggerItem}
        >
          VLSI Design & Verification · AWS Cloud Architecture · FPGA Prototyping
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          variants={staggerItem}
        >
          <MagneticButton>
            <a
              href="#projects"
              className="group flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold text-bg transition-all duration-300 hover:bg-accent-dark hover:shadow-[0_0_40px_rgba(0,191,255,0.3)]"
            >
              <FolderOpen className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
              View Projects
            </a>
          </MagneticButton>

          <MagneticButton>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full border border-glass-border bg-glass px-8 py-3.5 text-sm font-semibold text-text transition-all duration-300 hover:border-accent/50 hover:text-accent hover:shadow-[0_0_30px_rgba(0,191,255,0.1)]"
            >
              <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              Resume
            </a>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Skill badges — clean horizontal strip */}
      <motion.div
        className="absolute bottom-24 left-1/2 z-10 -translate-x-1/2 sm:bottom-28"
        initial="hidden"
        animate={ready ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08, delayChildren: 2 } },
        }}
      >
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {skillBadges.map((badge) => (
            <motion.span
              key={badge}
              className="rounded-full border border-glass-border bg-glass/60 px-3.5 py-1.5 font-mono text-[11px] text-text-muted/70 backdrop-blur-sm transition-colors duration-300 hover:border-accent/40 hover:text-accent/80"
              variants={{
                hidden: { opacity: 0, y: 12, filter: "blur(4px)" },
                visible: { opacity: 1, y: 0, filter: "blur(0px)" },
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {badge}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        variants={fadeUp}
        initial="hidden"
        animate={ready ? "visible" : "hidden"}
        transition={{ delay: 2.5 }}
      >
        <motion.div
          className="flex h-8 w-5 items-start justify-center rounded-full border border-text-dim/50 p-1"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 0.5 } : {}}
          transition={{ delay: 2.5 }}
        >
          <motion.div
            className="h-1.5 w-1 rounded-full bg-accent"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
        <motion.span
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-dim/60"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ delay: 2.7 }}
        >
          Scroll
        </motion.span>
      </motion.div>
    </section>
  );
}

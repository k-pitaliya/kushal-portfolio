"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Download, FolderOpen } from "lucide-react";
import Scene from "@/components/three/Scene";
import MagneticButton from "@/components/ui/MagneticButton";
import { staggerContainer, staggerItem, fadeUp } from "@/lib/animations";

const m = motion;

const typewriterRoles = [
  "VLSI Design Verification Engineer",
  "AWS Cloud Architect",
  "FPGA Prototyping Specialist",
  "RTL Design Engineer",
  "SystemVerilog & UVM Expert",
];

/* Each badge is hand-placed to form a loose constellation around the hero.
   Varying opacity + size creates depth; staggered float speeds feel organic. */
const floatingBadges = [
  // ── Left arc ──
  { label: "SystemVerilog", pos: "top-[15%] left-[7%]",   opacity: 0.55, size: "text-xs",     drift: -8,  speed: 4.2 },
  { label: "FPGA",          pos: "top-[42%] left-[3%]",   opacity: 0.35, size: "text-[10px]", drift: -5,  speed: 5.4 },
  { label: "Terraform",     pos: "top-[68%] left-[6%]",   opacity: 0.4,  size: "text-[11px]", drift: -6,  speed: 4.8 },
  // ── Right arc ──
  { label: "UVM",            pos: "top-[17%] right-[6%]",  opacity: 0.5,  size: "text-xs",     drift: -7,  speed: 4.5 },
  { label: "AWS",            pos: "top-[44%] right-[4%]",  opacity: 0.45, size: "text-[11px]", drift: -9,  speed: 3.8 },
  { label: "RTL Design",    pos: "top-[70%] right-[5%]",  opacity: 0.35, size: "text-[10px]", drift: -5,  speed: 5.6 },
  // ── Accent floaters (wider, fill the gaps) ──
  { label: "Python",        pos: "top-[28%] left-[12%]",  opacity: 0.25, size: "text-[10px]", drift: -4,  speed: 6.0 },
  { label: "Serverless",    pos: "top-[56%] right-[11%]", opacity: 0.25, size: "text-[10px]", drift: -4,  speed: 5.8 },
];

const firstName = "KUSHAL";
const lastName = "PITALIYA";

export default function Hero() {
  const [ready, setReady] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-driven parallax — hero fades/rises/shrinks as you scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
  const badgeOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const currentRole = typewriterRoles[roleIndex];
    const speed = isDeleting ? 30 : 60;

    if (!isDeleting && displayText === currentRole) {
      const pause = setTimeout(() => setIsDeleting(true), 2200);
      return () => clearTimeout(pause);
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % typewriterRoles.length);
      return;
    }

    const timer = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentRole.substring(0, displayText.length - 1)
          : currentRole.substring(0, displayText.length + 1)
      );
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

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
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* 3D particle background */}
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      {/* Single clean gradient — no competing layers */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-bg/50 via-bg/20 to-bg" />

      {/* Content — scroll parallax */}
      <motion.div
        className="relative z-10 mx-auto max-w-6xl px-6 text-center"
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
      >
        <motion.div
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
            Open to VLSI & Cloud roles · 2026
          </span>
          <span className="h-[1px] w-8 bg-accent/60" />
        </motion.div>

        {/* Large name — two lines for visual weight */}
        <div className="overflow-hidden">
          <motion.h1
            className="flex flex-col items-center gap-0 leading-[0.9]"
            variants={staggerItem}
          >
            <span className="inline-block text-6xl font-bold tracking-tighter text-text sm:text-8xl md:text-9xl lg:text-[11rem]">
              {renderLetters(firstName, 0.4)}
            </span>
            <span className="inline-block text-6xl font-bold tracking-tighter sm:text-8xl md:text-9xl lg:text-[11rem]">
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

        {/* Tagline */}
          <motion.p
            className="mt-10 text-lg font-light tracking-wide text-text-muted sm:text-xl md:text-2xl"
            variants={staggerItem}
          >
            I design <span className="font-medium text-text">silicon</span> and architect the{" "}
            <span className="font-medium text-text">cloud</span>
          </motion.p>

        {/* Typewriter role cycling */}
        <motion.div
          className="mx-auto mt-4 flex h-7 max-w-lg items-center justify-center"
          variants={staggerItem}
        >
          <span className="font-mono text-sm tracking-wide text-text-dim sm:text-base">
            {displayText}
          </span>
          <motion.span
            className="ml-0.5 inline-block h-[18px] w-[2px] bg-accent"
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.6, repeatType: "reverse" as const }}
          />
        </motion.div>

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
      </motion.div>

      {/* Floating badges — fade on scroll */}
      <motion.div style={{ opacity: badgeOpacity }}>
      {floatingBadges.map((badge, i) => (
        <motion.span
          key={badge.label}
          className={`absolute z-10 hidden rounded-full border border-glass-border bg-glass px-3 py-1.5 font-mono ${badge.size} text-text-muted backdrop-blur-sm lg:inline-block ${badge.pos}`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            ready
              ? {
                  opacity: badge.opacity,
                  scale: 1,
                  y: [0, badge.drift, 0],
                }
              : {}
          }
          transition={{
            opacity: { delay: 1.8 + i * 0.12, duration: 0.8 },
            scale: { delay: 1.8 + i * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            y: {
              repeat: Infinity,
              duration: badge.speed,
              ease: "easeInOut",
              delay: 2.2 + i * 0.25,
            },
          }}
        >
          {badge.label}
        </motion.span>
      ))}
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

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Download, FolderOpen, Mouse } from "lucide-react";
import { motion as m } from "framer-motion";
import Scene from "@/components/three/Scene";
import MagneticButton from "@/components/ui/MagneticButton";
import MeshGradient from "@/components/ui/MeshGradient";
import ScrollVelocityText from "@/components/ui/ScrollVelocityText";
import { staggerContainer, staggerItem, fadeUp } from "@/lib/animations";

const skillBadges = [
  "SystemVerilog",
  "AWS",
  "Docker",
  "STM32",
  "Python",
  "FPGA",
];

const nameText = "KUSHAL PITALIYA";
const subtitleParts = ["Engineer", "VLSI", "Cloud", "Embedded"];

export default function Hero() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Delay entrance until preloader is likely done
    const timer = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
        {/* Intro line with typewriter feel */}
        <motion.p
          className="mb-4 font-mono text-sm tracking-[0.3em] text-accent sm:text-base"
          variants={staggerItem}
        >
          <motion.span
            animate={ready ? {
              textShadow: [
                "0 0 4px rgba(0,191,255,0.2)",
                "0 0 20px rgba(0,191,255,0.5)",
                "0 0 4px rgba(0,191,255,0.2)",
              ],
            } : {}}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          >
            {"Hello, I'm".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={ready ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.1 }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
          <motion.span
            className="ml-1 inline-block"
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, repeatType: "reverse" }}
          >
            |
          </motion.span>
        </motion.p>

        {/* Large name with clean letter-by-letter stagger */}
        <div className="overflow-hidden">
          <motion.h1
            className="flex flex-wrap justify-center"
            variants={staggerItem}
          >
            <span className="inline-block text-5xl font-bold leading-tight tracking-tight text-text sm:text-7xl md:text-8xl lg:text-9xl">
              {nameText.split("").map((char, i) => (
                <m.span
                  key={i}
                  className="inline-block"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={ready ? { y: "0%", opacity: 1 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.6 + i * 0.035,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </m.span>
              ))}
            </span>
          </motion.h1>
        </div>

        {/* Subtitle with gradient + scroll velocity skew */}
        <ScrollVelocityText skewFactor={0.6}>
          <motion.p
            className="mt-6 text-lg font-medium tracking-wide sm:text-xl md:text-2xl"
            variants={staggerItem}
          >
            {subtitleParts.map((part, i) => (
              <span key={part}>
                {i > 0 && (
                  <span className="mx-2 text-text-dim sm:mx-3">·</span>
                )}
                <span className="gradient-text">{part}</span>
              </span>
            ))}
          </motion.p>
        </ScrollVelocityText>

        {/* Tagline */}
        <motion.p
          className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-text-muted sm:text-base"
          variants={staggerItem}
        >
          Building the future at the intersection of hardware and software —
          from silicon to the cloud.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          variants={staggerItem}
        >
          <MagneticButton>
            <a
              href="#projects"
              className="group flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-bg transition-all duration-300 hover:bg-accent-dark hover:shadow-[0_0_30px_rgba(0,191,255,0.3)]"
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
              className="group flex items-center gap-2 rounded-full border border-glass-border px-7 py-3 text-sm font-semibold text-text transition-all duration-300 hover:border-accent hover:text-accent"
            >
              <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              Download Resume
            </a>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Floating skill badges */}
      {skillBadges.map((badge, i) => {
        const positions = [
          "top-[18%] left-[5%]",
          "top-[25%] right-[6%]",
          "top-[55%] left-[3%]",
          "top-[60%] right-[4%]",
          "bottom-[22%] left-[8%]",
          "bottom-[18%] right-[7%]",
        ];

        return (
          <motion.span
            key={badge}
            className={`absolute z-10 hidden rounded-full border border-glass-border bg-glass px-3 py-1.5 font-mono text-xs text-text-muted backdrop-blur-sm lg:inline-block ${positions[i]}`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              ready
                ? {
                    opacity: 0.7,
                    scale: 1,
                    y: [0, -8, 0],
                  }
                : {}
            }
            transition={{
              opacity: { delay: 1.5 + i * 0.15, duration: 0.5 },
              scale: { delay: 1.5 + i * 0.15, duration: 0.5 },
              y: {
                repeat: Infinity,
                duration: 3 + i * 0.5,
                ease: "easeInOut",
                delay: 2 + i * 0.3,
              },
            }}
          >
            {badge}
          </motion.span>
        );
      })}

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
        variants={fadeUp}
        initial="hidden"
        animate={ready ? "visible" : "hidden"}
        transition={{ delay: 2.5 }}
      >
        <motion.div
          className="flex h-8 w-5 items-start justify-center rounded-full border border-text-dim p-1"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 0.6 } : {}}
          transition={{ delay: 2.5 }}
        >
          <motion.div
            className="h-1.5 w-1 rounded-full bg-accent"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
        <motion.span
          className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-text-dim"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 0.5 } : {}}
          transition={{ delay: 2.7 }}
        >
          Scroll
          <motion.span
            animate={{ y: [0, 3, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ChevronDown className="h-3 w-3" />
          </motion.span>
        </motion.span>
      </motion.div>
    </section>
  );
}

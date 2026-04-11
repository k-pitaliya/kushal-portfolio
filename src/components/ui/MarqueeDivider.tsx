"use client";

import { motion } from "framer-motion";

interface MarqueeDividerProps {
  text: string;
  speed?: number;
}

export default function MarqueeDivider({ text, speed = 25 }: MarqueeDividerProps) {
  const repeated = Array.from({ length: 8 }, () => text).join(" \u00b7 ");

  return (
    <div className="relative overflow-hidden py-8" aria-hidden="true">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />

      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        <span className="pr-8 font-mono text-sm uppercase tracking-[0.35em] text-text-dim/40">
          {repeated}
        </span>
        <span className="pr-8 font-mono text-sm uppercase tracking-[0.35em] text-text-dim/40">
          {repeated}
        </span>
      </motion.div>
    </div>
  );
}

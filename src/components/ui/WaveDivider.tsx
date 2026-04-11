"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WaveDividerProps {
  position?: "top" | "bottom";
  color?: string;
  className?: string;
}

export default function WaveDivider({
  position = "bottom",
  color = "var(--color-bg-secondary)",
  className,
}: WaveDividerProps) {
  const isTop = position === "top";

  return (
    <div
      className={cn(
        "pointer-events-none absolute left-0 right-0 z-[2] overflow-hidden",
        isTop ? "top-0 -translate-y-[99%]" : "bottom-0 translate-y-[99%]",
        className
      )}
      style={{ height: "80px" }}
    >
      <motion.svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className={cn("block h-full w-full", isTop && "rotate-180")}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.path
          d="M0,40 C240,10 480,70 720,40 C960,10 1200,70 1440,40 L1440,80 L0,80 Z"
          fill={color}
          animate={{
            d: [
              "M0,40 C240,10 480,70 720,40 C960,10 1200,70 1440,40 L1440,80 L0,80 Z",
              "M0,50 C240,70 480,20 720,50 C960,70 1200,20 1440,50 L1440,80 L0,80 Z",
              "M0,40 C240,10 480,70 720,40 C960,10 1200,70 1440,40 L1440,80 L0,80 Z",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        {/* Second wave layer for depth */}
        <motion.path
          d="M0,50 C360,20 720,70 1080,40 C1260,30 1380,60 1440,50 L1440,80 L0,80 Z"
          fill={color}
          fillOpacity={0.5}
          animate={{
            d: [
              "M0,50 C360,20 720,70 1080,40 C1260,30 1380,60 1440,50 L1440,80 L0,80 Z",
              "M0,40 C360,60 720,30 1080,55 C1260,60 1380,35 1440,45 L1440,80 L0,80 Z",
              "M0,50 C360,20 720,70 1080,40 C1260,30 1380,60 1440,50 L1440,80 L0,80 Z",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </div>
  );
}

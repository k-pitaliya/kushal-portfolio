"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealMaskProps {
  children: React.ReactNode;
  className?: string;
  direction?: "center" | "left" | "right" | "bottom";
}

export default function RevealMask({
  children,
  className,
  direction = "center",
}: RevealMaskProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "start 35%"],
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const clipPath = useTransform(progress, (v: number) => {
    switch (direction) {
      case "left":
        return `inset(0 ${100 - v}% 0 0)`;
      case "right":
        return `inset(0 0 0 ${100 - v}%)`;
      case "bottom":
        return `inset(0 0 ${100 - v}% 0)`;
      case "center":
      default: {
        const offset = (100 - v) / 2;
        return `inset(${offset}% ${offset}% ${offset}% ${offset}%)`;
      }
    }
  });

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={{ clipPath }}>{children}</motion.div>
    </div>
  );
}

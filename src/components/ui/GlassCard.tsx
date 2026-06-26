"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  /** Aurora hue for the hover glow. */
  glow?: "indigo" | "cyan" | "teal" | "magenta";
}

const glowMap: Record<NonNullable<GlassCardProps["glow"]>, string> = {
  indigo: "rgba(110,91,255,0.22)",
  cyan: "rgba(43,217,255,0.20)",
  teal: "rgba(47,230,184,0.20)",
  magenta: "rgba(255,95,200,0.20)",
};

/**
 * GlassCard — frosted panel with an aurora refraction edge that brightens on
 * hover, lifting gently. The canonical surface for the Aurora × Silicon look.
 */
export default function GlassCard({
  children,
  className,
  hover = true,
  glow = "indigo",
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "glass glass-edge rounded-2xl p-6",
        className
      )}
      whileHover={
        hover
          ? {
              y: -6,
              boxShadow: `0 0 0 1px ${glowMap[glow]}, 0 18px 50px rgba(3,2,10,0.55), 0 0 44px ${glowMap[glow]}, inset 0 1px 0 rgba(255,255,255,0.1)`,
            }
          : undefined
      }
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}

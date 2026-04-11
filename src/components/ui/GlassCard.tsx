"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className,
  hover = true,
}: GlassCardProps) {
  return (
    <motion.div
      className={cn("glass gradient-border card-shine rounded-xl p-6", className)}
      whileHover={
        hover
          ? {
              y: -6,
              boxShadow:
                "0 0 30px rgba(0,191,255,0.12), 0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
              borderColor: "rgba(0,191,255,0.2)",
            }
          : undefined
      }
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

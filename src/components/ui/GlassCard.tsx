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
      className={cn("glass gradient-border rounded-xl p-6", className)}
      whileHover={
        hover
          ? {
              scale: 1.02,
              boxShadow:
                "0 0 30px rgba(0,191,255,0.15), 0 0 60px rgba(0,191,255,0.08)",
            }
          : undefined
      }
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

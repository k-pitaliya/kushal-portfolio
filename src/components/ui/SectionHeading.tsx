"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/animations";

interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle?: string;
  className?: string;
  icon?: LucideIcon;
  align?: "left" | "center";
}

/**
 * SectionHeading — v2.
 *
 * Drops the giant background number watermark. Number now lives as a small
 * mono label above the title, code-comment style: "// 02 — section name".
 * Subtle, scannable, doesn't compete with content.
 */
export default function SectionHeading({
  number,
  title,
  subtitle,
  className,
  icon: Icon,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={cn("relative mb-10 md:mb-14", alignment, className)}>
      {/* Number + accent line */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={cn(
          "mb-4 flex items-center gap-3",
          align === "center" && "justify-center"
        )}
      >
        <span className="h-px w-6 bg-accent/60" aria-hidden="true" />
        <span className="text-mono-xs text-accent">
          {number} / {title.split(" ")[0]}
        </span>
      </motion.div>

      {/* Title row — optional icon, then h2 */}
      <div
        className={cn(
          "flex items-center gap-3 md:gap-4",
          align === "center" && "justify-center"
        )}
      >
        {Icon && (
          <motion.div
            className="shrink-0 text-accent"
            style={{ filter: "drop-shadow(0 0 6px rgba(0,191,255,0.35))" }}
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Icon
              aria-hidden="true"
              strokeWidth={1.75}
              className="h-6 w-6 md:h-7 md:w-7"
            />
          </motion.div>
        )}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-display-lg text-text"
        >
          {title}
        </motion.h2>
      </div>

      {subtitle && (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={cn(
            "mt-4 max-w-2xl text-sm text-text-muted md:text-base",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

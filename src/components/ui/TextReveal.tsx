"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  /** Reveal unit. */
  by?: "word" | "char";
  delay?: number;
  stagger?: number;
  once?: boolean;
}

/**
 * TextReveal — masked line/word/char reveal on scroll. Each unit sits in an
 * overflow-hidden clip and rises into view, staggered. Falls back to plain text
 * under reduced motion. The accessible string is exposed via aria-label.
 */
export default function TextReveal({
  text,
  className,
  by = "word",
  delay = 0,
  stagger = 0.05,
  once = true,
}: TextRevealProps) {
  const reduce = useReducedMotion();
  if (reduce) return <span className={className}>{text}</span>;

  const units = by === "char" ? Array.from(text) : text.split(" ");

  return (
    <span className={cn("inline-block", className)} aria-label={text}>
      {units.map((u, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden align-bottom"
          style={{ paddingBottom: "0.14em", marginBottom: "-0.14em" }}
        >
          <motion.span
            className="inline-block whitespace-pre"
            initial={{ y: "115%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: delay + i * stagger }}
          >
            {u}
            {by === "word" && i < units.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

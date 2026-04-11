"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp } from "@/lib/animations";
import AnimatedText from "./AnimatedText";

interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionHeading({
  number,
  title,
  subtitle,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("relative mb-16", className)}>
      {/* Large background number */}
      <motion.span
        className="pointer-events-none absolute -top-8 left-0 select-none font-mono text-[8rem] font-bold leading-none text-transparent md:text-[10rem]"
        style={{ WebkitTextStroke: "1px rgba(255,255,255,0.05)" }}
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {number}
      </motion.span>

      {/* Accent left border + heading */}
      <div className="relative flex items-start gap-4">
        <motion.div
          className="mt-1 h-12 w-1 shrink-0 rounded-full bg-accent"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          style={{ originY: 0 }}
        />

        <div>
          <AnimatedText
            text={title}
            as="h2"
            mode="words"
            className="text-3xl font-bold text-text md:text-4xl lg:text-5xl"
          />

          {subtitle && (
            <motion.p
              className="mt-3 max-w-xl text-base text-text-muted md:text-lg"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
}

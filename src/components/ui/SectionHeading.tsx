"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { fadeUp, blurReveal } from "@/lib/animations";
import AnimatedText from "./AnimatedText";

interface SectionHeadingProps {
  number: string;
  title: string;
  subtitle?: string;
  className?: string;
  icon?: LucideIcon;
}

export default function SectionHeading({
  number,
  title,
  subtitle,
  className,
  icon: Icon,
}: SectionHeadingProps) {
  return (
    <div className={cn("relative mb-12 md:mb-16 lg:mb-20", className)}>
      {/* Subtle background number — peeks behind heading, doesn't compete */}
      <motion.span
        className="pointer-events-none absolute -top-6 -left-2 select-none font-mono text-[5rem] font-bold leading-none text-transparent md:-top-8 md:text-[7rem] lg:text-[9rem]"
        style={{ WebkitTextStroke: "1px rgba(255,255,255,0.05)" }}
        variants={blurReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {number}
      </motion.span>

      {/* Accent left border + heading */}
      <div className="relative flex items-start gap-4 md:gap-5 lg:gap-6">
        <motion.div
          className="mt-1.5 h-10 w-1 shrink-0 rounded-full bg-accent md:h-12 lg:h-16"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
          style={{ originY: 0 }}
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-3 md:gap-4">
            {Icon && (
              <motion.div
                className="shrink-0 text-accent"
                style={{ filter: "drop-shadow(0 0 6px rgba(0,191,255,0.4))" }}
                variants={blurReveal}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.75}
                  className="h-5 w-5 md:h-6 md:w-6"
                />
              </motion.div>
            )}
            <AnimatedText
              text={title}
              as="h2"
              mode="words"
              className="text-4xl font-bold tracking-tight text-text md:text-5xl lg:text-7xl"
            />
          </div>

          {subtitle && (
            <motion.p
              className="mt-5 max-w-xl text-sm text-text-muted md:mt-6 md:text-lg"
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

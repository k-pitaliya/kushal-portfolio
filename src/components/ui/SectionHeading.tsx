"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, blurReveal } from "@/lib/animations";
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
    <div className={cn("relative mb-12 md:mb-16 lg:mb-20", className)}>
      {/* Large background number — bigger for premium feel */}
      <motion.span
        className="pointer-events-none absolute -top-10 left-0 select-none font-mono text-[8rem] font-bold leading-none text-transparent md:-top-14 md:text-[12rem] lg:text-[16rem]"
        style={{ WebkitTextStroke: "1px rgba(255,255,255,0.04)" }}
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

        <div>
          <AnimatedText
            text={title}
            as="h2"
            mode="words"
            className="text-4xl font-bold tracking-tight text-text md:text-5xl lg:text-7xl"
          />

          {subtitle && (
            <motion.p
              className="mt-5 max-w-xl text-base text-text-muted md:mt-6 md:text-lg"
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

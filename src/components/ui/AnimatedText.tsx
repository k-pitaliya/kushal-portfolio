"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { letterStagger, letter, textReveal } from "@/lib/animations";

const motionComponents = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  p: motion.p,
  span: motion.span,
} as const;

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type TextTag = "p" | "span";
type Tag = HeadingTag | TextTag;

interface AnimatedTextProps {
  text: string;
  className?: string;
  as?: Tag;
  mode?: "words" | "letters";
  delay?: number;
  once?: boolean;
}

export default function AnimatedText({
  text,
  className,
  as: Tag = "p",
  mode = "words",
  delay = 0,
  once = true,
}: AnimatedTextProps) {
  const MotionTag = motionComponents[Tag];

  if (mode === "letters") {
    return (
      <MotionTag
        className={cn("flex flex-wrap", className)}
        variants={letterStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin: "-100px" }}
        transition={{ delayChildren: delay }}
      >
        {text.split("").map((char, i) => (
          <motion.span
            key={`${char}-${i}`}
            variants={letter}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </MotionTag>
    );
  }

  // Words mode — each word slides up behind a clip mask
  const words = text.split(" ");

  return (
    <MotionTag
      className={cn("flex flex-wrap gap-x-[0.3em]", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-100px" }}
      transition={{ staggerChildren: 0.08, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="clip-text">
          <motion.span className="inline-block" variants={textReveal}>
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

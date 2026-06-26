"use client";

import { useEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useTransform,
  useReducedMotion,
  animate,
  motion,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface CounterProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export default function Counter({
  value,
  suffix = "",
  duration = 2,
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (!isInView) return;

    // Respect reduced-motion: skip the decorative count-up. The final value is
    // already rendered as the initial text, so there's nothing to do here.
    if (prefersReducedMotion) return;

    const controls = animate(motionValue, value, {
      duration,
      ease: "easeOut",
    });

    return controls.stop;
  }, [isInView, prefersReducedMotion, motionValue, value, duration]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${latest}${suffix}`;
      }
    });

    return unsubscribe;
  }, [rounded, suffix]);

  return (
    <motion.span ref={ref} className={cn("tabular-nums", className)}>
      {value}
      {suffix}
    </motion.span>
  );
}

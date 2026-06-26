"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticProps {
  children: React.ReactNode;
  /** 0–1 — how strongly the element is pulled toward the cursor. */
  strength?: number;
  className?: string;
}

/**
 * Magnetic — wraps an interactive element so it drifts toward the cursor while
 * hovered and springs back on leave. Pointer-only; static under reduced motion.
 */
export default function Magnetic({ children, strength = 0.35, className }: MagneticProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.5 });

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  if (reduce) return <div className={cn("inline-flex", className)}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn("inline-flex", className)}
    >
      {children}
    </motion.div>
  );
}

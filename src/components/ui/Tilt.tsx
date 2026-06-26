"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltProps {
  children: React.ReactNode;
  className?: string;
  /** Max rotation in degrees. */
  max?: number;
}

/**
 * Tilt — 3D pointer tilt with a moving specular glare. Wrap a card; it rotates
 * subtly toward the cursor and a soft highlight tracks the pointer. Pointer-only;
 * renders a plain box under reduced motion.
 */
export default function Tilt({ children, className, max = 7 }: TiltProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 150, damping: 20 });
  const sy = useSpring(py, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(sy, [0, 1], [max, -max]);
  const rotateY = useTransform(sx, [0, 1], [-max, max]);
  const gx = useTransform(sx, [0, 1], ["0%", "100%"]);
  const gy = useTransform(sy, [0, 1], ["0%", "100%"]);
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.12), transparent 50%)`;

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function reset() {
    px.set(0.5);
    py.set(0.5);
  }

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      className={cn("relative", className)}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ background: glare }}
      />
    </motion.div>
  );
}

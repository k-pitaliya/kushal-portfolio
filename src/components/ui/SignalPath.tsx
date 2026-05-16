"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * SignalPath — animated SVG line weaving down the right gutter.
 *
 * IMPORTANT: All hooks are called unconditionally at the top of the
 * component, BEFORE any early returns. Calling hooks conditionally (inside
 * a .map() that only renders after state update) caused React error #310
 * in production. Don't refactor the hooks back into a loop.
 */

const NODE_POSITIONS = [0.05, 0.25, 0.45, 0.65, 0.85];

export default function SignalPath() {
  const [mounted, setMounted] = useState(false);
  const [vh, setVh] = useState(800);
  const { scrollYProgress } = useScroll();

  // Five fixed useTransform calls — same number every render, no loop.
  const node0 = useTransform(scrollYProgress, [0, 0.05, 0.1], [0.2, 1, 0.4]);
  const node1 = useTransform(scrollYProgress, [0.2, 0.25, 0.3], [0.2, 1, 0.4]);
  const node2 = useTransform(scrollYProgress, [0.4, 0.45, 0.5], [0.2, 1, 0.4]);
  const node3 = useTransform(scrollYProgress, [0.6, 0.65, 0.7], [0.2, 1, 0.4]);
  const node4 = useTransform(scrollYProgress, [0.8, 0.85, 0.9], [0.2, 1, 0.4]);

  useEffect(() => {
    setMounted(true);
    const update = () => setVh(window.innerHeight);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  // Server + first client render both return null. After useEffect fires,
  // mounted becomes true and the SVG renders. No hydration mismatch.
  if (!mounted) return null;

  const nodes = [node0, node1, node2, node3, node4];
  const pathD = `M24 0 Q 12 ${vh * 0.15}, 24 ${vh * 0.3} T 24 ${vh * 0.6} Q 36 ${vh * 0.75}, 24 ${vh * 0.9} L 24 ${vh}`;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-y-0 right-4 z-[2] hidden w-12 lg:block xl:right-8"
    >
      <svg
        viewBox={`0 0 48 ${vh}`}
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
        fill="none"
      >
        {/* Background trace — full path at low opacity */}
        <path
          d={pathD}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="3 5"
        />

        {/* Active trace — reveals as you scroll */}
        <motion.path
          d={pathD}
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ pathLength: scrollYProgress }}
          opacity={0.7}
        />

        {/* Node markers — five fixed positions, each with its own opacity hook */}
        {NODE_POSITIONS.map((y, i) => (
          <motion.circle
            key={y}
            cx={24}
            cy={vh * y}
            r={3}
            fill="var(--color-accent)"
            style={{ opacity: nodes[i] }}
          />
        ))}
      </svg>
    </div>
  );
}

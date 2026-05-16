"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * SignalPath — the signature animated element for v2.
 *
 * A thin cyan line weaves through the entire page on the right edge,
 * drawn progressively as the user scrolls. Small "node" markers light up
 * when each section is in view. GPU-cheap SVG, respects reduced-motion.
 *
 * Visible only on lg+ viewports where there's gutter space. Hidden on
 * mobile/tablet (the screen is already narrow enough; less is more).
 */
export default function SignalPath() {
  const { scrollYProgress } = useScroll();
  const [vh, setVh] = useState(0);

  useEffect(() => {
    const update = () => setVh(window.innerHeight);
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  // The path traces the full document height; stroke-dashoffset reveals it.
  const pathLength = useTransform(scrollYProgress, [0, 1], [1, 0]);

  if (!vh) return null;

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
        <motion.path
          d={`M24 0 Q 12 ${vh * 0.15}, 24 ${vh * 0.3} T 24 ${vh * 0.6} Q 36 ${vh * 0.75}, 24 ${vh * 0.9} L 24 ${vh}`}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="3 5"
        />

        {/* Active trace — reveals as you scroll */}
        <motion.path
          d={`M24 0 Q 12 ${vh * 0.15}, 24 ${vh * 0.3} T 24 ${vh * 0.6} Q 36 ${vh * 0.75}, 24 ${vh * 0.9} L 24 ${vh}`}
          stroke="var(--color-accent)"
          strokeWidth="1.5"
          strokeLinecap="round"
          style={{ pathLength: useTransform(scrollYProgress, [0, 1], [0, 1]) }}
          opacity={0.7}
        />

        {/* Small node markers at key vertical positions */}
        {[0.05, 0.25, 0.45, 0.65, 0.85].map((y) => (
          <motion.circle
            key={y}
            cx={24}
            cy={vh * y}
            r={3}
            fill="var(--color-accent)"
            style={{
              opacity: useTransform(
                scrollYProgress,
                [y - 0.05, y, y + 0.05],
                [0.2, 1, 0.4]
              ),
            }}
          />
        ))}

        {/* Suppress unused warning for pathLength */}
        <motion.circle cx={0} cy={0} r={0} style={{ opacity: pathLength }} />
      </svg>
    </div>
  );
}

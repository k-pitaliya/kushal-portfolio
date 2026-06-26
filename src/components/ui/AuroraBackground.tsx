"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * AuroraBackground — the signature atmosphere.
 *
 *   1. deep-midnight base fill
 *   2. drifting aurora blobs (teal-green included, to dodge the SaaS cliché)
 *      that also parallax toward the pointer for depth
 *   3. an animated "signal trace" — the design-verification motif
 *   4. fine film grain + vignette for legibility
 *
 * GPU-cheap (transforms + opacity), pointer-only parallax, reduced-motion aware.
 */
export default function AuroraBackground() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 40, damping: 20, mass: 1 });
  const y = useSpring(my, { stiffness: 40, damping: 20, mass: 1 });

  useEffect(() => {
    if (reduce) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 36);
      my.set((e.clientY / window.innerHeight - 0.5) * 36);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* base */}
      <div className="absolute inset-0 bg-bg" />

      {/* aurora blobs — drift + pointer parallax */}
      <motion.div className="absolute inset-0" style={{ x, y }}>
        <div
          className="absolute -left-[10%] -top-[15%] h-[70vmax] w-[70vmax] rounded-full opacity-[0.55] blur-[80px] will-change-transform"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, var(--aurora-1) 0%, rgba(110,91,255,0) 62%)",
            animation: "aurora-drift-a 24s ease-in-out infinite",
          }}
        />
        <div
          className="absolute right-[-12%] top-[8%] h-[60vmax] w-[60vmax] rounded-full opacity-[0.45] blur-[90px] will-change-transform"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, var(--aurora-3) 0%, rgba(47,230,184,0) 60%)",
            animation: "aurora-drift-b 30s ease-in-out infinite",
          }}
        />
        <div
          className="absolute bottom-[-20%] left-[20%] h-[65vmax] w-[65vmax] rounded-full opacity-[0.4] blur-[100px] will-change-transform"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, var(--aurora-4) 0%, rgba(255,95,200,0) 62%)",
            animation: "aurora-drift-c 27s ease-in-out infinite",
          }}
        />
        <div
          className="absolute right-[18%] bottom-[6%] h-[40vmax] w-[40vmax] rounded-full opacity-[0.3] blur-[90px] will-change-transform"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, var(--aurora-2) 0%, rgba(43,217,255,0) 60%)",
            animation: "aurora-drift-a 33s ease-in-out infinite reverse",
          }}
        />
      </motion.div>

      {/* signal trace — the DV motif (stays fixed → parallax depth vs blobs) */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.18]"
        preserveAspectRatio="none"
        viewBox="0 0 1440 900"
        fill="none"
      >
        <path
          d="M-20 470 H280 l24 -150 24 150 24 -260 24 260 24 -90 24 90 H720 l30 -190 30 190 H1100 l24 -140 24 140 24 -300 24 300 H1480"
          stroke="var(--aurora-2)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="6 10"
          style={{ animation: "trace-flow 18s linear infinite" }}
        />
        <path
          d="M-20 640 H520 l40 -120 40 120 H980 l28 -180 28 180 H1480"
          stroke="var(--aurora-3)"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="4 14"
          style={{ animation: "trace-flow 26s linear infinite reverse" }}
        />
      </svg>

      {/* grain */}
      <div className="grain-layer" />

      {/* vignette + top fade for legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 35%, transparent 40%, rgba(7,6,14,0.55) 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-40"
        style={{ background: "linear-gradient(180deg, rgba(7,6,14,0.85), transparent)" }}
      />
    </div>
  );
}

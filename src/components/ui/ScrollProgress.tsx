"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left"
      style={{
        scaleX,
        background:
          "linear-gradient(90deg, var(--aurora-2), var(--aurora-1))",
        boxShadow:
          "0 0 10px rgba(124,108,255,0.6), 0 0 20px rgba(43,217,255,0.3)",
      }}
    />
  );
}

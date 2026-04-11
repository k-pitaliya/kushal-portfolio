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
      className="fixed top-0 left-0 right-0 z-50 h-[3px] origin-left bg-accent"
      style={{
        scaleX,
        boxShadow:
          "0 0 10px rgba(0,191,255,0.6), 0 0 20px rgba(0,191,255,0.3)",
      }}
    />
  );
}

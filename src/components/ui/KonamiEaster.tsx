"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

const PARTICLE_COUNT = 40;

function randomBetween(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// Generate circuit-like SVG paths
const circuitPaths = Array.from({ length: 9 }, (_, i) => {
  const x1 = randomBetween(5, 95);
  const y1 = randomBetween(5, 95);
  const cx = randomBetween(10, 90);
  const cy = randomBetween(10, 90);
  const x2 = randomBetween(5, 95);
  const y2 = randomBetween(5, 95);
  return {
    d: `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`,
    delay: i * 0.15,
  };
});

export default function KonamiEaster() {
  const [activated, setActivated] = useState(false);
  const [played, setPlayed] = useState(false);
  const indexRef = useRef(0);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (played) return;

      if (e.key === KONAMI[indexRef.current]) {
        indexRef.current++;
        if (indexRef.current === KONAMI.length) {
          setActivated(true);
          setPlayed(true);
          indexRef.current = 0;
        }
      } else {
        indexRef.current = 0;
      }
    },
    [played]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  // Auto-dismiss after 4s
  useEffect(() => {
    if (!activated) return;
    const t = setTimeout(() => setActivated(false), 4000);
    return () => clearTimeout(t);
  }, [activated]);

  return (
    <AnimatePresence>
      {activated && (
        <motion.div
          className="fixed inset-0 z-[99998] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Ripple flash */}
          <motion.div
            className="absolute inset-0 bg-accent/20"
            initial={{ opacity: 1, scale: 0 }}
            animate={{ opacity: 0, scale: 3 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ borderRadius: "50%" }}
          />

          {/* Circuit lines */}
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {circuitPaths.map((path, i) => (
              <motion.path
                key={i}
                d={path.d}
                fill="none"
                stroke="rgba(0,191,255,0.3)"
                strokeWidth={0.15}
                strokeDasharray={1000}
                initial={{ strokeDashoffset: 1000 }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 2, delay: path.delay, ease: "easeInOut" }}
              />
            ))}
          </svg>

          {/* Confetti particles */}
          {Array.from({ length: PARTICLE_COUNT }, (_, i) => {
            const colors = ["#00BFFF", "#7B68EE", "#FF6B6B", "#FAFAFA", "#0099CC"];
            const color = colors[i % colors.length];
            const angle = randomBetween(0, Math.PI * 2);
            const distance = randomBetween(100, 400);
            const size = randomBetween(4, 10);

            return (
              <motion.div
                key={i}
                className="absolute rounded-sm"
                style={{
                  width: size,
                  height: size,
                  background: color,
                  left: "50%",
                  top: "50%",
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1, rotate: 0 }}
                animate={{
                  x: Math.cos(angle) * distance,
                  y: Math.sin(angle) * distance - 100,
                  opacity: 0,
                  scale: 0.2,
                  rotate: randomBetween(-360, 360),
                }}
                transition={{
                  duration: randomBetween(1.5, 3),
                  delay: randomBetween(0, 0.5),
                  ease: "easeOut",
                }}
              />
            );
          })}

          {/* Text */}
          <motion.p
            className="relative z-10 font-mono text-2xl font-bold tracking-wider text-accent sm:text-4xl"
            style={{ textShadow: "0 0 30px rgba(0,191,255,0.6), 0 0 60px rgba(0,191,255,0.3)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            You found the secret!
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

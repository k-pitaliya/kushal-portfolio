"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const duration = 1600;
    const interval = 20;
    const steps = duration / interval;
    const increment = 100 / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
        setTimeout(() => setIsVisible(false), 200);
      }
      setProgress(Math.round(current));
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const skip = () => setIsVisible(false);

  const handleExitComplete = () => {
    onComplete();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          className="preloader fixed inset-0 z-[10000] flex flex-col items-center justify-center gap-6 bg-bg"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          onClick={skip}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Loading portfolio"
        >
          {/* Subtle wafer grid behind the loader */}
          <div aria-hidden="true" className="absolute inset-0 grid-bg opacity-40" />
          <div aria-hidden="true" className="grid-bg-fade" />

          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Monogram — glass disc with aurora refraction edge */}
            <motion.div
              className="glass glass-edge mb-8 flex h-16 w-16 items-center justify-center rounded-full"
              initial={{ scale: 0, opacity: 0, rotate: -180 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="aurora-text text-xl font-bold tracking-[0.08em]">
                KP
              </span>
            </motion.div>

            {/* Name — two lines, the surname in animated aurora gradient */}
            <div className="flex flex-col items-center gap-1">
              <div className="flex overflow-hidden">
                {"KUSHAL".split("").map((char, i) => (
                  <motion.span
                    key={`f-${i}`}
                    className="inline-block text-2xl font-bold tracking-[0.2em] text-text sm:text-4xl md:text-5xl"
                    initial={{ y: 80, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.2 + i * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
              <div className="overflow-hidden">
                <motion.span
                  className="aurora-text inline-block text-2xl font-bold tracking-[0.2em] sm:text-4xl md:text-5xl"
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  PITALIYA
                </motion.span>
              </div>
            </div>

            {/* Role subtitle */}
            <motion.p
              className="mt-2 text-mono-xs text-text-dim"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.4 }}
            >
              Engineer · Builder · Creator
            </motion.p>

            {/* Progress bar */}
            <div className="mt-8 w-48 sm:w-64">
              <div className="h-[2px] w-full overflow-hidden rounded-full bg-glass-border">
                <motion.div
                  className="h-full rounded-full shadow-[0_0_10px_rgba(124,108,255,0.55)]"
                  style={{
                    width: `${progress}%`,
                    background:
                      "linear-gradient(90deg, var(--aurora-1), var(--aurora-2))",
                  }}
                  transition={{ duration: 0.05 }}
                />
              </div>

              <div className="mt-3 flex items-center justify-between">
                <motion.span
                  className="text-mono-xs text-text-dim"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  Initializing
                </motion.span>
                <motion.span
                  className="text-mono-sm tabular-nums text-text-muted"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {progress}
                  <span className="text-accent">%</span>
                </motion.span>
              </div>
            </div>

            {/* Skip hint */}
            <motion.span
              className="mt-6 text-mono-xs text-text-dim/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.4, 0.7, 0.4] }}
              transition={{ delay: 0.8, duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
            >
              Click anywhere to skip
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

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
          className="preloader flex-col gap-6"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          onClick={skip}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Loading portfolio"
        >
          {/* Small monogram */}
          <motion.div
            className="mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-accent/30"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-xl font-bold text-accent">KP</span>
          </motion.div>

          {/* Name — two lines */}
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
            <div className="flex overflow-hidden">
              {"PITALIYA".split("").map((char, i) => (
                <motion.span
                  key={`l-${i}`}
                  className="inline-block text-2xl font-bold tracking-[0.2em] text-accent sm:text-4xl md:text-5xl"
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + i * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Role subtitle */}
          <motion.p
            className="mt-2 font-mono text-xs uppercase tracking-[0.3em] text-text-dim"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.4 }}
          >
            Engineer · Builder · Creator
          </motion.p>

          {/* Progress bar */}
          <div className="mt-8 w-48 sm:w-64">
            <div className="h-[1px] w-full overflow-hidden bg-glass-border">
              <motion.div
                className="h-full bg-accent"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between">
              <motion.span
                className="font-mono text-[10px] tracking-widest text-text-dim"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Loading
              </motion.span>
              <motion.span
                className="font-mono text-xs tabular-nums tracking-widest text-text-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {String(progress).padStart(3, "0")}
                <span className="text-accent">%</span>
              </motion.span>
            </div>
          </div>

          {/* Skip hint */}
          <motion.span
            className="mt-6 font-mono text-[10px] tracking-widest text-text-dim/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Click anywhere to skip
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

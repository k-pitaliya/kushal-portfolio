"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

const nameText = "KUSHAL PITALIYA";

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const duration = 2200;
    const interval = 20;
    const steps = duration / interval;
    const increment = 100 / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= 100) {
        current = 100;
        clearInterval(timer);
        // Brief pause at 100% before exit
        setTimeout(() => setIsVisible(false), 200);
      }
      setProgress(Math.round(current));
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const handleExitComplete = () => {
    onComplete();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          className="preloader flex-col gap-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Animated name */}
          <div className="flex overflow-hidden">
            {nameText.split("").map((char, i) => (
              <motion.span
                key={i}
                className="inline-block text-3xl font-bold tracking-[0.2em] text-text sm:text-5xl md:text-6xl"
                initial={{ y: 80, opacity: 0, rotateX: -40 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 + i * 0.04,
                  ease: [0.43, 0.13, 0.23, 0.96],
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>

          {/* Progress bar */}
          <div className="mt-10 w-64 sm:w-80">
            <div className="h-[2px] w-full overflow-hidden rounded-full bg-glass-border">
              <motion.div
                className="h-full rounded-full bg-accent"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>

            {/* Counter text */}
            <motion.p
              className="mt-4 text-center font-mono text-sm tracking-widest text-text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {String(progress).padStart(3, "0")}
              <span className="text-accent">%</span>
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

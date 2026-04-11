"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const CHARS = "!@#$%^&*()_+-=[]{}|;':\",./<>?";

interface TextScrambleProps {
  text: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  speed?: number;
}

export default function TextScramble({
  text,
  className,
  as: Tag = "span",
  speed = 50,
}: TextScrambleProps) {
  const [displayed, setDisplayed] = useState(text);
  const [isScrambling, setIsScrambling] = useState(false);
  const rafRef = useRef<number>(0);
  const resolvedCount = useRef(0);
  const lastTickRef = useRef(0);

  const scramble = useCallback(() => {
    setIsScrambling(true);
    resolvedCount.current = 0;
    lastTickRef.current = performance.now();

    const animate = (now: number) => {
      const elapsed = now - lastTickRef.current;

      if (elapsed >= speed) {
        lastTickRef.current = now;
        resolvedCount.current = Math.min(
          resolvedCount.current + 1,
          text.length
        );

        const next = text
          .split("")
          .map((char, i) => {
            if (i < resolvedCount.current) return char;
            if (char === " ") return " ";
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");

        setDisplayed(next);

        if (resolvedCount.current >= text.length) {
          setIsScrambling(false);
          return;
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
  }, [text, speed]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (isScrambling) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    scramble();
  };

  return React.createElement(
    Tag,
    { className: cn(className), onMouseEnter: handleMouseEnter },
    displayed
  );
}

"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Spotlight() {
  const isTouch = useMediaQuery("(pointer: coarse)");
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTouch) return;

    const el = spotRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      el.style.background = `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(0, 191, 255, 0.04), transparent 40%)`;
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div
      ref={spotRef}
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
      style={{ willChange: "background" }}
    />
  );
}

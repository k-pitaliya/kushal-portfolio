"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue, useAnimationFrame } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";

export default function CustomCursor() {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(pointer: coarse)").matches : false
  );

  const springConfig = { stiffness: 250, damping: 24, mass: 0.4 };
  const ringX = useSpring(0, springConfig);
  const ringY = useSpring(0, springConfig);

  const glowX = useSpring(0, { stiffness: 60, damping: 30, mass: 1.2 });
  const glowY = useSpring(0, { stiffness: 60, damping: 30, mass: 1.2 });
  const glowOpacity = useMotionValue(0);
  const speed = useRef(0);

  useEffect(() => {
    ringX.set(x);
    ringY.set(y);
    glowX.set(x);
    glowY.set(y);
  }, [x, y, ringX, ringY, glowX, glowY]);

  const prevPos = useRef({ x: 0, y: 0 });
  useAnimationFrame(() => {
    const dx = x - prevPos.current.x;
    const dy = y - prevPos.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    speed.current = speed.current * 0.85 + dist * 0.15;
    const opacity = Math.min(speed.current / 20, 0.35);
    glowOpacity.set(opacity);
    prevPos.current = { x, y };
  });

  useEffect(() => {
    if (isTouch) return;

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor=\"grow\"]") ||
        target.closest("[role=\"button\"]") ||
        target.closest("input") ||
        target.closest("textarea")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor=\"grow\"]") ||
        target.closest("[role=\"button\"]") ||
        target.closest("input") ||
        target.closest("textarea")
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseover", handleMouseOver, { passive: true });
    document.addEventListener("mouseout", handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isTouch]);

  if (isTouch) return null;

  const ringSize = isClicking ? 24 : isHovering ? 56 : 32;

  return (
    <>
      {/* Glow trail — fades with speed */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] rounded-full"
        style={{
          width: 60,
          height: 60,
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: glowOpacity,
          background: "radial-gradient(circle, rgba(0,191,255,0.25) 0%, transparent 70%)",
          filter: "blur(12px)",
        }}
      />

      {/* Minimal dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full bg-white"
        style={{
          width: 6,
          height: 6,
          x: x - 3,
          y: y - 3,
          mixBlendMode: "difference",
        }}
      />

      {/* Trailing ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border border-white/80"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "difference",
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: isClicking ? 0.5 : isHovering ? 0.9 : 0.7,
        }}
        transition={{
          width: { type: "spring", stiffness: 280, damping: 22 },
          height: { type: "spring", stiffness: 280, damping: 22 },
          opacity: { duration: 0.2 },
        }}
      />
    </>
  );
}

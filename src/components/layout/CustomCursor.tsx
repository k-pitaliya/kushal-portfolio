"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";

export default function CustomCursor() {
  const { x, y } = useMousePosition();
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const springConfig = { stiffness: 250, damping: 24, mass: 0.4 };
  const ringX = useSpring(0, springConfig);
  const ringY = useSpring(0, springConfig);

  useEffect(() => {
    ringX.set(x);
    ringY.set(y);
  }, [x, y, ringX, ringY]);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(isTouchDevice);
    if (isTouchDevice) return;

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
  }, []);

  if (isTouch) return null;

  const ringSize = isClicking ? 24 : isHovering ? 56 : 32;

  return (
    <>
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

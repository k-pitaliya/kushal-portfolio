"use client";

import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const TRAIL_LENGTH = 18;

interface Point {
  x: number;
  y: number;
}

export default function CursorTrail() {
  const isTouch = useMediaQuery("(pointer: coarse)");
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const positions = useRef<Point[]>(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 }))
  );
  const mouse = useRef<Point>({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (isTouch) return;

    const handleMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMove, { passive: true });

    const animate = () => {
      const pts = positions.current;
      pts[0] = { ...mouse.current };

      for (let i = 1; i < TRAIL_LENGTH; i++) {
        const prev = pts[i - 1];
        const cur = pts[i];
        pts[i] = {
          x: cur.x + (prev.x - cur.x) * 0.35,
          y: cur.y + (prev.y - cur.y) * 0.35,
        };
      }

      dotsRef.current.forEach((dot, i) => {
        if (!dot) return;
        const p = pts[i];
        const progress = i / (TRAIL_LENGTH - 1);
        const size = 6 - progress * 4; // 6px → 2px
        const opacity = 1 - progress * 0.95;

        dot.style.transform = `translate(${p.x - size / 2}px, ${p.y - size / 2}px)`;
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.opacity = `${opacity}`;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <>
      {Array.from({ length: TRAIL_LENGTH }, (_, i) => (
        <div
          key={i}
          ref={(el) => { dotsRef.current[i] = el; }}
          className="cursor-trail-dot"
          style={{ opacity: 0 }}
        />
      ))}
    </>
  );
}

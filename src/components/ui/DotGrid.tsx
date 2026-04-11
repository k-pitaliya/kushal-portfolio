"use client";

import { useEffect, useRef, useCallback } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface DotGridProps {
  className?: string;
}

export default function DotGrid({ className }: DotGridProps) {
  const isTouch = useMediaQuery("(pointer: coarse)");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);
  const lastMoveRef = useRef(0);
  const activeRef = useRef(false);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    }

    ctx.clearRect(0, 0, w, h);

    const spacing = 40;
    const mx = mouseRef.current.x;
    const my = mouseRef.current.y;
    const influence = 150;

    for (let x = spacing / 2; x < w; x += spacing) {
      for (let y = spacing / 2; y < h; y += spacing) {
        const dx = x - mx;
        const dy = y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const t = Math.max(0, 1 - dist / influence);

        const radius = 1.2 + t * 2.5;
        const alpha = 0.12 + t * 0.65;

        // Interpolate color: dim gray to accent blue
        const r = Math.round(85 + t * (0 - 85));
        const g = Math.round(85 + t * (191 - 85));
        const b = Math.round(85 + t * (255 - 85));

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.fill();
      }
    }

    // Continue animating if mouse moved recently
    if (Date.now() - lastMoveRef.current < 2000) {
      rafRef.current = requestAnimationFrame(draw);
    } else {
      activeRef.current = false;
    }
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initial static draw
    draw();

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      lastMoveRef.current = Date.now();

      if (!activeRef.current) {
        activeRef.current = true;
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    const handleLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
      lastMoveRef.current = Date.now();
      if (!activeRef.current) {
        activeRef.current = true;
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    // Handle resize
    const ro = new ResizeObserver(() => {
      if (!activeRef.current) {
        draw();
      }
    });
    ro.observe(canvas);

    window.addEventListener("mousemove", handleMove, { passive: true });
    canvas.addEventListener("mouseleave", handleLeave, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [isTouch, draw]);

  if (isTouch) return null;

  return (
    <canvas
      ref={canvasRef}
      className={className ?? "absolute inset-0 h-full w-full"}
      style={{ pointerEvents: "none" }}
    />
  );
}

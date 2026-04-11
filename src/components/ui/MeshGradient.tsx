"use client";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface MeshGradientProps {
  className?: string;
  opacity?: number;
}

const blobStyle = {
  willChange: "transform" as const,
  contain: "layout style" as const,
};

export default function MeshGradient({
  className,
  opacity = 0.2,
}: MeshGradientProps) {
  const isTouch = useMediaQuery("(pointer: coarse)");

  // On mobile, render a simple static gradient instead of animated blobs
  if (isTouch) {
    return (
      <div
        className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
        style={{ opacity: opacity * 0.6 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 30% 40%, rgba(0, 191, 255, 0.15) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(123, 104, 238, 0.1) 0%, transparent 50%)",
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={{ opacity }}
    >
      <div
        className="absolute left-1/4 top-1/4 h-[40vmax] w-[40vmax] rounded-full"
        style={{
          ...blobStyle,
          background: "radial-gradient(circle, #00BFFF 0%, transparent 70%)",
          filter: "blur(100px)",
          animation: "blob1 20s ease-in-out infinite",
        }}
      />
      <div
        className="absolute right-1/4 top-1/3 h-[35vmax] w-[35vmax] rounded-full"
        style={{
          ...blobStyle,
          background: "radial-gradient(circle, #7B68EE 0%, transparent 70%)",
          filter: "blur(110px)",
          animation: "blob2 18s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-1/4 left-1/3 h-[38vmax] w-[38vmax] rounded-full"
        style={{
          ...blobStyle,
          background: "radial-gradient(circle, #FF6B6B 0%, transparent 70%)",
          filter: "blur(120px)",
          animation: "blob3 22s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-1/3 right-1/3 h-[32vmax] w-[32vmax] rounded-full"
        style={{
          ...blobStyle,
          background: "radial-gradient(circle, #1a1a2e 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "blob4 25s ease-in-out infinite",
        }}
      />
    </div>
  );
}

"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
  direction?: "left" | "right";
}

export default function Marquee({
  children,
  speed = 30,
  pauseOnHover = true,
  className,
  direction = "left",
}: MarqueeProps) {
  const animationDirection = direction === "left" ? "normal" : "reverse";

  return (
    <div
      className={cn("group flex overflow-hidden", className)}
      style={
        {
          "--marquee-duration": `${speed}s`,
          "--marquee-direction": animationDirection,
        } as React.CSSProperties
      }
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          className={cn(
            "flex shrink-0 items-center gap-8",
            "animate-[marquee_var(--marquee-duration)_linear_infinite_var(--marquee-direction)]",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
          aria-hidden={copy === 1}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

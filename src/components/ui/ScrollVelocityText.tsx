"use client";

import type { ReactNode } from "react";
import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollVelocityTextProps {
  children: ReactNode;
  className?: string;
  baseVelocity?: number;
  skewFactor?: number;
}

export default function ScrollVelocityText({
  children,
  className,
  baseVelocity = 1,
  skewFactor = 1,
}: ScrollVelocityTextProps) {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);

  const skewY = useTransform(
    velocity,
    [-3000, 0, 3000],
    [-10 * skewFactor * baseVelocity, 0, 10 * skewFactor * baseVelocity]
  );
  const scale = useTransform(
    velocity,
    [-3000, 0, 3000],
    [0.98, 1, 0.98]
  );

  const smoothSkew = useSpring(skewY, { stiffness: 100, damping: 30, mass: 0.5 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30, mass: 0.5 });

  return (
    <motion.div
      className={cn(className)}
      style={{ skewY: smoothSkew, scale: smoothScale }}
    >
      {children}
    </motion.div>
  );
}

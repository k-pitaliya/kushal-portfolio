"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useAnimationFrame,
} from "framer-motion";

interface Props {
  children: string;
  baseVelocity?: number;
  className?: string;
}

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

/**
 * Infinite horizontal scrolling text that reacts to scroll velocity.
 * Faster scroll = faster text movement. Inspired by igloo.inc / flo-bit.dev.
 */
export default function ScrollVelocityText({
  children,
  baseVelocity = -2,
  className = "",
}: Props) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useMotionValue(0);

  const prevScrollY = useRef(0);
  useEffect(() => {
    return scrollY.on("change", (latest) => {
      const delta = latest - prevScrollY.current;
      prevScrollY.current = latest;
      scrollVelocity.set(delta);
    });
  }, [scrollY, scrollVelocity]);

  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 120,
    damping: 50,
    mass: 0.5,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  const directionFactor = useRef(1);

  useAnimationFrame((_t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    const vf = velocityFactor.get();
    if (vf < 0) {
      directionFactor.current = -1;
    } else if (vf > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * vf * Math.abs(baseVelocity) * (delta / 1000);
    baseX.set(baseX.get() + moveBy);
  });

  const repeated = Array(6).fill(children).join(" · ");

  return (
    <div className="overflow-hidden whitespace-nowrap py-6">
      <motion.div className={`inline-block ${className}`} style={{ x }}>
        <span className="inline-block">{repeated}</span>
        <span className="inline-block ml-8">{repeated}</span>
      </motion.div>
    </div>
  );
}

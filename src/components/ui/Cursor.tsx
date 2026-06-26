"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/** Fine-pointer detection without setState-in-effect (SSR snapshot = false). */
const noopSubscribe = () => () => {};
function useFinePointer() {
  return useSyncExternalStore(
    noopSubscribe,
    () => window.matchMedia("(pointer: fine)").matches,
    () => false
  );
}

/**
 * Cursor — an additive custom cursor (the native cursor stays).
 *
 * A small aurora dot that tracks 1:1 and a larger ring that lags with spring
 * physics, growing over interactive elements and dipping on press. Blend mode
 * "screen" makes it glow over the dark aurora. Disabled on touch + reduced
 * motion; pointer-events-none so it never blocks a click.
 */
export default function Cursor() {
  const reduce = useReducedMotion();
  const enabled = useFinePointer() && !reduce;
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 });
  const ry = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      setHover(
        !!t?.closest("a,button,[role='button'],input,textarea,select,[data-cursor]")
      );
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    window.addEventListener("pointerdown", dn);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      window.removeEventListener("pointerdown", dn);
      window.removeEventListener("pointerup", up);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9998] hidden md:block"
      style={{ mixBlendMode: "screen" }}
    >
      <motion.div
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full"
        style={{ x, y, marginLeft: -3, marginTop: -3, background: "var(--aurora-2)" }}
      />
      <motion.div
        className="absolute left-0 top-0 rounded-full border"
        style={{
          x: rx,
          y: ry,
          marginLeft: -17,
          marginTop: -17,
          width: 34,
          height: 34,
          borderColor: "var(--aurora-1)",
        }}
        animate={{
          scale: down ? 0.85 : hover ? 1.7 : 1,
          opacity: hover ? 0.95 : 0.45,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
      />
    </div>
  );
}

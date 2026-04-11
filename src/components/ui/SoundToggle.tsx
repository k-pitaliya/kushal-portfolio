"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Simple global getter so other components can check sound state
let _soundEnabled = false;
export function isSoundEnabled() {
  return _soundEnabled;
}

export default function SoundToggle() {
  const [enabled, setEnabled] = useState(false);

  const toggle = () => {
    const next = !enabled;
    setEnabled(next);
    _soundEnabled = next;
  };

  return (
    <motion.button
      onClick={toggle}
      className="fixed bottom-6 right-6 z-90 flex h-10 w-10 items-center justify-center rounded-full border border-glass-border bg-glass backdrop-blur-md transition-colors hover:border-accent"
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.1 }}
      aria-label={enabled ? "Mute sound" : "Enable sound"}
      style={{ zIndex: 90 }}
    >
      {enabled ? (
        /* Speaker on icon */
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-accent"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        </svg>
      ) : (
        /* Speaker muted icon */
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-text-dim"
        >
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      )}
    </motion.button>
  );
}

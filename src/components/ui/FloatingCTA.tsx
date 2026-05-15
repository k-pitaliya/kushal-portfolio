"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setVisible(scrollPercent > 0.25);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#contact"
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-bg shadow-[0_0_20px_rgba(0,191,255,0.2),0_4px_24px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(0,191,255,0.35),0_4px_24px_rgba(0,0,0,0.3)] md:h-14 md:w-auto md:rounded-full md:px-5"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Get in touch"
          style={{ animation: "float-pulse 3s ease-in-out infinite" }}
        >
          <MessageCircle className="h-5 w-5 md:mr-2" />
          <span className="hidden text-sm font-semibold md:inline">Get in Touch</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent =
        window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      // Narrow window — show only through Education/Certifications.
      // Excludes Projects (was overlapping cards) and Contact (footer already has CTAs).
      setVisible(scrollPercent > 0.55 && scrollPercent < 0.78);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href="#contact"
          className="fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-bg shadow-[0_0_20px_rgba(0,191,255,0.2),0_4px_24px_rgba(0,0,0,0.3)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(0,191,255,0.35),0_4px_24px_rgba(0,0,0,0.3)]"
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          aria-label="Get in touch"
          style={{ animation: "float-pulse 3s ease-in-out infinite" }}
        >
          <MessageCircle className="h-5 w-5" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal once the visitor has scrolled past the first viewport on any page.
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <Magnetic strength={0.4} className="fixed bottom-6 left-6 z-50">
          <motion.a
            href="/contact"
            className="glass glass-edge group flex h-12 w-12 items-center justify-center rounded-full text-accent transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:text-accent"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            aria-label="Get in touch"
            style={{ animation: "float-pulse 3s ease-in-out infinite" }}
          >
            <MessageCircle className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </motion.a>
        </Magnetic>
      )}
    </AnimatePresence>
  );
}

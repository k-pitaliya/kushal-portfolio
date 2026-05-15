"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";
import { navItems } from "@/lib/data";
import { staggerContainer, staggerItem } from "@/lib/animations";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const lastScrollY = useRef(0);

  // Scroll direction & shrink detection
  const handleScroll = useCallback(() => {
    const currentY = window.scrollY;
    setIsVisible(currentY < 100 || currentY < lastScrollY.current);
    setIsScrolled(currentY > 80);
    lastScrollY.current = currentY;
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Active section via Intersection Observer
  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop navbar */}
      <motion.header
        className={cn(
          "fixed top-4 left-1/2 z-[100] -translate-x-1/2 transition-all duration-500",
          isScrolled ? "top-2" : "top-4"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isVisible ? 0 : -120,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
      >
        <nav
          className={cn(
            "glass flex items-center gap-1 rounded-full px-2 transition-all duration-500",
            isScrolled
              ? "py-2 px-4 shadow-lg shadow-black/20"
              : "py-3 px-6"
          )}
        >
          {/* Logo */}
          <MagneticButton strength={0.2}>
            <button
              onClick={() => handleNavClick("#home")}
              className="mr-4 flex h-11 w-11 items-center justify-center rounded-full bg-accent font-bold text-bg text-sm ring-2 ring-accent/50 ring-offset-2 ring-offset-bg transition-all hover:scale-105 hover:ring-accent/80 hover:shadow-[0_0_16px_rgba(0,191,255,0.4)]"
            >
              KP
            </button>
          </MagneticButton>

          {/* Desktop nav links */}
          <LayoutGroup>
          <ul className="hidden items-center gap-1 md:flex" role="navigation">
            {navItems.map((item) => (
              <li key={item.href}>
                <MagneticButton strength={0.15}>
                  <motion.button
                    onClick={() => handleNavClick(item.href)}
                    className="group relative px-3 py-2 text-sm font-medium transition-colors"
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                  >
                    <span
                      className={cn(
                        "relative z-10 transition-colors duration-300 tracking-[0.02em]",
                        activeSection === item.href.slice(1)
                          ? "text-accent"
                          : "text-text-muted hover:text-text"
                      )}
                    >
                      {item.label}
                    </span>
                    {/* Active section indicator */}
                    {activeSection === item.href.slice(1) && (
                      <motion.span
                        className="absolute bottom-1 left-3 right-3 h-[2px] rounded-full bg-accent shadow-[0_0_8px_rgba(0,191,255,0.4)]"
                        layoutId="navbar-active-underline"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    {/* Hover underline (only when not active) */}
                    {activeSection !== item.href.slice(1) && (
                      <motion.span
                        className="absolute bottom-1 left-3 right-3 h-[2px] rounded-full bg-text-dim"
                        variants={{
                          rest: { scaleX: 0, opacity: 0 },
                          hover: {
                            scaleX: 1,
                            opacity: 0.5,
                            transition: { duration: 0.3, ease: "easeInOut" as const },
                          },
                        }}
                        style={{ originX: 0.5 }}
                      />
                    )}
                  </motion.button>
                </MagneticButton>
              </li>
            ))}
          </ul>
          </LayoutGroup>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="relative z-[110] ml-2 flex h-11 w-11 flex-col items-center justify-center gap-[5px] md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMobileOpen}
          >
            <motion.span
              className="block h-[2px] w-5 rounded-full bg-text"
              animate={
                isMobileOpen
                  ? { rotate: 45, y: 7 }
                  : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block h-[2px] w-5 rounded-full bg-text"
              animate={isMobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-[2px] w-5 rounded-full bg-text"
              animate={
                isMobileOpen
                  ? { rotate: -45, y: -7 }
                  : { rotate: 0, y: 0 }
              }
              transition={{ duration: 0.3 }}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-[105] flex items-center justify-center bg-bg/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.nav
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex flex-col items-center gap-6"
            >
              {navItems.map((item) => (
                <motion.button
                  key={item.href}
                  variants={staggerItem}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    "text-3xl font-bold tracking-tight transition-colors",
                    activeSection === item.href.slice(1)
                      ? "text-accent"
                      : "text-text-muted hover:text-text"
                  )}
                >
                  {item.label}
                </motion.button>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

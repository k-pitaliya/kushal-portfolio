"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";
import { navItems } from "@/lib/data";
import { staggerContainer, staggerItem } from "@/lib/animations";

/** Active when the path matches exactly ("/") or is nested under the route. */
function isActive(href: string, pathname: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const lastScrollY = useRef(0);

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

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  // Close the mobile menu whenever the route changes — adjust-state-during-render
  // (not an effect), which avoids the React-19 set-state-in-effect warning.
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    if (isMobileOpen) setIsMobileOpen(false);
  }

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-4 left-1/2 z-[100] -translate-x-1/2 transition-all duration-500",
          isScrolled ? "top-2" : "top-4"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isVisible ? 0 : -120, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "glass glass-edge flex items-center gap-1 rounded-full transition-all duration-500",
            isScrolled ? "py-2 px-4 shadow-lg shadow-black/20" : "py-3 px-6"
          )}
        >
          {/* Logo → home */}
          <Link
            href="/"
            aria-label="Kushal Pitaliya — home"
            className="mr-4 flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-accent-dark hover:shadow-[0_0_24px_var(--color-accent-glow)]"
          >
            KP
          </Link>

          {/* Desktop nav links */}
          <LayoutGroup>
            <ul className="hidden items-center gap-0.5 md:flex">
              {navItems.map((item) => {
                const active = isActive(item.href, pathname);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group relative px-3 py-2 text-mono-sm font-medium"
                    >
                      <span
                        className={cn(
                          "relative z-10 transition-colors duration-300",
                          active ? "text-accent" : "text-text-muted hover:text-text"
                        )}
                      >
                        {item.label}
                      </span>
                      {active && (
                        <motion.span
                          className="absolute bottom-1 left-3 right-3 h-[2px] rounded-full bg-accent shadow-[0_0_10px_var(--color-accent-glow)]"
                          layoutId="navbar-active-underline"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </LayoutGroup>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileOpen((v) => !v)}
            className="relative z-[110] ml-2 flex h-11 w-11 flex-col items-center justify-center gap-[5px] md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMobileOpen}
          >
            <motion.span
              className="block h-[2px] w-5 rounded-full bg-text"
              animate={isMobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              className="block h-[2px] w-5 rounded-full bg-text"
              animate={isMobileOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block h-[2px] w-5 rounded-full bg-text"
              animate={isMobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-bg/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.nav
              onClick={(e) => e.stopPropagation()}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="flex flex-col items-center gap-6"
              aria-label="Mobile"
            >
              {navItems.map((item) => (
                <motion.div key={item.href} variants={staggerItem}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "text-3xl font-bold tracking-tight transition-colors",
                      isActive(item.href, pathname)
                        ? "text-accent"
                        : "text-text-muted hover:text-text"
                    )}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

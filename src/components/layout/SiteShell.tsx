"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import AuroraBackground from "@/components/ui/AuroraBackground";
import Cursor from "@/components/ui/Cursor";
import CommandPalette from "@/components/ui/CommandPalette";
import ScrollProgress from "@/components/ui/ScrollProgress";
import FloatingCTA from "@/components/ui/FloatingCTA";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

/**
 * SiteShell — the persistent frame around every route.
 *
 * Holds the chrome that must survive client navigations (aurora, cursor,
 * command palette, nav, footer) and owns Lenis smooth scroll. Page content is
 * the `children` slot (animated per-route by app/template.tsx). Scroll resets
 * to the top on every route change.
 */
export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // Native scroll on touch — Lenis is for fine pointers.
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: true,
    });
    lenisRef.current = lenis;

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Reset scroll to top on route change.
  useEffect(() => {
    if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      <AuroraBackground />
      <Cursor />
      <CommandPalette />
      <ScrollProgress />
      <FloatingCTA />
      <Navbar />

      <main
        id="main-content"
        tabIndex={-1}
        className="relative outline-none"
        aria-label="Kushal Pitaliya — VLSI Design Verification Engineer"
      >
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>

      <Footer />
    </>
  );
}

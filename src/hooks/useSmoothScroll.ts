"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function useSmoothScroll() {
  useEffect(() => {
    // Force fresh page load to always start at the top.
    // Browsers default to scrollRestoration = "auto", which remembers the
    // scroll position across reloads — annoying when you reload after
    // scrolling halfway down a portfolio.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // Reset to top synchronously before any layout settles. If a deep-link
    // hash is present, give Lenis a beat to take over and smooth-scroll there.
    window.scrollTo(0, 0);

    // Skip Lenis on touch/mobile — native scroll is better for perf
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // If the URL has a hash (e.g. /#projects), smooth-scroll to it AFTER the
    // preloader has had time to mount — otherwise the browser's instant jump
    // races the React tree and lands at top-or-nowhere.
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      const t = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) lenis.scrollTo(el, { offset: 0 });
      }, 600);
      return () => {
        clearTimeout(t);
        lenis.destroy();
      };
    }

    return () => {
      lenis.destroy();
    };
  }, []);
}

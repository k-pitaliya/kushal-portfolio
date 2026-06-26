"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Preloader from "@/components/layout/Preloader";
import Hero from "@/components/sections/Hero";
import CredibilityStrip from "@/components/ui/CredibilityStrip";
import NowPanel from "@/components/sections/NowPanel";
import WorkPreview from "@/components/sections/WorkPreview";
import { aboutData } from "@/lib/data";
import { ease } from "@/lib/animations";

/**
 * Home — the cinematic landing. Deliberately short: hero, proof, current focus,
 * a two-card work teaser, and an about hook. Depth lives on the routed pages
 * (/work, /about, /writeups, /contact). Chrome (aurora, nav, footer) is in
 * SiteShell; this page owns only the first-load preloader.
 */
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <Hero loaded={!isLoading} />
      <CredibilityStrip />
      <NowPanel />
      <WorkPreview />

      {/* About hook → routes to the full About page */}
      <section className="relative section-y px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: ease.out }}
          className="glass glass-edge mx-auto max-w-4xl rounded-3xl p-8 text-center md:p-14"
        >
          <p className="mb-4 text-mono-xs text-accent">{"// the engineer"}</p>
          <p className="text-display-md mx-auto max-w-3xl text-balance text-text">
            {aboutData.headline}
          </p>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-body-lg text-text-muted">
            {aboutData.description[0]}
          </p>
          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-[0_0_36px_var(--color-accent-glow)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-dark"
          >
            More about me
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </section>
    </>
  );
}

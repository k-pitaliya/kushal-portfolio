"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-accent">
          404
        </p>
        <h1 className="mb-4 text-5xl font-bold text-text sm:text-7xl">
          Page not found
        </h1>
        <p className="mb-10 max-w-md text-lg text-text-muted">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-accent bg-accent/10 px-8 py-3 font-medium text-accent backdrop-blur-sm transition-colors hover:bg-accent/20"
        >
          ← Back home
        </Link>
      </motion.div>
    </main>
  );
}

"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="text-center">
        <p className="mb-4 font-mono text-sm uppercase tracking-[0.3em] text-accent">
          Error
        </p>
        <h1 className="mb-4 text-4xl font-bold text-text sm:text-5xl">
          Something went wrong
        </h1>
        <p className="mb-10 max-w-md text-lg text-text-muted">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full border border-accent bg-accent/10 px-8 py-3 font-medium text-accent backdrop-blur-sm transition-colors hover:bg-accent/20"
        >
          Try again
        </button>
      </div>
    </main>
  );
}

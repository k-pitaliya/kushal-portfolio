"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "/", shortcut: "H" },
  { label: "Work", href: "/work", shortcut: "W" },
  { label: "About", href: "/about", shortcut: "A" },
  { label: "Writeups", href: "/writeups", shortcut: "R" },
  { label: "Contact", href: "/contact", shortcut: "C" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = NAV_ITEMS.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  // Reset the highlight to the top result whenever the query changes, using the
  // React-sanctioned "adjust state during render" pattern (no ref, no effect).
  const [prevQuery, setPrevQuery] = useState(query);
  if (query !== prevQuery) {
    setPrevQuery(query);
    if (activeIndex !== 0) setActiveIndex(0);
  }

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const router = useRouter();

  const navigate = useCallback(
    (href: string) => {
      router.push(href);
      close();
    },
    [close, router]
  );

  // Cmd+K / Ctrl+K toggles the palette
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => {
          if (prev) {
            setQuery("");
            setActiveIndex(0);
          }
          return !prev;
        });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setActiveIndex(0);
  };

  // Keyboard nav inside palette
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (filtered.length === 0) return;
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (filtered.length === 0) return;
      setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter" && filtered.length > 0) {
      e.preventDefault();
      navigate(filtered[activeIndex].href);
    } else if (e.key === "Escape") {
      close();
    } else if (e.key === "Tab") {
      // Trap focus inside the palette — arrow keys drive the list.
      e.preventDefault();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="cmd-backdrop fixed inset-0 z-[9999] flex items-start justify-center pt-[20vh]"
          style={{ background: "rgba(0,0,0,0.6)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="glass glass-edge w-full max-w-lg overflow-hidden rounded-2xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={handleKeyDown}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-glass-border px-5 py-4">
              <svg
                className="h-5 w-5 shrink-0 text-text-muted"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                ref={inputRef}
                type="text"
                aria-label="Search sections"
                placeholder="Navigate to…"
                className="w-full bg-transparent text-sm text-text outline-none placeholder:text-text-dim"
                value={query}
                onChange={handleQueryChange}
              />
              <kbd className="shrink-0 rounded-md border border-glass-border bg-glass px-2 py-0.5 font-mono text-[10px] text-text-dim">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <ul className="max-h-72 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <li className="px-4 py-8 text-center text-sm text-text-dim">
                  No results found
                </li>
              )}
              {filtered.map((item, i) => (
                <li key={item.href}>
                  <button
                    className={cn(
                      "flex w-full items-center justify-between rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                      i === activeIndex
                        ? "border-accent/30 bg-accent-soft text-accent shadow-[inset_2px_0_0_var(--color-accent)]"
                        : "border-transparent text-text-muted hover:bg-glass-hover hover:text-text"
                    )}
                    onClick={() => navigate(item.href)}
                    onMouseEnter={() => setActiveIndex(i)}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={cn(
                          "flex h-6 w-6 items-center justify-center rounded-md border text-[10px] font-semibold uppercase transition-colors",
                          i === activeIndex
                            ? "border-accent/40 bg-accent/15 text-accent"
                            : "border-glass-border bg-glass text-text-dim"
                        )}
                      >
                        {item.shortcut}
                      </span>
                      {item.label}
                    </span>
                    <span className="font-mono text-[10px] text-text-dim">
                      ↵ Jump
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Footer hints */}
            <div className="flex items-center gap-4 border-t border-glass-border px-5 py-2.5">
              <span className="flex items-center gap-1.5 text-[10px] text-text-dim">
                <kbd className="rounded border border-glass-border bg-glass px-1.5 py-0.5 font-mono">
                  ↑↓
                </kbd>
                Navigate
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-text-dim">
                <kbd className="rounded border border-glass-border bg-glass px-1.5 py-0.5 font-mono">
                  ↵
                </kbd>
                Select
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-text-dim">
                <kbd className="rounded border border-glass-border bg-glass px-1.5 py-0.5 font-mono">
                  esc
                </kbd>
                Close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useEffect, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, ExternalLink } from "lucide-react";

interface ResumePreviewModalProps {
  open: boolean;
  onClose: () => void;
}

const RESUME_PATH = "/resume.pdf";
const RESUME_DISPLAY_NAME = "Kushal-Pitaliya-Resume.pdf";

/**
 * Inline resume preview.
 *
 * Renders an <iframe> over a blurred backdrop on desktop. Mobile browsers handle
 * inline PDFs poorly (Safari hijacks scroll, Chrome shows the native viewer),
 * so we drop the iframe and offer plain Download / Open-in-new-tab buttons there.
 *
 * Close UX: backdrop click, ESC, close button. Body scroll is locked while open
 * via `overflow: hidden` on <html> — Lenis is still running underneath and an
 * unlocked page bleeds movement into the modal.
 */
export default function ResumePreviewModal({ open, onClose }: ResumePreviewModalProps) {
  // Track mobile viewport so we can swap the iframe for a fallback — the iframe
  // never mounts on mobile, saving the PDF download on small/metered devices.
  // useSyncExternalStore (rather than useState + a setState-in-effect) reads the
  // matchMedia value cleanly: subscribe to changes, client snapshot, SSR = false.
  const isMobile = useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(max-width: 767px)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(max-width: 767px)").matches,
    () => false
  );

  // ESC to close + lock body scroll while open.
  useEffect(() => {
    if (!open) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9000] flex items-center justify-center bg-bg/70 p-4 backdrop-blur-md sm:p-6 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-modal-title"
            className="glass glass-edge relative flex h-[85vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl shadow-[0_30px_80px_rgba(3,2,10,0.6)]"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-glass-border/60 px-5 py-4 sm:px-6">
              <h2
                id="resume-modal-title"
                className="font-mono text-sm font-semibold tracking-tight text-text sm:text-base"
              >
                Resume <span className="text-text-dim">—</span>{" "}
                <span className="text-accent">Kushal Pitaliya</span>
              </h2>

              <button
                onClick={onClose}
                aria-label="Close resume preview"
                className="flex h-9 w-9 items-center justify-center rounded-full text-text-muted transition-all hover:bg-glass hover:text-accent"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-end gap-2 border-b border-glass-border/40 bg-bg/40 px-4 py-2.5 sm:px-6">
              <a
                href={RESUME_PATH}
                download={RESUME_DISPLAY_NAME}
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-dark hover:shadow-[0_0_24px_var(--color-accent-glow)] sm:text-sm"
              >
                <Download className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
                Download PDF
              </a>
              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-glass-border bg-glass px-4 py-2 text-xs font-semibold text-text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent sm:text-sm"
              >
                <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                Open in new tab
              </a>
            </div>

            {/* Body — iframe on desktop, fallback on mobile */}
            <div className="relative flex-1 overflow-hidden bg-[#1a1a1a]">
              {isMobile ? (
                <div className="flex h-full flex-col items-center justify-center gap-5 px-6 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                    <Download className="h-6 w-6 text-accent" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-base font-semibold text-text">
                      PDF preview is best on desktop
                    </p>
                    <p className="max-w-xs text-sm leading-relaxed text-text-muted">
                      Tap below to download the PDF or open it in your browser.
                    </p>
                  </div>
                  <div className="mt-2 flex flex-col gap-3">
                    <a
                      href={RESUME_PATH}
                      download={RESUME_DISPLAY_NAME}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-accent-dark"
                    >
                      <Download className="h-4 w-4" />
                      Download PDF
                    </a>
                    <a
                      href={RESUME_PATH}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-glass-border bg-glass px-6 py-3 text-sm font-semibold text-text transition-all hover:border-accent/50 hover:text-accent"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Open in new tab
                    </a>
                  </div>
                </div>
              ) : (
                <iframe
                  src={`${RESUME_PATH}#view=FitH&toolbar=0&navpanes=0`}
                  title="Resume preview — Kushal Pitaliya"
                  className="h-full w-full border-0"
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

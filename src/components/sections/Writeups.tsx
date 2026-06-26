"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, FileText } from "lucide-react";
import { blogPosts } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import { ease } from "@/lib/animations";

/**
 * Writeups — Aurora × Silicon.
 *
 * A slim stack of `glass glass-edge` rows that lift on hover: mono date, title
 * that warms to accent, tag chips, and an ArrowUpRight that drifts toward the
 * link. Each row opens its GitHub markdown doc in a new tab. Reads as
 * "engineering writing," not "blog cards."
 */
export default function Writeups() {
  return (
    <section id="writeups" className="relative section-y px-6 md:px-12 lg:px-24">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          number="01"
          title="Writeups"
          subtitle="Debug walkthroughs, coverage-closure notes, and RTL bug post-mortems — public on GitHub."
          icon={FileText}
        />

        <ul className="space-y-3 md:space-y-4">
          {blogPosts.map((post, i) => (
            <motion.li
              key={post.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.06,
                ease: ease.out,
              }}
            >
              <motion.a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read writeup: ${post.title}`}
                whileHover={{
                  y: -4,
                  boxShadow:
                    "0 0 0 1px var(--color-accent-glow), 0 16px 44px rgba(3,2,10,0.55), 0 0 38px var(--color-accent-glow), inset 0 1px 0 rgba(255,255,255,0.1)",
                }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
                className="glass glass-edge group block rounded-2xl p-5 md:p-6"
              >
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:gap-6">
                  <div className="text-mono-xs text-text-dim md:w-28 md:shrink-0 md:pt-1">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      timeZone: "UTC",
                    })}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-base font-semibold text-text transition-colors duration-200 group-hover:text-accent md:text-lg">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-muted">
                      {post.excerpt}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-glass-border bg-accent-soft px-2.5 py-0.5 text-[11px] font-medium text-accent/85"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 self-start text-text-dim transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent md:mt-1"
                    aria-hidden="true"
                  />
                </div>
              </motion.a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, FileText } from "lucide-react";
import { blogPosts } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";

/**
 * Writeups — slim list view replacing the old Blog card grid.
 *
 * Date + title + tags + arrow. Click goes to the GitHub markdown doc.
 * Clean list rhythm reads as "engineering writing" rather than "blog cards."
 */
export default function Writeups() {
  return (
    <section
      id="writeups"
      className="relative section-y px-6 md:px-12 lg:px-24"
    >
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          number="05"
          title="Writeups"
          subtitle="Engineering writeups, debug walkthroughs, and coverage closure notes. Hosted on GitHub for free, public access."
          icon={FileText}
        />

        <ul className="space-y-2">
          {blogPosts.map((post, i) => (
            <motion.li
              key={post.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.4,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Read writeup: ${post.title}`}
                className="group flex flex-col gap-2 rounded-xl border border-transparent px-4 py-5 transition-all duration-200 hover:border-glass-border hover:bg-bg-secondary/40 md:flex-row md:items-start md:gap-6 md:px-6 md:py-6"
              >
                <div className="text-mono-xs text-text-dim md:w-32 md:pt-1">
                  {new Date(post.date)
                    .toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                    .toUpperCase()}
                </div>

                <div className="flex-1">
                  <h3 className="mb-1.5 text-base font-semibold text-text transition-colors group-hover:text-accent md:text-lg">
                    {post.title}
                  </h3>
                  <p className="mb-2 text-sm leading-relaxed text-text-muted">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-accent/8 px-2.5 py-0.5 text-[10px] font-medium text-accent/80"
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
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

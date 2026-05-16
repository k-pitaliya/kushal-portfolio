"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { blurStagger, blurStaggerItem } from "@/lib/animations";
import { blogPosts } from "@/lib/data";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";

const tagGradients = [
  "from-violet-500/30 to-blue-500/30",
  "from-cyan-500/30 to-teal-500/30",
  "from-orange-500/30 to-rose-500/30",
];

function estimateReadTime(text: string): string {
  const words = text.split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200) + 3);
  return `${minutes} min read`;
}

export default function Blog() {
  return (
    <section id="blog" className="relative px-6 py-40 md:px-12 lg:px-24 xl:py-48">
      <div className="mx-auto max-w-6xl">
        <SectionHeading number="08" title="Selected Writeups" subtitle="Engineering writeups, debug walkthroughs, and methodology notes. Hosted on GitHub for free, public access." icon={FileText} />

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={blurStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {blogPosts.map((post, i) => (
            <motion.div key={post.id} variants={blurStaggerItem} className="group">
              <GlassCard
                hover={false}
                className="flex h-full min-h-[380px] flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(0,191,255,0.12)] md:min-h-[420px]"
              >
                {/* Gradient Header */}
                <div
                  className={`mb-4 flex h-32 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br md:h-36 ${
                    tagGradients[i % tagGradients.length]
                  } transition-transform duration-500 group-hover:scale-[1.02]`}
                >
                  <span className="text-4xl font-bold text-white/20 transition-all duration-500 group-hover:text-white/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Date + Read time */}
                <div className="mb-3 flex items-baseline gap-2">
                  <span className="text-xs leading-6 text-text-dim">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="text-text-dim">·</span>
                  <span className="text-xs leading-6 text-text-dim">
                    {estimateReadTime(post.excerpt)}
                  </span>
                </div>

                {/* Tags */}
                <div className="mb-3 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] font-medium text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title & Excerpt */}
                <h3 className="mb-2 text-lg font-semibold text-text transition-colors duration-300 group-hover:text-accent">
                  {post.title}
                </h3>
                <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-text-muted">
                  {post.excerpt}
                </p>

                {/* Read More */}
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-dark"
                  aria-label={`Read the full writeup: ${post.title}`}
                >
                  Read on GitHub
                  <svg
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

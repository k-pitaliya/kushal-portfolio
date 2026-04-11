"use client";

import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { blogPosts } from "@/lib/data";
import GlassCard from "@/components/ui/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";

const tagGradients = [
  "from-violet-500/30 to-blue-500/30",
  "from-cyan-500/30 to-teal-500/30",
  "from-orange-500/30 to-rose-500/30",
];

export default function Blog() {
  return (
    <section id="blog" className="relative px-6 py-32 md:px-12 lg:px-24">
      <div className="mx-auto max-w-6xl">
        <SectionHeading number="07" title="Blog & Writing" />

        <motion.div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {blogPosts.map((post, i) => (
            <motion.div key={post.id} variants={staggerItem} className="group">
              <GlassCard
                hover={false}
                className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(0,191,255,0.12)]"
              >
                {/* Gradient Header */}
                <div
                  className={`mb-5 flex h-36 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br ${
                    tagGradients[i % tagGradients.length]
                  } transition-transform duration-500 group-hover:scale-105`}
                >
                  <span className="text-4xl font-bold text-white/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Date & Tags */}
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="text-xs text-text-dim">
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-accent/10 px-2.5 py-0.5 text-[10px] text-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title & Excerpt */}
                <h3 className="mb-2 text-lg font-semibold text-text">
                  {post.title}
                </h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-text-muted">
                  {post.excerpt}
                </p>

                {/* Read More */}
                <a
                  href={post.url}
                  className="group/link inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:text-accent-dark"
                >
                  Read More
                  <span className="inline-block transition-transform group-hover/link:translate-x-1">
                    →
                  </span>
                </a>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

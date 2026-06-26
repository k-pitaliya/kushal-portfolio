"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import { blurStagger, blurStaggerItem } from "@/lib/animations";
import { aboutData } from "@/lib/data";
import SectionHeading from "@/components/ui/SectionHeading";
import Tilt from "@/components/ui/Tilt";

/**
 * About — Aurora × Silicon.
 *
 * A `glass glass-edge` photo frame over a soft aurora glow, paired with the
 * headline + three paragraphs revealed on a blur-stagger. The old scroll
 * parallax (useScroll/useTransform) is gone — it hydrates inconsistently on
 * React 19 + Next 16 + framer-motion 12. The photo's pointer tilt is handled
 * by the shared <Tilt> primitive (the site-wide 3D system), which renders the
 * neutral 0/0 state on the server and disables itself under reduced motion —
 * so there is no hydration mismatch.
 */
export default function About() {
  return (
    <section id="about" className="relative section-y px-6 md:px-12 lg:px-24">
      {/* Faint wafer grid — echoes the Hero, sits under the global aurora */}
      <div aria-hidden="true" className="absolute inset-0 grid-bg opacity-40" />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          number="01"
          title="About"
          subtitle="The story behind the verification work."
          icon={User}
        />

        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-14 lg:gap-20">
          {/* Photo — glass frame over a soft aurora glow, shared <Tilt> 3D */}
          <motion.div
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center md:justify-start"
          >
            <div className="relative w-full max-w-[20rem] rounded-2xl">
              {/* Aurora glow pooled behind the frame — stays put while it tilts */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-8 -z-10 rounded-[2.5rem] opacity-55 blur-3xl"
                style={{
                  background:
                    "radial-gradient(58% 58% at 28% 18%, var(--aurora-1), transparent 70%), radial-gradient(58% 58% at 82% 88%, var(--aurora-4), transparent 70%)",
                }}
              />

              <Tilt className="rounded-[inherit]" max={9}>
                <div className="glass glass-edge card-shine relative h-80 w-full overflow-hidden rounded-2xl md:h-96 lg:h-[26rem]">
                  {/* Headshot fills the frame. next/image with both dims pinned
                      to 100% via h-full/w-full + object-cover — no aspect-ratio
                      warning, and it lazy-loads since About sits mid-page. */}
                  <Image
                    src="/images/kushal.jpg"
                    alt="Kushal Pitaliya — VLSI Design Verification Engineer"
                    width={720}
                    height={960}
                    draggable={false}
                    className="h-full w-full select-none object-cover"
                  />
                  {/* Gradient ramp so the nameplate reads */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-bg/85 via-bg/40 to-transparent" />
                  {/* Aurora tint across the glass */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-accent/12 to-transparent" />
                  {/* Nameplate */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-4 px-5 text-center">
                    <span className="text-mono-xs text-accent/90">
                      VLSI · DV Engineer
                    </span>
                  </div>
                </div>
              </Tilt>
            </div>
          </motion.div>

          {/* Headline + description — blur-stagger reveal */}
          <motion.div
            variants={blurStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="flex flex-col justify-center"
          >
            <motion.span
              variants={blurStaggerItem}
              className="text-mono-xs text-accent"
            >
              {"// who"}
            </motion.span>

            <motion.h3
              variants={blurStaggerItem}
              className="mt-4 text-display-md text-text"
            >
              {aboutData.headline}
            </motion.h3>

            <div className="mt-6 space-y-5">
              {aboutData.description.map((paragraph, i) => (
                <motion.p
                  key={i}
                  variants={blurStaggerItem}
                  className="text-base leading-relaxed text-text-muted md:text-lg"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

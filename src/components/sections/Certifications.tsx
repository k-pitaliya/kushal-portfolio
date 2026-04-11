"use client";

import { motion } from "framer-motion";
import { fadeUp, blurReveal } from "@/lib/animations";
import { certifications } from "@/lib/data";
import GlassCard from "@/components/ui/GlassCard";
import Marquee from "@/components/ui/Marquee";
import SectionHeading from "@/components/ui/SectionHeading";

function CertBadge({
  name,
  issuer,
  date,
}: {
  name: string;
  issuer: string;
  date: string;
}) {
  return (
    <GlassCard className="w-72 shrink-0 cursor-default px-5 py-4 transition-shadow hover:shadow-[0_0_30px_rgba(0,191,255,0.2)]">
      <h4 className="text-sm font-semibold text-text">{name}</h4>
      <p className="mt-1 text-xs text-text-muted">{issuer}</p>
      <span className="mt-2 inline-block rounded-full bg-accent/15 px-2.5 py-0.5 text-[10px] font-medium text-accent">
        {date}
      </span>
    </GlassCard>
  );
}

export default function Certifications() {
  const half = Math.ceil(certifications.length / 2);
  const row1 = certifications.slice(0, half);
  const row2 = certifications.slice(half);

  return (
    <section
      id="certifications"
      className="relative px-6 py-40 md:px-12 lg:px-24 xl:py-48"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading number="06" title="Certifications" />
      </div>

      <motion.div
        className="space-y-6"
        variants={blurReveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <Marquee speed={35} direction="left" pauseOnHover>
          {row1.map((cert) => (
            <CertBadge
              key={cert.id}
              name={cert.name}
              issuer={cert.issuer}
              date={cert.date}
            />
          ))}
          {/* Duplicate for visual density when few items */}
          {row1.map((cert) => (
            <CertBadge
              key={`dup-${cert.id}`}
              name={cert.name}
              issuer={cert.issuer}
              date={cert.date}
            />
          ))}
        </Marquee>

        <Marquee speed={40} direction="right" pauseOnHover>
          {row2.map((cert) => (
            <CertBadge
              key={cert.id}
              name={cert.name}
              issuer={cert.issuer}
              date={cert.date}
            />
          ))}
          {/* Duplicate for visual density when few items */}
          {row2.map((cert) => (
            <CertBadge
              key={`dup-${cert.id}`}
              name={cert.name}
              issuer={cert.issuer}
              date={cert.date}
            />
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}

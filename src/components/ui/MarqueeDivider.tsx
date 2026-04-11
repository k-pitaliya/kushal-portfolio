"use client";

import { motion } from "framer-motion";

export default function SignalDivider() {
  return (
    <div className="flex items-center justify-center py-4" aria-hidden="true">
      <motion.div
        className="relative flex items-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
      >
        {/* Left trace — draws inward */}
        <motion.div
          className="h-[1px] w-14 origin-right bg-gradient-to-l from-accent/30 to-transparent sm:w-20"
          variants={{
            hidden: { scaleX: 0, opacity: 0 },
            visible: { scaleX: 1, opacity: 1 },
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        />

        {/* Center node — the signal origin */}
        <motion.div
          className="relative mx-1"
          variants={{
            hidden: { scale: 0, opacity: 0 },
            visible: { scale: 1, opacity: 1 },
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Glow ring */}
          <motion.div
            className="absolute -inset-2 rounded-full bg-accent/10"
            variants={{
              hidden: { scale: 0, opacity: 0 },
              visible: { scale: 1, opacity: [0, 0.4, 0] },
            }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          />
          {/* Core dot */}
          <div className="h-1.5 w-1.5 rounded-full bg-accent/40" />
        </motion.div>

        {/* Right trace — draws outward */}
        <motion.div
          className="h-[1px] w-14 origin-left bg-gradient-to-r from-accent/30 to-transparent sm:w-20"
          variants={{
            hidden: { scaleX: 0, opacity: 0 },
            visible: { scaleX: 1, opacity: 1 },
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        />
      </motion.div>
    </div>
  );
}

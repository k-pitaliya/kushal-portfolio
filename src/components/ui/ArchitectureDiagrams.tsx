"use client";

/**
 * Architecture Diagrams — inline SVG block diagrams for featured projects.
 *
 * Hand-tuned per-project visuals that show the verification architecture
 * at a glance. Far higher signal than the generic chip glyph placeholder.
 *
 * Style: monochrome lines + cyan accents, mono labels, sparse, technical.
 * Animations: paths draw on mount, subtle pulse on connection nodes.
 */

import { motion } from "framer-motion";

const drawTransition = {
  duration: 1.2,
  ease: [0.43, 0.13, 0.23, 0.96] as [number, number, number, number],
};

/* ─────────────────────────────────────────────────────────────────
 * AXI4-Lite 4×4 Crossbar
 * ────────────────────────────────────────────────────────────── */
export function AxiCrossbarDiagram() {
  const masters = ["M0", "M1", "M2", "M3"];
  const slaves = ["S0", "S1", "S2", "S3"];

  return (
    <svg
      viewBox="0 0 480 300"
      className="h-full w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      aria-label="AXI4-Lite 4×4 crossbar architecture diagram"
    >
      {/* Connection lines from masters to crossbar */}
      {masters.map((_, i) => (
        <motion.line
          key={`m-line-${i}`}
          x1="92"
          y1={50 + i * 60}
          x2="180"
          y2={50 + i * 60}
          stroke="rgba(0,191,255,0.4)"
          strokeDasharray="3 3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ ...drawTransition, delay: 0.3 + i * 0.05 }}
        />
      ))}
      {/* Connection lines from crossbar to slaves */}
      {slaves.map((_, i) => (
        <motion.line
          key={`s-line-${i}`}
          x1="300"
          y1={50 + i * 60}
          x2="388"
          y2={50 + i * 60}
          stroke="rgba(0,191,255,0.4)"
          strokeDasharray="3 3"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ ...drawTransition, delay: 0.5 + i * 0.05 }}
        />
      ))}

      {/* Master boxes */}
      {masters.map((m, i) => (
        <motion.g
          key={m}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 * i }}
        >
          <rect
            x="32"
            y={35 + i * 60}
            width="60"
            height="30"
            rx="4"
            stroke="rgba(255,255,255,0.4)"
            fill="rgba(0,191,255,0.04)"
          />
          <text
            x="62"
            y={55 + i * 60}
            textAnchor="middle"
            fill="currentColor"
            stroke="none"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            className="text-accent"
          >
            {m}
          </text>
        </motion.g>
      ))}

      {/* Slave boxes */}
      {slaves.map((s, i) => (
        <motion.g
          key={s}
          initial={{ opacity: 0, x: 8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 * i + 0.2 }}
        >
          <rect
            x="388"
            y={35 + i * 60}
            width="60"
            height="30"
            rx="4"
            stroke="rgba(255,255,255,0.4)"
            fill="rgba(0,191,255,0.04)"
          />
          <text
            x="418"
            y={55 + i * 60}
            textAnchor="middle"
            fill="currentColor"
            stroke="none"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            className="text-accent"
          >
            {s}
          </text>
        </motion.g>
      ))}

      {/* Crossbar core */}
      <motion.g
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <rect
          x="180"
          y="50"
          width="120"
          height="200"
          rx="6"
          stroke="var(--color-accent)"
          fill="rgba(0,191,255,0.05)"
        />
        <text
          x="240"
          y="135"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          fontSize="12"
          fontFamily="ui-monospace, monospace"
          fontWeight="600"
        >
          CROSSBAR
        </text>
        <text
          x="240"
          y="155"
          textAnchor="middle"
          fill="currentColor"
          opacity="0.7"
          stroke="none"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
        >
          4×4 fully-connected
        </text>
        <text
          x="240"
          y="178"
          textAnchor="middle"
          fill="currentColor"
          opacity="0.7"
          stroke="none"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
        >
          round-robin arbiter
        </text>
        <text
          x="240"
          y="198"
          textAnchor="middle"
          fill="currentColor"
          opacity="0.7"
          stroke="none"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
        >
          DECERR on unmapped
        </text>
      </motion.g>

      {/* Labels */}
      <text
        x="62"
        y="280"
        textAnchor="middle"
        fill="currentColor"
        opacity="0.5"
        stroke="none"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
      >
        MASTERS
      </text>
      <text
        x="418"
        y="280"
        textAnchor="middle"
        fill="currentColor"
        opacity="0.5"
        stroke="none"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
      >
        SLAVES
      </text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
 * I2C UVM Testbench architecture
 * ────────────────────────────────────────────────────────────── */
export function I2cUvmDiagram() {
  return (
    <svg
      viewBox="0 0 480 300"
      className="h-full w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      aria-label="I2C UVM testbench architecture"
    >
      {/* Outer UVM env */}
      <motion.rect
        x="20"
        y="20"
        width="300"
        height="260"
        rx="6"
        stroke="rgba(0,191,255,0.5)"
        strokeDasharray="4 3"
        fill="rgba(0,191,255,0.03)"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={drawTransition}
      />
      <text
        x="30"
        y="38"
        fill="currentColor"
        opacity="0.7"
        stroke="none"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
      >
        i2c_env (UVM 1.2)
      </text>

      {/* Master agent */}
      <motion.g
        initial={{ opacity: 0, y: 4 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.4 }}
      >
        <rect
          x="36"
          y="60"
          width="120"
          height="60"
          rx="4"
          stroke="rgba(255,255,255,0.4)"
          fill="rgba(0,191,255,0.04)"
        />
        <text
          x="96"
          y="83"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          fontWeight="600"
        >
          MASTER AGENT
        </text>
        <text
          x="96"
          y="100"
          textAnchor="middle"
          fill="currentColor"
          opacity="0.65"
          stroke="none"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
        >
          driver · monitor
        </text>
        <text
          x="96"
          y="112"
          textAnchor="middle"
          fill="currentColor"
          opacity="0.65"
          stroke="none"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
        >
          sequencer (BFM)
        </text>
      </motion.g>

      {/* Slave agent */}
      <motion.g
        initial={{ opacity: 0, y: 4 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <rect
          x="180"
          y="60"
          width="120"
          height="60"
          rx="4"
          stroke="rgba(255,255,255,0.4)"
          fill="rgba(0,191,255,0.04)"
        />
        <text
          x="240"
          y="83"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          fontWeight="600"
        >
          SLAVE AGENT
        </text>
        <text
          x="240"
          y="100"
          textAnchor="middle"
          fill="currentColor"
          opacity="0.65"
          stroke="none"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
        >
          PASSIVE by default
        </text>
        <text
          x="240"
          y="112"
          textAnchor="middle"
          fill="currentColor"
          opacity="0.65"
          stroke="none"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
        >
          monitor only
        </text>
      </motion.g>

      {/* Scoreboard */}
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.65, duration: 0.4 }}
      >
        <rect
          x="36"
          y="140"
          width="264"
          height="55"
          rx="4"
          stroke="rgba(0,191,255,0.5)"
          fill="rgba(0,191,255,0.06)"
        />
        <text
          x="168"
          y="162"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          fontWeight="600"
        >
          SCOREBOARD
        </text>
        <text
          x="168"
          y="178"
          textAnchor="middle"
          fill="currentColor"
          opacity="0.65"
          stroke="none"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
        >
          shadow regs · addr ACK · data integrity · txn count
        </text>
      </motion.g>

      {/* Coverage */}
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.75, duration: 0.4 }}
      >
        <rect
          x="36"
          y="215"
          width="264"
          height="50"
          rx="4"
          stroke="rgba(255,255,255,0.4)"
          fill="rgba(0,191,255,0.04)"
        />
        <text
          x="168"
          y="235"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          fontSize="10"
          fontFamily="ui-monospace, monospace"
          fontWeight="600"
        >
          COVERAGE
        </text>
        <text
          x="168"
          y="252"
          textAnchor="middle"
          fill="currentColor"
          opacity="0.65"
          stroke="none"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
        >
          17 covergroups · ~89 points · 95%+ predicted
        </text>
      </motion.g>

      {/* DUT */}
      <motion.g
        initial={{ opacity: 0, x: 8 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <rect
          x="350"
          y="100"
          width="110"
          height="100"
          rx="4"
          stroke="var(--color-accent)"
          fill="rgba(0,191,255,0.06)"
        />
        <text
          x="405"
          y="130"
          textAnchor="middle"
          fill="currentColor"
          stroke="none"
          fontSize="11"
          fontFamily="ui-monospace, monospace"
          fontWeight="600"
        >
          DUT
        </text>
        <text
          x="405"
          y="150"
          textAnchor="middle"
          fill="currentColor"
          opacity="0.7"
          stroke="none"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
        >
          i2c_slave
        </text>
        <text
          x="405"
          y="165"
          textAnchor="middle"
          fill="currentColor"
          opacity="0.7"
          stroke="none"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
        >
          addr 0x50
        </text>
        <text
          x="405"
          y="180"
          textAnchor="middle"
          fill="currentColor"
          opacity="0.7"
          stroke="none"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
        >
          8 reg bank
        </text>
      </motion.g>

      {/* Connection from env to DUT */}
      <motion.line
        x1="320"
        y1="150"
        x2="350"
        y2="150"
        stroke="rgba(0,191,255,0.5)"
        strokeDasharray="3 3"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
      />
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────
 * FSM Controller — Mealy/Moore state diagram
 * ────────────────────────────────────────────────────────────── */
export function FsmDiagram() {
  const states = [
    { name: "IDLE", x: 80, y: 80 },
    { name: "LOAD", x: 240, y: 80 },
    { name: "EXEC", x: 400, y: 80 },
    { name: "DONE", x: 240, y: 220 },
  ];

  return (
    <svg
      viewBox="0 0 480 300"
      className="h-full w-full"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      aria-label="FSM controller state diagram"
    >
      {/* Transitions */}
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        {/* IDLE -> LOAD */}
        <line x1="116" y1="80" x2="204" y2="80" stroke="rgba(0,191,255,0.5)" />
        <polygon points="200,77 208,80 200,83" fill="rgba(0,191,255,0.5)" stroke="none" />

        {/* LOAD -> EXEC */}
        <line x1="276" y1="80" x2="364" y2="80" stroke="rgba(0,191,255,0.5)" />
        <polygon points="360,77 368,80 360,83" fill="rgba(0,191,255,0.5)" stroke="none" />

        {/* EXEC -> DONE */}
        <path
          d="M 400 116 Q 400 180 280 220"
          stroke="rgba(0,191,255,0.5)"
          fill="none"
        />

        {/* DONE -> IDLE */}
        <path
          d="M 200 220 Q 80 180 80 116"
          stroke="rgba(0,191,255,0.5)"
          fill="none"
        />

        {/* IDLE self-loop */}
        <path
          d="M 50 60 Q 30 40 50 30 Q 70 20 80 50"
          stroke="rgba(255,255,255,0.3)"
          fill="none"
          strokeDasharray="2 2"
        />
      </motion.g>

      {/* State circles */}
      {states.map((s, i) => (
        <motion.g
          key={s.name}
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
        >
          <circle
            cx={s.x}
            cy={s.y}
            r="36"
            stroke={s.name === "IDLE" ? "var(--color-accent)" : "rgba(255,255,255,0.5)"}
            strokeWidth="1.5"
            fill="rgba(0,191,255,0.05)"
          />
          <text
            x={s.x}
            y={s.y + 4}
            textAnchor="middle"
            fill="currentColor"
            stroke="none"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            fontWeight="600"
          >
            {s.name}
          </text>
        </motion.g>
      ))}

      {/* SVA binding label */}
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9 }}
      >
        <rect
          x="180"
          y="270"
          width="120"
          height="22"
          rx="4"
          stroke="rgba(0,191,255,0.4)"
          strokeDasharray="3 3"
          fill="rgba(0,191,255,0.05)"
        />
        <text
          x="240"
          y="285"
          textAnchor="middle"
          fill="currentColor"
          opacity="0.7"
          stroke="none"
          fontSize="9"
          fontFamily="ui-monospace, monospace"
        >
          SVA bind on transitions
        </text>
      </motion.g>
    </svg>
  );
}

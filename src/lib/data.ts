import type {
  NavItem,
  Project,
  Experience,
  Education,
  SkillCategory,
  Certification,
  BlogPost,
  Testimonial,
  SocialLink,
} from "@/types";

export const siteConfig = {
  name: "Kushal Pitaliya",
  title: "Kushal Pitaliya — VLSI Design Verification Engineer",
  description:
    "RTL · SystemVerilog · UVM 1.2 · SVA · Coverage-driven verification. ECE undergrad at CHARUSAT specializing in functional verification of digital IPs. 41 bugs found and fixed across two full UVM testbenches.",
  url: "https://kushalpitaliya.vercel.app",
  ogImage: "/og-image.jpg",
};

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#projects" },
  { label: "Stack", href: "#stack" },
  { label: "Background", href: "#background" },
  { label: "Writeups", href: "#writeups" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/k-pitaliya",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/kushalpitaliya06/",
    icon: "linkedin",
  },
  {
    name: "Email",
    url: "mailto:pitaliyakushal@gmail.com",
    icon: "mail",
  },
];

export const aboutData = {
  headline: "Design Verification — built to find bugs",
  description: [
    "I'm Kushal Pitaliya, an ECE undergrad at CHARUSAT. Digital electronics clicked for me from day one — the idea that logic gates, clock domains, and timing constraints could build real intelligence into silicon felt more concrete than any other branch of engineering.",
    "Building a FIFO on FPGA was one thing. Proving it correct — systematically, across thousands of stimuli I never manually thought of — that's what pulled me toward Design Verification. I write SystemVerilog RTL, build UVM 1.2 testbenches with constrained-random stimulus, close functional coverage, and write SVA properties to lock down protocol invariants.",
    "Over the last six months I've shipped two full UVM verification environments — an AXI4-Lite 4×4 crossbar (25 bugs found and fixed, full rewrite May 2026) and an I2C protocol DUT (16 bugs found and fixed, 17 covergroups, ~89 coverage points, 95%+ predicted closure). Both projects have published EDA Playground flows so the work is reproducible, not a screenshot.",
  ],
  stats: [
    {
      label: "Bugs found & fixed",
      value: 41,
      desc: "across two UVM testbenches",
    },
    {
      label: "Coverage points",
      value: 89,
      desc: "across 17 functional covergroups",
    },
    {
      label: "UVM components",
      value: 32,
      desc: "drivers, monitors, scoreboards, sequences",
    },
    {
      label: "Protocols verified",
      value: 2,
      desc: "I2C (UM10204) + AXI4-Lite",
    },
  ],
};

export const skillCategories: SkillCategory[] = [
  {
    title: "VLSI Design Verification",
    skills: [
      { name: "SystemVerilog (logic, interfaces, packages, clocking)", level: 85 },
      { name: "UVM 1.2 (agents, sequencers, scoreboards, virtual sequences)", level: 80 },
      { name: "Constrained-Random Verification", level: 78 },
      { name: "Functional Coverage (covergroups, cross, ignore_bins)", level: 80 },
      { name: "SVA Assertions (immediate, concurrent, bind)", level: 75 },
      { name: "RTL Design (FSMs, datapath, parameterized)", level: 85 },
      { name: "Protocol Verification (I2C, AXI4-Lite, AMBA APB/AHB)", level: 80 },
      { name: "Scoreboard Architecture (analysis ports, reference models)", level: 75 },
    ],
  },
  {
    title: "Embedded Systems",
    skills: [
      { name: "Embedded C / Bare-Metal Firmware", level: 88 },
      { name: "STM32 / ARM Cortex-M (HAL, LL, register-level)", level: 85 },
      { name: "AVR (ATmega32)", level: 82 },
      { name: "I2C / SPI / UART / CAN", level: 85 },
      { name: "Interrupts, DMA, Timers, ADC", level: 80 },
      { name: "CMSIS-DSP / FFT / Signal Chain", level: 70 },
    ],
  },
  {
    title: "Tools & Languages",
    skills: [
      { name: "ModelSim / QuestaSim / Riviera-PRO", level: 78 },
      { name: "Xilinx Vivado / ISE (Spartan-6)", level: 78 },
      { name: "EDA Playground (UVM 1.2)", level: 85 },
      { name: "GNU Make / Regression Scripts", level: 78 },
      { name: "Git / GitHub / GitHub Actions", level: 88 },
      { name: "Linux / Bash / Python automation", level: 82 },
      { name: "C / C++ / Python", level: 85 },
    ],
  },
];

export const projects: Project[] = [
  {
    id: "axi-xbar-uvm",
    title: "AXI4-Lite 4×4 Crossbar UVM Testbench",
    description:
      "Full UVM 1.2 verification environment for a 4-master × 4-slave AXI4-Lite crossbar with round-robin arbitration and DECERR handling. Order-tolerant scoreboard, reference model, functional coverage, and 8 directed/stress tests covering simultaneous-write, RAW hazard, starvation, and unmapped-address corners. Full rewrite May 2026 — 25 bugs identified and fixed.",
    longDescription:
      "Dual-target flow: QuestaSim/VCS/Xcelium via Makefile regression, plus a flat-file Riviera-PRO build for EDA Playground. Master and slave agents, virtual sequencer, configuration object, and 5 documented bug categories (interface-in-package, UVM phase misuse, multi-driver loops, scoreboard race demotion, refmodel ordering).",
    tags: ["SystemVerilog", "UVM 1.2", "AXI4-Lite", "Scoreboard", "Reference Model", "EDA Playground"],
    category: "vlsi",
    featured: true,
    image: "/images/projects/axi-xbar.png",
    github: "https://github.com/k-pitaliya/axi-xbar-uvm-tb",
    live: "https://github.com/k-pitaliya/axi-xbar-uvm-tb/tree/main/eda_playground",
    metrics: [
      { label: "Bugs found & fixed", value: "25" },
      { label: "UVM tests", value: "8" },
      { label: "Coverage groups", value: "3" },
    ],
  },
  {
    id: "i2c-protocol-dv",
    title: "I2C Protocol UVM Verification",
    description:
      "Full UVM 1.2 verification of an I2C slave controller (7-bit address, 8-register bank, clock stretching) with master BFM, dual-direction agents, and self-checking scoreboard with shadow register bank. 17 functional covergroups, ~89 coverage points, 7 SVA protocol assertions, and 18 directed/random/stress tests. 16 RTL bugs identified and fixed; 95%+ predicted coverage closure.",
    longDescription:
      "Architecture: PASSIVE slave agent with check-before-set config_db override pattern, per-byte ACK/NACK tracking in the monitor, scoreboard with address validation (S1) + data integrity (S2-S3) + transaction count (S4) + NACK suppression (S5). Coverage model: dir, size buckets, address ranges, protocol (START/STOP/rep-START), ACK, byte-NACK, clock-stretch, rep-depth, and 6 cross covergroups.",
    tags: ["SystemVerilog", "UVM 1.2", "I2C", "SVA", "Functional Coverage", "BFM"],
    category: "vlsi",
    featured: true,
    image: "/images/projects/i2c-uvm.png",
    github: "https://github.com/k-pitaliya/i2c-protocol-dv",
    live: "https://github.com/k-pitaliya/i2c-protocol-dv/tree/main/eda_playground",
    metrics: [
      { label: "Bugs found & fixed", value: "16" },
      { label: "Covergroups", value: "17" },
      { label: "Predicted closure", value: "95%+" },
    ],
  },
  {
    id: "fsm-controller",
    title: "FSM Controller with Assertion-Based Verification",
    description:
      "Multi-state Mealy/Moore FSM in SystemVerilog using strict 3-block coding style (state register, next-state logic, output logic). SVA assertions verify state transition correctness, output timing, and corner cases (reset during active state, illegal-state recovery, back-to-back transitions).",
    tags: ["SystemVerilog", "FSM", "SVA", "Synthesizable RTL"],
    category: "vlsi",
    featured: true,
    image: "/images/projects/fsm.png",
    github: "https://github.com/k-pitaliya/FSM-Digital-Controller",
  },
  {
    id: "fifo-memory-buffer",
    title: "Synchronous FIFO on Spartan-6",
    description:
      "Parameterized synchronous FIFO with configurable depth and data width, hardware-verified on Xilinx Spartan-6 FPGA. Layered SystemVerilog testbench with separate driver, monitor, and checker. Directed and randomized stimulus for full/empty boundary, pointer wraparound, and back-to-back burst stress.",
    tags: ["Verilog HDL", "SystemVerilog TB", "Spartan-6 FPGA", "Xilinx ISE"],
    category: "vlsi",
    featured: true,
    image: "/images/projects/fifo.png",
    github: "https://github.com/k-pitaliya/Spartan6-Synchronous-FIFO",
  },
  {
    id: "audio-spectrum-analyzer",
    title: "Audio Spectrum Analyzer (STM32 Bare-Metal)",
    description:
      "Real-time 8-band spectrum visualizer on bare-metal STM32F411. Captures audio via I2S MEMS mic, processes with 512-point CMSIS-DSP FFT, applies automatic gain control, and renders on SSD1306 OLED at ~24 FPS. Double-buffered DMA for zero-CPU continuous sampling.",
    tags: ["STM32", "Embedded C", "CMSIS-DSP", "I2S", "DMA", "FFT"],
    category: "embedded",
    featured: true,
    image: "/images/projects/audio-spectrum.png",
    github: "https://github.com/k-pitaliya/audio-spectrum-analyzer-stm32",
  },
  {
    id: "ultrasonic-distance-system",
    title: "Ultrasonic Distance Measurement (AVR)",
    description:
      "Interrupt-driven distance measurement on AVR ATmega32 with HC-SR04 sensor. External interrupts (INT0/INT1) for echo capture, 16-bit Timer1 input-capture for precision pulse-width measurement, custom register-level LCD driver, UART telemetry at 9600 baud.",
    tags: ["AVR ATmega32", "Embedded C", "Interrupts", "Timer Input Capture", "UART"],
    category: "embedded",
    featured: false,
    image: "/images/projects/ultrasonic.png",
    github: "https://github.com/k-pitaliya/ATmega32-Ultrasonic-Distance-Meter",
  },
];

export const experiences: Experience[] = [
  {
    id: "exp-charusat-vlsi-2026",
    company: "CHARUSAT — VLSI Summer Internship 2026",
    role: "Design Verification Intern (Faculty-led)",
    period: "May 2026 — Present",
    description: [
      "Shipping two full UVM 1.2 verification environments — AXI4-Lite 4×4 crossbar and I2C slave controller — both with documented bug reports, coverage closure analysis, and reproducible EDA Playground flows",
      "Built reusable UVM infrastructure: virtual sequencers, layered scoreboards with reference models, per-byte coverage tracking, and SVA property libraries for protocol invariants",
      "Authored verification plans, coverage closure reports, and a 5-part debug walkthrough series mentored by faculty — turning bug analysis into systematic methodology rather than one-off fixes",
    ],
  },
  {
    id: "exp-ugsf",
    company: "CHARUSAT — ECE Department",
    role: "Undergraduate Student Fellow (UGSF)",
    period: "Aug 2024 — Present",
    description: [
      "Merit-based fellowship focused on digital design, FPGA prototyping, and verification methodology research",
      "Led hands-on workshops on Verilog RTL, Xilinx FPGA bring-up, and PCB layout for 50+ students",
      "Participated in iChip 3.0 Verilog Hackathon — timed collaborative RTL design challenge",
      "Coordinated technical talks and managed end-to-end logistics between faculty, speakers, and student teams",
    ],
  },
  {
    id: "exp-kudos",
    company: "Kudos Technolabs",
    role: "Engineering Intern (Cloud Track)",
    period: "May 2025 — Jul 2025",
    description: [
      "Delivered a production document-processing pipeline end-to-end — architecture, implementation, deployment — applied verification-style discipline (test plans, IAM least-privilege, failure injection) to cloud infrastructure",
      "Wrote Python automation for Linux server orchestration; strengthened core software engineering practice (systematic debugging, structured logging, reproducible builds) transferable to verification environments",
    ],
  },
];

export const education: Education[] = [
  {
    id: "edu-charusat",
    institution: "Charotar University of Science and Technology (CHARUSAT)",
    degree: "Bachelor of Technology",
    field: "Electronics & Communication Engineering",
    period: "2023 — 2027 (Expected)",
    gpa: "8.74 / 10",
    coursework: [
      "Digital VLSI Design",
      "Design, Testing & Verification",
      "Computer Architecture",
      "Embedded Systems",
      "Signal Processing",
      "Data Structures & Algorithms",
    ],
    achievements: [
      "Undergraduate Student Fellow (UGSF) — merit-based selection for digital design research",
      "VLSI Summer Internship 2026 (Faculty-led) — Design Verification track",
      "iChip 3.0 Verilog Hackathon — RTL design challenge",
      "Second Runner-up — Idea Show 3.0",
    ],
  },
  {
    id: "edu-school",
    institution: "Shree G.K. Dholakiya School",
    degree: "Higher Secondary (12th)",
    field: "Science — Gujarat Board",
    period: "2021 — 2023",
    gpa: "JEE: 93 percentile · 10th: 83%",
  },
];

export const certifications: Certification[] = [
  {
    id: "cert-digital-circuits",
    name: "Design of Digital Circuits with VHDL Programming",
    issuer: "L&T EduTech",
    date: "2024",
  },
  {
    id: "cert-ugsf",
    name: "Undergraduate Student Fellow (UGSF)",
    issuer: "CHARUSAT",
    date: "2024",
  },
];

export interface MethodologyCategory {
  title: string;
  items: string[];
}

export const methodologyData: MethodologyCategory[] = [
  {
    title: "Verification Methodology",
    items: [
      "UVM 1.2 — agents, sequencers, scoreboards, virtual sequences",
      "Constrained-random + directed test strategy",
      "Coverage-driven closure (functional, cross, ignore_bins)",
      "SVA property binding for protocol invariants",
      "Reference model + analysis-port scoreboard architecture",
    ],
  },
  {
    title: "Tools in Practice",
    items: [
      "QuestaSim — full regression + UCDB merge",
      "Aldec Riviera-PRO — EDA Playground mirror flow",
      "ModelSim — waveform debug",
      "Icarus Verilog — quick syntax + smoke runs",
      "Xilinx Vivado / ISE — Spartan-6 FPGA prototyping",
    ],
  },
  {
    title: "Workflow & Documentation",
    items: [
      "Spec → testplan → coverage model → regression → bug filing → RCA",
      "Markdown-first bug reports (BUG_REPORT.md, FINAL_ANALYSIS_REPORT.md)",
      "Coverage closure reports with bin-level traceability",
      "Reproducible flows — Makefile + flat EDA Playground mirror",
    ],
  },
  {
    title: "Languages & Build",
    items: [
      "SystemVerilog, Verilog HDL — RTL + testbench",
      "C, C++ — embedded firmware, BFM-style models",
      "Python — automation, regression scripts, data tooling",
      "GNU Make — multi-file builds, regression matrix",
      "Git / GitHub — public repos with CI-ready structure",
    ],
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "writeup-i2c-coverage",
    title: "Closing Coverage on an I2C UVM Testbench — 89 Points, 17 Covergroups",
    excerpt:
      "Analytical coverage closure assessment. Expanded an 8-covergroup model to 17 with cross-coverage, traced every bin to a directed/random test, identified 5 documented holes, and predicted 95%+ closure without a local simulator. The methodology, not just the numbers.",
    date: "2026-05-12",
    tags: ["UVM", "Functional Coverage", "SystemVerilog"],
    url: "https://github.com/k-pitaliya/i2c-protocol-dv/blob/main/docs/COVERAGE_CLOSURE_REPORT.md",
  },
  {
    id: "writeup-axi-debug",
    title: "25 Bugs in an AI-Generated AXI4-Lite Crossbar — A Debug Walkthrough",
    excerpt:
      "Took an AI-drafted AXI4-Lite crossbar testbench from compile-broken to fully verified. Five debug lessons: interface-in-package, multi-driver loops, scoreboard race demotion, refmodel ordering, UVM phase misuse. Every fix traced to a root cause, not a patch.",
    date: "2026-05-12",
    tags: ["AXI4-Lite", "UVM", "Debug", "Bug Analysis"],
    url: "https://github.com/k-pitaliya/axi-xbar-uvm-tb/blob/main/docs/04_DEBUG_LESSONS.md",
  },
  {
    id: "writeup-i2c-bugs",
    title: "I2C Slave Controller — 16 RTL Bugs, 9 Categories, Documented",
    excerpt:
      "Full bug report from a faculty-led I2C UVM verification project. Critical issues: shift register capturing ACK as data, TX mode driving high-Z, clock-stretch returning to wrong state, SCL stuck-low in master. Every bug with severity, repro, and the fix that landed.",
    date: "2026-05-11",
    tags: ["I2C", "RTL Debug", "Verification", "SystemVerilog"],
    url: "https://github.com/k-pitaliya/i2c-protocol-dv/blob/main/docs/BUG_REPORT.md",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Dr. Ketan Kotecha",
    role: "Professor & UGSF Faculty Advisor",
    company: "CHARUSAT ECE",
    text: "Kushal shows exceptional depth in digital design — his FIFO buffer implementation on Spartan-6 and FSM verification work demonstrate an understanding of RTL methodology well beyond his academic level. A strong candidate for VLSI design roles.",
  },
  {
    id: "test-2",
    name: "Darsh Patel",
    role: "ECE Peer & Lab Partner",
    company: "CHARUSAT ECE",
    text: "Kushal's workshops on FPGA design and Verilog RTL were the most hands-on sessions our batch experienced. He has a gift for making complex hardware concepts like timing analysis and FSM design accessible and practical.",
  },
];

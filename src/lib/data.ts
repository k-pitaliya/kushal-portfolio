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
    "RTL · SystemVerilog · UVM 1.2 · SVA · coverage-driven verification. ECE undergrad at CHARUSAT specializing in functional verification of digital IPs — 41 bugs found and fixed across two full UVM testbenches, with real cloud and embedded systems work alongside.",
  url: "https://kushalpitaliya.vercel.app",
  ogImage: "/og-image.jpg",
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Writeups", href: "/writeups" },
  { label: "Contact", href: "/contact" },
];

export const socialLinks: SocialLink[] = [
  { name: "GitHub", url: "https://github.com/k-pitaliya", icon: "github" },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/kushalpitaliya06/",
    icon: "linkedin",
  },
  { name: "Email", url: "mailto:pitaliyakushal@gmail.com", icon: "mail" },
];

export const aboutData = {
  headline: "Design Verification — built to find bugs",
  description: [
    "I'm Kushal Pitaliya, an ECE undergrad at CHARUSAT. Digital electronics clicked for me from day one — the idea that logic gates, clock domains, and timing constraints could build real intelligence into silicon felt more concrete than any other branch of engineering.",
    "Building a FIFO on FPGA was one thing. Proving it correct — systematically, across thousands of stimuli I never manually thought of — that's what pulled me toward Design Verification. I write SystemVerilog RTL, build UVM 1.2 testbenches with constrained-random stimulus, close functional coverage, and write SVA properties to lock down protocol invariants.",
    "Over the last six months I've shipped two full UVM verification environments — an AXI4-Lite 4×4 crossbar (25 bugs found and fixed) and an I2C protocol DUT (16 bugs, 17 covergroups, ~89 coverage points, 95%+ predicted closure) — both with published EDA Playground flows. Around that core I build the tooling and infrastructure that verification runs on: AWS serverless pipelines, an LLM-driven RTL/testbench generator, and real-time embedded DSP firmware. The verification mindset travels.",
  ],
  stats: [
    { label: "Bugs found & fixed", value: 41, desc: "across two UVM testbenches" },
    { label: "Coverage points", value: 89, desc: "across 17 functional covergroups" },
    { label: "Protocols verified", value: 2, desc: "I2C (UM10204) + AXI4-Lite" },
    { label: "Public repos", value: 10, desc: "silicon, cloud & embedded" },
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
      { name: "Protocol Verification — I2C, AXI4-Lite (verified); APB/AHB (RTL)", level: 78 },
      { name: "Scoreboard Architecture (analysis ports, reference models)", level: 75 },
    ],
  },
  {
    title: "Embedded Systems",
    skills: [
      { name: "Embedded C / Bare-Metal Firmware", level: 85 },
      { name: "STM32 / ARM Cortex-M (HAL, LL, register-level)", level: 82 },
      { name: "AVR (ATmega32)", level: 80 },
      { name: "I2C / SPI / UART / I2S", level: 82 },
      { name: "Interrupts, DMA, Timers, ADC", level: 80 },
      { name: "CMSIS-DSP / FFT / Signal Chain", level: 70 },
    ],
  },
  {
    title: "Cloud & Software",
    skills: [
      { name: "AWS (Lambda, API Gateway, DynamoDB, S3, Step Functions)", level: 76 },
      { name: "Serverless — AWS SAM & CDK", level: 72 },
      { name: "Terraform / Infrastructure as Code", level: 72 },
      { name: "CI/CD (CodePipeline, GitHub Actions)", level: 75 },
      { name: "Python / FastAPI", level: 80 },
      { name: "React / Next.js / TypeScript", level: 78 },
    ],
  },
  {
    title: "Tools & Build",
    skills: [
      { name: "ModelSim / QuestaSim / Riviera-PRO", level: 78 },
      { name: "Xilinx Vivado / ISE (Spartan-6)", level: 78 },
      { name: "EDA Playground (UVM 1.2)", level: 85 },
      { name: "GNU Make / Regression Scripts", level: 78 },
      { name: "Git / GitHub / GitHub Actions", level: 88 },
      { name: "Linux · Bash · C · Python", level: 82 },
    ],
  },
];

/* ----------------------------------------------------------------------------
   PROJECTS — DV-hero, then filterable breadth tiers (Silicon / Cloud /
   Embedded / Web). Honesty rules: a `github` link is present ONLY where the
   repo is genuinely public; private/commercial work carries a `closedReason`
   instead of a dead link. `status` is the honest completion state.
   -------------------------------------------------------------------------- */
export const projects: Project[] = [
  /* ---- Silicon · Design Verification (featured case studies) ---- */
  {
    id: "i2c-protocol-dv",
    title: "I2C Protocol UVM Verification",
    description:
      "Full UVM 1.2 verification of an I2C slave controller (7-bit address, 8-register bank, clock stretching) with master BFM, dual-direction agents, and a self-checking scoreboard with shadow register bank. 17 functional covergroups, ~89 coverage points, 7 SVA protocol assertions, 18 directed/random/stress tests. 16 RTL bugs found and fixed; 95%+ predicted coverage closure.",
    longDescription:
      "Architecture: PASSIVE slave agent with check-before-set config_db override, per-byte ACK/NACK tracking in the monitor, and a scoreboard layering address validation, data integrity, transaction count, and NACK suppression. Coverage model spans direction, size buckets, address ranges, protocol events (START/STOP/repeated-START), ACK, byte-NACK, clock-stretch and repeat-depth, plus six cross covergroups. Dual bench: QuestaSim regression + flat Riviera-PRO build for EDA Playground.",
    tags: ["SystemVerilog", "UVM 1.2", "I2C", "SVA", "Functional Coverage", "BFM"],
    category: "vlsi",
    domain: "Silicon · DV",
    status: "verified",
    accent: "teal",
    year: "2026",
    featured: true,
    github: "https://github.com/k-pitaliya/i2c-protocol-dv",
    live: "https://github.com/k-pitaliya/i2c-protocol-dv/tree/main/eda_playground",
    metrics: [
      { label: "Bugs found & fixed", value: "16" },
      { label: "Covergroups", value: "17" },
      { label: "Predicted closure", value: "95%+" },
    ],
  },
  {
    id: "axi-xbar-uvm",
    title: "AXI4-Lite 4×4 Crossbar UVM Testbench",
    description:
      "Full UVM 1.2 environment for a 4-master × 4-slave AXI4-Lite crossbar with round-robin arbitration and DECERR handling. Order-tolerant scoreboard, reference model, functional coverage, and 8 directed/stress tests covering simultaneous-write, RAW hazard, starvation, and unmapped-address corners. 25 bugs identified and fixed.",
    longDescription:
      "Dual-target flow: QuestaSim/ModelSim via Makefile regression, plus a flat-file Riviera-PRO build for EDA Playground. Master and slave agents, virtual sequencer, configuration object, RAL register model, and five documented bug categories (interface-in-package, UVM phase misuse, multi-driver loops, scoreboard race demotion, refmodel ordering).",
    tags: ["SystemVerilog", "UVM 1.2", "AXI4-Lite", "RAL", "Scoreboard", "EDA Playground"],
    category: "vlsi",
    domain: "Silicon · DV",
    status: "verified",
    accent: "indigo",
    year: "2026",
    featured: true,
    github: "https://github.com/k-pitaliya/axi-xbar-uvm-tb",
    live: "https://github.com/k-pitaliya/axi-xbar-uvm-tb/tree/main/eda_playground",
    metrics: [
      { label: "Bugs found & fixed", value: "25" },
      { label: "UVM tests", value: "8" },
      { label: "RAL + refmodel", value: "Yes" },
    ],
  },

  /* ---- Silicon · supporting ---- */
  {
    id: "amba-soc",
    title: "AMBA SoC — AXI / AHB / APB Interconnect",
    description:
      "Synthesizable AMBA system-on-chip: AXI crossbar, AHB decoder, APB bridge, and UART / GPIO / Timer / SPI peripherals — 11 RTL modules. Hierarchical testbench with AXI/AHB/APB protocol assertions; compiles clean under Verilator -Wall with 23 passing tests.",
    tags: ["SystemVerilog", "AXI / AHB / APB", "Verilator", "SVA", "RTL"],
    category: "vlsi",
    domain: "Silicon · RTL + DV",
    status: "verified",
    accent: "cyan",
    year: "2026",
    featured: false,
    closedReason: "Local repo",
    metrics: [
      { label: "RTL modules", value: "11" },
      { label: "Tests passing", value: "23" },
    ],
  },
  {
    id: "fifo-memory-buffer",
    title: "Synchronous FIFO on Spartan-6",
    description:
      "Parameterized synchronous FIFO (configurable depth and width) taken RTL → UVM → FPGA. Layered SystemVerilog testbench, 3 SVA properties that caught 2 flag bugs during bring-up, >95% functional coverage, and a Spartan-6 bitstream with button-debounce + 7-segment demo wrapper.",
    tags: ["Verilog HDL", "UVM 1.2", "SVA", "Spartan-6 FPGA", "Xilinx ISE"],
    category: "vlsi",
    domain: "Silicon · FPGA",
    status: "hardware",
    accent: "indigo",
    year: "2026",
    featured: false,
    github: "https://github.com/k-pitaliya/Spartan6-Synchronous-FIFO",
  },
  {
    id: "fsm-controller",
    title: "FSM Controller with Assertion-Based Verification",
    description:
      "Multi-state Mealy/Moore FSM in SystemVerilog using strict 3-block coding style. SVA assertions verify transition correctness, output timing, and corner cases — reset during active state, illegal-state recovery, and back-to-back transitions.",
    tags: ["SystemVerilog", "FSM", "SVA", "Synthesizable RTL"],
    category: "vlsi",
    domain: "Silicon · RTL",
    status: "verified",
    accent: "magenta",
    year: "2026",
    featured: false,
    github: "https://github.com/k-pitaliya/FSM-Digital-Controller",
  },

  /* ---- Cloud · Software ---- */
  {
    id: "siliconscribe",
    title: "SiliconScribe — AI-Driven RTL & Verification",
    description:
      "Type a hardware design in plain English → an LLM generates synthesizable Verilog + a testbench → Icarus Verilog simulates it → a self-correction loop feeds compile/test errors back until it passes. FastAPI backend, React/TypeScript frontend with live SSE agent trace, VCD waveform rendering, and a fully offline curated-design mode (no API key needed).",
    longDescription:
      "The bridge between my silicon and software sides. Real simulation (iverilog -g2012, auto $dumpvars injection, VCD→SVG waveforms), per-run sandboxed execution with timeouts and path-traversal-safe artifact serving, and an honest coverage model (test-vector pass-rate, not synthesis toggle coverage).",
    tags: ["Python", "FastAPI", "React", "LLM", "Icarus Verilog", "SSE"],
    category: "cloud",
    domain: "Cloud · AI × Silicon",
    status: "demo",
    accent: "indigo",
    year: "2026",
    featured: false,
    github: "https://github.com/k-pitaliya/ai-eda-playground",
  },
  {
    id: "serverless-cicd",
    title: "Serverless CI/CD Pipeline (AWS)",
    description:
      "End-to-end AWS-native CI/CD: GitHub → CodePipeline → CodeBuild (test + build) → CloudFormation/SAM deploy to Lambda + API Gateway + DynamoDB, with CloudWatch alarms and SNS notifications. Multi-environment (dev/staging/prod), pytest unit tests, and SAM local integration testing — all inside the AWS Free Tier.",
    tags: ["AWS", "CodePipeline", "SAM", "CloudFormation", "Lambda", "Python"],
    category: "cloud",
    domain: "Cloud · DevOps",
    status: "shipped",
    accent: "teal",
    year: "2026",
    featured: false,
    github: "https://github.com/k-pitaliya/serverless-cicd-pipeline",
  },
  {
    id: "terraform-aws",
    title: "Terraform AWS Infrastructure",
    description:
      "Reusable infrastructure-as-code modules provisioning AWS resources with Terraform — networking, IAM least-privilege roles, and serverless compute — written to be composable, repeatable, and version-controlled rather than click-ops.",
    tags: ["Terraform", "AWS", "IaC", "IAM"],
    category: "cloud",
    domain: "Cloud · IaC",
    status: "shipped",
    accent: "cyan",
    year: "2026",
    featured: false,
    github: "https://github.com/k-pitaliya/terraform-aws-infrastructure",
  },
  {
    id: "doc-engine",
    title: "Intelligent Document Engine",
    description:
      "Document-processing dashboard built during my Kudos Technolabs cloud internship: secure pre-signed S3 upload, Textract OCR extraction, searchable results, analytics, and report generation. Applied verification discipline — test plans, IAM least-privilege, failure injection — to cloud infrastructure.",
    tags: ["AWS", "S3", "Textract", "Lambda", "JavaScript"],
    category: "cloud",
    domain: "Cloud · Internship",
    status: "shipped",
    accent: "indigo",
    year: "2025",
    featured: false,
    github: "https://github.com/k-pitaliya/intelligent-doc-engine",
  },

  /* ---- Embedded ---- */
  {
    id: "audio-spectrum-analyzer",
    title: "Audio Spectrum Analyzer (STM32 Bare-Metal)",
    description:
      "Real-time 8-band spectrum visualizer on bare-metal STM32F411. I2S MEMS-mic capture via double-buffered DMA, 512-point CMSIS-DSP FFT, Hanning windowing, automatic gain control, and dirty-rect rendering on an SSD1306 OLED at ~24 FPS. Watchdog + HardFault recovery; builds clean with the resource budget met.",
    tags: ["STM32", "Embedded C", "CMSIS-DSP", "I2S", "DMA", "FFT"],
    category: "embedded",
    domain: "Embedded · DSP",
    status: "hardware",
    accent: "cyan",
    year: "2026",
    featured: false,
    github: "https://github.com/k-pitaliya/audio-spectrum-analyzer-stm32",
  },
  {
    id: "bpsk-modulator",
    title: "Multiplier-less BPSK Modulator (FPGA SDR)",
    description:
      "Hardware-efficient BPSK modulator on Spartan-6: a single DDS core with phase-shift-via-XOR (no multipliers, no DSP48, no BRAM) feeding three backends — square wave, 8-bit parallel DAC, and 1-bit sigma-delta. Pipelined for Fmax headroom. Self-checking testbench demodulates 59 bits over 100 carrier periods with zero errors.",
    tags: ["Verilog", "FPGA", "DDS", "SDR", "Icarus Verilog", "Xilinx ISE"],
    category: "embedded",
    domain: "Embedded · FPGA / SDR",
    status: "verified",
    accent: "teal",
    year: "2026",
    featured: false,
    closedReason: "Academic / local",
  },
  {
    id: "wiradar",
    title: "WiRadar — WiFi Diagnostic Suite (Android)",
    description:
      "Android app for WiFi network analysis: a 60 FPS radar canvas with phosphor decay, 5-factor scoring, threat detection (Evil Twin, Rogue AP, Deauth Flood), channel-occupancy view, walk-test heatmaps, and PDF report export. Zero-allocation render loop, MVVM + Hilt + Room, privacy-first (no cloud, all local).",
    tags: ["Kotlin", "Android Canvas", "MVVM", "Hilt", "Room"],
    category: "embedded",
    domain: "Embedded · Android / RF",
    status: "shipped",
    accent: "magenta",
    year: "2026",
    featured: false,
    closedReason: "Proprietary",
  },
  {
    id: "ultrasonic-distance-system",
    title: "Ultrasonic Distance Measurement (AVR)",
    description:
      "Interrupt-driven distance measurement on AVR ATmega32 with an HC-SR04 sensor. External interrupts (INT0/INT1) for echo capture, 16-bit Timer1 input-capture for precise pulse-width timing, a register-level LCD driver, and UART telemetry at 9600 baud.",
    tags: ["AVR ATmega32", "Embedded C", "Interrupts", "Timer Capture", "UART"],
    category: "embedded",
    domain: "Embedded · AVR",
    status: "hardware",
    accent: "amber",
    year: "2025",
    featured: false,
    github: "https://github.com/k-pitaliya/ATmega32-Ultrasonic-Distance-Meter",
  },

  /* ---- Web · Full-stack ---- */
  {
    id: "mlbb-stats",
    title: "MLBB Stats — Full-Stack Companion App",
    description:
      "Next.js + TypeScript companion for a mobile game: 60+ hero tier list, dynamic hero detail pages, and a Draft Assistant whose weighted scoring engine recommends picks/bans live as the draft state changes. Build-time data pipeline with 8-way concurrent fetch, retries, and a 24h cache; strict TypeScript throughout.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Data Pipeline"],
    category: "web",
    domain: "Web · Full-stack",
    status: "shipped",
    accent: "magenta",
    year: "2026",
    featured: false,
    closedReason: "Commercial",
  },
];

export const experiences: Experience[] = [
  {
    id: "exp-charusat-vlsi-2026",
    company: "CHARUSAT — VLSI Summer Internship 2026",
    role: "Design Verification Intern (Faculty-led)",
    period: "May 2026 — Present",
    description: [
      "Shipping two full UVM 1.2 verification environments — AXI4-Lite 4×4 crossbar and I2C slave controller — each with documented bug reports, coverage closure analysis, and reproducible EDA Playground flows",
      "Built reusable UVM infrastructure: virtual sequencers, layered scoreboards with reference models, per-byte coverage tracking, and SVA property libraries for protocol invariants",
      "Authored verification plans, coverage closure reports, and a multi-part debug walkthrough series — turning bug analysis into systematic methodology rather than one-off fixes",
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
      "Participated in the iChip 3.0 Verilog Hackathon — a timed collaborative RTL design challenge",
      "Coordinated technical talks and managed end-to-end logistics between faculty, speakers, and student teams",
    ],
  },
  {
    id: "exp-kudos",
    company: "Kudos Technolabs",
    role: "Engineering Intern (Cloud Track)",
    period: "May 2025 — Jul 2025",
    description: [
      "Delivered a document-processing pipeline end-to-end — architecture, implementation, deployment — applying verification-style discipline (test plans, IAM least-privilege, failure injection) to cloud infrastructure",
      "Wrote Python automation for Linux server orchestration; strengthened systematic debugging, structured logging, and reproducible builds — practices that transfer straight into verification environments",
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
      "C — embedded firmware, bare-metal",
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

// Testimonials removed — no fabricated/named endorsements published.
export const testimonials: Testimonial[] = [];

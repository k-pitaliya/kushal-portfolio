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
  title: "Kushal Pitaliya — VLSI Design Verification & Cloud Engineer",
  description:
    "VLSI Design Verification (SystemVerilog · UVM · FPGA) × Cloud Architecture (AWS · Serverless · Terraform). ECE student at CHARUSAT building at the intersection of silicon and the cloud.",
  url: "https://kushalpitaliya.dev",
  ogImage: "/images/og.png",
};

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/KushalPitaliya",
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
  headline: "VLSI Design Verification × Cloud Architecture",
  description: [
    "I'm Kushal Pitaliya — from B.Tech day one, digital electronics made the most sense to me. The idea that logic gates, clocking, and timing constraints could build real intelligence into silicon always felt more tangible than theory. That curiosity pushed me toward FPGA projects, then toward harder questions about those projects.",
    "Building a FIFO on hardware was one thing. Proving it was correct — systematically, across thousands of scenarios I never manually thought of — that's what led me to VLSI Design Verification. I now design and verify RTL in SystemVerilog, write UVM 1.2 testbenches with functional coverage, and prototype on Spartan-6 FPGAs.",
    "On the cloud side, I architect serverless pipelines on AWS — Lambda, Textract, DynamoDB, API Gateway — shipped a production document processing engine during my internship at Kudos Technolabs. I believe infrastructure should be as rigorously verified as silicon. Good engineers build things. Great engineers prove their things work.",
  ],
  stats: [
    { label: "RTL & Cloud Projects", value: 12 },
    { label: "Technologies", value: 30 },
    { label: "CGPA", value: 8.74 },
  ],
};

export const skillCategories: SkillCategory[] = [
  {
    title: "VLSI & Digital Design",
    skills: [
      { name: "Verilog HDL / VHDL", level: 90 },
      { name: "SystemVerilog / SVA", level: 82 },
      { name: "RTL Design & Synthesis", level: 85 },
      { name: "UVM 1.2 Methodology", level: 70 },
      { name: "Functional Coverage", level: 72 },
      { name: "FPGA Prototyping (Xilinx ISE/Vivado)", level: 80 },
    ],
  },
  {
    title: "Embedded Systems",
    skills: [
      { name: "Embedded C / C++", level: 90 },
      { name: "STM32 / ARM Cortex-M", level: 85 },
      { name: "AVR (ATmega32)", level: 85 },
      { name: "UART / I2C / SPI / CAN", level: 85 },
      { name: "RTOS Concepts", level: 70 },
      { name: "PCB Design (Proteus)", level: 65 },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS (Lambda, S3, EC2, VPC)", level: 80 },
      { name: "Docker & Kubernetes", level: 80 },
      { name: "Terraform (IaC)", level: 75 },
      { name: "SAM / CloudFormation", level: 75 },
      { name: "CI/CD (CodePipeline, GitHub Actions)", level: 75 },
      { name: "Linux & Shell Scripting", level: 85 },
    ],
  },
  {
    title: "Programming & Web",
    skills: [
      { name: "Python", level: 85 },
      { name: "C / C++", level: 90 },
      { name: "JavaScript (ES6+)", level: 78 },
      { name: "React + Vite", level: 72 },
      { name: "Node.js / Express", level: 70 },
      { name: "MongoDB", level: 68 },
    ],
  },
  {
    title: "EDA & Dev Tools",
    skills: [
      { name: "Xilinx ISE / Vivado", level: 80 },
      { name: "ModelSim / Icarus Verilog", level: 78 },
      { name: "STM32CubeIDE / Keil", level: 85 },
      { name: "Git / GitHub", level: 90 },
      { name: "MATLAB / Simulink", level: 70 },
      { name: "GNU Make / CMake", level: 75 },
    ],
  },
];

export const projects: Project[] = [
  {
    id: "ai-eda-playground",
    title: "AI-Driven EDA Playground",
    description:
      "Browser-based RTL design environment where natural language prompts generate Verilog modules, auto-generate testbenches, run simulation via Icarus Verilog, and self-correct bugs autonomously.",
    tags: ["SystemVerilog", "AI/LLM", "Icarus Verilog", "Next.js", "Python"],
    category: "vlsi",
    featured: true,
    image: "/images/projects/ai-eda.png",
    github: "https://github.com/KushalPitaliya/ai-eda-playground",
  },
  {
    id: "fifo-memory-buffer",
    title: "Synchronous FIFO Memory Buffer",
    description:
      "Hardware-verified 8-bit Synchronous FIFO on Xilinx Spartan-6 FPGA with robust signal debouncing, power-on reset logic, and real-time status monitoring. Directed and randomized testbenches.",
    tags: ["Verilog HDL", "Spartan-6 FPGA", "Xilinx ISE", "Testbench"],
    category: "vlsi",
    featured: true,
    image: "/images/projects/fifo.png",
    github: "https://github.com/KushalPitaliya/Spartan6-Synchronous-FIFO",
  },
  {
    id: "fsm-controller",
    title: "FSM-Based Digital Controller",
    description:
      "Multi-state Mealy/Moore FSM in SystemVerilog with clock-driven structured testbenches and assertions. Strictly synthesizable with always_ff/always_comb constructs and full coverage.",
    tags: ["SystemVerilog", "FSM", "SVA Assertions", "Synthesis"],
    category: "vlsi",
    featured: true,
    image: "/images/projects/fsm.png",
    github: "https://github.com/KushalPitaliya/FSM-Digital-Controller",
  },
  {
    id: "audio-spectrum-analyzer",
    title: "Audio Spectrum Analyzer",
    description:
      "Real-time 8-band spectrum visualizer on bare-metal STM32. Captures audio via I2S MEMS mic, processes with 512-point FFT (CMSIS-DSP), applies AGC, and renders on SSD1306 OLED at ~24 FPS.",
    tags: ["STM32", "Embedded C", "CMSIS-DSP", "I2S", "DMA", "OLED"],
    category: "embedded",
    featured: false,
    image: "/images/projects/audio-spectrum.png",
    github: "https://github.com/KushalPitaliya/audio-spectrum-analyzer-stm32",
  },
  {
    id: "ultrasonic-distance-system",
    title: "Ultrasonic Distance Measurement",
    description:
      "Real-time distance measurement using AVR ATmega32 with HC-SR04 sensor. Interrupt-driven echo detection, Timer1 input capture for precision, custom LCD driver, and UART serial output.",
    tags: ["AVR", "Embedded C", "UART", "Timers", "Interrupts"],
    category: "embedded",
    featured: false,
    image: "/images/projects/ultrasonic.png",
    github: "https://github.com/KushalPitaliya/ATmega32-Ultrasonic-Distance-Meter",
  },
  {
    id: "control-system-analyzer",
    title: "Control System Analyzer",
    description:
      "Interactive web tool for control system analysis — step/impulse/ramp responses, Bode/Nyquist/Polar plots, Root Locus, and Routh-Hurwitz stability. 24 unit tests with Vitest.",
    tags: ["JavaScript", "Vite", "Chart.js", "MathJax", "Vitest"],
    category: "web",
    featured: false,
    image: "/images/projects/control-system.png",
    github: "https://github.com/KushalPitaliya/Control_system_analyzer",
  },
  {
    id: "semicon-summit",
    title: "Semiconductor Summit 2.0",
    description:
      "Full-stack event website for a semiconductor conference with React + Vite frontend and Node.js/MongoDB backend. Automated PDF receipt parsing, role-based dashboards, and email automation.",
    tags: ["React", "Vite", "Node.js", "MongoDB", "Nodemailer", "REST API"],
    category: "web",
    featured: false,
    image: "/images/projects/semicon-summit.png",
    github: "https://github.com/KushalPitaliya/Semicon-Summit-2.0",
  },
  {
    id: "serverless-cicd-pipeline",
    title: "Serverless CI/CD Pipeline",
    description:
      "Task Manager REST API with fully automated CI/CD: GitHub → CodePipeline → CodeBuild → CloudFormation → Lambda + API Gateway + DynamoDB. CloudWatch alarms and SNS notifications included.",
    tags: ["AWS Lambda", "API Gateway", "DynamoDB", "SAM", "CodePipeline", "Python"],
    category: "cloud",
    featured: false,
    image: "/images/projects/serverless-cicd.png",
    github: "https://github.com/KushalPitaliya/serverless-cicd-pipeline",
  },
  {
    id: "document-processing-engine",
    title: "Intelligent Document Processing Engine",
    description:
      "Fully serverless OCR pipeline: S3 uploads trigger Lambda → AWS Textract extracts structured data → DynamoDB stores metadata → SNS notifies downstream. IAM least-privilege throughout.",
    tags: ["AWS Textract", "Lambda", "S3", "DynamoDB", "SNS", "Python"],
    category: "cloud",
    featured: true,
    image: "/images/projects/doc-processing.png",
    github: "https://github.com/KushalPitaliya/intelligent-doc-engine",
  },
  {
    id: "terraform-iac",
    title: "Cloud Infrastructure as Code",
    description:
      "Reusable Terraform modules for VPC, EC2, S3, and IAM. Remote state backends with DynamoDB locking, variable-driven multi-environment configs, and CI-validated terraform plan.",
    tags: ["Terraform", "AWS", "VPC", "EC2", "S3", "IAM"],
    category: "cloud",
    featured: false,
    image: "/images/projects/terraform.png",
    github: "https://github.com/KushalPitaliya/terraform-aws-infrastructure",
  },
  {
    id: "text-parsematch",
    title: "text-parsematch (PyPI Package)",
    description:
      "Published Python package for processing text inputs with pattern matching, retry mechanisms, and schema validation. Returns structured and validated outputs for data extraction workflows.",
    tags: ["Python", "PyPI", "Pattern Matching", "Schema Validation"],
    category: "other",
    featured: false,
    image: "/images/projects/text-parsematch.png",
    github: "https://github.com/KushalPitaliya/text-parsematch",
  },
];

export const experiences: Experience[] = [
  {
    id: "exp-kudos",
    company: "Kudos Technolabs",
    role: "Cloud Technologies Intern",
    period: "May 2025 — July 2025",
    description: [
      "Designed and developed an Intelligent Document Processing Engine using AWS Lambda, Textract, DynamoDB, API Gateway, and S3",
      "Built a fully functional frontend dashboard with file upload, real-time analytics, dynamic report generation, and search/filter capabilities",
      "Automated extraction and analysis of text data from PDF and image documents using Amazon Textract",
      "Delivered a self-driven project end-to-end — from architecture planning to deployment within the AWS Free Tier",
    ],
  },
  {
    id: "exp-ugsf",
    company: "CHARUSAT — ECE Department",
    role: "Undergraduate Student Fellow (UGSF)",
    period: "Jul 2025 — Present",
    description: [
      "Merit-based fellowship focused on digital design, FPGA development, and embedded systems research",
      "Led hands-on workshops covering Verilog RTL design, FPGA prototyping on Xilinx, and PCB layout techniques",
      "Organized technical talks and managed events end-to-end — coordinating between speakers, student teams, and faculty",
      "Participated in iChip 3.0 Verilog Hackathon — collaborative RTL design challenge with timed problem-solving",
    ],
  },
];

export const education: Education[] = [
  {
    id: "edu-charusat",
    institution: "Charotar University of Science and Technology (CHARUSAT)",
    degree: "Bachelor of Technology",
    field: "Electronics & Communication Engineering",
    period: "2023 — Present",
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
      "Undergraduate Student Fellow (UGSF) — Merit-based selection for digital design research",
      "iChip 3.0 Verilog Hackathon — RTL design challenge participant",
      "Second Runner-up — Idea Show 3.0",
      "Odoo x CHARUSAT Hackathon 2025 — Participant",
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
  {
    id: "cert-aws",
    name: "AWS Cloud Technical Essentials",
    issuer: "Coursera",
    date: "2025",
  },
  {
    id: "cert-google-ai",
    name: "Google AI Essentials Specialization",
    issuer: "Google",
    date: "2025",
  },
  {
    id: "cert-gcp",
    name: "Google Cloud Essentials",
    issuer: "Google Cloud",
    date: "2025",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "From Verilog to SystemVerilog: A Practical Transition Guide",
    excerpt:
      "What I learned moving from basic Verilog to SystemVerilog — always_ff vs always_comb, interfaces, SVA assertions, and why it matters for modern design verification workflows.",
    date: "2025-03-10",
    tags: ["SystemVerilog", "Verilog", "VLSI", "Verification"],
    url: "https://github.com/KushalPitaliya",
  },
  {
    id: "blog-2",
    title: "Building a Synchronous FIFO: From RTL to FPGA Verification",
    excerpt:
      "A deep dive into designing, simulating, and hardware-verifying an 8-bit FIFO on Spartan-6 — signal debouncing, power-on reset, directed testbenches, and lessons learned.",
    date: "2025-05-20",
    tags: ["Verilog", "FPGA", "Spartan-6", "Xilinx ISE"],
    url: "https://github.com/KushalPitaliya/Spartan6-Synchronous-FIFO",
  },
  {
    id: "blog-3",
    title: "Building a Bare-Metal Audio Spectrum Analyzer on STM32",
    excerpt:
      "How I built an 8-band real-time spectrum visualizer from scratch — I2S microphone, CMSIS-DSP FFT, AGC, and SSD1306 OLED rendering at 24 FPS on a $5 microcontroller.",
    date: "2025-06-15",
    tags: ["STM32", "Embedded C", "DSP", "Bare-Metal"],
    url: "https://github.com/KushalPitaliya/audio-spectrum-analyzer-stm32",
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
    name: "Harsh Mehta",
    role: "Cloud Team Lead",
    company: "Kudos Technolabs",
    text: "Kushal quickly grasped complex AWS architectures and delivered production-ready serverless pipelines. His hardware engineering mindset brought a unique discipline to cloud infrastructure — clean, testable, and well-documented.",
  },
  {
    id: "test-3",
    name: "Darsh Patel",
    role: "ECE Peer & Lab Partner",
    company: "CHARUSAT ECE",
    text: "Kushal's workshops on FPGA design and Verilog RTL were the most hands-on sessions our batch experienced. He has a gift for making complex hardware concepts like timing analysis and FSM design accessible and practical.",
  },
];

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
  title: "Kushal Pitaliya — Engineer & Builder",
  description:
    "Electronics & Communication Engineering student at CHARUSAT with hands-on experience in Embedded Systems, Cloud/DevOps, and VLSI Design Verification. Building at the intersection of hardware and software.",
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
  headline: "Bridging Hardware & Software",
  description: [
    "I'm Kushal Pitaliya — an Electronics & Communication Engineering student at CHARUSAT with a CGPA of 8.74. I work at the intersection of hardware and software, from programming STM32 microcontrollers and designing Verilog RTL to building serverless architectures on AWS.",
    "As an Undergraduate Student Fellow (UGSF) at CHARUSAT, I contribute to embedded systems labs and coordinate workshops on microcontroller programming, PCB design, and FPGA development. My cloud internship at Kudos Technolabs gave me hands-on experience with AWS Lambda, IAM policies, and event-driven architectures.",
    "I believe in building things that work — whether it's a bare-metal audio spectrum analyzer running at 24 FPS on a $5 chip, or a fully automated CI/CD pipeline deploying containers to Kubernetes.",
  ],
  stats: [
    { label: "Projects Built", value: 12 },
    { label: "Technologies", value: 25 },
    { label: "CGPA", value: 8.74 },
  ],
};

export const skillCategories: SkillCategory[] = [
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
    title: "VLSI & Digital Design",
    skills: [
      { name: "Verilog HDL", level: 90 },
      { name: "SystemVerilog", level: 80 },
      { name: "RTL Design & FSMs", level: 85 },
      { name: "UVM Foundations", level: 70 },
      { name: "FPGA (Xilinx ISE/Vivado)", level: 80 },
      { name: "Timing-Aware Design", level: 75 },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS (Lambda, S3, EC2, VPC)", level: 80 },
      { name: "Docker & Kubernetes", level: 80 },
      { name: "Terraform (IaC)", level: 75 },
      { name: "CI/CD (CircleCI, GitHub Actions)", level: 75 },
      { name: "Datadog Monitoring", level: 70 },
      { name: "Linux & Shell Scripting", level: 85 },
    ],
  },
  {
    title: "Programming & Tools",
    skills: [
      { name: "C / C++", level: 90 },
      { name: "Python", level: 85 },
      { name: "Git / GitHub", level: 90 },
      { name: "GNU Make", level: 75 },
      { name: "MATLAB", level: 70 },
      { name: "VS Code / STM32CubeIDE", level: 90 },
    ],
  },
];

export const projects: Project[] = [
  {
    id: "audio-spectrum-analyzer",
    title: "Audio Spectrum Analyzer",
    description:
      "Real-time 8-band spectrum visualizer on bare-metal STM32. Captures audio via I2S MEMS mic, processes with 512-point FFT (CMSIS-DSP), applies AGC, and renders on SSD1306 OLED at ~24 FPS.",
    tags: ["STM32", "Embedded C", "CMSIS-DSP", "I2S", "DMA", "OLED"],
    category: "embedded",
    featured: true,
    image: "/images/projects/audio-spectrum.png",
    github: "https://github.com/KushalPitaliya/AudioSpectrumAnalyzer",
  },
  {
    id: "ai-eda-playground",
    title: "AI-Driven EDA Playground",
    description:
      "Browser-based RTL design environment where natural language prompts generate Verilog modules, auto-generate testbenches, run simulation, and self-correct bugs — closing the design loop autonomously.",
    tags: ["SystemVerilog", "AI/LLM", "Icarus Verilog", "Next.js", "Python"],
    category: "vlsi",
    featured: true,
    image: "/images/projects/ai-eda.png",
    github: "https://github.com/KushalPitaliya/ai-eda-playground",
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
  },
  {
    id: "fifo-memory-buffer",
    title: "Synchronous FIFO Memory Buffer",
    description:
      "Hardware FIFO for buffering data streams between producer/consumer subsystems. Verified with directed and randomized testbenches; synthesized on Spartan-6 FPGA.",
    tags: ["Verilog HDL", "Spartan-6 FPGA", "Xilinx ISE", "ModelSim"],
    category: "vlsi",
    featured: false,
    image: "/images/projects/fifo.png",
  },
  {
    id: "ultrasonic-distance-system",
    title: "Ultrasonic Distance Measurement System",
    description:
      "Real-time distance measurement using AVR ATmega32 with HC-SR04 sensor. Interrupt-driven echo detection, Timer1 input capture for precision, custom LCD driver, and UART serial output.",
    tags: ["AVR", "Embedded C", "UART", "Timers", "Interrupts"],
    category: "embedded",
    featured: false,
    image: "/images/projects/ultrasonic.png",
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
  },
  {
    id: "k8s-deployment",
    title: "Docker & Kubernetes Deployment",
    description:
      "Containerized Python app with multi-stage Dockerfile, deployed to Kubernetes with rolling updates, liveness/readiness probes, and resource limits for production-grade reliability.",
    tags: ["Docker", "Kubernetes", "EC2", "Rolling Updates"],
    category: "cloud",
    featured: false,
    image: "/images/projects/k8s.png",
  },
  {
    id: "cicd-pipeline",
    title: "CI/CD Pipeline with CircleCI",
    description:
      "Fully automated pipeline: lint → test → Docker build → push → deploy on merge. CircleCI orbs for reusable steps, Datadog integration for post-deployment APM monitoring.",
    tags: ["CircleCI", "Docker", "Datadog", "GitHub Actions"],
    category: "cloud",
    featured: false,
    image: "/images/projects/cicd.png",
  },
  {
    id: "video-processing-pipeline",
    title: "Serverless Video Processing Pipeline",
    description:
      "Media processing workflow using AWS MediaConvert triggered by S3 events via Lambda. CloudFront CDN distribution for low-latency delivery, with DLQ error handling.",
    tags: ["AWS MediaConvert", "S3", "Lambda", "CloudFront"],
    category: "cloud",
    featured: false,
    image: "/images/projects/video-pipeline.png",
  },
  {
    id: "fsm-controller",
    title: "FSM-Based Digital Controller",
    description:
      "Multi-state Mealy/Moore FSM in SystemVerilog with clock-driven structured testbenches and assertions. Strictly synthesizable with always_ff/always_comb constructs.",
    tags: ["SystemVerilog", "FSM", "Assertions", "Testbench"],
    category: "vlsi",
    featured: false,
    image: "/images/projects/fsm.png",
  },
];

export const experiences: Experience[] = [
  {
    id: "exp-kudos",
    company: "Kudos Technolabs",
    role: "Cloud Technologies Intern",
    period: "May 2025 — July 2025",
    description: [
      "Designed and deployed event-driven serverless architectures using AWS Lambda and S3 event triggers",
      "Implemented fine-grained IAM policies and role-based access control for multi-service workflows",
      "Set up SNS notification pipelines for asynchronous, decoupled service communication",
      "Automated repetitive cloud operations using Python and shell scripts to reduce manual intervention",
    ],
  },
  {
    id: "exp-ugsf",
    company: "CHARUSAT — ECE Department",
    role: "Undergraduate Student Fellow (UGSF)",
    period: "Aug 2024 — Present",
    description: [
      "Selected under a merit-based fellowship to contribute to embedded systems lab and academic activities",
      "Assisted in development of technical documentation and firmware-related academic content",
      "Coordinated hands-on workshops covering microcontroller programming, PCB design, and FPGA design",
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
      "Computer Architecture",
      "Embedded Systems",
      "Design, Testing & Verification",
      "Signal Processing",
      "Data Structures & Algorithms",
    ],
    achievements: [
      "Undergraduate Student Fellow (UGSF) — Merit-based selection",
      "Second Runner-up — Idea Show 3.0",
      "iChip 3.0 Verilog Hackathon — RTL design challenge participant",
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
    name: "Google AI Essentials",
    issuer: "Google",
    date: "2025",
  },
  {
    id: "cert-gcp",
    name: "Google Cloud Essentials",
    issuer: "Google Cloud",
    date: "2025",
  },
  {
    id: "cert-digital-circuits",
    name: "Design of Digital Circuits",
    issuer: "L&T EduTech",
    date: "2024",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "Building a Bare-Metal Audio Spectrum Analyzer on STM32",
    excerpt:
      "How I built an 8-band real-time spectrum visualizer from scratch — I2S microphone, CMSIS-DSP FFT, AGC, and SSD1306 OLED rendering at 24 FPS on a $5 microcontroller.",
    date: "2025-06-15",
    tags: ["STM32", "Embedded C", "DSP", "Bare-Metal"],
    url: "https://github.com/KushalPitaliya/AudioSpectrumAnalyzer",
  },
  {
    id: "blog-2",
    title: "Event-Driven Serverless on AWS: Lessons from My Internship",
    excerpt:
      "Key takeaways from building production serverless pipelines at Kudos Technolabs — Lambda triggers, IAM least-privilege, and SNS decoupling patterns.",
    date: "2025-07-20",
    tags: ["AWS", "Lambda", "Serverless", "Cloud"],
    url: "#",
  },
  {
    id: "blog-3",
    title: "From Verilog to SystemVerilog: A Practical Transition Guide",
    excerpt:
      "What I learned moving from basic Verilog to SystemVerilog — always_ff vs always_comb, interfaces, assertions, and why it matters for verification.",
    date: "2025-03-10",
    tags: ["SystemVerilog", "Verilog", "VLSI", "Verification"],
    url: "#",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "UGSF Faculty Advisor",
    role: "Professor, ECE Department",
    company: "CHARUSAT",
    text: "Kushal demonstrates exceptional initiative in the embedded systems lab. His Audio Spectrum Analyzer project showcases a rare combination of firmware engineering depth and practical DSP implementation for an undergraduate.",
  },
  {
    id: "test-2",
    name: "Internship Mentor",
    role: "Cloud Team Lead",
    company: "Kudos Technolabs",
    text: "Kushal quickly grasped complex AWS architectures and delivered production-ready serverless pipelines. His ability to automate operations with Python scripts and implement proper IAM policies showed maturity beyond his experience level.",
  },
  {
    id: "test-3",
    name: "Workshop Peer",
    role: "Fellow Engineering Student",
    company: "CHARUSAT ECE",
    text: "Kushal's workshops on FPGA design and PCB prototyping were the most hands-on sessions our batch experienced. He has a gift for making complex hardware concepts accessible and practical.",
  },
];

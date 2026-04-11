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
    "Aspiring VLSI Design Verification Engineer with expertise in Cloud/DevOps and Embedded Systems. Building the future at the intersection of hardware and software.",
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
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/kushalpitaliya",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/kushalpitaliya",
    icon: "linkedin",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/kushalpitaliya",
    icon: "twitter",
  },
  {
    name: "Email",
    url: "mailto:kushal@example.com",
    icon: "mail",
  },
];

export const aboutData = {
  headline: "Bridging Hardware & Software",
  description: [
    "I'm Kushal Pitaliya — an engineer passionate about VLSI Design Verification, Cloud/DevOps, and Embedded Systems. I thrive at the intersection where hardware meets software, building solutions that push the boundaries of what's possible.",
    "From designing verification environments for complex digital circuits to deploying scalable cloud infrastructure and programming embedded microcontrollers, I bring a full-stack hardware-software perspective to every project.",
    "I believe in writing clean, efficient code — whether it's SystemVerilog testbenches, Terraform configurations, or bare-metal C firmware.",
  ],
  stats: [
    { label: "Projects Completed", value: 15 },
    { label: "Technologies", value: 20 },
    { label: "Certifications", value: 5 },
  ],
};

export const skillCategories: SkillCategory[] = [
  {
    title: "VLSI & Verification",
    skills: [
      { name: "SystemVerilog", level: 85 },
      { name: "UVM", level: 75 },
      { name: "Verilog", level: 90 },
      { name: "FPGA Design", level: 80 },
      { name: "Digital Design", level: 85 },
      { name: "Timing Analysis", level: 70 },
    ],
  },
  {
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS", level: 80 },
      { name: "Docker", level: 85 },
      { name: "Kubernetes", level: 75 },
      { name: "Terraform", level: 70 },
      { name: "CI/CD", level: 80 },
      { name: "Linux", level: 85 },
    ],
  },
  {
    title: "Embedded Systems",
    skills: [
      { name: "C/C++", level: 85 },
      { name: "STM32", level: 80 },
      { name: "Arduino", level: 90 },
      { name: "RTOS", level: 70 },
      { name: "PCB Design", level: 65 },
      { name: "I2C/SPI/UART", level: 80 },
    ],
  },
  {
    title: "Programming & Tools",
    skills: [
      { name: "Python", level: 85 },
      { name: "Git", level: 90 },
      { name: "JavaScript", level: 75 },
      { name: "MATLAB", level: 70 },
      { name: "Bash/Shell", level: 80 },
      { name: "VS Code", level: 90 },
    ],
  },
];

export const projects: Project[] = [
  {
    id: "vending-machine-fsm",
    title: "Vending Machine FSM",
    description:
      "Mealy & Moore finite state machine implementation of a vending machine in Verilog with comprehensive testbench verification.",
    tags: ["Verilog", "FSM", "Testbench", "GTKWave"],
    category: "vlsi",
    featured: true,
    image: "/images/projects/vending-machine.png",
    github: "https://github.com/kushalpitaliya/vending-machine",
  },
  {
    id: "cloud-infra-automation",
    title: "Cloud Infrastructure Automation",
    description:
      "End-to-end cloud infrastructure provisioning using Terraform, Docker, and Kubernetes with automated CI/CD pipelines.",
    tags: ["AWS", "Terraform", "Docker", "Kubernetes", "GitHub Actions"],
    category: "cloud",
    featured: true,
    image: "/images/projects/cloud-infra.png",
    github: "https://github.com/kushalpitaliya/cloud-infra",
  },
  {
    id: "embedded-iot-system",
    title: "IoT Monitoring System",
    description:
      "Real-time environmental monitoring system using STM32 microcontroller with sensor fusion, MQTT communication, and cloud dashboard.",
    tags: ["STM32", "C", "MQTT", "Sensors", "Real-time"],
    category: "embedded",
    featured: true,
    image: "/images/projects/iot-system.png",
    github: "https://github.com/kushalpitaliya/iot-monitor",
  },
  {
    id: "alu-design",
    title: "32-bit ALU Design",
    description:
      "Complete 32-bit Arithmetic Logic Unit design in Verilog with support for 16 operations and carry lookahead adder.",
    tags: ["Verilog", "ALU", "Digital Design", "Synthesis"],
    category: "vlsi",
    featured: false,
    image: "/images/projects/alu.png",
    github: "https://github.com/kushalpitaliya/alu-32bit",
  },
  {
    id: "ci-cd-pipeline",
    title: "Multi-Stage CI/CD Pipeline",
    description:
      "Production-grade CI/CD pipeline with automated testing, security scanning, container builds, and blue-green deployments.",
    tags: ["Jenkins", "Docker", "SonarQube", "ArgoCD"],
    category: "cloud",
    featured: false,
    image: "/images/projects/cicd.png",
    github: "https://github.com/kushalpitaliya/cicd-pipeline",
  },
  {
    id: "motor-controller",
    title: "BLDC Motor Controller",
    description:
      "Brushless DC motor controller using STM32 with FOC algorithm, PID tuning, and CAN bus communication.",
    tags: ["STM32", "FOC", "PID", "CAN Bus", "PCB"],
    category: "embedded",
    featured: false,
    image: "/images/projects/motor.png",
    github: "https://github.com/kushalpitaliya/bldc-controller",
  },
];

export const experiences: Experience[] = [
  {
    id: "exp-1",
    company: "Project Experience",
    role: "VLSI Design Verification",
    period: "2024 — Present",
    description: [
      "Developing SystemVerilog testbenches with UVM methodology for complex digital designs",
      "Implementing constrained-random verification with functional coverage models",
      "Working with FPGA prototyping and timing closure on Xilinx platforms",
    ],
  },
  {
    id: "exp-2",
    company: "Cloud DevOps Project",
    role: "Cloud & DevOps Engineer",
    period: "2023 — 2024",
    description: [
      "Designed and deployed scalable cloud infrastructure on AWS using Terraform",
      "Containerized applications with Docker and orchestrated with Kubernetes",
      "Built CI/CD pipelines reducing deployment time by 70%",
    ],
  },
  {
    id: "exp-3",
    company: "Embedded Systems Lab",
    role: "Embedded Systems Developer",
    period: "2022 — 2023",
    description: [
      "Programmed STM32 microcontrollers for real-time sensor data acquisition",
      "Developed firmware for IoT devices with MQTT and wireless protocols",
      "Designed custom PCBs for prototype embedded systems",
    ],
  },
];

export const education: Education[] = [
  {
    id: "edu-1",
    institution: "University",
    degree: "Bachelor of Technology",
    field: "Electronics & Communication Engineering",
    period: "2021 — 2025",
    gpa: "8.5/10",
  },
];

export const certifications: Certification[] = [
  {
    id: "cert-1",
    name: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    credentialUrl: "#",
  },
  {
    id: "cert-2",
    name: "Docker Certified Associate",
    issuer: "Docker Inc.",
    date: "2024",
    credentialUrl: "#",
  },
  {
    id: "cert-3",
    name: "FPGA Design with Vivado",
    issuer: "Xilinx",
    date: "2023",
    credentialUrl: "#",
  },
  {
    id: "cert-4",
    name: "Embedded Systems Programming",
    issuer: "Coursera",
    date: "2023",
    credentialUrl: "#",
  },
  {
    id: "cert-5",
    name: "Linux System Administration",
    issuer: "Linux Foundation",
    date: "2023",
    credentialUrl: "#",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: "Understanding UVM: A Beginner's Guide",
    excerpt:
      "A comprehensive introduction to Universal Verification Methodology and how it revolutionizes hardware verification.",
    date: "2024-03-15",
    tags: ["UVM", "Verification", "VLSI"],
    url: "#",
  },
  {
    id: "blog-2",
    title: "Deploying on AWS with Terraform",
    excerpt:
      "Step-by-step guide to infrastructure as code using Terraform for AWS cloud deployments.",
    date: "2024-02-20",
    tags: ["AWS", "Terraform", "DevOps"],
    url: "#",
  },
  {
    id: "blog-3",
    title: "STM32 + FreeRTOS: Getting Started",
    excerpt:
      "Learn how to set up FreeRTOS on STM32 microcontrollers for real-time embedded applications.",
    date: "2024-01-10",
    tags: ["STM32", "RTOS", "Embedded"],
    url: "#",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Professor A. Sharma",
    role: "Faculty Advisor",
    company: "University",
    text: "Kushal demonstrates exceptional aptitude in digital design and verification. His ability to bridge hardware and software concepts is remarkable for someone at his level.",
  },
  {
    id: "test-2",
    name: "Team Lead",
    role: "Project Mentor",
    company: "Cloud DevOps Project",
    text: "Outstanding work on the cloud infrastructure project. Kushal quickly grasped complex DevOps concepts and delivered production-ready solutions ahead of schedule.",
  },
  {
    id: "test-3",
    name: "Lab Coordinator",
    role: "Supervisor",
    company: "Embedded Systems Lab",
    text: "Kushal's embedded systems projects show a deep understanding of both hardware interfacing and firmware development. His IoT monitoring system was the highlight of the semester.",
  },
];

export interface ProjectMetric {
  label: string;
  value: string;
}

export type ProjectCategory = "vlsi" | "embedded" | "cloud" | "web";

/** Honest completion state — surfaced on every card so nothing is oversold. */
export type ProjectStatus =
  | "verified" // simulated/tested and passing
  | "hardware" // proven on real silicon/board
  | "shipped" // deployed / production-built
  | "demo" // working demo / proof-of-concept
  | "in-progress"; // architecture done, build ongoing

/** Which aurora hue themes the card. */
export type ProjectAccent = "indigo" | "cyan" | "teal" | "magenta" | "amber";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  image?: string;
  tags: string[];
  category: ProjectCategory;
  /** Human-readable domain label, e.g. "Silicon", "Cloud". */
  domain: string;
  status?: ProjectStatus;
  accent?: ProjectAccent;
  year?: string;
  github?: string;
  live?: string;
  /** Reason a repo link is absent — e.g. "Private", "Commercial". */
  closedReason?: string;
  featured: boolean;
  metrics?: ProjectMetric[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
  logo?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  period: string;
  gpa?: string;
  logo?: string;
  coursework?: string[];
  achievements?: string[];
}

export interface Skill {
  name: string;
  icon?: string;
  level: number; // 0-100
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  image?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  image?: string;
  url: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

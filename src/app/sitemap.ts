import type { MetadataRoute } from "next";
import { projects } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kushalpitaliya.vercel.app";
  const now = new Date();

  const staticRoutes = ["", "/work", "/about", "/writeups", "/contact"];
  const projectRoutes = projects.map((p) => `/work/${p.id}`);

  return [...staticRoutes, ...projectRoutes].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : path.startsWith("/work/") ? 0.7 : 0.8,
  }));
}

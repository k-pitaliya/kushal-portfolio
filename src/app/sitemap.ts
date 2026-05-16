import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://kushalpitaliya.vercel.app";
  const now = new Date();

  // Single-page portfolio: list the canonical URL once at top priority,
  // then each in-page section anchor for crawlers that follow them.
  const sections: Array<{ slug: string; priority: number }> = [
    { slug: "about", priority: 0.8 },
    { slug: "skills", priority: 0.7 },
    { slug: "methodology", priority: 0.8 },
    { slug: "projects", priority: 0.9 },
    { slug: "experience", priority: 0.8 },
    { slug: "education", priority: 0.6 },
    { slug: "certifications", priority: 0.5 },
    { slug: "blog", priority: 0.6 },
    { slug: "testimonials", priority: 0.4 },
    { slug: "contact", priority: 0.7 },
  ];

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...sections.map((s) => ({
      url: `${base}/#${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: s.priority,
    })),
  ];
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import CaseStudy from "@/components/sections/CaseStudy";

/** Pre-render a static page for every project. */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return { title: "Project — Kushal Pitaliya" };
  return {
    title: `${project.title} — Kushal Pitaliya`,
    description: project.description,
    alternates: { canonical: `/work/${project.id}` },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) notFound();
  return <CaseStudy project={project} />;
}

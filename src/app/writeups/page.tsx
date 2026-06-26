import type { Metadata } from "next";
import Writeups from "@/components/sections/Writeups";

export const metadata: Metadata = {
  title: "Writeups — Kushal Pitaliya",
  description:
    "Engineering writeups: coverage closure, debug walkthroughs, and RTL bug reports from real UVM verification projects.",
  alternates: { canonical: "/writeups" },
};

export default function WriteupsPage() {
  return <Writeups />;
}

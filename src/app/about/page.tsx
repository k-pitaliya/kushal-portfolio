import type { Metadata } from "next";
import About from "@/components/sections/About";
import StackAndApproach from "@/components/sections/StackAndApproach";
import Background from "@/components/sections/Background";

export const metadata: Metadata = {
  title: "About — Kushal Pitaliya",
  description:
    "ECE undergrad at CHARUSAT focused on VLSI design verification — background, stack, methodology, experience and education.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <About />
      <StackAndApproach />
      <Background />
    </>
  );
}

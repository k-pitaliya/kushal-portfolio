import type { Metadata } from "next";
import Projects from "@/components/sections/Projects";

export const metadata: Metadata = {
  title: "Work — Kushal Pitaliya",
  description:
    "Selected work: UVM verification of I2C and AXI4-Lite, an AMBA SoC, FPGA & embedded firmware, AWS serverless infrastructure, and full-stack apps.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return <Projects />;
}

import type { Metadata } from "next";
import Contact from "@/components/sections/Contact";

export const metadata: Metadata = {
  title: "Contact — Kushal Pitaliya",
  description:
    "Get in touch with Kushal Pitaliya — open to VLSI / Design Verification roles.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <Contact />;
}

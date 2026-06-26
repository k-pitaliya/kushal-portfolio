import type { Metadata } from "next";
import { Fraunces, Geist, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/layout/SiteShell";

/* Display serif with optical sizing — characterful, premium, non-generic */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kushalpitaliya.vercel.app"),
  title: "Kushal Pitaliya — VLSI Design Verification Engineer",
  description:
    "RTL · SystemVerilog · UVM 1.2 · SVA · coverage-driven verification. ECE undergrad at CHARUSAT — 41 bugs found and fixed across full UVM testbenches for I2C and AXI4-Lite, plus cloud and embedded systems work.",
  keywords: [
    "Kushal Pitaliya",
    "VLSI Design Verification",
    "Design Verification Engineer",
    "RTL Design",
    "SystemVerilog",
    "Verilog HDL",
    "UVM 1.2",
    "SVA Assertions",
    "Functional Coverage",
    "FPGA Prototyping",
    "AXI4-Lite",
    "I2C Protocol Verification",
    "Embedded Systems",
    "STM32",
    "AWS Serverless",
    "EDA Playground",
  ],
  authors: [{ name: "Kushal Pitaliya" }],
  alternates: { canonical: "https://kushalpitaliya.vercel.app" },
  verification: { google: "IPrGre0AxtIPcQENkZXAdx4U5B-_AHp3n3IKRAmckPw" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "Kushal Pitaliya — VLSI Design Verification Engineer",
    description:
      "UVM testbench architecture · SystemVerilog · SVA · coverage-driven RTL verification. 41 bugs found and fixed.",
    type: "website",
    locale: "en_US",
    url: "https://kushalpitaliya.vercel.app",
    siteName: "Kushal Pitaliya",
    images: [
      {
        url: "https://kushalpitaliya.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kushal Pitaliya — VLSI Design Verification Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kushal Pitaliya — VLSI Design Verification Engineer",
    description:
      "RTL · SystemVerilog · UVM 1.2 · SVA · coverage-driven verification of digital IPs.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geist.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link
          rel="preload"
          as="image"
          href="/images/kushal.jpg"
          fetchPriority="high"
        />
      </head>
      <body className="bg-bg text-text antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Kushal Pitaliya",
              url: "https://kushalpitaliya.vercel.app",
              jobTitle: "VLSI Design Verification Engineer",
              description:
                "VLSI Design Verification Engineer specializing in UVM 1.2 testbench architecture, SystemVerilog Assertions, functional coverage closure, and RTL design.",
              knowsAbout: [
                "VLSI Design Verification",
                "SystemVerilog",
                "UVM 1.2",
                "SVA Assertions",
                "Verilog HDL",
                "Functional Coverage",
                "FPGA Prototyping",
                "RTL Design",
                "AXI4-Lite",
                "I2C Protocol",
                "Embedded Systems",
                "STM32",
                "AWS Serverless",
                "Python",
              ],
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Charotar University of Science and Technology (CHARUSAT)",
              },
              sameAs: [
                "https://github.com/k-pitaliya",
                "https://www.linkedin.com/in/kushalpitaliya06/",
              ],
            }),
          }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kushalpitaliya.dev"),
  title: "Kushal Pitaliya — VLSI Design Verification & Cloud Engineer",
  description:
    "VLSI Design Verification (SystemVerilog · UVM · FPGA) × Cloud Architecture (AWS · Serverless · Terraform). ECE student at CHARUSAT building at the intersection of silicon and the cloud.",
  keywords: [
    "Kushal Pitaliya",
    "VLSI Design",
    "Design Verification",
    "RTL Design",
    "SystemVerilog",
    "Verilog",
    "UVM",
    "FPGA",
    "AWS",
    "Cloud Architecture",
    "Serverless",
    "Terraform",
    "Embedded Systems",
  ],
  authors: [{ name: "Kushal Pitaliya" }],
  alternates: {
    canonical: "https://kushalpitaliya.dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "Kushal Pitaliya — VLSI Design Verification & Cloud Engineer",
    description:
      "VLSI Design Verification · Cloud Architecture · SystemVerilog · UVM · AWS · Terraform",
    type: "website",
    locale: "en_US",
    url: "https://kushalpitaliya.dev",
    siteName: "Kushal Pitaliya",
    images: [
      {
        url: "https://kushalpitaliya.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kushal Pitaliya — VLSI Design Verification & Cloud Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kushal Pitaliya — VLSI & Embedded Systems Engineer",
    description:
      "VLSI Design & Verification · RTL in Verilog/SystemVerilog · FPGA Prototyping · Embedded Firmware",
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
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg text-text antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Kushal Pitaliya",
              url: "https://kushalpitaliya.dev",
              jobTitle: "Aspiring VLSI Design & Verification Engineer",
              description:
                "VLSI Design & Verification Engineer specializing in RTL design, SystemVerilog verification, FPGA prototyping, and embedded firmware development.",
              knowsAbout: [
                "VLSI Design Verification",
                "SystemVerilog",
                "UVM 1.2",
                "Verilog HDL",
                "Functional Coverage",
                "FPGA Prototyping",
                "RTL Design",
                "Embedded Systems",
                "STM32",
                "AWS",
                "Python",
              ],
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "Charotar University of Science and Technology (CHARUSAT)",
              },
              sameAs: [
                "https://github.com/KushalPitaliya",
                "https://www.linkedin.com/in/kushalpitaliya06/",
              ],
            }),
          }}
        />
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}

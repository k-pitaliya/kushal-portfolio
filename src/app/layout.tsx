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
  title: "Kushal Pitaliya — VLSI & Embedded Systems Engineer",
  description:
    "Aspiring VLSI Design & Verification Engineer — RTL design in Verilog/SystemVerilog, FPGA prototyping on Spartan-6, UVM verification methodology, and bare-metal embedded firmware. ECE student at CHARUSAT.",
  keywords: [
    "Kushal Pitaliya",
    "VLSI Design",
    "Design Verification",
    "RTL Design",
    "SystemVerilog",
    "Verilog",
    "UVM",
    "FPGA",
    "Embedded Systems",
    "STM32",
  ],
  authors: [{ name: "Kushal Pitaliya" }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "Kushal Pitaliya — VLSI & Embedded Systems Engineer",
    description:
      "VLSI Design & Verification · RTL in Verilog/SystemVerilog · FPGA Prototyping · Embedded Firmware",
    type: "website",
    locale: "en_US",
    url: "https://kushalpitaliya.dev",
    siteName: "Kushal Pitaliya",
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

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
  metadataBase: new URL("https://kushalpitaliya.vercel.app"),
  title: "Kushal Pitaliya — VLSI Design Verification Engineer",
  description:
    "RTL · SystemVerilog · UVM 1.2 · SVA · Coverage-driven verification. ECE undergrad at CHARUSAT — 41 bugs found and fixed across full UVM testbenches for I2C and AXI4-Lite.",
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
    "EDA Playground",
  ],
  authors: [{ name: "Kushal Pitaliya" }],
  alternates: {
    canonical: "https://kushalpitaliya.vercel.app",
  },
  verification: {
    google: "IPrGre0AxtIPcQENkZXAdx4U5B-_AHp3n3IKRAmckPw",
  },
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
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {/* Preload above-the-fold headshot so the About section's <img> is
            warm by the time the user scrolls past the Hero. React 19 hoists
            these <link>s into the document <head>. */}
        <link
          rel="preload"
          as="image"
          href="/images/kushal.jpg"
          fetchPriority="high"
        />
        {/* next/font already self-hosts the woff2 files, but adding an explicit
            dns-prefetch is cheap insurance for any third-party fonts.googleapis
            references that may sneak in via dev tooling or future edits. */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
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
        <div className="noise-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}

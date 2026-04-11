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
  title: "Kushal Pitaliya — Engineer & Builder",
  description:
    "Electronics & Communication Engineering student at CHARUSAT with hands-on experience in Embedded Systems, Cloud/DevOps, and VLSI Design Verification. Building at the intersection of hardware and software.",
  keywords: [
    "Kushal Pitaliya",
    "VLSI",
    "Design Verification",
    "Cloud DevOps",
    "Embedded Systems",
    "Portfolio",
  ],
  authors: [{ name: "Kushal Pitaliya" }],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "Kushal Pitaliya — Engineer & Builder",
    description:
      "ECE student at CHARUSAT — Embedded Systems, Cloud/DevOps, and VLSI Design Verification.",
    type: "website",
    locale: "en_US",
    url: "https://kushalpitaliya.dev",
    siteName: "Kushal Pitaliya",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kushal Pitaliya — Engineer & Builder",
    description:
      "ECE student at CHARUSAT — Embedded Systems, Cloud/DevOps, and VLSI Design Verification.",
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
              jobTitle: "Electronics & Communication Engineering Student",
              description:
                "Engineer & Builder specializing in Embedded Systems, Cloud/DevOps, and VLSI Design Verification.",
              knowsAbout: [
                "Embedded Systems",
                "Cloud Computing",
                "DevOps",
                "VLSI Design Verification",
                "STM32",
                "AWS",
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

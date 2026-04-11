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
    "Aspiring VLSI Design Verification Engineer with expertise in Cloud/DevOps and Embedded Systems. Building the future at the intersection of hardware and software.",
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
      "Aspiring VLSI Design Verification Engineer with expertise in Cloud/DevOps and Embedded Systems.",
    type: "website",
    locale: "en_US",
    url: "https://kushalpitaliya.dev",
    siteName: "Kushal Pitaliya",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kushal Pitaliya — Engineer & Builder",
    description:
      "Aspiring VLSI Design Verification Engineer with expertise in Cloud/DevOps and Embedded Systems.",
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
              jobTitle: "VLSI Design Verification Engineer",
              description:
                "Engineer & Builder specializing in VLSI, Cloud/DevOps, and Embedded Systems.",
              knowsAbout: [
                "VLSI Design Verification",
                "Cloud Computing",
                "DevOps",
                "Embedded Systems",
              ],
              sameAs: [
                "https://github.com/kushalpitaliya",
                "https://linkedin.com/in/kushalpitaliya",
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

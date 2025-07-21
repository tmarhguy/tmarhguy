import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Tyrone Marhguy - Hardware Engineer & Researcher",
  description: "Personal portfolio showcasing hardware projects, CPU design, software development, and research by Tyrone Marhguy.",
  keywords: ["hardware engineer", "CPU design", "digital systems", "FPGA", "embedded systems", "software development"],
  authors: [{ name: "Tyrone Marhguy", url: "https://tyrone.tech" }],
  creator: "Tyrone Marhguy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tyrone.tech",
    title: "Tyrone Marhguy - Hardware Engineer & Researcher",
    description: "Personal portfolio showcasing hardware projects, CPU design, software development, and research.",
    siteName: "Tyrone Marhguy Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tyrone Marhguy - Hardware Engineer & Researcher",
    description: "Personal portfolio showcasing hardware projects, CPU design, software development, and research.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} font-sans antialiased bg-gray-900 text-white`}
      >
        {children}
        {process.env.NODE_ENV === 'production' && (
          <script
            async
            defer
            data-domain="tyrone.tech"
            src="https://plausible.io/js/script.js"
          />
        )}
      </body>
    </html>
  );
}

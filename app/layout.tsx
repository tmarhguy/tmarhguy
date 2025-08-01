import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import CursorIllumination from "@/components/ui/CursorIllumination";

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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      { url: "/icons/apple-touch-icon-57x57.png", sizes: "57x57", type: "image/png" },
      { url: "/icons/apple-touch-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/icons/apple-touch-icon-76x76.png", sizes: "76x76", type: "image/png" },
      { url: "/icons/apple-touch-icon-114x114.png", sizes: "114x114", type: "image/png" },
      { url: "/icons/apple-touch-icon-120x120.png", sizes: "120x120", type: "image/png" },
      { url: "/icons/apple-touch-icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/icons/apple-touch-icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/icons/apple-touch-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tmarhguy.github.io/tmarhguy",
    title: "Tyrone Marhguy - Hardware Engineer & Researcher",
    description: "Personal portfolio showcasing hardware projects, CPU design, software development, and research.",
    siteName: "Tyrone Marhguy Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tyrone Marhguy - Hardware Engineer & Researcher",
    description: "Personal portfolio showcasing hardware projects, CPU design, software development, and research.",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} font-sans antialiased bg-black text-white`}
        suppressHydrationWarning={true}
      >
        <CursorIllumination />
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

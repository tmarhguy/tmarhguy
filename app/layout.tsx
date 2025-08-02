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
  title: "Tyrone Marhguy - Computer Engineering @ UPenn",
  description: "Computer Engineering student at UPenn specializing in discrete hardware systems, embedded design, and full-stack development. Building everything from 700+ transistor CPUs to scalable web platforms.",
  keywords: ["computer engineering", "discrete transistor CPU", "hardware design", "FPGA", "embedded systems", "full-stack development", "UPenn"],
  authors: [{ name: "Tyrone Marhguy", url: "https://tmarhguy.github.io/tmarhguy" }],
  creator: "Tyrone Marhguy",
  icons: {
    icon: [
      { url: "/tmarhguy/favicon.svg", type: "image/svg+xml" },
      { url: "/tmarhguy/favicon-16x16.svg", sizes: "16x16", type: "image/svg+xml" },
      { url: "/tmarhguy/favicon-32x32.svg", sizes: "32x32", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/tmarhguy/apple-touch-icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tmarhguy.github.io/tmarhguy",
    title: "Tyrone Marhguy - Computer Engineering @ UPenn",
    description: "Computer Engineering student at UPenn specializing in discrete hardware systems, embedded design, and full-stack development.",
    siteName: "Tyrone Marhguy Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tyrone Marhguy - Computer Engineering @ UPenn",
    description: "Personal portfolio showcasing hardware projects, CPU design, software development, and research.",
  },
  manifest: "/tmarhguy/site.webmanifest",
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
            data-domain="tmarhguy.dev"
            src="https://plausible.io/js/script.js"
          />
        )}
      </body>
    </html>
  );
}

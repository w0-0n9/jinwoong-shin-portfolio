import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";

// Initialize Inter
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Initialize JetBrains Mono
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jinwoong-shin-portfolio.web.app"),
  title: {
    default: "Jinwoong Shin - Portfolio",
    template: "%s | Jinwoong Shin",
  },
  description: "Software Engineer specializing in Full Stack Development, AI/ML, and Cloud Computing. Passionate about building scalable web applications and intelligent systems using Next.js, Python, and AWS.",
  openGraph: {
    title: "Jinwoong Shin - Portfolio",
    description: "Software Engineer specializing in Full Stack Development, AI/ML, and Cloud Computing. Passionate about building scalable web applications and intelligent systems using Next.js, Python, and AWS.",
    url: "https://jinwoong-shin-portfolio.web.app",
    siteName: "Jinwoong Shin Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/profile.jpg",
        width: 800,
        height: 800,
        alt: "Jinwoong Shin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jinwoong Shin - Portfolio",
    description: "Software Engineer specializing in Full Stack Development, AI/ML, and Cloud Computing. Passionate about building scalable web applications and intelligent systems using Next.js, Python, and AWS.",
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased overflow-x-hidden`}
      >
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Google Analytics 4 measurement ID (public value — safe to inline).
const GA_ID = "G-TPF71VXKQ6";

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
  // suppressHydrationWarning: browser extensions (e.g. Scribe, password
  // managers) inject attributes onto <html>/<body> before React hydrates,
  // which would otherwise trigger a hydration mismatch warning.
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased overflow-x-hidden`}
      >
        {children}

        {/* Google Analytics (gtag.js) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google"; // [MODIFY]
import "./globals.css";

// [MODIFY] Initialize Inter
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// [MODIFY] Initialize JetBrains Mono
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jinwoong Shin - Portfolio", // [MODIFY]
  description: "Software Engineer Portfolio", // [MODIFY]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`} // [MODIFY]
      >
        {children}
      </body>
    </html>
  );
}

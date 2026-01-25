import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { BackgroundEffects } from "@/components/layout/background-effects";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Randomizer Brasil",
  description: "Gaming and tech platform with modern cyan aesthetic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased relative bg-background`}
      >
        <BackgroundEffects />
        <div className="relative z-10">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}

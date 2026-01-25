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

function getBaseUrl() {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: "Randomizer Brasil",
    template: "%s | Randomizer Brasil",
  },
  description: "Comunidade brasileira de randomizers. Acompanhe streams ao vivo, descubra jogos randomizados e conecte-se com outros jogadores.",
  keywords: ["randomizer", "brasil", "zelda", "alttp", "oot", "speedrun", "twitch", "gaming"],
  authors: [{ name: "Randomizer Brasil" }],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Randomizer Brasil",
    title: "Randomizer Brasil",
    description: "Comunidade brasileira de randomizers. Acompanhe streams ao vivo, descubra jogos randomizados e conecte-se com outros jogadores.",
    images: [
      {
        url: "/images/social-rbr.png",
        width: 1200,
        height: 630,
        alt: "Randomizer Brasil",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Randomizer Brasil",
    description: "Comunidade brasileira de randomizers. Acompanhe streams ao vivo, descubra jogos randomizados e conecte-se com outros jogadores.",
    images: ["/images/social-rbr.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
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

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoadingScreen from "@/components/layout/LoadingScreen";
import SmoothScrollProvider from "@/components/motion/SmoothScrollProvider";
import { getSettings } from "@/lib/data";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading-family",
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body-family",
  weight: ["400", "500", "600"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono-family",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  title: {
    default: "Asia Engineer — Konstruksi Premium dengan Presisi Rekayasa",
    template: "%s | Asia Engineer",
  },
  description:
    "Asia Engineer adalah perusahaan konstruksi yang menghadirkan solusi bangunan residensial, komersial, dan industrial dengan standar rekayasa yang presisi.",
  openGraph: {
    title: "Asia Engineer — Konstruksi Premium dengan Presisi Rekayasa",
    description:
      "Solusi konstruksi premium untuk proyek residensial, komersial, dan industrial di Indonesia.",
    images: ["/images/hero/hero-main.jpg"],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asia Engineer",
    description: "Konstruksi premium dengan presisi rekayasa.",
    images: ["/images/hero/hero-main.jpg"],
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const settings = await getSettings();

  return (
    <html lang="id" className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="bg-paper text-text antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
        >
          Lompat ke konten utama
        </a>
        <LoadingScreen />
        <SmoothScrollProvider>
          <Navbar settings={settings} />
          <main id="main-content">{children}</main>
          <Footer settings={settings} />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

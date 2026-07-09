import type { Metadata } from 'next';
import { Poppins, Inter } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'asiaengineer — Kontraktor Terpercaya',
  description:
    'Jasa kontraktor profesional: survey, penawaran, pengerjaan, hingga serah terima proyek.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${poppins.variable} ${inter.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/globals.css';
import Header from '../_components/base/Header';
import Footer from '../_components/base/Footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ngekost Aja | Platform Pencarian Kos Murah untuk Mahasiswa',
  description: 'Platform pencarian kos mahasiswa, mudah dan cepat!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

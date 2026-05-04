import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Quran Mazid — Read, Study, and Learn The Quran",
  description:
    "Read the Holy Quran with Arabic text, English translation (Sahih International), audio recitation, and customizable font settings. All 114 surahs available.",
  keywords: "Quran, Holy Quran, Arabic, English translation, Sahih International, recitation, Islamic",
  openGraph: {
    title: "Quran Mazid — Read, Study, and Learn The Quran",
    description: "Read the Holy Quran online with Arabic text, English translation, and audio recitation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${inter.variable} dark`}>
      <head>
        {/* Google Fonts: Amiri & Scheherazade New for Arabic */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Scheherazade+New:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-[var(--font-inter)] antialiased min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}

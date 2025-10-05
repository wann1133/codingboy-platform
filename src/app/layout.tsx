import type { Metadata } from "next";
import { Geist, Geist_Mono, Anton, IBM_Plex_Mono } from "next/font/google";
import SnappyCTAs from '@/components/SnappyCTAs';
import WhatsAppFloatWrapper from '@/components/WhatsAppFloatWrapper';
import { LanguageProvider } from '@/components/LanguageContext';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodingBoy - Jasa Pembuatan Website Profesional #1 untuk UKM & Startup",
  description: "Website berkualitas tinggi dengan harga terjangkau. Tingkatkan kredibilitas bisnis Anda dalam 3-7 hari kerja!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} ${plexMono.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
          <SnappyCTAs />
          <WhatsAppFloatWrapper 
            phoneNumber={process.env.WHATSAPP_PHONE_NUMBER || "+62881025741054"}
            defaultMessage="Halo CodingBoy! Saya tertarik dengan layanan pembuatan website. Bisa konsultasi gratis?"
          />
        </LanguageProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
    <ClerkProvider>
      <html lang="id">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          <WhatsAppFloat 
            phoneNumber={process.env.WHATSAPP_PHONE_NUMBER || "+62881025741054"}
            defaultMessage="Halo CodingBoy! Saya tertarik dengan layanan pembuatan website. Bisa konsultasi gratis?"
          />
        </body>
      </html>
    </ClerkProvider>
  );
}

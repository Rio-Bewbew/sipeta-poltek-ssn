import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedBackground from "@/components/AnimatedBackground";

export const metadata: Metadata = {
  title: "SIPETA — E-Pembinaan Taruna Poltek SSN",
  description:
    "Sistem Informasi Pembinaan Taruna: platform edukasi interaktif untuk memahami dan menerapkan metode pembinaan positif, mendidik, dan bebas kekerasan sesuai Perdir Poltek SSN No. 2 Tahun 2024.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen flex flex-col bg-transparent text-teks antialiased">
        <AnimatedBackground />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevPortfolio Builder",
  description: "Crea tu portfolio de desarrollador de forma visual",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Verificar si estamos en la ruta portfolio
  const isPortfolioRoute = typeof window !== 'undefined' && window.location.pathname.startsWith('/portfolio');

  return (
    <html lang="es">
      <body className={inter.className}>
        {!isPortfolioRoute && <Navbar />}
        {children}
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { UserProvider } from "@/contexts/UserContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevPortfolio Builder",
  description: "Crea portfolios increíbles sin código",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className={inter.className}>
        <UserProvider>
          <Navbar />
          {children}
        </UserProvider>
        <footer className="bg-gray-800 text-gray-400 py-4 text-center text-sm">
          © {new Date().getFullYear()} DevPortfolio Builder &mdash; Adrián Gutiérrez Segovia
        </footer>
      </body>
    </html>
  );
}

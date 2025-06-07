import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { UserProvider } from "@/contexts/UserContext";
import { AlertProvider } from "@/contexts/AlertContext";

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
    <html lang="es">
      <body className={inter.className}>
        <UserProvider>
          <AlertProvider>
            <Navbar />
            {children}
            <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    © {new Date().getFullYear()}{' '}
                    <a
                      href="https://github.com/amsteradri/DevPortfolio-Builder"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      DevPortfolio Builder
                    </a>
                    . Todos los derechos reservados.
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Desarrollado por{' '}
                    <a
                      href="https://www.linkedin.com/in/adri%C3%A1n-gutierrez-segovia-1275a8165/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      Adrián Gutiérrez Segovia
                    </a>
                  </div>
                </div>
              </div>
            </footer>
          </AlertProvider>
        </UserProvider>
      </body>
    </html>
  );
}

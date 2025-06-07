"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isPortfolioRoute = pathname?.startsWith('/p/');

  return (
    <>
      {!isPortfolioRoute && <Navbar />}
      {children}
      <Footer />
    </>
  );
} 
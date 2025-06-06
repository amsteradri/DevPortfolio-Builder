export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Este layout NO incluye la Navbar ni nada del layout raíz
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  );
} 
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Portfolio público',
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // No incluir html y body aquí, solo el contenido
  return children;
}
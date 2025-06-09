import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { name: string } }): Promise<Metadata> {
  try {
    const portfolio = await getPortfolio(params.name);
    
    return {
      title: `${portfolio.name} | DevPortfolio`,
      description: portfolio.description || 'Portfolio profesional creado con DevPortfolio Builder',
      openGraph: {
        title: `${portfolio.name} | DevPortfolio`,
        description: portfolio.description || 'Portfolio profesional creado con DevPortfolio Builder',
        images: [portfolio.image || '/og-image.png'],
      },
    };
  } catch {
    return {
      title: 'Portfolio no encontrado | DevPortfolio',
      description: 'El portfolio que buscas no existe o ha sido eliminado',
    };
  }
} 
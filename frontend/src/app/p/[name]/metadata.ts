import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { name: string } }): Promise<Metadata> {
  try {
    const portfolioName = typeof params.name === 'string' ? params.name : '';
    
    if (!portfolioName) {
      return {
        title: 'Error',
        description: 'Nombre de portfolio no válido'
      };
    }

    const response = await fetch(`http://localhost:8000/portfolio/${encodeURIComponent(portfolioName)}`);
    if (!response.ok) {
      return {
        title: 'Portfolio no encontrado',
        description: 'El portfolio solicitado no existe'
      };
    }
    const portfolio = await response.json();
    return {
      title: `${portfolio.name} - Portfolio`,
      description: `Portfolio de ${portfolio.name}`,
      openGraph: {
        title: `${portfolio.name} - Portfolio`,
        description: `Portfolio de ${portfolio.name}`,
        type: 'website',
      },
    };
  } catch (error) {
    return {
      title: 'Error',
      description: 'Error al cargar el portfolio'
    };
  }
} 
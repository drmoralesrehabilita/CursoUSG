import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Diplomado USG Dr. Raúl Morales',
    short_name: 'CursoUSG',
    description: 'Plataforma educativa médica y de intervencionismo en rehabilitación.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f172a',
    theme_color: '#00b4d8',
    icons: [
      {
        src: '/logos/raulmoralescolor.png',
        sizes: 'any',
        type: 'image/png',
      },
      // Idealmente aquí deben ir los iconos 192x192 y 512x512
      // que se generarán mediante pwa-asset-generator
    ],
  }
}

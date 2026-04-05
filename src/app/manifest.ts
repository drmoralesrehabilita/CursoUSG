import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Expediente DLM / CursoUSG',
    short_name: 'ExpedienteDLM',
    description: 'Plataforma educativa médica y de rehabilitación.',
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

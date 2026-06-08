import type { Metadata } from 'next'

import { ServicesContent } from './services-content'
import { breadcrumbJsonLd, webPageJsonLd } from '@/components/seo/json-ld'

const description =
  "L'hôtel ★★ de l'Auberge Le Permayou à Accous : 8 chambres chaleureuses, dont des chambres avec vue sur la montagne et une chambre accessible PMR. Étape idéale dans la Vallée d'Aspe pour randonneurs et cyclistes."

export const metadata: Metadata = {
  title: "L'Hôtel",
  description,
  alternates: { canonical: '/services' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    webPageJsonLd("L'Hôtel", description, '/services'),
    breadcrumbJsonLd([
      { name: 'Accueil', path: '/' },
      { name: "L'Hôtel", path: '/services' },
    ]),
  ],
}

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesContent />
    </>
  )
}

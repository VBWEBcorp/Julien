import type { Metadata } from 'next'

import { ValleeContent } from './vallee-content'
import { breadcrumbJsonLd, webPageJsonLd } from '@/components/seo/json-ld'

const description =
  "La Vallée d'Aspe depuis l'Auberge Le Permayou : randonnée (GR10, Saint-Jacques), vélo (col du Somport), faune sauvage et patrimoine. Votre camp de base au cœur des Pyrénées."

export const metadata: Metadata = {
  title: "La Vallée d'Aspe",
  description,
  alternates: { canonical: '/vallee-d-aspe' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    webPageJsonLd("La Vallée d'Aspe", description, '/vallee-d-aspe'),
    breadcrumbJsonLd([
      { name: 'Accueil', path: '/' },
      { name: "La Vallée d'Aspe", path: '/vallee-d-aspe' },
    ]),
  ],
}

export default function ValleePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ValleeContent />
    </>
  )
}

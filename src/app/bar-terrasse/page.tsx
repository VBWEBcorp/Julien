import type { Metadata } from 'next'

import { BarTerrasseContent } from './bar-terrasse-content'
import { breadcrumbJsonLd, webPageJsonLd } from '@/components/seo/json-ld'

const description =
  "Le bar et la terrasse de l'Auberge Le Permayou à Accous, avec vue sur le Cirque d'Iseye. Un bar de village ouvert à tous, apéro, pause cycliste et café face aux montagnes."

export const metadata: Metadata = {
  title: 'Le Bar & la Terrasse',
  description,
  alternates: { canonical: '/bar-terrasse' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    webPageJsonLd('Le Bar & la Terrasse', description, '/bar-terrasse'),
    breadcrumbJsonLd([
      { name: 'Accueil', path: '/' },
      { name: 'Le Bar & la Terrasse', path: '/bar-terrasse' },
    ]),
  ],
}

export default function BarTerrassePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BarTerrasseContent />
    </>
  )
}

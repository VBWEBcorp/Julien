import type { Metadata } from 'next'

import { RestaurantContent } from './restaurant-content'
import { breadcrumbJsonLd, webPageJsonLd } from '@/components/seo/json-ld'

const description =
  "Le restaurant de l'Auberge Le Permayou à Accous : cuisine traditionnelle et de saison, produits de la Vallée d'Aspe et spécialités du Béarn. Ouvert midi et soir, bar et snacking."

export const metadata: Metadata = {
  title: 'Le Restaurant',
  description,
  alternates: { canonical: '/restaurant' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    webPageJsonLd('Le Restaurant', description, '/restaurant'),
    breadcrumbJsonLd([
      { name: 'Accueil', path: '/' },
      { name: 'Le Restaurant', path: '/restaurant' },
    ]),
  ],
}

export default function RestaurantPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RestaurantContent />
    </>
  )
}

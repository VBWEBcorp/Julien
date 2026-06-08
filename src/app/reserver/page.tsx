import type { Metadata } from 'next'

import { ReserverContent } from './reserver-content'
import { breadcrumbJsonLd, webPageJsonLd } from '@/components/seo/json-ld'

const description =
  "Réservez votre séjour à l'Auberge Le Permayou, à Accous dans la Vallée d'Aspe. 8 chambres dont une accessible PMR. Réservation en ligne sécurisée ou par téléphone."

export const metadata: Metadata = {
  title: 'Réserver',
  description,
  alternates: { canonical: '/reserver' },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    webPageJsonLd('Réserver', description, '/reserver'),
    breadcrumbJsonLd([
      { name: 'Accueil', path: '/' },
      { name: 'Réserver', path: '/reserver' },
    ]),
  ],
}

export default function ReserverPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ReserverContent />
    </>
  )
}

export const siteConfig = {
  name: 'Auberge Le Permayou',
  url: 'https://www.le-permayou.com', // ⚠️ nom de domaine à changer (contrat coupé)
  locale: 'fr_FR',
  description:
    "Auberge Hôtel-Restaurant-Bar au cœur de la Vallée d'Aspe, à Accous. 8 chambres (dont 1 PMR), cuisine traditionnelle aspoise, bar et terrasse avec vue sur les montagnes. Étape sur le chemin de Saint-Jacques de Compostelle, idéale randonneurs et cyclistes.",
  ogImage: 'https://www.le-permayou.com/og.jpg',
  twitterHandle: '@lepermayou',
  themeColor: '#274923',
  phone: '+33 5 59 34 72 15',
  email: 'permayouaccous@gmail.com', // à migrer vers un email pro
  address: {
    street: '134 Route Nationale',
    city: 'Accous',
    postalCode: '64490',
    country: 'FR',
  },
  social: {
    facebook: 'https://www.facebook.com/', // ⚠️ URL exacte de la page à confirmer
    instagram: 'https://www.instagram.com/', // ⚠️ URL exacte du compte à confirmer
  },
  // Réservation — Phase 1 : deep-link vers le moteur Amenitiz (nouvel onglet).
  // Phase 2 : iframe embarqué sur /reserver. ⚠️ URL réelle à fournir une fois
  // l'accès admin Amenitiz débloqué (code SMS auprès du propriétaire actuel).
  booking: {
    amenitizUrl: 'https://le-permayou.amenitiz.io/fr/booking', // moteur Amenitiz du Permayou
  },
} as const

export type SeoMeta = {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  noindex?: boolean
  jsonLd?: Record<string, unknown>
}

export function buildTitle(page?: string) {
  if (!page) return siteConfig.name
  return `${page} - ${siteConfig.name}`
}

export const routes = [
  '/',
  '/services',
  '/restaurant',
  '/bar-terrasse',
  '/vallee-d-aspe',
  '/reserver',
  '/a-propos',
  '/contact',
  '/mentions-legales',
  '/politique-de-confidentialite',
  '/conditions-generales',
  '/politique-cookies',
] as const

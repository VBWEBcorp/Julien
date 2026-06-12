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
    facebook: 'https://www.facebook.com/permayou/',
    instagram: 'https://www.instagram.com/le_permayou_/',
  },
  // Réservation — Phase 1 : deep-link vers le moteur Amenitiz (nouvel onglet).
  // Phase 2 : iframe embarqué sur /reserver. ⚠️ URL réelle à fournir une fois
  // l'accès admin Amenitiz débloqué (code SMS auprès du propriétaire actuel).
  booking: {
    // Amenitiz met la langue dans le chemin (/fr /en /es). On construit l'URL
    // selon la locale via amenitizBookingUrl(). amenitizUrl = défaut FR (fallback).
    amenitizBase: 'https://le-permayou.amenitiz.io',
    amenitizUrl: 'https://le-permayou.amenitiz.io/fr/booking',
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

export const SEO_LOCALES = ['fr', 'en', 'es'] as const
export type SeoLocale = (typeof SEO_LOCALES)[number]

/** URL du moteur de réservation Amenitiz dans la langue de la page (fallback FR). */
export function amenitizBookingUrl(locale: string): string {
  const lang = (SEO_LOCALES as readonly string[]).includes(locale) ? locale : 'fr'
  return `${siteConfig.booking.amenitizBase}/${lang}/booking`
}

// URL absolue d'une page pour une locale donnée. FR à la racine (pas de
// préfixe), EN/ES préfixés. `path` est un chemin « FR » (ex. '/restaurant').
export function localizedUrl(path: string, locale: string): string {
  const clean = path === '/' ? '' : path
  const prefix = locale === 'fr' ? '' : `/${locale}`
  return `${siteConfig.url}${prefix}${clean}` || siteConfig.url
}

// Bloc `alternates` Next pour une page : canonical propre à la locale +
// liens hreflang vers toutes les langues (+ x-default → FR).
export function alternatesFor(path: string, locale: string) {
  return {
    canonical: localizedUrl(path, locale),
    languages: {
      fr: localizedUrl(path, 'fr'),
      en: localizedUrl(path, 'en'),
      es: localizedUrl(path, 'es'),
      'x-default': localizedUrl(path, 'fr'),
    },
  }
}

// Locale → balise OpenGraph (fr_FR, en_US, es_ES).
export function ogLocale(locale: string): string {
  return locale === 'en' ? 'en_US' : locale === 'es' ? 'es_ES' : 'fr_FR'
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

import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { RestaurantContent } from './restaurant-content'
import { breadcrumbJsonLd, webPageJsonLd } from '@/components/seo/json-ld'
import { alternatesFor, ogLocale, siteConfig } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('meta')
  const title = t('restaurant.title')
  const description = t('restaurant.description')
  return {
    title,
    description,
    alternates: alternatesFor('/restaurant', locale),
    openGraph: {
      type: 'website',
      locale: ogLocale(locale),
      title,
      description,
      url: alternatesFor('/restaurant', locale).canonical,
      siteName: siteConfig.name,
    },
  }
}

export default async function RestaurantPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('meta')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd('Le Restaurant', t('restaurant.description'), '/restaurant', locale),
      breadcrumbJsonLd(
        [
          { name: 'Accueil', path: '/' },
          { name: 'Le Restaurant', path: '/restaurant' },
        ],
        locale
      ),
    ],
  }

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

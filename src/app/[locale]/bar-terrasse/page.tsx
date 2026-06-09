import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { BarTerrasseContent } from './bar-terrasse-content'
import { breadcrumbJsonLd, webPageJsonLd } from '@/components/seo/json-ld'
import { alternatesFor, ogLocale, siteConfig } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('meta')
  const title = t('barTerrasse.title')
  const description = t('barTerrasse.description')
  return {
    title,
    description,
    alternates: alternatesFor('/bar-terrasse', locale),
    openGraph: {
      type: 'website',
      locale: ogLocale(locale),
      title,
      description,
      url: alternatesFor('/bar-terrasse', locale).canonical,
      siteName: siteConfig.name,
    },
  }
}

export default async function BarTerrassePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('meta')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd('Le Bar & la Terrasse', t('barTerrasse.description'), '/bar-terrasse', locale),
      breadcrumbJsonLd(
        [
          { name: 'Accueil', path: '/' },
          { name: 'Le Bar & la Terrasse', path: '/bar-terrasse' },
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
      <BarTerrasseContent />
    </>
  )
}

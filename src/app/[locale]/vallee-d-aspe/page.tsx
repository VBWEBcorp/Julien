import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { ValleeContent } from './vallee-content'
import { breadcrumbJsonLd, webPageJsonLd } from '@/components/seo/json-ld'
import { alternatesFor, ogLocale, siteConfig } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('meta')
  const title = t('valleeDAspe.title')
  const description = t('valleeDAspe.description')
  return {
    title,
    description,
    alternates: alternatesFor('/vallee-d-aspe', locale),
    openGraph: {
      type: 'website',
      locale: ogLocale(locale),
      title,
      description,
      url: alternatesFor('/vallee-d-aspe', locale).canonical,
      siteName: siteConfig.name,
    },
  }
}

export default async function ValleePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('meta')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd("La Vallée d'Aspe", t('valleeDAspe.description'), '/vallee-d-aspe', locale),
      breadcrumbJsonLd(
        [
          { name: 'Accueil', path: '/' },
          { name: "La Vallée d'Aspe", path: '/vallee-d-aspe' },
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
      <ValleeContent />
    </>
  )
}

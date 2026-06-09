import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { ServicesContent } from './services-content'
import { breadcrumbJsonLd, webPageJsonLd } from '@/components/seo/json-ld'
import { alternatesFor, ogLocale, siteConfig } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('meta')
  const title = t('services.title')
  const description = t('services.description')
  return {
    title,
    description,
    alternates: alternatesFor('/services', locale),
    openGraph: {
      type: 'website',
      locale: ogLocale(locale),
      title,
      description,
      url: alternatesFor('/services', locale).canonical,
      siteName: siteConfig.name,
    },
  }
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('meta')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd("L'Hôtel", t('services.description'), '/services', locale),
      breadcrumbJsonLd(
        [
          { name: 'Accueil', path: '/' },
          { name: "L'Hôtel", path: '/services' },
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
      <ServicesContent />
    </>
  )
}

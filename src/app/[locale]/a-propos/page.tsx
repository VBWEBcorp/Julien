import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { AboutContent } from './about-content'
import { breadcrumbJsonLd, webPageJsonLd } from '@/components/seo/json-ld'
import { alternatesFor, ogLocale, siteConfig } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('meta')
  const title = t('aPropos.title')
  const description = t('aPropos.description')
  return {
    title,
    description,
    alternates: alternatesFor('/a-propos', locale),
    openGraph: {
      type: 'website',
      locale: ogLocale(locale),
      title,
      description,
      url: alternatesFor('/a-propos', locale).canonical,
      siteName: siteConfig.name,
    },
  }
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('meta')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd("L'auberge", t('aPropos.description'), '/a-propos', locale),
      breadcrumbJsonLd(
        [
          { name: 'Accueil', path: '/' },
          { name: "L'auberge", path: '/a-propos' },
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
      <AboutContent />
    </>
  )
}

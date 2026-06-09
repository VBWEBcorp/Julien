import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { ReserverContent } from './reserver-content'
import { breadcrumbJsonLd, webPageJsonLd } from '@/components/seo/json-ld'
import { alternatesFor, ogLocale, siteConfig } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('meta')
  const title = t('reserver.title')
  const description = t('reserver.description')
  return {
    title,
    description,
    alternates: alternatesFor('/reserver', locale),
    openGraph: {
      type: 'website',
      locale: ogLocale(locale),
      title,
      description,
      url: alternatesFor('/reserver', locale).canonical,
      siteName: siteConfig.name,
    },
  }
}

export default async function ReserverPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('meta')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd('Réserver', t('reserver.description'), '/reserver', locale),
      breadcrumbJsonLd(
        [
          { name: 'Accueil', path: '/' },
          { name: 'Réserver', path: '/reserver' },
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
      <ReserverContent />
    </>
  )
}

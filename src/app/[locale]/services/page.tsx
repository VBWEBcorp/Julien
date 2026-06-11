import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { ServicesContent } from './services-content'
import { breadcrumbJsonLd, webPageJsonLd } from '@/components/seo/json-ld'
import { buildPageMetadata } from '@/lib/seo-content'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('meta')
  return buildPageMetadata({
    pageId: 'services',
    path: '/services',
    locale,
    title: t('services.title'),
    description: t('services.description'),
  })
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

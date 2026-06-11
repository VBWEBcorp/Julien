import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { ValleeContent } from './vallee-content'
import { breadcrumbJsonLd, webPageJsonLd } from '@/components/seo/json-ld'
import { buildPageMetadata } from '@/lib/seo-content'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('meta')
  return buildPageMetadata({
    pageId: 'vallee-aspe',
    path: '/vallee-d-aspe',
    locale,
    title: t('valleeDAspe.title'),
    description: t('valleeDAspe.description'),
  })
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

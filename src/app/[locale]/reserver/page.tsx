import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { ReserverContent } from './reserver-content'
import { breadcrumbJsonLd, webPageJsonLd } from '@/components/seo/json-ld'
import { buildPageMetadata } from '@/lib/seo-content'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('meta')
  return buildPageMetadata({
    pageId: 'reserver',
    path: '/reserver',
    locale,
    title: t('reserver.title'),
    description: t('reserver.description'),
  })
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

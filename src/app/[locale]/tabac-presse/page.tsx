import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { TabacPresseContent } from './tabac-presse-content'
import { breadcrumbJsonLd, webPageJsonLd } from '@/components/seo/json-ld'
import { buildPageMetadata } from '@/lib/seo-content'

// Méta SEO par langue (défauts, surchargeables depuis le CMS via pageId).
const META: Record<string, { title: string; description: string }> = {
  fr: {
    title: 'Tabac & Presse',
    description:
      "Tabac, presse, jeux et petits services du quotidien au Permayou, à Accous, au cœur de la vallée d'Aspe.",
  },
  en: {
    title: 'Tobacconist & Press',
    description:
      'Tobacco, press, lottery games and everyday services at Le Permayou, in Accous, in the heart of the Aspe Valley.',
  },
  es: {
    title: 'Estanco y Prensa',
    description:
      'Estanco, prensa, juegos y pequeños servicios del día a día en Le Permayou, en Accous, en el corazón del Valle de Aspe.',
  },
}

const BREADCRUMB: Record<string, string> = {
  fr: 'Tabac & Presse',
  en: 'Tobacconist & Press',
  es: 'Estanco y Prensa',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const meta = META[locale] ?? META.fr
  return buildPageMetadata({
    pageId: 'tabac-presse',
    path: '/tabac-presse',
    locale,
    title: meta.title,
    description: meta.description,
  })
}

export default async function TabacPressePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const meta = META[locale] ?? META.fr
  const breadcrumb = BREADCRUMB[locale] ?? BREADCRUMB.fr

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd(meta.title, meta.description, '/tabac-presse', locale),
      breadcrumbJsonLd(
        [
          { name: 'Accueil', path: '/' },
          { name: breadcrumb, path: '/tabac-presse' },
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
      <TabacPresseContent />
    </>
  )
}

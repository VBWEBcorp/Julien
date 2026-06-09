import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { ContactContent } from './contact-content'
import { breadcrumbJsonLd, webPageJsonLd } from '@/components/seo/json-ld'
import { alternatesFor, ogLocale, siteConfig } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('meta')
  const title = t('contact.title')
  const description = t('contact.description')
  return {
    title,
    description,
    alternates: alternatesFor('/contact', locale),
    openGraph: {
      type: 'website',
      locale: ogLocale(locale),
      title,
      description,
      url: alternatesFor('/contact', locale).canonical,
      siteName: siteConfig.name,
    },
  }
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('meta')

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      webPageJsonLd('Contact', t('contact.description'), '/contact', locale),
      breadcrumbJsonLd(
        [
          { name: 'Accueil', path: '/' },
          { name: 'Contact', path: '/contact' },
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
      <ContactContent />
    </>
  )
}

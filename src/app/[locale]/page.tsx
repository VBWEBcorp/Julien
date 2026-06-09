import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { CtaSection } from '@/components/sections/cta-section'
import { FaqSection } from '@/components/sections/faq-section'
import { GalleryCarousel } from '@/components/sections/gallery-carousel'
import { HeroSection } from '@/components/sections/hero-section'
import { PolesMosaic } from '@/components/sections/poles-mosaic'
import { StorySection } from '@/components/sections/story-section'
import { TestimonialsSection } from '@/components/sections/testimonials-section'
import { ValuesMarquee } from '@/components/sections/values-marquee'
import {
  localBusinessJsonLd,
  organizationJsonLd,
  webPageJsonLd,
  webSiteJsonLd,
} from '@/components/seo/json-ld'
import { alternatesFor, ogLocale, siteConfig } from '@/lib/seo'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
  return {
    alternates: alternatesFor('/', locale),
    openGraph: {
      type: 'website',
      locale: ogLocale(locale),
      url: alternatesFor('/', locale).canonical,
      siteName: siteConfig.name,
    },
  }
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      webSiteJsonLd(),
      organizationJsonLd(),
      localBusinessJsonLd(),
      webPageJsonLd(siteConfig.name, siteConfig.description, '/', locale),
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <PolesMosaic />
      <FaqSection />
      <StorySection />
      <TestimonialsSection />
      <GalleryCarousel />
      <CtaSection />
      <ValuesMarquee />
    </>
  )
}

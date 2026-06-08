'use client'

import { CtaSection } from '@/components/sections/cta-section'
import { FeatureCards } from '@/components/sections/feature-cards'
import { ImageGallery } from '@/components/sections/image-gallery'
import { PremiumHero } from '@/components/sections/premium-hero'
import { useContent } from '@/hooks/use-content'
import { images as siteImages, barTerrasseContent } from '@/lib/site-content'

const defaults = {
  hero: barTerrasseContent.hero,
  sections: barTerrasseContent.sections,
}

const galleryImages = [
  { src: siteImages.services[2], caption: 'Le bar' },
  { src: siteImages.services[5], caption: 'La terrasse' },
  { src: siteImages.services[7], caption: 'Face aux montagnes' },
  { src: siteImages.contactHero, caption: 'Vue dégagée' },
  { src: siteImages.services[3], caption: 'Couchers de soleil sur la vallée' },
  { src: siteImages.story, caption: "L'apéro après la rando" },
]

export function BarTerrasseContent() {
  const { data } = useContent('bar-terrasse', defaults)
  const hero = data.hero ?? defaults.hero
  const sections = data.sections ?? defaults.sections

  return (
    <>
      <PremiumHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumb="Le Bar & la Terrasse"
        compact
        backgroundImage={siteImages.services[2]}
      />

      <FeatureCards items={sections} columns={3} />

      <ImageGallery eyebrow="En images" title="Le bar & la terrasse" images={galleryImages} />

      <CtaSection />
    </>
  )
}

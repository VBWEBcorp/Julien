'use client'

import { CtaSection } from '@/components/sections/cta-section'
import { FeatureCards } from '@/components/sections/feature-cards'
import { ImageGallery } from '@/components/sections/image-gallery'
import { PremiumHero } from '@/components/sections/premium-hero'
import { useContent } from '@/hooks/use-content'
import { images as siteImages, valleeAspeContent } from '@/lib/site-content'

const defaults = {
  hero: valleeAspeContent.hero,
  activities: valleeAspeContent.activities,
}

const galleryImages = [
  { src: siteImages.services[3], caption: "La vallée d'Aspe" },
  { src: siteImages.services[4], caption: 'Sur les sentiers' },
  { src: siteImages.services[7], caption: 'Les sommets' },
  { src: siteImages.aboutHero, caption: 'Grands espaces' },
  { src: siteImages.contactHero, caption: 'Nature préservée' },
  { src: siteImages.story, caption: 'Votre camp de base' },
]

export function ValleeContent() {
  const { data } = useContent('vallee-aspe', defaults)
  const hero = data.hero ?? defaults.hero
  const activities = data.activities ?? defaults.activities

  return (
    <>
      <PremiumHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumb="La Vallée d'Aspe"
        compact
        backgroundImage={siteImages.services[3]}
      />

      <FeatureCards
        eyebrow="Activités"
        title="Tout est à portée de l'auberge"
        items={activities}
        columns={4}
      />

      <ImageGallery eyebrow="En images" title="La vallée en grand" images={galleryImages} />

      <CtaSection />
    </>
  )
}

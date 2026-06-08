'use client'

import { CtaSection } from '@/components/sections/cta-section'
import { FeatureCards } from '@/components/sections/feature-cards'
import { ImageGallery } from '@/components/sections/image-gallery'
import { PremiumHero } from '@/components/sections/premium-hero'
import { useContent } from '@/hooks/use-content'
import { images as siteImages, restaurantContent } from '@/lib/site-content'

const galleryImages = [
  { src: siteImages.services[1], caption: 'Cuisine de saison' },
  { src: siteImages.services[5], caption: 'La salle' },
  { src: siteImages.services[2], caption: 'Le bar' },
  { src: siteImages.aboutGallery[2], caption: 'Produits du terroir' },
  { src: siteImages.story, caption: 'Ambiance conviviale' },
  { src: siteImages.services[6], caption: 'Le Permayou' },
]

const defaults = {
  hero: restaurantContent.hero,
  sections: restaurantContent.sections,
  hours: restaurantContent.hours,
}

export function RestaurantContent() {
  const { data } = useContent('restaurant', defaults)
  const hero = data.hero ?? defaults.hero
  const sections = data.sections ?? defaults.sections
  const hours = data.hours ?? defaults.hours

  return (
    <>
      <PremiumHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumb="Le Restaurant"
        compact
        backgroundImage={siteImages.services[1]}
      />

      <FeatureCards items={sections} columns={3} />

      <ImageGallery eyebrow="En images" title="La table & le lieu" images={galleryImages} />

      <section className="border-b border-border/60 bg-[oklch(0.975_0.008_95)] dark:bg-[oklch(0.19_0.015_150)]">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 lg:px-8 lg:py-20">
          <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            {hours.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
            {hours.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {hours.note}
          </p>
        </div>
      </section>

      <CtaSection />
    </>
  )
}

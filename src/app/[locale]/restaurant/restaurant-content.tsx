'use client'

import { CartesSection } from './cartes-section'
import { CtaSection } from '@/components/sections/cta-section'
import { PremiumHero } from '@/components/sections/premium-hero'
import { MountainBackdrop } from '@/components/ui/mountain-backdrop'
import { useContent } from '@/hooks/use-content'
import { images as siteImages, restaurantContent } from '@/lib/site-content'
import { splitAccentTitle } from '@/lib/utils'

const defaults = {
  hero: restaurantContent.hero,
  hours: restaurantContent.hours,
}

export function RestaurantContent() {
  const { data } = useContent('restaurant', defaults)
  const hero = data.hero ?? defaults.hero
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

      {/* Les 3 sections : Notre cuisine · Produits du terroir · Bar & snacking */}
      <CartesSection />

      {/* Horaires — carte encadrée */}
      <section className="relative isolate overflow-hidden border-b border-border/60 bg-[oklch(0.975_0.008_95)] dark:bg-[oklch(0.19_0.015_150)]">
        <MountainBackdrop tone="light" />
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-8 text-center shadow-[0_20px_50px_-20px_oklch(0.2_0.02_150/0.2)] backdrop-blur-sm sm:p-12">
            <p className="inline-flex items-center gap-3 font-display text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              <span className="h-px w-7 bg-[oklch(0.73_0.15_62)]" aria-hidden />
              {hours.eyebrow}
              <span className="h-px w-7 bg-[oklch(0.73_0.15_62)]" aria-hidden />
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
              {(() => {
                const { lead, accent } = splitAccentTitle(hours.title)
                return lead ? (
                  <>
                    {lead}{' '}
                    <span className="font-serif italic font-normal text-primary">{accent}</span>
                  </>
                ) : (
                  hours.title
                )
              })()}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {hours.note}
            </p>
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}

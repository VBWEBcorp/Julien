'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

import { CartesSection } from './cartes-section'
import { CtaSection } from '@/components/sections/cta-section'
import { PremiumHero } from '@/components/sections/premium-hero'
import { MountainBackdrop } from '@/components/ui/mountain-backdrop'
import { useContent } from '@/hooks/use-content'
import { getIcon } from '@/lib/icons'
import { images as siteImages, restaurantContent } from '@/lib/site-content'
import { BRAND_ACCENTS, splitAccentTitle } from '@/lib/utils'

const ease = [0.22, 1, 0.36, 1] as const

const defaults = {
  hero: restaurantContent.hero,
  sections: restaurantContent.sections,
  hours: restaurantContent.hours,
}

// Spécialités maison — plats du terroir aspois cités sur le site.
const specialites = [
  { name: 'La garbure', note: 'La soupe paysanne du Béarn, mijotée longuement.' },
  { name: 'Palombe en saison', note: 'Le gibier emblématique de la vallée.' },
  { name: 'Fromages de brebis', note: 'Affinés par les producteurs voisins.' },
  { name: 'Viandes du pays', note: 'Élevées dans les estives alentour.' },
]

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

      {/* La carte — entrées de menu typographiques avec lignes de pointillés */}
      <section className="relative isolate overflow-hidden border-b border-border/60 bg-[oklch(0.975_0.008_95)] dark:bg-[oklch(0.19_0.015_150)]">
        <MountainBackdrop tone="light" />
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mb-12 text-center lg:mb-16">
            <p className="inline-flex items-center gap-3 font-display text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              <span className="h-px w-7 bg-[oklch(0.73_0.15_62)]" aria-hidden />
              Notre table
              <span className="h-px w-7 bg-[oklch(0.73_0.15_62)]" aria-hidden />
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
              Ce qui vous attend{' '}
              <span className="font-serif italic font-normal text-primary">à table</span>
            </h2>
          </div>

          <div className="divide-y divide-border/60">
            {sections.map((s: any, i: number) => {
              const Icon = getIcon(s.iconName)
              return (
                <motion.article
                  key={s.title || i}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: i * 0.07, ease }}
                  className="py-8 first:pt-0"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="inline-flex size-9 shrink-0 -translate-y-0.5 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <h3 className="font-display text-xl font-semibold tracking-[-0.01em] text-foreground sm:text-2xl">
                      {s.title}
                    </h3>
                    <span
                      className="mx-1 hidden flex-1 -translate-y-1 border-b border-dotted border-border sm:block"
                      aria-hidden
                    />
                    <span
                      className="hidden font-mono text-xs tabular-nums tracking-[0.2em] sm:block"
                      style={{ color: BRAND_ACCENTS[i % BRAND_ACCENTS.length] }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground sm:pl-[3.25rem] sm:text-lg">
                    {s.description}
                  </p>
                  {s.points?.length > 0 && (
                    <div className="mt-4 flex flex-wrap items-center gap-y-1 sm:pl-[3.25rem]">
                      {s.points.map((p: string, j: number) => (
                        <span key={j} className="text-sm text-muted-foreground">
                          {j > 0 && (
                            <span className="mx-2 text-border" aria-hidden>
                              ·
                            </span>
                          )}
                          {p}
                        </span>
                      ))}
                    </div>
                  )}
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Spécialités de la maison — bandeau image + liste */}
      <section className="relative isolate overflow-hidden border-b border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease }}
              className="relative aspect-[16/11] overflow-hidden rounded-3xl shadow-[0_30px_60px_-25px_oklch(0.2_0.02_150/0.35)] ring-1 ring-border/60 lg:aspect-[4/5]"
            >
              <Image
                src={siteImages.aboutGallery[2]}
                alt="Spécialités de la maison"
                fill
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover"
              />
            </motion.div>
            <div>
              <p className="inline-flex items-center gap-3 font-display text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                <span className="h-px w-7 bg-[oklch(0.73_0.15_62)]" aria-hidden />
                Spécialités
              </p>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
                Le goût de la{' '}
                <span className="font-serif italic font-normal text-primary">Vallée d&rsquo;Aspe</span>
              </h2>
              <ul className="mt-8 space-y-5">
                {specialites.map((d, i) => (
                  <motion.li
                    key={d.name}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: i * 0.07, ease }}
                    className="border-l-2 pl-4"
                    style={{ borderColor: BRAND_ACCENTS[i % BRAND_ACCENTS.length] }}
                  >
                    <h3 className="font-display text-lg font-semibold text-foreground">{d.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{d.note}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

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

      <CartesSection />

      <CtaSection />
    </>
  )
}

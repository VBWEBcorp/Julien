'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

import { CtaSection } from '@/components/sections/cta-section'
import { PremiumHero } from '@/components/sections/premium-hero'
import { MountainBackdrop } from '@/components/ui/mountain-backdrop'
import { SectionTitle } from '@/components/ui/section-title'
import { useContent } from '@/hooks/use-content'
import { getIcon } from '@/lib/icons'
import { images as siteImages, valleeAspeContent } from '@/lib/site-content'
import { BRAND_ACCENTS } from '@/lib/utils'

const ease = [0.22, 1, 0.36, 1] as const

const defaults = {
  hero: valleeAspeContent.hero,
  activities: valleeAspeContent.activities,
}

// Pellicule horizontale — la vallée en grand (défilement libre).
const filmstrip = [
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

      {/* Itinéraire — activités numérotées en rangées alternées */}
      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <SectionTitle eyebrow="Activités" title="Tout est à portée de l'auberge" />
          <ul className="mt-14 space-y-px overflow-hidden rounded-3xl border border-border/60">
            {activities.map((a: any, i: number) => {
              const Icon = getIcon(a.iconName)
              const tinted = i % 2 === 1
              return (
                <motion.li
                  key={a.title || i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease }}
                  className={`relative flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:gap-7 sm:p-9 ${
                    tinted
                      ? 'bg-[oklch(0.975_0.008_95)] dark:bg-[oklch(0.19_0.015_150)]'
                      : 'bg-card'
                  }`}
                >
                  {/* Numéro + icône : groupés sur une ligne en mobile, étalés en desktop */}
                  <div className="flex items-center gap-4 sm:contents">
                    <span
                      className="font-display text-5xl font-bold leading-none tabular-nums sm:text-6xl"
                      style={{ color: BRAND_ACCENTS[i % BRAND_ACCENTS.length] }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary ring-1 ring-primary/20">
                      <Icon className="size-5" aria-hidden />
                    </span>
                  </div>
                  <div className="sm:flex-1">
                    <h3 className="font-display text-xl font-semibold tracking-[-0.01em] text-foreground sm:text-2xl">
                      {a.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-base leading-relaxed text-muted-foreground">
                      {a.description}
                    </p>
                  </div>
                </motion.li>
              )
            })}
          </ul>
        </div>
      </section>

      {/* Pellicule — galerie en défilement horizontal */}
      <section className="relative isolate overflow-hidden border-b border-border/60 bg-[oklch(0.975_0.008_95)] dark:bg-[oklch(0.19_0.015_150)]">
        <MountainBackdrop tone="light" />
        <div className="py-16 lg:py-24">
          <div className="mx-auto mb-10 flex max-w-6xl flex-col items-center px-4 text-center sm:px-6 lg:px-8">
            <p className="inline-flex items-center gap-3 font-display text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              <span className="h-px w-7 bg-[oklch(0.73_0.15_62)]" aria-hidden />
              En images
              <span className="h-px w-7 bg-[oklch(0.73_0.15_62)]" aria-hidden />
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
              La vallée en{' '}
              <span className="font-serif italic font-normal text-primary">grand</span>
            </h2>
          </div>
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {filmstrip.map((img, i) => (
              <motion.figure
                key={`${img.src}-${i}`}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease }}
                className="group relative aspect-[3/4] w-64 shrink-0 snap-start overflow-hidden rounded-2xl ring-1 ring-border/60 sm:w-72"
              >
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  sizes="288px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent p-4">
                  <span className="font-display text-sm font-medium text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.4)]">
                    {img.caption}
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
          <p className="mt-6 px-4 text-center text-xs text-muted-foreground sm:px-6 lg:hidden">
            Faites défiler &rarr;
          </p>
        </div>
      </section>

      <CtaSection />
    </>
  )
}

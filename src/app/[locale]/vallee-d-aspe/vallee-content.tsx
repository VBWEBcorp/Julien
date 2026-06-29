'use client'

import { motion } from 'framer-motion'

import { ValleeGallery } from './vallee-gallery'
import { CtaSection } from '@/components/sections/cta-section'
import { PremiumHero } from '@/components/sections/premium-hero'
import { SectionTitle } from '@/components/ui/section-title'
import { useContent } from '@/hooks/use-content'
import { getIcon } from '@/lib/icons'
import { images as siteImages, valleeAspeContent } from '@/lib/site-content'

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
        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
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
                  <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary ring-1 ring-primary/20">
                    <Icon className="size-5" aria-hidden />
                  </span>
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

      {/* En images — carrousel à flèches (images & textes gérés depuis l'admin) */}
      <ValleeGallery
        fallback={filmstrip.map((img) => ({ src: img.src, title: img.caption }))}
      />

      <CtaSection />
    </>
  )
}

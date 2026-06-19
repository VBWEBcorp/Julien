'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

import { CtaSection } from '@/components/sections/cta-section'
import { PremiumHero } from '@/components/sections/premium-hero'
import { MountainBackdrop } from '@/components/ui/mountain-backdrop'
import { useContent } from '@/hooks/use-content'
import { getIcon } from '@/lib/icons'
import { images as siteImages, barTerrasseContent } from '@/lib/site-content'

const ease = [0.22, 1, 0.36, 1] as const

const defaults = {
  hero: barTerrasseContent.hero,
  sections: barTerrasseContent.sections,
}

// Une photo par « moment » (carte). Repli cyclique si le CMS change le nombre de blocs.
const cardImages = [siteImages.services[7], siteImages.services[2], siteImages.story]

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

      {/* Les 3 moments — cartes photo */}
      <section className="relative isolate overflow-hidden border-b border-border/60 bg-background">
        <MountainBackdrop tone="light" />
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((s: any, i: number) => {
              const Icon = getIcon(s.iconName)
              return (
                <motion.article
                  key={s.title || i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease }}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-[0_2px_8px_oklch(0.2_0.02_150/0.04)] transition-shadow hover:shadow-[0_20px_50px_-20px_oklch(0.2_0.02_150/0.25)]"
                >
                  {/* Photo du moment */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={cardImages[i % cardImages.length]}
                      alt=""
                      fill
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
                      aria-hidden
                    />
                  </div>

                  {/* Contenu */}
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary ring-1 ring-primary/20">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <h3 className="font-display text-xl font-semibold tracking-[-0.01em] text-foreground">
                        {s.title}
                      </h3>
                    </div>
                    <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {s.description}
                    </p>
                    {s.points?.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2 border-t border-border/60 pt-5">
                        {s.points.map((p: string, j: number) => (
                          <span
                            key={j}
                            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-3 py-1.5 text-xs text-foreground/80"
                          >
                            <span className="size-1.5 rounded-full bg-primary" aria-hidden />
                            {p}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Bandeau citation — l'apéro face au Cirque d'Iseye */}
      <section className="relative isolate overflow-hidden border-b border-border/60">
        <Image src={siteImages.services[3]} alt="" fill sizes="100vw" className="object-cover" />
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/30"
          aria-hidden
        />
        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
          <p className="font-display text-2xl font-medium leading-relaxed text-white sm:text-3xl lg:text-4xl">
            « Un dernier verre, les pieds posés sur la vallée et les yeux dans les sommets. »
          </p>
          <p className="mt-6 font-display text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
            La terrasse du Permayou
          </p>
        </div>
      </section>

      <CtaSection />
    </>
  )
}

'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

import { CtaSection } from '@/components/sections/cta-section'
import { PremiumHero } from '@/components/sections/premium-hero'
import { MountainBackdrop } from '@/components/ui/mountain-backdrop'
import { SectionTitle } from '@/components/ui/section-title'
import { useContent } from '@/hooks/use-content'
import { getIcon } from '@/lib/icons'
import { aboutContent, images } from '@/lib/site-content'
import { splitAccentTitle } from '@/lib/utils'

const ease = [0.22, 1, 0.36, 1] as const

const defaults = aboutContent

function NarrativeSection({
  block,
  reverse,
  tinted,
}: {
  block: { eyebrow: string; title: string; paragraphs: string[]; image: string }
  reverse?: boolean
  tinted?: boolean
}) {
  const { lead, accent } = splitAccentTitle(block.title)
  return (
    <section
      className={`relative isolate overflow-hidden border-b border-border/60 ${
        tinted ? 'bg-[oklch(0.975_0.008_95)] dark:bg-[oklch(0.19_0.015_150)]' : 'bg-background'
      }`}
    >
      {/* Signature montagne + halos discrets (DA accueil) */}
      <MountainBackdrop tone="light" />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease }}
            className={reverse ? 'lg:order-2' : ''}
          >
            <p className="inline-flex items-center gap-3 font-display text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              <span className="h-px w-7 bg-[oklch(0.73_0.15_62)]" aria-hidden />
              {block.eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
              {lead ? (
                <>
                  {lead}{' '}
                  <span className="font-serif italic font-normal tracking-[-0.01em] text-primary">
                    {accent}
                  </span>
                </>
              ) : (
                block.title
              )}
            </h2>
            <div className="mt-5 space-y-4">
              {block.paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {p}
                </p>
              ))}
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 18 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className={`relative ${reverse ? 'lg:order-1' : ''}`}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_30px_60px_-25px_oklch(0.2_0.02_150/0.35)] ring-1 ring-border/60">
              <Image
                src={block.image}
                alt={block.title}
                fill
                sizes="(min-width:1024px) 50vw, 100vw"
                loading="lazy"
                className="object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/15 via-transparent to-transparent"
                aria-hidden
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


function ValuesTimeline({ values }: { values: any[] }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 70%', 'end 60%'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <div ref={ref} className="relative mx-auto mt-14 max-w-4xl">
      {/* Vertical line (background) */}
      <div
        aria-hidden
        className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2"
      />
      {/* Vertical line (animated fill) */}
      <motion.div
        aria-hidden
        style={{ height: lineHeight }}
        className="absolute left-4 top-0 w-px bg-gradient-to-b from-primary via-primary to-[oklch(0.73_0.15_62)] md:left-1/2 md:-translate-x-1/2"
      />

      <ul className="space-y-12 md:space-y-16">
        {values.map((v: any, i: number) => {
          const Icon = getIcon(v.iconName ?? aboutContent.values[i]?.iconName)
          const isRight = i % 2 === 1
          return (
            <li key={v.title || i} className="relative">
              {/* Dot */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4, ease, delay: 0.15 }}
                className="absolute left-4 top-6 z-10 -translate-x-1/2 md:left-1/2"
              >
                <span className="relative flex size-10 items-center justify-center rounded-full bg-background ring-1 ring-primary/30 shadow-[0_0_20px_oklch(0.45_0.1_150/0.4)] dark:shadow-[0_0_20px_oklch(0.45_0.1_150/0.5)]">
                  {/* Overlay gradient sur fond opaque */}
                  <span
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/15 to-primary/5"
                    aria-hidden
                  />
                  <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
                  <Icon className="relative size-4 text-primary" aria-hidden />
                </span>
              </motion.div>

              {/* Card */}
              <motion.div
                initial={{ opacity: 0, x: isRight ? 20 : -20, y: 10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, ease, delay: 0.1 }}
                className={`ml-14 md:ml-0 md:w-[calc(50%-2.5rem)] ${
                  isRight ? 'md:ml-[calc(50%+2.5rem)]' : 'md:mr-[calc(50%+2.5rem)]'
                }`}
              >
                <div className="group relative overflow-hidden rounded-2xl bg-card/80 p-6 shadow-[0_8px_24px_-12px_oklch(0.2_0.02_150/0.15)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_oklch(0.2_0.02_150/0.25)]">
                  {/* Bordure dégradée premium */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl p-px transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden
                    style={{
                      background:
                        'linear-gradient(135deg, oklch(0.45 0.1 150 / 0.35) 0%, oklch(0.91 0.012 95 / 0.6) 50%, oklch(0.45 0.1 150 / 0.35) 100%)',
                      WebkitMask:
                        'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                      WebkitMaskComposite: 'xor',
                      maskComposite: 'exclude',
                    }}
                  />
                  {/* Soft gradient wash on hover */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-primary/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="relative">
                    <span className="block h-px w-10 bg-gradient-to-r from-primary/60 to-transparent" />
                    <h3 className="mt-4 font-display text-xl leading-tight tracking-[-0.01em] text-foreground">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                      {v.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function AboutContent() {
  const { data } = useContent('about', defaults)
  const hero = data.hero ?? defaults.hero
  const story = data.story ?? defaults.story
  const stats = data.stats ?? defaults.stats
  const values = data.values ?? defaults.values

  return (
    <>
      <PremiumHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumb="L'auberge"
        compact
        backgroundImage={images.aboutHero}
      >
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
          {stats.map((s: { value: string; label: string }) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-white/70 sm:text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </PremiumHero>

      {story.map((block: any, i: number) => (
        <NarrativeSection key={block.title || i} block={block} reverse={i % 2 === 1} tinted={i % 2 === 1} />
      ))}

      <section className="border-b border-border/60 bg-background">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <SectionTitle eyebrow="Nos valeurs" title="Ce qui nous guide au quotidien" />
          <ValuesTimeline values={values} />
        </div>
      </section>

      <CtaSection />
    </>
  )
}

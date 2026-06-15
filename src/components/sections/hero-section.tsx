'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Star } from 'lucide-react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'
import { useEffect, useState } from 'react'

import { ValuesMarquee } from '@/components/sections/values-marquee'
import { useContent } from '@/hooks/use-content'
import { heroContent as defaults } from '@/lib/site-content'

const ease = [0.22, 1, 0.36, 1] as const
const INTERVAL = 5000

function splitTitle(title: string): { lead: string; accent: string } {
  const words = title.trim().split(/\s+/)
  if (words.length <= 2) return { lead: '', accent: title }
  const accentCount = Math.min(2, Math.max(1, Math.floor(words.length / 3)))
  return {
    lead: words.slice(0, words.length - accentCount).join(' '),
    accent: words.slice(words.length - accentCount).join(' '),
  }
}

export function HeroSection() {
  const { data } = useContent('home', { hero: defaults })
  const hero = data.hero ?? defaults
  const images: string[] = hero.images ?? defaults.images
  const [current, setCurrent] = useState(0)
  const { lead, accent } = splitTitle(hero.title)

  useEffect(() => {
    if (images.length <= 1) return
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, INTERVAL)
    return () => clearInterval(id)
  }, [images.length])

  return (
    <section className="relative isolate overflow-hidden border-b border-border/60">
      {/* Background : carousel d'images plein écran */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        <AnimatePresence initial={false}>
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease }}
            className="absolute inset-0"
          >
            <Image
              src={images[current]}
              alt=""
              fill
              sizes="100vw"
              priority={current === 0}
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
        {/* Overlay un peu plus marqué — fond plus sombre (style Otonali) */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/35" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Eyebrow */}
          <p className="font-display text-xs font-semibold tracking-[0.22em] uppercase text-white/70">
            {hero.eyebrow}
          </p>

          {/* Titre avec mot accentué en serif italic + violet uni */}
          <h1 className="mt-6 font-display text-balance pb-1 text-4xl leading-[1.15] font-semibold tracking-[-0.035em] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] sm:text-5xl lg:text-6xl">
            {lead ? (
              <>
                {lead}{' '}
                <span className="relative inline-block pb-1 font-serif italic font-normal tracking-[-0.01em] text-[oklch(0.82_0.12_150)]">
                  {accent}
                </span>
              </>
            ) : (
              accent
            )}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/85 [text-shadow:0_1px_14px_rgba(0,0,0,0.45)] sm:text-xl">
            {hero.description}
          </p>

          {/* CTAs — boîtes carrées, MAJUSCULES espacées (style Otonali) */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-[2px] bg-primary px-9 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-[oklch(0.29_0.08_150)]"
            >
              {hero.button1}
            </Link>

            <Link
              href="/a-propos"
              className="inline-flex h-12 items-center justify-center rounded-[2px] border border-white/45 bg-white/5 px-9 text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm transition-colors hover:bg-white/15"
            >
              {hero.button2}
            </Link>
          </div>

          {/* Réassurance : repères de l'auberge */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-white/80">
            <span className="flex items-center gap-1.5">
              <Star className="size-3.5 fill-current text-amber-300" aria-hidden />
              Hôtel ★★
            </span>
            <span className="hidden h-3 w-px bg-white/25 sm:block" aria-hidden />
            <span>Vallée d'Aspe · Accous</span>
            <span className="hidden h-3 w-px bg-white/25 sm:block" aria-hidden />
            <span>Vue sur le Cirque d'Iseye</span>
          </div>
        </motion.div>

        {/* Indicateurs carousel */}
        {images.length > 1 && (
          <div className="mt-12 flex justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Image ${i + 1}`}
                onClick={() => setCurrent(i)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === current ? 'w-8 bg-white' : 'w-4 bg-white/35 hover:bg-white/55'
                }`}
              />
            ))}
          </div>
        )}

        {/* Indicateur de défilement (chevron) */}
        <div className="mt-12 flex justify-center">
          <ChevronDown className="size-6 animate-bounce text-white/70" aria-hidden />
        </div>
      </div>

      <div className="relative">
        <ValuesMarquee variant="dark" />
      </div>
    </section>
  )
}

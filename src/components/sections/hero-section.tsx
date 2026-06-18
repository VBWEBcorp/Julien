'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Star } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { ValuesMarquee } from '@/components/sections/values-marquee'
import { PillButton } from '@/components/ui/pill-button'
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
  // Vidéo de fond optionnelle (éditable dans l'admin). Si renseignée, elle remplace
  // le carousel d'images ; sinon on garde le carousel (aucune régression).
  const videoUrl: string = (hero.video ?? '').trim()
  const hasVideo = videoUrl.length > 0
  const [current, setCurrent] = useState(0)
  const { lead, accent } = splitTitle(hero.title)

  useEffect(() => {
    if (hasVideo || images.length <= 1) return
    const id = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, INTERVAL)
    return () => clearInterval(id)
  }, [hasVideo, images.length])

  return (
    <section className="relative isolate overflow-hidden border-b border-border/60">
      {/* Background : vidéo plein écran si définie, sinon carousel d'images */}
      <div className="absolute inset-0 -z-10" aria-hidden>
        {hasVideo ? (
          <video
            className="absolute inset-0 size-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={images[0]}
          >
            <source src={videoUrl} />
          </video>
        ) : (
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
        )}
        {/* Overlay un peu plus marqué — fond plus sombre (style Otonali) */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/35" />
      </div>

      <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col items-center justify-center px-4 py-28 sm:px-6 sm:py-36 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
          className="mx-auto max-w-3xl text-center"
        >
          {/* Badge pilule — réassurance (style The Stay) */}
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
            <Star className="size-4 fill-amber-300 text-amber-300" aria-hidden />
            <span>{hero.eyebrow}</span>
          </div>

          {/* Titre géant avec mot accentué en serif italic */}
          <h1 className="mt-7 font-display text-balance pb-1 text-5xl leading-[1.05] font-semibold tracking-[-0.04em] text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.4)] sm:text-6xl lg:text-7xl">
            {lead ? (
              <>
                {lead}{' '}
                <span className="relative inline-block pb-1 font-serif italic font-normal tracking-[-0.01em]">
                  {accent}
                </span>
              </>
            ) : (
              accent
            )}
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-white/85 [text-shadow:0_1px_14px_rgba(0,0,0,0.45)] sm:text-xl">
            {hero.description}
          </p>

          {/* CTAs — pilules arrondies, casse normale (style The Stay) */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PillButton href="/reserver" variant="white" size="lg" arrow>
              {hero.button1}
            </PillButton>
            <PillButton href="/a-propos" variant="glass" size="lg">
              {hero.button2}
            </PillButton>
          </div>
        </motion.div>

        {/* Indicateurs carousel (masqués si vidéo de fond) */}
        {!hasVideo && images.length > 1 && (
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

'use client'

import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useLocale } from 'next-intl'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { MountainBackdrop } from '@/components/ui/mountain-backdrop'

const GAP = 16
const CARD_WIDTH = 300

type Slide = { src: string; title: string; text?: string }

interface GalleryImage {
  _id: string
  title: string
  description?: string
  imageUrl: string
}

/**
 * Carrousel « En images » de la page Vallée d'Aspe. Flèches gauche/droite +
 * glisser. Les images proviennent de la galerie admin (catégorie « vallee »,
 * avec titre + petit texte d'activité). Repli sur `fallback` tant qu'aucune
 * image n'a été ajoutée depuis l'admin.
 */
export function ValleeGallery({ fallback }: { fallback: Slide[] }) {
  const locale = useLocale()
  const [slides, setSlides] = useState<Slide[]>(fallback)

  useEffect(() => {
    fetch(`/api/gallery/images?category=vallee&locale=${locale}`)
      .then((r) => r.json())
      .then((d: GalleryImage[]) => {
        if (Array.isArray(d) && d.length > 0) {
          setSlides(d.map((g) => ({ src: g.imageUrl, title: g.title, text: g.description })))
        }
      })
      .catch(() => {})
  }, [locale])

  const trackRef = useRef<HTMLDivElement>(null)
  const [maxScroll, setMaxScroll] = useState(0)
  const x = useMotionValue(0)
  const progress = useTransform(x, [0, -maxScroll || -1], [0, 1])

  useEffect(() => {
    function measure() {
      if (!trackRef.current) return
      setMaxScroll(Math.max(0, trackRef.current.scrollWidth - trackRef.current.clientWidth))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [slides])

  const slide = useCallback(
    (dir: -1 | 1) => {
      const current = x.get()
      const step = CARD_WIDTH + GAP
      const next = Math.max(-maxScroll, Math.min(0, current - dir * step))
      animate(x, next, { type: 'spring', stiffness: 300, damping: 35 })
    },
    [x, maxScroll]
  )

  return (
    <section className="relative isolate overflow-hidden border-b border-border/60 bg-[oklch(0.975_0.008_95)] dark:bg-[oklch(0.19_0.015_150)]">
      <MountainBackdrop tone="light" />
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-3">
            <p className="inline-flex items-center gap-3 font-display text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              <span className="h-px w-7 bg-[oklch(0.73_0.15_62)]" aria-hidden />
              En images
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
              La vallée en{' '}
              <span className="font-serif italic font-normal text-primary">grand</span>
            </h2>
          </div>
          <div className="flex shrink-0 gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-10 rounded-full sm:size-11"
              aria-label="Image précédente"
              onClick={() => slide(-1)}
            >
              <ChevronLeft className="size-5" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="size-10 rounded-full sm:size-11"
              aria-label="Image suivante"
              onClick={() => slide(1)}
            >
              <ChevronRight className="size-5" />
            </Button>
          </div>
        </div>

        <div className="mt-10 overflow-hidden" role="region" aria-label="Galerie de la vallée">
          <motion.div
            ref={trackRef}
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -maxScroll, right: 0 }}
            dragElastic={0.08}
            className="flex cursor-grab active:cursor-grabbing"
          >
            {slides.map((s, i) => (
              <motion.figure
                key={`${s.src}-${i}`}
                className="shrink-0"
                style={{ width: CARD_WIDTH, marginRight: i < slides.length - 1 ? GAP : 0 }}
              >
                <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl ring-1 ring-border/60">
                  <Image
                    src={s.src}
                    alt={s.title}
                    fill
                    sizes="300px"
                    loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-4">
                    <span className="font-display text-sm font-semibold text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
                      {s.title}
                    </span>
                    {s.text && (
                      <p className="mt-1 text-xs leading-relaxed text-white/85 [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">
                        {s.text}
                      </p>
                    )}
                  </figcaption>
                </div>
              </motion.figure>
            ))}
          </motion.div>
        </div>

        {/* Barre de progression */}
        <div className="mt-6 flex justify-center">
          <div className="h-1 w-32 overflow-hidden rounded-full bg-border">
            <motion.div
              className="h-full rounded-full bg-primary/60"
              style={{ scaleX: progress, transformOrigin: 'left' }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

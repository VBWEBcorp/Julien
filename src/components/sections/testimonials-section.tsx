'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { useState } from 'react'

import { SectionTitle } from '@/components/ui/section-title'
import { useContent } from '@/hooks/use-content'
import { testimonialsContent } from '@/lib/site-content'

const ease = [0.22, 1, 0.36, 1] as const
const RATING = '4,2'

const defaults = {
  eyebrow: testimonialsContent.eyebrow,
  title: testimonialsContent.title,
  description: testimonialsContent.description,
  testimonials: testimonialsContent.items,
}

type Testimonial = { name: string; company: string; text: string; stars: number }

function GoogleLogo({ className = 'size-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-label="Google">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

function Stars({ value = 5, className = 'size-4' }: { value?: number; className?: string }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`${className} ${i < value ? 'fill-amber-400 text-amber-400' : 'fill-muted text-muted/40'}`}
          aria-hidden
        />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  const { data } = useContent('testimonials', defaults)
  const testimonials: Testimonial[] = data.testimonials ?? defaults.testimonials
  const [index, setIndex] = useState(0)

  if (!testimonials.length) return null

  const count = testimonials.length
  const current = testimonials[index % count]
  const go = (dir: -1 | 1) => setIndex((prev) => (prev + dir + count) % count)

  return (
    <section className="border-y border-border/60 bg-[oklch(0.975_0.008_95)] dark:bg-[oklch(0.19_0.015_150)]">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionTitle
          eyebrow={data.eyebrow ?? defaults.eyebrow}
          title={data.title ?? defaults.title}
          description={data.description ?? defaults.description}
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-[minmax(0,21rem)_1fr] lg:gap-6">
          {/* Carte note globale */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease }}
            className="flex flex-col justify-center gap-4 rounded-3xl border border-border/60 bg-card p-8 text-center shadow-[0_2px_10px_oklch(0.2_0.02_150/0.05)] sm:p-10 lg:text-left"
          >
            <div className="flex items-center justify-center gap-2 lg:justify-start">
              <GoogleLogo />
              <span className="text-sm font-semibold text-foreground">Google</span>
            </div>
            <div className="flex items-baseline justify-center gap-2 lg:justify-start">
              <span className="font-display text-6xl font-semibold tracking-tight text-foreground">
                {RATING}
              </span>
              <span className="text-lg text-muted-foreground">/ 5</span>
            </div>
            <div className="flex justify-center lg:justify-start">
              <Stars value={5} className="size-5" />
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Avis vérifiés laissés par nos clients sur Google.
            </p>
          </motion.div>

          {/* Témoignage mis en avant + navigation */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease, delay: 0.1 }}
            className="relative flex min-h-[18rem] flex-col justify-between gap-8 overflow-hidden rounded-3xl border border-border/60 bg-card p-8 shadow-[0_2px_10px_oklch(0.2_0.02_150/0.05)] sm:p-10"
          >
            <Quote className="absolute right-8 top-8 size-12 text-primary/10" aria-hidden />

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease }}
                className="relative flex flex-1 flex-col gap-5"
              >
                <Stars value={current.stars} className="size-4" />
                <blockquote className="text-pretty font-display text-lg leading-relaxed text-foreground/90 sm:text-xl">
                  &ldquo;{current.text}&rdquo;
                </blockquote>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-end justify-between gap-4">
              <figcaption className="flex items-center gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-bold text-primary">
                  {current.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">{current.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{current.company}</p>
                </div>
              </figcaption>

              {count > 1 && (
                <div className="flex shrink-0 items-center gap-2">
                  <span className="mr-1 text-xs tabular-nums text-muted-foreground">
                    {index + 1} / {count}
                  </span>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Avis précédent"
                    className="flex size-10 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-primary/40 hover:bg-accent hover:text-foreground"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Avis suivant"
                    className="flex size-10 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-primary/40 hover:bg-accent hover:text-foreground"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

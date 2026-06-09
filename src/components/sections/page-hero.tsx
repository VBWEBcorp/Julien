'use client'

import { motion } from 'framer-motion'
import { ChevronRight, Home } from 'lucide-react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'

import { MountainBackdrop } from '@/components/ui/mountain-backdrop'

const ease = [0.22, 1, 0.36, 1] as const

type PageHeroProps = {
  eyebrow: string
  title: string
  description?: string
  image: string
  breadcrumb: string
}

// Détache le ou les derniers mots du titre pour l'accent serif italique.
function splitTitle(title: string): { lead: string; accent: string } {
  const words = title.trim().split(/\s+/)
  if (words.length <= 2) return { lead: '', accent: title }
  const accentCount = Math.min(2, Math.max(1, Math.floor(words.length / 3)))
  return {
    lead: words.slice(0, words.length - accentCount).join(' '),
    accent: words.slice(words.length - accentCount).join(' '),
  }
}

export function PageHero({ eyebrow, title, description, image, breadcrumb }: PageHeroProps) {
  const { lead, accent } = splitTitle(title)

  return (
    <section className="relative isolate overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      </div>

      {/* Décor signature montagne + halos (repris du menu), par-dessus la photo */}
      <MountainBackdrop tone="overlay" />

      {/* Soft fade-out to page background at bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background sm:h-40"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav aria-label="Fil d'Ariane" className="pt-24 sm:pt-28">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-white/50">
            <li className="flex items-center gap-1.5">
              <Link
                href="/"
                className="flex items-center gap-1 transition-colors hover:text-white/80"
              >
                <Home className="size-3" aria-hidden />
                <span>Accueil</span>
              </Link>
            </li>
            <li className="flex items-center gap-1.5">
              <ChevronRight className="size-3 text-white/30" aria-hidden />
              <span aria-current="page" className="font-medium text-white/70">
                {breadcrumb}
              </span>
            </li>
          </ol>
        </nav>

        {/* Content */}
        <div className="pb-20 pt-14 sm:pb-24 sm:pt-16 lg:pb-32 lg:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mx-auto max-w-3xl text-center"
          >
            <p className="font-display text-xs font-semibold tracking-[0.22em] uppercase text-white/70">
              {eyebrow}
            </p>
            <h1 className="mt-6 font-display text-balance text-4xl leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl">
              {lead ? (
                <>
                  {lead}{' '}
                  <span className="font-serif italic font-normal tracking-[-0.01em] text-[oklch(0.82_0.1_62)]">
                    {accent}
                  </span>
                </>
              ) : (
                title
              )}
            </h1>
            {description && (
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/70">
                {description}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

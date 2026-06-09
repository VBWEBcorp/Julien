'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

import { MountainBackdrop } from '@/components/ui/mountain-backdrop'

const ease = [0.22, 1, 0.36, 1] as const

// Couleurs de marque (= celles des menus) pour numéroter les visuels en alternance.
const ACCENTS = [
  'oklch(0.78 0.14 62)', // orange ambré
  'oklch(0.66 0.16 25)', // brique
  'oklch(0.68 0.16 268)', // bleu
  'oklch(0.72 0.1 150)', // vert mousse
]

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

export interface GalleryItem {
  src: string
  caption?: string
}

interface ImageGalleryProps {
  eyebrow?: string
  title?: string
  images: GalleryItem[]
}

/**
 * Galerie d'images réutilisable (grille éditoriale façon Otonali).
 * 2 colonnes sur mobile, 3 sur desktop — pensée pour 6 images (2 rangées pleines),
 * mais s'adapte à n'importe quel nombre. Visuels remplaçables via le CMS plus tard.
 */
export function ImageGallery({ eyebrow, title, images }: ImageGalleryProps) {
  if (!images?.length) return null

  const { lead, accent } = title ? splitTitle(title) : { lead: '', accent: '' }

  return (
    <section className="relative isolate overflow-hidden border-b border-border/60 bg-background">
      {/* Signature montagne + halos discrets (DA accueil) */}
      <MountainBackdrop tone="light" />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {(eyebrow || title) && (
          <div className="mb-10 flex flex-col items-center text-center">
            {eyebrow && (
              <p className="inline-flex items-center gap-3 font-display text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                <span className="h-px w-7 bg-[oklch(0.73_0.15_62)]" aria-hidden />
                {eyebrow}
                <span className="h-px w-7 bg-[oklch(0.73_0.15_62)]" aria-hidden />
              </p>
            )}
            {title && (
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
                {lead ? (
                  <>
                    {lead}{' '}
                    <span className="font-serif italic font-normal tracking-[-0.01em] text-primary">
                      {accent}
                    </span>
                  </>
                ) : (
                  title
                )}
              </h2>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {images.map((img, i) => (
            <motion.figure
              key={`${img.src}-${i}`}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease }}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-border/60"
            >
              <Image
                src={img.src}
                alt={img.caption ?? ''}
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                loading="lazy"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Numéro signature (couleur de marque) */}
              <span
                className="pointer-events-none absolute left-4 top-3 font-mono text-[11px] tabular-nums tracking-[0.2em] [text-shadow:0_1px_8px_rgba(0,0,0,0.7)]"
                style={{ color: ACCENTS[i % ACCENTS.length] }}
                aria-hidden
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              {img.caption && (
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent p-4">
                  <span className="font-display text-sm font-medium text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.4)]">
                    {img.caption}
                  </span>
                </figcaption>
              )}
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

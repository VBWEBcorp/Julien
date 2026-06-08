'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

const ease = [0.22, 1, 0.36, 1] as const

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

  return (
    <section className="border-b border-border/60 bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        {(eyebrow || title) && (
          <div className="mb-10 text-center">
            {eyebrow && (
              <p className="font-display text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
                {title}
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

'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'

import { SectionTitle } from '@/components/ui/section-title'
import { useContent } from '@/hooks/use-content'
import { polesContent } from '@/lib/site-content'

const ease = [0.22, 1, 0.36, 1] as const

// Couleurs de marque (= celles des menus) pour numéroter les tuiles en alternance.
const ACCENTS = [
  'oklch(0.78 0.14 62)', // orange ambré
  'oklch(0.66 0.16 25)', // brique
  'oklch(0.68 0.16 268)', // bleu
  'oklch(0.72 0.1 150)', // vert mousse
]

// Placement de chaque tuile dans la grille (desktop) — mosaïque asymétrique :
// grande image à gauche (2 lignes), large en haut à droite, 2 petites en bas.
const layout = [
  'lg:row-span-2', // Vallée — grande tuile verticale à gauche
  'lg:col-span-2', // Hôtel — tuile large en haut à droite
  '', // Restaurant
  '', // Bar
]

export function PolesMosaic() {
  const reduceMotion = useReducedMotion()
  const { data } = useContent('home', { poles: polesContent })
  const poles = data.poles ?? polesContent
  const items = poles.items ?? polesContent.items

  return (
    <section className="border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <SectionTitle eyebrow={poles.eyebrow} title={poles.title} />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
          }}
          className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:grid-rows-2 lg:h-[42rem]"
        >
          {items.map((item, i) => (
            <motion.div
              key={item.label}
              variants={{
                hidden: { opacity: 0, y: reduceMotion ? 0 : 28 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
              }}
              className={layout[i] ?? ''}
            >
              <Link
                href={item.href}
                aria-label={item.label}
                className="group relative block h-full min-h-[18rem] overflow-hidden rounded-[3px]"
              >
                <Image
                  src={item.image}
                  alt={item.label}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.06]"
                />
                {/* Voile dégradé bas pour lisibilité du label */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent transition-colors duration-500 group-hover:from-black/75"
                  aria-hidden
                />

                {/* Numéro signature (couleur de marque) */}
                <span
                  className="absolute left-6 top-5 font-mono text-[11px] tabular-nums tracking-[0.2em] [text-shadow:0_1px_8px_rgba(0,0,0,0.6)] sm:left-7 sm:top-6"
                  style={{ color: ACCENTS[i % ACCENTS.length] }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                {/* Label */}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6 sm:p-7">
                  <h3 className="font-display text-2xl font-semibold uppercase tracking-[0.12em] text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.5)] sm:text-[1.7rem]">
                    {item.label}
                  </h3>
                  <span
                    className="mb-1 inline-flex size-9 shrink-0 items-center justify-center rounded-[3px] border border-white/40 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100"
                    aria-hidden
                  >
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { MountainBackdrop } from '@/components/ui/mountain-backdrop'
import { PillButton } from '@/components/ui/pill-button'
import { useContent } from '@/hooks/use-content'
import { getIcon } from '@/lib/icons'
import { amenitiesContent as defaults } from '@/lib/site-content'

const ease = [0.22, 1, 0.36, 1] as const

interface AmenityItem {
  icon: string
  label: string
}

/**
 * Bloc « équipements & services » pleine couleur (vert forêt) avec des tags en
 * pilules givrées — repris du pattern « amenities » de la réf. The Stay. Donne
 * au visiteur un aperçu immédiat de ce que propose l'auberge.
 */
export function AmenitiesSection() {
  const reduceMotion = useReducedMotion()
  const { data } = useContent('home', { amenities: defaults })
  const amenities = data.amenities ?? defaults
  const items: AmenityItem[] = amenities.items ?? defaults.items

  return (
    <section className="relative isolate overflow-hidden border-b border-border/60 text-white">
      {/* Fond signature vert forêt + halos + montagne (cohérent avec le bloc CTA) */}
      <MountainBackdrop tone="dark" />

      <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease }}
          className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center"
        >
          {amenities.eyebrow ? (
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[oklch(0.82_0.1_62)]">
              {amenities.eyebrow}
            </span>
          ) : null}
          <h2 className="font-display text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.03em] sm:text-4xl lg:text-[2.85rem]">
            {amenities.title}
            {amenities.accent ? (
              <>
                {' '}
                <span className="font-serif font-normal italic tracking-[-0.01em] text-[oklch(0.85_0.12_150)]">
                  {amenities.accent}
                </span>
              </>
            ) : null}
          </h2>
          {amenities.description ? (
            <p className="max-w-xl text-pretty text-base leading-relaxed text-white/75 sm:text-lg">
              {amenities.description}
            </p>
          ) : null}
        </motion.div>

        {/* Tags en pilules givrées */}
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
          }}
          className="mt-12 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
        >
          {items.map((item, i) => {
            const Icon = getIcon(item.icon)
            return (
              <motion.li
                key={`${item.label}-${i}`}
                variants={{
                  hidden: { opacity: 0, y: reduceMotion ? 0 : 10 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
                }}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm transition-colors hover:border-white/40 hover:bg-white/15"
              >
                <Icon className="size-4 text-[oklch(0.85_0.12_150)]" aria-hidden />
                {item.label}
              </motion.li>
            )
          })}
        </motion.ul>

        {amenities.cta ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, ease, delay: 0.15 }}
            className="mt-12 flex justify-center"
          >
            <PillButton href="/services" variant="white" size="md" arrow>
              {amenities.cta}
            </PillButton>
          </motion.div>
        ) : null}
      </div>
    </section>
  )
}

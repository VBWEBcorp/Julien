'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { MountainBackdrop } from '@/components/ui/mountain-backdrop'
import { getIcon } from '@/lib/icons'
import { BRAND_ACCENTS, splitAccentTitle } from '@/lib/utils'

const ease = [0.22, 1, 0.36, 1] as const

export interface FeatureCard {
  iconName?: string
  title: string
  description: string
  points?: string[]
}

interface FeatureCardsProps {
  eyebrow?: string
  title?: string
  description?: string
  items: FeatureCard[]
  /** Nombre de colonnes sur grand écran (2, 3 ou 4). */
  columns?: 2 | 3 | 4
}

const colClass: Record<number, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
}

export function FeatureCards({
  eyebrow,
  title,
  description,
  items,
  columns = 3,
}: FeatureCardsProps) {
  const reduceMotion = useReducedMotion()
  const { lead, accent } = title ? splitAccentTitle(title) : { lead: '', accent: '' }

  return (
    <section className="relative isolate overflow-hidden border-b border-border/60 bg-background">
      {/* Signature montagne + halos discrets (DA accueil) */}
      <MountainBackdrop tone="light" />

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        {(eyebrow || title || description) && (
          <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center lg:mb-16">
            {eyebrow && (
              <p className="inline-flex items-center gap-3 font-display text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                <span className="h-px w-7 bg-[oklch(0.73_0.15_62)]" aria-hidden />
                {eyebrow}
                <span className="h-px w-7 bg-[oklch(0.73_0.15_62)]" aria-hidden />
              </p>
            )}
            {title && (
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
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
            {description && (
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {description}
              </p>
            )}
          </div>
        )}

        <div className={`grid grid-cols-1 gap-6 ${colClass[columns]}`}>
          {items.map((item, i) => {
            const Icon = getIcon(item.iconName)
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: i * 0.06, ease }}
                className="group relative flex flex-col rounded-2xl border border-border/60 bg-card p-7 shadow-[0_2px_8px_oklch(0.2_0.02_150/0.04)] transition-shadow hover:shadow-[0_20px_50px_-20px_oklch(0.2_0.02_150/0.25)]"
              >
                {/* Numéro signature (couleur de marque) */}
                <span
                  className="absolute right-6 top-6 font-mono text-[11px] tabular-nums tracking-[0.2em]"
                  style={{ color: BRAND_ACCENTS[i % BRAND_ACCENTS.length] }}
                  aria-hidden
                >
                  {String(i + 1).padStart(2, '0')}
                </span>

                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary ring-1 ring-primary/20">
                  <Icon className="size-5" aria-hidden />
                </span>

                <h3 className="mt-5 font-display text-xl font-semibold tracking-[-0.01em] text-foreground">
                  {item.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>

                {item.points && item.points.length > 0 && (
                  <ul className="mt-5 space-y-2.5 border-t border-border/60 pt-5">
                    {item.points.map((p, j) => (
                      <li key={j} className="flex items-center gap-3 text-sm text-foreground/80">
                        <span
                          className="flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary"
                          aria-hidden
                        >
                          <svg viewBox="0 0 12 12" fill="none" className="size-3">
                            <path
                              d="M2.5 6L5 8.5L9.5 4"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, FileText } from 'lucide-react'
import { useEffect, useState } from 'react'

import { MountainBackdrop } from '@/components/ui/mountain-backdrop'
import { BRAND_ACCENTS } from '@/lib/utils'

const ease = [0.22, 1, 0.36, 1] as const

interface Carte {
  _id: string
  title: string
  description?: string
  fileUrl: string
  fileType: 'pdf' | 'image'
}

/**
 * Section « Nos cartes » du restaurant. Récupère les cartes actives (PDF/photo)
 * gérées depuis l'admin. Masquée tant qu'aucune carte n'est publiée.
 */
export function CartesSection() {
  const [cartes, setCartes] = useState<Carte[]>([])

  useEffect(() => {
    fetch('/api/cartes')
      .then((r) => r.json())
      .then((d) => setCartes(Array.isArray(d) ? d : []))
      .catch(() => {})
  }, [])

  if (!cartes.length) return null

  return (
    <section className="relative isolate overflow-hidden border-b border-border/60 bg-background">
      <MountainBackdrop tone="light" />
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center lg:mb-16">
          <p className="inline-flex items-center gap-3 font-display text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            <span className="h-px w-7 bg-[oklch(0.73_0.15_62)]" aria-hidden />
            À la carte
            <span className="h-px w-7 bg-[oklch(0.73_0.15_62)]" aria-hidden />
          </p>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
            Nos <span className="font-serif italic font-normal text-primary">cartes</span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Consultez nos cartes du moment et de la semaine, mises à jour régulièrement.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cartes.map((carte, i) => (
            <motion.a
              key={carte._id}
              href={carte.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.55, delay: i * 0.07, ease }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-[0_2px_8px_oklch(0.2_0.02_150/0.04)] transition-shadow hover:shadow-[0_20px_50px_-20px_oklch(0.2_0.02_150/0.25)]"
            >
              {/* Aperçu : photo ou panneau PDF */}
              <div className="relative aspect-[4/3] overflow-hidden">
                {carte.fileType === 'image' ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={carte.fileUrl}
                      alt={carte.title}
                      className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"
                      aria-hidden
                    />
                  </>
                ) : (
                  <div className="flex size-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/10 to-[oklch(0.73_0.15_62)]/10">
                    <span
                      className="flex size-14 items-center justify-center rounded-2xl bg-card text-primary ring-1 ring-primary/20 transition-transform duration-300 group-hover:-translate-y-0.5"
                      style={{ color: BRAND_ACCENTS[i % BRAND_ACCENTS.length] }}
                    >
                      <FileText className="size-6" aria-hidden />
                    </span>
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      Document PDF
                    </span>
                  </div>
                )}
              </div>

              {/* Contenu */}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-semibold tracking-[-0.01em] text-foreground">
                  {carte.title}
                </h3>
                {carte.description && (
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {carte.description}
                  </p>
                )}
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Consulter la carte
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

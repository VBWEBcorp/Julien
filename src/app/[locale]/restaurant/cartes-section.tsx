'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, FileText, Leaf, UtensilsCrossed, Wine, type LucideIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { MountainBackdrop } from '@/components/ui/mountain-backdrop'
import { type CarteCategory } from '@/lib/carte-categories'
import { BRAND_ACCENTS, splitAccentTitle } from '@/lib/utils'

const ease = [0.22, 1, 0.36, 1] as const

interface Carte {
  _id: string
  title: string
  description?: string
  fileUrl: string
  fileType: 'pdf' | 'image'
  category: CarteCategory
}

// Les 3 sections de la page restaurant, dans l'ordre d'affichage. Chacune
// regroupe les cartes de sa catégorie (gérées depuis l'admin).
const SECTIONS: {
  category: CarteCategory
  eyebrow: string
  title: string
  description: string
  icon: LucideIcon
  hint: string
}[] = [
  {
    category: 'cuisine',
    eyebrow: 'Notre table',
    title: 'Notre cuisine',
    description:
      "Une cuisine traditionnelle et de saison, mijotée à partir de produits frais. Plats généreux qui réconfortent après une journée au grand air, servis midi et soir.",
    icon: UtensilsCrossed,
    hint: 'Carte de saison & menu de la semaine',
  },
  {
    category: 'terroir',
    eyebrow: 'Le goût du pays',
    title: 'Produits du terroir',
    description:
      "Nous travaillons avec les producteurs de la vallée : fromages de brebis, charcuterie, viandes et légumes du Béarn. Garbure et palombe en saison, au plus près de la terre.",
    icon: Leaf,
    hint: 'Carte des fournisseurs',
  },
  {
    category: 'bar',
    eyebrow: 'À toute heure',
    title: 'Bar & snacking',
    description:
      "Un bar vivant ouvert à tous et une formule snacking pour une étape simple. Apéro et tapas en terrasse, face aux montagnes.",
    icon: Wine,
    hint: 'Carte du bar & snacking',
  },
]

function CarteCard({ carte, index }: { carte: Carte; index: number }) {
  return (
    <motion.a
      href={carte.fileUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: index * 0.07, ease }}
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
              style={{ color: BRAND_ACCENTS[index % BRAND_ACCENTS.length] }}
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
  )
}

/**
 * Les 3 sections du restaurant : Notre cuisine, Produits du terroir, Bar &
 * snacking. Chaque section affiche ses cartes (PDF/photo gérées en admin),
 * filtrées par catégorie. Les en-têtes restent visibles même sans carte.
 */
export function CartesSection() {
  const [cartes, setCartes] = useState<Carte[]>([])

  useEffect(() => {
    fetch('/api/cartes')
      .then((r) => r.json())
      .then((d) => setCartes(Array.isArray(d) ? d : []))
      .catch(() => {})
  }, [])

  return (
    <>
      {SECTIONS.map((section, sectionIndex) => {
        const items = cartes.filter((c) => (c.category ?? 'cuisine') === section.category)
        const { lead, accent } = splitAccentTitle(section.title)
        const Icon = section.icon
        // Fond alterné pour rythmer la page.
        const altBg = sectionIndex % 2 === 1

        return (
          <section
            key={section.category}
            className={`relative isolate overflow-hidden border-b border-border/60 ${
              altBg
                ? 'bg-background'
                : 'bg-[oklch(0.975_0.008_95)] dark:bg-[oklch(0.19_0.015_150)]'
            }`}
          >
            <MountainBackdrop tone="light" />
            <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
              {/* En-tête de section */}
              <div className="mx-auto mb-12 flex max-w-2xl flex-col items-center text-center lg:mb-16">
                <span className="flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary ring-1 ring-primary/20">
                  <Icon className="size-6" aria-hidden />
                </span>
                <p className="mt-5 inline-flex items-center gap-3 font-display text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  <span className="h-px w-7 bg-[oklch(0.73_0.15_62)]" aria-hidden />
                  {section.eyebrow}
                  <span className="h-px w-7 bg-[oklch(0.73_0.15_62)]" aria-hidden />
                </p>
                <h2 className="mt-4 font-display text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
                  {lead ? (
                    <>
                      {lead}{' '}
                      <span className="font-serif italic font-normal text-primary">{accent}</span>
                    </>
                  ) : (
                    section.title
                  )}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {section.description}
                </p>
              </div>

              {/* Cartes de la section */}
              {items.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((carte, i) => (
                    <CarteCard key={carte._id} carte={carte} index={i} />
                  ))}
                </div>
              ) : (
                <div className="mx-auto flex max-w-md flex-col items-center gap-2 rounded-3xl border border-dashed border-border/70 bg-card/40 px-6 py-10 text-center">
                  <FileText className="size-6 text-muted-foreground" aria-hidden />
                  <p className="text-sm font-medium text-foreground">{section.hint}</p>
                  <p className="text-sm text-muted-foreground">Carte bientôt disponible.</p>
                </div>
              )}
            </div>
          </section>
        )
      })}
    </>
  )
}

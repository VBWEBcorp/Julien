'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Newspaper, Mountain, PartyPopper, Rss, PenLine, Pin } from 'lucide-react'

import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

export type NewsCategory = 'article' | 'presse' | 'rando' | 'evenement' | 'autre'

export interface NewsCard {
  id: string
  kind: 'internal' | 'external'
  title: string
  excerpt: string
  image: string
  href: string
  sourceName: string
  category: NewsCategory
  pinned: boolean
  publishedAt: string | null
}

const CATEGORY_META: Record<NewsCategory, { label: string; icon: any }> = {
  article: { label: 'Nos articles', icon: PenLine },
  presse: { label: 'Presse', icon: Newspaper },
  rando: { label: 'Randos', icon: Mountain },
  evenement: { label: 'Événements', icon: PartyPopper },
  autre: { label: 'Autres', icon: Rss },
}

const ease = [0.22, 1, 0.36, 1] as const

function formatDate(date: string | null): string {
  if (!date) return ''
  return new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function LocalNewsContent({
  eyebrow,
  title,
  description,
  cards,
}: {
  eyebrow: string
  title: string
  description: string
  cards: NewsCard[]
}) {
  const [filter, setFilter] = useState<'all' | NewsCategory>('all')

  // Filtres réellement présents dans les données (on n'affiche pas une puce vide).
  const available = useMemo(() => {
    const set = new Set<NewsCategory>()
    cards.forEach((c) => set.add(c.category))
    return (['article', 'presse', 'rando', 'evenement', 'autre'] as NewsCategory[]).filter((c) => set.has(c))
  }, [cards])

  const visible = filter === 'all' ? cards : cards.filter((c) => c.category === filter)

  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/60 bg-secondary/40 px-4 pb-14 pt-32 sm:px-6 sm:pt-36 lg:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(55% 60% at 85% 10%, oklch(0.73 0.15 62 / 0.10) 0%, transparent 70%), radial-gradient(45% 55% at 5% 95%, oklch(0.29 0.08 150 / 0.10) 0%, transparent 70%)',
          }}
        />
        <div className="relative mx-auto max-w-6xl">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="inline-flex items-center gap-3 font-display text-xs font-semibold uppercase tracking-[0.22em] text-primary"
          >
            <span className="h-px w-7 bg-[oklch(0.73_0.15_62)]" aria-hidden />
            {eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.06 }}
            className="mt-4 max-w-3xl font-display text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl lg:text-5xl"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.12 }}
            className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base"
          >
            {description}
          </motion.p>
        </div>
      </section>

      {/* Liste */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Filtres */}
        {available.length > 1 && (
          <div className="mb-8 flex flex-wrap gap-2">
            <FilterChip active={filter === 'all'} onClick={() => setFilter('all')} label="Tout" />
            {available.map((cat) => (
              <FilterChip
                key={cat}
                active={filter === cat}
                onClick={() => setFilter(cat)}
                label={CATEGORY_META[cat].label}
                icon={CATEGORY_META[cat].icon}
              />
            ))}
          </div>
        )}

        {visible.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/60 py-20 text-center">
            <Rss className="mx-auto mb-3 size-10 text-muted-foreground/20" />
            <p className="font-medium text-muted-foreground">
              Aucune actualité pour le moment. Revenez bientôt !
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((card, i) => (
              <NewsCardItem key={card.id} card={card} index={i} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

function FilterChip({
  active, onClick, label, icon: Icon,
}: { active: boolean; onClick: () => void; label: string; icon?: any }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors',
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'
      )}
    >
      {Icon && <Icon className="size-3.5" />}
      {label}
    </button>
  )
}

function NewsCardItem({ card, index }: { card: NewsCard; index: number }) {
  const Meta = CATEGORY_META[card.category] ?? CATEGORY_META.autre
  const Icon = Meta.icon

  const inner = (
    <>
      {/* Visuel */}
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        {card.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={card.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary/60">
            <Icon className="size-8 text-muted-foreground/30" />
          </div>
        )}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary shadow-sm backdrop-blur">
          <Icon className="size-3" /> {Meta.label}
        </span>
        {card.pinned && (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-[oklch(0.73_0.15_62)] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[oklch(0.2_0.03_150)] shadow-sm">
            <Pin className="size-3" /> À la une
          </span>
        )}
      </div>

      {/* Texte */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2 text-[11px] text-muted-foreground">
          <span className="font-medium text-foreground/70">{card.sourceName}</span>
          {card.publishedAt && (
            <>
              <span className="text-muted-foreground/40">·</span>
              <span>{formatDate(card.publishedAt)}</span>
            </>
          )}
        </div>
        <h3 className="font-display text-lg font-semibold leading-snug tracking-[-0.01em] text-foreground transition-colors group-hover:text-primary">
          {card.title}
        </h3>
        {card.excerpt && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{card.excerpt}</p>
        )}
        <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-primary">
          {card.kind === 'external' ? "Lire l'article" : "Lire la suite"}
          <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </>
  )

  const className =
    'group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-xs)] transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[var(--shadow-md)]'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, ease, delay: Math.min(index, 6) * 0.05 }}
    >
      {card.kind === 'external' ? (
        // Redirection vers la source d'origine (nouvel onglet).
        <a href={card.href} target="_blank" rel="noopener noreferrer" className={className}>
          {inner}
        </a>
      ) : (
        // Notre propre article : navigation interne localisée.
        <Link href={card.href} className={className}>
          {inner}
        </Link>
      )}
    </motion.div>
  )
}

'use client'

import { motion } from 'framer-motion'
import {
  Cigarette,
  Clock,
  Mail,
  MapPin,
  Newspaper,
  Ticket,
  type LucideIcon,
} from 'lucide-react'
import { useLocale } from 'next-intl'

import { CtaSection } from '@/components/sections/cta-section'
import { PremiumHero } from '@/components/sections/premium-hero'
import { MountainBackdrop } from '@/components/ui/mountain-backdrop'
import { images as siteImages } from '@/lib/site-content'

const ease = [0.22, 1, 0.36, 1] as const

type Card = { icon: LucideIcon; title: string; description: string }
type Info = { icon: LucideIcon; title: string; description: string }

type Content = {
  eyebrow: string
  title: string
  description: string
  cardsTitle: string
  cards: Card[]
  infoTitle: string
  infos: Info[]
  breadcrumb: string
}

const CONTENT: Record<string, Content> = {
  fr: {
    eyebrow: 'Le Permayou · Service de proximité',
    title: 'Tabac & Presse',
    description:
      "Au cœur d'Accous, votre point tabac, presse et jeux : le rendez-vous quotidien de la vallée, sous le même toit que l'auberge.",
    cardsTitle: 'Tout ce que vous trouvez sur place',
    cards: [
      {
        icon: Newspaper,
        title: 'Presse & magazines',
        description:
          'Quotidiens régionaux et nationaux, magazines et revues — La République des Pyrénées, Sud Ouest et les titres du jour.',
      },
      {
        icon: Cigarette,
        title: 'Tabac & articles fumeurs',
        description:
          'Cigarettes, tabac à rouler, briquets et accessoires : un dépannage de proximité sans descendre de la vallée.',
      },
      {
        icon: Ticket,
        title: 'Jeux & Française des Jeux',
        description:
          'Loto, EuroMillions et jeux à gratter : tentez votre chance avant ou après la randonnée.',
      },
      {
        icon: Mail,
        title: 'Timbres & cartes postales',
        description:
          'Timbres, cartes postales de la vallée et petits services du quotidien pour rester en lien.',
      },
    ],
    infoTitle: 'Infos pratiques',
    infos: [
      {
        icon: Clock,
        title: 'Horaires',
        description:
          "Ouvert aux horaires de l'auberge, 7j/7 en saison. Renseignez-vous à l'accueil ou au bar.",
      },
      {
        icon: MapPin,
        title: 'Où nous trouver',
        description:
          "Le Permayou, Accous — au cœur de la vallée d'Aspe, Pyrénées-Atlantiques.",
      },
    ],
    breadcrumb: 'Tabac & Presse',
  },
  en: {
    eyebrow: 'Le Permayou · Local service',
    title: 'Tobacconist & Press',
    description:
      'In the heart of Accous, your spot for tobacco, press and lottery games: the valley’s daily meeting point, under the same roof as the inn.',
    cardsTitle: 'What you’ll find here',
    cards: [
      {
        icon: Newspaper,
        title: 'Press & magazines',
        description:
          'Regional and national newspapers, magazines and reviews — La République des Pyrénées, Sud Ouest and the day’s titles.',
      },
      {
        icon: Cigarette,
        title: 'Tobacco & smokers’ items',
        description:
          'Cigarettes, rolling tobacco, lighters and accessories — a handy local stop without leaving the valley.',
      },
      {
        icon: Ticket,
        title: 'Lottery & French national games',
        description:
          'Loto, EuroMillions and scratch cards: try your luck before or after your hike.',
      },
      {
        icon: Mail,
        title: 'Stamps & postcards',
        description:
          'Stamps, postcards of the valley and small everyday services to stay in touch.',
      },
    ],
    infoTitle: 'Practical info',
    infos: [
      {
        icon: Clock,
        title: 'Opening hours',
        description:
          'Open during the inn’s hours, 7 days a week in season. Just ask at reception or the bar.',
      },
      {
        icon: MapPin,
        title: 'Where to find us',
        description:
          'Le Permayou, Accous — in the heart of the Aspe Valley, Pyrénées-Atlantiques.',
      },
    ],
    breadcrumb: 'Tobacconist & Press',
  },
  es: {
    eyebrow: 'Le Permayou · Servicio de proximidad',
    title: 'Estanco y Prensa',
    description:
      'En el corazón de Accous, su punto de estanco, prensa y juegos: la cita diaria del valle, bajo el mismo techo que el albergue.',
    cardsTitle: 'Todo lo que encuentra aquí',
    cards: [
      {
        icon: Newspaper,
        title: 'Prensa y revistas',
        description:
          'Diarios regionales y nacionales, revistas y publicaciones — La République des Pyrénées, Sud Ouest y los títulos del día.',
      },
      {
        icon: Cigarette,
        title: 'Estanco y artículos para fumadores',
        description:
          'Cigarrillos, tabaco de liar, mecheros y accesorios: un servicio de proximidad sin bajar del valle.',
      },
      {
        icon: Ticket,
        title: 'Juegos y lotería nacional',
        description:
          'Loto, EuroMillions y rasca: pruebe suerte antes o después de la excursión.',
      },
      {
        icon: Mail,
        title: 'Sellos y postales',
        description:
          'Sellos, postales del valle y pequeños servicios del día a día para seguir en contacto.',
      },
    ],
    infoTitle: 'Información práctica',
    infos: [
      {
        icon: Clock,
        title: 'Horarios',
        description:
          'Abierto en el horario del albergue, 7 días a la semana en temporada. Pregunte en recepción o en el bar.',
      },
      {
        icon: MapPin,
        title: 'Dónde encontrarnos',
        description:
          'Le Permayou, Accous — en el corazón del Valle de Aspe, Pirineos Atlánticos.',
      },
    ],
    breadcrumb: 'Estanco y Prensa',
  },
}

export function TabacPresseContent() {
  const locale = useLocale()
  const c = CONTENT[locale] ?? CONTENT.fr

  return (
    <>
      <PremiumHero
        eyebrow={c.eyebrow}
        title={c.title}
        description={c.description}
        breadcrumb={c.breadcrumb}
        compact
        backgroundImage={siteImages.services[4]}
      />

      {/* Cartes services */}
      <section className="relative isolate overflow-hidden border-b border-border/60 bg-background">
        <MountainBackdrop tone="light" />
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-foreground sm:text-3xl">
            {c.cardsTitle}
          </h2>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {c.cards.map((card, i) => {
              const Icon = card.icon
              return (
                <motion.article
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease }}
                  className="group flex flex-col rounded-3xl border border-border/60 bg-card p-7 shadow-[0_2px_8px_oklch(0.2_0.02_150/0.04)] transition-shadow hover:shadow-[0_20px_50px_-20px_oklch(0.2_0.02_150/0.25)]"
                >
                  <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary ring-1 ring-primary/20">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold tracking-[-0.01em] text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* Infos pratiques */}
      <section className="border-b border-border/60 bg-muted/15">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <h2 className="font-display text-2xl font-semibold tracking-[-0.01em] text-foreground sm:text-3xl">
            {c.infoTitle}
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {c.infos.map((info) => {
              const Icon = info.icon
              return (
                <div
                  key={info.title}
                  className="flex items-start gap-4 rounded-2xl border border-border/60 bg-background p-6"
                >
                  <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/20">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {info.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {info.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <CtaSection />
    </>
  )
}

import {
  Bike,
  Footprints,
  HeartHandshake,
  Mountain,
  Sun,
  TreePine,
  UtensilsCrossed,
  Wine,
  type LucideIcon,
} from 'lucide-react'
import { useTranslations } from 'next-intl'

type ValueItem = { icon: LucideIcon; label: string }

function ValuesTrack({
  direction,
  variant,
  values,
}: {
  direction: 'left' | 'right'
  variant: 'light' | 'dark'
  values: ValueItem[]
}) {
  // Marquee « sans couture » : une seule piste animée contenant le contenu
  // dupliqué, translatée de -50 % (= exactement une copie). L'ancienne version
  // (deux pistes à -100 %) laissait un trou sans espacement à la jointure, d'où
  // les motifs/texte « mal cadrés » à chaque boucle.
  const animClass =
    direction === 'left' ? 'animate-marquee-half-left' : 'animate-marquee-half-right'

  const textClass =
    variant === 'dark'
      ? 'text-white/60'
      : 'text-foreground/70'
  const iconClass =
    variant === 'dark'
      ? 'text-white/30'
      : 'text-primary/50'

  // `gap-6` entre les items + `pr-6` en fin de copie : l'espacement à la
  // jointure entre les deux copies est ainsi identique à l'espacement interne.
  const half = (
    <ul className="flex shrink-0 items-center gap-6 pr-6">
      {values.map((v) => (
        <li
          key={v.label}
          className={`inline-flex items-center gap-2.5 text-nowrap font-display text-sm font-medium tracking-wide uppercase sm:text-base ${textClass}`}
        >
          <v.icon className={`size-4 ${iconClass}`} aria-hidden />
          {v.label}
        </li>
      ))}
    </ul>
  )

  return (
    <div className="flex overflow-hidden">
      <div
        className={`flex w-max items-center ${animClass}`}
        style={{ animationDuration: '35s' }}
      >
        {half}
        <div aria-hidden className="flex">
          {half}
        </div>
      </div>
    </div>
  )
}

export function ValuesMarquee({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const t = useTranslations('values')
  const values: ValueItem[] = [
    { icon: Mountain, label: t('valley') },
    { icon: TreePine, label: t('nature') },
    { icon: UtensilsCrossed, label: t('cuisine') },
    { icon: Wine, label: t('bar') },
    { icon: Footprints, label: t('hiking') },
    { icon: Bike, label: t('cycling') },
    { icon: HeartHandshake, label: t('welcome') },
    { icon: Sun, label: t('freshAir') },
  ]

  const wrapperClass =
    variant === 'dark'
      ? 'border-t border-white/10 bg-black/20 backdrop-blur-sm py-4 sm:py-5'
      : 'border-y border-border/60 bg-muted/15 py-6 sm:py-8'

  return (
    <div className={wrapperClass}>
      <ValuesTrack direction="left" variant={variant} values={values} />
    </div>
  )
}

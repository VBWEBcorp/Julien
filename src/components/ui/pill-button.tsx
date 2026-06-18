import { ArrowUpRight } from 'lucide-react'
import type { ComponentProps, ReactNode } from 'react'

import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

type Variant = 'solid' | 'white' | 'glass' | 'outline' | 'dark'
type Size = 'sm' | 'md' | 'lg'

const variants: Record<Variant, string> = {
  // Vert forêt — CTA primaire de la marque
  solid:
    'bg-primary text-primary-foreground shadow-sm hover:bg-[oklch(0.29_0.08_150)] hover:shadow-md',
  // Pilule blanche — sur photo / fond coloré (CTA principal façon The Stay)
  white: 'bg-white text-[oklch(0.2_0.015_150)] shadow-sm hover:bg-white/90 hover:shadow-md',
  // Pilule givrée translucide — secondaire sur photo
  glass:
    'border border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20',
  // Contour discret sur fond clair
  outline:
    'border border-border bg-background text-foreground hover:border-primary/40 hover:bg-accent',
  // Pilule sombre — CTA contrasté sur fond clair
  dark: 'bg-foreground text-background shadow-sm hover:bg-foreground/90 hover:shadow-md',
}

const sizes: Record<Size, string> = {
  sm: 'h-10 px-5 text-sm',
  md: 'h-12 px-7 text-[0.95rem]',
  lg: 'h-13 px-8 text-base',
}

interface PillButtonProps {
  href: string
  children: ReactNode
  variant?: Variant
  size?: Size
  /** Affiche la flèche ↗ animée en suffixe. */
  arrow?: boolean
  external?: boolean
  className?: string
}

const base =
  'group/pill inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-ring/60 active:translate-y-px'

/**
 * Bouton « pilule » des pages marketing (style The Stay) — entièrement arrondi,
 * casse normale. Rend un `Link` localisé en interne, un `<a>` si `external`.
 */
export function PillButton({
  href,
  children,
  variant = 'solid',
  size = 'md',
  arrow = false,
  external = false,
  className,
}: PillButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className)
  const content = (
    <>
      {children}
      {arrow ? (
        <ArrowUpRight
          className="size-4 transition-transform duration-300 group-hover/pill:-translate-y-0.5 group-hover/pill:translate-x-0.5"
          aria-hidden
        />
      ) : null}
    </>
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    )
  }

  return (
    <Link href={href as ComponentProps<typeof Link>['href']} className={classes}>
      {content}
    </Link>
  )
}

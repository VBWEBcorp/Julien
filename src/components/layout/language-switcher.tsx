'use client'

import { useLocale } from 'next-intl'

import { Link, usePathname } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { cn } from '@/lib/utils'

const LABELS: Record<string, string> = {
  fr: 'FR',
  en: 'EN',
  es: 'ES',
}

/**
 * Sélecteur de langue FR/EN/ES. Conserve la route courante : `usePathname()`
 * (next-intl) renvoie le chemin SANS préfixe de locale, on régénère donc le
 * même chemin dans la langue cible.
 */
export function LanguageSwitcher({
  className,
  variant = 'light',
}: {
  className?: string
  /** `light` = texte blanc (sur hero transparent), `solid` = texte foncé. */
  variant?: 'light' | 'solid'
}) {
  const locale = useLocale()
  const pathname = usePathname()
  const isLight = variant === 'light'

  return (
    <div
      className={cn(
        'flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.15em]',
        className
      )}
      role="group"
      aria-label="Langue"
    >
      {routing.locales.map((loc) => {
        const active = loc === locale
        return (
          <Link
            key={loc}
            href={pathname}
            locale={loc}
            aria-current={active ? 'true' : undefined}
            className={cn(
              'relative rounded-[3px] px-1.5 py-1 transition-colors',
              active
                ? isLight
                  ? 'text-white'
                  : 'text-foreground'
                : isLight
                  ? 'text-white/55 hover:text-white/90'
                  : 'text-foreground/45 hover:text-foreground/80'
            )}
          >
            {LABELS[loc]}
            {/* Soulignement accent (orange de marque) sur la langue active */}
            {active && (
              <span
                aria-hidden
                className="absolute inset-x-1.5 -bottom-0.5 h-[1.5px] rounded-full bg-[oklch(0.73_0.15_62)]"
              />
            )}
          </Link>
        )
      })}
    </div>
  )
}

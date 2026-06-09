'use client'

import { ChevronRight, Home } from 'lucide-react'
import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'

export type BreadcrumbItem = {
  label: string
  to?: string
}

type BreadcrumbProps = {
  items: BreadcrumbItem[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const t = useTranslations('breadcrumb')
  return (
    <nav
      aria-label={t('ariaLabel')}
      className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 lg:px-8"
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
        <li className="flex items-center gap-1.5">
          <Link
            href="/"
            className="flex items-center gap-1 transition-colors hover:text-foreground"
          >
            <Home className="size-3" aria-hidden />
            <span>{t('home')}</span>
          </Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              <ChevronRight className="size-3 text-muted-foreground/50" aria-hidden />
              {isLast || !item.to ? (
                <span aria-current="page" className="font-medium text-foreground/80">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.to}
                  className="transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

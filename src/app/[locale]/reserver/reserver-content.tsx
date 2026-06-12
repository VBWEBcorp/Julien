'use client'

import { motion } from 'framer-motion'
import {
  BedDouble,
  CalendarDays,
  CreditCard,
  ExternalLink,
  Loader2,
  Lock,
  Maximize2,
} from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'

import { MountainBackdrop } from '@/components/ui/mountain-backdrop'
import { useContent } from '@/hooks/use-content'
import { getIcon } from '@/lib/icons'
import { amenitizBookingUrl, siteConfig } from '@/lib/seo'
import { reserverContent } from '@/lib/site-content'
import { splitAccentTitle } from '@/lib/utils'

const ease = [0.22, 1, 0.36, 1] as const
const telHref = `tel:${siteConfig.phone.replace(/\s+/g, '')}`

const defaults = {
  hero: reserverContent.hero,
  reassurance: reserverContent.reassurance,
  note: reserverContent.note,
}

export function ReserverContent() {
  const t = useTranslations('reserver')
  const locale = useLocale()
  const bookingUrl = amenitizBookingUrl(locale)
  const { data } = useContent('reserver', defaults)
  const reassurance = data.reassurance ?? defaults.reassurance
  const note = data.note ?? defaults.note

  const steps = [
    { icon: CalendarDays, label: t('steps.dates'), description: t('steps.datesDesc') },
    { icon: BedDouble, label: t('steps.room'), description: t('steps.roomDesc') },
    { icon: CreditCard, label: t('steps.payment'), description: t('steps.paymentDesc') },
  ]

  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-border/60 bg-background">
        <MountainBackdrop tone="light" />
        <div className="mx-auto max-w-4xl px-4 pt-28 pb-16 sm:px-6 lg:px-8 lg:pt-36 lg:pb-24">
          {/* En-tête — remplace l'ancien hero image : titre + sous-titre directs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="text-center"
          >
            <h1 className="font-display text-3xl font-semibold tracking-[-0.02em] text-foreground sm:text-4xl md:text-[2.6rem]">
              {(() => {
                const { lead, accent } = splitAccentTitle(t('sectionTitle'))
                return lead ? (
                  <>
                    {lead}{' '}
                    <span className="font-serif italic font-normal tracking-[-0.01em] text-primary">
                      {accent}
                    </span>
                  </>
                ) : (
                  t('sectionTitle')
                )
              })()}
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {note}
            </p>
          </motion.div>

          {/* Bloc moteur Amenitiz */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease }}
            className="mt-12"
          >
            {/* Tunnel en 3 étapes */}
            <ol className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-4">
              {steps.map((step, i) => (
                <li
                  key={step.label}
                  className="flex flex-1 items-center gap-3 rounded-2xl border border-border/60 bg-card px-4 py-3"
                >
                  <span className="relative inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <step.icon className="size-4" aria-hidden />
                    <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      {i + 1}
                    </span>
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-display text-sm font-semibold text-foreground">{step.label}</p>
                    <p className="truncate text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Moteur de réservation Amenitiz embarqué (résa + paiement sur le site) */}
            <div className="mt-6 overflow-hidden rounded-3xl border border-border/60 bg-card shadow-[0_20px_50px_-20px_oklch(0.2_0.02_150/0.25)]">
              {/* Barre d'en-tête « navigateur » */}
              <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-[oklch(0.975_0.008_95)] px-4 py-3 dark:bg-[oklch(0.19_0.015_150)]">
                <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                  <Lock className="size-4 text-primary" aria-hidden />
                  <span>{t('engineHeader')}</span>
                </div>
                <span className="hidden rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary sm:inline">
                  {t('badge')}
                </span>
              </div>

              {/* Conteneur iframe + overlay de chargement */}
              <div className="relative">
                {isLoading && (
                  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-card">
                    <Loader2 className="size-7 animate-spin text-primary" aria-hidden />
                    <p className="text-sm text-muted-foreground">{t('loading')}</p>
                  </div>
                )}
                <iframe
                  key={bookingUrl}
                  src={bookingUrl}
                  title="Moteur de réservation, Auberge Le Permayou"
                  loading="lazy"
                  onLoad={() => setIsLoading(false)}
                  className="h-[680px] w-full border-0 sm:h-[780px]"
                  allow="payment"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            {/* Secours */}
            <div className="mt-6 flex flex-col items-center gap-3 text-sm text-muted-foreground">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
              >
                <Maximize2 className="size-3.5" aria-hidden />
                {t('fullscreen')}
                <ExternalLink className="size-3.5" aria-hidden />
              </a>
              <p>
                {t('support')}{' '}
                <a href={telHref} className="font-medium text-primary hover:underline">
                  {siteConfig.phone}
                </a>
              </p>
            </div>
          </motion.div>

          {/* Réassurance — sous le moteur de réservation */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {reassurance.map((item: any, i: number) => {
              const Icon = getIcon(item.iconName)
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease }}
                  className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card p-4 text-left sm:flex-col sm:p-6 sm:text-center"
                >
                  <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:size-11">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-semibold text-foreground sm:mt-1 sm:text-base">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground sm:text-sm">{item.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

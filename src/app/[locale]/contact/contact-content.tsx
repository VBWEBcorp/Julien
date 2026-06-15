'use client'

import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Clock, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useLocale, useTranslations } from 'next-intl'
import { useState } from 'react'

import { PremiumHero } from '@/components/sections/premium-hero'
import { MountainBackdrop } from '@/components/ui/mountain-backdrop'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useContent } from '@/hooks/use-content'
import { siteConfig } from '@/lib/seo'
import { contactContent, images as siteImages } from '@/lib/site-content'

const ease = [0.22, 1, 0.36, 1] as const

// Endpoint Formspree : renseigner NEXT_PUBLIC_FORMSPREE_ENDPOINT dans .env.local
// (ex. https://formspree.io/f/xxxxxxxx). Placeholder tant que la clé n'est pas fournie.
const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? 'https://formspree.io/f/REMPLACER_PAR_VOTRE_ID'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

const defaults = {
  hero: { ...contactContent.hero, image: '' as string },
  info: {
    phone: siteConfig.phone,
    email: siteConfig.email,
    street: siteConfig.address.street,
    postalCode: siteConfig.address.postalCode,
    city: siteConfig.address.city,
  },
}

export function ContactContent() {
  const t = useTranslations('contact')
  const locale = useLocale()
  const { data } = useContent('contact', defaults)
  const hero = data.hero ?? defaults.hero
  const info = data.info ?? defaults.info

  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setStatus('submitting')
    setErrorMsg('')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('success')
        form.reset()
      } else {
        const payload = (await res.json().catch(() => null)) as
          | { errors?: { message: string }[] }
          | null
        setErrorMsg(
          payload?.errors?.map((x) => x.message).join(', ') || t('errors.generic')
        )
        setStatus('error')
      }
    } catch {
      setErrorMsg(t('errors.network'))
      setStatus('error')
    }
  }

  const phone = info.phone || siteConfig.phone
  const email = info.email || siteConfig.email
  const street = info.street || siteConfig.address.street
  const postalCode = info.postalCode || siteConfig.address.postalCode
  const city = info.city || siteConfig.address.city

  // Carte Google Maps via embed iframe (pas de clé API requise) — pilotée par l'adresse CMS
  const mapQuery = encodeURIComponent(`${siteConfig.name}, ${street}, ${postalCode} ${city}`)
  const mapEmbedSrc = `https://www.google.com/maps?q=${mapQuery}&z=15&hl=${locale}&output=embed`
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`

  return (
    <>
      <PremiumHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumb={t('breadcrumb')}
        compact
        backgroundImage={siteImages.contactHero}
      >
        {/* Trust row */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/80">
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-[oklch(0.55_0.1_150)]" aria-hidden />
            <span>{t('trust.reply24h')}</span>
          </div>
          <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:inline" aria-hidden />
          <div className="flex items-center gap-2">
            <Send className="size-4 text-[oklch(0.55_0.1_150)]" aria-hidden />
            <span>{t('trust.freeQuote')}</span>
          </div>
          <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:inline" aria-hidden />
          <div className="flex items-center gap-2">
            <span className="flex size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_oklch(0.7_0.15_150/0.8)]" aria-hidden />
            <span>{t('trust.available')}</span>
          </div>
        </div>
      </PremiumHero>

      <section className="relative isolate overflow-hidden border-b border-border/60 bg-background">
        <MountainBackdrop tone="light" />
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Form card premium */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
            >
              <div className="relative overflow-hidden rounded-3xl bg-card/90 p-7 shadow-[0_20px_50px_-20px_oklch(0.2_0.02_150/0.25)] backdrop-blur-sm sm:p-9">
                {/* Bordure dégradée */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl p-px"
                  aria-hidden
                  style={{
                    background:
                      'linear-gradient(135deg, oklch(0.45 0.1 150 / 0.4) 0%, oklch(0.91 0.012 95 / 0.55) 50%, oklch(0.45 0.1 150 / 0.4) 100%)',
                    WebkitMask:
                      'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary ring-1 ring-primary/20">
                      <Send className="size-4" aria-hidden />
                    </span>
                    <div>
                      <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                        {t('form.title')}
                      </h2>
                      <p className="text-xs text-muted-foreground">{t('form.subtitle')}</p>
                    </div>
                  </div>

                  {status === 'success' ? (
                    <div className="mt-7 flex flex-col items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-10 text-center">
                      <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <CheckCircle2 className="size-6" aria-hidden />
                      </span>
                      <h3 className="font-display text-base font-semibold text-foreground">
                        {t('success.title')}
                      </h3>
                      <p className="max-w-sm text-sm text-muted-foreground">
                        {t('success.body')}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => setStatus('idle')}
                      >
                        {t('success.retry')}
                      </Button>
                    </div>
                  ) : (
                    <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
                      {/* Honeypot anti-spam (caché, ne pas remplir) */}
                      <input
                        type="text"
                        name="_gotcha"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden
                        className="hidden"
                      />
                      {/* Objet de la demande dans le sujet de l'email reçu */}
                      <input type="hidden" name="_subject" value="Nouveau message, site Le Permayou" />

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstname">{t('form.firstName')}</Label>
                          <Input
                            id="firstname"
                            name="firstname"
                            placeholder={t('form.firstNamePlaceholder')}
                            autoComplete="given-name"
                            required
                            className="h-11 rounded-xl bg-background/70 transition-shadow focus-visible:shadow-[0_0_0_4px_oklch(0.45_0.1_150/0.1)]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastname">{t('form.lastName')}</Label>
                          <Input
                            id="lastname"
                            name="lastname"
                            placeholder={t('form.lastNamePlaceholder')}
                            autoComplete="family-name"
                            required
                            className="h-11 rounded-xl bg-background/70 transition-shadow focus-visible:shadow-[0_0_0_4px_oklch(0.45_0.1_150/0.1)]"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t('form.email')}</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder={t('form.emailPlaceholder')}
                          autoComplete="email"
                          required
                          className="h-11 rounded-xl bg-background/70 transition-shadow focus-visible:shadow-[0_0_0_4px_oklch(0.45_0.1_150/0.1)]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          {t('form.phone')} <span className="font-normal text-muted-foreground">{t('form.optional')}</span>
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder={t('form.phonePlaceholder')}
                          autoComplete="tel"
                          className="h-11 rounded-xl bg-background/70 transition-shadow focus-visible:shadow-[0_0_0_4px_oklch(0.45_0.1_150/0.1)]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="objet">{t('form.subject')}</Label>
                        <select
                          id="objet"
                          name="objet"
                          defaultValue="sejour"
                          required
                          className="h-11 w-full rounded-xl border border-input bg-background/70 px-3.5 text-sm text-foreground transition-shadow focus-visible:border-ring focus-visible:shadow-[0_0_0_4px_oklch(0.45_0.1_150/0.1)] focus-visible:outline-none"
                        >
                          <option value="sejour">{t('subjects.stay')}</option>
                          <option value="table">{t('subjects.table')}</option>
                          <option value="groupe-seminaire">{t('subjects.group')}</option>
                          <option value="autre">{t('subjects.other')}</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">{t('form.message')}</Label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          required
                          placeholder={t('form.messagePlaceholder')}
                          className="w-full rounded-xl border border-input bg-background/70 px-3.5 py-3 text-sm leading-relaxed text-foreground transition-shadow placeholder:text-muted-foreground focus-visible:border-ring focus-visible:shadow-[0_0_0_4px_oklch(0.45_0.1_150/0.1)] focus-visible:outline-none"
                        />
                      </div>

                      {status === 'error' && (
                        <div className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-3.5 py-3 text-sm text-destructive">
                          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
                          <span>{errorMsg}</span>
                        </div>
                      )}

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full group"
                        disabled={status === 'submitting'}
                      >
                        {status === 'submitting' ? t('form.sending') : t('form.submit')}
                        <Send className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                      </Button>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Sidebar info + map */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease, delay: 0.06 }}
              className="space-y-5"
            >
              {/* Info card */}
              <div className="relative overflow-hidden rounded-3xl bg-card/90 p-7 shadow-[0_10px_30px_-12px_oklch(0.2_0.02_150/0.18)] backdrop-blur-sm">
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl p-px"
                  aria-hidden
                  style={{
                    background:
                      'linear-gradient(135deg, oklch(0.45 0.1 150 / 0.35) 0%, oklch(0.91 0.012 95 / 0.55) 50%, oklch(0.45 0.1 150 / 0.35) 100%)',
                    WebkitMask:
                      'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                />

                <div className="relative space-y-5">
                  <h2 className="font-display text-base font-semibold tracking-tight text-foreground">
                    {t('directContact.title')}
                  </h2>

                  <a
                    href={`tel:${phone}`}
                    className="group flex items-start gap-4 -mx-3 rounded-xl px-3 py-2 transition-colors hover:bg-foreground/[0.04]"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary ring-1 ring-primary/20 transition-transform duration-300 group-hover:scale-105">
                      <Phone className="size-4" aria-hidden />
                    </span>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">{t('directContact.phone')}</p>
                      <p className="text-sm font-semibold text-foreground">{phone}</p>
                    </div>
                  </a>

                  <a
                    href={`mailto:${email}`}
                    className="group flex items-start gap-4 -mx-3 rounded-xl px-3 py-2 transition-colors hover:bg-foreground/[0.04]"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary ring-1 ring-primary/20 transition-transform duration-300 group-hover:scale-105">
                      <Mail className="size-4" aria-hidden />
                    </span>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">{t('directContact.email')}</p>
                      <p className="text-sm font-semibold text-foreground break-all">{email}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 -mx-3 rounded-xl px-3 py-2">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary ring-1 ring-primary/20">
                      <MapPin className="size-4" aria-hidden />
                    </span>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">{t('directContact.address')}</p>
                      <p className="text-sm font-semibold text-foreground">
                        {street}
                        <br />
                        {postalCode} {city}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-border/60 pt-5">
                    <div className="flex items-center gap-2">
                      <span
                        className="relative flex size-2 items-center justify-center"
                        aria-hidden
                      >
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                        <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                      </span>
                      <span className="text-xs font-medium text-foreground">
                        {t('directContact.statusToday')}
                      </span>
                      <span className="text-xs text-muted-foreground">{t('directContact.hours')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carte Google Maps — embed iframe (sans clé API) */}
              <div className="relative overflow-hidden rounded-3xl bg-muted/50 shadow-[0_10px_30px_-12px_oklch(0.2_0.02_150/0.18)] backdrop-blur-sm">
                {/* Bordure dégradée (au-dessus de la carte, clics traversants) */}
                <div
                  className="pointer-events-none absolute inset-0 z-10 rounded-3xl p-px"
                  aria-hidden
                  style={{
                    background:
                      'linear-gradient(135deg, oklch(0.45 0.1 150 / 0.3) 0%, oklch(0.91 0.012 95 / 0.5) 50%, oklch(0.45 0.1 150 / 0.3) 100%)',
                    WebkitMask:
                      'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
                    WebkitMaskComposite: 'xor',
                    maskComposite: 'exclude',
                  }}
                />
                <iframe
                  title={`${siteConfig.name} — ${street}, ${postalCode} ${city}`}
                  src={mapEmbedSrc}
                  className="relative block h-64 w-full border-0 grayscale-[0.15] contrast-[1.05]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
                {/* Bouton itinéraire en overlay */}
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-3 right-3 z-20 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-3.5 py-2 text-xs font-medium text-foreground shadow-md ring-1 ring-border/60 backdrop-blur-sm transition-colors hover:bg-background"
                >
                  <MapPin className="size-3.5 text-primary" aria-hidden />
                  {t('map.directions')}
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

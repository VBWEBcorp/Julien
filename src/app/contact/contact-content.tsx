'use client'

import { motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Clock, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState } from 'react'

import { PremiumHero } from '@/components/sections/premium-hero'
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
          payload?.errors?.map((x) => x.message).join(', ') ||
            'Une erreur est survenue. Réessayez ou écrivez-nous directement par email.'
        )
        setStatus('error')
      }
    } catch {
      setErrorMsg(
        "Impossible d'envoyer le message. Vérifiez votre connexion ou écrivez-nous par email."
      )
      setStatus('error')
    }
  }

  const phone = info.phone || siteConfig.phone
  const email = info.email || siteConfig.email
  const street = info.street || siteConfig.address.street
  const postalCode = info.postalCode || siteConfig.address.postalCode
  const city = info.city || siteConfig.address.city

  return (
    <>
      <PremiumHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        breadcrumb="Contact"
        compact
        backgroundImage={siteImages.contactHero}
      >
        {/* Trust row */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/80">
          <div className="flex items-center gap-2">
            <Clock className="size-4 text-[oklch(0.55_0.1_150)]" aria-hidden />
            <span>Réponse sous 24h</span>
          </div>
          <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:inline" aria-hidden />
          <div className="flex items-center gap-2">
            <Send className="size-4 text-[oklch(0.55_0.1_150)]" aria-hidden />
            <span>Devis gratuit</span>
          </div>
          <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:inline" aria-hidden />
          <div className="flex items-center gap-2">
            <span className="flex size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_oklch(0.7_0.15_150/0.8)]" aria-hidden />
            <span>Disponible cette semaine</span>
          </div>
        </div>
      </PremiumHero>

      <section className="border-b border-border/60 bg-background">
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
                        Envoyer un message
                      </h2>
                      <p className="text-xs text-muted-foreground">Tous les champs sont obligatoires sauf indication</p>
                    </div>
                  </div>

                  {status === 'success' ? (
                    <div className="mt-7 flex flex-col items-center gap-3 rounded-2xl border border-primary/20 bg-primary/5 px-6 py-10 text-center">
                      <span className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <CheckCircle2 className="size-6" aria-hidden />
                      </span>
                      <h3 className="font-display text-base font-semibold text-foreground">
                        Message bien envoyé !
                      </h3>
                      <p className="max-w-sm text-sm text-muted-foreground">
                        Merci, nous avons bien reçu votre demande et vous répondrons sous 24h.
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => setStatus('idle')}
                      >
                        Envoyer un autre message
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
                      <input type="hidden" name="_subject" value="Nouveau message — site Le Permayou" />

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="firstname">Prénom</Label>
                          <Input
                            id="firstname"
                            name="firstname"
                            placeholder="Jean"
                            autoComplete="given-name"
                            required
                            className="h-11 rounded-xl bg-background/70 transition-shadow focus-visible:shadow-[0_0_0_4px_oklch(0.45_0.1_150/0.1)]"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastname">Nom</Label>
                          <Input
                            id="lastname"
                            name="lastname"
                            placeholder="Dupont"
                            autoComplete="family-name"
                            required
                            className="h-11 rounded-xl bg-background/70 transition-shadow focus-visible:shadow-[0_0_0_4px_oklch(0.45_0.1_150/0.1)]"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="jean@exemple.fr"
                          autoComplete="email"
                          required
                          className="h-11 rounded-xl bg-background/70 transition-shadow focus-visible:shadow-[0_0_0_4px_oklch(0.45_0.1_150/0.1)]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          Téléphone <span className="font-normal text-muted-foreground">(optionnel)</span>
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="06 12 34 56 78"
                          autoComplete="tel"
                          className="h-11 rounded-xl bg-background/70 transition-shadow focus-visible:shadow-[0_0_0_4px_oklch(0.45_0.1_150/0.1)]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="objet">Objet de la demande</Label>
                        <select
                          id="objet"
                          name="objet"
                          defaultValue="sejour"
                          required
                          className="h-11 w-full rounded-xl border border-input bg-background/70 px-3.5 text-sm text-foreground transition-shadow focus-visible:border-ring focus-visible:shadow-[0_0_0_4px_oklch(0.45_0.1_150/0.1)] focus-visible:outline-none"
                        >
                          <option value="sejour">Réservation / séjour (hôtel)</option>
                          <option value="table">Réserver une table (restaurant)</option>
                          <option value="groupe-seminaire">Groupe / séminaire</option>
                          <option value="autre">Autre demande</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Votre message</Label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          required
                          placeholder="Dates, nombre de personnes, votre demande..."
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
                        {status === 'submitting' ? 'Envoi en cours…' : 'Envoyer le message'}
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
                    Nous joindre directement
                  </h2>

                  <a
                    href={`tel:${phone}`}
                    className="group flex items-start gap-4 -mx-3 rounded-xl px-3 py-2 transition-colors hover:bg-foreground/[0.04]"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary ring-1 ring-primary/20 transition-transform duration-300 group-hover:scale-105">
                      <Phone className="size-4" aria-hidden />
                    </span>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Téléphone</p>
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
                      <p className="text-xs font-medium text-muted-foreground">Email</p>
                      <p className="text-sm font-semibold text-foreground break-all">{email}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 -mx-3 rounded-xl px-3 py-2">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-primary/5 text-primary ring-1 ring-primary/20">
                      <MapPin className="size-4" aria-hidden />
                    </span>
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">Adresse</p>
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
                        Disponible aujourd'hui
                      </span>
                      <span className="text-xs text-muted-foreground">· Lun-Ven 9h-18h</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map placeholder amélioré */}
              <div className="relative overflow-hidden rounded-3xl bg-muted/50 shadow-[0_10px_30px_-12px_oklch(0.2_0.02_150/0.18)] backdrop-blur-sm">
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl p-px"
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
                {/* Dot grid décoratif */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-40"
                  aria-hidden
                  style={{
                    backgroundImage:
                      'radial-gradient(oklch(0.55 0.05 150 / 0.2) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />
                <div className="relative flex h-56 flex-col items-center justify-center gap-3 p-6 text-center">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-background/70 text-primary ring-1 ring-border/60 backdrop-blur-sm">
                    <MapPin className="size-5" aria-hidden />
                  </span>
                  <p className="text-sm font-medium text-foreground">
                    Intégrez ici votre carte Google Maps
                  </p>
                  <p className="text-xs text-muted-foreground">
                    iframe ou API Google Maps
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

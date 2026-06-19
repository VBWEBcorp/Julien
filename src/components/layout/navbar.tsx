'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Facebook, Instagram, MapPin, Phone } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useState, useEffect } from 'react'

import { Link, usePathname } from '@/i18n/navigation'

import { LanguageSwitcher } from '@/components/layout/language-switcher'
import { ThemeToggle } from '@/components/theme/theme-toggle'
import { siteConfig } from '@/lib/seo'
import { cn } from '@/lib/utils'

interface NavLink {
  to: string
  label: string
}

const ease = [0.22, 1, 0.36, 1] as const
// Ease « rideau » (ease-in-out marqué) pour la montée du panneau plein écran.
const curtain = [0.76, 0, 0.24, 1] as const

// Couleurs de marque (= celles des menus) pour numéroter les liens en alternance.
export function Navbar() {
  const t = useTranslations('nav')
  const [open, setOpen] = useState(false)
  const [features, setFeatures] = useState({ gallery: true, blog: true })
  const pathname = usePathname()

  // Galerie & Journal sont activables depuis le CMS ; le reste est toujours présent.
  const links: NavLink[] = [
    { to: '/', label: t('home') },
    { to: '/services', label: t('hotel') },
    { to: '/restaurant', label: t('restaurant') },
    { to: '/bar-terrasse', label: t('bar') },
    { to: '/vallee-d-aspe', label: t('valley') },
    { to: '/a-propos', label: t('auberge') },
    ...(features.gallery ? [{ to: '/gallery', label: t('gallery') }] : []),
    ...(features.blog ? [{ to: '/blog', label: t('journal') }] : []),
    { to: '/contact', label: t('contact') },
  ]

  useEffect(() => {
    const checkFeatures = async () => {
      try {
        const [galleryRes, blogRes] = await Promise.all([
          fetch('/api/gallery/settings'),
          fetch('/api/blog/settings'),
        ])
        const gallery = await galleryRes.json()
        const blog = await blogRes.json()
        setFeatures({
          gallery: gallery?.enabled !== false,
          blog: blog?.enabled !== false,
        })
      } catch {
        // Valeurs par défaut conservées en cas d'erreur
      }
    }

    checkFeatures()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Fermeture au clavier (Échap).
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Chrome clair (texte/logo blancs) uniquement quand l'overlay plein écran est
  // ouvert. Sinon : pilule flottante blanche — conservée en permanence, y compris
  // au scroll (elle ne se transforme jamais en barre pleine largeur).
  const light = open
  const floating = !open

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          'transition-all duration-300',
          floating
            ? 'mx-4 mt-3 flex max-w-4xl items-center gap-3 rounded-full border border-border/60 bg-background px-5 py-2.5 shadow-lg sm:mx-6 sm:mt-4 sm:px-6 lg:mx-auto'
            : cn(
                'mx-auto flex max-w-none items-center gap-4 px-4 py-3 sm:px-6 lg:px-8',
                open
                  ? 'bg-transparent'
                  : 'border-b border-border/60 bg-background/95 shadow-sm backdrop-blur'
              )
        )}
      >
        {/* Gauche — bouton menu (ouvre l'overlay plein écran, à toutes les tailles) */}
        <div className="flex flex-1 items-center justify-start">
          <button
            type="button"
            className={cn(
              'group inline-flex items-center gap-2.5 rounded-full px-1 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60',
              light ? 'text-white' : 'text-foreground'
            )}
            aria-expanded={open}
            aria-controls="main-menu"
            aria-label={open ? t('closeMenu') : t('openMenu')}
            onClick={() => setOpen((v) => !v)}
          >
            {/* Burger animé maison : deux traits qui se croisent en × à l'ouverture. */}
            <span className="relative flex h-4 w-7 flex-col justify-center gap-[7px]">
              <motion.span
                className="block h-px w-full origin-center rounded-full bg-current"
                animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease }}
              />
              <motion.span
                className="block h-px w-full origin-center rounded-full bg-current"
                animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease }}
              />
            </span>
            <span className="hidden sm:inline">{open ? t('close') : t('menu')}</span>
          </button>
        </div>

        {/* Centre — logo */}
        <Link
          href="/"
          aria-label={siteConfig.name}
          className="flex shrink-0 items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <Image
            src={light ? '/permayou/logo-white.png' : '/permayou/logo.png'}
            alt={siteConfig.name}
            width={170}
            height={113}
            priority
            className={cn(
              'w-auto object-contain transition-all',
              floating ? 'h-9 sm:h-10' : 'h-11 sm:h-12'
            )}
          />
        </Link>

        {/* Droite — langue + Réserver */}
        <div className="flex flex-1 items-center justify-end gap-3 sm:gap-4">
          <LanguageSwitcher variant={light ? 'light' : 'solid'} className="hidden sm:flex" />
          <Link
            href="/reserver"
            onClick={() => setOpen(false)}
            className={cn(
              'group hidden h-10 items-center gap-1.5 rounded-full px-5 text-sm font-medium tracking-tight transition-all sm:inline-flex',
              light
                ? 'border border-white/60 text-white hover:border-white hover:bg-white/10'
                : 'bg-primary text-primary-foreground shadow-sm hover:bg-[oklch(0.29_0.08_150)] hover:shadow-md'
            )}
          >
            {t('book')}
            <ArrowUpRight
              className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </div>
      </div>

      {/* Overlay plein écran — menu immersif */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="main-menu"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.6, ease: curtain }}
            className="fixed inset-0 -z-10 h-[100dvh] overflow-y-auto text-white"
            style={{
              background:
                'linear-gradient(160deg, oklch(0.26 0.045 150) 0%, oklch(0.2 0.035 150) 55%, oklch(0.16 0.03 150) 100%)',
            }}
          >
            {/* Texture / halos décoratifs */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'radial-gradient(60% 50% at 85% 15%, oklch(0.73 0.15 62 / 0.12) 0%, transparent 70%), radial-gradient(50% 50% at 10% 90%, oklch(0.52 0.17 268 / 0.12) 0%, transparent 70%)',
              }}
            />
            <div className="relative mx-auto grid min-h-[100dvh] max-w-7xl grid-cols-1 gap-12 px-6 pb-14 pt-24 sm:px-10 sm:pt-28 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-20 lg:pb-10 lg:pt-20">
              {/* Colonne liens */}
              <nav aria-label="Navigation principale" className="flex flex-col">
                {links.map((l, i) => {
                  const isActive = pathname === l.to
                  return (
                    <motion.div
                      key={l.to}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      // Exit rapide et sans delay : sinon AnimatePresence attend la
                      // fin des exits imbriqués (~1,2s) et la fermeture traîne.
                      exit={{ opacity: 0, y: 12, transition: { duration: 0.2, ease } }}
                      transition={{ duration: 0.5, delay: 0.32 + i * 0.05, ease }}
                    >
                      <Link
                        href={l.to}
                        onClick={() => setOpen(false)}
                        className="group flex items-baseline gap-4 border-b border-white/10 py-3.5 sm:py-4 lg:py-2.5"
                      >
                        <span
                          className={cn(
                            'font-display text-3xl font-medium uppercase leading-none tracking-[0.02em] transition-all duration-300 sm:text-4xl lg:text-[2.25rem]',
                            isActive
                              ? 'text-white'
                              : 'text-white/60 group-hover:translate-x-2 group-hover:text-white'
                          )}
                        >
                          {l.label}
                        </span>
                        <ArrowUpRight
                          className="mb-1 size-5 self-center text-white/0 transition-all duration-300 group-hover:text-white/70 sm:size-6"
                          aria-hidden
                        />
                      </Link>
                    </motion.div>
                  )
                })}
              </nav>

              {/* Colonne infos / contact */}
              <motion.aside
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.2, ease } }}
                transition={{ duration: 0.5, delay: 0.42, ease }}
                className="flex flex-col gap-8 lg:border-l lg:border-white/10 lg:pl-16"
              >
                <Link
                  href="/reserver"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-[3px] bg-[oklch(0.73_0.15_62)] px-8 text-xs font-semibold uppercase tracking-[0.22em] text-[oklch(0.2_0.03_150)] transition-colors hover:bg-[oklch(0.78_0.15_62)]"
                >
                  {t('book')}
                  <ArrowUpRight className="size-4" aria-hidden />
                </Link>

                <div className="space-y-4 text-sm">
                  <p className="font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50">
                    {t('brandLocation')}
                  </p>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="group flex items-center gap-3 text-white/85 transition-colors hover:text-white"
                  >
                    <Phone className="size-4 text-white/50 transition-colors group-hover:text-[oklch(0.73_0.15_62)]" aria-hidden />
                    {siteConfig.phone}
                  </a>
                  <p className="flex items-start gap-3 text-white/70">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-white/50" aria-hidden />
                    <span>
                      {siteConfig.address.street}
                      <br />
                      {siteConfig.address.postalCode} {siteConfig.address.city}
                    </span>
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="inline-flex size-10 items-center justify-center rounded-[3px] border border-white/15 text-white/80 transition-colors hover:border-white/50 hover:text-white"
                  >
                    <Facebook className="size-4" aria-hidden />
                  </a>
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="inline-flex size-10 items-center justify-center rounded-[3px] border border-white/15 text-white/80 transition-colors hover:border-white/50 hover:text-white"
                  >
                    <Instagram className="size-4" aria-hidden />
                  </a>
                </div>

                <div className="flex items-center gap-5 border-t border-white/10 pt-6">
                  <LanguageSwitcher variant="light" />
                  <span className="h-4 w-px bg-white/15" aria-hidden />
                  <ThemeToggle />
                </div>
              </motion.aside>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

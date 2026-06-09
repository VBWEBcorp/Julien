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

// Couleurs de marque (= celles des menus) pour numéroter les liens en alternance.
const ACCENTS = [
  'oklch(0.73 0.15 62)', // orange ambré
  'oklch(0.6 0.14 25)', // brique
  'oklch(0.62 0.16 268)', // bleu
  'oklch(0.66 0.1 150)', // vert mousse
]

export function Navbar() {
  const t = useTranslations('nav')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
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
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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

  // Barre toujours blanche (fond clair). Seul le menu plein écran (overlay vert
  // forêt) bascule le chrome en blanc/clair. Une ombre légère apparaît au scroll.
  const light = open // chrome clair uniquement quand l'overlay du menu est ouvert

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        open
          ? 'bg-transparent'
          : cn(
              'border-b bg-background',
              scrolled ? 'border-border/60 shadow-sm' : 'border-border/40'
            )
      )}
    >
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:h-20 sm:px-6 lg:px-8">
        {/* Gauche — burger */}
        <div className="flex justify-start">
          <button
            type="button"
            className={cn(
              'group inline-flex items-center gap-2.5 rounded-[3px] px-1 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60',
              light ? 'text-white' : 'text-foreground'
            )}
            aria-expanded={open}
            aria-controls="main-menu"
            aria-label={open ? t('closeMenu') : t('openMenu')}
            onClick={() => setOpen((v) => !v)}
          >
            {/* Burger animé maison (deux traits → croix) */}
            <span className="relative flex h-3.5 w-5 flex-col justify-between">
              <motion.span
                className="block h-px w-full origin-center rounded-full bg-current"
                animate={open ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease }}
              />
              <motion.span
                className="block h-px w-full origin-center rounded-full bg-current"
                animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2, ease }}
              />
              <motion.span
                className="block h-px w-full origin-center rounded-full bg-current"
                animate={open ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
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
          className="flex items-center justify-center"
          onClick={() => setOpen(false)}
        >
          {/* Barre blanche → logo couleur ; menu plein écran (overlay sombre) → logo blanc */}
          <Image
            src={light ? '/permayou/logo-white.png' : '/permayou/logo.png'}
            alt={siteConfig.name}
            width={170}
            height={113}
            priority
            className="h-12 w-auto object-contain transition-all sm:h-16"
          />
        </Link>

        {/* Droite — langue + Réserver */}
        <div className="flex items-center justify-end gap-3 sm:gap-4">
          <LanguageSwitcher variant={light ? 'light' : 'solid'} className="hidden sm:flex" />
          <Link
            href="/reserver"
            onClick={() => setOpen(false)}
            className={cn(
              'group hidden h-9 items-center gap-1.5 rounded-[3px] border px-5 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors sm:inline-flex',
              light
                ? 'border-white/60 text-white hover:border-white hover:bg-white/10'
                : 'border-primary bg-primary text-primary-foreground hover:bg-[oklch(0.29_0.08_150)]'
            )}
          >
            {t('book')}
            <ArrowUpRight
              className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
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
            {/* Filigrane « montagne » */}
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[40vh] w-full text-white/[0.04]"
              viewBox="0 0 1440 320"
              preserveAspectRatio="none"
              fill="currentColor"
            >
              <path d="M0 320 L320 90 L520 220 L760 40 L1010 210 L1230 110 L1440 240 L1440 320 Z" />
            </svg>

            <div className="relative mx-auto grid min-h-[100dvh] max-w-7xl grid-cols-1 gap-12 px-6 pb-14 pt-24 sm:px-10 sm:pt-28 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-20 lg:pt-20">
              {/* Colonne liens */}
              <nav aria-label="Navigation principale" className="flex flex-col">
                {links.map((l, i) => {
                  const isActive = pathname === l.to
                  return (
                    <motion.div
                      key={l.to}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.5, delay: 0.08 + i * 0.05, ease }}
                    >
                      <Link
                        href={l.to}
                        onClick={() => setOpen(false)}
                        className="group flex items-baseline gap-4 border-b border-white/10 py-3.5 sm:py-4"
                      >
                        <span
                          className="font-mono text-[11px] tabular-nums tracking-widest transition-colors"
                          style={{ color: ACCENTS[i % ACCENTS.length] }}
                        >
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span
                          className={cn(
                            'font-display text-3xl font-medium uppercase tracking-[0.02em] transition-all duration-300 sm:text-4xl lg:text-[2.75rem]',
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
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.18, ease }}
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

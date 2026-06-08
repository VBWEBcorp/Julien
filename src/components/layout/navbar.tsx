'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

import { ThemeToggle } from '@/components/theme/theme-toggle'
import { cn } from '@/lib/utils'

interface NavLink {
  to: string
  label: string
}

const defaultLinks: NavLink[] = [
  { to: '/', label: 'Accueil' },
  { to: '/services', label: "L'Hôtel" },
  { to: '/restaurant', label: 'Le Restaurant' },
  { to: '/bar-terrasse', label: 'Le Bar & la Terrasse' },
  { to: '/vallee-d-aspe', label: "La Vallée d'Aspe" },
  { to: '/a-propos', label: "L'auberge" },
  { to: '/gallery', label: 'Galerie' },
  { to: '/blog', label: 'Le Journal' },
  { to: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [links, setLinks] = useState<NavLink[]>(defaultLinks)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const checkFeatures = async () => {
      try {
        const [galleryRes, blogRes] = await Promise.all([
          fetch('/api/gallery/settings'),
          fetch('/api/blog/settings'),
        ])
        const gallery = await galleryRes.json()
        const blog = await blogRes.json()

        const dynamicLinks: NavLink[] = [
          { to: '/', label: 'Accueil' },
          { to: '/services', label: "L'Hôtel" },
          { to: '/restaurant', label: 'Le Restaurant' },
          { to: '/bar-terrasse', label: 'Le Bar & la Terrasse' },
          { to: '/vallee-d-aspe', label: "La Vallée d'Aspe" },
          { to: '/a-propos', label: "L'auberge" },
        ]

        if (gallery?.enabled !== false) dynamicLinks.push({ to: '/gallery', label: 'Galerie' })
        if (blog?.enabled !== false) dynamicLinks.push({ to: '/blog', label: 'Le Journal' })

        dynamicLinks.push({ to: '/contact', label: 'Contact' })
        setLinks(dynamicLinks)
      } catch {
        // Liens par défaut conservés en cas d'erreur
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

  // Barre solide quand on a scrollé OU quand le menu est ouvert.
  // Sinon : transparente sur le hero, items en blanc.
  const solid = scrolled || open

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        solid
          ? 'border-b border-border/60 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80'
          : 'bg-gradient-to-b from-black/40 via-black/10 to-transparent'
      )}
    >
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-4 sm:h-20 sm:px-6 lg:px-8">
        {/* Gauche — burger */}
        <div className="flex justify-start">
          <button
            type="button"
            className={cn(
              'group inline-flex items-center gap-2 rounded-[3px] px-1 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60',
              solid ? 'text-foreground' : 'text-white'
            )}
            aria-expanded={open}
            aria-controls="main-menu"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative flex size-5 items-center justify-center">
              <AnimatePresence initial={false} mode="wait">
                {open ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <X className="size-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Menu className="size-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
            <span className="hidden sm:inline">{open ? 'Fermer' : 'Menu'}</span>
          </button>
        </div>

        {/* Centre — wordmark empilé */}
        <Link
          href="/"
          className={cn(
            'flex flex-col items-center leading-none transition-colors',
            solid ? 'text-foreground' : 'text-white'
          )}
          onClick={() => setOpen(false)}
        >
          <span className="font-display text-[9px] font-medium uppercase tracking-[0.4em] opacity-80 sm:text-[10px]">
            Auberge
          </span>
          <span className="mt-1 font-display text-base font-semibold uppercase tracking-[0.22em] sm:text-xl">
            Le Permayou
          </span>
          <span className="mt-1 hidden font-display text-[8px] font-medium uppercase tracking-[0.3em] opacity-70 sm:block">
            Accous · Vallée d'Aspe
          </span>
        </Link>

        {/* Droite — Réserver */}
        <div className="flex items-center justify-end">
          <Link
            href="/reserver"
            className={cn(
              'hidden h-9 items-center rounded-[3px] border px-5 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors sm:inline-flex',
              solid
                ? 'border-primary bg-primary text-primary-foreground hover:bg-[oklch(0.29_0.08_150)]'
                : 'border-white/60 text-white hover:bg-white/10'
            )}
          >
            Réserver
          </Link>
        </div>
      </div>

      {/* Menu déroulant plein largeur */}
      <AnimatePresence>
        {open ? (
          <motion.div
            id="main-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="border-t border-border/60 bg-background/98 backdrop-blur-xl"
          >
            <nav
              aria-label="Navigation principale"
              className="mx-auto flex max-w-3xl flex-col items-center px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
            >
              <div className="grid grid-cols-1 gap-x-12 gap-y-0.5 sm:grid-cols-[max-content_max-content]">
                {links.map((l, i) => {
                  const isActive = pathname === l.to
                  return (
                    <motion.div
                      key={l.to}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.22,
                        delay: 0.03 + i * 0.03,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={cn(
                        'text-center',
                        i % 2 === 0 ? 'sm:text-right' : 'sm:text-left'
                      )}
                    >
                      <Link
                        href={l.to}
                        onClick={() => setOpen(false)}
                        className={cn(
                          'inline-block whitespace-nowrap py-2 font-display text-base uppercase tracking-[0.18em] transition-colors sm:text-lg',
                          isActive
                            ? 'text-primary'
                            : 'text-foreground/80 hover:text-primary'
                        )}
                      >
                        {l.label}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.24,
                  delay: 0.03 + links.length * 0.03,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-8 flex flex-col items-center gap-4 border-t border-border/60 pt-7"
              >
                <Link
                  href="/reserver"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-11 items-center justify-center rounded-[3px] bg-primary px-10 text-xs font-medium uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-[oklch(0.29_0.08_150)] sm:hidden"
                >
                  Réserver
                </Link>
                <ThemeToggle />
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

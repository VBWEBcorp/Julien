import { ArrowUpRight, Facebook, Instagram, Mountain } from 'lucide-react'
import Link from 'next/link'

import { siteConfig } from '@/lib/seo'

const navLinks = [
  { label: 'Accueil', to: '/' },
  { label: "L'Hôtel", to: '/services' },
  { label: "L'auberge", to: '/a-propos' },
  { label: 'Galerie', to: '/gallery' },
  { label: 'Le Journal', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

const legalLinks = [
  { label: 'Mentions légales', to: '/mentions-legales' },
  { label: 'Confidentialité', to: '/politique-de-confidentialite' },
  { label: 'CGU', to: '/conditions-generales' },
  { label: 'Cookies', to: '/politique-cookies' },
]

export function Footer() {
  return (
    <footer className="bg-[oklch(0.24_0.04_150)] text-[oklch(0.9_0.015_95)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Top: brand + nav columns */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-16">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-display text-base font-semibold tracking-tight text-[oklch(0.97_0.01_95)]"
            >
              <span className="flex size-7 items-center justify-center rounded-lg bg-[oklch(0.97_0.01_95)] text-[oklch(0.3_0.06_150)]">
                <Mountain className="size-3.5" aria-hidden />
              </span>
              {siteConfig.name}
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-[oklch(0.82_0.02_150)]">
              {siteConfig.description}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Navigation">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[oklch(0.72_0.05_150)]">
              Navigation
            </h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.to}
                    className="group inline-flex items-center gap-1 text-sm text-[oklch(0.88_0.015_95)] transition-colors hover:text-[oklch(0.98_0.01_95)]"
                  >
                    <span className="relative">
                      {l.label}
                      <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[oklch(0.73_0.15_62)] transition-transform duration-300 group-hover:scale-x-100" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Légal">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[oklch(0.72_0.05_150)]">
              Légal
            </h3>
            <ul className="mt-5 space-y-3">
              {legalLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.to}
                    className="group inline-flex items-center gap-1 text-sm text-[oklch(0.88_0.015_95)] transition-colors hover:text-[oklch(0.98_0.01_95)]"
                  >
                    <span className="relative">
                      {l.label}
                      <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-[oklch(0.73_0.15_62)] transition-transform duration-300 group-hover:scale-x-100" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[oklch(0.72_0.05_150)]">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="group inline-flex items-center gap-1 text-[oklch(0.88_0.015_95)] transition-colors hover:text-[oklch(0.98_0.01_95)]"
                >
                  {siteConfig.email}
                  <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone}`}
                  className="text-[oklch(0.88_0.015_95)] transition-colors hover:text-[oklch(0.98_0.01_95)]"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li className="text-[oklch(0.72_0.025_150)]">
                {siteConfig.address.street}
                <br />
                {siteConfig.address.postalCode} {siteConfig.address.city}
              </li>
              <li className="flex items-center gap-2 pt-2">
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex size-9 items-center justify-center rounded-lg border border-white/15 text-[oklch(0.88_0.015_95)] transition-colors hover:border-[oklch(0.73_0.15_62)]/60 hover:text-[oklch(0.98_0.01_95)]"
                >
                  <Facebook className="size-4" aria-hidden />
                </a>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex size-9 items-center justify-center rounded-lg border border-white/15 text-[oklch(0.88_0.015_95)] transition-colors hover:border-[oklch(0.73_0.15_62)]/60 hover:text-[oklch(0.98_0.01_95)]"
                >
                  <Instagram className="size-4" aria-hidden />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-3 py-6 sm:flex-row sm:items-center">
          <p className="text-xs text-[oklch(0.7_0.03_150)]">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
          <p className="text-xs text-[oklch(0.7_0.03_150)]">
            Tous droits réservés
          </p>
        </div>
      </div>

      {/* Bandeau de protection — mention anti-reproduction */}
      <div className="bg-red-600 text-white">
        <div className="mx-auto max-w-6xl px-4 py-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-wide">
            Maquette de démonstration — Propriété exclusive de{' '}
            <a
              href={siteConfig.url}
              className="underline underline-offset-2 transition-opacity hover:opacity-80"
            >
              {siteConfig.url.replace(/^https?:\/\/(www\.)?/, '').toUpperCase()}
            </a>
          </p>
          <p className="mt-1 text-xs leading-relaxed text-white/90">
            Ce site est une présentation à but de démonstration uniquement. Toute reproduction,
            exploitation ou utilisation à des fins professionnelles ou commerciales est strictement
            interdite.
          </p>
        </div>
      </div>
    </footer>
  )
}

import { ArrowUpRight, Facebook, Instagram } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'

import { Link } from '@/i18n/navigation'
import { siteConfig } from '@/lib/seo'

export async function Footer() {
  const t = await getTranslations()

  const navLinks = [
    { label: t('nav.home'), to: '/' },
    { label: t('nav.hotel'), to: '/services' },
    { label: t('nav.auberge'), to: '/a-propos' },
    { label: t('nav.gallery'), to: '/gallery' },
    { label: t('nav.journal'), to: '/blog' },
    { label: t('nav.contact'), to: '/contact' },
  ]

  const legalLinks = [
    { label: t('footer.mentionsLegales'), to: '/mentions-legales' },
    { label: t('footer.confidentialite'), to: '/politique-de-confidentialite' },
    { label: t('footer.cgu'), to: '/conditions-generales' },
    { label: t('footer.cookies'), to: '/politique-cookies' },
  ]

  return (
    <footer className="bg-[oklch(0.24_0.04_150)] text-[oklch(0.9_0.015_95)]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Top: brand + nav columns */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] lg:gap-16">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" aria-label={siteConfig.name} className="inline-block">
              <Image
                src="/permayou/logo-white.png"
                alt={siteConfig.name}
                width={180}
                height={118}
                className="h-16 w-auto object-contain"
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-[oklch(0.82_0.02_150)]">
              {siteConfig.description}
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label={t('footer.navigation')}>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[oklch(0.72_0.05_150)]">
              {t('footer.navigation')}
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
          <nav aria-label={t('footer.legal')}>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[oklch(0.72_0.05_150)]">
              {t('footer.legal')}
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
              {t('footer.contact')}
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
            {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Home,
  Users,
  Phone,
  MessageSquare,
  Images,
  ArrowRight,
  FileText,
  Database,
  UtensilsCrossed,
  BedDouble,
  Wine,
  CalendarCheck,
  Mountain,
  Languages,
  Rss,
} from 'lucide-react'

interface AdminUser {
  email: string
  name?: string
}

const modules = [
  { href: '/admin/pages/accueil', label: 'Accueil', desc: 'Hero, histoire, FAQ, CTA', icon: Home },
  { href: '/admin/pages/a-propos', label: "L'auberge", desc: 'Histoire, valeurs, galerie', icon: Users },
  { href: '/admin/pages/services', label: "L'Hôtel", desc: 'Chambres & services', icon: BedDouble },
  { href: '/admin/pages/restaurant', label: 'Le Restaurant', desc: 'Sections & horaires', icon: UtensilsCrossed },
  { href: '/admin/pages/bar-terrasse', label: 'Le Bar & la Terrasse', desc: 'Moments & ambiance', icon: Wine },
  { href: '/admin/pages/vallee-d-aspe', label: "La Vallée d'Aspe", desc: 'Activités autour', icon: Mountain },
  { href: '/admin/pages/reserver', label: 'Réserver', desc: 'Hero & réassurance', icon: CalendarCheck },
  { href: '/admin/pages/contact', label: 'Contact', desc: 'Hero & coordonnées', icon: Phone },
  { href: '/admin/pages/temoignages', label: 'Témoignages', desc: 'Avis clients', icon: MessageSquare },
  { href: '/admin/cartes', label: 'Cartes resto', desc: 'Carte du moment, semaine, boissons', icon: UtensilsCrossed },
  { href: '/admin/gallery', label: 'Galerie', desc: 'Photos du site', icon: Images },
  { href: '/admin/blog', label: 'Blog', desc: 'Articles et actualités', icon: FileText },
  { href: '/admin/feed', label: 'Actus du coin', desc: 'Presse, randos & événements agrégés', icon: Rss },
]

const ease = [0.22, 1, 0.36, 1] as const

export default function AdminDashboardPage() {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [seeding, setSeeding] = useState(false)
  const [seedDone, setSeedDone] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const userStr = localStorage.getItem('authUser')

    if (!token || !userStr) {
      router.push('/admin/login')
      return
    }

    try {
      setUser(JSON.parse(userStr))
    } catch {
      router.push('/admin/login')
    } finally {
      setLoading(false)
    }
  }, [router])

  if (loading || !user) return null

  const firstName = user.name?.split(' ')[0] || 'admin'

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl space-y-8 p-4 pt-16 sm:p-6 sm:pt-8 lg:p-8 lg:pt-10">
        {/* En-tête de bienvenue */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <p className="inline-flex items-center gap-3 font-display text-xs font-semibold uppercase tracking-[0.22em] text-primary">
            <span className="h-px w-7 bg-[oklch(0.73_0.15_62)]" aria-hidden />
            Espace admin
          </p>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
            Bonjour {firstName}
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Gérez le contenu de votre site depuis cet espace.
          </p>
        </motion.div>

        {/* Modules */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.08 }}
        >
          <h2 className="mb-4 font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Éditer les pages
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {modules.map((mod, i) => {
              const Icon = mod.icon
              return (
                <motion.div
                  key={mod.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease, delay: 0.1 + i * 0.04 }}
                >
                  <Link
                    href={mod.href}
                    className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-xs)] transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[var(--shadow-md)]"
                  >
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground">{mod.label}</p>
                      <p className="truncate text-xs text-muted-foreground">{mod.desc}</p>
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground/50 transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Interface & langues */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease, delay: 0.16 }}
        >
          <h2 className="mb-4 font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Interface &amp; langues
          </h2>
          <Link
            href="/admin/translations"
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-xs)] transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-[var(--shadow-md)]"
          >
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <Languages className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground">Traductions de l&apos;interface</p>
              <p className="truncate text-xs text-muted-foreground">
                Menu, pied de page, formulaire, boutons… en FR / EN / ES
              </p>
            </div>
            <ArrowRight className="size-4 text-muted-foreground/50 transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
          </Link>
        </motion.div>

        {/* Données d'exemple */}
        {!seedDone && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.2 }}
            className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-secondary/60 p-5 sm:flex-row sm:items-center"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                <Database className="size-4" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">Données d&apos;exemple</p>
                <p className="text-xs text-muted-foreground">
                  Ajouter des photos galerie et articles blog pour tester le template
                </p>
              </div>
            </div>
            <button
              onClick={async () => {
                setSeeding(true)
                try {
                  const token = localStorage.getItem('authToken')
                  const res = await fetch('/api/seed', {
                    method: 'POST',
                    headers: { Authorization: `Bearer ${token}` },
                  })
                  if (res.ok) {
                    setSeedDone(true)
                  } else {
                    alert('Erreur lors du seed')
                  }
                } catch {
                  alert('Erreur réseau')
                } finally {
                  setSeeding(false)
                }
              }}
              disabled={seeding}
              className="w-full shrink-0 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 sm:w-auto"
            >
              {seeding ? 'Chargement…' : 'Charger les données'}
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

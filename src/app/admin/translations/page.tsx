'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Check, Languages, RotateCcw, Save, Search } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { FlatMessages } from '@/lib/i18n-overrides'

type Locale = 'fr' | 'en' | 'es'
const LOCALES: { code: Locale; label: string }[] = [
  { code: 'fr', label: 'FR' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
]

// Libellés FR des sections (clé = 1er segment du chemin). Repli : la clé brute.
const SECTION_LABELS: Record<string, string> = {
  nav: 'Navigation (menu)',
  footer: 'Pied de page',
  cookies: 'Bandeau cookies',
  breadcrumb: "Fil d'Ariane",
  common: 'Boutons communs',
  faq: 'FAQ',
  values: 'Bandeau de valeurs',
  contact: 'Page Contact (formulaire, etc.)',
  reserver: 'Page Réserver',
  meta: 'SEO — titres & descriptions par défaut',
}

function namespaceOf(key: string) {
  return key.split('.')[0]
}

export default function TranslationsAdminPage() {
  const router = useRouter()
  const [authChecked, setAuthChecked] = useState(false)

  const [locale, setLocale] = useState<Locale>('fr')
  const [defaults, setDefaults] = useState<FlatMessages>({})
  const [values, setValues] = useState<FlatMessages>({})
  const loadedRef = useRef<string>('{}')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [query, setQuery] = useState('')

  // Garde d'authentification (même logique que le dashboard).
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const userStr = localStorage.getItem('authUser')
    if (!token || !userStr) {
      router.push('/admin/login')
      return
    }
    setAuthChecked(true)
  }, [router])

  const load = useCallback(async (loc: Locale) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/i18n/${loc}`)
      const data = await res.json()
      const def: FlatMessages = data.defaults ?? {}
      const ov: FlatMessages = data.overrides ?? {}
      const merged = { ...def, ...ov }
      setDefaults(def)
      setValues(merged)
      loadedRef.current = JSON.stringify(merged)
    } catch {
      setDefaults({})
      setValues({})
      loadedRef.current = '{}'
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (authChecked) load(locale)
  }, [authChecked, locale, load])

  const dirty = useMemo(() => JSON.stringify(values) !== loadedRef.current, [values])
  const overriddenCount = useMemo(
    () => Object.keys(values).filter((k) => values[k] !== defaults[k]).length,
    [values, defaults]
  )

  function switchLocale(next: Locale) {
    if (next === locale) return
    if (dirty && !window.confirm('Des modifications non enregistrées seront perdues. Continuer ?')) {
      return
    }
    setQuery('')
    setLocale(next)
  }

  const updateValue = useCallback((key: string, value: string) => {
    setSaved(false)
    setValues((prev) => ({ ...prev, [key]: value }))
  }, [])

  const resetKey = useCallback((key: string) => {
    setSaved(false)
    setValues((prev) => ({ ...prev, [key]: defaults[key] ?? '' }))
  }, [defaults])

  async function handleSave() {
    setSaving(true)
    try {
      const token = localStorage.getItem('authToken')
      const res = await fetch(`/api/i18n/${locale}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ values }),
      })
      if (res.ok) {
        loadedRef.current = JSON.stringify(values)
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      } else {
        alert('Erreur lors de la sauvegarde')
      }
    } catch {
      alert('Erreur réseau')
    } finally {
      setSaving(false)
    }
  }

  // Clés filtrées par la recherche puis regroupées par namespace.
  const groups = useMemo(() => {
    const q = query.trim().toLowerCase()
    const keys = Object.keys(defaults)
      .filter((k) => {
        if (!q) return true
        return (
          k.toLowerCase().includes(q) ||
          (values[k] ?? '').toLowerCase().includes(q) ||
          (defaults[k] ?? '').toLowerCase().includes(q)
        )
      })
      .sort()
    const map = new Map<string, string[]>()
    for (const k of keys) {
      const ns = namespaceOf(k)
      if (!map.has(ns)) map.set(ns, [])
      map.get(ns)!.push(k)
    }
    return Array.from(map.entries())
  }, [defaults, values, query])

  if (!authChecked) return null

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* En-tête sticky */}
      <div className="sticky top-0 z-10 -mx-4 -mt-4 mb-6 border-b border-border/40 bg-background/90 px-4 pb-4 pt-4 backdrop-blur-md sm:-mx-6 sm:-mt-6 sm:px-6 sm:pt-6 lg:-mx-8 lg:-mt-8 lg:px-8 lg:pt-8">
        <div className="flex max-w-4xl flex-col gap-3 pt-8 md:pt-0">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Link
                href="/admin/dashboard"
                className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
              >
                <ArrowLeft className="size-4" />
              </Link>
              <div>
                <p className="inline-flex items-center gap-2 font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
                  <span className="h-px w-5 bg-[oklch(0.73_0.15_62)]" aria-hidden />
                  Interface &amp; langues
                </p>
                <h1 className="font-display text-xl font-bold tracking-[-0.02em] text-foreground sm:text-2xl">
                  Traductions de l&apos;interface
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5 rounded-lg bg-muted/60 p-0.5">
                {LOCALES.map((l) => (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => switchLocale(l.code)}
                    className={cn(
                      'rounded-md px-2.5 py-1 text-xs font-semibold transition-colors',
                      locale === l.code
                        ? 'bg-white text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    )}
                    aria-pressed={locale === l.code}
                  >
                    {l.label}
                  </button>
                ))}
              </div>
              <Button
                onClick={handleSave}
                disabled={saving || !dirty}
                size="sm"
                className={saved ? 'bg-emerald-600 hover:bg-emerald-600' : ''}
              >
                {saved ? (
                  <>
                    <Check className="size-3.5" />
                    Sauvegardé
                  </>
                ) : (
                  <>
                    <Save className="size-3.5" />
                    {saving ? 'Sauvegarde…' : 'Sauvegarder'}
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Recherche */}
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un libellé (texte ou clé)…"
              className="h-9 w-full rounded-lg border border-input bg-background pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl space-y-6">
        <p className="text-xs leading-relaxed text-muted-foreground">
          Modifiez les libellés fixes du site (menu, pied de page, formulaire, boutons…) pour la
          langue <strong className="text-foreground">{locale.toUpperCase()}</strong>. Une étiquette
          {' '}<span className="font-medium text-primary">modifié</span> indique une valeur
          personnalisée ; le bouton <RotateCcw className="inline size-3" /> rétablit la valeur
          d&apos;origine. {overriddenCount > 0 && <>({overriddenCount} libellé(s) personnalisé(s))</>}
        </p>

        {loading ? (
          <p className="text-muted-foreground">Chargement…</p>
        ) : groups.length === 0 ? (
          <p className="text-muted-foreground">Aucun libellé ne correspond à « {query} ».</p>
        ) : (
          groups.map(([ns, keys]) => (
            <section
              key={ns}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-xs)]"
            >
              <header className="flex items-center justify-between border-b border-border/60 bg-secondary/40 px-4 py-2.5">
                <h2 className="text-sm font-semibold text-foreground">
                  {SECTION_LABELS[ns] ?? ns}
                </h2>
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {ns}
                </span>
              </header>
              <div className="divide-y divide-border/50">
                {keys.map((key) => {
                  const value = values[key] ?? ''
                  const def = defaults[key] ?? ''
                  const isOverridden = value !== def
                  const subKey = key.slice(ns.length + 1) || key
                  const multiline = def.length > 50 || value.length > 50
                  return (
                    <div key={key} className="grid gap-1.5 px-4 py-3 sm:grid-cols-[200px_1fr] sm:gap-4">
                      <div className="flex items-start gap-1.5 pt-1">
                        <span className="font-mono text-xs text-muted-foreground break-all" title={key}>
                          {subKey}
                        </span>
                        {isOverridden && (
                          <span className="shrink-0 rounded bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-primary">
                            modifié
                          </span>
                        )}
                      </div>
                      <div className="flex items-start gap-2">
                        {multiline ? (
                          <textarea
                            value={value}
                            onChange={(e) => updateValue(key, e.target.value)}
                            rows={2}
                            className="min-h-[2.25rem] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm leading-relaxed text-foreground focus-visible:border-ring focus-visible:outline-none"
                          />
                        ) : (
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => updateValue(key, e.target.value)}
                            className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm text-foreground focus-visible:border-ring focus-visible:outline-none"
                          />
                        )}
                        <button
                          type="button"
                          onClick={() => resetKey(key)}
                          disabled={!isOverridden}
                          title="Rétablir la valeur d'origine"
                          className="mt-1 shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-30"
                        >
                          <RotateCcw className="size-3.5" />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          ))
        )}

        <div className="flex items-start gap-2 rounded-xl border border-border/60 bg-secondary/40 p-3 text-xs text-muted-foreground">
          <Languages className="mt-0.5 size-4 shrink-0 text-primary" />
          <span>
            En production, les modifications peuvent prendre jusqu&apos;à une minute pour apparaître
            sur le site (mise en cache). En local, elles sont visibles dès le rechargement de la page.
          </span>
        </div>
      </div>
    </div>
  )
}

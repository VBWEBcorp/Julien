'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowLeft, RefreshCw, Check, EyeOff, Trash2, Pin, ExternalLink,
  Newspaper, Calendar, Mountain, PartyPopper, Rss,
} from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FeedItem {
  _id: string
  title: string
  excerpt: string
  image: string
  externalUrl: string
  sourceName: string
  sourceType: 'presse' | 'rando' | 'evenement' | 'autre'
  status: 'pending' | 'approved' | 'hidden'
  pinned: boolean
  publishedAt?: string
}

type StatusTab = 'pending' | 'approved' | 'hidden'

const TYPE_META: Record<FeedItem['sourceType'], { label: string; icon: any }> = {
  presse: { label: 'Presse', icon: Newspaper },
  rando: { label: 'Randos', icon: Mountain },
  evenement: { label: 'Événement', icon: PartyPopper },
  autre: { label: 'Autre', icon: Rss },
}

export default function AdminFeedPage() {
  const router = useRouter()
  const [items, setItems] = useState<FeedItem[]>([])
  const [tab, setTab] = useState<StatusTab>('pending')
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [refreshMsg, setRefreshMsg] = useState<string | null>(null)

  useEffect(() => {
    if (!localStorage.getItem('authToken')) router.push('/admin/login')
  }, [router])

  const load = async () => {
    try {
      const token = localStorage.getItem('authToken')
      const res = await fetch('/api/feed?status=' + tab, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Failed to load feed:', error)
      setItems([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setLoading(true)
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab])

  const handleRefresh = async () => {
    setRefreshing(true)
    setRefreshMsg(null)
    try {
      const token = localStorage.getItem('authToken')
      const res = await fetch('/api/feed/refresh', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (res.ok) {
        setRefreshMsg(`${data.itemsInserted} nouvelle(s) actu sur ${data.itemsSeen} trouvée(s).`)
        if (tab === 'pending') load()
      } else {
        setRefreshMsg(data.error || 'Erreur lors du rafraîchissement')
      }
    } catch {
      setRefreshMsg('Erreur réseau')
    } finally {
      setRefreshing(false)
    }
  }

  const patch = async (id: string, body: Partial<FeedItem>) => {
    const token = localStorage.getItem('authToken')
    const res = await fetch(`/api/feed/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify(body),
    })
    return res.ok
  }

  const handleStatus = async (item: FeedItem, status: StatusTab) => {
    if (await patch(item._id, { status })) {
      // L'item quitte l'onglet courant.
      setItems((prev) => prev.filter((i) => i._id !== item._id))
    }
  }

  const handleTogglePin = async (item: FeedItem) => {
    if (await patch(item._id, { pinned: !item.pinned })) {
      setItems((prev) => prev.map((i) => i._id === item._id ? { ...i, pinned: !i.pinned } : i))
    }
  }

  const handleDelete = async (item: FeedItem) => {
    if (!confirm('Supprimer définitivement cette actualité ?')) return
    const token = localStorage.getItem('authToken')
    const res = await fetch(`/api/feed/${item._id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    })
    if (res.ok) setItems((prev) => prev.filter((i) => i._id !== item._id))
  }

  const formatDate = (date?: string) =>
    date ? new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }) : ''

  const tabs: { value: StatusTab; label: string }[] = [
    { value: 'pending', label: 'À modérer' },
    { value: 'approved', label: 'Publiées' },
    { value: 'hidden', label: 'Masquées' },
  ]

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 pt-8 md:pt-0">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/dashboard"
            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-card hover:text-foreground transition-colors"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div>
            <p className="inline-flex items-center gap-2 font-display text-[10px] font-semibold uppercase tracking-[0.22em] text-primary">
              <span className="h-px w-5 bg-[oklch(0.73_0.15_62)]" aria-hidden />
              Agrégation
            </p>
            <h1 className="font-display text-xl font-bold tracking-[-0.02em] text-foreground sm:text-2xl">
              Actualités du coin
            </h1>
          </div>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-3">
          {refreshMsg && <span className="text-xs text-muted-foreground">{refreshMsg}</span>}
          <Button size="sm" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={cn('size-4', refreshing && 'animate-spin')} />
            {refreshing ? 'Récupération…' : 'Récupérer les actus'}
          </Button>
        </div>
      </div>

      <p className="max-w-2xl text-sm text-muted-foreground">
        Les actualités locales (presse, randos, événements) sont récupérées automatiquement
        auprès de sources externes. Elles arrivent <strong>à modérer</strong> : validez celles
        à afficher sur le site, masquez le reste. Seules les actus <strong>publiées</strong>
        apparaissent sur la page publique, en plus de vos propres articles.
      </p>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-lg bg-muted/50 w-fit">
        {tabs.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all',
              tab === t.value
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* List */}
      {loading ? (
        <div className="p-6 text-muted-foreground">Chargement…</div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 rounded-xl border border-dashed border-border/60">
          <Rss className="size-10 text-muted-foreground/20 mx-auto mb-3" />
          <p className="text-muted-foreground font-medium">
            {tab === 'pending'
              ? 'Aucune actu à modérer. Cliquez sur « Récupérer les actus ».'
              : tab === 'approved'
              ? 'Aucune actu publiée pour le moment.'
              : 'Aucune actu masquée.'}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => {
            const Meta = TYPE_META[item.sourceType] ?? TYPE_META.autre
            const Icon = Meta.icon
            return (
              <motion.div
                key={item._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-start gap-4 p-4 rounded-xl border border-border/50 bg-card hover:border-border transition group"
              >
                {item.image ? (
                  <div className="hidden sm:block w-20 h-16 rounded-lg overflow-hidden bg-muted shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt="" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="hidden sm:flex w-20 h-16 rounded-lg bg-muted/50 shrink-0 items-center justify-center">
                    <Icon className="size-5 text-muted-foreground/30" />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 shrink-0 text-[10px] font-semibold uppercase tracking-wide text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                      <Icon className="size-3" /> {Meta.label}
                    </span>
                    {item.pinned && (
                      <span className="inline-flex items-center gap-1 shrink-0 text-[10px] font-semibold uppercase tracking-wide text-amber-600 bg-amber-500/10 px-1.5 py-0.5 rounded">
                        <Pin className="size-3" /> Épinglé
                      </span>
                    )}
                  </div>
                  <a
                    href={item.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-start gap-1 font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {item.title}
                    <ExternalLink className="size-3 mt-1 shrink-0 opacity-50" />
                  </a>
                  {item.excerpt && (
                    <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">{item.excerpt}</p>
                  )}
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                    <span className="font-medium text-muted-foreground/80">{item.sourceName}</span>
                    {item.publishedAt && (
                      <span className="flex items-center gap-1">
                        <Calendar className="size-3" />
                        {formatDate(item.publishedAt)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  {tab !== 'approved' && (
                    <Button size="icon-sm" variant="ghost" title="Publier" onClick={() => handleStatus(item, 'approved')}>
                      <Check className="size-4 text-emerald-600" />
                    </Button>
                  )}
                  {tab === 'approved' && (
                    <Button
                      size="icon-sm"
                      variant="ghost"
                      title={item.pinned ? 'Désépingler' : 'Épingler en tête'}
                      onClick={() => handleTogglePin(item)}
                    >
                      <Pin className={cn('size-4', item.pinned ? 'text-amber-600' : 'text-muted-foreground')} />
                    </Button>
                  )}
                  {tab !== 'hidden' && (
                    <Button size="icon-sm" variant="ghost" title="Masquer" onClick={() => handleStatus(item, 'hidden')}>
                      <EyeOff className="size-4 text-muted-foreground" />
                    </Button>
                  )}
                  <Button size="icon-sm" variant="ghost" title="Supprimer" onClick={() => handleDelete(item)}>
                    <Trash2 className="size-4 text-destructive" />
                  </Button>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}

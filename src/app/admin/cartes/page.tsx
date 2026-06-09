'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Check,
  FileText,
  Loader2,
  Plus,
  Replace,
  Trash2,
  Upload,
  X,
} from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

interface Carte {
  _id: string
  title: string
  description?: string
  fileUrl: string
  fileType: 'pdf' | 'image'
  order: number
  active: boolean
}

const ease = [0.22, 1, 0.36, 1] as const

// Upload d'un fichier de carte : PDF ou photo. Renvoie l'URL + le type détecté.
function useCarteUpload() {
  const upload = async (file: File): Promise<{ url: string; fileType: 'pdf' | 'image' } | null> => {
    const token = localStorage.getItem('authToken')
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      alert(data.error || 'Erreur lors de l’upload')
      return null
    }
    const data = await res.json()
    return { url: data.url, fileType: file.type === 'application/pdf' ? 'pdf' : 'image' }
  }
  return upload
}

// Zone de dépôt / sélection de fichier (PDF ou image). Tappable sur mobile.
function FileDrop({
  onUploaded,
  uploading,
  setUploading,
}: {
  onUploaded: (url: string, fileType: 'pdf' | 'image') => void
  uploading: boolean
  setUploading: (v: boolean) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragOver, setDragOver] = useState(false)
  const upload = useCarteUpload()

  const handle = async (file?: File | null) => {
    if (!file) return
    setUploading(true)
    const result = await upload(file)
    setUploading(false)
    if (result) onUploaded(result.url, result.fileType)
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*,application/pdf"
        onChange={(e) => handle(e.target.files?.[0])}
        className="hidden"
      />
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragOver(false)
          handle(e.dataTransfer.files?.[0])
        }}
        className={cn(
          'flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-6 text-center transition-colors',
          uploading ? 'pointer-events-none opacity-60' : 'cursor-pointer',
          dragOver
            ? 'border-primary bg-primary/5'
            : 'border-border/60 hover:border-primary/40 hover:bg-muted/30'
        )}
      >
        {uploading ? (
          <>
            <Loader2 className="size-6 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">Envoi en cours…</span>
          </>
        ) : (
          <>
            <Upload className="size-6 text-primary" />
            <span className="text-sm font-medium text-foreground">
              Cliquez ou glissez le fichier
            </span>
            <span className="text-xs text-muted-foreground">
              PDF ou photo (JPG, PNG…) · max 10 Mo · idéal depuis mobile
            </span>
          </>
        )}
      </div>
    </>
  )
}

// Vignette d'aperçu d'une carte (photo ou badge PDF).
function CartePreview({ url, type, className }: { url: string; type: 'pdf' | 'image'; className?: string }) {
  if (!url) {
    return (
      <div className={cn('flex items-center justify-center rounded-xl bg-muted text-muted-foreground', className)}>
        <FileText className="size-5" />
      </div>
    )
  }
  if (type === 'pdf') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'flex flex-col items-center justify-center gap-1 rounded-xl bg-[oklch(0.66_0.16_25)]/10 text-[oklch(0.52_0.14_25)] ring-1 ring-[oklch(0.66_0.16_25)]/20',
          className
        )}
        title="Ouvrir le PDF"
      >
        <FileText className="size-5" />
        <span className="text-[10px] font-bold uppercase tracking-wide">PDF</span>
      </a>
    )
  }
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={cn('block overflow-hidden rounded-xl ring-1 ring-border/60', className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={url} alt="" className="size-full object-cover" />
    </a>
  )
}

export default function AdminCartesPage() {
  const router = useRouter()
  const [cartes, setCartes] = useState<Carte[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingNew, setUploadingNew] = useState(false)
  const [replacingId, setReplacingId] = useState<string | null>(null)
  const [newCarte, setNewCarte] = useState<{
    title: string
    description: string
    fileUrl: string
    fileType: 'pdf' | 'image'
  }>({ title: '', description: '', fileUrl: '', fileType: 'image' })

  useEffect(() => {
    if (!localStorage.getItem('authToken')) router.push('/admin/login')
  }, [router])

  useEffect(() => {
    fetch('/api/cartes?all=1')
      .then((r) => r.json())
      .then((data) => setCartes(Array.isArray(data) ? data : []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const authHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('authToken')}`,
  })

  const handleAdd = async () => {
    if (!newCarte.title) {
      alert('Donnez un titre à la carte (ex. « Carte du moment »).')
      return
    }
    setSaving(true)
    try {
      const res = await fetch('/api/cartes', {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({ ...newCarte, order: cartes.length }),
      })
      if (res.ok) {
        const carte = await res.json()
        setCartes((c) => [...c, carte])
        setNewCarte({ title: '', description: '', fileUrl: '', fileType: 'image' })
      }
    } finally {
      setSaving(false)
    }
  }

  const patchCarte = async (id: string, patch: Partial<Carte>) => {
    const current = cartes.find((c) => c._id === id)
    if (!current) return
    const merged = { ...current, ...patch }
    setCartes((cs) => cs.map((c) => (c._id === id ? merged : c)))
    await fetch(`/api/cartes/${id}`, {
      method: 'PUT',
      headers: authHeaders(),
      body: JSON.stringify(merged),
    })
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette carte ?')) return
    setCartes((cs) => cs.filter((c) => c._id !== id))
    await fetch(`/api/cartes/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
    })
  }

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-muted-foreground">
        <Loader2 className="size-5 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-8 p-4 pt-12 sm:p-6 lg:p-8">
      {/* En-tête DA */}
      <div className="flex items-start gap-3">
        <Link
          href="/admin/dashboard"
          className="mt-1 flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
        </Link>
        <div>
          <p className="inline-flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.22em] text-primary">
            <span className="h-px w-6 bg-[oklch(0.73_0.15_62)]" aria-hidden />
            Restaurant
          </p>
          <h1 className="mt-1.5 font-display text-2xl font-bold tracking-[-0.02em] text-foreground sm:text-3xl">
            Cartes du restaurant
          </h1>
          <p className="mt-1 max-w-xl text-sm text-muted-foreground">
            Carte du moment, carte de la semaine, boissons, snacking… Uploadez un PDF
            ou une photo. Modifiable en quelques secondes, même depuis votre téléphone.
          </p>
        </div>
      </div>

      {/* Ajouter une carte */}
      <div className="overflow-hidden rounded-3xl border border-border/60 bg-card shadow-[0_2px_8px_oklch(0.2_0.02_150/0.04)]">
        <div className="flex items-center gap-2 border-b border-border/60 bg-muted/30 px-5 py-3">
          <Plus className="size-4 text-primary" />
          <h2 className="font-display text-sm font-semibold text-foreground">Ajouter une carte</h2>
        </div>
        <div className="space-y-4 p-5">
          <div className="space-y-1.5">
            <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Titre
            </Label>
            <Input
              value={newCarte.title}
              onChange={(e) => setNewCarte({ ...newCarte, title: e.target.value })}
              placeholder="Ex. Carte du moment"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Petite description (optionnel)
            </Label>
            <Input
              value={newCarte.description}
              onChange={(e) => setNewCarte({ ...newCarte, description: e.target.value })}
              placeholder="Ex. Mise à jour chaque semaine"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Fichier (PDF ou photo)
            </Label>
            {newCarte.fileUrl ? (
              <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-muted/20 p-3">
                <CartePreview url={newCarte.fileUrl} type={newCarte.fileType} className="size-16" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {newCarte.fileType === 'pdf' ? 'PDF prêt' : 'Photo prête'}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{newCarte.fileUrl}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setNewCarte({ ...newCarte, fileUrl: '', fileType: 'image' })}
                  className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-card hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              </div>
            ) : (
              <FileDrop
                uploading={uploadingNew}
                setUploading={setUploadingNew}
                onUploaded={(url, fileType) => setNewCarte({ ...newCarte, fileUrl: url, fileType })}
              />
            )}
          </div>
          <Button onClick={handleAdd} disabled={saving} className="w-full gap-2">
            <Check className="size-4" />
            {saving ? 'Ajout…' : 'Ajouter la carte'}
          </Button>
        </div>
      </div>

      {/* Liste des cartes */}
      <div className="space-y-3">
        <h2 className="font-display text-sm font-semibold text-foreground">
          Cartes ({cartes.length})
        </h2>
        {cartes.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border/60 py-10 text-center text-sm text-muted-foreground">
            Aucune carte pour l’instant. Ajoutez votre première carte ci-dessus.
          </p>
        ) : (
          cartes.map((carte) => (
            <motion.div
              key={carte._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease }}
              className="flex flex-col gap-4 rounded-2xl border border-border/60 bg-card p-4 sm:flex-row sm:items-center"
            >
              <CartePreview url={carte.fileUrl} type={carte.fileType} className="h-20 w-full sm:size-20 sm:shrink-0" />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-display text-base font-semibold text-foreground">{carte.title}</p>
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide',
                      carte.fileUrl
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                    {carte.fileUrl ? carte.fileType : 'sans fichier'}
                  </span>
                  {!carte.active && (
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      masquée
                    </span>
                  )}
                </div>
                {carte.description && (
                  <p className="mt-0.5 truncate text-sm text-muted-foreground">{carte.description}</p>
                )}
                {/* Remplacer le fichier (inline) */}
                {replacingId === carte._id ? (
                  <div className="mt-3">
                    <FileDrop
                      uploading={false}
                      setUploading={() => {}}
                      onUploaded={(url, fileType) => {
                        setReplacingId(null)
                        patchCarte(carte._id, { fileUrl: url, fileType })
                      }}
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => setReplacingId(carte._id)}
                    className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
                  >
                    <Replace className="size-3.5" />
                    {carte.fileUrl ? 'Remplacer le fichier' : 'Ajouter un fichier'}
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 sm:ml-2">
                <button
                  onClick={() => patchCarte(carte._id, { active: !carte.active })}
                  title={carte.active ? 'Masquer du site' : 'Afficher sur le site'}
                  className={cn(
                    'flex size-9 items-center justify-center rounded-lg transition-colors',
                    carte.active
                      ? 'text-primary hover:bg-primary/10'
                      : 'text-muted-foreground hover:bg-muted'
                  )}
                >
                  {carte.active ? <Check className="size-4" /> : <X className="size-4" />}
                </button>
                <button
                  onClick={() => handleDelete(carte._id)}
                  title="Supprimer"
                  className="flex size-9 items-center justify-center rounded-lg text-destructive transition-colors hover:bg-destructive/10"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}

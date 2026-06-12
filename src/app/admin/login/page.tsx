'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Lock, Mail } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const ease = [0.22, 1, 0.36, 1] as const

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Identifiants invalides')
      }

      const data = await response.json()
      localStorage.setItem('authToken', data.token)
      localStorage.setItem('authUser', JSON.stringify(data.user))

      router.push('/admin/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-dvh flex-col overflow-hidden bg-background">
      {/* Halos verts d'ambiance — discrets, dans l'identité Permayou */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 size-[520px] -translate-x-1/2 rounded-full bg-primary/10 blur-[150px]" />
        <div className="absolute -bottom-48 -right-24 size-[460px] rounded-full bg-[oklch(0.73_0.15_62)]/10 blur-[150px]" />
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 sm:px-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-display text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Retour au site
        </Link>
      </header>

      {/* Contenu centré */}
      <main className="relative z-10 flex flex-1 items-center justify-center px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="w-full max-w-md"
        >
          {/* En-tête : logo + titre */}
          <div className="mb-8 text-center">
            <Image
              src="/permayou/logo.png"
              alt="Auberge Le Permayou"
              width={160}
              height={52}
              className="mx-auto mb-8 h-12 w-auto object-contain"
              priority
            />
            <p className="inline-flex items-center justify-center gap-3 font-display text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              <span className="h-px w-7 bg-[oklch(0.73_0.15_62)]" aria-hidden />
              Espace admin
              <span className="h-px w-7 bg-[oklch(0.73_0.15_62)]" aria-hidden />
            </p>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-[-0.02em] text-foreground sm:text-4xl">
              Connexion
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Connectez-vous pour gérer le contenu du site.
            </p>
          </div>

          {/* Carte formulaire */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-md)] sm:p-8">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
                >
                  Email
                </Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                    placeholder="vous@exemple.fr"
                    className="h-11 pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
                >
                  Mot de passe
                </Label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="h-11 pl-10"
                  />
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2.5 text-sm text-destructive"
                >
                  {error}
                </motion.div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="group h-11 w-full"
              >
                {loading ? (
                  'Connexion en cours…'
                ) : (
                  <>
                    Se connecter
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-6 text-center sm:px-10">
        <Link
          href="/politique-de-confidentialite"
          className="text-[11px] text-muted-foreground/70 transition-colors hover:text-foreground"
        >
          Politique de confidentialité
        </Link>
      </footer>
    </div>
  )
}

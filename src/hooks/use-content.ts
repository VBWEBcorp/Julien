'use client'

import { useLocale } from 'next-intl'
import { useEffect, useState } from 'react'

import { localizedContent } from '@/lib/localized-content'

type CacheEntry = {
  data: any
  fetchedAt: number
}

const CACHE_TTL = 30_000 // 30s: cross-section dedupe + quick nav caching
const cache = new Map<string, CacheEntry>()
const inflight = new Map<string, Promise<any>>()

// Defaults localisés pour une page donnée (hors FR, qui utilise les defaults
// passés par le composant comme source). Permet d'afficher le contenu traduit
// même sans contenu CMS en base.
function localizedDefaults(locale: string, pageId: string): Record<string, any> | undefined {
  if (locale === 'fr') return undefined
  return localizedContent[locale]?.[pageId]
}

async function fetchContent(pageId: string, locale: string): Promise<any> {
  const key = `${locale}:${pageId}`
  const now = Date.now()
  const cached = cache.get(key)
  if (cached && now - cached.fetchedAt < CACHE_TTL) {
    return cached.data
  }

  const existing = inflight.get(key)
  if (existing) return existing

  const promise = fetch(`/api/content/${pageId}?locale=${locale}`)
    .then((r) => r.json())
    .then((result) => {
      cache.set(key, { data: result, fetchedAt: Date.now() })
      inflight.delete(key)
      return result
    })
    .catch((err) => {
      inflight.delete(key)
      throw err
    })

  inflight.set(key, promise)
  return promise
}

export function useContent<T extends Record<string, any>>(
  pageId: string,
  defaults: T
): { data: T; loading: boolean } {
  const locale = useLocale()

  const [data, setData] = useState<T>(() => {
    const loc = localizedDefaults(locale, pageId)
    const base = { ...defaults, ...loc } as T
    const cached = cache.get(`${locale}:${pageId}`)
    if (cached?.data?.content && Object.keys(cached.data.content).length > 0) {
      return { ...base, ...cached.data.content }
    }
    return base
  })
  const [loading, setLoading] = useState(!cache.has(`${locale}:${pageId}`))

  useEffect(() => {
    const loc = localizedDefaults(locale, pageId)
    const base = { ...defaults, ...loc } as T

    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
    const previewId = params?.get('preview')
    const isPreview = previewId === pageId

    if (isPreview) {
      setLoading(false)
      const handler = (event: MessageEvent) => {
        const msg = event.data
        if (
          msg &&
          msg.type === 'preview-content' &&
          msg.pageId === pageId &&
          (msg.locale === undefined || msg.locale === locale) &&
          msg.content
        ) {
          setData({ ...base, ...msg.content })
        }
      }
      window.addEventListener('message', handler)
      window.parent?.postMessage({ type: 'preview-ready', pageId, locale }, '*')
      return () => window.removeEventListener('message', handler)
    }

    let cancelled = false
    fetchContent(pageId, locale)
      .then((result) => {
        if (cancelled) return
        if (result?.content && Object.keys(result.content).length > 0) {
          setData({ ...base, ...result.content })
        } else {
          setData(base)
        }
      })
      .catch((error) => {
        console.error(`Failed to load content for ${pageId}:`, error)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageId, locale])

  return { data, loading }
}

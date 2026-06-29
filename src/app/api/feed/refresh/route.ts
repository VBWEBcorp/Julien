import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { FeedItem } from '@/models/FeedItem'
import { verifyAuth } from '@/lib/auth'
import { FEED_SOURCES, fetchSource } from '@/lib/feed-sources'

export const maxDuration = 60

// POST /api/feed/refresh
// Récupère toutes les sources actives, normalise les items et les insère en base
// (status: pending) sans écraser ceux déjà modérés. Dédup par externalUrl via
// upsert applicatif (autoIndex désactivé dans connectDB → pas d'index unique DB).
//
// Auth : admin (UI) OU clé partagée via en-tête `x-cron-secret` (= FEED_CRON_SECRET)
// pour un déclenchement par tâche planifiée (cron) sans session.
export async function POST(request: NextRequest) {
  try {
    const { authenticated, user } = await verifyAuth(request)
    const isAdmin = authenticated && user?.role === 'admin'

    const cronSecret = process.env.FEED_CRON_SECRET
    const providedSecret = request.headers.get('x-cron-secret')
    const isCron = !!cronSecret && providedSecret === cronSecret

    if (!isAdmin && !isCron) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()

    const sources = FEED_SOURCES.filter((s) => s.enabled)
    let inserted = 0
    let seen = 0
    const perSource: { id: string; found: number; new: number; ok: boolean }[] = []

    // Sources récupérées en parallèle ; chacune isolée (une panne n'arrête rien).
    const results = await Promise.all(
      sources.map(async (source) => {
        const items = await fetchSource(source)
        return { source, items }
      })
    )

    for (const { source, items } of results) {
      let sourceNew = 0
      for (const item of items) {
        seen++
        try {
          const res = await FeedItem.updateOne(
            { externalUrl: item.externalUrl },
            {
              // $setOnInsert : on ne touche JAMAIS à un item déjà connu (sa
              // modération — approved/hidden/pinned — est préservée).
              $setOnInsert: {
                title: item.title,
                excerpt: item.excerpt,
                image: item.image,
                externalUrl: item.externalUrl,
                sourceName: item.sourceName,
                sourceId: source.id,
                sourceType: source.type,
                locale: 'fr',
                publishedAt: item.publishedAt ?? undefined,
                status: 'pending',
                pinned: false,
                fetchedAt: new Date(),
              },
            },
            { upsert: true }
          )
          if (res.upsertedCount && res.upsertedCount > 0) {
            inserted++
            sourceNew++
          }
        } catch {
          // Conflit de dédup concurrent (clé dupliquée) : on ignore.
        }
      }
      perSource.push({ id: source.id, found: items.length, new: sourceNew, ok: items.length > 0 })
    }

    return NextResponse.json({
      ok: true,
      sources: sources.length,
      itemsSeen: seen,
      itemsInserted: inserted,
      detail: perSource,
    })
  } catch (error) {
    console.error('Feed refresh error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

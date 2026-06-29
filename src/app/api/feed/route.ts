import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { FeedItem } from '@/models/FeedItem'
import { verifyAuth } from '@/lib/auth'

// GET /api/feed
// Public : uniquement les items approuvés (status: approved).
// Admin (Bearer token) : tous les items, pour la modération. Le paramètre
// ?status= permet à l'admin de filtrer (pending | approved | hidden).
//
// Filtres communs : ?type=presse|rando|evenement|autre, ?locale=fr|en|es,
// ?limit=. Les actus du coin sont surtout francophones : par défaut on ne
// filtre PAS par locale (un item FR reste pertinent sur /en et /es).
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { authenticated, user } = await verifyAuth(request)
    const isAdmin = authenticated && user?.role === 'admin'

    const sp = request.nextUrl.searchParams
    const filter: Record<string, unknown> = {}

    if (isAdmin) {
      const status = sp.get('status')
      if (status && ['pending', 'approved', 'hidden'].includes(status)) {
        filter.status = status
      }
    } else {
      // Le public ne voit que ce qui a été validé.
      filter.status = 'approved'
    }

    const type = sp.get('type')
    if (type && ['presse', 'rando', 'evenement', 'autre'].includes(type)) {
      filter.sourceType = type
    }
    const locale = sp.get('locale')
    if (locale) filter.locale = locale

    const limit = Math.min(Number(sp.get('limit')) || 60, 200)

    const items = await FeedItem.find(filter)
      // Épinglés d'abord, puis par date de publication décroissante.
      .sort({ pinned: -1, publishedAt: -1, createdAt: -1 })
      .limit(limit)
      .lean()

    const headers = isAdmin
      ? { 'Cache-Control': 'no-store' }
      : { 'Cache-Control': 'public, max-age=300, s-maxage=600, stale-while-revalidate=1800' }

    return NextResponse.json(items, { headers })
  } catch (error) {
    console.error('Feed list error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

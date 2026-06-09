import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import SiteContent from '@/models/SiteContent'
import { verifyAuth } from '@/lib/auth'

type Params = Promise<{ pageId: string }>

const LOCALES = ['fr', 'en', 'es'] as const
type Locale = (typeof LOCALES)[number]

function resolveLocale(value: string | null): Locale {
  return LOCALES.includes(value as Locale) ? (value as Locale) : 'fr'
}

const CACHE_HEADERS = {
  'Cache-Control': 'public, max-age=30, s-maxage=60, stale-while-revalidate=300',
}

// GET page content (public) — ?locale=fr|en|es (défaut fr)
export async function GET(request: NextRequest, { params }: { params: Params }) {
  try {
    const { pageId } = await params
    const locale = resolveLocale(request.nextUrl.searchParams.get('locale'))
    await connectDB()

    const page = await SiteContent.findOne({ pageId, locale }).lean()
    if (!page) {
      return NextResponse.json(
        { pageId, locale, content: {} },
        { headers: CACHE_HEADERS }
      )
    }

    return NextResponse.json(page, { headers: CACHE_HEADERS })
  } catch (error) {
    console.error('Content fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT update page content (admin only) — locale via ?locale= ou body.locale
export async function PUT(request: NextRequest, { params }: { params: Params }) {
  try {
    const { authenticated, user } = await verifyAuth(request)
    if (!authenticated || user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { pageId } = await params
    await connectDB()

    const body = await request.json()
    const locale = resolveLocale(
      request.nextUrl.searchParams.get('locale') ?? body?.locale ?? null
    )
    const { content } = body

    const page = await SiteContent.findOneAndUpdate(
      { pageId, locale },
      { pageId, locale, content },
      { upsert: true, new: true }
    )

    return NextResponse.json(page)
  } catch (error) {
    console.error('Content update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

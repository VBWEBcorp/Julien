import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { BlogPost } from '@/models/Blog'
import { verifyAuth } from '@/lib/auth'
import { visiblePostFilter } from '@/lib/blog-filters'

// GET all posts (admin: all visible + own drafts; public: visible only)
// "Visible" = published AND publishedAt <= now (articles with future publishedAt
// are hidden everywhere, including from the admin UI, so they cannot be seen
// or edited via this CMS — only via direct DB access.
export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { authenticated, user } = await verifyAuth(request)
    const isAdmin = authenticated && user?.role === 'admin'
    const filter: Record<string, unknown> = isAdmin
      ? { $or: [visiblePostFilter(), { published: false }] }
      : visiblePostFilter()

    // Public callers can scope the list to a single locale via ?locale=.
    // When absent (e.g. the admin UI), all locales are returned.
    const locale = request.nextUrl.searchParams.get('locale')
    if (locale) filter.locale = locale

    const posts = await BlogPost.find(filter)
      .sort({ publishedAt: -1, createdAt: -1 })
      .lean()

    const headers = authenticated
      ? { 'Cache-Control': 'no-store' }
      : { 'Cache-Control': 'public, max-age=60, s-maxage=120, stale-while-revalidate=600' }

    return NextResponse.json(posts, { headers })
  } catch (error) {
    console.error('Blog posts error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST create post (admin only)
export async function POST(request: NextRequest) {
  try {
    const { authenticated, user } = await verifyAuth(request)
    if (!authenticated || user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const body = await request.json()

    if (!body.title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    // Generate slug from title
    if (!body.slug) {
      body.slug = body.title
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    }

    // Check slug uniqueness
    const existing = await BlogPost.findOne({ slug: body.slug })
    if (existing) {
      body.slug = `${body.slug}-${Date.now()}`
    }

    if (body.published && !body.publishedAt) {
      body.publishedAt = new Date()
    }

    // Each post belongs to a single locale (defaults to FR for legacy data).
    body.locale = ['fr', 'en', 'es'].includes(body.locale) ? body.locale : 'fr'

    const post = await BlogPost.create(body)
    return NextResponse.json(post, { status: 201 })
  } catch (error) {
    console.error('Blog post creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

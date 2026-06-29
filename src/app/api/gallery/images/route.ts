import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { GalleryImage } from '@/models/Gallery'
import { verifyAuth } from '@/lib/auth'

// GET all gallery images (public - only active)
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const filter: Record<string, unknown> = { active: true }
    // Optional ?locale= scopes the result to a single locale.
    const locale = request.nextUrl.searchParams.get('locale')
    if (locale) filter.locale = locale
    // Optional ?category= scopes the result to a single category (ex. « vallee »).
    const category = request.nextUrl.searchParams.get('category')
    if (category) filter.category = category
    const images = await GalleryImage.find(filter)
      .sort({ order: 1 })
      .lean()
    return NextResponse.json(images, {
      headers: {
        'Cache-Control': 'public, max-age=60, s-maxage=120, stale-while-revalidate=600',
      },
    })
  } catch (error) {
    console.error('Gallery images error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST create gallery image (admin only)
export async function POST(request: NextRequest) {
  try {
    const { authenticated, user } = await verifyAuth(request)
    if (!authenticated || user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const { title, description, imageUrl, category, order, locale } = await request.json()

    if (!title || !imageUrl) {
      return NextResponse.json(
        { error: 'Title and imageUrl are required' },
        { status: 400 }
      )
    }

    const image = await GalleryImage.create({
      title,
      description,
      imageUrl,
      category: category || 'general',
      order: order || 0,
      locale: ['fr', 'en', 'es'].includes(locale) ? locale : 'fr',
    })

    return NextResponse.json(image, { status: 201 })
  } catch (error) {
    console.error('Gallery image creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { FeedItem } from '@/models/FeedItem'
import { verifyAuth } from '@/lib/auth'

type Params = Promise<{ id: string }>

// Champs qu'un admin peut modifier depuis la modération.
const EDITABLE = ['status', 'pinned', 'sourceType', 'title', 'excerpt'] as const

// PATCH /api/feed/[id] — modération (admin only).
// Body : { status?, pinned?, sourceType?, title?, excerpt? }
export async function PATCH(request: NextRequest, { params }: { params: Params }) {
  try {
    const { authenticated, user } = await verifyAuth(request)
    if (!authenticated || user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    await connectDB()

    const body = await request.json()
    const update: Record<string, unknown> = {}
    for (const key of EDITABLE) {
      if (key in body) update[key] = body[key]
    }

    if ('status' in update && !['pending', 'approved', 'hidden'].includes(update.status as string)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const item = await FeedItem.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    })
    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    return NextResponse.json(item)
  } catch (error) {
    console.error('Feed item update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/feed/[id] — supprime définitivement (admin only).
export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  try {
    const { authenticated, user } = await verifyAuth(request)
    if (!authenticated || user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    await connectDB()

    const item = await FeedItem.findByIdAndDelete(id)
    if (!item) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Item deleted' })
  } catch (error) {
    console.error('Feed item delete error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

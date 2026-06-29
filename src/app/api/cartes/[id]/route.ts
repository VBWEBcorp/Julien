import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Carte from '@/models/Menu'
import { verifyAuth } from '@/lib/auth'
import { normalizeCarteCategory } from '@/lib/carte-categories'
import { Types } from 'mongoose'

type Params = Promise<{ id: string }>

// PUT — mettre à jour une carte (admin only)
export async function PUT(request: NextRequest, { params }: { params: Params }) {
  try {
    const { authenticated, user } = await verifyAuth(request)
    if (!authenticated || user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    await connectDB()

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    const { title, description, fileUrl, fileType, category, order, active } = await request.json()

    const carte = await Carte.findByIdAndUpdate(
      id,
      { title, description, fileUrl, fileType, category: normalizeCarteCategory(category), order, active },
      { new: true, runValidators: true }
    )

    if (!carte) {
      return NextResponse.json({ error: 'Carte not found' }, { status: 404 })
    }

    return NextResponse.json(carte)
  } catch (error) {
    console.error('Carte update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE — supprimer une carte (admin only)
export async function DELETE(request: NextRequest, { params }: { params: Params }) {
  try {
    const { authenticated, user } = await verifyAuth(request)
    if (!authenticated || user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params
    await connectDB()

    if (!Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    const carte = await Carte.findByIdAndDelete(id)

    if (!carte) {
      return NextResponse.json({ error: 'Carte not found' }, { status: 404 })
    }

    return NextResponse.json({ message: 'Carte deleted' })
  } catch (error) {
    console.error('Carte delete error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

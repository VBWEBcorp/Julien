import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import Carte from '@/models/Menu'
import { verifyAuth } from '@/lib/auth'
import { normalizeCarteCategory } from '@/lib/carte-categories'

// GET — liste des cartes. Public : seulement les cartes actives avec un fichier.
// Admin (?all=1) : toutes les cartes, même vides/masquées, pour la gestion.
export async function GET(request: NextRequest) {
  try {
    await connectDB()
    const all = request.nextUrl.searchParams.get('all') === '1'
    const filter = all ? {} : { active: true, fileUrl: { $ne: '' } }
    const cartes = await Carte.find(filter).sort({ order: 1, createdAt: 1 }).lean()
    return NextResponse.json(cartes, {
      headers: {
        'Cache-Control': 'public, max-age=60, s-maxage=120, stale-while-revalidate=600',
      },
    })
  } catch (error) {
    console.error('Cartes fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST — créer une carte (admin only)
export async function POST(request: NextRequest) {
  try {
    const { authenticated, user } = await verifyAuth(request)
    if (!authenticated || user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const { title, description, fileUrl, fileType, category, order } = await request.json()

    if (!title) {
      return NextResponse.json({ error: 'Le titre est requis' }, { status: 400 })
    }

    const carte = await Carte.create({
      title,
      description: description || '',
      fileUrl: fileUrl || '',
      fileType: fileType === 'pdf' ? 'pdf' : 'image',
      category: normalizeCarteCategory(category),
      order: order ?? 0,
    })

    return NextResponse.json(carte, { status: 201 })
  } catch (error) {
    console.error('Carte creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

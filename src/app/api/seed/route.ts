import { NextRequest, NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { GalleryImage, GallerySettings } from '@/models/Gallery'
import { BlogPost, BlogSettings } from '@/models/Blog'
import { verifyAuth } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { authenticated, user } = await verifyAuth(request)
    if (!authenticated || user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await connectDB()
    const results: string[] = []

    // ─── Gallery: 4 example photos ───
    const existingImages = await GalleryImage.countDocuments()
    if (existingImages === 0) {
      const galleryImages = [
        {
          title: "Façade de l'auberge",
          description: "Le Permayou, au cœur d'Accous dans la vallée d'Aspe.",
          imageUrl: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80',
          category: 'auberge',
          order: 1,
          active: true,
        },
        {
          title: 'Une chambre chaleureuse',
          description: 'Confort montagnard et vue sur les sommets.',
          imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80',
          category: 'chambres',
          order: 2,
          active: true,
        },
        {
          title: 'La table du Permayou',
          description: 'Cuisine de tradition et produits du terroir aspois.',
          imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
          category: 'restaurant',
          order: 3,
          active: true,
        },
        {
          title: "Les sommets de la vallée d'Aspe",
          description: 'Les Pyrénées béarnaises depuis l\'auberge.',
          imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
          category: 'vallee',
          order: 4,
          active: true,
        },
      ]

      await GalleryImage.insertMany(galleryImages)
      results.push('4 images galerie créées')

      // Update gallery settings
      let gallerySettings = await GallerySettings.findOne()
      if (!gallerySettings) {
        await GallerySettings.create({
          enabled: true,
          title: "L'auberge en images",
          description: "Le lieu, les chambres, la table et les paysages de la vallée d'Aspe.",
          eyebrow: 'Galerie',
        })
      } else {
        gallerySettings.enabled = true
        await gallerySettings.save()
      }
      results.push('Galerie activée')
    } else {
      results.push('Galerie déjà peuplée, ignorée')
    }

    // ─── Blog: 2 example articles + categories ───
    const existingPosts = await BlogPost.countDocuments()
    if (existingPosts === 0) {
      const blogPosts = [
        {
          title: '5 randonnées au départ du Permayou',
          slug: '5-randonnees-depart-permayou',
          excerpt: "Du sentier familial à la grande boucle d'altitude, voici nos cinq randonnées préférées à faire directement depuis l'auberge.",
          content: `<p>L'un des grands atouts du Permayou, c'est de pouvoir partir marcher dès la sortie de l'auberge.</p><h2>Le tour d'Accous (facile)</h2><p>Une boucle douce autour du village, idéale en fin de journée ou pour les familles, avec un beau point de vue sur les sommets.</p><h2>Le plateau de Lhers</h2><p>Un grand plateau d'altitude réputé pour sa tranquillité et sa faune. Avec un peu de chance, vous apercevrez des isards.</p><h2>Vers le Cirque d'Iseye</h2><p>Notre coup de cœur : une montée progressive jusqu'à l'amphithéâtre de montagnes du Cirque d'Iseye.</p><p>Au retour, la terrasse et un bon repas vous attendent. Bonne marche !</p>`,
          coverImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
          category: 'Randonnées & itinéraires',
          tags: ['randonnée', 'GR10', "vallée d'Aspe", 'montagne'],
          author: 'Coline & Julien',
          published: true,
          publishedAt: new Date('2026-04-10'),
          metaTitle: "5 randonnées au départ de l'auberge Le Permayou (vallée d'Aspe)",
          metaDescription: "Nos 5 randonnées préférées au départ du Permayou à Accous, du tour du village au Cirque d'Iseye.",
        },
        {
          title: 'Notre cuisine de saison : les produits de la vallée d\'Aspe',
          slug: 'cuisine-saison-vallee-aspe',
          excerpt: "Garbure, fromages d'estive, viandes du pays… Au Permayou, on cuisine la vallée.",
          content: `<p>Manger au Permayou, c'est goûter la vallée d'Aspe. Nous travaillons autant que possible avec les producteurs du coin, au rythme des saisons.</p><h2>La garbure, notre incontournable</h2><p>Cette soupe béarnaise complète réchauffe les marcheurs comme les habitués.</p><h2>Les produits du terroir</h2><p>Fromages de brebis d'estive, charcuteries du pays, miel de montagne, légumes de saison. En saison, la palombe et les viandes locales s'invitent à la carte.</p><p>La table du Permayou est ouverte midi et soir, dans une ambiance simple et conviviale.</p>`,
          coverImage: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
          category: 'La table',
          tags: ['cuisine', 'produits locaux', 'garbure', 'terroir'],
          author: 'Coline & Julien',
          published: true,
          publishedAt: new Date('2026-05-18'),
          metaTitle: "Cuisine de saison au Permayou — produits de la vallée d'Aspe",
          metaDescription: "Garbure, fromages d'estive, viandes du pays : la cuisine de saison du Permayou, à base de produits locaux de la vallée d'Aspe.",
        },
      ]

      await BlogPost.insertMany(blogPosts)
      results.push('2 articles blog créés')

      // Update blog settings with categories
      let blogSettings = await BlogSettings.findOne()
      if (!blogSettings) {
        await BlogSettings.create({
          enabled: true,
          title: 'Le Journal du Permayou',
          description: "Actualités de l'auberge, idées de randonnées et vie de la vallée d'Aspe.",
          eyebrow: 'Le Journal',
          categories: ["Vie de l'auberge", 'Randonnées & itinéraires', 'Vélo & cyclo', 'La table', "Vallée d'Aspe & événements", 'Bons plans / saison'],
        })
      } else {
        blogSettings.enabled = true
        if (!blogSettings.categories || blogSettings.categories.length === 0) {
          blogSettings.categories = ["Vie de l'auberge", 'Randonnées & itinéraires', 'Vélo & cyclo', 'La table', "Vallée d'Aspe & événements", 'Bons plans / saison']
        }
        await blogSettings.save()
      }
      results.push('Blog activé avec catégories')
    } else {
      results.push('Blog déjà peuplé, ignoré')
    }

    return NextResponse.json({ success: true, results })
  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

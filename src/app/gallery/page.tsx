import type { Metadata } from 'next'

import { connectDB } from '@/lib/db'
import { GallerySettings, GalleryImage } from '@/models/Gallery'
import { siteConfig } from '@/lib/seo'
import { images as siteImages } from '@/lib/site-content'
import GalleryContent from './gallery-content'

export const revalidate = 3600

const defaultSettings = {
  enabled: true,
  title: "L'auberge en images",
  description: "Le lieu, les chambres, la table et les paysages de la vallée d'Aspe.",
  eyebrow: 'Galerie',
}

// Fallback « comme l'accueil » : si la base ne renvoie aucune image, on affiche
// le pool de visuels placeholder (montagne / auberge / table) au lieu d'un vide.
const FALLBACK_IMAGES = [
  { _id: 'fb-1', title: "Façade de l'auberge", imageUrl: siteImages.services[6], category: 'auberge' },
  { _id: 'fb-2', title: "Les sommets de la vallée d'Aspe", imageUrl: siteImages.services[7], category: 'vallee' },
  { _id: 'fb-3', title: 'Une chambre chaleureuse', imageUrl: siteImages.services[0], category: 'chambres' },
  { _id: 'fb-4', title: 'La table du Permayou', imageUrl: siteImages.services[1], category: 'restaurant' },
  { _id: 'fb-5', title: 'La salle & la terrasse', imageUrl: siteImages.services[5], category: 'terrasse-vue' },
  { _id: 'fb-6', title: "Le bar de l'auberge", imageUrl: siteImages.services[2], category: 'restaurant' },
  { _id: 'fb-7', title: 'Sur les sentiers', imageUrl: siteImages.services[4], category: 'vallee' },
  { _id: 'fb-8', title: 'La vallée verdoyante', imageUrl: siteImages.services[3], category: 'vallee' },
]

export async function generateMetadata(): Promise<Metadata> {
  try {
    await connectDB()
    const settings = (await GallerySettings.findOne().lean()) as any

    const title = settings?.title || defaultSettings.title
    const description = settings?.description || defaultSettings.description

    return {
      title,
      description,
      openGraph: {
        type: 'website',
        title,
        description,
        url: `${siteConfig.url}/gallery`,
        siteName: siteConfig.name,
        locale: siteConfig.locale,
        images: settings?.heroImage ? [{ url: settings.heroImage }] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: settings?.heroImage ? [settings.heroImage] : [],
      },
      alternates: {
        canonical: '/gallery',
      },
    }
  } catch {
    return { title: defaultSettings.title }
  }
}

export default async function GalleryPage() {
  let settings: any = defaultSettings
  let images: any[] = []

  try {
    await connectDB()
    const [settingsDoc, imagesDocs] = await Promise.all([
      GallerySettings.findOne().lean(),
      GalleryImage.find({ active: true })
        .sort({ order: 1 })
        .select('title description imageUrl category')
        .limit(60)
        .lean(),
    ])

    if (settingsDoc) {
      // Sérialisation : ne passer que des champs simples au Client Component
      // (le doc Mongoose porte _id/ObjectId + dates non sérialisables).
      const s = settingsDoc as any
      settings = {
        enabled: s.enabled ?? defaultSettings.enabled,
        title: s.title ?? defaultSettings.title,
        description: s.description ?? defaultSettings.description,
        eyebrow: s.eyebrow ?? defaultSettings.eyebrow,
        ...(s.heroImage ? { heroImage: s.heroImage } : {}),
      }
    }
    images = (imagesDocs as any[]).map((img) => ({
      _id: String(img._id),
      title: img.title ?? '',
      ...(img.description ? { description: img.description } : {}),
      imageUrl: img.imageUrl ?? '',
      ...(img.category ? { category: img.category } : {}),
    }))
  } catch {
    // Fallback gracieux
  }

  // Si la base est vide (ou injoignable), on retombe sur le pool de visuels — la
  // galerie n'est jamais vide, comme la home.
  if (images.length === 0) images = FALLBACK_IMAGES

  return <GalleryContent initialSettings={settings as any} initialImages={images as any} />
}

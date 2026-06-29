import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { connectDB } from '@/lib/db'
import { FeedItem } from '@/models/FeedItem'
import { BlogPost } from '@/models/Blog'
import { visiblePostFilter } from '@/lib/blog-filters'
import { alternatesFor, ogLocale, siteConfig } from '@/lib/seo'
import LocalNewsContent, { type NewsCard } from './local-news-content'

export const revalidate = 1800

const META = {
  title: 'Actualités du coin',
  description:
    "Les actus de la vallée d'Aspe et du Haut-Béarn : presse locale, randonnées et événements, en plus de nos propres articles.",
  eyebrow: 'À ne pas manquer',
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)

  return {
    title: META.title,
    description: META.description,
    openGraph: {
      type: 'website',
      title: META.title,
      description: META.description,
      url: alternatesFor('/actualites-du-coin', locale).canonical,
      siteName: siteConfig.name,
      locale: ogLocale(locale),
    },
    twitter: { card: 'summary_large_image', title: META.title, description: META.description },
    alternates: alternatesFor('/actualites-du-coin', locale),
  }
}

export default async function LocalNewsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  let cards: NewsCard[] = []

  try {
    await connectDB()

    const [feedDocs, postDocs] = await Promise.all([
      // Actus externes validées (toutes langues : une actu locale FR reste
      // pertinente sur /en et /es).
      FeedItem.find({ status: 'approved' })
        .sort({ pinned: -1, publishedAt: -1, createdAt: -1 })
        .select('title excerpt image externalUrl sourceName sourceType publishedAt pinned')
        .limit(60)
        .lean(),
      // Nos propres articles publiés dans la langue courante.
      BlogPost.find({ ...visiblePostFilter(), locale })
        .sort({ publishedAt: -1, createdAt: -1 })
        .select('title slug excerpt coverImage publishedAt')
        .limit(30)
        .lean(),
    ])

    const external: NewsCard[] = (feedDocs as any[]).map((f) => ({
      id: String(f._id),
      kind: 'external',
      title: f.title ?? '',
      excerpt: f.excerpt ?? '',
      image: f.image ?? '',
      href: f.externalUrl ?? '#',
      sourceName: f.sourceName ?? '',
      category: f.sourceType ?? 'autre',
      pinned: !!f.pinned,
      publishedAt: f.publishedAt ? new Date(f.publishedAt).toISOString() : null,
    }))

    const internal: NewsCard[] = (postDocs as any[]).map((p) => ({
      id: String(p._id),
      kind: 'internal',
      title: p.title ?? '',
      excerpt: p.excerpt ?? '',
      image: p.coverImage ?? '',
      href: `/blog/${p.slug}`,
      sourceName: siteConfig.name,
      category: 'article',
      pinned: false,
      publishedAt: p.publishedAt ? new Date(p.publishedAt).toISOString() : null,
    }))

    cards = [...external, ...internal].sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1
      const da = a.publishedAt ? Date.parse(a.publishedAt) : 0
      const db = b.publishedAt ? Date.parse(b.publishedAt) : 0
      return db - da
    })
  } catch {
    // Fallback gracieux : page rendue avec une liste vide.
  }

  return (
    <LocalNewsContent
      eyebrow={META.eyebrow}
      title={META.title}
      description={META.description}
      cards={cards}
    />
  )
}

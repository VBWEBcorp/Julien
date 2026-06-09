import type { MetadataRoute } from 'next'

import { siteConfig, localizedUrl } from '@/lib/seo'
import { connectDB } from '@/lib/db'
import { BlogPost, BlogSettings } from '@/models/Blog'
import { visiblePostFilter } from '@/lib/blog-filters'
import { GallerySettings } from '@/models/Gallery'

// Construit une entrée sitemap multilingue pour un chemin « FR » : l'URL FR +
// les alternances hreflang vers EN/ES (+ x-default → FR).
function entry(
  path: string,
  opts: { lastModified?: Date; changeFrequency?: MetadataRoute.Sitemap[number]['changeFrequency']; priority?: number } = {}
): MetadataRoute.Sitemap[number] {
  return {
    url: localizedUrl(path, 'fr'),
    lastModified: opts.lastModified ?? new Date(),
    changeFrequency: opts.changeFrequency ?? 'monthly',
    priority: opts.priority ?? 0.8,
    alternates: {
      languages: {
        fr: localizedUrl(path, 'fr'),
        en: localizedUrl(path, 'en'),
        es: localizedUrl(path, 'es'),
        'x-default': localizedUrl(path, 'fr'),
      },
    },
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages: MetadataRoute.Sitemap = [
    entry('/', { changeFrequency: 'weekly', priority: 1 }),
    entry('/a-propos', { priority: 0.8 }),
    entry('/services', { priority: 0.9 }),
    entry('/restaurant', { priority: 0.9 }),
    entry('/bar-terrasse', { priority: 0.8 }),
    entry('/vallee-d-aspe', { priority: 0.8 }),
    entry('/reserver', { priority: 0.9 }),
    entry('/contact', { priority: 0.7 }),
  ]

  try {
    await connectDB()

    // Gallery page if enabled
    const gallerySettings = await GallerySettings.findOne()
    if (gallerySettings?.enabled) {
      pages.push(entry('/gallery', { changeFrequency: 'weekly', priority: 0.7 }))
    }

    // Blog pages if enabled
    const blogSettings = await BlogSettings.findOne()
    if (blogSettings?.enabled) {
      pages.push(entry('/blog', { changeFrequency: 'weekly', priority: 0.8 }))

      // Individual blog posts
      const posts = await BlogPost.find(visiblePostFilter()).select('slug updatedAt publishedAt')
      for (const post of posts) {
        pages.push(
          entry(`/blog/${post.slug}`, {
            lastModified: new Date(post.updatedAt || post.publishedAt),
            changeFrequency: 'weekly',
            priority: 0.7,
          })
        )
      }
    }
  } catch (error) {
    console.error('Sitemap generation error:', error)
  }

  return pages
}

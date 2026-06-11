import type { Metadata } from 'next'

import { connectDB } from '@/lib/db'
import SiteContent from '@/models/SiteContent'
import { alternatesFor, ogLocale, siteConfig } from '@/lib/seo'

// SEO éditable depuis le back-office (/admin/pages). Stocké dans
// SiteContent.content.seo, par couple (pageId, locale). Module SERVEUR
// uniquement (accès Mongoose) : à n'importer que depuis generateMetadata.

export type PageSeo = {
  title?: string
  description?: string
  ogImage?: string
}

function cleanString(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : undefined
}

// Lit les meta SEO saisies dans le CMS pour une page + langue. Best-effort :
// toute erreur DB renvoie {} → les valeurs statiques (traductions) prennent le relais.
export async function getPageSeo(pageId: string, locale: string): Promise<PageSeo> {
  try {
    await connectDB()
    const doc = (await SiteContent.findOne({ pageId, locale }).lean()) as
      | { content?: { seo?: Record<string, unknown> } }
      | null
    const seo = doc?.content?.seo
    if (seo && typeof seo === 'object') {
      return {
        title: cleanString(seo.title),
        description: cleanString(seo.description),
        ogImage: cleanString(seo.ogImage),
      }
    }
  } catch {
    // Connexion DB indisponible (ex. build sans Mongo) : fallback statique.
  }
  return {}
}

type BuildArgs = {
  /** Identifiant CMS de la page (= pageId du PageEditor admin). */
  pageId: string
  /** Chemin « FR » de la page (ex. '/restaurant'), pour canonical + hreflang. */
  path: string
  locale: string
  /** Titre par défaut (issu des traductions) si rien n'est saisi dans le CMS. */
  title: string
  /** Description par défaut (issue des traductions) si rien dans le CMS. */
  description: string
  /**
   * Titre absolu (sans le suffixe « | Auberge Le Permayou »). À utiliser pour
   * l'accueil, dont le titre porte déjà la marque.
   */
  absoluteTitle?: boolean
}

// Construit l'objet Metadata d'une page : meta CMS prioritaires, sinon défauts
// traduits. Centralise canonical/hreflang, Open Graph et Twitter pour rester
// cohérent sur toutes les pages.
export async function buildPageMetadata({
  pageId,
  path,
  locale,
  title,
  description,
  absoluteTitle,
}: BuildArgs): Promise<Metadata> {
  const seo = await getPageSeo(pageId, locale)
  const finalTitle = seo.title ?? title
  const finalDescription = seo.description ?? description
  const finalImage = seo.ogImage || siteConfig.ogImage
  const alternates = alternatesFor(path, locale)

  return {
    title: absoluteTitle ? { absolute: finalTitle } : finalTitle,
    description: finalDescription,
    alternates,
    openGraph: {
      type: 'website',
      locale: ogLocale(locale),
      title: finalTitle,
      description: finalDescription,
      url: alternates.canonical,
      siteName: siteConfig.name,
      images: [{ url: finalImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDescription,
      images: [finalImage],
    },
  }
}

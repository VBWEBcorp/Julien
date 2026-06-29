// Agrégation des « actualités du coin ».
//
// Ce module définit les SOURCES externes (flux RSS) et un mini-parseur RSS sans
// dépendance : on récupère le XML, on en extrait les <item>, et on les normalise
// en objets exploitables (titre, extrait, image, lien, date, source).
//
// Pour le MVP on s'appuie sur Google Actualités (Google News RSS), très fiable
// et sans clé d'API : on interroge par mots-clés ciblés sur la vallée d'Aspe et
// le Haut-Béarn. Les flux RSS directs des éditeurs (La République des Pyrénées,
// Sud Ouest, France Bleu Béarn…) peuvent être ajoutés ci-dessous une fois leurs
// URLs vérifiées — ils donnent des liens directs (sans redirection Google).

import type { FeedSourceType } from '@/models/FeedItem'

export interface FeedSource {
  id: string
  // Nom affiché si l'item ne porte pas sa propre source (cas des flux éditeur).
  name: string
  type: FeedSourceType
  url: string
  enabled: boolean
}

// Construit l'URL d'un flux Google Actualités pour une recherche par mot-clé,
// en français / France.
function googleNews(query: string): string {
  const q = encodeURIComponent(query)
  return `https://news.google.com/rss/search?q=${q}&hl=fr&gl=FR&ceid=FR:fr`
}

// Sources actives par défaut. Ajustez les requêtes / ajoutez des flux éditeur ici.
export const FEED_SOURCES: FeedSource[] = [
  {
    id: 'gnews-vallee-aspe',
    name: 'Google Actualités',
    type: 'presse',
    url: googleNews('"Vallée d\'Aspe"'),
    enabled: true,
  },
  {
    id: 'gnews-haut-bearn',
    name: 'Google Actualités',
    type: 'presse',
    url: googleNews('"Haut-Béarn" OR "Oloron-Sainte-Marie"'),
    enabled: true,
  },
  {
    id: 'gnews-rando-aspe',
    name: 'Google Actualités',
    type: 'rando',
    url: googleNews('"Vallée d\'Aspe" (randonnée OR sentier OR montagne OR Pyrénées)'),
    enabled: true,
  },
  {
    id: 'gnews-agenda-bearn',
    name: 'Google Actualités',
    type: 'evenement',
    url: googleNews('"Pyrénées béarnaises" OR "Vallée d\'Aspe" (festival OR événement OR marché OR fête)'),
    enabled: true,
  },
  // Exemple de flux éditeur direct (désactivé tant que l'URL n'est pas vérifiée) :
  // {
  //   id: 'larep-bearn',
  //   name: 'La République des Pyrénées',
  //   type: 'presse',
  //   url: 'https://www.larepubliquedespyrenees.fr/rss.xml',
  //   enabled: false,
  // },
]

export interface ParsedItem {
  title: string
  excerpt: string
  image: string
  externalUrl: string
  sourceName: string
  publishedAt: Date | null
}

// --- Mini-parseur RSS -------------------------------------------------------

function decodeEntities(input: string): string {
  return input
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .trim()
}

function stripHtml(input: string): string {
  return decodeEntities(input.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ')).trim()
}

function tag(block: string, name: string): string {
  // Capture <name ...>...</name> (1er match), insensible à la casse.
  const re = new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i')
  const m = block.match(re)
  return m ? decodeEntities(m[1]) : ''
}

function attr(block: string, name: string, attrName: string): string {
  const re = new RegExp(`<${name}[^>]*\\b${attrName}=["']([^"']+)["'][^>]*>`, 'i')
  const m = block.match(re)
  return m ? m[1] : ''
}

function firstImage(block: string, descriptionHtml: string): string {
  return (
    attr(block, 'media:content', 'url') ||
    attr(block, 'media:thumbnail', 'url') ||
    attr(block, 'enclosure', 'url') ||
    (descriptionHtml.match(/<img[^>]*\bsrc=["']([^"']+)["']/i)?.[1] ?? '')
  )
}

// Parse un flux RSS/Atom et renvoie les items normalisés.
export function parseFeed(xml: string, fallbackSource: string): ParsedItem[] {
  // RSS classique : <item>. Atom : <entry>. On gère les deux.
  const blocks = [
    ...xml.matchAll(/<item[\s>][\s\S]*?<\/item>/gi),
    ...xml.matchAll(/<entry[\s>][\s\S]*?<\/entry>/gi),
  ].map((m) => m[0])

  const items: ParsedItem[] = []

  for (const block of blocks) {
    const title = stripHtml(tag(block, 'title'))
    if (!title) continue

    // Lien : <link>url</link> (RSS) ou <link href="..."/> (Atom).
    let link = tag(block, 'link').trim()
    if (!link) link = attr(block, 'link', 'href')
    if (!link) continue

    const descriptionHtml = tag(block, 'description') || tag(block, 'summary') || tag(block, 'content')
    let excerpt = stripHtml(descriptionHtml)
    // Google Actualités met une liste de liens HTML en description : on la coupe.
    if (excerpt.length > 280) excerpt = excerpt.slice(0, 277).trimEnd() + '…'

    // Source : <source>Nom</source> (Google News la fournit) sinon repli.
    const sourceName = stripHtml(tag(block, 'source')) || fallbackSource

    // Google Actualités suffixe les titres par « - Éditeur » : on le retire
    // puisque la source est déjà affichée séparément.
    let cleanTitle = title
    if (sourceName && cleanTitle.toLowerCase().endsWith(`- ${sourceName}`.toLowerCase())) {
      cleanTitle = cleanTitle.slice(0, cleanTitle.length - sourceName.length - 2).trimEnd()
      // Retire un éventuel tiret final résiduel.
      cleanTitle = cleanTitle.replace(/[-–—]\s*$/, '').trimEnd()
    }

    const dateStr = tag(block, 'pubDate') || tag(block, 'published') || tag(block, 'updated')
    const parsed = dateStr ? new Date(dateStr) : null
    const publishedAt = parsed && !isNaN(parsed.getTime()) ? parsed : null

    items.push({
      title: cleanTitle,
      excerpt,
      image: firstImage(block, descriptionHtml),
      externalUrl: link,
      sourceName,
      publishedAt,
    })
  }

  return items
}

// Récupère et parse une source, avec timeout. Renvoie [] en cas d'échec (une
// source en panne ne doit pas casser tout le rafraîchissement).
export async function fetchSource(source: FeedSource, timeoutMs = 10000): Promise<ParsedItem[]> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(source.url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'PermayouBot/1.0 (+actualites)' },
      cache: 'no-store',
    })
    if (!res.ok) return []
    const xml = await res.text()
    return parseFeed(xml, source.name)
  } catch {
    return []
  } finally {
    clearTimeout(timer)
  }
}

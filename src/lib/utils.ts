import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Détache le ou les derniers mots d'un titre pour l'accent serif italique
 * (signature de la DA : « lead » en display + « accent » en serif italique).
 */
export function splitAccentTitle(title: string): { lead: string; accent: string } {
  const words = title.trim().split(/\s+/)
  if (words.length <= 2) return { lead: '', accent: title }
  const accentCount = Math.min(2, Math.max(1, Math.floor(words.length / 3)))
  return {
    lead: words.slice(0, words.length - accentCount).join(' '),
    accent: words.slice(words.length - accentCount).join(' '),
  }
}

/** Couleurs de marque (= celles des menus) pour les numéros signature en alternance. */
export const BRAND_ACCENTS = [
  'oklch(0.78 0.14 62)', // orange ambré
  'oklch(0.66 0.16 25)', // brique
  'oklch(0.68 0.16 268)', // bleu
  'oklch(0.72 0.1 150)', // vert mousse
] as const

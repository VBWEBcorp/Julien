import { unstable_cache } from 'next/cache'

import { connectDB } from '@/lib/db'
import UiMessages from '@/models/UiMessages'
import type { FlatMessages } from '@/lib/i18n-overrides'

// Tag de revalidation partagé : l'API PUT appelle revalidateTag(UI_MESSAGES_TAG)
// après une sauvegarde pour rafraîchir les pages.
export const UI_MESSAGES_TAG = 'ui-messages'

async function fetchOverrides(locale: string): Promise<FlatMessages> {
  try {
    await connectDB()
    const doc = await UiMessages.findOne({ locale }).lean<{ overrides?: FlatMessages }>()
    const overrides = doc?.overrides
    // Sérialisation défensive (objet Mixed) + jamais bloquant si la base est indisponible.
    return overrides ? (JSON.parse(JSON.stringify(overrides)) as FlatMessages) : {}
  } catch (error) {
    console.error(
      `[i18n] Lecture des overrides "${locale}" impossible, repli sur les défauts JSON :`,
      (error as Error)?.message
    )
    return {}
  }
}

/**
 * Renvoie les overrides de libellés pour une locale, en cache (revalidation 60 s ou
 * à la demande via le tag). Appelé dans getRequestConfig (src/i18n/request.ts).
 */
export function getMessageOverrides(locale: string): Promise<FlatMessages> {
  return unstable_cache(() => fetchOverrides(locale), ['ui-messages', locale], {
    tags: [UI_MESSAGES_TAG],
    revalidate: 60,
  })()
}

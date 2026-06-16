import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

import { connectDB } from '@/lib/db'
import UiMessages from '@/models/UiMessages'
import { verifyAuth } from '@/lib/auth'
import { flattenMessages, diffOverrides, type FlatMessages } from '@/lib/i18n-overrides'
import { UI_MESSAGES_TAG } from '@/lib/i18n-overrides-server'

import frMessages from '@/i18n/messages/fr.json'
import enMessages from '@/i18n/messages/en.json'
import esMessages from '@/i18n/messages/es.json'

const DEFAULTS: Record<string, unknown> = {
  fr: frMessages,
  en: enMessages,
  es: esMessages,
}

const LOCALES = ['fr', 'en', 'es'] as const
type Locale = (typeof LOCALES)[number]
type Params = Promise<{ locale: string }>

function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

// GET : libellés par défaut (JSON, aplatis) + overrides enregistrés pour la locale.
// Sert l'éditeur d'admin (les valeurs effectives = { ...defaults, ...overrides }).
export async function GET(_request: NextRequest, { params }: { params: Params }) {
  const { locale } = await params
  if (!isLocale(locale)) {
    return NextResponse.json({ error: 'Invalid locale' }, { status: 400 })
  }

  // Les défauts viennent des catalogues JSON : toujours disponibles, même si la base est KO.
  const defaults = flattenMessages(DEFAULTS[locale])

  let overrides: FlatMessages = {}
  try {
    await connectDB()
    const doc = await UiMessages.findOne({ locale }).lean<{ overrides?: FlatMessages }>()
    overrides = (doc?.overrides ?? {}) as FlatMessages
  } catch (error) {
    console.error(
      '[i18n] Overrides indisponibles (GET), renvoi des défauts seuls :',
      (error as Error)?.message
    )
  }

  return NextResponse.json({ locale, defaults, overrides })
}

// PUT (admin) : reçoit l'ensemble des valeurs courantes, ne stocke que ce qui diffère
// des défauts, puis invalide le cache des libellés pour rafraîchir le site.
export async function PUT(request: NextRequest, { params }: { params: Params }) {
  try {
    const { authenticated, user } = await verifyAuth(request)
    if (!authenticated || user?.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { locale } = await params
    if (!isLocale(locale)) {
      return NextResponse.json({ error: 'Invalid locale' }, { status: 400 })
    }

    const body = await request.json()
    const values = (body?.values ?? {}) as FlatMessages
    const defaults = flattenMessages(DEFAULTS[locale])
    const overrides = diffOverrides(values, defaults)

    await connectDB()
    await UiMessages.findOneAndUpdate(
      { locale },
      { locale, overrides },
      { upsert: true, new: true }
    )

    revalidateTag(UI_MESSAGES_TAG)

    return NextResponse.json({ locale, count: Object.keys(overrides).length })
  } catch (error) {
    console.error('UI messages update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

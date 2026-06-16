import { getRequestConfig } from 'next-intl/server'
import { hasLocale } from 'next-intl'

import { routing } from './routing'
import { applyOverrides } from '@/lib/i18n-overrides'
import { getMessageOverrides } from '@/lib/i18n-overrides-server'

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale

  // Défauts = catalogue JSON ; surchargés par les overrides éditables en admin.
  const defaults = (await import(`./messages/${locale}.json`)).default
  const overrides = await getMessageOverrides(locale)

  return {
    locale,
    messages: applyOverrides(defaults, overrides),
  }
})

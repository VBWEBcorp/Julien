import { defineRouting } from 'next-intl/routing'

// FR à la racine (jamais préfixé), EN/ES préfixés : /en/..., /es/...
export const routing = defineRouting({
  locales: ['fr', 'en', 'es'],
  defaultLocale: 'fr',
  localePrefix: 'as-needed',
})

export type Locale = (typeof routing.locales)[number]

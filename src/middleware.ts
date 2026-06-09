import createMiddleware from 'next-intl/middleware'

import { routing } from './i18n/routing'

export default createMiddleware(routing)

export const config = {
  // On exclut /api, /admin, les internals Next et tout fichier statique
  // (contient un point : favicon.svg, og.jpg, robots.txt, sitemap.xml…).
  matcher: ['/((?!api|admin|_next|_vercel|.*\\..*).*)'],
}

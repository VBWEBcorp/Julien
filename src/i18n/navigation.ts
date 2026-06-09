import { createNavigation } from 'next-intl/navigation'

import { routing } from './routing'

// Navigation locale-aware : ces wrappers préfixent automatiquement la locale
// courante (sauf FR qui reste à la racine). À utiliser PARTOUT à la place de
// `next/link` et `next/navigation` dans les pages publiques.
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)

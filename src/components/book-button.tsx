import { useTranslations } from 'next-intl'

import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * BookButton — bouton « Réserver » réutilisable (navbar, hero, fin de page,
 * fiche chambre, sticky mobile).
 *
 * Phase 1 : renvoie vers la page d'atterrissage /reserver, qui ouvre le moteur
 * Amenitiz. On garde une page intermédiaire (plutôt qu'un lien direct vers
 * Amenitiz) pour la réassurance, le tracking et le futur widget embarqué (P2).
 */
interface BookButtonProps {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg'
  className?: string
  label?: string
  /** Lien cible (par défaut la page /reserver). */
  href?: string
}

export function BookButton({
  variant = 'default',
  size = 'default',
  className,
  label,
  href = '/reserver',
}: BookButtonProps) {
  const t = useTranslations('common')
  return (
    <Button asChild variant={variant} size={size} className={cn(className)}>
      <Link href={href}>{label ?? t('book')}</Link>
    </Button>
  )
}

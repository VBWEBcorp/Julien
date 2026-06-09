import { cn } from '@/lib/utils'

type Tone = 'dark' | 'light' | 'overlay'

interface MountainBackdropProps {
  /**
   * - `dark`    : bloc immersif vert forêt plein (dégradé + halos + montagne).
   * - `light`   : signature discrète posée sur un fond clair (montagne + halos doux).
   * - `overlay` : posée par-dessus une photo (montagne + halos translucides).
   */
  tone?: Tone
  /** Affiche le filigrane « montagne » en bas. */
  mountains?: boolean
  /** Affiche les halos de couleur (orange / bleu de marque). */
  halos?: boolean
  className?: string
}

/**
 * Décor signature « montagne épurée » repris du menu plein écran :
 * dégradé vert forêt, halos orange/bleu de marque et silhouette de montagne.
 * Élément purement décoratif — toujours `aria-hidden` et non interactif.
 */
export function MountainBackdrop({
  tone = 'light',
  mountains = true,
  halos = true,
  className,
}: MountainBackdropProps) {
  const isDark = tone === 'dark'

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        tone === 'overlay' ? 'z-0' : '-z-10',
        className
      )}
    >
      {/* Fond dégradé vert forêt (uniquement en tone dark) */}
      {isDark && (
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(160deg, oklch(0.26 0.045 150) 0%, oklch(0.2 0.035 150) 55%, oklch(0.16 0.03 150) 100%)',
          }}
        />
      )}

      {/* Halos de couleur de marque (orange + bleu) */}
      {halos && (
        <div
          className="absolute inset-0"
          style={{
            background: isDark
              ? 'radial-gradient(55% 45% at 85% 12%, oklch(0.73 0.15 62 / 0.16) 0%, transparent 70%), radial-gradient(50% 50% at 8% 88%, oklch(0.52 0.17 268 / 0.16) 0%, transparent 70%)'
              : 'radial-gradient(50% 40% at 88% 10%, oklch(0.73 0.15 62 / 0.1) 0%, transparent 70%), radial-gradient(45% 45% at 6% 92%, oklch(0.52 0.17 268 / 0.08) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Filigrane montagne en bas */}
      {mountains && (
        <svg
          className={cn(
            'absolute inset-x-0 bottom-0 h-[42%] w-full',
            isDark ? 'text-white/[0.045]' : 'text-[oklch(0.34_0.08_150)]/[0.06]'
          )}
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0 320 L320 90 L520 220 L760 40 L1010 210 L1230 110 L1440 240 L1440 320 Z" />
        </svg>
      )}
    </div>
  )
}

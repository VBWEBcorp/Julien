import { cn, splitAccentTitle } from '@/lib/utils'

type SectionTitleProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'center',
  className,
}: SectionTitleProps) {
  const { lead, accent } = splitAccentTitle(title)
  const centered = align === 'center'
  return (
    <div
      className={cn(
        'mx-auto max-w-2xl space-y-5',
        centered && 'text-center',
        className
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            'inline-flex items-center gap-3 font-display text-xs font-semibold tracking-[0.22em] text-primary uppercase',
            centered && 'justify-center'
          )}
        >
          <span className="h-px w-7 bg-[oklch(0.73_0.15_62)]" aria-hidden />
          {eyebrow}
          {centered && <span className="h-px w-7 bg-[oklch(0.73_0.15_62)]" aria-hidden />}
        </p>
      ) : null}
      <h2 className="font-display text-balance text-[2rem] leading-[1.08] tracking-[-0.03em] text-foreground sm:text-4xl lg:text-[2.9rem]">
        {lead ? (
          <>
            {lead}{' '}
            <span className="font-serif italic font-normal tracking-[-0.01em] text-primary">
              {accent}
            </span>
          </>
        ) : (
          title
        )}
      </h2>
      {description ? (
        <p className="text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  )
}

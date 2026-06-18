'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'

import { MountainBackdrop } from '@/components/ui/mountain-backdrop'
import { useContent } from '@/hooks/use-content'
import { ctaContent } from '@/lib/site-content'

const ease = [0.22, 1, 0.36, 1] as const

const defaults = {
  eyebrow: ctaContent.eyebrow,
  title: ctaContent.title,
  description: ctaContent.description,
  button: ctaContent.button,
}

const col1Images = ctaContent.scrollImages.col1
const col2Images = ctaContent.scrollImages.col2

function ScrollColumn({ images, direction, speed }: { images: string[]; direction: 'up' | 'down'; speed: number }) {
  // Duplicate once for seamless loop (2 copies, translate -50%)
  const doubled = [...images, ...images]
  const from = direction === 'up' ? '0%' : '-50%'
  const to = direction === 'up' ? '-50%' : '0%'

  return (
    <div className="w-[130px] lg:w-[150px] shrink-0">
      <motion.div
        className="flex flex-col gap-3"
        animate={{ y: [from, to] }}
        transition={{
          y: {
            duration: speed,
            repeat: Infinity,
            ease: 'linear',
            repeatType: 'loop',
          },
        }}
      >
        {doubled.map((src, i) => (
          <div
            key={`${direction}-${i}`}
            className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shrink-0"
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="150px"
              loading="lazy"
              className="object-cover"
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export function CtaSection() {
  const { data } = useContent('home', { cta: defaults })
  const cta = data.cta ?? defaults

  // Teinte vert forêt du bloc — sert aussi de couleur de fondu pour les colonnes d'images.
  const fade = 'oklch(0.18 0.032 150)'

  return (
    <section className="bg-[oklch(0.975_0.008_95)] dark:bg-[oklch(0.19_0.015_150)]">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease }}
          className="relative isolate overflow-hidden rounded-[2rem] text-white shadow-[var(--shadow-lg)]"
        >
          {/* Décor signature : vert forêt + halos + montagne (repris du menu) */}
          <MountainBackdrop tone="dark" />

          <div className="relative flex items-stretch min-h-[420px] sm:min-h-[460px]">
            {/* Left - Text content */}
            <div className="relative z-10 flex-1 flex flex-col justify-center p-10 sm:p-14 space-y-6">
              <p className="font-display text-xs font-semibold tracking-[0.22em] uppercase text-[oklch(0.82_0.1_62)]">
                {cta.eyebrow}
              </p>
              <h2 className="max-w-xl font-display text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {cta.title}
              </h2>
              <p className="max-w-lg text-base leading-relaxed text-white/70 sm:text-lg">
                {cta.description}
              </p>
              <div>
                <Link
                  href="/reserver"
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-white px-8 text-[0.95rem] font-medium tracking-tight text-[oklch(0.2_0.03_150)] shadow-sm transition-all hover:bg-white/90 hover:shadow-md"
                >
                  {cta.button}
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* Right - Scrolling images, clipped to card */}
            <div className="hidden md:block relative w-[300px] lg:w-[340px] shrink-0 overflow-hidden">
              {/* Fondus vers la teinte vert forêt du bloc */}
              <div className="pointer-events-none absolute top-0 left-0 right-0 h-28 z-20" style={{ background: `linear-gradient(to bottom, ${fade}, transparent)` }} />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 z-20" style={{ background: `linear-gradient(to top, ${fade}, transparent)` }} />
              <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-24 z-20" style={{ background: `linear-gradient(to right, ${fade}, transparent)` }} />

              <div className="absolute inset-0 overflow-hidden">
                <div className="flex gap-3 -rotate-6 translate-x-[10%]" style={{ height: '140%', marginTop: '-20%' }}>
                  <ScrollColumn images={col1Images} direction="up" speed={40} />
                  <ScrollColumn images={col2Images} direction="down" speed={45} />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

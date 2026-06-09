import { Inter, Instrument_Serif, JetBrains_Mono, Plus_Jakarta_Sans } from 'next/font/google'

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
  display: 'swap',
})

// Serif italic — pour mots accentués dans les titres (style éditorial premium)
export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400'],
  style: ['normal', 'italic'],
  display: 'swap',
})

// Mono — pour eyebrows, KPIs, labels techniques (style Linear/Vercel)
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '600'],
  display: 'swap',
})

// Classe à poser sur <html> pour exposer toutes les variables de police.
export const fontVariables = `${inter.variable} ${jakarta.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`

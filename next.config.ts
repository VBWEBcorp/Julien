import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  // Mongoose doit rester un require natif côté serveur : si webpack le bundle,
  // ses imports internes du driver mongodb cassent (erreur _hasEncryptedFields,
  // connexion jamais établie).
  serverExternalPackages: ['mongoose'],
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '*.r2.dev',
      },
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
}

export default withNextIntl(nextConfig)

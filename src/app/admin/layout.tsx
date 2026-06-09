import { AdminShell } from '@/components/admin/admin-shell'
import { ThemeScript } from '@/components/theme/theme-script'
import { fontVariables } from '@/lib/fonts'

import '../../index.css'

// Coquille HTML propre au back-office (toujours en français). Le site public a
// sa propre coquille dans src/app/[locale]/layout.tsx avec une lang dynamique.
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" dir="ltr" className={fontVariables} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-dvh flex-col">
        <AdminShell>{children}</AdminShell>
      </body>
    </html>
  )
}

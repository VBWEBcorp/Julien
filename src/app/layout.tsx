// Layout racine pass-through. Les coquilles <html>/<body> sont fournies par
// les segments enfants : src/app/[locale]/layout.tsx (site public, lang dynamique)
// et src/app/admin/layout.tsx (back-office, lang="fr"). Next.js 15 autorise ce
// pattern dès lors qu'exactement un <html> est rendu par route.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

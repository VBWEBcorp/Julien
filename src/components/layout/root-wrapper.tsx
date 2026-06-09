import { CookieConsent } from '@/components/layout/cookie-consent'
import { Footer } from '@/components/layout/footer'
import { MarketingBanner } from '@/components/marketing-banner'
import { MarketingPopup } from '@/components/marketing-popup'
import { Navbar } from '@/components/layout/navbar'
import { ScrollToTop } from '@/components/scroll-to-top'

// Chrome du site public (header + footer). L'espace /admin a sa propre coquille
// (src/app/admin/layout.tsx) et n'utilise pas ce wrapper.
export function RootWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MarketingBanner />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
      <MarketingPopup />
      <CookieConsent />
    </>
  )
}

'use client'

import { PageEditor } from '@/components/admin/page-editor'
import { FieldEditor, SectionEditor } from '@/components/admin/field-editor'
import { contactContent } from '@/lib/site-content'
import { siteConfig } from '@/lib/seo'

// Contenu réel de la page Contact. Les coordonnées (info) sont éditables et
// s'affichent sur la page ; par défaut elles reprennent celles du site.
const defaults = {
  hero: contactContent.hero,
  info: {
    phone: siteConfig.phone,
    email: siteConfig.email,
    street: siteConfig.address.street,
    postalCode: siteConfig.address.postalCode,
    city: siteConfig.address.city,
  },
}

export default function AdminContactPage() {
  return (
    <PageEditor pageId="contact" title="Page Contact" defaultContent={defaults}>
      {(content, update) => (
        <>
          <SectionEditor title="Hero">
            <FieldEditor label="Accroche" value={content.hero?.eyebrow} onChange={(v) => update('hero.eyebrow', v)} />
            <FieldEditor label="Titre" value={content.hero?.title} onChange={(v) => update('hero.title', v)} />
            <FieldEditor label="Description" value={content.hero?.description} onChange={(v) => update('hero.description', v)} type="textarea" />
          </SectionEditor>

          <SectionEditor title="Coordonnées affichées">
            <FieldEditor label="Téléphone" value={content.info?.phone} onChange={(v) => update('info.phone', v)} placeholder="05 59 34 72 15" />
            <FieldEditor label="Email" value={content.info?.email} onChange={(v) => update('info.email', v)} placeholder="permayouaccous@gmail.com" />
            <FieldEditor label="Adresse" value={content.info?.street} onChange={(v) => update('info.street', v)} placeholder="134 Route Nationale" />
            <div className="grid grid-cols-2 gap-3">
              <FieldEditor label="Code postal" value={content.info?.postalCode} onChange={(v) => update('info.postalCode', v)} placeholder="64490" />
              <FieldEditor label="Ville" value={content.info?.city} onChange={(v) => update('info.city', v)} placeholder="Accous" />
            </div>
          </SectionEditor>
        </>
      )}
    </PageEditor>
  )
}

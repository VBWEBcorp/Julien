'use client'

import { PageEditor } from '@/components/admin/page-editor'
import { FieldEditor, SectionEditor, ImageField } from '@/components/admin/field-editor'
import { servicesContent } from '@/lib/site-content'

// Contenu réel de la page L'Hôtel. La page lit la liste sous la clé `services`.
const defaults = {
  hero: servicesContent.hero,
  services: servicesContent.list,
}

export default function AdminServicesPage() {
  return (
    <PageEditor pageId="services" title="Page L'Hôtel" defaultContent={defaults}>
      {(content, update) => (
        <>
          <SectionEditor title="Hero">
            <FieldEditor label="Accroche" value={content.hero?.eyebrow} onChange={(v) => update('hero.eyebrow', v)} />
            <FieldEditor label="Titre" value={content.hero?.title} onChange={(v) => update('hero.title', v)} />
            <FieldEditor label="Description" value={content.hero?.description} onChange={(v) => update('hero.description', v)} type="textarea" />
          </SectionEditor>

          <SectionEditor title="Chambres & services">
            {content.services?.map((room: any, i: number) => (
              <div key={i} className="space-y-3 rounded-lg border border-border/40 p-4">
                <span className="text-xs font-medium text-muted-foreground">Bloc {i + 1}</span>
                <FieldEditor label="Titre" value={room.title} onChange={(v) => {
                  const next = [...content.services]; next[i] = { ...next[i], title: v }; update('services', next)
                }} />
                <FieldEditor label="Description" value={room.description} type="textarea" onChange={(v) => {
                  const next = [...content.services]; next[i] = { ...next[i], description: v }; update('services', next)
                }} />
                <FieldEditor
                  label="Points clés (un par ligne)"
                  type="textarea"
                  value={(room.points || []).join('\n')}
                  onChange={(v) => {
                    const next = [...content.services]
                    next[i] = { ...next[i], points: v.split('\n').map((s) => s.trim()).filter(Boolean) }
                    update('services', next)
                  }}
                />
                <ImageField label="Photo" value={room.image} onChange={(v) => {
                  const next = [...content.services]; next[i] = { ...next[i], image: v }; update('services', next)
                }} />
              </div>
            ))}
          </SectionEditor>
        </>
      )}
    </PageEditor>
  )
}

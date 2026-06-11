'use client'

import { PageEditor } from '@/components/admin/page-editor'
import { SeoEditor } from '@/components/admin/seo-editor'
import { FieldEditor, SectionEditor } from '@/components/admin/field-editor'
import { reserverContent } from '@/lib/site-content'

const defaults = reserverContent

export default function AdminReserverPage() {
  return (
    <PageEditor pageId="reserver" title="Page Réserver" defaultContent={defaults}>
      {(content, update) => (
        <>
          <SectionEditor title="Hero">
            <FieldEditor label="Accroche" value={content.hero?.eyebrow} onChange={(v) => update('hero.eyebrow', v)} />
            <FieldEditor label="Titre" value={content.hero?.title} onChange={(v) => update('hero.title', v)} />
            <FieldEditor label="Description" value={content.hero?.description} onChange={(v) => update('hero.description', v)} type="textarea" />
          </SectionEditor>

          <SectionEditor title="Réassurance (3 arguments)">
            {content.reassurance?.map((r: any, i: number) => (
              <div key={i} className="space-y-3 rounded-lg border border-border/40 p-4">
                <span className="text-xs font-medium text-muted-foreground">Argument {i + 1}</span>
                <FieldEditor label="Titre" value={r.title} onChange={(v) => {
                  const next = [...content.reassurance]; next[i] = { ...next[i], title: v }; update('reassurance', next)
                }} />
                <FieldEditor label="Description" value={r.description} onChange={(v) => {
                  const next = [...content.reassurance]; next[i] = { ...next[i], description: v }; update('reassurance', next)
                }} />
              </div>
            ))}
          </SectionEditor>

          <SectionEditor title="Note sous le moteur de réservation">
            <FieldEditor label="Note" value={content.note} onChange={(v) => update('note', v)} type="textarea" />
          </SectionEditor>
          <SeoEditor content={content} update={update} />
        </>
      )}
    </PageEditor>
  )
}

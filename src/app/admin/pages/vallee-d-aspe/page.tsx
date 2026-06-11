'use client'

import { PageEditor } from '@/components/admin/page-editor'
import { SeoEditor } from '@/components/admin/seo-editor'
import { FieldEditor, SectionEditor } from '@/components/admin/field-editor'
import { valleeAspeContent } from '@/lib/site-content'

const defaults = valleeAspeContent

export default function AdminValleePage() {
  return (
    <PageEditor pageId="vallee-aspe" title="Page La Vallée d'Aspe" defaultContent={defaults}>
      {(content, update) => (
        <>
          <SectionEditor title="Hero">
            <FieldEditor label="Accroche" value={content.hero?.eyebrow} onChange={(v) => update('hero.eyebrow', v)} />
            <FieldEditor label="Titre" value={content.hero?.title} onChange={(v) => update('hero.title', v)} type="textarea" />
            <FieldEditor label="Description" value={content.hero?.description} onChange={(v) => update('hero.description', v)} type="textarea" />
          </SectionEditor>

          <SectionEditor title="Activités">
            {content.activities?.map((a: any, i: number) => (
              <div key={i} className="space-y-3 rounded-lg border border-border/40 p-4">
                <span className="text-xs font-medium text-muted-foreground">Activité {i + 1}</span>
                <FieldEditor label="Titre" value={a.title} onChange={(v) => {
                  const next = [...content.activities]; next[i] = { ...next[i], title: v }; update('activities', next)
                }} />
                <FieldEditor label="Description" value={a.description} type="textarea" onChange={(v) => {
                  const next = [...content.activities]; next[i] = { ...next[i], description: v }; update('activities', next)
                }} />
              </div>
            ))}
          </SectionEditor>
          <SeoEditor content={content} update={update} />
        </>
      )}
    </PageEditor>
  )
}

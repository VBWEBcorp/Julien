'use client'

import { PageEditor } from '@/components/admin/page-editor'
import { SeoEditor } from '@/components/admin/seo-editor'
import { FieldEditor, SectionEditor } from '@/components/admin/field-editor'
import { barTerrasseContent } from '@/lib/site-content'

const defaults = barTerrasseContent

export default function AdminBarTerrassePage() {
  return (
    <PageEditor pageId="bar-terrasse" title="Page Le Bar & la Terrasse" defaultContent={defaults}>
      {(content, update) => (
        <>
          <SectionEditor title="Hero">
            <FieldEditor label="Accroche" value={content.hero?.eyebrow} onChange={(v) => update('hero.eyebrow', v)} />
            <FieldEditor label="Titre" value={content.hero?.title} onChange={(v) => update('hero.title', v)} type="textarea" />
            <FieldEditor label="Description" value={content.hero?.description} onChange={(v) => update('hero.description', v)} type="textarea" />
          </SectionEditor>

          <SectionEditor title="Les moments (sections)">
            {content.sections?.map((s: any, i: number) => (
              <div key={i} className="space-y-3 rounded-lg border border-border/40 p-4">
                <span className="text-xs font-medium text-muted-foreground">Section {i + 1}</span>
                <FieldEditor label="Titre" value={s.title} onChange={(v) => {
                  const next = [...content.sections]; next[i] = { ...next[i], title: v }; update('sections', next)
                }} />
                <FieldEditor label="Description" value={s.description} type="textarea" onChange={(v) => {
                  const next = [...content.sections]; next[i] = { ...next[i], description: v }; update('sections', next)
                }} />
                <FieldEditor
                  label="Points clés (un par ligne)"
                  type="textarea"
                  value={(s.points || []).join('\n')}
                  onChange={(v) => {
                    const next = [...content.sections]
                    next[i] = { ...next[i], points: v.split('\n').map((x) => x.trim()).filter(Boolean) }
                    update('sections', next)
                  }}
                />
              </div>
            ))}
          </SectionEditor>
          <SeoEditor content={content} update={update} />
        </>
      )}
    </PageEditor>
  )
}

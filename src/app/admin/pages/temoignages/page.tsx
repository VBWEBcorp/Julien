'use client'

import { Plus, Trash2 } from 'lucide-react'

import { PageEditor } from '@/components/admin/page-editor'
import { FieldEditor, SectionEditor } from '@/components/admin/field-editor'
import { Button } from '@/components/ui/button'
import { testimonialsContent } from '@/lib/site-content'

// Contenu réel des témoignages (la section lit la liste sous la clé `testimonials`).
const defaults = {
  eyebrow: testimonialsContent.eyebrow,
  title: testimonialsContent.title,
  description: testimonialsContent.description,
  testimonials: testimonialsContent.items,
}

export default function AdminTestimonialsPage() {
  return (
    <PageEditor pageId="testimonials" title="Témoignages" defaultContent={defaults}>
      {(content, update) => (
        <>
          <SectionEditor title="En-tête">
            <FieldEditor label="Accroche" value={content.eyebrow} onChange={(v) => update('eyebrow', v)} />
            <FieldEditor label="Titre" value={content.title} onChange={(v) => update('title', v)} />
            <FieldEditor label="Description" value={content.description} onChange={(v) => update('description', v)} type="textarea" />
          </SectionEditor>

          <SectionEditor title="Liste des témoignages">
            {content.testimonials?.map((t: any, i: number) => (
              <div key={i} className="space-y-3 rounded-lg border border-border/40 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Témoignage {i + 1}</span>
                  <button
                    onClick={() => update('testimonials', content.testimonials.filter((_: any, j: number) => j !== i))}
                    className="text-destructive hover:text-destructive/80"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <FieldEditor label="Nom" value={t.name} onChange={(v) => {
                    const items = [...content.testimonials]; items[i] = { ...items[i], name: v }; update('testimonials', items)
                  }} />
                  <FieldEditor label="Profil / lieu" value={t.company} onChange={(v) => {
                    const items = [...content.testimonials]; items[i] = { ...items[i], company: v }; update('testimonials', items)
                  }} />
                </div>
                <FieldEditor label="Témoignage" value={t.text} type="textarea" onChange={(v) => {
                  const items = [...content.testimonials]; items[i] = { ...items[i], text: v }; update('testimonials', items)
                }} />
                <FieldEditor label="Étoiles (1-5)" value={String(t.stars)} onChange={(v) => {
                  const items = [...content.testimonials]; items[i] = { ...items[i], stars: Math.min(5, Math.max(1, parseInt(v) || 5)) }; update('testimonials', items)
                }} />
              </div>
            ))}
            <Button variant="outline" className="w-full gap-2" onClick={() => update('testimonials', [...(content.testimonials || []), { name: '', company: '', text: '', stars: 5 }])}>
              <Plus className="size-4" /> Ajouter un témoignage
            </Button>
          </SectionEditor>
        </>
      )}
    </PageEditor>
  )
}

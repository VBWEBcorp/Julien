'use client'

import { PageEditor } from '@/components/admin/page-editor'
import { FieldEditor, SectionEditor, ImageField } from '@/components/admin/field-editor'
import { aboutContent } from '@/lib/site-content'

// Contenu réel de la page L'auberge (source = site-content.ts).
const defaults = aboutContent

export default function AdminAboutPage() {
  return (
    <PageEditor pageId="about" title="Page L'auberge" defaultContent={defaults}>
      {(content, update) => (
        <>
          <SectionEditor title="Hero">
            <FieldEditor label="Accroche" value={content.hero?.eyebrow} onChange={(v) => update('hero.eyebrow', v)} />
            <FieldEditor label="Titre" value={content.hero?.title} onChange={(v) => update('hero.title', v)} />
            <FieldEditor label="Description" value={content.hero?.description} onChange={(v) => update('hero.description', v)} type="textarea" />
            <ImageField label="Image du hero" value={content.hero?.image} onChange={(v) => update('hero.image', v)} />
          </SectionEditor>

          <SectionEditor title="Récit (blocs histoire)">
            {content.story?.map((block: any, i: number) => (
              <div key={i} className="space-y-3 rounded-lg border border-border/40 p-4">
                <span className="text-xs font-medium text-muted-foreground">Bloc {i + 1}</span>
                <FieldEditor label="Accroche" value={block.eyebrow} onChange={(v) => {
                  const next = [...content.story]; next[i] = { ...next[i], eyebrow: v }; update('story', next)
                }} />
                <FieldEditor label="Titre" value={block.title} onChange={(v) => {
                  const next = [...content.story]; next[i] = { ...next[i], title: v }; update('story', next)
                }} />
                {(block.paragraphs || []).map((p: string, k: number) => (
                  <FieldEditor key={k} label={`Paragraphe ${k + 1}`} value={p} type="textarea" onChange={(v) => {
                    const next = [...content.story]
                    const paras = [...next[i].paragraphs]; paras[k] = v
                    next[i] = { ...next[i], paragraphs: paras }; update('story', next)
                  }} />
                ))}
                <ImageField label="Image" value={block.image} onChange={(v) => {
                  const next = [...content.story]; next[i] = { ...next[i], image: v }; update('story', next)
                }} />
              </div>
            ))}
          </SectionEditor>

          <SectionEditor title="Chiffres clés">
            <div className="grid grid-cols-2 gap-3">
              {content.stats?.map((s: any, i: number) => (
                <div key={i} className="space-y-2 rounded-lg border border-border/40 p-3">
                  <FieldEditor label="Valeur" value={s.value} onChange={(v) => {
                    const next = [...content.stats]; next[i] = { ...next[i], value: v }; update('stats', next)
                  }} />
                  <FieldEditor label="Libellé" value={s.label} onChange={(v) => {
                    const next = [...content.stats]; next[i] = { ...next[i], label: v }; update('stats', next)
                  }} />
                </div>
              ))}
            </div>
          </SectionEditor>

          <SectionEditor title="Nos valeurs">
            {content.values?.map((val: any, i: number) => (
              <div key={i} className="space-y-3 rounded-lg border border-border/40 p-4">
                <FieldEditor label={`Valeur ${i + 1} — Titre`} value={val.title} onChange={(v) => {
                  const next = [...content.values]; next[i] = { ...next[i], title: v }; update('values', next)
                }} />
                <FieldEditor label="Description" value={val.description} type="textarea" onChange={(v) => {
                  const next = [...content.values]; next[i] = { ...next[i], description: v }; update('values', next)
                }} />
              </div>
            ))}
          </SectionEditor>

          <SectionEditor title="Galerie photos">
            {content.gallery?.map((img: string, i: number) => (
              <ImageField key={i} label={`Image ${i + 1}`} value={img} onChange={(v) => {
                const next = [...content.gallery]; next[i] = v; update('gallery', next)
              }} />
            ))}
          </SectionEditor>
        </>
      )}
    </PageEditor>
  )
}

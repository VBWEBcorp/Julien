'use client'

import { Plus, Trash2 } from 'lucide-react'

import { PageEditor } from '@/components/admin/page-editor'
import { SeoEditor } from '@/components/admin/seo-editor'
import { FieldEditor, SectionEditor, ImageField } from '@/components/admin/field-editor'
import { Button } from '@/components/ui/button'
import { heroContent, storyContent, ctaContent, faqContent } from '@/lib/site-content'

// Contenu réel de la page d'accueil (source de vérité = site-content.ts).
const defaults = {
  hero: heroContent,
  story: storyContent,
  cta: ctaContent,
  faq: faqContent,
}

export default function AdminHomePage() {
  return (
    <PageEditor pageId="home" title="Page d'accueil" defaultContent={defaults}>
      {(content, update) => (
        <>
          <SectionEditor title="Hero (bandeau d'accueil)">
            <FieldEditor label="Accroche" value={content.hero?.eyebrow} onChange={(v) => update('hero.eyebrow', v)} />
            <FieldEditor label="Titre principal" value={content.hero?.title} onChange={(v) => update('hero.title', v)} />
            <FieldEditor label="Description" value={content.hero?.description} onChange={(v) => update('hero.description', v)} type="textarea" />
            <div className="grid grid-cols-2 gap-3">
              <FieldEditor label="Bouton 1" value={content.hero?.button1} onChange={(v) => update('hero.button1', v)} />
              <FieldEditor label="Bouton 2" value={content.hero?.button2} onChange={(v) => update('hero.button2', v)} />
            </div>
            <div className="space-y-3 pt-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Images du carrousel</p>
              {content.hero?.images?.map((img: string, i: number) => (
                <ImageField
                  key={i}
                  label={`Image ${i + 1}`}
                  value={img}
                  onChange={(v) => {
                    const next = [...content.hero.images]
                    next[i] = v
                    update('hero.images', next)
                  }}
                />
              ))}
            </div>
          </SectionEditor>

          <SectionEditor title="Notre histoire">
            <FieldEditor label="Accroche" value={content.story?.eyebrow} onChange={(v) => update('story.eyebrow', v)} />
            <FieldEditor label="Titre" value={content.story?.title} onChange={(v) => update('story.title', v)} />
            <FieldEditor label="Paragraphe 1" value={content.story?.paragraph1} onChange={(v) => update('story.paragraph1', v)} type="textarea" />
            <FieldEditor label="Paragraphe 2" value={content.story?.paragraph2} onChange={(v) => update('story.paragraph2', v)} type="textarea" />
            <ImageField label="Image" value={content.story?.image} onChange={(v) => update('story.image', v)} />
          </SectionEditor>

          <SectionEditor title="Questions fréquentes (FAQ)">
            <FieldEditor label="Accroche" value={content.faq?.eyebrow} onChange={(v) => update('faq.eyebrow', v)} />
            <FieldEditor label="Titre" value={content.faq?.title} onChange={(v) => update('faq.title', v)} />
            <FieldEditor label="Description" value={content.faq?.description} onChange={(v) => update('faq.description', v)} type="textarea" />
            <div className="space-y-3 pt-1">
              {content.faq?.items?.map((item: any, i: number) => (
                <div key={i} className="space-y-3 rounded-lg border border-border/40 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-muted-foreground">Question {i + 1}</span>
                    <button
                      onClick={() => update('faq.items', content.faq.items.filter((_: any, j: number) => j !== i))}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                  <FieldEditor label="Question" value={item.question} onChange={(v) => {
                    const next = [...content.faq.items]; next[i] = { ...next[i], question: v }; update('faq.items', next)
                  }} />
                  <FieldEditor label="Réponse" value={item.answer} onChange={(v) => {
                    const next = [...content.faq.items]; next[i] = { ...next[i], answer: v }; update('faq.items', next)
                  }} type="textarea" />
                </div>
              ))}
              <Button variant="outline" className="w-full gap-2" onClick={() => update('faq.items', [...(content.faq?.items || []), { question: '', answer: '' }])}>
                <Plus className="size-4" /> Ajouter une question
              </Button>
            </div>
          </SectionEditor>

          <SectionEditor title="Appel à l'action (CTA)">
            <FieldEditor label="Accroche" value={content.cta?.eyebrow} onChange={(v) => update('cta.eyebrow', v)} />
            <FieldEditor label="Titre" value={content.cta?.title} onChange={(v) => update('cta.title', v)} />
            <FieldEditor label="Description" value={content.cta?.description} onChange={(v) => update('cta.description', v)} type="textarea" />
            <FieldEditor label="Bouton" value={content.cta?.button} onChange={(v) => update('cta.button', v)} />
          </SectionEditor>
          <SeoEditor content={content} update={update} />
        </>
      )}
    </PageEditor>
  )
}

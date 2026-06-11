'use client'

import { FieldEditor, SectionEditor } from '@/components/admin/field-editor'

// Bloc d'édition SEO commun à toutes les pages du back-office.
// Écrit dans content.seo.{title,description} (par langue). Laissé vide =>
// le site utilise le texte par défaut optimisé (fichiers de traduction).
export function SeoEditor({
  content,
  update,
}: {
  content: Record<string, any>
  update: (path: string, value: any) => void
}) {
  const title: string = content.seo?.title ?? ''
  const description: string = content.seo?.description ?? ''

  return (
    <SectionEditor title="SEO — référencement Google">
      <p className="-mt-1 text-xs text-muted-foreground">
        Laissez vide pour utiliser le texte optimisé par défaut. Ces champs sont
        propres à la langue sélectionnée (FR / EN / ES).
      </p>
      <div className="space-y-1">
        <FieldEditor
          label="Titre SEO — balise title (~60 caractères)"
          value={title}
          onChange={(v) => update('seo.title', v)}
          placeholder="Ex. Restaurant à Accous, Vallée d'Aspe"
        />
        <p className="text-right text-[11px] text-muted-foreground/70">
          {title.length}/60
        </p>
      </div>
      <div className="space-y-1">
        <FieldEditor
          label="Méta description (~155 caractères)"
          value={description}
          onChange={(v) => update('seo.description', v)}
          type="textarea"
          placeholder="Résumé incitatif affiché sous le titre dans Google."
        />
        <p className="text-right text-[11px] text-muted-foreground/70">
          {description.length}/155
        </p>
      </div>
    </SectionEditor>
  )
}

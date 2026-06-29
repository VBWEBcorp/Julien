// Catégories des cartes du restaurant. Partagé entre l'admin (sélecteur) et la
// page publique (3 sections : Notre cuisine, Produits du terroir, Bar & snacking).

export type CarteCategory = 'cuisine' | 'terroir' | 'bar'

export const CARTE_CATEGORIES: { value: CarteCategory; label: string }[] = [
  { value: 'cuisine', label: 'Notre cuisine' },
  { value: 'terroir', label: 'Produits du terroir' },
  { value: 'bar', label: 'Bar & snacking' },
]

export const CARTE_CATEGORY_VALUES = CARTE_CATEGORIES.map((c) => c.value)

export const DEFAULT_CARTE_CATEGORY: CarteCategory = 'cuisine'

// Normalise une valeur inconnue vers une catégorie valide (repli sur « cuisine »).
export function normalizeCarteCategory(value: unknown): CarteCategory {
  return CARTE_CATEGORY_VALUES.includes(value as CarteCategory)
    ? (value as CarteCategory)
    : DEFAULT_CARTE_CATEGORY
}

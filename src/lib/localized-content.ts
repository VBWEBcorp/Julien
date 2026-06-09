import { en } from './content/en'
import { es } from './content/es'

// Defaults éditoriaux localisés, consommés par le hook useContent pour afficher
// le contenu traduit même en l'absence de contenu CMS en base. Le FR n'est pas
// listé ici : il provient des defaults passés par chaque composant.
export const localizedContent: Record<string, Record<string, Record<string, any>>> = {
  en,
  es,
}

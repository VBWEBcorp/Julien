// Utilitaires purs (serveur + client) pour gérer les overrides de libellés i18n.
// Les catalogues JSON (src/i18n/messages/*.json) servent de valeurs par défaut ;
// l'admin peut surcharger n'importe quelle clé, stockée à plat ("a.b.c": "valeur").

export type FlatMessages = Record<string, string>

/** Aplatit un objet de messages imbriqué en map de chemins pointés -> valeur (chaînes uniquement). */
export function flattenMessages(obj: unknown, prefix = ''): FlatMessages {
  const out: FlatMessages = {}
  if (!obj || typeof obj !== 'object') return out
  for (const [key, value] of Object.entries(obj as Record<string, unknown>)) {
    const path = prefix ? `${prefix}.${key}` : key
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(out, flattenMessages(value, path))
    } else if (typeof value === 'string') {
      out[path] = value
    }
  }
  return out
}

/** Applique des overrides plats sur des défauts imbriqués et renvoie un nouvel objet imbriqué. */
export function applyOverrides(
  defaults: unknown,
  overrides: FlatMessages | undefined | null
): Record<string, unknown> {
  const result = JSON.parse(JSON.stringify(defaults ?? {})) as Record<string, unknown>
  if (!overrides) return result
  for (const [path, value] of Object.entries(overrides)) {
    if (typeof value !== 'string') continue
    const keys = path.split('.')
    let node: Record<string, unknown> = result
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i]
      if (typeof node[k] !== 'object' || node[k] === null) node[k] = {}
      node = node[k] as Record<string, unknown>
    }
    node[keys[keys.length - 1]] = value
  }
  return result
}

/**
 * Ne conserve que les valeurs qui diffèrent des défauts (et qui existent dans les défauts).
 * Permet de « remettre par défaut » en réenregistrant la valeur d'origine.
 */
export function diffOverrides(values: FlatMessages, defaults: FlatMessages): FlatMessages {
  const out: FlatMessages = {}
  for (const [key, value] of Object.entries(values)) {
    if (key in defaults && typeof value === 'string' && value !== defaults[key]) {
      out[key] = value
    }
  }
  return out
}

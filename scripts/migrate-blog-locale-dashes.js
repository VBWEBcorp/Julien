// scripts/migrate-blog-locale-dashes.js
//
// Migration de données (MongoDB) — à rejouer sur toute base seedée avec
// l'ancien contenu (ex. la prod). Deux corrections :
//
//   1. Backfill `locale: 'fr'` sur les articles « legacy » sans ce champ.
//      Sans lui, la page publique /blog (qui filtre par locale) les exclut
//      et affiche « Aucun article », alors que l'admin les voit.
//
//   2. Suppression des tirets cadratins « — » dans le contenu des articles,
//      remplacés par une ponctuation adaptée (|, parenthèses, deux-points).
//
// Lancer :  node scripts/migrate-blog-locale-dashes.js
//
// Idempotent : relancer ne fait rien si la base est déjà à jour (les
// remplacements ciblés ne s'appliquent que si le motif source est présent).

const mongoose = require('mongoose')
require('dotenv').config({ path: '.env.local' })

// Remplacements ciblés (reproduisent exactement la correction manuelle).
// Ne s'appliquent que si la chaîne `from` est présente → sûrs et idempotents.
const TARGETED = [
  { slug: '5-randonnees-depart-permayou', field: 'content', from: 'le pique-nique — on peut', to: 'le pique-nique : on peut' },
  { slug: 'col-du-somport-velo-accous', field: 'metaTitle', from: 'depuis Accous — étape cyclo', to: 'depuis Accous | étape cyclo' },
  { slug: 'cuisine-saison-vallee-aspe', field: 'metaTitle', from: 'au Permayou — produits', to: 'au Permayou | produits' },
  { slug: 'cuisine-saison-vallee-aspe', field: 'content', from: 'complète — chou, légumes, haricots et viande — réchauffe', to: 'complète (chou, légumes, haricots et viande) réchauffe' },
  { slug: 'quand-venir-vallee-aspe', field: 'metaTitle', from: 'Guide par saison — Le Permayou', to: 'Guide par saison | Le Permayou' },
  { slug: 'quand-venir-vallee-aspe', field: 'content', from: "toute l'année — tout dépend", to: "toute l'année : tout dépend" },
]

// Champs texte d'un article susceptibles de contenir un tiret cadratin.
const TEXT_FIELDS = ['title', 'excerpt', 'metaTitle', 'metaDescription', 'content']

async function main() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI manquant (vérifie .env.local)')
    process.exit(1)
  }

  await mongoose.connect(process.env.MONGODB_URI)
  const posts = mongoose.connection.collection('blogposts')

  // ── 1. Backfill locale ─────────────────────────────────────────
  const localeRes = await posts.updateMany(
    { locale: { $exists: false } },
    { $set: { locale: 'fr' } }
  )
  console.log(`locale: ${localeRes.modifiedCount} article(s) backfillé(s) en 'fr'`)

  // ── 2. Remplacements ciblés ────────────────────────────────────
  let targeted = 0
  for (const { slug, field, from, to } of TARGETED) {
    const doc = await posts.findOne({ slug })
    if (!doc || !doc[field] || !doc[field].includes(from)) continue
    await posts.updateOne({ slug }, { $set: { [field]: doc[field].split(from).join(to) } })
    console.log(`  ✓ ${slug}.${field}`)
    targeted++
  }
  console.log(`tirets ciblés: ${targeted} champ(s) corrigé(s)`)

  // ── 3. Filet de sécurité : tout tiret cadratin restant ─────────
  // Pour un contenu non prévu par les règles ciblées : on neutralise
  // proprement (« A — B » → « A, B », « —mot » → « mot »).
  let generic = 0
  const remaining = await posts.find({}).toArray()
  for (const doc of remaining) {
    const set = {}
    for (const field of TEXT_FIELDS) {
      const val = doc[field]
      if (typeof val !== 'string' || !val.includes('—')) continue
      const cleaned = val
        .replace(/\s*—\s*/g, ', ') // tiret entouré d'espaces → virgule
        .replace(/—/g, '') // tiret résiduel collé → supprimé
      if (cleaned !== val) set[field] = cleaned
    }
    if (Object.keys(set).length) {
      await posts.updateOne({ _id: doc._id }, { $set: set })
      console.log(`  ✓ (générique) ${doc.slug}: ${Object.keys(set).join(', ')}`)
      generic++
    }
  }
  console.log(`tirets résiduels: ${generic} article(s) nettoyé(s)`)

  await mongoose.disconnect()
  console.log('Migration terminée.')
}

main().catch((err) => {
  console.error('Erreur de migration:', err)
  process.exit(1)
})

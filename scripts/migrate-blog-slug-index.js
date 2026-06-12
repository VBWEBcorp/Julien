// scripts/migrate-blog-slug-index.js
//
// Migration d'index (MongoDB) : passe l'unicité du slug d'un index GLOBAL
// (`slug_1` unique) à un index COMPOSITE (`{ slug, locale }` unique).
//
// Pourquoi : les traductions d'un article partagent le même slug (fr/en/es)
// pour des URLs et un hreflang cohérents (/blog/x, /en/blog/x, /es/blog/x).
// L'ancien index unique sur `slug` seul empêchait d'insérer ces traductions.
//
// Lancer :  node scripts/migrate-blog-slug-index.js
//
// Idempotent : ne supprime `slug_1` que s'il existe, et createIndex ne refait
// rien si l'index composite est déjà là.

const mongoose = require('mongoose')
require('dotenv').config({ path: '.env.local' })

async function main() {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI manquant (vérifie .env.local)')
    process.exit(1)
  }
  await mongoose.connect(process.env.MONGODB_URI)
  const col = mongoose.connection.collection('blogposts')

  const before = await col.indexes()
  const hasOldUnique = before.some(
    (i) => i.name === 'slug_1' && i.unique
  )
  const hasComposite = before.some((i) => i.name === 'slug_1_locale_1')

  if (hasOldUnique) {
    await col.dropIndex('slug_1')
    console.log('Index supprimé : slug_1 (unique global)')
  } else {
    console.log('Index slug_1 unique absent (rien à supprimer)')
  }

  if (!hasComposite) {
    await col.createIndex({ slug: 1, locale: 1 }, { unique: true })
    console.log('Index créé : { slug, locale } unique')
  } else {
    console.log('Index { slug, locale } déjà présent')
  }

  const after = await col.indexes()
  console.log(
    'Index actuels :',
    after.map((i) => i.name + (i.unique ? ' (unique)' : '')).join(', ')
  )

  await mongoose.disconnect()
}

main().catch((err) => {
  console.error('Erreur :', err.message)
  process.exit(1)
})

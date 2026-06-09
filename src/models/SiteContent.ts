import mongoose, { Schema, Document } from 'mongoose'

export interface ISiteContent extends Document {
  pageId: string
  locale: 'fr' | 'en' | 'es'
  content: Record<string, any>
  updatedAt: Date
}

const SiteContentSchema = new Schema<ISiteContent>(
  {
    pageId: {
      type: String,
      required: true,
    },
    locale: {
      type: String,
      required: true,
      enum: ['fr', 'en', 'es'],
      default: 'fr',
    },
    content: {
      type: Schema.Types.Mixed,
      required: true,
      default: {},
    },
  },
  {
    timestamps: true,
  }
)

// Unicité par couple (pageId, locale) : une version de contenu par langue.
SiteContentSchema.index({ pageId: 1, locale: 1 }, { unique: true })

// Migration : l'ancien index unique sur `pageId` seul empêcherait d'enregistrer
// plusieurs langues pour une même page. On le supprime s'il existe encore.
// Idempotent et silencieux (best-effort) au premier accès au modèle.
async function dropLegacyPageIdIndex(model: mongoose.Model<ISiteContent>) {
  try {
    const indexes = await model.collection.indexes()
    const legacy = indexes.find(
      (idx) => idx.name === 'pageId_1' && idx.unique
    )
    if (legacy) {
      await model.collection.dropIndex('pageId_1')
    }
  } catch {
    // Collection inexistante ou index déjà absent : rien à faire.
  }
}

const SiteContent =
  mongoose.models.SiteContent ||
  mongoose.model<ISiteContent>('SiteContent', SiteContentSchema)

// Lancement best-effort de la migration d'index (ne bloque pas le chargement).
if (!mongoose.models.__siteContentIndexMigrated) {
  void dropLegacyPageIdIndex(SiteContent as mongoose.Model<ISiteContent>)
  // Marqueur pour ne tenter la migration qu'une fois par process.
  ;(mongoose.models as any).__siteContentIndexMigrated = true
}

export default SiteContent

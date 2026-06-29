import mongoose, { Schema, Document } from 'mongoose'

// Un FeedItem est une actualité « du coin » récupérée automatiquement auprès
// d'une source externe (presse régionale, randos, événements). Contrairement au
// BlogPost (contenu rédigé sur le site), on n'en stocke qu'un APERÇU — titre,
// extrait, vignette — et un lien `externalUrl` qui renvoie vers l'article
// d'origine. On ne republie jamais le contenu intégral (droit d'auteur).
export type FeedSourceType = 'presse' | 'rando' | 'evenement' | 'autre'
export type FeedStatus = 'pending' | 'approved' | 'hidden'

export interface IFeedItem extends Document {
  title: string
  excerpt: string
  image: string
  // Lien de redirection vers l'article / la fiche d'origine.
  externalUrl: string
  // Nom lisible de la source (ex. « La République des Pyrénées »).
  sourceName: string
  // Identifiant de la source dans la config (feed-sources.ts), pour le filtrage.
  sourceId: string
  sourceType: FeedSourceType
  locale: 'fr' | 'en' | 'es'
  publishedAt?: Date
  // Cycle de modération : tout arrive en `pending`, l'admin approuve/masque.
  status: FeedStatus
  // Épinglé = remonté en tête de la section publique.
  pinned: boolean
  fetchedAt: Date
  createdAt: Date
  updatedAt: Date
}

const FeedItemSchema = new Schema<IFeedItem>(
  {
    title: { type: String, required: [true, 'Title is required'] },
    excerpt: { type: String, default: '' },
    image: { type: String, default: '' },
    // L'URL d'origine sert de clé de déduplication (un même article ne doit pas
    // réapparaître à chaque rafraîchissement). L'unicité est garantie côté
    // application par un upsert sur ce champ (autoIndex est désactivé au connect).
    externalUrl: { type: String, required: true },
    sourceName: { type: String, default: '' },
    sourceId: { type: String, default: '', index: true },
    sourceType: {
      type: String,
      enum: ['presse', 'rando', 'evenement', 'autre'],
      default: 'presse',
      index: true,
    },
    locale: { type: String, enum: ['fr', 'en', 'es'], default: 'fr', index: true },
    publishedAt: { type: Date },
    status: {
      type: String,
      enum: ['pending', 'approved', 'hidden'],
      default: 'pending',
      index: true,
    },
    pinned: { type: Boolean, default: false },
    fetchedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

// Déduplication par URL d'origine. Déclaré pour documenter l'intention ; en
// pratique le refresh fait un upsert applicatif (voir /api/feed/refresh) car
// autoIndex est désactivé dans connectDB().
FeedItemSchema.index({ externalUrl: 1 }, { unique: true })

export const FeedItem = mongoose.models.FeedItem ||
  mongoose.model<IFeedItem>('FeedItem', FeedItemSchema)

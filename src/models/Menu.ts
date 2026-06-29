import mongoose, { Schema, Document } from 'mongoose'

import { CARTE_CATEGORY_VALUES, DEFAULT_CARTE_CATEGORY, type CarteCategory } from '@/lib/carte-categories'

// Une « carte » du restaurant : carte du moment, carte de la semaine, boissons,
// snacking… Le contenu est un fichier (PDF ou photo) uploadé par le restaurateur,
// remplaçable depuis mobile. On ne stocke pas le détail plat par plat (cf. brief).
// `category` range la carte dans l'une des 3 sections de la page restaurant.
export interface ICarte extends Document {
  title: string
  description?: string
  fileUrl: string
  fileType: 'pdf' | 'image'
  category: CarteCategory
  order: number
  active: boolean
  createdAt: Date
  updatedAt: Date
}

const CarteSchema = new Schema<ICarte>(
  {
    title: {
      type: String,
      required: [true, 'Le titre est requis'],
    },
    description: String,
    fileUrl: {
      type: String,
      default: '',
    },
    fileType: {
      type: String,
      enum: ['pdf', 'image'],
      default: 'image',
    },
    category: {
      type: String,
      enum: CARTE_CATEGORY_VALUES,
      default: DEFAULT_CARTE_CATEGORY,
    },
    order: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
)

const Carte =
  mongoose.models.Carte || mongoose.model<ICarte>('Carte', CarteSchema)

export default Carte

import mongoose, { Schema, Document } from 'mongoose'

// Overrides des libellés d'interface (i18n) éditables depuis l'admin.
// Un document par langue ; on ne stocke QUE les clés modifiées (chemin pointé -> valeur),
// les catalogues JSON restant la source des valeurs par défaut.
export interface IUiMessages extends Document {
  locale: 'fr' | 'en' | 'es'
  overrides: Record<string, string>
  updatedAt: Date
}

const UiMessagesSchema = new Schema<IUiMessages>(
  {
    locale: {
      type: String,
      required: true,
      enum: ['fr', 'en', 'es'],
      unique: true,
    },
    overrides: {
      type: Schema.Types.Mixed,
      required: true,
      default: {},
    },
  },
  {
    timestamps: true,
  }
)

const UiMessages =
  mongoose.models.UiMessages ||
  mongoose.model<IUiMessages>('UiMessages', UiMessagesSchema)

export default UiMessages

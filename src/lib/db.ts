import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/template-cms'

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local')
}

let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 15000,
      maxPoolSize: 10,
      minPoolSize: 1,
      // Les index & collections existent déjà (créés via les scripts de migration).
      // On désactive donc l'auto-build au connect : c'est la pratique recommandée en
      // prod ET ça évite l'itération interne des modèles par mongoose au connect
      // (source de la TypeError « _hasEncryptedFields »).
      autoIndex: false,
      autoCreate: false,
    }

    // IIFE async : convertit aussi un éventuel throw SYNCHRONE de mongoose.connect
    // (TypeError interne « _hasEncryptedFields » / « model.init » quand le driver
    // n'arrive pas à établir la connexion — typique du HMR en dev ou d'une base
    // injoignable) en promesse rejetée.
    cached.promise = (async () => mongoose.connect(MONGODB_URI, opts))()
    // Garde-fou : un handler attaché DÈS la création garantit que la rejection
    // n'est jamais « unhandled », même si un appelant concurrent (i18n + SEO se
    // partagent cette promesse) n'attache pas son await à temps. La vraie gestion
    // se fait via le try/catch ci-dessous (repli sur les contenus par défaut).
    cached.promise.catch(() => {})
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

declare global {
  var mongoose: any
}

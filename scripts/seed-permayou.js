/**
 * Seed Permayou — ajoute des images de galerie et des articles de journal
 * (placeholders montagne/auberge en attendant les photos pro de nov./déc. 2026).
 *
 * Idempotent : n'insère que ce qui manque (galerie par titre, articles par slug).
 * Lancement :  node scripts/seed-permayou.js
 */
const mongoose = require('mongoose')
try { require('dotenv').config({ path: '.env.local' }) } catch { /* dotenv optionnel */ }

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/template-cms'

// ─── Schémas (alignés sur src/models) ───
const GalleryImageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    imageUrl: { type: String, required: true },
    category: { type: String, default: 'general' },
    order: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
)
const GallerySettingsSchema = new mongoose.Schema(
  { enabled: Boolean, title: String, description: String, eyebrow: String, heroImage: String },
  { timestamps: true }
)
const BlogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, default: '' },
    content: { type: String, default: '' },
    coverImage: { type: String, default: '' },
    category: { type: String, default: 'Général' },
    tags: [{ type: String }],
    author: { type: String, default: '' },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
    metaTitle: String,
    metaDescription: String,
  },
  { timestamps: true }
)
const BlogSettingsSchema = new mongoose.Schema(
  { enabled: Boolean, title: String, description: String, eyebrow: String, heroImage: String, categories: [{ type: String }] },
  { timestamps: true }
)

const GalleryImage = mongoose.models.GalleryImage || mongoose.model('GalleryImage', GalleryImageSchema)
const GallerySettings = mongoose.models.GallerySettings || mongoose.model('GallerySettings', GallerySettingsSchema)
const BlogPost = mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema)
const BlogSettings = mongoose.models.BlogSettings || mongoose.model('BlogSettings', BlogSettingsSchema)

const U = (id, w = 1200) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

// ─── Images de galerie (placeholders montagne / auberge) ───
const galleryImages = [
  { title: "Façade de l'auberge", description: "Le Permayou, au cœur d'Accous dans la vallée d'Aspe.", imageUrl: U('1455587734955-081b22074882'), category: 'auberge', order: 1 },
  { title: "Les sommets de la vallée d'Aspe", description: 'Les Pyrénées béarnaises depuis l\'auberge.', imageUrl: U('1464822759023-fed622ff2c3b'), category: 'vallee', order: 2 },
  { title: 'Une chambre chaleureuse', description: 'Confort montagnard et vue sur les sommets.', imageUrl: U('1611892440504-42a792e24d32'), category: 'chambres', order: 3 },
  { title: 'La table du Permayou', description: 'Cuisine de tradition et produits du terroir aspois.', imageUrl: U('1504674900247-0877df9cc836'), category: 'restaurant', order: 4 },
  { title: 'La salle & la terrasse', description: 'Un cadre convivial, ouvert sur la montagne.', imageUrl: U('1517248135467-4c7edcad34c4'), category: 'terrasse-vue', order: 5 },
  { title: 'Le bar de l\'auberge', description: 'Un bar vivant, ouvert à tous, pour l\'apéro après la rando.', imageUrl: U('1514933651103-005eec06c04b'), category: 'restaurant', order: 6 },
  { title: 'Sur les sentiers', description: 'Randonnées au départ de l\'auberge, étape du GR10.', imageUrl: U('1551632811-561732d1e306'), category: 'vallee', order: 7 },
  { title: 'Brumes sur les Pyrénées', description: 'Les paysages changeants de la vallée au fil des saisons.', imageUrl: U('1506905925346-21bda4d32df4'), category: 'vallee', order: 8 },
  { title: 'La vallée verdoyante', description: 'Nature préservée et grands espaces en Béarn.', imageUrl: U('1469474968028-56623f02e42e'), category: 'vallee', order: 9 },
]

// ─── Articles de journal ───
const blogPosts = [
  {
    title: '5 randonnées au départ du Permayou',
    slug: '5-randonnees-depart-permayou',
    excerpt: "Du sentier familial à la grande boucle d'altitude, voici nos cinq randonnées préférées à faire directement depuis l'auberge, sans prendre la voiture.",
    content: `<p>L'un des grands atouts du Permayou, c'est de pouvoir chausser ses chaussures et partir marcher dès la sortie de l'auberge. Voici cinq idées, de la balade tranquille à la journée plus engagée.</p><h2>1. Le tour d'Accous (facile, 2 h)</h2><p>Une boucle douce autour du village, idéale en fin de journée ou pour les familles. On longe le gave, on traverse les prairies et on profite d'un beau point de vue sur les sommets.</p><h2>2. Le plateau de Lhers (moyen, demi-journée)</h2><p>Un grand plateau d'altitude réputé pour sa tranquillité et sa faune. Avec un peu de chance, vous apercevrez des isards et, l'été, les troupeaux en estive.</p><h2>3. Le chemin de Saint-Jacques (étape)</h2><p>Le Permayou est une étape naturelle sur la voie d'Arles vers le col du Somport. Une portion accessible permet de goûter à l'ambiance du chemin, sac léger.</p><h2>4. Vers le Cirque d'Iseye (moyen+, journée)</h2><p>Notre coup de cœur : une montée progressive jusqu'à l'amphithéâtre de montagnes du Cirque d'Iseye. Prévoyez le pique-nique — on peut vous le préparer.</p><h2>5. Un sommet pour les marcheurs aguerris (difficile)</h2><p>Pour les plus sportifs, plusieurs sommets se gagnent à la journée. Demandez-nous conseil au petit-déjeuner selon la météo et votre niveau.</p><p>Au retour, la terrasse et un bon repas vous attendent. Bonne marche !</p>`,
    coverImage: U('1551632811-561732d1e306', 800),
    category: 'Randonnées & itinéraires',
    tags: ['randonnée', 'GR10', "vallée d'Aspe", 'montagne'],
    author: 'Coline & Julien',
    published: true,
    publishedAt: new Date('2026-04-10'),
    metaTitle: "5 randonnées au départ de l'auberge Le Permayou (vallée d'Aspe)",
    metaDescription: "Nos 5 randonnées préférées au départ du Permayou à Accous : du tour du village au Cirque d'Iseye, en passant par le GR10 et le chemin de Saint-Jacques.",
  },
  {
    title: "Le Cirque d'Iseye : que voir et comment y accéder",
    slug: 'cirque-iseye-decouverte',
    excerpt: "Amphithéâtre naturel de la vallée d'Aspe, le Cirque d'Iseye est l'un des plus beaux paysages des environs. Mode d'emploi pour le découvrir.",
    content: `<p>Le Cirque d'Iseye est une de ces vues qui justifient à elles seules un séjour dans la vallée d'Aspe. Voici l'essentiel pour en profiter.</p><h2>Un amphithéâtre de montagnes</h2><p>Formé par l'érosion glaciaire, le cirque dessine une muraille de sommets d'où dévalent cascades et torrents au printemps. La lumière du matin y est particulièrement belle.</p><h2>Comment y accéder</h2><p>Depuis l'auberge, comptez une journée aller-retour à pied pour les marcheurs réguliers. L'itinéraire monte régulièrement à travers forêts et estives. De bonnes chaussures et de l'eau sont indispensables.</p><h2>Quand y aller</h2><p>De fin juin à octobre pour des conditions idéales. En début de saison, les cascades sont les plus spectaculaires ; à l'automne, les couleurs sont superbes.</p><h2>Nos conseils</h2><p>Partez tôt, emportez un pique-nique (on peut vous le préparer la veille) et renseignez-vous sur la météo : en montagne, elle change vite. À votre retour, la terrasse du Permayou est l'endroit parfait pour savourer le souvenir de la journée.</p>`,
    coverImage: U('1506905925346-21bda4d32df4', 800),
    category: "Vallée d'Aspe & événements",
    tags: ["Cirque d'Iseye", 'paysage', 'randonnée', 'Pyrénées'],
    author: 'Coline & Julien',
    published: true,
    publishedAt: new Date('2026-04-22'),
    metaTitle: "Cirque d'Iseye : découverte et accès depuis la vallée d'Aspe",
    metaDescription: "Tout savoir sur le Cirque d'Iseye : ce qu'il faut voir, comment y accéder depuis Accous et quand y aller. Un incontournable de la vallée d'Aspe.",
  },
  {
    title: 'Étape cyclo : monter le col du Somport depuis Accous',
    slug: 'col-du-somport-velo-accous',
    excerpt: "Le col du Somport est une ascension mythique des Pyrénées. Au départ d'Accous, le Permayou est le camp de base idéal des cyclistes.",
    content: `<p>Frontière entre la France et l'Espagne, le col du Somport (1 632 m) attire chaque année les amateurs de cyclisme. Depuis Accous, l'auberge est parfaitement placée pour en faire votre point de départ.</p><h2>Le profil de l'ascension</h2><p>La montée se fait en pente régulière le long de la vallée, ce qui en fait un col exigeant mais accessible aux cyclos entraînés. Le paysage évolue des forêts aux grands espaces d'altitude.</p><h2>Pourquoi loger au Permayou</h2><p>Local à vélo, départ direct depuis l'auberge, petit-déjeuner copieux pour bien démarrer et cuisine généreuse pour récupérer le soir : tout est pensé pour les sportifs. On peut aussi vous préparer un en-cas pour la route.</p><h2>Les autres sorties possibles</h2><p>Le Somport n'est qu'un début : la vallée d'Aspe et ses alentours offrent de nombreux parcours, du plus roulant au plus grimpant. Demandez-nous nos itinéraires préférés.</p><p>Après l'effort, la terrasse face aux montagnes vous tend les bras.</p>`,
    coverImage: U('1469474968028-56623f02e42e', 800),
    category: 'Vélo & cyclo',
    tags: ['vélo', 'col du Somport', 'cyclisme', 'Pyrénées'],
    author: 'Coline & Julien',
    published: true,
    publishedAt: new Date('2026-05-05'),
    metaTitle: 'Col du Somport à vélo depuis Accous — étape cyclo au Permayou',
    metaDescription: "Monter le col du Somport depuis Accous : profil, conseils et pourquoi le Permayou est le camp de base idéal des cyclistes en vallée d'Aspe.",
  },
  {
    title: 'Notre cuisine de saison : les produits de la vallée d\'Aspe',
    slug: 'cuisine-saison-vallee-aspe',
    excerpt: "Garbure, fromages d'estive, viandes du pays… Au Permayou, on cuisine la vallée. Petit tour de ce que l'on met dans vos assiettes.",
    content: `<p>Manger au Permayou, c'est goûter la vallée d'Aspe. Nous travaillons autant que possible avec les producteurs du coin, au rythme des saisons.</p><h2>La garbure, notre incontournable</h2><p>Cette soupe béarnaise complète — chou, légumes, haricots et viande — réchauffe les marcheurs comme les habitués. Un classique généreux qu'on ne se lasse pas de servir.</p><h2>Les produits du terroir</h2><p>Fromages de brebis d'estive, charcuteries du pays, miel de montagne, légumes de saison : la vallée regorge de savoir-faire. En saison, la palombe et les viandes locales s'invitent à la carte.</p><h2>Une cuisine qui suit les saisons</h2><p>Notre carte évolue régulièrement selon ce que nous trouvons de meilleur. C'est pourquoi nous proposons une carte du moment et une carte de la semaine, mises à jour au fil des arrivages.</p><h2>À table, pour tout le monde</h2><p>Clients de l'hôtel, randonneurs de passage ou habitants de la vallée : la table du Permayou est ouverte midi et soir, dans une ambiance simple et conviviale.</p>`,
    coverImage: U('1504674900247-0877df9cc836', 800),
    category: 'La table',
    tags: ['cuisine', 'produits locaux', 'garbure', 'terroir'],
    author: 'Coline & Julien',
    published: true,
    publishedAt: new Date('2026-05-18'),
    metaTitle: "Cuisine de saison au Permayou — produits de la vallée d'Aspe",
    metaDescription: "Garbure, fromages d'estive, viandes du pays : découvrez la cuisine de saison du Permayou, à base de produits locaux de la vallée d'Aspe.",
  },
  {
    title: "Quand venir en vallée d'Aspe : le guide par saison",
    slug: 'quand-venir-vallee-aspe',
    excerpt: "Randonnée estivale, couleurs d'automne, calme de l'hiver, réveil du printemps : chaque saison a son charme dans la vallée d'Aspe. Notre guide pour choisir.",
    content: `<p>« Quand faut-il venir ? » On nous pose souvent la question. La vérité, c'est que la vallée d'Aspe se découvre toute l'année — tout dépend de ce que vous cherchez.</p><h2>L'été (juin à septembre)</h2><p>La haute saison de la randonnée et du vélo. Les sentiers sont dégagés, les estives animées et les terrasses pleines de vie. L'auberge est ouverte de 7 h à 23 h. Pensez à réserver, surtout en juillet-août.</p><h2>L'automne</h2><p>Notre saison préférée pour les couleurs : les forêts s'embrasent, la lumière est douce et les sentiers plus calmes. Idéal pour les amoureux de nature et de photographie.</p><h2>L'hiver</h2><p>Le calme des montagnes enneigées, parfait pour se ressourcer au coin du feu. Les stations toutes proches raviront les amateurs de neige.</p><h2>Le printemps</h2><p>La vallée se réveille : cascades gonflées par la fonte, prairies fleuries et premiers beaux jours. Une saison pleine de promesses.</p><p>Quelle que soit la période, on vous accueille avec le même plaisir. À très bientôt au Permayou !</p>`,
    coverImage: U('1464822759023-fed622ff2c3b', 800),
    category: 'Bons plans / saison',
    tags: ['saisons', "vallée d'Aspe", 'séjour', 'conseils'],
    author: 'Coline & Julien',
    published: true,
    publishedAt: new Date('2026-05-30'),
    metaTitle: "Quand venir en vallée d'Aspe ? Guide par saison — Le Permayou",
    metaDescription: "Été, automne, hiver, printemps : notre guide pour choisir la meilleure saison pour séjourner en vallée d'Aspe au Permayou, à Accous.",
  },
]

async function seed() {
  console.log('🔗 Connexion à MongoDB…', MONGODB_URI.replace(/\/\/.*@/, '//***@'))
  await mongoose.connect(MONGODB_URI)
  console.log('✅ Connecté')

  // ── Galerie ──
  const existingTitles = new Set((await GalleryImage.find().select('title').lean()).map((g) => g.title))
  const newImages = galleryImages.filter((img) => !existingTitles.has(img.title)).map((img) => ({ ...img, active: true }))
  if (newImages.length) {
    await GalleryImage.insertMany(newImages)
    console.log(`🖼️  ${newImages.length} image(s) de galerie ajoutée(s)`)
  } else {
    console.log('🖼️  Galerie : rien à ajouter (déjà présentes)')
  }
  await GallerySettings.updateOne(
    {},
    {
      $set: { enabled: true },
      $setOnInsert: {
        title: 'L\'auberge en images',
        description: "Le lieu, les chambres, la table et les paysages de la vallée d'Aspe.",
        eyebrow: 'Galerie',
      },
    },
    { upsert: true }
  )

  // ── Journal ──
  let added = 0
  for (const post of blogPosts) {
    const exists = await BlogPost.findOne({ slug: post.slug }).lean()
    if (exists) continue
    await BlogPost.create(post)
    added++
  }
  console.log(added ? `📝 ${added} article(s) de journal ajouté(s)` : '📝 Journal : rien à ajouter (déjà présents)')

  const categories = ['Vie de l\'auberge', 'Randonnées & itinéraires', 'Vélo & cyclo', 'La table', "Vallée d'Aspe & événements", 'Bons plans / saison']
  await BlogSettings.updateOne(
    {},
    {
      $set: { enabled: true, categories },
      $setOnInsert: {
        title: 'Le Journal du Permayou',
        description: "Actualités de l'auberge, idées de randonnées et vie de la vallée d'Aspe.",
        eyebrow: 'Le Journal',
      },
    },
    { upsert: true }
  )

  console.log('✨ Seed terminé.')
  await mongoose.disconnect()
  process.exit(0)
}

seed().catch((e) => {
  console.error('❌ Erreur seed:', e.message)
  process.exit(1)
})

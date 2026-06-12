// scripts/add-blog-articles.js
//
// Ajoute 6 nouveaux articles au Journal du Permayou (vallée d'Aspe).
// Publiés immédiatement (published: true, publishedAt <= maintenant) : ils sont
// donc visibles dès l'exécution sur /blog. Chaque article porte locale: 'fr'
// (sans ce champ, la page publique /blog le filtre et ne l'affiche pas).
//
// Lancer :  node scripts/add-blog-articles.js
//
// Idempotent : upsert par slug via bulkWrite. Relancer met à jour le contenu
// existant sans créer de doublon ni d'erreur de clé unique.
//
// Conventions respectées (cf. articles existants + migration locale) :
//   - locale: 'fr'                  (obligatoire pour l'affichage public)
//   - author: 'Coline & Julien'
//   - pas de tiret cadratin dans les textes (ponctuation : deux-points, parenthèses)
//   - liens internes en /blog/slug  (defaultLocale fr, localePrefix as-needed)

const mongoose = require('mongoose')
require('dotenv').config({ path: '.env.local' })

const BlogPostSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    locale: { type: String, enum: ['fr', 'en', 'es'], default: 'fr' },
    excerpt: String,
    content: String,
    coverImage: String,
    category: String,
    tags: [String],
    author: String,
    published: Boolean,
    publishedAt: Date,
    metaTitle: String,
    metaDescription: String,
  },
  { timestamps: true }
)

const BlogPost =
  mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema)

// Image de couverture : même helper Unsplash que les articles existants.
const U = (id, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

// ──────────────────────────────────────────────────────────────────────────
//  6 NOUVEAUX ARTICLES (prolongent la série existante)
//
//  Maillage interne : chaque article pointe vers d'autres articles du Journal,
//  anciens comme nouveaux. Articles existants référencés :
//    /blog/5-randonnees-depart-permayou
//    /blog/cirque-iseye-decouverte
//    /blog/col-du-somport-velo-accous
//    /blog/cuisine-saison-vallee-aspe
//    /blog/quand-venir-vallee-aspe
// ──────────────────────────────────────────────────────────────────────────
const articles = [
  {
    title: "Le GR10 en vallée d'Aspe : faire étape au Permayou",
    slug: 'gr10-vallee-aspe-etape-permayou',
    locale: 'fr',
    excerpt:
      "Le GR10 traverse les Pyrénées d'un océan à l'autre et passe par la vallée d'Aspe. Voici pourquoi le Permayou est l'étape idéale pour souffler entre deux journées de marche.",
    content: `<p>Le GR10, c'est la grande traversée des Pyrénées, de Hendaye sur l'Atlantique à Banyuls sur la Méditerranée. Sur sa route, le sentier descend dans la vallée d'Aspe, et c'est là que nous entrons en jeu : le Permayou est une étape toute trouvée pour les marcheurs au long cours.</p><h2>Une étape pensée pour les randonneurs</h2><p>Après une longue journée de dénivelé, on apprécie un vrai lit, une douche chaude et un repas copieux. À l'auberge, on accueille les marcheurs comme on aime être reçu en montagne : sans chichis, avec un local pour faire sécher le matériel et un petit-déjeuner solide pour repartir du bon pied.</p><h2>Préparer son sac et son itinéraire</h2><p>Le GR10 se savoure par tronçons ou d'une traite pour les plus aguerris. Si vous voulez rayonner depuis l'auberge avant de reprendre le grand itinéraire, jetez un œil à nos <a href="/blog/5-randonnees-depart-permayou">cinq randonnées au départ du Permayou</a> : de quoi varier les plaisirs sur une journée plus légère.</p><h2>Quand passer par la vallée</h2><p>La fenêtre idéale pour le GR10 dans le secteur va de juin à septembre, quand les cols sont dégagés. Pour affiner votre période, notre <a href="/blog/quand-venir-vallee-aspe">guide des saisons en vallée d'Aspe</a> vous aidera à choisir.</p><h2>Bien manger avant de repartir</h2><p>Marcher, ça creuse. Le soir, on met les petits plats dans les grands avec une <a href="/blog/cuisine-saison-vallee-aspe">cuisine de saison faite de produits de la vallée</a>. Garbure, fromage de brebis et dessert maison : de quoi recharger les batteries avant la prochaine étape. À très vite sur le sentier !</p>`,
    coverImage: U('1551632811-561732d1e306'),
    category: 'Randonnées & itinéraires',
    tags: ['GR10', 'randonnée itinérante', "vallée d'Aspe", 'étape'],
    author: 'Coline & Julien',
    published: true,
    publishedAt: new Date('2026-06-09T08:00:00'),
    metaTitle: "GR10 en vallée d'Aspe : faire étape au Permayou (Accous)",
    metaDescription:
      "Le GR10 passe par la vallée d'Aspe : pourquoi le Permayou est l'étape idéale pour les randonneurs (accueil, repas, conseils d'itinéraire).",
  },
  {
    title: 'Vautours, isards et marmottes : observer la faune des Pyrénées',
    slug: 'observer-faune-pyrenees-vallee-aspe',
    locale: 'fr',
    excerpt:
      "La vallée d'Aspe est un balcon sur la faune sauvage des Pyrénées. Vautours fauves, isards, marmottes : voici où et quand ouvrir l'œil autour de l'auberge.",
    content: `<p>Lever les yeux au bon moment, c'est parfois croiser le regard d'un isard ou voir tournoyer un vautour fauve au-dessus des crêtes. La vallée d'Aspe, aux portes du Parc national des Pyrénées, est l'un des meilleurs endroits de France pour observer la faune de montagne.</p><h2>Les vautours fauves, rois du ciel</h2><p>Avec près de trois mètres d'envergure, le vautour fauve plane sans effort le long des falaises. On les repère facilement en milieu de journée, quand les courants chauds les portent. Le gypaète barbu, plus rare, se mérite davantage.</p><h2>Isards et marmottes en altitude</h2><p>L'isard, cousin pyrénéen du chamois, fréquente les pentes herbeuses et les pierriers. Tôt le matin ou en fin de journée, il se montre plus volontiers. Les marmottes, elles, trahissent leur présence par un sifflement strident avant de filer sous terre.</p><h2>Où observer autour de l'auberge</h2><p>Les hauteurs du Cirque d'Iseye offrent un poste d'observation magnifique : on vous explique tout dans notre article sur <a href="/blog/cirque-iseye-decouverte">le Cirque d'Iseye et comment y accéder</a>. Plusieurs de nos <a href="/blog/5-randonnees-depart-permayou">randonnées au départ du Permayou</a> traversent aussi des zones propices à l'observation.</p><h2>Nos conseils pour ne rien manquer</h2><p>Emportez des jumelles, gardez vos distances et restez discret : la faune sauvage se mérite par la patience. Avant de partir, demandez-nous où les animaux ont été vus ces derniers jours, on suit ça de près. Bonnes observations !</p>`,
    coverImage: U('1506905925346-21bda4d32df4'),
    category: "Vallée d'Aspe & événements",
    tags: ['faune', 'vautours', 'isards', 'Parc national des Pyrénées'],
    author: 'Coline & Julien',
    published: true,
    publishedAt: new Date('2026-06-02T08:00:00'),
    metaTitle: "Observer la faune des Pyrénées en vallée d'Aspe | Le Permayou",
    metaDescription:
      "Vautours fauves, isards, marmottes : où et quand observer la faune sauvage de la vallée d'Aspe autour de l'auberge Le Permayou, à Accous.",
  },
  {
    title: "Le fromage de brebis de la vallée d'Aspe à la table du Permayou",
    slug: 'fromage-brebis-vallee-aspe-permayou',
    locale: 'fr',
    excerpt:
      "Pâte ferme, goût de noisette, croûte travaillée : le fromage de brebis des estives est une fierté de la vallée d'Aspe. On vous raconte celui qu'on sert à l'auberge.",
    content: `<p>S'il y a un produit qui résume la vallée d'Aspe dans une assiette, c'est bien le fromage de brebis. Fabriqué au lait cru, affiné patiemment, il porte en lui le goût des estives et le savoir-faire des bergers. À la table du Permayou, on en a fait une fierté.</p><h2>Un fromage né dans les estives</h2><p>L'été, les troupeaux montent dans les pâturages d'altitude. Le lait des brebis qui broutent cette herbe riche donne un fromage au caractère unique, dans la grande famille de l'Ossau-Iraty. Chaque producteur a sa main, ses caves, son grain.</p><h2>Comment le déguster</h2><p>Nature, en fin de repas, il se suffit à lui-même. Mais on l'aime aussi avec une cuillère de confiture de cerise noire, à la mode basco-béarnaise. Un vrai moment, simple et généreux, à la hauteur de la table que nous voulons partager.</p><h2>Du pré à l'assiette</h2><p>Ce fromage s'inscrit dans toute une cuisine de terroir : retrouvez nos autres spécialités dans l'article sur <a href="/blog/cuisine-saison-vallee-aspe">notre cuisine de saison et les produits de la vallée</a>. Et pour comprendre d'où vient ce lait, lisez notre article sur <a href="/blog/estives-transhumance-vallee-aspe">les estives et la transhumance</a>.</p><h2>Rencontrer les producteurs</h2><p>Plusieurs fermes de la vallée ouvrent leurs portes et vendent en direct. On vous indique volontiers nos adresses préférées pour repartir avec un bon morceau dans le sac. De quoi prolonger le séjour, longtemps après la dernière bouchée.</p>`,
    coverImage: U('1504674900247-0877df9cc836'),
    category: 'La table',
    tags: ['fromage', 'brebis', 'Ossau-Iraty', 'terroir'],
    author: 'Coline & Julien',
    published: true,
    publishedAt: new Date('2026-05-26T08:00:00'),
    metaTitle: "Fromage de brebis de la vallée d'Aspe | La table du Permayou",
    metaDescription:
      "Ossau-Iraty, fromage d'estive au lait cru : l'histoire et la dégustation du fromage de brebis de la vallée d'Aspe, servi à l'auberge Le Permayou.",
  },
  {
    title: "Venir en vallée d'Aspe sans voiture : le train jusqu'à Bedous",
    slug: 'venir-vallee-aspe-train-bedous',
    locale: 'fr',
    excerpt:
      "On peut rejoindre la vallée d'Aspe en train jusqu'à Bedous, puis finir en car ou à vélo. Mode d'emploi pour un séjour au Permayou sans prendre le volant.",
    content: `<p>Bonne nouvelle pour ceux qui préfèrent laisser la voiture au garage : la vallée d'Aspe se rejoint en transports. La ligne ferroviaire remonte jusqu'à Bedous, à quelques kilomètres seulement de l'auberge. Voici comment organiser votre venue.</p><h2>Le train jusqu'à Bedous</h2><p>Depuis Pau, le train dessert la vallée d'Aspe jusqu'à la gare de Bedous, terminus de la ligne. C'est une arrivée dépaysante : on descend du wagon au pied des montagnes, l'air change, le rythme aussi.</p><h2>Les derniers kilomètres jusqu'à Accous</h2><p>De Bedous au Permayou, à Accous, il reste une courte distance. Un service de car assure la liaison dans la vallée, et nous pouvons vous conseiller sur les horaires. À la belle saison, c'est aussi une jolie portion à faire à vélo le long du gave.</p><h2>Venir à vélo, le bon plan</h2><p>La vallée se prête merveilleusement au voyage à vélo. Si la petite reine vous tente, lisez notre article sur <a href="/blog/col-du-somport-velo-accous">l'ascension du col du Somport depuis Accous</a> : l'auberge est un camp de base parfait, local à vélo compris.</p><h2>Choisir le bon moment</h2><p>Selon la saison, les fréquences de train et de car varient. Pour caler votre séjour, notre <a href="/blog/quand-venir-vallee-aspe">guide des saisons en vallée d'Aspe</a> vous donnera le tempo. Et une fois sur place, tout se fait à pied ou à vélo : le vrai luxe, c'est de ralentir.</p>`,
    coverImage: U('1469474968028-56623f02e42e'),
    category: 'Bons plans / saison',
    tags: ['accès', 'train', 'Bedous', 'sans voiture'],
    author: 'Coline & Julien',
    published: true,
    publishedAt: new Date('2026-05-19T08:00:00'),
    metaTitle: "Venir en vallée d'Aspe en train (Bedous) | Le Permayou",
    metaDescription:
      "Rejoindre la vallée d'Aspe sans voiture : train jusqu'à Bedous, car et vélo jusqu'à Accous. Tous nos conseils pour un séjour au Permayou en transports.",
  },
  {
    title: "Estives et transhumance : l'été pastoral en vallée d'Aspe",
    slug: 'estives-transhumance-vallee-aspe',
    locale: 'fr',
    excerpt:
      "Chaque été, les troupeaux montent dans les pâturages d'altitude. La transhumance rythme la vie de la vallée d'Aspe depuis des siècles. Récit d'une tradition bien vivante.",
    content: `<p>Au printemps, un même mouvement reprend dans toute la vallée d'Aspe : brebis, vaches et chevaux quittent les fonds de vallée pour gagner les estives, ces pâturages d'altitude où ils passeront l'été. La transhumance, c'est le cœur battant de la montagne pyrénéenne.</p><h2>Une tradition séculaire</h2><p>Depuis des générations, les bergers conduisent leurs bêtes vers les hauteurs dès que la neige libère l'herbe. Là-haut, le troupeau profite d'une herbe grasse tout l'été, sous la garde des bergers installés dans les cabanes d'estive.</p><h2>Ce que ça change dans l'assiette</h2><p>Cette herbe d'altitude, c'est tout le secret du goût des produits de la vallée. Le lait des brebis d'estive donne le célèbre fromage dont on parle dans notre article sur <a href="/blog/fromage-brebis-vallee-aspe-permayou">le fromage de brebis de la vallée d'Aspe</a>. Manger ici, c'est goûter directement ce lien entre la montagne et la table.</p><h2>Croiser les troupeaux en randonnée</h2><p>L'été, beaucoup de nos itinéraires traversent des zones d'estive. Vous croiserez peut-être un troupeau, un patou (le chien de protection) ou un berger. Nos <a href="/blog/5-randonnees-depart-permayou">randonnées au départ du Permayou</a> passent par plusieurs de ces plateaux, comme celui de Lhers.</p><h2>Respecter la montagne pastorale</h2><p>La montagne est un lieu de travail autant qu'un terrain de jeu. Contournez les troupeaux, tenez les chiens en laisse et refermez les clôtures derrière vous. Ce respect mutuel fait la beauté d'un séjour ici, entre nature et savoir-faire.</p>`,
    coverImage: U('1464822759023-fed622ff2c3b'),
    category: "Vallée d'Aspe & événements",
    tags: ['estives', 'transhumance', 'pastoralisme', 'fromage'],
    author: 'Coline & Julien',
    published: true,
    publishedAt: new Date('2026-05-12T08:00:00'),
    metaTitle: "Estives et transhumance en vallée d'Aspe | Le Permayou",
    metaDescription:
      "La transhumance et les estives rythment l'été en vallée d'Aspe : tradition pastorale, fromage de brebis et rencontres en randonnée autour du Permayou.",
  },
  {
    title: 'Le chemin de Compostelle par le Somport : une halte au Permayou',
    slug: 'chemin-compostelle-somport-permayou',
    locale: 'fr',
    excerpt:
      "La voie d'Arles vers Saint-Jacques-de-Compostelle franchit les Pyrénées au col du Somport, en passant par la vallée d'Aspe. Le Permayou est une halte naturelle pour les pèlerins.",
    content: `<p>Depuis le Moyen Âge, des pèlerins traversent la vallée d'Aspe en route vers Saint-Jacques-de-Compostelle. La voie d'Arles, l'un des quatre grands chemins français, franchit la frontière au col du Somport avant de plonger en Espagne. L'auberge se trouve pile sur cet itinéraire.</p><h2>La voie d'Arles et le Somport</h2><p>Ce chemin historique remonte la vallée d'Aspe jusqu'au col du Somport, à 1 632 mètres d'altitude. C'est l'un des passages les plus sauvages et les plus beaux du pèlerinage, entre forêts, estives et grands espaces d'altitude.</p><h2>Une halte sur le chemin</h2><p>Marcher vers Compostelle, c'est avancer à son rythme, étape après étape. Au Permayou, on accueille les pèlerins comme les autres marcheurs : un lit confortable, un repas chaud et de quoi repartir l'esprit léger. Le chemin de Saint-Jacques fait d'ailleurs partie de nos <a href="/blog/5-randonnees-depart-permayou">itinéraires au départ de l'auberge</a>.</p><h2>Pèlerins et cyclistes, même col</h2><p>Le Somport, c'est aussi un col mythique pour les amateurs de vélo. Si la montée vous tente sur deux roues plutôt qu'à pied, lisez notre article sur <a href="/blog/col-du-somport-velo-accous">l'ascension du col du Somport depuis Accous</a>.</p><h2>Prendre le temps</h2><p>Que vous fassiez tout le chemin ou seulement une portion, la vallée d'Aspe invite à ralentir. Posez votre sac, partagez un repas, repartez reposé. Buen camino, et à bientôt au Permayou !</p>`,
    coverImage: U('1455587734955-081b22074882'),
    category: 'Randonnées & itinéraires',
    tags: ['Compostelle', 'Saint-Jacques', "voie d'Arles", 'Somport'],
    author: 'Coline & Julien',
    published: true,
    publishedAt: new Date('2026-04-28T08:00:00'),
    metaTitle: 'Chemin de Compostelle par le Somport | Halte au Permayou',
    metaDescription:
      "La voie d'Arles vers Compostelle franchit le col du Somport par la vallée d'Aspe : le Permayou, à Accous, est une halte idéale pour les pèlerins.",
  },
]

;(async () => {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI manquant (vérifie .env.local)')
    process.exit(1)
  }

  await mongoose.connect(process.env.MONGODB_URI)

  // Upsert par slug : idempotent, aucun doublon même en relançant le script.
  const ops = articles.map((a) => ({
    updateOne: {
      filter: { slug: a.slug },
      update: { $set: a },
      upsert: true,
    },
  }))

  const res = await BlogPost.bulkWrite(ops)
  const inserted = res.upsertedCount || 0
  const updated = res.modifiedCount || 0
  console.log(
    `${articles.length} articles traités (${inserted} créés, ${updated} mis à jour).`
  )
  console.log('Tous publiés (locale fr) et visibles immédiatement sur /blog.')

  await mongoose.disconnect()
})().catch((err) => {
  console.error('Erreur :', err.message)
  process.exit(1)
})

/**
 * site-content.ts — Contenu adaptable de la template
 *
 * Toute la copie + tous les visuels par défaut sont centralisés ici.
 * Pour adapter la template à un nouveau métier (restaurant, artisan, avocat,
 * conseil, e-commerce, etc.) il suffit d'éditer ce fichier — aucun composant
 * React à toucher.
 *
 * Le CMS (via /api/content/[pageId]) peut surcharger n'importe quelle valeur
 * en runtime ; ce qui est ici sert de fallback / d'état initial.
 *
 * Pour les icônes : passe une chaîne ("Globe", "Phone", "Heart"...) — elle est
 * résolue par `getIcon()` côté composant. Liste complète des icônes :
 * https://lucide.dev/icons/
 */

// ============================================================================
//                          IMAGES — pool de visuels
// ============================================================================
// Remplace ces URLs Unsplash par les vraies photos du client (locaux, équipe,
// produits, ateliers, plats, chantiers, etc.). Garde le format auto+fit pour
// la performance.

// ⚠️ PLACEHOLDERS — visuels d'appoint (montagne / auberge / table) le temps
// du shooting photo pro (nov./déc. 2026). À remplacer par les vraies photos
// du Permayou via le back-office, sans toucher au code.

export const images = {
  // Hero homepage — vallée, salle/terrasse, chambre
  heroCarousel: [
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1920&q=80', // vallée de montagne
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80', // salle de restaurant
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1920&q=80', // chambre chaleureuse
  ],

  // Section "Notre histoire / l'auberge" sur la home
  story:
    'https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1200&q=80', // auberge de montagne

  // Page L'auberge — image principale du hero
  aboutHero:
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80', // montagnes

  // Page L'hôtel / Restaurant — image de fond du hero
  servicesHero:
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1920&q=80', // hôtel

  // Page Contact — image de fond du hero
  contactHero:
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1920&q=80', // paysage montagne

  // Page L'auberge — galerie (8 images, grille 4 colonnes)
  aboutGallery: [
    'https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=600&q=80', // façade auberge
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80', // sommets
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80', // table / plat
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=600&q=80', // chambre
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80', // salle / terrasse
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=600&q=80', // bar
    'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=600&q=80', // randonnée
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80', // montagnes
  ],

  // Images illustrant les 3 pôles + la vallée
  services: [
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=80', // hôtel / chambre
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80', // restaurant / plat
    'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=80', // bar
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80', // vallée
    'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80', // randonnée
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80', // terrasse / salle
    'https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=1200&q=80', // façade auberge
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80', // sommets
  ],

  // Section CTA — 2 colonnes d'images animées en marquee vertical
  ctaScrollColumns: {
    col1: [
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=500&fit=crop&q=75',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=400&h=500&fit=crop&q=75',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=500&fit=crop&q=75',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=500&fit=crop&q=75',
    ],
    col2: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=500&fit=crop&q=75',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=500&fit=crop&q=75',
      'https://images.unsplash.com/photo-1455587734955-081b22074882?w=400&h=500&fit=crop&q=75',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=500&fit=crop&q=75',
    ],
  },

  // GalleryCarousel sur la home
  homeGallery: [
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=720&q=80',
    'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=720&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=720&q=80',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=720&q=80',
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=720&q=80',
    'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=720&q=80',
  ],
}

// ============================================================================
//                          HOME — Hero + sections
// ============================================================================

export const heroContent = {
  eyebrow: "Accous · Vallée d'Aspe",
  title: "Une auberge de montagne au cœur des Pyrénées",
  description:
    "Hôtel, restaurant et bar au cœur de la Vallée d'Aspe. On y vient pour une pause gourmande, une nuit d'étape ou un séjour au grand air — dans une ambiance simple et conviviale.",
  button1: 'Réserver',
  button2: "Découvrir l'auberge",
  images: images.heroCarousel,
}

export const storyContent = {
  eyebrow: "L'esprit des lieux",
  title: "Bienvenue au Permayou",
  paragraph1:
    "Au cœur de la vallée d'Aspe, à Accous, Le Permayou est une auberge de montagne où l'on vient aussi bien pour une pause gourmande que pour un séjour au grand air. Entre les sommets pyrénéens, les sentiers de randonnée et l'authenticité du Béarn, nous accueillons voyageurs, randonneurs, habitants de la vallée et amoureux de nature dans une ambiance simple et conviviale.",
  paragraph2:
    "Le Permayou, c'est un restaurant mettant à l'honneur les produits locaux, un hôtel chaleureux de huit chambres, un bar vivant ouvert à tous et un point presse — un lieu où l'on se sent bien, que l'on vienne pour un café, un repas entre amis ou plusieurs jours à la découverte des Pyrénées.",
  image: images.story,
}

// Aperçu des services sur la home (4 cards)
// `iconName` correspond à une icône lucide (voir https://lucide.dev/icons/)
export const servicesPreviewContent = {
  eyebrow: 'Sous un même toit',
  title: 'Dormir, se régaler, prendre un verre',
  description:
    "Dormir, se régaler, prendre un verre face aux montagnes : Le Permayou réunit tout sous un même toit, au cœur de la Vallée d'Aspe.",
  items: [
    {
      iconName: 'BedDouble',
      title: "L'Hôtel",
      desc: "8 chambres chaleureuses, dont des chambres avec vue sur la montagne et une chambre accessible PMR.",
    },
    {
      iconName: 'UtensilsCrossed',
      title: 'Le Restaurant',
      desc: "Une cuisine traditionnelle et généreuse, qui met à l'honneur les produits locaux et les spécialités du Béarn.",
    },
    {
      iconName: 'Wine',
      title: 'Le Bar & la Terrasse',
      desc: "Un bar vivant ouvert à tous et une terrasse avec vue sur le Cirque d'Iseye, pour l'apéro ou la pause d'après-rando.",
    },
    {
      iconName: 'Mountain',
      title: "La Vallée d'Aspe",
      desc: "Randonnée, vélo, nature et patrimoine : l'auberge est votre camp de base pour explorer les Pyrénées.",
    },
  ],
}

// Mosaïque éditoriale des pôles sur la home (grandes images + gros labels)
export const polesContent = {
  eyebrow: 'Nos univers',
  title: 'Quatre lieux, une même âme',
  items: [
    { label: "La Vallée d'Aspe", href: '/vallee-d-aspe', image: images.services[3] },
    { label: "L'Hôtel", href: '/services', image: images.services[0] },
    { label: 'Le Restaurant', href: '/restaurant', image: images.services[1] },
    { label: 'Le Bar & la Terrasse', href: '/bar-terrasse', image: images.services[2] },
  ],
}

export const testimonialsContent = {
  eyebrow: 'Ils sont passés au Permayou',
  title: 'Ils en parlent mieux que nous',
  description:
    "Randonneurs, cyclistes, familles ou habitants de la vallée : tous repartent avec le sourire.",
  items: [
    { name: 'Marie & Paul', company: 'Randonneurs · GR10', text: "Étape parfaite sur le GR10 : accueil chaleureux, lit confortable et un dîner copieux après une longue journée de marche.", stars: 5 },
    { name: 'Thomas L.', company: 'Cycliste', text: "Idéal pour récupérer avant le col du Somport. La terrasse avec vue sur les montagnes vaut le détour.", stars: 5 },
    { name: 'Famille Bernard', company: 'Séjour en famille', text: "Chambre avec vue magnifique, cuisine généreuse et locale. Les enfants ont adoré. On reviendra !", stars: 5 },
    { name: 'Isabel G.', company: 'Voyageuse · Espagne', text: "Un vrai coup de cœur dans la Vallée d'Aspe. Authentique, convivial et très bien situé.", stars: 5 },
    { name: 'Laurent M.', company: 'De passage', text: "Arrêt repas sur la route : produits du coin, plats savoureux et un bon verre au bar. Que demander de plus.", stars: 5 },
    { name: 'Sophie R.', company: 'Amoureuse de nature', text: "Le calme, la montagne, l'odeur du bois… exactement l'esprit qu'on cherchait. Accueil aux petits soins.", stars: 5 },
  ],
}

export const galleryContent = {
  eyebrow: 'Le lieu',
  title: "L'auberge en images",
  images: images.homeGallery,
}

export const ctaContent = {
  eyebrow: 'Votre séjour',
  title: "Votre prochaine étape dans la Vallée d'Aspe",
  description:
    "Une nuit d'étape, un week-end ou une semaine à la montagne : réservez votre chambre au Permayou en quelques clics.",
  button: 'Réserver maintenant',
  scrollImages: images.ctaScrollColumns,
}

export const faqContent = {
  eyebrow: 'Avant de venir',
  title: 'Les questions qu’on nous pose',
  description:
    "Les réponses aux questions que vous vous posez avant de venir au Permayou.",
  items: [
    {
      question: "Quels sont vos horaires d'ouverture ?",
      answer:
        "En été (juin à septembre), l'auberge est ouverte de 7h à 23h. Les horaires du reste de l'année seront précisés prochainement — n'hésitez pas à nous contacter.",
    },
    {
      question: 'Comment réserver une chambre ?',
      answer:
        "La réservation se fait en ligne via notre moteur de réservation sécurisé, ou directement par téléphone. Nous proposons 8 chambres, dont des chambres avec vue sur la montagne et une chambre accessible aux personnes à mobilité réduite.",
    },
    {
      question: 'Le restaurant est-il ouvert à tous ?',
      answer:
        "Oui, le restaurant et le bar sont ouverts aussi bien aux clients de l'hôtel qu'aux habitants et voyageurs de passage. On y sert midi et soir une cuisine de tradition et des spécialités de la gastronomie aspoise — garbure, palombe en saison — ainsi que des snacks pour une étape simple. L'apéro avec tapas se prend en terrasse face aux montagnes. Réservation conseillée, surtout en saison.",
    },
    {
      question: 'Disposez-vous d\'un accès pour les personnes à mobilité réduite ?',
      answer:
        "Oui. L'auberge dispose d'une chambre double spécialement aménagée et accessible aux personnes à mobilité réduite.",
    },
    {
      question: 'Acceptez-vous les animaux ?',
      answer:
        "Oui, les animaux sont les bienvenus dans nos chambres. N'hésitez pas à nous le préciser lors de votre réservation.",
    },
    {
      question: 'Êtes-vous bien situés pour la randonnée et le vélo ?',
      answer:
        "Idéalement. Le Permayou est au cœur de la Vallée d'Aspe, étape incontournable sur le chemin de Saint-Jacques de Compostelle, point de départ de nombreux sentiers de randonnée et étape appréciée des cyclistes (col du Somport à proximité). Un vrai camp de base pour explorer les Pyrénées.",
    },
    {
      question: 'Acceptez-vous les groupes ?',
      answer:
        "Oui, nous accueillons les groupes et pouvons étudier vos demandes spécifiques (séjours, repas de groupe, séminaires). Contactez-nous via le formulaire pour que nous construisions une proposition adaptée.",
    },
  ],
}

// ============================================================================
//                          ABOUT — page À propos
// ============================================================================

export const aboutContent = {
  hero: {
    eyebrow: 'Notre histoire',
    title: "L'auberge Le Permayou",
    description:
      "Au cœur de la vallée d'Aspe, à Accous : un hôtel, un restaurant et un bar tenus par un jeune couple amoureux de la montagne et des moments simples.",
    image: images.aboutHero,
  },
  story: [
    {
      eyebrow: "L'auberge",
      title: "Au cœur de la vallée d'Aspe",
      paragraphs: [
        "Au cœur de la vallée d'Aspe, à Accous, Le Permayou est une auberge de montagne où l'on vient aussi bien pour une pause gourmande que pour un séjour au grand air. Entre les sommets pyrénéens, les sentiers de randonnée et l'authenticité du Béarn, nous accueillons voyageurs, randonneurs, habitants de la vallée et amoureux de nature dans une ambiance simple et conviviale.",
        "Le Permayou, c'est un restaurant mettant à l'honneur les produits locaux et les spécialités régionales, un hôtel chaleureux de huit chambres, un bar vivant ouvert à tous et un point presse, véritable lieu de rencontre du village. Notre ambition est de faire de l'auberge un lieu où l'on se sent bien, que l'on vienne pour un café, un repas entre amis, une nuit d'étape ou plusieurs jours à la découverte des Pyrénées.",
      ],
      image: images.story,
    },
    {
      eyebrow: 'Les repreneurs',
      title: 'Coline & Julien',
      paragraphs: [
        "Nous sommes Coline et Julien, un jeune couple animé par l'envie de donner vie à un projet qui nous ressemble : accueillir, partager et créer du lien autour d'une belle table et d'un lieu chaleureux. Amoureux de la montagne, des rencontres et des moments simples, nous sommes tombés sous le charme de cette auberge et de son environnement exceptionnel.",
        "Notre objectif est de faire du Permayou un lieu vivant et convivial, ouvert aussi bien aux habitants qu'aux voyageurs. Nous souhaitons proposer une cuisine généreuse inspirée des produits locaux, développer la vie du bar avec des animations et faire de l'hôtel une étape accueillante pour tous ceux qui découvrent les Pyrénées.",
      ],
      image: images.services[5],
    },
  ],
  stats: [
    { value: '8', label: 'chambres' },
    { value: '★★', label: 'hôtel' },
    { value: '1', label: 'chambre PMR' },
    { value: '100%', label: 'produits locaux' },
  ],
  values: [
    {
      iconName: 'Heart',
      title: 'Convivialité',
      description:
        "Un accueil chaleureux et sincère, pour les voyageurs comme pour les habitants de la vallée.",
    },
    {
      iconName: 'Leaf',
      title: 'Authenticité & local',
      description: "Une cuisine généreuse inspirée des produits du terroir et des spécialités du Béarn.",
    },
    {
      iconName: 'Mountain',
      title: 'Esprit montagne',
      description:
        "L'amour de la nature, des Pyrénées et des moments simples au grand air.",
    },
  ],
  gallery: images.aboutGallery,
}

// ============================================================================
//                          SERVICES — page Services
// ============================================================================

export const servicesContent = {
  hero: {
    eyebrow: "L'Hôtel ★★",
    title: 'Huit chambres au pied des montagnes',
    description:
      "Un hôtel chaleureux de 8 chambres, dont plusieurs avec vue sur la montagne et une chambre accessible aux personnes à mobilité réduite. Étape incontournable de la Vallée d'Aspe sur le chemin de Saint-Jacques de Compostelle — idéale pour les randonneurs, les cyclistes et tous les voyageurs de passage.",
  },
  kpis: [
    { value: '8', label: 'chambres' },
    { value: '★★', label: 'classement hôtel' },
    { value: '1', label: 'chambre PMR' },
  ],
  // Chaque entrée : icône, titre, description, 3 points clés, image
  list: [
    {
      iconName: 'BedDouble',
      title: 'Chambre Double — Vue Montagne',
      description: "Une chambre confortable avec un grand lit et une vue dégagée sur les sommets pyrénéens. Idéale pour un séjour en couple.",
      points: ['1 lit double', 'Vue montagne', 'Salle de bain privative'],
      image: images.services[0],
    },
    {
      iconName: 'BedDouble',
      title: 'Chambre Double ou Lits Jumeaux — Vue Montagnes',
      description: "Modulable selon vos besoins : un grand lit ou deux lits simples, avec une belle vue sur la vallée.",
      points: ['Lit double ou 2 lits', 'Vue montagnes', 'Configuration flexible'],
      image: images.services[7],
    },
    {
      iconName: 'BedDouble',
      title: 'Chambre Triple — Vue Montagne',
      description: "Spacieuse, parfaite pour les familles ou les groupes d'amis, avec vue sur la montagne.",
      points: ['Jusqu’à 3 personnes', 'Vue montagne', 'Espace généreux'],
      image: images.services[4],
    },
    {
      iconName: 'BedDouble',
      title: 'Chambre Triple Classique',
      description: "Une chambre triple chaleureuse et fonctionnelle, idéale pour une étape confortable à plusieurs.",
      points: ['Jusqu’à 3 personnes', 'Confort cosy', 'Bon rapport qualité-prix'],
      image: images.services[6],
    },
    {
      iconName: 'Accessibility',
      title: 'Chambre Double — Accessible PMR',
      description: "Une chambre double spécialement aménagée et accessible aux personnes à mobilité réduite, pour un séjour serein.",
      points: ['Accès PMR', 'Aménagement adapté', 'Plain-pied'],
      image: images.services[5],
    },
    {
      iconName: 'Coffee',
      title: 'Les services de l’hôtel',
      description: "Petit-déjeuner, demi-pension, Wi-Fi gratuit dans toutes les chambres, point presse (tabac & journaux) et animaux acceptés. Chaque chambre dispose d'une télévision à écran plat, d'une salle de bain privative et d'un sèche-cheveux.",
      points: ['Petit-déj & demi-pension', 'Wi-Fi gratuit · TV écran plat', 'Animaux acceptés · Point presse'],
      image: images.services[1],
    },
  ],
}

// ============================================================================
//                          CONTACT — page Contact
// ============================================================================

export const contactContent = {
  hero: {
    eyebrow: 'Contact',
    title: 'Nous contacter',
    description:
      "Une question, une demande de réservation ou un projet de groupe ? Écrivez-nous ou appelez-nous directement, nous vous répondrons rapidement.",
  },
  // Les coordonnées (phone, email, address) viennent de siteConfig dans seo.ts
}

// ============================================================================
//                          RESTAURANT — page /restaurant
// ============================================================================

export const restaurantContent = {
  hero: {
    eyebrow: 'Le Restaurant',
    title: 'Une cuisine de tradition, généreuse et locale',
    description:
      "Au Permayou, on cuisine les produits de la Vallée d'Aspe et les spécialités du Béarn — garbure, palombe en saison, viandes du pays. Une table conviviale ouverte aux voyageurs comme aux habitants de la vallée, midi et soir.",
  },
  sections: [
    {
      iconName: 'UtensilsCrossed',
      title: 'Notre cuisine',
      description:
        "Une cuisine traditionnelle et de saison, mijotée à partir de produits frais et locaux. Des plats généreux qui réchauffent après une journée de marche, et des spécialités aspoises qui racontent le terroir.",
      points: ['Produits frais & de saison', 'Spécialités du Béarn', 'Circuits courts'],
    },
    {
      iconName: 'Leaf',
      title: 'Produits du terroir',
      description:
        "Nous travaillons avec les producteurs de la vallée : fromages de brebis, charcuteries, viandes et légumes du pays. Manger au Permayou, c'est goûter la Vallée d'Aspe.",
      points: ['Producteurs locaux', 'Fromages de brebis', 'Viandes du pays'],
    },
    {
      iconName: 'Wine',
      title: 'Bar & snacking',
      description:
        "Une petite faim entre deux randos ? Le bar propose des snacks, des planches et un apéro en terrasse face aux montagnes. La carte des boissons met en avant les producteurs régionaux.",
      points: ['Planches & snacks', 'Apéro en terrasse', 'Boissons régionales'],
    },
  ],
  hours: {
    eyebrow: 'Horaires de service',
    title: 'Quand venir',
    note: "En été (juin à septembre), service midi et soir. Réservation conseillée, surtout en saison. Les horaires du reste de l'année seront précisés prochainement — n'hésitez pas à nous contacter.",
  },
}

// ============================================================================
//                       BAR & TERRASSE — page /bar-terrasse
// ============================================================================

export const barTerrasseContent = {
  hero: {
    eyebrow: 'Le Bar & la Terrasse',
    title: "Un verre face au Cirque d'Iseye",
    description:
      "La terrasse du Permayou ouvre sur l'une des plus belles vues de la vallée : le Cirque d'Iseye. Un bar vivant, ouvert à tous, pour l'apéro, la pause d'après-rando ou simplement un café au soleil.",
  },
  sections: [
    {
      iconName: 'Mountain',
      title: 'La terrasse & la vue',
      description:
        "Installée face aux sommets, la terrasse est le cœur de l'auberge dès les beaux jours. On y prend son petit-déjeuner au calme, un déjeuner au soleil ou un verre au coucher du soleil sur les montagnes.",
      points: ['Vue sur le Cirque d’Iseye', 'Plein soleil', 'Au calme'],
    },
    {
      iconName: 'Wine',
      title: 'Le bar',
      description:
        "Un bar de village, vivant et convivial, ouvert aussi bien aux clients de l'hôtel qu'aux habitants et aux voyageurs de passage. Bières locales, vins de la région et boissons du coin.",
      points: ['Ouvert à tous', 'Bières & vins locaux', 'Ambiance conviviale'],
    },
    {
      iconName: 'Coffee',
      title: 'Les moments',
      description:
        "L'apéro entre amis, la pause des cyclistes avant le col, le café du matin avant la rando, le verre de fin de journée : la terrasse se prête à tous les moments de la journée.",
      points: ['Apéro & tapas', 'Pause cycliste', 'Café du matin'],
    },
  ],
}

// ============================================================================
//                     VALLÉE D'ASPE — page /vallee-d-aspe
// ============================================================================

export const valleeAspeContent = {
  hero: {
    eyebrow: "La Vallée d'Aspe",
    title: "Votre camp de base dans la Vallée d'Aspe",
    description:
      "Randonnée, vélo, faune sauvage et patrimoine : la Vallée d'Aspe est l'une des plus préservées des Pyrénées. Depuis l'auberge, partez explorer les sentiers, les cols et les villages du Béarn.",
  },
  activities: [
    {
      iconName: 'Footprints',
      title: 'Randonnée',
      description:
        "De nombreux sentiers au départ d'Accous, dont le GR10 et le chemin de Saint-Jacques de Compostelle. Le Cirque d'Iseye, les estives et les lacs d'altitude sont à portée de marche.",
    },
    {
      iconName: 'Bike',
      title: 'Vélo & cyclo',
      description:
        "Étape appréciée des cyclistes : le col du Somport et le col du Pourtalet sont à proximité. L'auberge est un point de départ et de récupération idéal.",
    },
    {
      iconName: 'TreePine',
      title: 'Faune & nature',
      description:
        "Ours, isards, vautours, marmottes : la vallée abrite une faune sauvage exceptionnelle, au cœur d'un environnement montagnard préservé.",
    },
    {
      iconName: 'Landmark',
      title: 'Patrimoine',
      description:
        "Villages de caractère, fort du Portalet, gare internationale de Canfranc tout près de la frontière espagnole : la vallée se découvre aussi à travers son histoire.",
    },
  ],
}

// ============================================================================
//                          RÉSERVER — page /reserver
// ============================================================================

export const reserverContent = {
  hero: {
    eyebrow: 'Réservation',
    title: 'Votre séjour au Permayou',
    description:
      "Une nuit d'étape, un week-end ou une semaine à la montagne : réservez votre chambre en quelques clics. Paiement sécurisé et confirmation immédiate via notre moteur de réservation.",
  },
  reassurance: [
    { iconName: 'ShieldCheck', title: 'Paiement sécurisé', description: 'Réservation et paiement protégés.' },
    { iconName: 'CalendarCheck', title: 'Confirmation immédiate', description: 'Votre créneau est bloqué aussitôt.' },
    { iconName: 'Phone', title: 'Réservation assistée', description: 'Une question ? Appelez-nous directement.' },
  ],
  note: "Choisissez vos dates, votre chambre et réglez en ligne, sans quitter le site. Pour une demande de groupe ou un séminaire, contactez-nous directement.",
}

// ============================================================================
//                       PRESETS — exemples par métier
// ============================================================================
//
// Pour basculer rapidement la template sur un autre domaine, décommente l'un
// des presets ci-dessous et remplace les exports correspondants.
// (Tu peux aussi créer un fichier par métier et importer celui qui convient.)
//
// ─── PRESET RESTAURANT ────────────────────────────────────────────────────
// export const heroContent = {
//   eyebrow: 'Restaurant',
//   title: 'Une cuisine de saison, généreuse et authentique',
//   description: 'Tous les jours, des produits frais cuisinés à la minute par notre chef.',
//   button1: 'Réserver une table',
//   button2: 'Voir notre carte',
//   images: [...],
// }
// servicesPreviewContent.items = [
//   { iconName: 'Utensils', title: 'Carte du midi', desc: 'Plat + dessert à 18 €' },
//   { iconName: 'Wine', title: 'Carte des vins', desc: 'Sélection de 40 références…' },
//   ...
// ]
//
// ─── PRESET ARTISAN ───────────────────────────────────────────────────────
// servicesPreviewContent.items = [
//   { iconName: 'Hammer', title: 'Rénovation', desc: '...' },
//   { iconName: 'Paintbrush', title: 'Peinture', desc: '...' },
//   ...
// ]
//
// ─── PRESET AVOCAT / CONSEIL ──────────────────────────────────────────────
// servicesPreviewContent.items = [
//   { iconName: 'Scale', title: 'Droit du travail', desc: '...' },
//   { iconName: 'FileText', title: 'Droit des contrats', desc: '...' },
//   ...
// ]

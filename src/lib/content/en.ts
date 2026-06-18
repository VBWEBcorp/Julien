// Contenu éditorial par défaut, ANGLAIS.
// Carte pageId → contenu, dont les clés DOIVENT correspondre à ce que chaque
// page lit via useContent(pageId, defaults). Rempli par la 1ère passe de
// traduction ; le client affine ensuite depuis /admin (onglet EN).
export const en: Record<string, Record<string, any>> = {
  "home": {
    hero: {
      eyebrow: "Accous · Aspe Valley",
      title: "A mountain inn in the heart of the Pyrenees",
      description:
        "Hotel, restaurant and bar in the heart of the Aspe Valley. Come for a gourmet break, an overnight stop or a getaway in the great outdoors, in a simple, welcoming atmosphere.",
      button1: "Book now",
      button2: "Discover the inn",
      video: "/permayou/hero.mp4",
      images: [
        "/permayou/vallee.jpg",
        "/permayou/terrasse.jpg",
        "/permayou/chambre-double-vue.jpg",
      ],
    },
    amenities: {
      eyebrow: "On site",
      title: "Everything you need to",
      accent: "feel at home",
      description:
        "A simple, warm mountain inn made for travellers, hikers and lovers of the great outdoors.",
      cta: "Discover the rooms",
      items: [
        { icon: "Wifi", label: "Free WiFi" },
        { icon: "PawPrint", label: "Pets welcome" },
        { icon: "Coffee", label: "Breakfast" },
        { icon: "UtensilsCrossed", label: "Restaurant, lunch & dinner" },
        { icon: "Wine", label: "Bar & terrace" },
        { icon: "Mountain", label: "Cirque d’Iseye views" },
        { icon: "Footprints", label: "On the Camino de Santiago" },
        { icon: "BedDouble", label: "8 rooms · 5 types" },
        { icon: "Accessibility", label: "Accessible room" },
        { icon: "ShowerHead", label: "Private bathroom" },
        { icon: "Tv", label: "Flat-screen TV" },
        { icon: "Newspaper", label: "Newsstand" },
      ],
    },
    story: {
      eyebrow: "The spirit of the place",
      title: "Welcome to Le Permayou",
      paragraph1:
        "In the heart of the Aspe Valley, in Accous, Le Permayou is a mountain inn where you can come just as easily for a gourmet break as for a getaway in the great outdoors. Surrounded by the peaks of the Pyrenees, the hiking trails and the authentic character of the Béarn, we welcome travellers, hikers, valley locals and nature lovers in a simple, friendly atmosphere.",
      paragraph2:
        "Le Permayou is a restaurant that puts local produce centre stage, a warm eight-room hotel, a lively bar open to all and a newsstand, a place where you feel at home, whether you come in for a coffee, a meal with friends or a few days exploring the Pyrenees.",
      image:
        "/permayou/facade.jpg",
    },
    cta: {
      eyebrow: "Your stay",
      title: "Your next stop in the Aspe Valley",
      description:
        "An overnight stop, a weekend or a week in the mountains: book your room at Le Permayou in just a few clicks.",
      button: "Book now",
      scrollImages: {
        col1: [
          "/permayou/vallee.jpg",
          "/permayou/chambre-double-vue.jpg",
          "/permayou/terrasse.jpg",
          "/permayou/facade.jpg",
        ],
        col2: [
          "/permayou/vallee.jpg",
          "/permayou/terrasse.jpg",
          "/permayou/facade.jpg",
          "/permayou/vallee.jpg",
        ],
      },
    },
    faq: {
      eyebrow: "Before you come",
      title: "The questions we get asked",
      description:
        "Answers to the questions you may have before coming to Le Permayou.",
      items: [
        {
          question: "What are your opening hours?",
          answer:
            "In summer (June to September), the inn is open from 7am to 11pm. Hours for the rest of the year will be announced soon, feel free to get in touch.",
        },
        {
          question: "How do I book a room?",
          answer:
            "Bookings can be made online through our secure booking engine, or directly by phone. We have 8 rooms, including rooms with mountain views and a room accessible to people with reduced mobility.",
        },
        {
          question: "Is the restaurant open to everyone?",
          answer:
            "Yes, the restaurant and bar are open both to hotel guests and to locals and passing travellers. At lunch and dinner we serve traditional cuisine and Aspe Valley specialities, garbure (a hearty country soup), palombe (wood pigeon) in season, as well as snacks for a simple stop. Pre-dinner drinks with tapas are served on the terrace facing the mountains. Booking is recommended, especially in season.",
        },
        {
          question: "Do you have access for people with reduced mobility?",
          answer:
            "Yes. The inn has a double room specially fitted out and accessible to people with reduced mobility.",
        },
        {
          question: "Do you accept pets?",
          answer:
            "Yes, pets are welcome in our rooms. Please let us know when you book.",
        },
        {
          question: "Are you well located for hiking and cycling?",
          answer:
            "Ideally so. Le Permayou is in the heart of the Aspe Valley, an essential stop on the Camino de Santiago (the Way of St. James), a starting point for many hiking trails and a favourite stop for cyclists (the Col du Somport is nearby). A true base camp for exploring the Pyrenees.",
        },
        {
          question: "Do you accept groups?",
          answer:
            "Yes, we welcome groups and can look into your specific requests (stays, group meals, seminars). Get in touch via the form so we can put together a tailored proposal.",
        },
      ],
    },
    gallery: {
      eyebrow: "The place",
      title: "The inn in pictures",
      images: [
        "/permayou/vallee.jpg",
        "/permayou/chambre-double-vue.jpg",
        "/permayou/terrasse.jpg",
        "/permayou/vallee.jpg",
        "/permayou/terrasse.jpg",
        "/permayou/facade.jpg",
      ],
    },
    poles: {
      eyebrow: "Our worlds",
      title: "Four places, one shared soul",
      items: [
        { label: "The Aspe Valley", href: "/vallee-d-aspe", image: "/permayou/vallee.jpg" },
        { label: "The Hotel", href: "/services", image: "/permayou/chambre-double-vue.jpg" },
        { label: "The Restaurant", href: "/restaurant", image: "/permayou/terrasse.jpg" },
        { label: "The Bar & Terrace", href: "/bar-terrasse", image: "/permayou/terrasse-jardin.jpg" },
      ],
    },
  },
  "about": {
    hero: {
      eyebrow: "Our story",
      title: "The Le Permayou inn",
      description:
        "In the heart of the Aspe Valley, in Accous: a hotel, a restaurant and a bar run by a young couple in love with the mountains and life's simple moments.",
      image:
        "/permayou/vallee.jpg",
    },
    story: [
      {
        eyebrow: "The inn",
        title: "In the heart of the Aspe Valley",
        paragraphs: [
          "In the heart of the Aspe Valley, in Accous, Le Permayou is a mountain inn where you can come just as easily for a gourmet break as for a getaway in the great outdoors. Surrounded by the peaks of the Pyrenees, the hiking trails and the authentic character of the Béarn, we welcome travellers, hikers, valley locals and nature lovers in a simple, friendly atmosphere.",
          "Le Permayou is a restaurant that puts local produce and regional specialities centre stage, a warm eight-room hotel, a lively bar open to all and a newsstand, a true village meeting place. Our ambition is to make the inn a place where you feel at home, whether you come in for a coffee, a meal with friends, an overnight stop or a few days exploring the Pyrenees.",
        ],
        image:
          "/permayou/facade.jpg",
      },
      {
        eyebrow: "The new owners",
        title: "Coline & Julien",
        paragraphs: [
          "We are Coline and Julien, a young couple driven by the desire to bring to life a project that reflects who we are: welcoming people, sharing and creating connections around a fine table and a warm place. In love with the mountains, with meeting people and with life's simple moments, we fell for the charm of this inn and its exceptional setting.",
          "Our goal is to make Le Permayou a lively, welcoming place, open to locals and travellers alike. We want to offer generous cuisine inspired by local produce, bring the bar to life with events, and make the hotel a welcoming stop for everyone discovering the Pyrenees.",
        ],
        image:
          "/permayou/terrasse.jpg",
      },
    ],
    stats: [
      { value: "8", label: "rooms" },
      { value: "★★", label: "hotel" },
      { value: "1", label: "accessible room" },
      { value: "100%", label: "local produce" },
    ],
    values: [
      {
        iconName: "Heart",
        title: "Conviviality",
        description:
          "A warm, genuine welcome, for travellers and valley locals alike.",
      },
      {
        iconName: "Leaf",
        title: "Authenticity & local",
        description: "Generous cuisine inspired by local produce and the specialities of the Béarn.",
      },
      {
        iconName: "Mountain",
        title: "Mountain spirit",
        description:
          "A love of nature, of the Pyrenees and of simple moments in the open air.",
      },
    ],
    gallery: [
      "/permayou/facade.jpg",
      "/permayou/vallee.jpg",
      "/permayou/terrasse.jpg",
      "/permayou/chambre-double-vue.jpg",
      "/permayou/terrasse.jpg",
      "/permayou/terrasse-jardin.jpg",
      "/permayou/facade.jpg",
      "/permayou/vallee.jpg",
    ],
  },
  "services": {
    hero: {
      eyebrow: "The Hotel ★★",
      title: "Eight rooms at the foot of the mountains",
      description:
        "A warm 8-room hotel, several with mountain views and one room accessible to people with reduced mobility. An essential stop in the Aspe Valley on the Camino de Santiago (the Way of St. James), ideal for hikers, cyclists and all passing travellers.",
      image: "",
    },
    services: [
      {
        iconName: "BedDouble",
        title: "Double Room, Mountain View",
        description: "A comfortable room with a large bed and an open view of the peaks of the Pyrenees. Ideal for a couples' getaway.",
        points: ["1 double bed", "Mountain view", "Private bathroom"],
        image: "/permayou/chambre-double-vue.jpg",
      },
      {
        iconName: "BedDouble",
        title: "Double or Twin Room, Mountain Views",
        description: "Flexible to suit your needs: one large bed or two single beds, with a lovely view over the valley.",
        points: ["Double bed or 2 beds", "Mountain views", "Flexible configuration"],
        image: "/permayou/chambre-jumeaux.jpg",
      },
      {
        iconName: "BedDouble",
        title: "Triple Room, Mountain View",
        description: "Spacious, perfect for families or groups of friends, with a mountain view.",
        points: ["Up to 3 people", "Mountain view", "Generous space"],
        image: "/permayou/chambre-triple.jpg",
      },
      {
        iconName: "BedDouble",
        title: "Classic Triple Room",
        description: "A warm, practical triple room, ideal for a comfortable stop with several people.",
        points: ["Up to 3 people", "Cosy comfort", "Great value for money"],
        image: "/permayou/chambre-familiale.jpg",
      },
      {
        iconName: "Accessibility",
        title: "Double Room, Accessible (PRM)",
        description: "A double room specially fitted out and accessible to people with reduced mobility, for a relaxed stay.",
        points: ["Accessible access", "Adapted fittings", "Ground floor"],
        image: "/permayou/chambre-double.jpg",
      },
      {
        iconName: "Coffee",
        title: "The hotel's services",
        description: "Breakfast, half-board, free Wi-Fi in every room, a newsstand (tobacco & newspapers) and pets welcome. Each room has a flat-screen TV, a private bathroom and a hairdryer.",
        points: ["Breakfast & half-board", "Free Wi-Fi · Flat-screen TV", "Pets welcome · Newsstand"],
        image: "/permayou/terrasse.jpg",
      },
    ],
  },
  "restaurant": {
    hero: {
      eyebrow: "The Restaurant",
      title: "Traditional cuisine, generous and local",
      description:
        "At Le Permayou, we cook the produce of the Aspe Valley and the specialities of the Béarn, garbure (a hearty country soup), palombe (wood pigeon) in season, local meats. A friendly table open to travellers and valley locals alike, at lunch and dinner.",
    },
    sections: [
      {
        iconName: "UtensilsCrossed",
        title: "Our cuisine",
        description:
          "Traditional, seasonal cooking, simmered from fresh, local produce. Generous dishes that warm you up after a day's walking, and Aspe Valley specialities that tell the story of the land.",
        points: ["Fresh & seasonal produce", "Specialities of the Béarn", "Short supply chains"],
      },
      {
        iconName: "Leaf",
        title: "Local produce",
        description:
          "We work with the valley's producers: sheep's-milk cheeses, charcuterie, local meats and vegetables. To eat at Le Permayou is to taste the Aspe Valley.",
        points: ["Local producers", "Sheep's-milk cheeses", "Local meats"],
      },
      {
        iconName: "Wine",
        title: "Bar & snacking",
        description:
          "A little hungry between two hikes? The bar offers snacks, sharing boards and pre-dinner drinks on the terrace facing the mountains. The drinks menu showcases regional producers.",
        points: ["Boards & snacks", "Drinks on the terrace", "Regional drinks"],
      },
    ],
    hours: {
      eyebrow: "Service hours",
      title: "When to come",
      note: "In summer (June to September), service at lunch and dinner. Booking is recommended, especially in season. Hours for the rest of the year will be announced soon, feel free to get in touch.",
    },
  },
  "bar-terrasse": {
    hero: {
      eyebrow: "The Bar & Terrace",
      title: "A drink facing the Cirque d'Iseye",
      description:
        "Le Permayou's terrace opens onto one of the finest views in the valley: the Cirque d'Iseye. A lively bar, open to all, for pre-dinner drinks, an after-hike break or simply a coffee in the sun.",
    },
    sections: [
      {
        iconName: "Mountain",
        title: "The terrace & the view",
        description:
          "Facing the peaks, the terrace is the heart of the inn as soon as the fine weather arrives. Enjoy a quiet breakfast, lunch in the sun or a sunset drink over the mountains.",
        points: ["View of the Cirque d'Iseye", "Full sun", "Peaceful setting"],
      },
      {
        iconName: "Wine",
        title: "The bar",
        description:
          "A village bar, lively and welcoming, open both to hotel guests and to locals and passing travellers. Local beers, regional wines and local drinks.",
        points: ["Open to all", "Local beers & wines", "Friendly atmosphere"],
      },
      {
        iconName: "Coffee",
        title: "The moments",
        description:
          "Pre-dinner drinks with friends, the cyclists' break before the pass, the morning coffee before the hike, the end-of-day drink: the terrace lends itself to every moment of the day.",
        points: ["Drinks & tapas", "Cyclists' break", "Morning coffee"],
      },
    ],
  },
  "vallee-aspe": {
    hero: {
      eyebrow: "The Aspe Valley",
      title: "Your base camp in the Aspe Valley",
      description:
        "Hiking, cycling, wildlife and heritage: the Aspe Valley is one of the most unspoilt in the Pyrenees. From the inn, set off to explore the trails, the mountain passes and the villages of the Béarn.",
    },
    activities: [
      {
        iconName: "Footprints",
        title: "Hiking",
        description:
          "Many trails start from Accous, including the GR10 and the Camino de Santiago (the Way of St. James). The Cirque d'Iseye, the high pastures and the mountain lakes are all within walking distance.",
      },
      {
        iconName: "Bike",
        title: "Cycling & road bikes",
        description:
          "A favourite stop for cyclists: the Col du Somport and the Col du Pourtalet are nearby. The inn is an ideal starting and recovery point.",
      },
      {
        iconName: "TreePine",
        title: "Wildlife & nature",
        description:
          "Bears, izards (Pyrenean chamois), vultures, marmots: the valley is home to exceptional wildlife, in the heart of an unspoilt mountain environment.",
      },
      {
        iconName: "Landmark",
        title: "Heritage",
        description:
          "Villages full of character, the Fort du Portalet, the international railway station of Canfranc close to the Spanish border: the valley can also be discovered through its history.",
      },
    ],
  },
  "reserver": {
    hero: {
      eyebrow: "Booking",
      title: "Your stay at Le Permayou",
      description:
        "An overnight stop, a weekend or a week in the mountains: book your room in just a few clicks. Secure payment and instant confirmation through our booking engine.",
    },
    reassurance: [
      { iconName: "ShieldCheck", title: "Secure payment", description: "Protected booking and payment." },
      { iconName: "CalendarCheck", title: "Instant confirmation", description: "Your slot is reserved straight away." },
      { iconName: "Phone", title: "Assisted booking", description: "Got a question? Call us directly." },
    ],
    note: "Choose your dates and your room and pay online, without leaving the site. For a group request or a seminar, get in touch with us directly.",
  },
  "contact": {
    hero: {
      eyebrow: "Contact",
      title: "Get in touch",
      description:
        "A question, a booking request or a group project? Write to us or call us directly, and we'll get back to you quickly.",
      image: "",
    },
  },
  "testimonials": {
    eyebrow: "They've stayed at Le Permayou",
    title: "They say it better than we do",
    description:
      "Hikers, cyclists, families or valley locals: everyone leaves with a smile.",
    testimonials: [
      { name: "François-Samuel G.", company: "Hotel stay", text: "Honestly, this is the must-visit spot in the area. The rooms are spotless and wonderfully quiet. The cooking, built on local produce, really makes the difference. Excellent value, highly recommended!", stars: 5 },
      { name: "Guillaume R.", company: "Family stay", text: "A wonderful stay in the Aspe Valley with our two children, three nights full-board. Great restaurant, quick service, and well-kept rooms with comfortable beds. We'll definitely be back!", stars: 5 },
      { name: "Abel Wolf", company: "Family holiday", text: "Excellent cooking with local produce. Quick, efficient and smiling service, all in a magnificent setting with mountain views. What more could you ask for?", stars: 5 },
      { name: "Anne Perez", company: "Hotel stay", text: "Simple but clean rooms. Excellent food (the trout was perfect) and a generous breakfast. The house coffee is excellent. Thank you for the welcome!", stars: 5 },
      { name: "F. Rose", company: "Breakfast", text: "We came for breakfast: rare kindness from the staff and a wide choice of products. We'll gladly come back.", stars: 5 },
      { name: "Mickaël Brun", company: "At the restaurant", text: "Great restaurant. Fresh, varied and delicious dishes, with a friendly, smiling team. No regrets about our chance discovery!", stars: 5 },
    ],
  },
}

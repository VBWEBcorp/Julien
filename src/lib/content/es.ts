// Contenu éditorial par défaut, ESPAGNOL.
// Carte pageId → contenu, dont les clés DOIVENT correspondre à ce que chaque
// page lit via useContent(pageId, defaults). Rempli par la 1ère passe de
// traduction ; le client affine ensuite depuis /admin (onglet ES).
export const es: Record<string, Record<string, any>> = {
  "home": {
    "hero": {
      "eyebrow": "Accous · Valle de Aspe",
      "title": "Un albergue de montaña en el corazón de los Pirineos",
      "description": "Hotel, restaurante y bar en el corazón del Valle de Aspe. Se viene para una pausa gastronómica, una noche de etapa o una estancia al aire libre, en un ambiente sencillo y acogedor.",
      "button1": "Reservar",
      "button2": "Descubrir el albergue",
      "video": "/permayou/hero.mp4",
      "images": [
        "/permayou/vallee.jpg",
        "/permayou/terrasse.jpg",
        "/permayou/chambre-double-vue.jpg"
      ]
    },
    "amenities": {
      "eyebrow": "En el sitio",
      "title": "Todo lo necesario para",
      "accent": "sentirse a gusto",
      "description": "Un albergue de montaña sencillo y acogedor, pensado para viajeros, senderistas y amantes de la naturaleza.",
      "cta": "Descubrir las habitaciones",
      "items": [
        { "icon": "Wifi", "label": "WiFi gratuito" },
        { "icon": "PawPrint", "label": "Se admiten animales" },
        { "icon": "Coffee", "label": "Desayuno" },
        { "icon": "UtensilsCrossed", "label": "Restaurante mediodía y noche" },
        { "icon": "Wine", "label": "Bar y terraza" },
        { "icon": "Mountain", "label": "Vistas al Circo de Iseye" },
        { "icon": "Footprints", "label": "Etapa del Camino de Santiago" },
        { "icon": "BedDouble", "label": "8 habitaciones · 5 tipos" },
        { "icon": "Accessibility", "label": "Habitación adaptada" },
        { "icon": "ShowerHead", "label": "Baño privado" },
        { "icon": "Tv", "label": "TV pantalla plana" },
        { "icon": "Newspaper", "label": "Punto de prensa" }
      ]
    },
    "story": {
      "eyebrow": "El espíritu del lugar",
      "title": "Bienvenido a Le Permayou",
      "paragraph1": "En el corazón del Valle de Aspe, en Accous, Le Permayou es un albergue de montaña al que se viene tanto para una pausa gastronómica como para una estancia al aire libre. Entre las cumbres pirenaicas, los senderos de excursión y la autenticidad del Béarn, acogemos a viajeros, senderistas, habitantes del valle y amantes de la naturaleza en un ambiente sencillo y acogedor.",
      "paragraph2": "Le Permayou es un restaurante que pone en valor los productos locales, un hotel acogedor de ocho habitaciones, un bar animado abierto a todos y un punto de prensa: un lugar donde uno se siente bien, ya sea para un café, una comida entre amigos o varios días descubriendo los Pirineos.",
      "image": "/permayou/facade.jpg"
    },
    "cta": {
      "eyebrow": "Su estancia",
      "title": "Su próxima etapa en el Valle de Aspe",
      "description": "Una noche de etapa, un fin de semana o una semana en la montaña: reserve su habitación en Le Permayou con unos pocos clics.",
      "button": "Reservar ahora",
      "scrollImages": {
        "col1": [
          "/permayou/vallee.jpg",
          "/permayou/chambre-double-vue.jpg",
          "/permayou/terrasse.jpg",
          "/permayou/facade.jpg"
        ],
        "col2": [
          "/permayou/vallee.jpg",
          "/permayou/terrasse.jpg",
          "/permayou/facade.jpg",
          "/permayou/vallee.jpg"
        ]
      }
    },
    "faq": {
      "eyebrow": "Antes de venir",
      "title": "Las preguntas que nos hacen",
      "description": "Las respuestas a las preguntas que se plantea antes de venir a Le Permayou.",
      "items": [
        {
          "question": "¿Cuál es su horario de apertura?",
          "answer": "En verano (de junio a septiembre), el albergue está abierto de 7:00 a 23:00. El horario del resto del año se precisará próximamente; no dude en ponerse en contacto con nosotros."
        },
        {
          "question": "¿Cómo reservar una habitación?",
          "answer": "La reserva se realiza en línea a través de nuestro motor de reservas seguro, o directamente por teléfono. Disponemos de 8 habitaciones, entre ellas habitaciones con vistas a la montaña y una habitación accesible para personas con movilidad reducida."
        },
        {
          "question": "¿El restaurante está abierto a todos?",
          "answer": "Sí, el restaurante y el bar están abiertos tanto a los clientes del hotel como a los habitantes y viajeros de paso. Se sirve al mediodía y por la noche una cocina tradicional y especialidades de la gastronomía del Valle de Aspe (garbure, palombe en temporada), así como snacks para una etapa sencilla. El aperitivo con tapas se toma en la terraza frente a las montañas. Se recomienda reservar, sobre todo en temporada."
        },
        {
          "question": "¿Disponen de acceso para personas con movilidad reducida?",
          "answer": "Sí. El albergue dispone de una habitación doble especialmente acondicionada y accesible para personas con movilidad reducida."
        },
        {
          "question": "¿Admiten animales?",
          "answer": "Sí, los animales son bienvenidos en nuestras habitaciones. No dude en indicárnoslo al hacer su reserva."
        },
        {
          "question": "¿Están bien situados para el senderismo y el ciclismo?",
          "answer": "De forma ideal. Le Permayou se encuentra en el corazón del Valle de Aspe, etapa imprescindible del Camino de Santiago, punto de partida de numerosos senderos de excursión y etapa apreciada por los ciclistas (con el puerto del Somport cerca). Un auténtico campamento base para explorar los Pirineos."
        },
        {
          "question": "¿Admiten grupos?",
          "answer": "Sí, acogemos a grupos y podemos estudiar sus peticiones específicas (estancias, comidas de grupo, seminarios). Póngase en contacto con nosotros a través del formulario para que elaboremos una propuesta a su medida."
        }
      ]
    },
    "gallery": {
      "eyebrow": "El lugar",
      "title": "El albergue en imágenes",
      "images": [
        "/permayou/vallee.jpg",
        "/permayou/chambre-double-vue.jpg",
        "/permayou/terrasse.jpg",
        "/permayou/vallee.jpg",
        "/permayou/terrasse.jpg",
        "/permayou/facade.jpg"
      ]
    },
    "poles": {
      "eyebrow": "Nuestros universos",
      "title": "Cuatro lugares, una misma alma",
      "items": [
        { "label": "El Restaurante", "href": "/restaurant", "image": "/permayou/terrasse.jpg" },
        { "label": "El Hotel", "href": "/services", "image": "/permayou/chambre-double-vue.jpg" },
        { "label": "Estanco y Prensa", "href": "/tabac-presse", "image": "/permayou/facade.jpg" },
        { "label": "El Bar y la Terraza", "href": "/bar-terrasse", "image": "/permayou/terrasse-jardin.jpg" }
      ]
    }
  },
  "about": {
    "hero": {
      "eyebrow": "Nuestra historia",
      "title": "El albergue Le Permayou",
      "description": "En el corazón del Valle de Aspe, en Accous: un hotel, un restaurante y un bar regentados por una joven pareja enamorada de la montaña y de los momentos sencillos.",
      "image": "/permayou/vallee.jpg"
    },
    "story": [
      {
        "eyebrow": "El albergue",
        "title": "En el corazón del Valle de Aspe",
        "paragraphs": [
          "En el corazón del Valle de Aspe, en Accous, Le Permayou es un albergue de montaña al que se viene tanto para una pausa gastronómica como para una estancia al aire libre. Entre las cumbres pirenaicas, los senderos de excursión y la autenticidad del Béarn, acogemos a viajeros, senderistas, habitantes del valle y amantes de la naturaleza en un ambiente sencillo y acogedor.",
          "Le Permayou es un restaurante que pone en valor los productos locales y las especialidades regionales, un hotel acogedor de ocho habitaciones, un bar animado abierto a todos y un punto de prensa, verdadero lugar de encuentro del pueblo. Nuestra ambición es hacer del albergue un lugar donde uno se sienta bien, ya sea para un café, una comida entre amigos, una noche de etapa o varios días descubriendo los Pirineos."
        ],
        "image": "/permayou/facade.jpg"
      },
      {
        "eyebrow": "Los nuevos propietarios",
        "title": "Coline & Julien",
        "paragraphs": [
          "Somos Coline y Julien, una joven pareja animada por el deseo de dar vida a un proyecto que nos representa: acoger, compartir y crear vínculos en torno a una buena mesa y un lugar acogedor. Enamorados de la montaña, de los encuentros y de los momentos sencillos, caímos rendidos ante el encanto de este albergue y de su entorno excepcional.",
          "Nuestro objetivo es hacer de Le Permayou un lugar vivo y acogedor, abierto tanto a los habitantes como a los viajeros. Queremos ofrecer una cocina generosa inspirada en los productos locales, dar vida al bar con animaciones y hacer del hotel una etapa acogedora para todos los que descubren los Pirineos."
        ],
        "image": "/permayou/terrasse-jardin.jpg"
      }
    ],
    "stats": [
      { "value": "8", "label": "habitaciones" },
      { "value": "★★", "label": "hotel" },
      { "value": "1", "label": "habitación adaptada" },
      { "value": "100%", "label": "productos locales" }
    ],
    "values": [
      {
        "iconName": "Heart",
        "title": "Cercanía",
        "description": "Una acogida cálida y sincera, tanto para los viajeros como para los habitantes del valle."
      },
      {
        "iconName": "Leaf",
        "title": "Autenticidad y producto local",
        "description": "Una cocina generosa inspirada en los productos de la tierra y en las especialidades del Béarn."
      },
      {
        "iconName": "Mountain",
        "title": "Espíritu montañés",
        "description": "El amor por la naturaleza, por los Pirineos y por los momentos sencillos al aire libre."
      }
    ],
    "gallery": [
      "/permayou/facade.jpg",
      "/permayou/vallee.jpg",
      "/permayou/terrasse.jpg",
      "/permayou/chambre-double-vue.jpg",
      "/permayou/terrasse.jpg",
      "/permayou/terrasse-jardin.jpg",
      "/permayou/facade.jpg",
      "/permayou/vallee.jpg"
    ]
  },
  "services": {
    "hero": {
      "eyebrow": "El Hotel ★★",
      "title": "Ocho habitaciones al pie de las montañas",
      "description": "Un hotel acogedor de 8 habitaciones, varias de ellas con vistas a la montaña y una habitación accesible para personas con movilidad reducida. Etapa imprescindible del Valle de Aspe en el Camino de Santiago, ideal para senderistas, ciclistas y todos los viajeros de paso.",
      "image": ""
    },
    "services": [
      {
        "iconName": "BedDouble",
        "title": "Habitación Doble, Vista Montaña",
        "description": "Una habitación confortable con una cama grande y unas vistas despejadas a las cumbres pirenaicas. Ideal para una estancia en pareja.",
        "points": ["1 cama doble", "Vista a la montaña", "Baño privado"],
        "image": "/permayou/chambre-double-vue.jpg"
      },
      {
        "iconName": "BedDouble",
        "title": "Habitación Doble o con Camas Gemelas, Vista Montañas",
        "description": "Adaptable a sus necesidades: una cama grande o dos camas individuales, con una bonita vista al valle.",
        "points": ["Cama doble o 2 camas", "Vista a las montañas", "Configuración flexible"],
        "image": "/permayou/chambre-jumeaux.jpg"
      },
      {
        "iconName": "BedDouble",
        "title": "Habitación Triple, Vista Montaña",
        "description": "Espaciosa, perfecta para familias o grupos de amigos, con vistas a la montaña.",
        "points": ["Hasta 3 personas", "Vista a la montaña", "Espacio generoso"],
        "image": "/permayou/chambre-triple.jpg"
      },
      {
        "iconName": "BedDouble",
        "title": "Habitación Triple Clásica",
        "description": "Una habitación triple acogedora y funcional, ideal para una etapa confortable entre varios.",
        "points": ["Hasta 3 personas", "Confort acogedor", "Buena relación calidad-precio"],
        "image": "/permayou/chambre-familiale.jpg"
      },
      {
        "iconName": "Accessibility",
        "title": "Habitación Doble, Accesible para Movilidad Reducida",
        "description": "Una habitación doble especialmente acondicionada y accesible para personas con movilidad reducida, para una estancia tranquila.",
        "points": ["Acceso adaptado", "Equipamiento adaptado", "Planta baja"],
        "image": "/permayou/chambre-double.jpg"
      },
      {
        "iconName": "Coffee",
        "title": "Los servicios del hotel",
        "description": "Desayuno, media pensión, Wi-Fi gratuito en todas las habitaciones, punto de prensa (estanco y periódicos) y se admiten animales. Cada habitación dispone de televisor de pantalla plana, baño privado y secador de pelo.",
        "points": ["Desayuno y media pensión", "Wi-Fi gratuito · TV pantalla plana", "Animales admitidos · Punto de prensa"],
        "image": "/permayou/terrasse.jpg"
      }
    ]
  },
  "restaurant": {
    "hero": {
      "eyebrow": "El Restaurante",
      "title": "Una cocina tradicional, generosa y de producto local",
      "description": "En Le Permayou cocinamos los productos del Valle de Aspe y las especialidades del Béarn: garbure, palombe en temporada, carnes de la región. Una mesa acogedora abierta tanto a los viajeros como a los habitantes del valle, al mediodía y por la noche."
    },
    "sections": [
      {
        "iconName": "UtensilsCrossed",
        "title": "Nuestra cocina",
        "description": "Una cocina tradicional y de temporada, cocinada a fuego lento a partir de productos frescos y locales. Platos generosos que reconfortan tras una jornada de marcha, y especialidades del Valle de Aspe que cuentan la tierra.",
        "points": ["Productos frescos y de temporada", "Especialidades del Béarn", "Circuitos de proximidad"]
      },
      {
        "iconName": "Leaf",
        "title": "Productos de la tierra",
        "description": "Trabajamos con los productores del valle: quesos de oveja, embutidos, carnes y verduras de la región. Comer en Le Permayou es saborear el Valle de Aspe.",
        "points": ["Productores locales", "Quesos de oveja", "Carnes de la región"]
      },
      {
        "iconName": "Wine",
        "title": "Bar y snacking",
        "description": "¿Un poco de hambre entre dos rutas? El bar ofrece snacks, tablas y un aperitivo en la terraza frente a las montañas. La carta de bebidas destaca a los productores regionales.",
        "points": ["Tablas y snacks", "Aperitivo en la terraza", "Bebidas regionales"]
      }
    ],
    "hours": {
      "eyebrow": "Horario de servicio",
      "title": "Cuándo venir",
      "note": "En verano (de junio a septiembre), servicio al mediodía y por la noche. Se recomienda reservar, sobre todo en temporada. El horario del resto del año se precisará próximamente; no dude en ponerse en contacto con nosotros."
    }
  },
  "bar-terrasse": {
    "hero": {
      "eyebrow": "El Bar y la Terraza",
      "title": "Una copa frente al Circo de Iseye",
      "description": "La terraza de Le Permayou se abre a una de las vistas más bellas del valle: el Circo de Iseye. Un bar animado, abierto a todos, para el aperitivo, la pausa después de la ruta o simplemente un café al sol."
    },
    "sections": [
      {
        "iconName": "Mountain",
        "title": "La terraza y las vistas",
        "description": "Situada frente a las cumbres, la terraza es el corazón del albergue en cuanto llega el buen tiempo. Allí se toma el desayuno con tranquilidad, una comida al sol o una copa al atardecer sobre las montañas.",
        "points": ["Vista al Circo de Iseye", "Pleno sol", "Tranquilidad"]
      },
      {
        "iconName": "Wine",
        "title": "El bar",
        "description": "Un bar de pueblo, animado y acogedor, abierto tanto a los clientes del hotel como a los habitantes y viajeros de paso. Cervezas locales, vinos de la región y bebidas de la zona.",
        "points": ["Abierto a todos", "Cervezas y vinos locales", "Ambiente acogedor"]
      },
      {
        "iconName": "Coffee",
        "title": "Los momentos",
        "description": "El aperitivo entre amigos, la pausa de los ciclistas antes del puerto, el café de la mañana antes de la ruta, la copa al final del día: la terraza se presta a todos los momentos del día.",
        "points": ["Aperitivo y tapas", "Pausa ciclista", "Café de la mañana"]
      }
    ]
  },
  "vallee-aspe": {
    "hero": {
      "eyebrow": "El Valle de Aspe",
      "title": "Su campamento base en el Valle de Aspe",
      "description": "Senderismo, ciclismo, fauna salvaje y patrimonio: el Valle de Aspe es uno de los más preservados de los Pirineos. Desde el albergue, salga a explorar los senderos, los puertos y los pueblos del Béarn."
    },
    "activities": [
      {
        "iconName": "Footprints",
        "title": "Senderismo",
        "description": "Numerosos senderos con salida desde Accous, entre ellos el GR10 y el Camino de Santiago. El Circo de Iseye, los pastos de altura y los lagos de montaña están al alcance de una caminata."
      },
      {
        "iconName": "Bike",
        "title": "Ciclismo y cicloturismo",
        "description": "Etapa apreciada por los ciclistas: el puerto del Somport y el puerto del Pourtalet están cerca. El albergue es un punto de partida y de recuperación ideal."
      },
      {
        "iconName": "TreePine",
        "title": "Fauna y naturaleza",
        "description": "Osos, sarrios, buitres, marmotas: el valle alberga una fauna salvaje excepcional, en el corazón de un entorno de montaña preservado."
      },
      {
        "iconName": "Landmark",
        "title": "Patrimonio",
        "description": "Pueblos con encanto, el fuerte del Portalet, la estación internacional de Canfranc muy cerca de la frontera española: el valle también se descubre a través de su historia."
      }
    ]
  },
  "reserver": {
    "hero": {
      "eyebrow": "Reserva",
      "title": "Su estancia en Le Permayou",
      "description": "Una noche de etapa, un fin de semana o una semana en la montaña: reserve su habitación con unos pocos clics. Pago seguro y confirmación inmediata a través de nuestro motor de reservas."
    },
    "reassurance": [
      { "iconName": "ShieldCheck", "title": "Pago seguro", "description": "Reserva y pago protegidos." },
      { "iconName": "CalendarCheck", "title": "Confirmación inmediata", "description": "Su fecha queda bloqueada al instante." },
      { "iconName": "Phone", "title": "Reserva asistida", "description": "¿Alguna pregunta? Llámenos directamente." }
    ],
    "note": "Elija sus fechas, su habitación y pague en línea, sin salir del sitio. Para una solicitud de grupo o un seminario, póngase en contacto con nosotros directamente."
  },
  "contact": {
    "hero": {
      "eyebrow": "Contacto",
      "title": "Contáctenos",
      "description": "¿Una pregunta, una solicitud de reserva o un proyecto de grupo? Escríbanos o llámenos directamente, le responderemos rápidamente.",
      "image": ""
    }
  },
  "testimonials": {
    "testimonials": [
      { "name": "François-Samuel G.", "company": "Estancia en el hotel", "text": "Sinceramente, es el lugar imprescindible de la zona. Las habitaciones están impecables y son de una calma absoluta. La cocina con productos locales marca la diferencia. Excelente relación calidad-precio, ¡lo recomiendo!", "stars": 5 },
      { "name": "Guillaume R.", "company": "Estancia en familia", "text": "Magnífica estancia en el Valle de Aspe, en familia con nuestros 2 hijos, 3 noches en pensión completa. Muy buen restaurante, servicio rápido y habitaciones bien cuidadas con buenas camas. ¡Volveremos seguro!", "stars": 5 },
      { "name": "Abel Wolf", "company": "Vacaciones en familia", "text": "Una cocina excelente con productos locales. Servicio rápido, eficaz y con una sonrisa, todo en un entorno magnífico con vistas a las montañas. ¿Qué más se puede pedir?", "stars": 5 },
      { "name": "Anne Perez", "company": "Estancia en el hotel", "text": "Habitaciones sencillas pero limpias. Cocina excelente, la trucha estaba perfecta, y un desayuno copioso. El café de la casa es excelente. ¡Gracias por la acogida!", "stars": 5 },
      { "name": "F. Rose", "company": "Desayuno", "text": "Vinimos a desayunar: un personal de una amabilidad poco común y una amplia variedad de productos. Volveremos con gusto.", "stars": 5 },
      { "name": "Mickaël Brun", "company": "En el restaurante", "text": "Gran restaurante. Platos frescos, variados y deliciosos, y un equipo simpático y sonriente. ¡No nos arrepentimos de nuestra elección al azar!", "stars": 5 }
    ]
  }
}

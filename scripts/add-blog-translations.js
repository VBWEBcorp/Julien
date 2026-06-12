// scripts/add-blog-translations.js
//
// Ajoute les traductions EN + ES des 11 articles du Journal du Permayou.
// Chaque traduction PARTAGE le slug de l'article FR (URLs /blog/x, /en/blog/x,
// /es/blog/x + hreflang cohérents) et se distingue par `locale`.
//
// Prérequis : avoir migré l'index (node scripts/migrate-blog-slug-index.js)
// pour passer de `slug` unique global à `{ slug, locale }` unique.
//
// Lancer :  node scripts/add-blog-translations.js
//
// Idempotent : upsert par { slug, locale }. Liens internes préfixés par la
// locale (/en/blog/… , /es/blog/…). Aucun tiret cadratin.

const mongoose = require('mongoose')
require('dotenv').config({ path: '.env.local' })

const BlogPostSchema = new mongoose.Schema(
  {
    title: String,
    slug: String,
    locale: String,
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
  { timestamps: true, autoIndex: false }
)
const BlogPost =
  mongoose.models.BlogPost || mongoose.model('BlogPost', BlogPostSchema)

const U = (id, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

// Image de couverture + date, repris à l'identique des articles FR (clé = slug).
const META = {
  '5-randonnees-depart-permayou': { coverImage: U('1551632811-561732d1e306'), publishedAt: new Date('2026-04-10') },
  'cirque-iseye-decouverte': { coverImage: U('1506905925346-21bda4d32df4'), publishedAt: new Date('2026-04-22') },
  'col-du-somport-velo-accous': { coverImage: U('1469474968028-56623f02e42e'), publishedAt: new Date('2026-05-05') },
  'cuisine-saison-vallee-aspe': { coverImage: U('1504674900247-0877df9cc836'), publishedAt: new Date('2026-05-18') },
  'quand-venir-vallee-aspe': { coverImage: U('1464822759023-fed622ff2c3b'), publishedAt: new Date('2026-05-30') },
  'gr10-vallee-aspe-etape-permayou': { coverImage: U('1551632811-561732d1e306'), publishedAt: new Date('2026-06-09T08:00:00') },
  'observer-faune-pyrenees-vallee-aspe': { coverImage: U('1506905925346-21bda4d32df4'), publishedAt: new Date('2026-06-02T08:00:00') },
  'fromage-brebis-vallee-aspe-permayou': { coverImage: U('1504674900247-0877df9cc836'), publishedAt: new Date('2026-05-26T08:00:00') },
  'venir-vallee-aspe-train-bedous': { coverImage: U('1469474968028-56623f02e42e'), publishedAt: new Date('2026-05-19T08:00:00') },
  'estives-transhumance-vallee-aspe': { coverImage: U('1464822759023-fed622ff2c3b'), publishedAt: new Date('2026-05-12T08:00:00') },
  'chemin-compostelle-somport-permayou': { coverImage: U('1455587734955-081b22074882'), publishedAt: new Date('2026-04-28T08:00:00') },
}

// ─── ENGLISH ───────────────────────────────────────────────────────────────
const EN = [
  {
    slug: '5-randonnees-depart-permayou',
    title: 'Five hikes starting right from Le Permayou',
    excerpt: 'From an easy family loop to a big high-altitude day, here are our five favourite hikes you can start straight from the inn, without taking the car.',
    content: `<p>One of the great things about Le Permayou is being able to lace up your boots and set off walking the moment you step outside. Here are five ideas, from a gentle stroll to a more demanding day out.</p><h2>1. The Accous loop (easy, 2 hrs)</h2><p>A gentle loop around the village, perfect at the end of the day or for families. You follow the mountain stream, cross the meadows and enjoy a lovely view of the peaks.</p><h2>2. The Lhers plateau (moderate, half-day)</h2><p>A vast high-altitude plateau known for its peace and its wildlife. With a bit of luck you will spot izards and, in summer, the flocks up on the high pastures.</p><h2>3. The Camino de Santiago (a stage)</h2><p>Le Permayou is a natural stopover on the Arles Way towards the Somport pass. An easy stretch lets you sample the spirit of the trail with a light pack.</p><h2>4. Towards the Cirque d'Iseye (moderate plus, full day)</h2><p>Our favourite: a gradual climb up to the mountain amphitheatre of the Cirque d'Iseye. Bring a picnic: we can put one together for you.</p><h2>5. A summit for seasoned walkers (hard)</h2><p>For the fittest, several summits can be reached in a day. Ask us for advice over breakfast, depending on the weather and your level.</p><p>On the way back, the terrace and a good meal are waiting for you. Happy walking!</p>`,
    category: 'Hiking & trails',
    tags: ['hiking', 'GR10', 'Aspe Valley', 'mountains'],
    metaTitle: 'Five hikes from the Le Permayou inn (Aspe Valley)',
    metaDescription: "Our five favourite hikes starting from Le Permayou in Accous: from the village loop to the Cirque d'Iseye, via the GR10 and the Camino de Santiago.",
  },
  {
    slug: 'cirque-iseye-decouverte',
    title: "The Cirque d'Iseye: what to see and how to get there",
    excerpt: 'A natural amphitheatre in the Aspe Valley, the Cirque d\'Iseye is one of the finest landscapes around. Here is how to discover it.',
    content: `<p>The Cirque d'Iseye is one of those views that justify a stay in the Aspe Valley all on their own. Here is the essential to make the most of it.</p><h2>An amphitheatre of mountains</h2><p>Carved by glacial erosion, the cirque forms a wall of peaks down which waterfalls and torrents tumble in spring. The morning light there is especially beautiful.</p><h2>How to get there</h2><p>From the inn, allow a full day there and back for regular walkers. The route climbs steadily through forests and high pastures. Good boots and water are essential.</p><h2>When to go</h2><p>From late June to October for ideal conditions. Early in the season the waterfalls are at their most spectacular; in autumn the colours are superb.</p><h2>Our tips</h2><p>Set off early, take a picnic (we can prepare one the evening before) and check the weather: in the mountains it changes fast. On your return, the terrace at Le Permayou is the perfect place to savour the memory of the day.</p>`,
    category: 'Aspe Valley & events',
    tags: ["Cirque d'Iseye", 'landscape', 'hiking', 'Pyrenees'],
    metaTitle: "Cirque d'Iseye: discovery and access from the Aspe Valley",
    metaDescription: "Everything about the Cirque d'Iseye: what to see, how to get there from Accous and when to go. A must-see in the Aspe Valley.",
  },
  {
    slug: 'col-du-somport-velo-accous',
    title: 'Cycling stage: climbing the Somport pass from Accous',
    excerpt: 'The Somport pass is a legendary Pyrenean climb. Starting from Accous, Le Permayou is the ideal base camp for cyclists.',
    content: `<p>On the border between France and Spain, the Somport pass (1,632 m) draws cycling enthusiasts every year. From Accous, the inn is perfectly placed to make it your starting point.</p><h2>The profile of the climb</h2><p>The ascent runs at a steady gradient along the valley, which makes it a demanding but accessible col for trained cyclists. The scenery shifts from forests to wide-open high country.</p><h2>Why stay at Le Permayou</h2><p>Bike storage, a direct start from the inn, a hearty breakfast to get going and generous cooking to recover in the evening: everything is designed for sporty guests. We can also put together a snack for the road.</p><h2>Other possible rides</h2><p>The Somport is just a beginning: the Aspe Valley and its surroundings offer many routes, from the most rolling to the steepest. Ask us about our favourite itineraries.</p><p>After the effort, the terrace facing the mountains is waiting for you.</p>`,
    category: 'Cycling',
    tags: ['cycling', 'Somport pass', 'road cycling', 'Pyrenees'],
    metaTitle: 'Somport pass by bike from Accous | cycling stage at Le Permayou',
    metaDescription: 'Climbing the Somport pass from Accous: profile, tips and why Le Permayou is the ideal base camp for cyclists in the Aspe Valley.',
  },
  {
    slug: 'cuisine-saison-vallee-aspe',
    title: 'Our seasonal cooking: the produce of the Aspe Valley',
    excerpt: 'Garbure, mountain cheeses, local meats... At Le Permayou, we cook the valley. A quick tour of what we put on your plate.',
    content: `<p>Eating at Le Permayou means tasting the Aspe Valley. As far as we can, we work with local producers, in step with the seasons.</p><h2>Garbure, our signature dish</h2><p>This hearty Bearn soup (cabbage, vegetables, beans and meat) warms walkers and regulars alike. A generous classic we never tire of serving.</p><h2>Local produce</h2><p>Mountain ewe's-milk cheeses, regional charcuterie, mountain honey, seasonal vegetables: the valley is full of know-how. In season, wood pigeon and local meats join the menu.</p><h2>Cooking that follows the seasons</h2><p>Our menu changes regularly with the best of what we find. That is why we offer a menu of the moment and a menu of the week, updated as fresh produce arrives.</p><h2>A table for everyone</h2><p>Hotel guests, passing hikers or valley locals: the table at Le Permayou is open at lunch and dinner, in a simple and friendly atmosphere.</p>`,
    category: 'Dining',
    tags: ['cooking', 'local produce', 'garbure', 'terroir'],
    metaTitle: 'Seasonal cooking at Le Permayou | produce of the Aspe Valley',
    metaDescription: "Garbure, mountain cheeses, local meats: discover Le Permayou's seasonal cooking, made with local produce from the Aspe Valley.",
  },
  {
    slug: 'quand-venir-vallee-aspe',
    title: 'When to visit the Aspe Valley: a season-by-season guide',
    excerpt: 'Summer hiking, autumn colours, winter calm, spring awakening: every season has its charm in the Aspe Valley. Our guide to help you choose.',
    content: `<p>"When should we come?" We are often asked the question. The truth is that the Aspe Valley can be enjoyed all year round: it all depends on what you are looking for.</p><h2>Summer (June to September)</h2><p>The high season for hiking and cycling. The trails are clear, the high pastures lively and the terraces full of life. The inn is open from 7 am to 11 pm. Remember to book, especially in July and August.</p><h2>Autumn</h2><p>Our favourite season for the colours: the forests catch fire, the light is soft and the trails quieter. Ideal for lovers of nature and photography.</p><h2>Winter</h2><p>The calm of snow-capped mountains, perfect for recharging by the fire. The nearby ski resorts will delight snow lovers.</p><h2>Spring</h2><p>The valley wakes up: waterfalls swollen by the thaw, flower-filled meadows and the first fine days. A season full of promise.</p><p>Whatever the time of year, we welcome you with the same pleasure. See you very soon at Le Permayou!</p>`,
    category: 'Tips & seasons',
    tags: ['seasons', 'Aspe Valley', 'stay', 'tips'],
    metaTitle: 'When to visit the Aspe Valley? A season guide | Le Permayou',
    metaDescription: 'Summer, autumn, winter, spring: our guide to choosing the best season to stay in the Aspe Valley at Le Permayou, in Accous.',
  },
  {
    slug: 'gr10-vallee-aspe-etape-permayou',
    title: 'The GR10 in the Aspe Valley: stopping over at Le Permayou',
    excerpt: 'The GR10 crosses the Pyrenees from one ocean to the other and passes through the Aspe Valley. Here is why Le Permayou is the ideal place to rest between two days of walking.',
    content: `<p>The GR10 is the great traverse of the Pyrenees, from Hendaye on the Atlantic to Banyuls on the Mediterranean. Along the way, the trail drops down into the Aspe Valley, and that is where we come in: Le Permayou is a natural stopover for long-distance walkers.</p><h2>A stopover designed for hikers</h2><p>After a long day of climbing, you appreciate a real bed, a hot shower and a hearty meal. At the inn, we welcome walkers the way we like to be welcomed in the mountains: no fuss, with a room to dry your gear and a solid breakfast to set off on the right foot.</p><h2>Planning your pack and your route</h2><p>The GR10 can be enjoyed in sections or in one go for the most seasoned. If you want to explore around the inn before getting back on the main route, take a look at our <a href="/en/blog/5-randonnees-depart-permayou">five hikes starting from Le Permayou</a>: plenty to vary the pleasure on a lighter day.</p><h2>When to pass through the valley</h2><p>The ideal window for the GR10 in this area runs from June to September, when the passes are clear. To fine-tune your timing, our <a href="/en/blog/quand-venir-vallee-aspe">season-by-season guide to the Aspe Valley</a> will help you choose.</p><h2>Eating well before setting off again</h2><p>Walking builds an appetite. In the evening we pull out all the stops with <a href="/en/blog/cuisine-saison-vallee-aspe">seasonal cooking made from valley produce</a>. Garbure, ewe's-milk cheese and homemade dessert: enough to recharge before the next stage. See you soon on the trail!</p>`,
    category: 'Hiking & trails',
    tags: ['GR10', 'long-distance hiking', 'Aspe Valley', 'stopover'],
    metaTitle: 'GR10 in the Aspe Valley: stop over at Le Permayou (Accous)',
    metaDescription: 'The GR10 passes through the Aspe Valley: why Le Permayou is the ideal stopover for hikers (welcome, meals, route tips).',
  },
  {
    slug: 'observer-faune-pyrenees-vallee-aspe',
    title: 'Griffon vultures, izards and marmots: watching Pyrenean wildlife',
    excerpt: 'The Aspe Valley is a balcony over the wild fauna of the Pyrenees. Griffon vultures, izards, marmots: here is where and when to keep your eyes open around the inn.',
    content: `<p>Look up at the right moment and you might meet the gaze of an izard or see a griffon vulture wheeling above the ridges. The Aspe Valley, at the gateway to the Pyrenees National Park, is one of the best places in France to watch mountain wildlife.</p><h2>Griffon vultures, kings of the sky</h2><p>With a wingspan of nearly three metres, the griffon vulture glides effortlessly along the cliffs. They are easy to spot in the middle of the day, when the thermals carry them. The bearded vulture, rarer, takes more patience.</p><h2>Izards and marmots up high</h2><p>The izard, the Pyrenean cousin of the chamois, frequents grassy slopes and scree. Early in the morning or late in the day, it shows itself more readily. Marmots give themselves away with a shrill whistle before darting underground.</p><h2>Where to watch around the inn</h2><p>The heights of the Cirque d'Iseye offer a magnificent vantage point: we explain it all in our article on <a href="/en/blog/cirque-iseye-decouverte">the Cirque d'Iseye and how to get there</a>. Several of our <a href="/en/blog/5-randonnees-depart-permayou">hikes starting from Le Permayou</a> also cross areas good for wildlife watching.</p><h2>Our tips so you don't miss a thing</h2><p>Bring binoculars, keep your distance and stay discreet: wild fauna is earned through patience. Before you set off, ask us where the animals have been seen in recent days, we keep a close eye on it. Happy watching!</p>`,
    category: 'Aspe Valley & events',
    tags: ['wildlife', 'vultures', 'izards', 'Pyrenees National Park'],
    metaTitle: 'Watching Pyrenean wildlife in the Aspe Valley | Le Permayou',
    metaDescription: 'Griffon vultures, izards, marmots: where and when to watch the wild fauna of the Aspe Valley around the Le Permayou inn, in Accous.',
  },
  {
    slug: 'fromage-brebis-vallee-aspe-permayou',
    title: "Aspe Valley ewe's-milk cheese at the table of Le Permayou",
    excerpt: "Firm paste, nutty flavour, a worked rind: the ewe's-milk cheese of the high pastures is a pride of the Aspe Valley. Here is the story of the one we serve at the inn.",
    content: `<p>If one product sums up the Aspe Valley on a plate, it is ewe's-milk cheese. Made from raw milk and patiently aged, it carries within it the taste of the high pastures and the know-how of the shepherds. At the table of Le Permayou, we have made it a point of pride.</p><h2>A cheese born in the high pastures</h2><p>In summer, the flocks climb to the high-altitude pastures. The milk of the ewes grazing this rich grass gives a cheese with a unique character, in the great Ossau-Iraty family. Each producer has their own hand, their own cellars, their own grain.</p><h2>How to enjoy it</h2><p>Plain, at the end of a meal, it stands on its own. But we also love it with a spoonful of black cherry jam, in the Basque and Bearn way. A real moment, simple and generous, worthy of the table we want to share.</p><h2>From pasture to plate</h2><p>This cheese is part of a whole local cuisine: find our other specialities in the article on <a href="/en/blog/cuisine-saison-vallee-aspe">our seasonal cooking and the produce of the valley</a>. And to understand where this milk comes from, read our article on <a href="/en/blog/estives-transhumance-vallee-aspe">the high pastures and transhumance</a>.</p><h2>Meeting the producers</h2><p>Several valley farms open their doors and sell directly. We are happy to point you to our favourite addresses so you can leave with a good piece in your bag. Something to extend the stay, long after the last bite.</p>`,
    category: 'Dining',
    tags: ['cheese', 'ewe', 'Ossau-Iraty', 'terroir'],
    metaTitle: "Aspe Valley ewe's-milk cheese | The table of Le Permayou",
    metaDescription: "Ossau-Iraty, raw-milk mountain cheese: the story and tasting of the Aspe Valley ewe's-milk cheese, served at the Le Permayou inn.",
  },
  {
    slug: 'venir-vallee-aspe-train-bedous',
    title: 'Reaching the Aspe Valley without a car: the train to Bedous',
    excerpt: 'You can reach the Aspe Valley by train as far as Bedous, then finish by bus or bike. Here is how to plan a stay at Le Permayou without getting behind the wheel.',
    content: `<p>Good news for those who would rather leave the car in the garage: the Aspe Valley can be reached by public transport. The railway line runs up to Bedous, just a few kilometres from the inn. Here is how to organise your trip.</p><h2>The train to Bedous</h2><p>From Pau, the train serves the Aspe Valley as far as Bedous station, the end of the line. It is a refreshing arrival: you step off the carriage at the foot of the mountains, the air changes, and so does the pace.</p><h2>The last few kilometres to Accous</h2><p>From Bedous to Le Permayou, in Accous, there is only a short distance left. A bus service links the valley, and we can advise you on the timetables. In fine weather, it is also a lovely stretch to ride by bike along the gave.</p><h2>Coming by bike, the smart option</h2><p>The valley lends itself wonderfully to cycle touring. If two wheels tempt you, read our article on <a href="/en/blog/col-du-somport-velo-accous">the climb up the Somport pass from Accous</a>: the inn is a perfect base camp, bike storage included.</p><h2>Choosing the right time</h2><p>Depending on the season, train and bus frequencies vary. To time your stay, our <a href="/en/blog/quand-venir-vallee-aspe">season-by-season guide to the Aspe Valley</a> will set the tempo. And once you are here, everything is done on foot or by bike: the real luxury is slowing down.</p>`,
    category: 'Tips & seasons',
    tags: ['access', 'train', 'Bedous', 'car-free'],
    metaTitle: 'Reaching the Aspe Valley by train (Bedous) | Le Permayou',
    metaDescription: 'Reaching the Aspe Valley without a car: train to Bedous, bus and bike to Accous. All our tips for a car-free stay at Le Permayou.',
  },
  {
    slug: 'estives-transhumance-vallee-aspe',
    title: 'High pastures and transhumance: the pastoral summer of the Aspe Valley',
    excerpt: 'Every summer, the flocks climb to the high-altitude pastures. Transhumance has shaped life in the Aspe Valley for centuries. The story of a living tradition.',
    content: `<p>In spring, the same movement starts again across the Aspe Valley: ewes, cows and horses leave the valley floor to reach the high pastures, the "estives", where they will spend the summer. Transhumance is the beating heart of the Pyrenean mountains.</p><h2>A centuries-old tradition</h2><p>For generations, shepherds have led their animals up to the heights as soon as the snow frees the grass. Up there, the flock enjoys rich grass all summer, under the watch of shepherds living in the mountain huts.</p><h2>What it changes on the plate</h2><p>This high-altitude grass is the whole secret of the taste of the valley's produce. The milk of the ewes on the high pastures gives the famous cheese we talk about in our article on <a href="/en/blog/fromage-brebis-vallee-aspe-permayou">the ewe's-milk cheese of the Aspe Valley</a>. Eating here means tasting that link between the mountain and the table directly.</p><h2>Meeting the flocks while hiking</h2><p>In summer, many of our routes cross grazing areas. You may come across a flock, a patou (the guard dog) or a shepherd. Our <a href="/en/blog/5-randonnees-depart-permayou">hikes starting from Le Permayou</a> pass through several of these plateaus, such as Lhers.</p><h2>Respecting the pastoral mountain</h2><p>The mountain is a workplace as much as a playground. Go around the flocks, keep dogs on a lead and close the gates behind you. This mutual respect is what makes a stay here beautiful, between nature and know-how.</p>`,
    category: 'Aspe Valley & events',
    tags: ['high pastures', 'transhumance', 'pastoralism', 'cheese'],
    metaTitle: 'High pastures and transhumance in the Aspe Valley | Le Permayou',
    metaDescription: "Transhumance and the high pastures shape summer in the Aspe Valley: pastoral tradition, ewe's-milk cheese and encounters while hiking around Le Permayou.",
  },
  {
    slug: 'chemin-compostelle-somport-permayou',
    title: 'The Camino de Santiago via the Somport: a stop at Le Permayou',
    excerpt: 'The Arles Way to Santiago de Compostela crosses the Pyrenees at the Somport pass, passing through the Aspe Valley. Le Permayou is a natural stop for pilgrims.',
    content: `<p>Since the Middle Ages, pilgrims have crossed the Aspe Valley on their way to Santiago de Compostela. The Arles Way, one of the four great French routes, crosses the border at the Somport pass before dropping into Spain. The inn sits right on this route.</p><h2>The Arles Way and the Somport</h2><p>This historic path climbs the Aspe Valley up to the Somport pass, at 1,632 metres of altitude. It is one of the wildest and most beautiful sections of the pilgrimage, between forests, high pastures and wide-open high country.</p><h2>A stop along the way</h2><p>Walking to Compostela means moving at your own pace, stage after stage. At Le Permayou, we welcome pilgrims like all other walkers: a comfortable bed, a hot meal and what you need to set off again with a light heart. The Camino de Santiago is in fact one of our <a href="/en/blog/5-randonnees-depart-permayou">itineraries starting from the inn</a>.</p><h2>Pilgrims and cyclists, the same pass</h2><p>The Somport is also a legendary pass for cycling enthusiasts. If the climb tempts you on two wheels rather than on foot, read our article on <a href="/en/blog/col-du-somport-velo-accous">the ascent of the Somport pass from Accous</a>.</p><h2>Taking your time</h2><p>Whether you walk the whole route or just a section, the Aspe Valley invites you to slow down. Put down your pack, share a meal, set off rested. Buen camino, and see you soon at Le Permayou!</p>`,
    category: 'Hiking & trails',
    tags: ['Camino de Santiago', 'St James', 'Arles Way', 'Somport'],
    metaTitle: 'Camino de Santiago via the Somport | A stop at Le Permayou',
    metaDescription: 'The Arles Way to Compostela crosses the Somport pass through the Aspe Valley: Le Permayou, in Accous, is an ideal stop for pilgrims.',
  },
]

// ─── ESPAÑOL ─────────────────────────────────────────────────────────────────
const ES = [
  {
    slug: '5-randonnees-depart-permayou',
    title: 'Cinco rutas de senderismo saliendo de Le Permayou',
    excerpt: 'Desde un sendero familiar hasta una gran jornada de altura, estas son nuestras cinco rutas preferidas para hacer directamente desde el albergue, sin coger el coche.',
    content: `<p>Una de las grandes ventajas de Le Permayou es poder calzarse las botas y salir a caminar nada más salir del albergue. Aquí van cinco ideas, desde el paseo tranquilo hasta la jornada más exigente.</p><h2>1. La vuelta a Accous (fácil, 2 h)</h2><p>Un bucle suave alrededor del pueblo, ideal al final del día o para las familias. Se bordea el río, se cruzan las praderas y se disfruta de una bonita vista de las cumbres.</p><h2>2. La meseta de Lhers (media, media jornada)</h2><p>Una gran meseta de altura conocida por su tranquilidad y su fauna. Con un poco de suerte, verá sarrios y, en verano, los rebaños en los pastos de altura.</p><h2>3. El Camino de Santiago (una etapa)</h2><p>Le Permayou es una etapa natural en la vía de Arlés hacia el puerto de Somport. Un tramo accesible permite saborear el ambiente del Camino, con mochila ligera.</p><h2>4. Hacia el Circo de Iseye (media alta, jornada)</h2><p>Nuestro flechazo: una subida progresiva hasta el anfiteatro de montañas del Circo de Iseye. Lleve el picnic: podemos prepararlo.</p><h2>5. Una cumbre para caminantes experimentados (difícil)</h2><p>Para los más deportistas, varias cumbres se alcanzan en una jornada. Pídanos consejo en el desayuno según el tiempo y su nivel.</p><p>A la vuelta, la terraza y una buena comida le esperan. ¡Buena marcha!</p>`,
    category: 'Senderismo y rutas',
    tags: ['senderismo', 'GR10', 'valle de Aspe', 'montaña'],
    metaTitle: 'Cinco rutas desde el albergue Le Permayou (valle de Aspe)',
    metaDescription: 'Nuestras cinco rutas preferidas saliendo de Le Permayou en Accous: de la vuelta al pueblo al Circo de Iseye, pasando por el GR10 y el Camino de Santiago.',
  },
  {
    slug: 'cirque-iseye-decouverte',
    title: 'El Circo de Iseye: qué ver y cómo llegar',
    excerpt: 'Anfiteatro natural del valle de Aspe, el Circo de Iseye es uno de los paisajes más bellos de los alrededores. Manual para descubrirlo.',
    content: `<p>El Circo de Iseye es una de esas vistas que por sí solas justifican una estancia en el valle de Aspe. Aquí va lo esencial para disfrutarlo.</p><h2>Un anfiteatro de montañas</h2><p>Formado por la erosión glaciar, el circo dibuja una muralla de cumbres por la que se precipitan cascadas y torrentes en primavera. La luz de la mañana allí es especialmente bella.</p><h2>Cómo llegar</h2><p>Desde el albergue, cuente una jornada de ida y vuelta a pie para caminantes habituales. El itinerario sube de forma regular a través de bosques y pastos de altura. Un buen calzado y agua son imprescindibles.</p><h2>Cuándo ir</h2><p>De finales de junio a octubre para unas condiciones ideales. A principios de temporada, las cascadas son las más espectaculares; en otoño, los colores son magníficos.</p><h2>Nuestros consejos</h2><p>Salga temprano, lleve un picnic (podemos prepararlo la víspera) e infórmese del tiempo: en la montaña cambia rápido. A su regreso, la terraza de Le Permayou es el lugar perfecto para saborear el recuerdo de la jornada.</p>`,
    category: 'Valle de Aspe y eventos',
    tags: ['Circo de Iseye', 'paisaje', 'senderismo', 'Pirineos'],
    metaTitle: 'Circo de Iseye: descubrimiento y acceso desde el valle de Aspe',
    metaDescription: 'Todo sobre el Circo de Iseye: qué ver, cómo llegar desde Accous y cuándo ir. Un imprescindible del valle de Aspe.',
  },
  {
    slug: 'col-du-somport-velo-accous',
    title: 'Etapa ciclista: subir el puerto de Somport desde Accous',
    excerpt: 'El puerto de Somport es una ascensión mítica de los Pirineos. Saliendo de Accous, Le Permayou es el campo base ideal para los ciclistas.',
    content: `<p>Frontera entre Francia y España, el puerto de Somport (1632 m) atrae cada año a los aficionados al ciclismo. Desde Accous, el albergue está perfectamente situado para convertirlo en su punto de partida.</p><h2>El perfil de la ascensión</h2><p>La subida se hace con pendiente regular a lo largo del valle, lo que la convierte en un puerto exigente pero accesible para ciclistas entrenados. El paisaje evoluciona de los bosques a los grandes espacios de altura.</p><h2>Por qué alojarse en Le Permayou</h2><p>Local para bicicletas, salida directa desde el albergue, desayuno copioso para empezar bien y cocina generosa para recuperarse por la noche: todo está pensado para los deportistas. También podemos prepararle un tentempié para la ruta.</p><h2>Las otras salidas posibles</h2><p>El Somport es solo un comienzo: el valle de Aspe y sus alrededores ofrecen numerosos recorridos, del más rodador al más empinado. Pregúntenos por nuestros itinerarios preferidos.</p><p>Tras el esfuerzo, la terraza frente a las montañas le espera.</p>`,
    category: 'Ciclismo',
    tags: ['ciclismo', 'puerto de Somport', 'cicloturismo', 'Pirineos'],
    metaTitle: 'Puerto de Somport en bici desde Accous | etapa ciclista en Le Permayou',
    metaDescription: 'Subir el puerto de Somport desde Accous: perfil, consejos y por qué Le Permayou es el campo base ideal para los ciclistas en el valle de Aspe.',
  },
  {
    slug: 'cuisine-saison-vallee-aspe',
    title: 'Nuestra cocina de temporada: los productos del valle de Aspe',
    excerpt: 'Garbure, quesos de altura, carnes del país... En Le Permayou, cocinamos el valle. Un pequeño repaso de lo que ponemos en su plato.',
    content: `<p>Comer en Le Permayou es saborear el valle de Aspe. Trabajamos en la medida de lo posible con los productores de la zona, al ritmo de las estaciones.</p><h2>La garbure, nuestro imprescindible</h2><p>Esta sopa bearnesa completa (col, verduras, alubias y carne) reconforta tanto a los caminantes como a los habituales. Un clásico generoso que no nos cansamos de servir.</p><h2>Los productos del terruño</h2><p>Quesos de oveja de altura, embutidos del país, miel de montaña, verduras de temporada: el valle rebosa de saber hacer. En temporada, la paloma torcaz y las carnes locales se suman a la carta.</p><h2>Una cocina que sigue las estaciones</h2><p>Nuestra carta evoluciona con regularidad según lo mejor que encontramos. Por eso ofrecemos una carta del momento y una carta de la semana, actualizadas según las llegadas de producto.</p><h2>A la mesa, para todos</h2><p>Clientes del hotel, senderistas de paso o vecinos del valle: la mesa de Le Permayou está abierta a mediodía y por la noche, en un ambiente sencillo y acogedor.</p>`,
    category: 'La mesa',
    tags: ['cocina', 'productos locales', 'garbure', 'terruño'],
    metaTitle: 'Cocina de temporada en Le Permayou | productos del valle de Aspe',
    metaDescription: 'Garbure, quesos de altura, carnes del país: descubra la cocina de temporada de Le Permayou, a base de productos locales del valle de Aspe.',
  },
  {
    slug: 'quand-venir-vallee-aspe',
    title: 'Cuándo venir al valle de Aspe: la guía por estación',
    excerpt: 'Senderismo estival, colores de otoño, calma del invierno, despertar de la primavera: cada estación tiene su encanto en el valle de Aspe. Nuestra guía para elegir.',
    content: `<p>«¿Cuándo hay que venir?» Nos hacen a menudo la pregunta. La verdad es que el valle de Aspe se descubre todo el año: todo depende de lo que busque.</p><h2>El verano (de junio a septiembre)</h2><p>La temporada alta del senderismo y el ciclismo. Los senderos están despejados, los pastos de altura animados y las terrazas llenas de vida. El albergue abre de 7 a 23 h. Conviene reservar, sobre todo en julio y agosto.</p><h2>El otoño</h2><p>Nuestra estación preferida por los colores: los bosques se encienden, la luz es suave y los senderos más tranquilos. Ideal para los amantes de la naturaleza y la fotografía.</p><h2>El invierno</h2><p>La calma de las montañas nevadas, perfecta para reponer fuerzas junto al fuego. Las estaciones de esquí cercanas harán las delicias de los amantes de la nieve.</p><h2>La primavera</h2><p>El valle se despierta: cascadas crecidas por el deshielo, praderas floridas y los primeros días buenos. Una estación llena de promesas.</p><p>Sea cual sea la época, le recibimos con el mismo placer. ¡Hasta muy pronto en Le Permayou!</p>`,
    category: 'Consejos y temporada',
    tags: ['estaciones', 'valle de Aspe', 'estancia', 'consejos'],
    metaTitle: '¿Cuándo venir al valle de Aspe? Guía por estación | Le Permayou',
    metaDescription: 'Verano, otoño, invierno, primavera: nuestra guía para elegir la mejor estación para alojarse en el valle de Aspe en Le Permayou, en Accous.',
  },
  {
    slug: 'gr10-vallee-aspe-etape-permayou',
    title: 'El GR10 en el valle de Aspe: hacer etapa en Le Permayou',
    excerpt: 'El GR10 cruza los Pirineos de un océano al otro y pasa por el valle de Aspe. Estas son las razones por las que Le Permayou es la etapa ideal para descansar entre dos jornadas de marcha.',
    content: `<p>El GR10 es la gran travesía de los Pirineos, de Hendaya en el Atlántico a Banyuls en el Mediterráneo. Por el camino, el sendero baja al valle de Aspe, y ahí es donde entramos en juego: Le Permayou es una etapa natural para los caminantes de largo recorrido.</p><h2>Una etapa pensada para los senderistas</h2><p>Tras una larga jornada de desnivel, se agradece una cama de verdad, una ducha caliente y una comida copiosa. En el albergue, recibimos a los caminantes como nos gusta que nos reciban en la montaña: sin complicaciones, con un local para secar el material y un desayuno sólido para salir con buen pie.</p><h2>Preparar la mochila y el itinerario</h2><p>El GR10 se saborea por tramos o de una sola vez para los más experimentados. Si quiere irradiar desde el albergue antes de retomar el gran itinerario, eche un vistazo a nuestras <a href="/es/blog/5-randonnees-depart-permayou">cinco rutas saliendo de Le Permayou</a>: para variar el placer en una jornada más ligera.</p><h2>Cuándo pasar por el valle</h2><p>La ventana ideal para el GR10 en la zona va de junio a septiembre, cuando los puertos están despejados. Para afinar sus fechas, nuestra <a href="/es/blog/quand-venir-vallee-aspe">guía de las estaciones en el valle de Aspe</a> le ayudará a elegir.</p><h2>Comer bien antes de volver a salir</h2><p>Caminar abre el apetito. Por la noche echamos el resto con una <a href="/es/blog/cuisine-saison-vallee-aspe">cocina de temporada hecha con productos del valle</a>. Garbure, queso de oveja y postre casero: lo justo para recargar antes de la siguiente etapa. ¡Hasta pronto en el sendero!</p>`,
    category: 'Senderismo y rutas',
    tags: ['GR10', 'senderismo de largo recorrido', 'valle de Aspe', 'etapa'],
    metaTitle: 'GR10 en el valle de Aspe: hacer etapa en Le Permayou (Accous)',
    metaDescription: 'El GR10 pasa por el valle de Aspe: por qué Le Permayou es la etapa ideal para los senderistas (acogida, comidas, consejos de itinerario).',
  },
  {
    slug: 'observer-faune-pyrenees-vallee-aspe',
    title: 'Buitres, sarrios y marmotas: observar la fauna de los Pirineos',
    excerpt: 'El valle de Aspe es un balcón sobre la fauna salvaje de los Pirineos. Buitres leonados, sarrios, marmotas: aquí va dónde y cuándo abrir el ojo alrededor del albergue.',
    content: `<p>Levantar la vista en el momento adecuado es a veces cruzarse con la mirada de un sarrio o ver planear a un buitre leonado por encima de las crestas. El valle de Aspe, a las puertas del Parque Nacional de los Pirineos, es uno de los mejores lugares de Francia para observar la fauna de montaña.</p><h2>Los buitres leonados, reyes del cielo</h2><p>Con casi tres metros de envergadura, el buitre leonado planea sin esfuerzo a lo largo de los acantilados. Se localizan con facilidad a mediodía, cuando las corrientes cálidas los elevan. El quebrantahuesos, más raro, hay que merecerlo más.</p><h2>Sarrios y marmotas en altura</h2><p>El sarrio, primo pirenaico del rebeco, frecuenta las laderas herbosas y los pedregales. Temprano por la mañana o al final del día, se deja ver con más facilidad. Las marmotas se delatan con un silbido estridente antes de escabullirse bajo tierra.</p><h2>Dónde observar alrededor del albergue</h2><p>Las alturas del Circo de Iseye ofrecen un mirador magnífico: lo explicamos todo en nuestro artículo sobre <a href="/es/blog/cirque-iseye-decouverte">el Circo de Iseye y cómo llegar</a>. Varias de nuestras <a href="/es/blog/5-randonnees-depart-permayou">rutas saliendo de Le Permayou</a> atraviesan también zonas propicias para la observación.</p><h2>Nuestros consejos para no perderse nada</h2><p>Lleve prismáticos, mantenga las distancias y sea discreto: la fauna salvaje se merece con paciencia. Antes de salir, pregúntenos dónde se han visto los animales estos últimos días, lo seguimos de cerca. ¡Buenas observaciones!</p>`,
    category: 'Valle de Aspe y eventos',
    tags: ['fauna', 'buitres', 'sarrios', 'Parque Nacional de los Pirineos'],
    metaTitle: 'Observar la fauna de los Pirineos en el valle de Aspe | Le Permayou',
    metaDescription: 'Buitres leonados, sarrios, marmotas: dónde y cuándo observar la fauna salvaje del valle de Aspe alrededor del albergue Le Permayou, en Accous.',
  },
  {
    slug: 'fromage-brebis-vallee-aspe-permayou',
    title: 'El queso de oveja del valle de Aspe en la mesa de Le Permayou',
    excerpt: 'Pasta firme, sabor a avellana, corteza trabajada: el queso de oveja de los pastos de altura es un orgullo del valle de Aspe. Le contamos el que servimos en el albergue.',
    content: `<p>Si hay un producto que resume el valle de Aspe en un plato, es el queso de oveja. Elaborado con leche cruda y afinado con paciencia, lleva en sí el sabor de los pastos de altura y el saber hacer de los pastores. En la mesa de Le Permayou, lo hemos convertido en un orgullo.</p><h2>Un queso nacido en los pastos de altura</h2><p>En verano, los rebaños suben a los pastos de altitud. La leche de las ovejas que pacen esa hierba rica da un queso de carácter único, en la gran familia del Ossau-Iraty. Cada productor tiene su mano, sus bodegas, su grano.</p><h2>Cómo degustarlo</h2><p>Solo, al final de la comida, se basta a sí mismo. Pero también nos gusta con una cucharada de mermelada de cereza negra, a la manera vasco-bearnesa. Un verdadero momento, sencillo y generoso, a la altura de la mesa que queremos compartir.</p><h2>Del prado al plato</h2><p>Este queso se inscribe en toda una cocina del terruño: encuentre nuestras otras especialidades en el artículo sobre <a href="/es/blog/cuisine-saison-vallee-aspe">nuestra cocina de temporada y los productos del valle</a>. Y para entender de dónde viene esta leche, lea nuestro artículo sobre <a href="/es/blog/estives-transhumance-vallee-aspe">los pastos de altura y la trashumancia</a>.</p><h2>Conocer a los productores</h2><p>Varias granjas del valle abren sus puertas y venden directamente. Le indicamos con gusto nuestras direcciones preferidas para que se lleve un buen trozo en la mochila. Algo para prolongar la estancia, mucho después del último bocado.</p>`,
    category: 'La mesa',
    tags: ['queso', 'oveja', 'Ossau-Iraty', 'terruño'],
    metaTitle: 'Queso de oveja del valle de Aspe | La mesa de Le Permayou',
    metaDescription: 'Ossau-Iraty, queso de montaña con leche cruda: la historia y la degustación del queso de oveja del valle de Aspe, servido en el albergue Le Permayou.',
  },
  {
    slug: 'venir-vallee-aspe-train-bedous',
    title: 'Venir al valle de Aspe sin coche: el tren hasta Bedous',
    excerpt: 'Se puede llegar al valle de Aspe en tren hasta Bedous, y terminar en autobús o en bici. Manual para una estancia en Le Permayou sin coger el volante.',
    content: `<p>Buena noticia para quienes prefieren dejar el coche en el garaje: el valle de Aspe se alcanza en transporte. La línea ferroviaria sube hasta Bedous, a solo unos kilómetros del albergue. Aquí va cómo organizar su llegada.</p><h2>El tren hasta Bedous</h2><p>Desde Pau, el tren da servicio al valle de Aspe hasta la estación de Bedous, final de la línea. Es una llegada que cambia de aires: se baja del vagón al pie de las montañas, el aire cambia, y el ritmo también.</p><h2>Los últimos kilómetros hasta Accous</h2><p>De Bedous a Le Permayou, en Accous, queda una corta distancia. Un servicio de autobús enlaza el valle, y podemos aconsejarle sobre los horarios. En la buena estación, es también un bonito tramo para hacer en bici a lo largo del río.</p><h2>Venir en bici, el buen plan</h2><p>El valle se presta maravillosamente al viaje en bicicleta. Si las dos ruedas le tientan, lea nuestro artículo sobre <a href="/es/blog/col-du-somport-velo-accous">la ascensión al puerto de Somport desde Accous</a>: el albergue es un campo base perfecto, con local para bicicletas incluido.</p><h2>Elegir el buen momento</h2><p>Según la temporada, las frecuencias de tren y autobús varían. Para ajustar su estancia, nuestra <a href="/es/blog/quand-venir-vallee-aspe">guía de las estaciones en el valle de Aspe</a> le dará el tempo. Y una vez aquí, todo se hace a pie o en bici: el verdadero lujo es ir más despacio.</p>`,
    category: 'Consejos y temporada',
    tags: ['acceso', 'tren', 'Bedous', 'sin coche'],
    metaTitle: 'Venir al valle de Aspe en tren (Bedous) | Le Permayou',
    metaDescription: 'Llegar al valle de Aspe sin coche: tren hasta Bedous, autobús y bici hasta Accous. Todos nuestros consejos para una estancia en Le Permayou sin coche.',
  },
  {
    slug: 'estives-transhumance-vallee-aspe',
    title: 'Pastos de altura y trashumancia: el verano pastoral del valle de Aspe',
    excerpt: 'Cada verano, los rebaños suben a los pastos de altitud. La trashumancia marca el ritmo de la vida del valle de Aspe desde hace siglos. Relato de una tradición bien viva.',
    content: `<p>En primavera, un mismo movimiento se repite en todo el valle de Aspe: ovejas, vacas y caballos dejan el fondo del valle para alcanzar los pastos de altura, donde pasarán el verano. La trashumancia es el corazón palpitante de la montaña pirenaica.</p><h2>Una tradición secular</h2><p>Desde hace generaciones, los pastores conducen sus animales hacia las alturas en cuanto la nieve libera la hierba. Allí arriba, el rebaño disfruta de una hierba rica todo el verano, bajo la vigilancia de los pastores instalados en las cabañas de altura.</p><h2>Lo que cambia en el plato</h2><p>Esta hierba de altura es todo el secreto del sabor de los productos del valle. La leche de las ovejas de altura da el famoso queso del que hablamos en nuestro artículo sobre <a href="/es/blog/fromage-brebis-vallee-aspe-permayou">el queso de oveja del valle de Aspe</a>. Comer aquí es saborear directamente ese vínculo entre la montaña y la mesa.</p><h2>Cruzarse con los rebaños en una ruta</h2><p>En verano, muchos de nuestros itinerarios atraviesan zonas de pasto. Quizá se cruce con un rebaño, un patou (el perro de protección) o un pastor. Nuestras <a href="/es/blog/5-randonnees-depart-permayou">rutas saliendo de Le Permayou</a> pasan por varias de esas mesetas, como la de Lhers.</p><h2>Respetar la montaña pastoral</h2><p>La montaña es un lugar de trabajo tanto como un terreno de juego. Rodee los rebaños, lleve los perros atados y cierre las cercas tras de usted. Ese respeto mutuo es lo que hace bella una estancia aquí, entre naturaleza y saber hacer.</p>`,
    category: 'Valle de Aspe y eventos',
    tags: ['pastos de altura', 'trashumancia', 'pastoreo', 'queso'],
    metaTitle: 'Pastos de altura y trashumancia en el valle de Aspe | Le Permayou',
    metaDescription: 'La trashumancia y los pastos de altura marcan el verano en el valle de Aspe: tradición pastoral, queso de oveja y encuentros en ruta alrededor de Le Permayou.',
  },
  {
    slug: 'chemin-compostelle-somport-permayou',
    title: 'El Camino de Santiago por el Somport: una parada en Le Permayou',
    excerpt: 'La vía de Arlés hacia Santiago de Compostela cruza los Pirineos por el puerto de Somport, pasando por el valle de Aspe. Le Permayou es una parada natural para los peregrinos.',
    content: `<p>Desde la Edad Media, los peregrinos cruzan el valle de Aspe camino de Santiago de Compostela. La vía de Arlés, uno de los cuatro grandes caminos franceses, cruza la frontera en el puerto de Somport antes de adentrarse en España. El albergue se encuentra justo en este itinerario.</p><h2>La vía de Arlés y el Somport</h2><p>Este camino histórico remonta el valle de Aspe hasta el puerto de Somport, a 1632 metros de altitud. Es uno de los pasos más salvajes y bellos de la peregrinación, entre bosques, pastos de altura y grandes espacios de altitud.</p><h2>Una parada en el camino</h2><p>Caminar hacia Compostela es avanzar a su ritmo, etapa tras etapa. En Le Permayou, recibimos a los peregrinos como a los demás caminantes: una cama cómoda, una comida caliente y lo necesario para volver a salir con el ánimo ligero. El Camino de Santiago forma parte, de hecho, de nuestros <a href="/es/blog/5-randonnees-depart-permayou">itinerarios saliendo del albergue</a>.</p><h2>Peregrinos y ciclistas, el mismo puerto</h2><p>El Somport es también un puerto mítico para los aficionados al ciclismo. Si la subida le tienta sobre dos ruedas en lugar de a pie, lea nuestro artículo sobre <a href="/es/blog/col-du-somport-velo-accous">la ascensión al puerto de Somport desde Accous</a>.</p><h2>Tomarse el tiempo</h2><p>Ya haga todo el camino o solo un tramo, el valle de Aspe invita a ir más despacio. Deje la mochila, comparta una comida, vuelva a salir descansado. ¡Buen camino, y hasta pronto en Le Permayou!</p>`,
    category: 'Senderismo y rutas',
    tags: ['Camino de Santiago', 'Santiago', 'vía de Arlés', 'Somport'],
    metaTitle: 'Camino de Santiago por el Somport | Una parada en Le Permayou',
    metaDescription: 'La vía de Arlés hacia Compostela cruza el puerto de Somport por el valle de Aspe: Le Permayou, en Accous, es una parada ideal para los peregrinos.',
  },
]

// Construit les docs complets en injectant locale + coverImage + date (clé slug).
function build(list, locale) {
  return list.map((a) => {
    const m = META[a.slug]
    if (!m) throw new Error(`META manquant pour le slug ${a.slug}`)
    return {
      ...a,
      locale,
      author: 'Coline & Julien',
      published: true,
      coverImage: m.coverImage,
      publishedAt: m.publishedAt,
    }
  })
}

const articles = [...build(EN, 'en'), ...build(ES, 'es')]

;(async () => {
  if (!process.env.MONGODB_URI) {
    console.error('MONGODB_URI manquant (vérifie .env.local)')
    process.exit(1)
  }
  await mongoose.connect(process.env.MONGODB_URI)

  // Upsert par (slug, locale) : idempotent, aucun doublon.
  const ops = articles.map((a) => ({
    updateOne: {
      filter: { slug: a.slug, locale: a.locale },
      update: { $set: a },
      upsert: true,
    },
  }))

  const res = await BlogPost.bulkWrite(ops)
  console.log(
    `${articles.length} traductions traitées (${res.upsertedCount || 0} créées, ${res.modifiedCount || 0} mises à jour).`
  )
  console.log('EN visibles sur /en/blog, ES sur /es/blog (locale + published).')

  await mongoose.disconnect()
})().catch((err) => {
  console.error('Erreur :', err.message)
  process.exit(1)
})

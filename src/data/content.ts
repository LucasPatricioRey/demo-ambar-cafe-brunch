import type { Category, GalleryItem, Product, Promo } from '../types'

export const BRAND = {
  name: 'Ámbar Café & Brunch',
  shortName: 'Ámbar',
  whatsapp: 'https://wa.me/5491154097209',
  phoneLabel: '+54 9 11 5409-7209',
  instagram: '@ambar.brunchclub',
  address: 'Costa Rica 4682, Palermo Soho, CABA',
  mapUrl: 'https://maps.google.com/?q=Costa+Rica+4682+Palermo+Soho+CABA',
  hours: 'Lunes a viernes 8 a 20 hs · Sábados y domingos 9 a 21 hs',
}

export const navLinks = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Menú', href: '#menu' },
  { label: 'Pedidos', href: '#pedido' },
  { label: 'Reservas', href: '#reservas' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Promos', href: '#promos' },
  { label: 'Opiniones', href: '#opiniones' },
  { label: 'Contacto', href: '#contacto' },
]

export const categoryLabels: Record<Category, string> = {
  Cafes: 'Cafés',
  Desayunos: 'Desayunos',
  Brunch: 'Brunch',
  Tostadas: 'Tostadas',
  Bowls: 'Bowls',
  Sandwiches: 'Sándwiches',
  Pasteleria: 'Pastelería',
  Postres: 'Postres',
  'Bebidas frias': 'Bebidas frías',
  Promos: 'Promos',
}

export const categories: Array<Category | 'Todos'> = [
  'Todos',
  'Cafes',
  'Desayunos',
  'Brunch',
  'Tostadas',
  'Bowls',
  'Sandwiches',
  'Pasteleria',
  'Postres',
  'Bebidas frias',
  'Promos',
]

export const products: Product[] = [
  {
    id: 'flat-white',
    name: 'Flat White',
    category: 'Cafes',
    description: 'Doble espresso, leche texturizada y final sedoso.',
    detail:
      'Un clásico de barra preparado con espresso de origen brasileño, leche cremosa y una proporción pensada para destacar el café.',
    ingredients: ['Doble espresso', 'Leche texturizada', 'Latte art'],
    price: 3900,
    badge: 'Más pedido',
    featured: true,
    popular: true,
    visual: 'coffee',
  },
  {
    id: 'cappuccino-ambar',
    name: 'Cappuccino Ámbar',
    category: 'Cafes',
    description: 'Espresso, espuma aireada, cacao y toque de naranja.',
    detail:
      'Cappuccino de perfil dulce y aromático, ideal para desayuno o merienda premium.',
    ingredients: ['Espresso', 'Leche', 'Cacao amargo', 'Zest de naranja'],
    price: 4100,
    featured: true,
    visual: 'coffee',
  },
  {
    id: 'cold-brew-tonic',
    name: 'Cold Brew Tonic',
    category: 'Bebidas frias',
    description: 'Café en extracción lenta, tónica y cítricos.',
    detail:
      'Bebida fría, refrescante y elegante. Perfecta para tardes de verano o brunch liviano.',
    ingredients: ['Cold brew', 'Agua tónica', 'Pomelo', 'Hielo claro'],
    price: 4600,
    badge: 'Fresh',
    visual: 'cold',
  },
  {
    id: 'espresso-orange',
    name: 'Espresso Orange',
    category: 'Bebidas frias',
    description: 'Jugo de naranja natural con espresso intenso.',
    detail:
      'Contraste cítrico y café de especialidad para quienes buscan algo distinto.',
    ingredients: ['Espresso doble', 'Naranja exprimida', 'Hielo', 'Almíbar suave'],
    price: 4400,
    visual: 'cold',
  },
  {
    id: 'avocado-toast',
    name: 'Avocado Toast',
    category: 'Tostadas',
    description: 'Palta, huevo poché, semillas y pan de masa madre.',
    detail:
      'Tostón de masa madre con palta pisada, huevo poché y mix de semillas tostadas. Sale con lima y escamas de sal.',
    ingredients: ['Masa madre', 'Palta', 'Huevo poché', 'Semillas', 'Lima'],
    price: 8900,
    badge: 'Destacado',
    featured: true,
    popular: true,
    visual: 'toast',
  },
  {
    id: 'huevos-benedictinos',
    name: 'Huevos Benedictinos',
    category: 'Brunch',
    description: 'English muffin, huevos poché, panceta y holandesa.',
    detail:
      'Un brunch de autor con salsa holandesa suave, panceta crocante y hojas frescas.',
    ingredients: ['English muffin', 'Huevos poché', 'Panceta', 'Holandesa', 'Rúcula'],
    price: 11200,
    badge: 'Brunch premium',
    featured: true,
    popular: true,
    visual: 'brunch',
  },
  {
    id: 'pancakes-frutos-rojos',
    name: 'Pancakes con frutos rojos',
    category: 'Brunch',
    description: 'Pancakes altos, crema liviana, frutos rojos y miel.',
    detail:
      'Porción generosa con masa aireada, crema batida ligera, frutos rojos de estación y miel de flores.',
    ingredients: ['Pancakes', 'Frutos rojos', 'Crema', 'Miel', 'Manteca avellanada'],
    price: 9800,
    badge: 'Instagrameable',
    featured: true,
    visual: 'sweet',
  },
  {
    id: 'brunch-para-dos',
    name: 'Brunch para dos',
    category: 'Promos',
    description: 'Dos cafés, jugos, tostadas, pancakes y pastelería.',
    detail:
      'Una experiencia completa para compartir: incluye bebidas, salado, dulce y una selección de pastelería del día.',
    ingredients: ['2 cafés', '2 jugos', 'Avocado toast', 'Pancakes', 'Pastelería'],
    price: 26500,
    badge: 'Para compartir',
    featured: true,
    popular: true,
    visual: 'promo',
  },
  {
    id: 'tostado-premium',
    name: 'Tostado premium',
    category: 'Sandwiches',
    description: 'Jamón natural, queso fundido y pan brioche dorado.',
    detail:
      'Versión cuidada del tostado clásico, con brioche de manteca y queso bien fundido.',
    ingredients: ['Pan brioche', 'Jamón natural', 'Queso tybo', 'Manteca'],
    price: 7900,
    visual: 'sandwich',
  },
  {
    id: 'sandwich-pastron',
    name: 'Sándwich de pastrón',
    category: 'Sandwiches',
    description: 'Pastrón, pepinos, mostaza antigua y pan de centeno.',
    detail:
      'Sándwich tibio de perfil neoyorquino, con pastrón especiado y pickles caseros.',
    ingredients: ['Pastrón', 'Centeno', 'Pepinos', 'Mostaza antigua', 'Queso'],
    price: 10400,
    visual: 'sandwich',
  },
  {
    id: 'bowl-yogur',
    name: 'Bowl de yogur y granola',
    category: 'Bowls',
    description: 'Yogur natural, granola, fruta, miel y semillas.',
    detail:
      'Liviano, fresco y muy visual. Ideal para desayuno rápido o brunch saludable.',
    ingredients: ['Yogur natural', 'Granola', 'Fruta de estación', 'Miel', 'Chía'],
    price: 7600,
    visual: 'bowl',
  },
  {
    id: 'bowl-salmon',
    name: 'Bowl salmón brunch',
    category: 'Bowls',
    description: 'Salmón curado, arroz, palta, huevo y vegetales.',
    detail:
      'Bowl completo con textura fresca, proteína y aderezos suaves. Una opción premium para mediodía.',
    ingredients: ['Salmón curado', 'Arroz', 'Palta', 'Huevo', 'Vegetales'],
    price: 13900,
    badge: 'Nuevo',
    visual: 'bowl',
  },
  {
    id: 'croissant-relleno',
    name: 'Croissant relleno',
    category: 'Pasteleria',
    description: 'Croissant de manteca con crema de almendras.',
    detail:
      'Hojaldre crocante, crema de almendras y azúcar impalpable. Sale tibio.',
    ingredients: ['Croissant', 'Crema de almendras', 'Manteca', 'Azúcar impalpable'],
    price: 5200,
    popular: true,
    visual: 'sweet',
  },
  {
    id: 'cookie-artesanal',
    name: 'Cookie artesanal',
    category: 'Pasteleria',
    description: 'Chocolate semiamargo, nuez y sal marina.',
    detail:
      'Cookie grande, húmeda en el centro y con bordes dorados. Ideal con café.',
    ingredients: ['Chocolate', 'Nuez', 'Manteca', 'Sal marina'],
    price: 3600,
    visual: 'sweet',
  },
  {
    id: 'cheesecake',
    name: 'Cheesecake vasco',
    category: 'Postres',
    description: 'Cremoso, dorado y servido con coulis de frutos rojos.',
    detail:
      'Postre de textura cremosa y centro suave, acompañado por coulis ácido para equilibrar.',
    ingredients: ['Queso crema', 'Huevos', 'Azúcar', 'Frutos rojos'],
    price: 6900,
    featured: true,
    visual: 'sweet',
  },
  {
    id: 'lemon-pie-copa',
    name: 'Lemon pie en copa',
    category: 'Postres',
    description: 'Crema de limón, crumble y merengue italiano.',
    detail:
      'Postre fresco en formato individual, pensado para cerrar un brunch sin pesadez.',
    ingredients: ['Crema de limón', 'Crumble', 'Merengue italiano', 'Lima'],
    price: 6400,
    visual: 'sweet',
  },
  {
    id: 'combo-desayuno-clasico',
    name: 'Combo desayuno clásico',
    category: 'Desayunos',
    description: 'Café con leche, medialuna y jugo exprimido.',
    detail:
      'Opción clara y rápida para primera hora, con café de especialidad y jugo natural.',
    ingredients: ['Café con leche', 'Medialuna', 'Jugo de naranja'],
    price: 8200,
    badge: 'Hasta 11 hs',
    visual: 'promo',
  },
  {
    id: 'combo-merienda-premium',
    name: 'Combo merienda premium',
    category: 'Promos',
    description: 'Dos cafés, cookie, croissant y cheesecake para compartir.',
    detail:
      'Una merienda completa para dos personas, pensada para venta por WhatsApp y retiro rápido.',
    ingredients: ['2 cafés', 'Cookie', 'Croissant', 'Cheesecake'],
    price: 18900,
    visual: 'promo',
  },
  {
    id: 'limonada-casa',
    name: 'Limonada de la casa',
    category: 'Bebidas frias',
    description: 'Limón, menta, jengibre suave y almíbar de la casa.',
    detail:
      'Refrescante y aromática, sale en vaso alto con mucho hielo y menta fresca.',
    ingredients: ['Limón', 'Menta', 'Jengibre', 'Almíbar', 'Soda'],
    price: 4300,
    visual: 'cold',
  },
  {
    id: 'granola-toast',
    name: 'Tostada ricota y miel',
    category: 'Tostadas',
    description: 'Ricota cremosa, miel, pistacho y fruta fresca.',
    detail:
      'Tostón dulce sobre masa madre, equilibrado y muy fotogénico.',
    ingredients: ['Masa madre', 'Ricota', 'Miel', 'Pistacho', 'Fruta'],
    price: 8600,
    visual: 'toast',
  },
]

export const promos: Promo[] = [
  {
    id: 'promo-manana',
    title: 'Desayuno de barra',
    description: 'Flat white + croissant relleno hasta las 11 hs.',
    price: 7900,
    productId: 'combo-desayuno-clasico',
    tag: 'Mañana',
    visual: 'promo',
  },
  {
    id: 'promo-brunch',
    title: 'Brunch para dos',
    description: 'Dulce, salado y bebidas para una mesa completa.',
    price: 26500,
    productId: 'brunch-para-dos',
    tag: 'Más vendido',
    visual: 'brunch',
  },
  {
    id: 'promo-cookie',
    title: 'Café + cookie',
    description: 'Cualquier café caliente con cookie artesanal.',
    price: 6900,
    productId: 'cookie-artesanal',
    tag: 'Take away',
    visual: 'coffee',
  },
  {
    id: 'promo-merienda',
    title: 'Merienda premium',
    description: 'Dos cafés, pastelería y porción dulce para compartir.',
    price: 18900,
    productId: 'combo-merienda-premium',
    tag: 'Para dos',
    visual: 'sweet',
  },
  {
    id: 'promo-happy',
    title: 'Happy Coffee',
    description: 'Segundo café frío con 30% off de 16 a 18 hs.',
    price: 4600,
    productId: 'cold-brew-tonic',
    tag: 'Promo del día',
    visual: 'cold',
  },
]

export const galleryItems: GalleryItem[] = [
  {
    id: 'gallery-local',
    title: 'Barra protagonista',
    filter: 'Ambiente',
    caption: 'Madera, verde suave y luz cálida para una experiencia premium.',
    visual: 'coffee',
  },
  {
    id: 'gallery-avocado',
    title: 'Tostadas de autor',
    filter: 'Platos',
    caption: 'Platos simples, bien presentados y pensados para redes.',
    visual: 'toast',
  },
  {
    id: 'gallery-cafe',
    title: 'Café de especialidad',
    filter: 'Cafe',
    caption: 'Bebidas de barra con identidad visual clara.',
    visual: 'coffee',
  },
  {
    id: 'gallery-brunch',
    title: 'Mesas de brunch',
    filter: 'Brunch',
    caption: 'Propuestas para compartir, reservar y volver.',
    visual: 'brunch',
  },
  {
    id: 'gallery-dulce',
    title: 'Pastelería propia',
    filter: 'Dulce',
    caption: 'Dulces cuidados para venta en local y take away.',
    visual: 'sweet',
  },
  {
    id: 'gallery-delivery',
    title: 'Packaging premium',
    filter: 'Ambiente',
    caption: 'Pedidos prolijos por WhatsApp, retiro y delivery.',
    visual: 'promo',
  },
]

export const testimonials = [
  {
    name: 'Sofía M.',
    context: 'Brunch con reserva',
    rating: '5.0',
    text: 'Reservamos desde el celu y cuando llegamos la mesa ya estaba lista. El brunch salió impecable.',
  },
  {
    name: 'Nico R.',
    context: 'Pedido por QR',
    rating: '4.9',
    text: 'Escaneamos el QR, elegimos todo rápido y mandamos el pedido por WhatsApp sin esperar al mozo.',
  },
  {
    name: 'Flor V.',
    context: 'Take away',
    rating: '5.0',
    text: 'El menú es claro, las fotos ayudan un montón y pude pedir para retirar en dos minutos.',
  },
  {
    name: 'Martín G.',
    context: 'Café de especialidad',
    rating: '4.8',
    text: 'Muy buen café, atención prolija y una carta que se entiende perfecto desde el celular.',
  },
]

export const faqs = [
  {
    question: '¿Se puede pedir por delivery?',
    answer:
      'Sí. En esta demo el pedido se arma y se envía por WhatsApp con dirección, productos, cantidades, notas y total estimado.',
  },
  {
    question: '¿Atienden sin reserva?',
    answer:
      'Sí, aunque para fines de semana se recomienda reservar. El módulo de reservas permite mandar la solicitud directamente por WhatsApp.',
  },
  {
    question: '¿Puedo hacer pedido para retirar?',
    answer:
      'Sí. El carrito permite elegir retiro, consumo en local o delivery antes de enviar el mensaje.',
  },
  {
    question: '¿Qué formas de pago aceptan?',
    answer:
      'La demo comunica efectivo, débito, crédito y transferencia. En una implementación real también se puede sumar pago online.',
  },
  {
    question: '¿Tienen opciones vegetarianas?',
    answer:
      'Sí. Hay opciones como avocado toast, bowls, pancakes, pastelería y bebidas frías. Se pueden sumar filtros por dieta si el cliente lo necesita.',
  },
  {
    question: '¿Cómo funciona el menú QR?',
    answer:
      'El cliente escanea el QR en la mesa, ve el menú desde el celular, arma el pedido y lo manda por WhatsApp sin fricción.',
  },
]

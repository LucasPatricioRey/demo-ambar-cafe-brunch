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
  'Sandwiches',
  'Pasteleria',
  'Postres',
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
    image: 'cafeDestacado',
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
    image: 'avocadoToast',
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
    image: 'pancakesWaffles',
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
    image: 'brunchParaDos',
  },
  {
    id: 'tostado-premium',
    name: 'Sándwich brunch premium',
    category: 'Sandwiches',
    description: 'Pan artesanal, palta, hojas verdes, panceta y papas doradas.',
    detail:
      'Un sándwich potente y premium para brunch de mediodía, con capas frescas, pan dorado y guarnición.',
    ingredients: ['Pan artesanal', 'Palta', 'Panceta', 'Hojas verdes', 'Papas'],
    price: 10400,
    visual: 'sandwich',
    image: 'sandwichPremium',
  },
  {
    id: 'croissant-relleno',
    name: 'Croissant artesanal',
    category: 'Pasteleria',
    description: 'Croissant de manteca, dorado y servido con café.',
    detail:
      'Hojaldre crocante, manteca y una presentación simple que funciona perfecto para desayuno o merienda.',
    ingredients: ['Croissant', 'Manteca', 'Masa laminada', 'Café de especialidad'],
    price: 5200,
    popular: true,
    visual: 'sweet',
    image: 'croissant',
  },
  {
    id: 'cheesecake',
    name: 'Postre premium de chocolate',
    category: 'Postres',
    description: 'Chocolate intenso, frambuesas frescas y crema suave.',
    detail:
      'Postre protagonista para cerrar el brunch: chocolate intenso, fruta fresca y una presentación muy visual.',
    ingredients: ['Chocolate', 'Frambuesas', 'Crema', 'Cacao', 'Menta'],
    price: 6900,
    featured: true,
    visual: 'sweet',
    image: 'postrePremium',
  },
  {
    id: 'combo-desayuno-clasico',
    name: 'Combo desayuno Ámbar',
    category: 'Desayunos',
    description: 'Café, croissant, jugo, bowl y tostada de palta.',
    detail:
      'Opción clara y completa para primera hora, con café de especialidad, jugo natural y brunch liviano.',
    ingredients: ['Café', 'Croissant', 'Jugo', 'Bowl', 'Tostada de palta'],
    price: 8200,
    badge: 'Hasta 11 hs',
    visual: 'promo',
    image: 'comboDesayuno',
  },
]

export const promos: Promo[] = [
  {
    id: 'promo-manana',
    title: 'Desayuno de barra',
    description: 'Flat white + croissant artesanal hasta las 11 hs.',
    price: 7900,
    productId: 'combo-desayuno-clasico',
    tag: 'Mañana',
    visual: 'promo',
    image: 'comboDesayuno',
  },
  {
    id: 'promo-brunch',
    title: 'Brunch para dos',
    description: 'Dulce, salado y bebidas para una mesa completa.',
    price: 26500,
    productId: 'brunch-para-dos',
    tag: 'Más vendido',
    visual: 'brunch',
    image: 'brunchParaDos',
  },
  {
    id: 'promo-cookie',
    title: 'Café + croissant',
    description: 'Cualquier café caliente con croissant artesanal.',
    price: 6900,
    productId: 'croissant-relleno',
    tag: 'Take away',
    visual: 'coffee',
    image: 'croissant',
  },
  {
    id: 'promo-merienda',
    title: 'Merienda premium',
    description: 'Dos cafés, pastelería y postre premium para compartir.',
    price: 18900,
    productId: 'cheesecake',
    tag: 'Para dos',
    visual: 'sweet',
    image: 'postrePremium',
  },
  {
    id: 'promo-happy',
    title: 'Happy Coffee',
    description: 'Segundo café o bebida fría con 30% off de 16 a 18 hs.',
    price: 4600,
    productId: 'flat-white',
    tag: 'Promo del día',
    visual: 'cold',
    image: 'cafeDestacado',
  },
]

export const galleryItems: GalleryItem[] = [
  {
    id: 'gallery-fachada',
    title: 'Fachada con identidad',
    filter: 'Ambiente',
    caption: 'Una primera impresión premium para llegar, reservar y recomendar.',
    visual: 'coffee',
    image: 'fachadaCafe',
  },
  {
    id: 'gallery-interior',
    title: 'Interior cálido',
    filter: 'Ambiente',
    caption: 'Barra de café, madera, plantas y luz natural para quedarse más tiempo.',
    visual: 'coffee',
    image: 'interiorLocal',
  },
  {
    id: 'gallery-lifestyle',
    title: 'Brunch social',
    filter: 'Brunch',
    caption: 'Mesas compartidas, platos abundantes y una experiencia muy instagrameable.',
    visual: 'brunch',
    image: 'lifestyleBrunch',
  },
  {
    id: 'gallery-qr',
    title: 'QR en mesa',
    filter: 'Pedidos',
    caption: 'El cliente escanea, mira el menú y manda el pedido por WhatsApp.',
    visual: 'promo',
    image: 'menuQrMesa',
  },
  {
    id: 'gallery-cafe',
    title: 'Café de especialidad',
    filter: 'Cafe',
    caption: 'Latte art, vajilla cálida y una carta visual para vender más cafés.',
    visual: 'coffee',
    image: 'cafeDestacado',
  },
  {
    id: 'gallery-barista',
    title: 'Barista en acción',
    filter: 'Cafe',
    caption: 'Preparación cuidada para reforzar oficio, calidad y confianza.',
    visual: 'coffee',
    image: 'baristaCafe',
  },
  {
    id: 'gallery-avocado',
    title: 'Avocado toast',
    filter: 'Platos',
    caption: 'Un clásico de brunch premium con palta, huevo poché y semillas.',
    visual: 'toast',
    image: 'avocadoToast',
  },
  {
    id: 'gallery-pancakes',
    title: 'Pancakes con frutos rojos',
    filter: 'Dulce',
    caption: 'Un producto visual, dulce y fácil de vender desde el menú mobile.',
    visual: 'sweet',
    image: 'pancakesWaffles',
  },
  {
    id: 'gallery-staff',
    title: 'Atención cercana',
    filter: 'Ambiente',
    caption: 'Servicio simple, cálido y pensado para reservas de fin de semana.',
    visual: 'brunch',
    image: 'staffAtencion',
  },
  {
    id: 'gallery-postre',
    title: 'Postre premium',
    filter: 'Dulce',
    caption: 'Cierre dulce con estética de cafetería boutique.',
    visual: 'sweet',
    image: 'postrePremium',
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
      'Sí. Hay opciones como avocado toast, pancakes, brunch para compartir, pastelería y combos de desayuno. Se pueden sumar filtros por dieta si el cliente lo necesita.',
  },
  {
    question: '¿Cómo funciona el menú QR?',
    answer:
      'El cliente escanea el QR en la mesa, ve el menú desde el celular, arma el pedido y lo manda por WhatsApp sin fricción.',
  },
]

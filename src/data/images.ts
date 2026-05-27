import heroCafe from '../assets/images/01-hero-cafeteria.jpg'
import interiorLocal from '../assets/images/02-interior-local.jpg'
import fachadaCafe from '../assets/images/03-fachada-cafeteria.jpg'
import cafeDestacado from '../assets/images/04-cafe-destacado.jpg'
import avocadoToast from '../assets/images/05-avocado-toast.jpg'
import pancakesWaffles from '../assets/images/06-pancakes-waffles.jpg'
import sandwichPremium from '../assets/images/07-sandwich-burger-premium.jpg'
import croissant from '../assets/images/08-pasteleria-croissant.jpg'
import comboDesayuno from '../assets/images/09-combo-desayuno.jpg'
import brunchParaDos from '../assets/images/10-brunch-para-dos.jpg'
import postrePremium from '../assets/images/11-postre-premium.jpg'
import baristaCafe from '../assets/images/12-barista-preparando-cafe.jpg'
import staffAtencion from '../assets/images/13-staff-atencion-cafeteria.jpg'
import menuQrMesa from '../assets/images/14-menu-qr-mesa.jpg'
import lifestyleBrunch from '../assets/images/15-lifestyle-clientes-brunch.jpg'

export type ImageKey =
  | 'heroCafe'
  | 'interiorLocal'
  | 'fachadaCafe'
  | 'cafeDestacado'
  | 'avocadoToast'
  | 'pancakesWaffles'
  | 'sandwichPremium'
  | 'croissant'
  | 'comboDesayuno'
  | 'brunchParaDos'
  | 'postrePremium'
  | 'baristaCafe'
  | 'staffAtencion'
  | 'menuQrMesa'
  | 'lifestyleBrunch'

export interface ImageAsset {
  src: string
  alt: string
  width: number
  height: number
  position?: string
}

export const imageAssets: Record<ImageKey, ImageAsset> = {
  heroCafe: {
    src: heroCafe,
    alt: 'Mesa de brunch premium en cafetería cálida con clientes tomando café',
    width: 1672,
    height: 941,
    position: '62% center',
  },
  interiorLocal: {
    src: interiorLocal,
    alt: 'Interior de cafetería premium con barra de café, madera, plantas y luz natural',
    width: 1672,
    height: 941,
    position: 'center',
  },
  fachadaCafe: {
    src: fachadaCafe,
    alt: 'Fachada de cafetería moderna con toldo negro, plantas y mesa exterior',
    width: 1122,
    height: 1402,
    position: 'center',
  },
  cafeDestacado: {
    src: cafeDestacado,
    alt: 'Flat white con latte art servido sobre mesa de madera',
    width: 1122,
    height: 1402,
    position: 'center 58%',
  },
  avocadoToast: {
    src: avocadoToast,
    alt: 'Avocado toast con huevos poché, semillas y brotes frescos',
    width: 1122,
    height: 1402,
    position: 'center',
  },
  pancakesWaffles: {
    src: pancakesWaffles,
    alt: 'Pancakes con frutos rojos, banana, crema y miel',
    width: 1122,
    height: 1402,
    position: 'center',
  },
  sandwichPremium: {
    src: sandwichPremium,
    alt: 'Sándwich brunch premium con hojas verdes, palta y papas doradas',
    width: 1122,
    height: 1402,
    position: 'center',
  },
  croissant: {
    src: croissant,
    alt: 'Croissant artesanal de manteca servido con café',
    width: 1122,
    height: 1402,
    position: 'center',
  },
  comboDesayuno: {
    src: comboDesayuno,
    alt: 'Combo desayuno con café, croissant, jugo, bowl y tostada con palta',
    width: 1448,
    height: 1086,
    position: 'center',
  },
  brunchParaDos: {
    src: brunchParaDos,
    alt: 'Mesa completa de brunch para dos con cafés, avocado toast, pancakes y pastelería',
    width: 1672,
    height: 941,
    position: 'center',
  },
  postrePremium: {
    src: postrePremium,
    alt: 'Postre premium de chocolate con frambuesas y menta',
    width: 1122,
    height: 1402,
    position: 'center',
  },
  baristaCafe: {
    src: baristaCafe,
    alt: 'Barista preparando café de especialidad con latte art',
    width: 1122,
    height: 1402,
    position: 'center',
  },
  staffAtencion: {
    src: staffAtencion,
    alt: 'Staff atendiendo una mesa de brunch en cafetería cálida',
    width: 1122,
    height: 1402,
    position: 'center',
  },
  menuQrMesa: {
    src: menuQrMesa,
    alt: 'Código QR de menú digital sobre mesa con café y croissant',
    width: 1448,
    height: 1086,
    position: 'center',
  },
  lifestyleBrunch: {
    src: lifestyleBrunch,
    alt: 'Clientes compartiendo café y brunch en una cafetería moderna',
    width: 1672,
    height: 941,
    position: 'center',
  },
}

export type Category =
  | 'Cafes'
  | 'Desayunos'
  | 'Brunch'
  | 'Tostadas'
  | 'Bowls'
  | 'Sandwiches'
  | 'Pasteleria'
  | 'Postres'
  | 'Bebidas frias'
  | 'Promos'

export type ServiceMode = 'local' | 'retiro' | 'delivery'

export type VisualTone =
  | 'coffee'
  | 'toast'
  | 'brunch'
  | 'sweet'
  | 'cold'
  | 'bowl'
  | 'promo'
  | 'sandwich'

export interface Product {
  id: string
  name: string
  category: Category
  description: string
  detail: string
  ingredients: string[]
  price: number
  badge?: string
  featured?: boolean
  popular?: boolean
  visual: VisualTone
}

export interface CartItem {
  product: Product
  quantity: number
  note?: string
}

export interface Promo {
  id: string
  title: string
  description: string
  price: number
  productId?: string
  tag: string
  visual: VisualTone
}

export interface GalleryItem {
  id: string
  title: string
  filter: 'Platos' | 'Cafe' | 'Ambiente' | 'Brunch' | 'Dulce'
  caption: string
  visual: VisualTone
}

export interface ReservationForm {
  name: string
  people: string
  date: string
  time: string
  preference: string
  notes: string
}

import { BRAND } from '../data/content'
import type { CartItem, ReservationForm, ServiceMode } from '../types'
import { formatCurrency } from './format'

const serviceLabels: Record<ServiceMode, string> = {
  local: 'consumo en local',
  retiro: 'retiro por el local',
  delivery: 'delivery',
}

const serviceMessages: Record<ServiceMode, string> = {
  local: 'Estoy en el local y quiero hacer el pedido desde la mesa.',
  retiro: 'Lo paso a retirar por el local. Me confirman horario estimado, por favor.',
  delivery: 'Quiero recibirlo por delivery en la dirección indicada.',
}

const cleanSentence = (value: string) => value.trim().replace(/[.!?]+$/g, '')

export function buildOrderMessage(
  items: CartItem[],
  serviceMode: ServiceMode,
  orderNote: string,
  address: string,
  total: number,
) {
  const lines = items.map((item) => {
    const itemNote = item.note ? ` - Nota: ${cleanSentence(item.note)}` : ''
    return `- ${item.quantity} x ${item.product.name} (${formatCurrency(
      item.product.price * item.quantity,
    )})${itemNote}`
  })

  return [
    `Hola Lucas, quiero hacer un pedido de la demo ${BRAND.name}.`,
    `Modalidad: ${serviceLabels[serviceMode]}.`,
    serviceMessages[serviceMode],
    serviceMode === 'delivery' && address.trim()
      ? `Dirección: ${cleanSentence(address)}.`
      : undefined,
    'Productos:',
    lines.join('\n'),
    orderNote.trim() ? `Nota general: ${cleanSentence(orderNote)}.` : undefined,
    `Total estimado: ${formatCurrency(total)}.`,
    '¿Me confirmás disponibilidad y tiempo estimado?',
  ]
    .filter(Boolean)
    .join('\n')
}

export function buildReservationMessage(form: ReservationForm) {
  return [
    `Hola Lucas, quiero reservar una mesa en la demo ${BRAND.name}.`,
    `Nombre: ${form.name.trim()}.`,
    `Personas: ${form.people}.`,
    `Fecha: ${form.date}.`,
    `Horario: ${form.time}.`,
    form.preference.trim() ? `Preferencia: ${cleanSentence(form.preference)}.` : undefined,
    form.notes.trim() ? `Observaciones: ${cleanSentence(form.notes)}.` : undefined,
    '¿Me confirmás si hay disponibilidad?',
  ]
    .filter(Boolean)
    .join('\n')
}

export const whatsappUrl = (message: string) =>
  `${BRAND.whatsapp}?text=${encodeURIComponent(message)}`

# Ámbar Café & Brunch

Demo comercial de cafetería de especialidad y brunch premium para vender menú digital QR, menú online, pedidos por WhatsApp, carrito simulado, delivery/retiro/consumo en local, reservas de mesa, promos y experiencia mobile.

## Objetivo comercial

Mostrar a dueños de cafeterías, brunch houses, panaderías premium y locales gastronómicos cómo podría verse una web moderna que convierte visitas desde el celular en pedidos, reservas y consultas por WhatsApp.

La marca ficticia elegida es **Ámbar Café & Brunch**, ubicada en Palermo Soho, CABA. La identidad busca verse cálida, aspiracional, moderna y muy vendible.

## Stack usado

- Vite
- React
- TypeScript
- CSS moderno custom
- Lucide React para iconografía

No hay backend, base de datos ni autenticación. La lógica de pedido y reserva es simulada y genera mensajes de WhatsApp.

## Funcionalidades

- Navbar sticky con menú mobile.
- Hero comercial con CTAs, señales de confianza y visual premium con placeholders.
- Menú online con buscador, filtros por categoría y cards de productos.
- Modal de detalle de producto con ingredientes, cantidad, notas y agregado al carrito.
- Carrito lateral con cantidades, eliminación, notas por producto, nota general, subtotal y modalidad.
- Modalidades: consumo en local, retiro y delivery con dirección.
- Mensaje de pedido armado para WhatsApp.
- Formulario de reservas con mensaje armado para WhatsApp.
- Sección de menú digital QR.
- Platos destacados, promos, galería, opiniones, cómo funciona, ubicación, FAQ y CTA final.
- Footer con “Demo creada por Lucas Rey” y “Sitio demostrativo para presentación comercial.”
- Metadata SEO, Open Graph básico y favicon.

## Cómo correr localmente

```bash
npm install
npm run dev
```

## Cómo buildear

```bash
npm run build
```

## Cómo adaptar esta demo a un cliente real

1. Reemplazar nombre, logo textual, ubicación, horarios, Instagram y WhatsApp en `src/data/content.ts`.
2. Cambiar categorías, productos, precios, ingredientes y promos en el mismo archivo.
3. Reemplazar placeholders por imágenes reales o generadas según `docs/image-plan.md`.
4. Ajustar colores y tono de marca en `src/App.css`.
5. Conectar pedidos reales, pagos, reservas o panel admin si el alcance comercial lo requiere.

## Qué cosas son simuladas

- El carrito no persiste en una base de datos.
- Los pedidos no entran a un sistema gastronómico real.
- Las reservas no bloquean disponibilidad real.
- Las reseñas, precios, dirección e Instagram son ficticios.
- El QR es ilustrativo.
- Las imágenes son placeholders de diseño, no fotos finales.

## Nota

Demo creada por Lucas Rey.

Sitio demostrativo para presentación comercial.

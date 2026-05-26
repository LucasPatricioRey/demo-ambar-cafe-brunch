import {
  ArrowRight,
  Bike,
  Camera,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock,
  Coffee,
  Gift,
  Heart,
  Leaf,
  MapPin,
  Menu,
  MessageCircle,
  Minus,
  Navigation,
  Phone,
  Plus,
  QrCode,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Store,
  Trash2,
  Users,
  Utensils,
  X,
} from 'lucide-react'
import type { ChangeEvent, FormEvent } from 'react'
import { useEffect, useMemo, useState } from 'react'
import './App.css'
import {
  BRAND,
  categories,
  categoryLabels,
  faqs,
  galleryItems,
  navLinks,
  products,
  promos,
  testimonials,
} from './data/content'
import type { CartItem, Category, GalleryItem, Product, ReservationForm, ServiceMode, VisualTone } from './types'
import { formatCurrency, normalizeText } from './utils/format'
import { buildOrderMessage, buildReservationMessage, whatsappUrl } from './utils/whatsapp'

const galleryFilters: Array<GalleryItem['filter'] | 'Todos'> = [
  'Todos',
  'Platos',
  'Cafe',
  'Ambiente',
  'Brunch',
  'Dulce',
]

const emptyReservation: ReservationForm = {
  name: '',
  people: '2',
  date: '',
  time: '',
  preference: '',
  notes: '',
}

const serviceOptions: Array<{
  id: ServiceMode
  label: string
  description: string
  icon: typeof Store
}> = [
  {
    id: 'local',
    label: 'Consumo en local',
    description: 'Ideal si escaneaste el QR desde la mesa.',
    icon: Store,
  },
  {
    id: 'retiro',
    label: 'Retiro',
    description: 'Te avisamos cuándo pasar por Palermo Soho.',
    icon: ShoppingBag,
  },
  {
    id: 'delivery',
    label: 'Delivery',
    description: 'Completá la dirección antes de enviar.',
    icon: Bike,
  },
]

const trustItems = [
  { label: 'Café de especialidad', icon: Coffee },
  { label: 'Brunch todo el día', icon: Utensils },
  { label: 'Pedido por WhatsApp', icon: MessageCircle },
  { label: 'QR en mesa', icon: QrCode },
  { label: 'Delivery y retiro', icon: Bike },
  { label: 'Reservas online', icon: CalendarDays },
]

function App() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState<Category | 'Todos'>('Todos')
  const [query, setQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [modalQuantity, setModalQuantity] = useState(1)
  const [modalNote, setModalNote] = useState('')
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [serviceMode, setServiceMode] = useState<ServiceMode>('local')
  const [address, setAddress] = useState('')
  const [orderNote, setOrderNote] = useState('')
  const [reservation, setReservation] = useState<ReservationForm>(emptyReservation)
  const [openFaq, setOpenFaq] = useState(0)
  const [galleryFilter, setGalleryFilter] = useState<GalleryItem['filter'] | 'Todos'>('Todos')
  const [toast, setToast] = useState('')

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  )

  const filteredProducts = useMemo(() => {
    const normalizedQuery = normalizeText(query)

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === 'Todos' || product.category === activeCategory
      const searchable = normalizeText(
        `${product.name} ${product.description} ${product.ingredients.join(' ')}`,
      )
      return matchesCategory && searchable.includes(normalizedQuery)
    })
  }, [activeCategory, query])

  const featuredProducts = products.filter((product) => product.featured).slice(0, 6)

  const visibleGallery =
    galleryFilter === 'Todos'
      ? galleryItems
      : galleryItems.filter((item) => item.filter === galleryFilter)

  const orderMessage = buildOrderMessage(
    cartItems,
    serviceMode,
    orderNote,
    address,
    subtotal,
  )
  const orderWhatsappUrl = whatsappUrl(orderMessage)
  const reservationWhatsappUrl = whatsappUrl(buildReservationMessage(reservation))

  useEffect(() => {
    if (!toast) return
    const timeout = window.setTimeout(() => setToast(''), 2600)
    return () => window.clearTimeout(timeout)
  }, [toast])

  useEffect(() => {
    document.body.style.overflow = cartOpen || selectedProduct || mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [cartOpen, mobileOpen, selectedProduct])

  const showToast = (message: string) => setToast(message)

  const openProduct = (product: Product) => {
    setSelectedProduct(product)
    setModalQuantity(1)
    setModalNote('')
  }

  const addToCart = (product: Product, quantity = 1, note = '') => {
    const cleanNote = note.trim()

    setCartItems((current) => {
      const existingIndex = current.findIndex(
        (item) => item.product.id === product.id && (item.note ?? '') === cleanNote,
      )

      if (existingIndex >= 0) {
        return current.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }

      return [...current, { product, quantity, note: cleanNote }]
    })

    showToast(`${product.name} agregado al pedido`)
  }

  const addProductAndOpenCart = (product: Product) => {
    addToCart(product)
    setCartOpen(true)
  }

  const addPromo = (productId?: string) => {
    const product = products.find((item) => item.id === productId)
    if (product) {
      addProductAndOpenCart(product)
    }
  }

  const updateCartQuantity = (itemIndex: number, quantity: number) => {
    if (quantity <= 0) {
      removeCartItem(itemIndex)
      return
    }

    setCartItems((current) =>
      current.map((item, index) =>
        index === itemIndex ? { ...item, quantity } : item,
      ),
    )
  }

  const updateCartNote = (itemIndex: number, note: string) => {
    setCartItems((current) =>
      current.map((item, index) =>
        index === itemIndex ? { ...item, note } : item,
      ),
    )
  }

  const removeCartItem = (itemIndex: number) => {
    setCartItems((current) => current.filter((_, index) => index !== itemIndex))
  }

  const handleOrderSubmit = () => {
    if (cartItems.length === 0) {
      showToast('Agregá al menos un producto para enviar el pedido.')
      return
    }

    if (serviceMode === 'delivery' && !address.trim()) {
      showToast('Completá la dirección para enviar un delivery.')
      return
    }

    window.open(orderWhatsappUrl, '_blank', 'noopener,noreferrer')
  }

  const updateReservationField =
    (field: keyof ReservationForm) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setReservation((current) => ({ ...current, [field]: event.target.value }))
    }

  const handleReservationSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!reservation.name.trim() || !reservation.date || !reservation.time) {
      showToast('Completá nombre, fecha y horario para reservar.')
      return
    }

    window.open(reservationWhatsappUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="app-shell">
      <Header
        cartCount={cartCount}
        mobileOpen={mobileOpen}
        onCartOpen={() => setCartOpen(true)}
        onMobileToggle={() => setMobileOpen((open) => !open)}
        onNavClick={() => setMobileOpen(false)}
      />

      <main>
        <Hero onCartOpen={() => setCartOpen(true)} />
        <TrustBar />
        <MenuSection
          activeCategory={activeCategory}
          filteredProducts={filteredProducts}
          query={query}
          onAdd={addProductAndOpenCart}
          onCategoryChange={setActiveCategory}
          onDetail={openProduct}
          onQueryChange={setQuery}
        />
        <OrderExperience onCartOpen={() => setCartOpen(true)} />
        <QrSection />
        <FeaturedSection products={featuredProducts} onAdd={addProductAndOpenCart} onDetail={openProduct} />
        <PromosSection onAddPromo={addPromo} />
        <ReservationSection
          form={reservation}
          onSubmit={handleReservationSubmit}
          onUpdate={updateReservationField}
          reservationUrl={reservationWhatsappUrl}
        />
        <GallerySection
          filter={galleryFilter}
          items={visibleGallery}
          onFilterChange={setGalleryFilter}
        />
        <TestimonialsSection />
        <HowItWorks />
        <LocationSection />
        <FaqSection openFaq={openFaq} onToggle={setOpenFaq} />
        <FinalCta onCartOpen={() => setCartOpen(true)} />
      </main>

      <Footer />

      <CartDrawer
        address={address}
        items={cartItems}
        note={orderNote}
        open={cartOpen}
        serviceMode={serviceMode}
        subtotal={subtotal}
        whatsappUrl={orderWhatsappUrl}
        onAddressChange={setAddress}
        onClose={() => setCartOpen(false)}
        onNoteChange={setOrderNote}
        onQuantityChange={updateCartQuantity}
        onRemove={removeCartItem}
        onServiceModeChange={setServiceMode}
        onSubmit={handleOrderSubmit}
        onUpdateItemNote={updateCartNote}
      />

      {selectedProduct ? (
        <ProductModal
          note={modalNote}
          product={selectedProduct}
          quantity={modalQuantity}
          onAdd={() => {
            addToCart(selectedProduct, modalQuantity, modalNote)
            setSelectedProduct(null)
            setCartOpen(true)
          }}
          onClose={() => setSelectedProduct(null)}
          onNoteChange={setModalNote}
          onQuantityChange={setModalQuantity}
        />
      ) : null}

      <a
        className="floating-whatsapp"
        href={whatsappUrl(`Hola Lucas, quiero consultar por ${BRAND.name}.`)}
        target="_blank"
        rel="noreferrer"
        aria-label="Abrir WhatsApp"
      >
        <MessageCircle aria-hidden="true" />
      </a>

      <div className={`toast ${toast ? 'toast--visible' : ''}`} role="status" aria-live="polite">
        {toast}
      </div>
    </div>
  )
}

interface HeaderProps {
  cartCount: number
  mobileOpen: boolean
  onCartOpen: () => void
  onMobileToggle: () => void
  onNavClick: () => void
}

function Header({
  cartCount,
  mobileOpen,
  onCartOpen,
  onMobileToggle,
  onNavClick,
}: HeaderProps) {
  return (
    <header className="site-header">
      <a className="brand-mark" href="#inicio" onClick={onNavClick} aria-label="Ir al inicio">
        <span className="brand-mark__symbol">Á</span>
        <span>
          <strong>{BRAND.shortName}</strong>
          <small>Café & Brunch</small>
        </span>
      </a>

      <nav className={`main-nav ${mobileOpen ? 'main-nav--open' : ''}`} aria-label="Navegación principal">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} onClick={onNavClick}>
            {link.label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <button className="button button--ghost button--cart" type="button" onClick={onCartOpen}>
          <ShoppingBag aria-hidden="true" />
          <span>Pedido</span>
          {cartCount > 0 ? <b>{cartCount}</b> : null}
        </button>
        <a className="button button--primary header-whatsapp" href={BRAND.whatsapp} target="_blank" rel="noreferrer">
          <MessageCircle aria-hidden="true" />
          Pedir por WhatsApp
        </a>
        <button
          className="icon-button mobile-toggle"
          type="button"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={onMobileToggle}
        >
          {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
    </header>
  )
}

function Hero({ onCartOpen }: { onCartOpen: () => void }) {
  return (
    <section className="hero-section" id="inicio">
      <div className="hero-content">
        <span className="eyebrow">
          <Sparkles aria-hidden="true" />
          Palermo Soho · brunch premium
        </span>
        <h1>Café de especialidad y brunch para pedir sin esperar.</h1>
        <p className="hero-lead">
          Una carta digital cálida, visual y lista para convertir visitas en pedidos por WhatsApp, reservas y mesas completas.
        </p>

        <div className="hero-actions">
          <button className="button button--primary" type="button" onClick={onCartOpen}>
            <ShoppingBag aria-hidden="true" />
            Hacer pedido
          </button>
          <a className="button button--secondary" href="#menu">
            Ver menú
            <ArrowRight aria-hidden="true" />
          </a>
        </div>

        <div className="hero-proof" aria-label="Datos destacados de Ámbar Café & Brunch">
          <div>
            <Star aria-hidden="true" />
            <strong>4.9</strong>
            <span>reseñas</span>
          </div>
          <div>
            <Users aria-hidden="true" />
            <strong>+1.800</strong>
            <span>clientes al mes</span>
          </div>
          <div>
            <QrCode aria-hidden="true" />
            <strong>QR</strong>
            <span>en mesa</span>
          </div>
          <div>
            <Clock aria-hidden="true" />
            <strong>8-20</strong>
            <span>lunes a viernes</span>
          </div>
        </div>
      </div>

      <div className="hero-visual" aria-label="Mesa de brunch premium con celular y menú digital">
        <div className="hero-plate hero-plate--main">
          <VisualPlaceholder tone="brunch" label="Placeholder editorial de mesa brunch premium" />
        </div>
        <div className="phone-mockup">
          <div className="phone-notch" />
          <div className="phone-status">
            <span>Ámbar QR</span>
            <QrCode aria-hidden="true" />
          </div>
          <div className="phone-card">
            <VisualPlaceholder tone="toast" label="Placeholder de avocado toast en menú mobile" compact />
            <div>
              <strong>Avocado Toast</strong>
              <span>$ 8.900</span>
            </div>
          </div>
          <div className="phone-card">
            <VisualPlaceholder tone="coffee" label="Placeholder de flat white en menú mobile" compact />
            <div>
              <strong>Flat White</strong>
              <span>$ 3.900</span>
            </div>
          </div>
          <button className="phone-button" type="button" onClick={() => document.getElementById('menu')?.scrollIntoView()}>
            Ver carta
          </button>
        </div>
        <div className="hero-badge">
          <Heart aria-hidden="true" />
          Brunch para dos destacado
        </div>
      </div>
    </section>
  )
}

function TrustBar() {
  return (
    <section className="trust-bar" aria-label="Beneficios">
      {trustItems.map((item) => {
        const Icon = item.icon
        return (
          <div className="trust-item" key={item.label}>
            <Icon aria-hidden="true" />
            <span>{item.label}</span>
          </div>
        )
      })}
    </section>
  )
}

interface MenuSectionProps {
  activeCategory: Category | 'Todos'
  filteredProducts: Product[]
  query: string
  onAdd: (product: Product) => void
  onCategoryChange: (category: Category | 'Todos') => void
  onDetail: (product: Product) => void
  onQueryChange: (query: string) => void
}

function MenuSection({
  activeCategory,
  filteredProducts,
  query,
  onAdd,
  onCategoryChange,
  onDetail,
  onQueryChange,
}: MenuSectionProps) {
  return (
    <section className="section section--menu" id="menu">
      <div className="section-heading">
        <span className="eyebrow">
          <Coffee aria-hidden="true" />
          Menú online
        </span>
        <div>
          <h2>Carta clara, visual y lista para vender más.</h2>
          <p>
            Filtrá por categoría, buscá tus favoritos y armá un pedido simulado como lo haría un cliente desde el QR.
          </p>
        </div>
      </div>

      <div className="menu-toolbar" role="search">
        <label className="search-box">
          <Search aria-hidden="true" />
          <span className="sr-only">Buscar en el menú</span>
          <input
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Buscar café, brunch, tostadas..."
          />
        </label>
        <div className="category-scroll" aria-label="Categorías del menú">
          {categories.map((category) => {
            const label = category === 'Todos' ? 'Todos' : categoryLabels[category]
            return (
              <button
                className={`chip ${activeCategory === category ? 'chip--active' : ''}`}
                type="button"
                key={category}
                onClick={() => onCategoryChange(category)}
              >
                {label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="menu-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={() => onAdd(product)}
            onDetail={() => onDetail(product)}
          />
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <Search aria-hidden="true" />
          <p>No encontramos productos con esa búsqueda. Probá con café, brunch o tostadas.</p>
        </div>
      ) : null}
    </section>
  )
}

function ProductCard({
  product,
  onAdd,
  onDetail,
}: {
  product: Product
  onAdd: () => void
  onDetail: () => void
}) {
  return (
    <article className="product-card">
      <button className="product-media" type="button" onClick={onDetail}>
        <VisualPlaceholder tone={product.visual} label={`Placeholder de ${product.name}`} />
        {product.badge ? <span className="badge">{product.badge}</span> : null}
      </button>
      <div className="product-body">
        <div>
          <span className="product-category">{categoryLabels[product.category]}</span>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
        </div>
        <div className="product-footer">
          <strong>{formatCurrency(product.price)}</strong>
          <div className="product-actions">
            <button className="button button--ghost button--small" type="button" onClick={onDetail}>
              Detalle
            </button>
            <button className="button button--primary button--small" type="button" onClick={onAdd}>
              <Plus aria-hidden="true" />
              Agregar
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

function OrderExperience({ onCartOpen }: { onCartOpen: () => void }) {
  return (
    <section className="section order-experience" id="pedido">
      <div className="order-copy">
        <span className="eyebrow">
          <MessageCircle aria-hidden="true" />
          Pedido por WhatsApp
        </span>
        <h2>Del QR al mensaje listo para enviar.</h2>
        <p>
          El cliente elige productos, cantidades, notas y modalidad. El sistema arma un mensaje ordenado para WhatsApp con el total estimado.
        </p>
        <button className="button button--primary" type="button" onClick={onCartOpen}>
          Abrir carrito
          <ShoppingBag aria-hidden="true" />
        </button>
      </div>
      <div className="order-panel">
        <div className="order-panel__top">
          <span>Pedido de mesa 12</span>
          <strong>Listo para WhatsApp</strong>
        </div>
        {['2 x Flat White', '1 x Avocado Toast', '1 x Cookie artesanal'].map((item) => (
          <div className="fake-line" key={item}>
            <CheckCircle2 aria-hidden="true" />
            <span>{item}</span>
          </div>
        ))}
        <div className="fake-total">
          <span>Total estimado</span>
          <strong>$ 20.300</strong>
        </div>
      </div>
    </section>
  )
}

function QrSection() {
  return (
    <section className="section qr-section">
      <div className="qr-mock">
        <div className="table-mock">
          <div className="qr-card" aria-label="Placeholder de código QR de mesa">
            <QrCode aria-hidden="true" />
            <span>Ámbar QR</span>
          </div>
          <VisualPlaceholder tone="coffee" label="Placeholder de café sobre mesa cálida" compact />
          <VisualPlaceholder tone="sweet" label="Placeholder de pastelería sobre mesa" compact />
        </div>
      </div>
      <div>
        <span className="eyebrow">
          <QrCode aria-hidden="true" />
          Menú digital QR
        </span>
        <h2>Escaneá, elegí y pedí sin esperas.</h2>
        <p>
          Una experiencia pensada para mesas ocupadas, take away y clientes que deciden rápido desde el celular.
        </p>
        <div className="qr-steps">
          <span>QR en mesa</span>
          <span>Menú mobile</span>
          <span>WhatsApp armado</span>
        </div>
      </div>
    </section>
  )
}

function FeaturedSection({
  products: featured,
  onAdd,
  onDetail,
}: {
  products: Product[]
  onAdd: (product: Product) => void
  onDetail: (product: Product) => void
}) {
  return (
    <section className="section featured-section">
      <div className="section-heading">
        <span className="eyebrow">
          <Star aria-hidden="true" />
          Platos destacados
        </span>
        <div>
          <h2>Lo que entra por los ojos, se pide más.</h2>
          <p>Productos elegidos para abrir el apetito y empujar pedidos desde la primera visita.</p>
        </div>
      </div>
      <div className="featured-grid">
        {featured.map((product) => (
          <article className="featured-card" key={product.id}>
            <VisualPlaceholder tone={product.visual} label={`Placeholder destacado de ${product.name}`} />
            <div>
              <span>{product.badge ?? categoryLabels[product.category]}</span>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <div className="featured-card__footer">
                <strong>{formatCurrency(product.price)}</strong>
                <div>
                  <button className="icon-button" type="button" onClick={() => onDetail(product)} aria-label={`Ver detalle de ${product.name}`}>
                    <Search aria-hidden="true" />
                  </button>
                  <button className="icon-button icon-button--filled" type="button" onClick={() => onAdd(product)} aria-label={`Agregar ${product.name}`}>
                    <Plus aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function PromosSection({ onAddPromo }: { onAddPromo: (productId?: string) => void }) {
  return (
    <section className="section promo-section" id="promos">
      <div className="section-heading">
        <span className="eyebrow">
          <Gift aria-hidden="true" />
          Promos y combos
        </span>
        <div>
          <h2>Combos que hacen fácil decidir.</h2>
          <p>Ofertas ficticias pensadas para subir el ticket promedio en desayuno, merienda y take away.</p>
        </div>
      </div>
      <div className="promo-grid">
        {promos.map((promo) => (
          <article className="promo-card" key={promo.id}>
            <div className="promo-card__visual">
              <VisualPlaceholder tone={promo.visual} label={`Placeholder de ${promo.title}`} compact />
              <span>{promo.tag}</span>
            </div>
            <div>
              <h3>{promo.title}</h3>
              <p>{promo.description}</p>
              <div className="promo-card__footer">
                <strong>{formatCurrency(promo.price)}</strong>
                <button className="button button--secondary button--small" type="button" onClick={() => onAddPromo(promo.productId)}>
                  Pedir promo
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

interface ReservationSectionProps {
  form: ReservationForm
  reservationUrl: string
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onUpdate: (
    field: keyof ReservationForm,
  ) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void
}

function ReservationSection({
  form,
  reservationUrl,
  onSubmit,
  onUpdate,
}: ReservationSectionProps) {
  return (
    <section className="section reservation-section" id="reservas">
      <div className="reservation-copy">
        <span className="eyebrow">
          <CalendarDays aria-hidden="true" />
          Reservas de mesa
        </span>
        <h2>Una reserva simple también vende experiencia.</h2>
        <p>
          El formulario arma un mensaje directo a WhatsApp con día, horario, cantidad de personas y preferencias.
        </p>
        <div className="reservation-highlights">
          <span>
            <Clock aria-hidden="true" />
            Turnos sugeridos cada 30 min
          </span>
          <span>
            <Users aria-hidden="true" />
            Ideal para brunch de fin de semana
          </span>
        </div>
      </div>

      <form className="reservation-form" onSubmit={onSubmit}>
        <div className="form-grid">
          <label>
            Nombre
            <input value={form.name} onChange={onUpdate('name')} placeholder="Ej: Camila" required />
          </label>
          <label>
            Personas
            <select value={form.people} onChange={onUpdate('people')}>
              {['1', '2', '3', '4', '5', '6+'].map((amount) => (
                <option key={amount} value={amount}>
                  {amount}
                </option>
              ))}
            </select>
          </label>
          <label>
            Fecha
            <input
              inputMode="numeric"
              value={form.date}
              onChange={onUpdate('date')}
              placeholder="Ej: 14/06/2026"
              required
            />
          </label>
          <label>
            Horario
            <input
              inputMode="numeric"
              value={form.time}
              onChange={onUpdate('time')}
              placeholder="Ej: 11:30"
              required
            />
          </label>
        </div>
        <label>
          Preferencia
          <select value={form.preference} onChange={onUpdate('preference')}>
            <option value="">Sin preferencia</option>
            <option value="Mesa interior">Mesa interior</option>
            <option value="Vereda">Vereda</option>
            <option value="Cerca de la barra">Cerca de la barra</option>
          </select>
        </label>
        <label>
          Observaciones
          <textarea value={form.notes} onChange={onUpdate('notes')} placeholder="Ej: vamos con cochecito, festejo de cumple..." />
        </label>
        <button className="button button--primary" type="submit" data-whatsapp-url={reservationUrl}>
          <MessageCircle aria-hidden="true" />
          Reservar por WhatsApp
        </button>
      </form>
    </section>
  )
}

function GallerySection({
  filter,
  items,
  onFilterChange,
}: {
  filter: GalleryItem['filter'] | 'Todos'
  items: GalleryItem[]
  onFilterChange: (filter: GalleryItem['filter'] | 'Todos') => void
}) {
  return (
    <section className="section gallery-section" id="galeria">
      <div className="section-heading">
        <span className="eyebrow">
          <Sparkles aria-hidden="true" />
          Galería y ambiente
        </span>
        <div>
          <h2>Una marca que se reconoce antes del primer café.</h2>
          <p>Espacios reservados para fotos finales de local, platos, barra, mesas y packaging.</p>
        </div>
      </div>
      <div className="category-scroll" aria-label="Filtros de galería">
        {galleryFilters.map((item) => (
          <button
            className={`chip ${filter === item ? 'chip--active' : ''}`}
            key={item}
            type="button"
            onClick={() => onFilterChange(item)}
          >
            {item === 'Cafe' ? 'Café' : item}
          </button>
        ))}
      </div>
      <div className="gallery-grid">
        {items.map((item) => (
          <article className="gallery-card" key={item.id}>
            <VisualPlaceholder tone={item.visual} label={`Placeholder de galería: ${item.title}`} />
            <div>
              <span>{item.filter === 'Cafe' ? 'Café' : item.filter}</span>
              <h3>{item.title}</h3>
              <p>{item.caption}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function TestimonialsSection() {
  return (
    <section className="section testimonials-section" id="opiniones">
      <div className="section-heading">
        <span className="eyebrow">
          <Star aria-hidden="true" />
          Opiniones
        </span>
        <div>
          <h2>Reseñas ficticias, realistas y vendibles.</h2>
          <p>Comentarios pensados para mostrar confianza sin sonar exagerados.</p>
        </div>
      </div>
      <div className="testimonial-grid">
        {testimonials.map((testimonial) => (
          <article className="testimonial-card" key={testimonial.name}>
            <div className="rating-row">
              <strong>{testimonial.rating}</strong>
              <span aria-label={`${testimonial.rating} estrellas`}>
                <Star aria-hidden="true" />
                <Star aria-hidden="true" />
                <Star aria-hidden="true" />
                <Star aria-hidden="true" />
                <Star aria-hidden="true" />
              </span>
            </div>
            <p>“{testimonial.text}”</p>
            <div>
              <strong>{testimonial.name}</strong>
              <span>{testimonial.context}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function HowItWorks() {
  const steps = [
    { title: 'Escaneá el QR', text: 'El menú abre directo en el celular.', icon: QrCode },
    { title: 'Elegí tu pedido', text: 'Productos, cantidades, notas y modalidad.', icon: ShoppingBag },
    { title: 'Mandalo por WhatsApp', text: 'Mensaje completo con total estimado.', icon: MessageCircle },
    { title: 'Disfrutá Ámbar', text: 'Mesa, retiro o delivery sin vueltas.', icon: Coffee },
  ]

  return (
    <section className="section steps-section">
      <div className="section-heading">
        <span className="eyebrow">
          <CheckCircle2 aria-hidden="true" />
          Cómo funciona
        </span>
        <div>
          <h2>Un recorrido claro desde la mesa hasta el pedido.</h2>
          <p>Simple para clientes, vendible para negocios y fácil de adaptar a una carta real.</p>
        </div>
      </div>
      <div className="steps-grid">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <article className="step-card" key={step.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <Icon aria-hidden="true" />
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function LocationSection() {
  return (
    <section className="section location-section" id="contacto">
      <div>
        <span className="eyebrow">
          <MapPin aria-hidden="true" />
          Ubicación y horarios
        </span>
        <h2>Palermo Soho, CABA.</h2>
        <p>{BRAND.address}</p>
        <div className="contact-list">
          <a href={BRAND.whatsapp} target="_blank" rel="noreferrer">
            <Phone aria-hidden="true" />
            {BRAND.phoneLabel}
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <Camera aria-hidden="true" />
            {BRAND.instagram}
          </a>
          <span>
            <Clock aria-hidden="true" />
            {BRAND.hours}
          </span>
        </div>
        <a className="button button--secondary" href={BRAND.mapUrl} target="_blank" rel="noreferrer">
          <Navigation aria-hidden="true" />
          Cómo llegar
        </a>
      </div>
      <div className="map-card" aria-label="Mapa ilustrativo de Palermo Soho">
        <div className="map-grid" />
        <div className="map-pin">
          <MapPin aria-hidden="true" />
          <span>{BRAND.shortName}</span>
        </div>
      </div>
    </section>
  )
}

function FaqSection({
  openFaq,
  onToggle,
}: {
  openFaq: number
  onToggle: (index: number) => void
}) {
  return (
    <section className="section faq-section">
      <div className="section-heading">
        <span className="eyebrow">
          <Leaf aria-hidden="true" />
          Preguntas frecuentes
        </span>
        <div>
          <h2>Respuestas rápidas para decidir mejor.</h2>
          <p>Textos listos para adaptar a políticas reales del negocio.</p>
        </div>
      </div>
      <div className="faq-list">
        {faqs.map((faq, index) => {
          const expanded = openFaq === index
          return (
            <div className="faq-item" key={faq.question}>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={`faq-${index}`}
                onClick={() => onToggle(expanded ? -1 : index)}
              >
                <span>{faq.question}</span>
                <ChevronDown aria-hidden="true" />
              </button>
              <div className="faq-answer" id={`faq-${index}`} hidden={!expanded}>
                <p>{faq.answer}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

function FinalCta({ onCartOpen }: { onCartOpen: () => void }) {
  return (
    <section className="final-cta">
      <span className="eyebrow">
        <Sparkles aria-hidden="true" />
        Listo para pedir
      </span>
      <h2>Tu próximo café favorito está a un mensaje de distancia.</h2>
      <p>Elegí brunch, armá el carrito o reservá una mesa en Palermo Soho.</p>
      <div className="hero-actions">
        <button className="button button--primary" type="button" onClick={onCartOpen}>
          <ShoppingBag aria-hidden="true" />
          Pedir por WhatsApp
        </button>
        <a className="button button--secondary" href="#menu">
          Ver menú
        </a>
        <a className="button button--secondary" href="#reservas">
          Reservar mesa
        </a>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <a className="brand-mark" href="#inicio" aria-label="Ir al inicio">
          <span className="brand-mark__symbol">Á</span>
          <span>
            <strong>{BRAND.name}</strong>
            <small>Especialidad · brunch · Palermo</small>
          </span>
        </a>
        <p>Sitio demostrativo para presentación comercial.</p>
      </div>
      <div className="footer-grid">
        <div>
          <strong>Links</strong>
          {navLinks.slice(0, 6).map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <div>
          <strong>Contacto</strong>
          <a href={BRAND.whatsapp} target="_blank" rel="noreferrer">
            WhatsApp {BRAND.phoneLabel}
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            Instagram {BRAND.instagram}
          </a>
          <span>{BRAND.address}</span>
        </div>
        <div>
          <strong>Horarios</strong>
          <span>{BRAND.hours}</span>
          <span>Demo creada por Lucas Rey</span>
        </div>
      </div>
    </footer>
  )
}

interface CartDrawerProps {
  address: string
  items: CartItem[]
  note: string
  open: boolean
  serviceMode: ServiceMode
  subtotal: number
  whatsappUrl: string
  onAddressChange: (address: string) => void
  onClose: () => void
  onNoteChange: (note: string) => void
  onQuantityChange: (index: number, quantity: number) => void
  onRemove: (index: number) => void
  onServiceModeChange: (mode: ServiceMode) => void
  onSubmit: () => void
  onUpdateItemNote: (index: number, note: string) => void
}

function CartDrawer({
  address,
  items,
  note,
  open,
  serviceMode,
  subtotal,
  whatsappUrl,
  onAddressChange,
  onClose,
  onNoteChange,
  onQuantityChange,
  onRemove,
  onServiceModeChange,
  onSubmit,
  onUpdateItemNote,
}: CartDrawerProps) {
  return (
    <div className={`drawer ${open ? 'drawer--open' : ''}`} aria-hidden={!open}>
      <button className="drawer-backdrop" type="button" aria-label="Cerrar carrito" onClick={onClose} />
      <aside className="cart-panel" aria-label="Carrito de pedido">
        <div className="cart-header">
          <div>
            <span>Pedido simulado</span>
            <h2>Tu carrito</h2>
          </div>
          <button className="icon-button" type="button" onClick={onClose} aria-label="Cerrar carrito">
            <X aria-hidden="true" />
          </button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag aria-hidden="true" />
              <p>Agregá productos del menú para ver el resumen del pedido.</p>
            </div>
          ) : (
            items.map((item, index) => (
              <article className="cart-item" key={`${item.product.id}-${index}`}>
                <VisualPlaceholder tone={item.product.visual} label={`Miniatura de ${item.product.name}`} compact />
                <div className="cart-item__body">
                  <div>
                    <h3>{item.product.name}</h3>
                    <span>{formatCurrency(item.product.price)}</span>
                  </div>
                  <div className="quantity-control" aria-label={`Cantidad de ${item.product.name}`}>
                    <button type="button" onClick={() => onQuantityChange(index, item.quantity - 1)} aria-label="Restar unidad">
                      <Minus aria-hidden="true" />
                    </button>
                    <strong>{item.quantity}</strong>
                    <button type="button" onClick={() => onQuantityChange(index, item.quantity + 1)} aria-label="Sumar unidad">
                      <Plus aria-hidden="true" />
                    </button>
                  </div>
                  <label className="cart-note">
                    <span>Nota del producto</span>
                    <input
                      value={item.note ?? ''}
                      onChange={(event) => onUpdateItemNote(index, event.target.value)}
                      placeholder="Ej: sin cebolla, leche de almendras"
                    />
                  </label>
                </div>
                <button className="icon-button cart-remove" type="button" onClick={() => onRemove(index)} aria-label={`Eliminar ${item.product.name}`}>
                  <Trash2 aria-hidden="true" />
                </button>
              </article>
            ))
          )}
        </div>

        <div className="service-mode" aria-label="Modalidad del pedido">
          {serviceOptions.map((option) => {
            const Icon = option.icon
            return (
              <button
                className={serviceMode === option.id ? 'service-card service-card--active' : 'service-card'}
                type="button"
                key={option.id}
                onClick={() => onServiceModeChange(option.id)}
              >
                <Icon aria-hidden="true" />
                <span>{option.label}</span>
                <small>{option.description}</small>
              </button>
            )
          })}
        </div>

        {serviceMode === 'delivery' ? (
          <label className="field">
            Dirección de delivery
            <input
              value={address}
              onChange={(event) => onAddressChange(event.target.value)}
              placeholder="Ej: Thames 1600, piso 2"
            />
          </label>
        ) : null}

        {serviceMode === 'retiro' ? (
          <p className="mode-hint">Te respondemos por WhatsApp con el horario estimado de retiro.</p>
        ) : null}

        {serviceMode === 'local' ? (
          <p className="mode-hint">Ideal para pedir desde la mesa después de escanear el QR.</p>
        ) : null}

        <label className="field">
          Nota general
          <textarea
            value={note}
            onChange={(event) => onNoteChange(event.target.value)}
            placeholder="Ej: mesa 12, sin azúcar, retirar 18:30..."
          />
        </label>

        <div className="cart-summary">
          <div>
            <span>Subtotal</span>
            <strong>{formatCurrency(subtotal)}</strong>
          </div>
          <small>Los precios son ficticios y el total es estimado para la demo.</small>
        </div>

        <button
          className="button button--primary button--full"
          type="button"
          disabled={items.length === 0}
          data-whatsapp-url={whatsappUrl}
          onClick={onSubmit}
        >
          <MessageCircle aria-hidden="true" />
          Enviar pedido por WhatsApp
        </button>
      </aside>
    </div>
  )
}

interface ProductModalProps {
  note: string
  product: Product
  quantity: number
  onAdd: () => void
  onClose: () => void
  onNoteChange: (note: string) => void
  onQuantityChange: (quantity: number) => void
}

function ProductModal({
  note,
  product,
  quantity,
  onAdd,
  onClose,
  onNoteChange,
  onQuantityChange,
}: ProductModalProps) {
  return (
    <div className="modal-layer" role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
      <button className="modal-backdrop" type="button" aria-label="Cerrar detalle" onClick={onClose} />
      <article className="product-modal">
        <button className="icon-button modal-close" type="button" onClick={onClose} aria-label="Cerrar detalle">
          <X aria-hidden="true" />
        </button>
        <VisualPlaceholder tone={product.visual} label={`Placeholder grande de ${product.name}`} />
        <div className="product-modal__content">
          <span className="product-category">{categoryLabels[product.category]}</span>
          <h2 id="product-modal-title">{product.name}</h2>
          <p>{product.detail}</p>
          <div className="ingredients">
            {product.ingredients.map((ingredient) => (
              <span key={ingredient}>{ingredient}</span>
            ))}
          </div>
          <strong className="modal-price">{formatCurrency(product.price)}</strong>
          <div className="modal-controls">
            <div className="quantity-control quantity-control--large">
              <button type="button" onClick={() => onQuantityChange(Math.max(1, quantity - 1))} aria-label="Restar unidad">
                <Minus aria-hidden="true" />
              </button>
              <strong>{quantity}</strong>
              <button type="button" onClick={() => onQuantityChange(quantity + 1)} aria-label="Sumar unidad">
                <Plus aria-hidden="true" />
              </button>
            </div>
            <label className="field">
              Nota opcional
              <textarea value={note} onChange={(event) => onNoteChange(event.target.value)} placeholder="Ej: sin lactosa, poco hielo..." />
            </label>
          </div>
          <button className="button button--primary button--full" type="button" onClick={onAdd}>
            <Plus aria-hidden="true" />
            Agregar al carrito
          </button>
        </div>
      </article>
    </div>
  )
}

function VisualPlaceholder({
  compact = false,
  label,
  tone,
}: {
  compact?: boolean
  label: string
  tone: VisualTone
}) {
  return (
    <div className={`visual-placeholder visual-placeholder--${tone} ${compact ? 'visual-placeholder--compact' : ''}`} role="img" aria-label={label}>
      <span className="visual-placeholder__shine" />
      <span className="visual-placeholder__plate" />
      <span className="visual-placeholder__accent" />
      <span className="visual-placeholder__label">{label.replace('Placeholder de ', '').replace('Placeholder editorial de ', '')}</span>
    </div>
  )
}

export default App

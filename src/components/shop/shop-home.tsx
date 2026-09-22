import { useMemo, useState, type FormEvent } from "react";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight, BadgeCheck, BatteryCharging, Cable, Car, Check, ChevronDown,
  Gamepad2, Headphones, Heart, Instagram, Menu, Minus, PackageCheck, Plus,
  Search, ShieldCheck, ShoppingBag, Smartphone, Sparkles, Star, Truck,
  UserRound, Watch, X, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { categories, products, type Category, type Product } from "@/data/products";
import heroTech from "@/assets/hero-tech.jpg";
import casesImage from "@/assets/product-cases.jpg";
import chargingImage from "@/assets/product-charging.jpg";

const money = new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" });
const categoryIcons: LucideIcon[] = [Smartphone, Cable, Headphones, BatteryCharging, Watch, Car, Gamepad2, Sparkles];

export function ShopHome() {
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<Category>("Todos");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const shownProducts = useMemo(() => products.filter((product) => {
    const matchesCategory = activeCategory === "Todos" || product.category === activeCategory;
    const haystack = `${product.name} ${product.category}`.toLowerCase();
    return matchesCategory && haystack.includes(search.trim().toLowerCase());
  }), [activeCategory, search]);

  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const cartTotal = Object.entries(cart).reduce((sum, [id, qty]) => {
    const product = products.find((item) => item.id === Number(id));
    return sum + (product?.price ?? 0) * qty;
  }, 0);

  const addToCart = (product: Product) => {
    setCart((current) => ({ ...current, [product.id]: (current[product.id] ?? 0) + 1 }));
    setCartOpen(true);
  };

  const setQuantity = (id: number, qty: number) => {
    setCart((current) => {
      const next = { ...current };
      if (qty <= 0) delete next[id]; else next[id] = qty;
      return next;
    });
  };

  const chooseCategory = (category: Category) => {
    setActiveCategory(category);
    document.querySelector("#productos")?.scrollIntoView({ behavior: "smooth" });
  };

  const submitNewsletter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <div className="bg-dark-surface text-primary-foreground">
        <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x divide-primary-foreground/20 px-4 py-2 text-[10px] font-semibold sm:text-xs">
          <TopItem icon={Truck} text="Envíos a todo el país" />
          <TopItem icon={ShieldCheck} text="Pagos seguros" />
          <TopItem icon={Headphones} text="Soporte 24/7" />
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto grid h-18 max-w-7xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-4 lg:h-20 lg:px-6">
          <a href="#inicio" className="text-xl font-extrabold tracking-tight sm:text-2xl">Essencia<span className="text-primary">Shop</span></a>
          <nav className="mx-auto hidden items-center gap-7 lg:flex">
            <NavLink href="#inicio">Inicio</NavLink><NavLink href="#productos">Tienda</NavLink><NavLink href="#categorias">Categorías</NavLink><NavLink href="#ofertas">Ofertas</NavLink><NavLink href="#productos">Novedades</NavLink>
          </nav>
          <div className="flex shrink-0 items-center justify-end gap-1 sm:gap-2">
            <button aria-label="Buscar" title="Buscar" onClick={() => setSearchOpen((value) => !value)} className="grid size-10 place-items-center rounded-full transition hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><Search className="size-5" /></button>
            <button aria-label="Cuenta" title="Cuenta" className="hidden size-10 place-items-center rounded-full transition hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:grid"><UserRound className="size-5" /></button>
            <button aria-label="Favoritos" title="Favoritos" onClick={() => { setActiveCategory("Todos"); setSearch(""); document.querySelector("#productos")?.scrollIntoView({ behavior: "smooth" }); }} className="relative hidden size-10 place-items-center rounded-full transition hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:grid"><Heart className="size-5" />{favorites.length > 0 && <Count value={favorites.length} />}</button>
            <button aria-label="Abrir carrito" title="Carrito" onClick={() => setCartOpen(true)} className="relative grid size-10 place-items-center rounded-full transition hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><ShoppingBag className="size-5" />{cartCount > 0 && <Count value={cartCount} />}</button>
            <button aria-label="Abrir menú" title="Menú" onClick={() => setMenuOpen(true)} className="grid size-10 place-items-center rounded-full transition hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring lg:hidden"><Menu className="size-5" /></button>
          </div>
        </div>
        {searchOpen && <div className="border-t border-border/60 px-4 py-3"><div className="relative mx-auto max-w-2xl"><Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input autoFocus value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar fundas, cargadores, audio..." className="h-12 rounded-xl bg-card pl-11 pr-11" /><button aria-label="Cerrar búsqueda" onClick={() => setSearchOpen(false)} className="absolute right-3 top-1/2 grid size-7 -translate-y-1/2 place-items-center rounded-full hover:bg-secondary"><X className="size-4" /></button></div></div>}
      </header>

      <main>
        <section id="inicio" className="relative mx-auto max-w-[1440px] px-4 pt-4 sm:px-6 sm:pt-6">
          <div className="relative min-h-[690px] overflow-hidden rounded-[2rem] bg-secondary sm:min-h-[660px] lg:min-h-[720px]">
            <img src={heroTech} alt="Smartphone, auriculares, reloj, batería y cargador inalámbrico" width={1600} height={1200} className="absolute inset-0 h-full w-full object-cover object-[58%_center] lg:object-center" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/88 to-background/5" />
            <div className="relative z-10 flex min-h-[690px] max-w-2xl flex-col justify-center px-6 py-16 sm:min-h-[660px] sm:px-12 lg:min-h-[720px] lg:px-20">
              <div className="mb-6 flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-background/70 px-4 py-2 text-xs font-bold text-primary backdrop-blur-lg"><Zap className="size-3.5 fill-current" /> ACCESORIOS · GADGETS · TECNOLOGÍA</div>
              <h1 className="max-w-xl text-balance text-5xl font-extrabold leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl">Tecnología que <span className="text-primary">encaja contigo.</span></h1>
              <p className="mt-6 max-w-lg text-base leading-7 text-muted-foreground sm:text-lg">Accesorios seleccionados para hacer tu día más simple, conectado y extraordinario.</p>
              <div className="mt-8"><Button variant="premium" size="lg" asChild><a href="#productos">Comprar ahora <ArrowRight /></a></Button></div>
              <div className="mt-10 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
                <HeroBenefit icon={Truck} title="Envío nacional" text="Rápido y rastreable" />
                <HeroBenefit icon={ShieldCheck} title="Pago protegido" text="Compra con confianza" />
                <HeroBenefit icon={BadgeCheck} title="Garantía" text="30 días de respaldo" />
              </div>
            </div>
          </div>
        </section>

        <section id="categorias" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <SectionHeading eyebrow="Explora lo esencial" title="Encuentra lo que necesitas" action="Ver productos" href="#productos" />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {categories.slice(1).map((category, index) => { const Icon = categoryIcons[index] ?? Sparkles; return <button key={category} onClick={() => chooseCategory(category)} className="group flex min-h-36 flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card px-3 py-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-glass focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><span className="grid size-12 place-items-center rounded-xl bg-secondary text-primary transition group-hover:bg-primary group-hover:text-primary-foreground"><Icon className="size-5" /></span><span className="text-xs font-bold leading-4">{category}</span></button>; })}
          </div>
        </section>

        <section id="productos" className="border-y border-border/70 bg-card py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeading eyebrow="Selección Essencia" title="Productos destacados" />
            <div className="mt-8 flex gap-2 overflow-x-auto pb-3">
              {categories.map((category) => <Button key={category} variant={activeCategory === category ? "default" : "outline"} className="shrink-0 rounded-full" onClick={() => setActiveCategory(category)}>{category}</Button>)}
            </div>
            {search && <div className="mt-4 flex items-center justify-between rounded-xl bg-secondary px-4 py-3 text-sm"><span>Resultados para <strong>“{search}”</strong></span><button onClick={() => setSearch("")} className="font-bold text-primary">Limpiar</button></div>}
            {shownProducts.length > 0 ? <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">{shownProducts.map((product) => <ProductCard key={product.id} product={product} favorite={favorites.includes(product.id)} onFavorite={() => setFavorites((current) => current.includes(product.id) ? current.filter((id) => id !== product.id) : [...current, product.id])} onAdd={() => addToCart(product)} />)}</div> : <div className="mt-8 rounded-2xl border border-dashed border-border py-20 text-center"><Search className="mx-auto size-8 text-muted-foreground" /><h3 className="mt-4 font-bold">No encontramos productos</h3><p className="mt-1 text-sm text-muted-foreground">Prueba otra búsqueda o categoría.</p></div>}
          </div>
        </section>

        <section id="ofertas" className="mx-auto grid max-w-7xl gap-5 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
          <PromoBanner title="Carga sin límites" text="Energía compacta para todos tus dispositivos." image={chargingImage} action={() => chooseCategory("Cargadores y Cables")} dark />
          <PromoBanner title="Fundas premium para tu teléfono" text="Protección sofisticada, diseñada para destacar." image={casesImage} action={() => chooseCategory("Fundas y Protectores")} />
        </section>

        <section className="bg-secondary/70 py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="max-w-2xl"><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Comprar mejor</p><h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-5xl">¿Por qué elegir EssenciaShop?</h2></div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"><Reason icon={Sparkles} title="Productos seleccionados" text="Elegimos accesorios útiles, actuales y con diseño cuidado." /><Reason icon={PackageCheck} title="Envíos con seguimiento" text="Sigue tu pedido desde que sale hasta que llega a tus manos." /><Reason icon={ShieldCheck} title="Pagos seguros" text="Tu compra está protegida en cada paso del proceso." /><Reason icon={Headphones} title="Atención 24/7" text="Estamos disponibles para ayudarte cuando lo necesites." /></div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
          <SectionHeading eyebrow="Opiniones verificadas" title="Lo cuentan nuestros clientes" />
          <div className="mt-10 grid gap-5 md:grid-cols-3"><Testimonial quote="La calidad se siente desde que abres el paquete. El cargador es compacto y carga rapidísimo." name="Laura M." label="Compra verificada" /><Testimonial quote="La funda queda perfecta y se ve mucho mejor que en las fotos. Volveré a comprar sin duda." name="Carlos R." label="Compra verificada" /><Testimonial quote="Mi pedido llegó antes de lo esperado y el seguimiento fue muy claro. Excelente experiencia." name="Andrea P." label="Compra verificada" /></div>
        </section>

        <section className="px-4 pb-20 sm:px-6 lg:pb-28">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12 sm:py-20">
            <div className="relative z-10 mx-auto max-w-2xl"><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary-foreground/70">Sé el primero en saberlo</p><h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-5xl">Suscríbete y recibe ofertas exclusivas</h2><p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-primary-foreground/75 sm:text-base">Novedades, lanzamientos y descuentos seleccionados directamente en tu correo.</p>{subscribed ? <div className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-xl bg-primary-foreground/15 px-5 py-3 font-bold"><Check className="size-5" /> ¡Gracias por suscribirte!</div> : <form onSubmit={submitNewsletter} className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"><Input required type="email" aria-label="Correo electrónico" placeholder="tu@email.com" className="h-13 border-primary-foreground/30 bg-primary-foreground text-foreground placeholder:text-muted-foreground sm:flex-1" /><Button type="submit" variant="secondary" className="h-13 rounded-xl px-6">Suscribirme <ArrowRight /></Button></form>}</div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileMenu open={menuOpen} setOpen={setMenuOpen} />
      <CartDrawer open={cartOpen} setOpen={setCartOpen} cart={cart} total={cartTotal} setQuantity={setQuantity} />
    </div>
  );
}

function TopItem({ icon: Icon, text }: { icon: typeof Truck; text: string }) { return <div className="flex min-w-0 items-center justify-center gap-1.5 px-2"><Icon className="size-3.5 shrink-0" /><span className="truncate">{text}</span></div>; }
function NavLink({ href, children }: { href: string; children: string }) { return <a href={href} className="text-sm font-semibold text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">{children}</a>; }
function Count({ value }: { value: number }) { return <span className="absolute -right-0.5 -top-0.5 grid min-h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[9px] font-extrabold text-primary-foreground">{value}</span>; }
function HeroBenefit({ icon: Icon, title, text }: { icon: typeof Truck; title: string; text: string }) { return <div className="glass-panel flex items-center gap-3 rounded-xl p-3"><span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground"><Icon className="size-4" /></span><span className="min-w-0"><strong className="block text-xs">{title}</strong><span className="block truncate text-[10px] text-muted-foreground">{text}</span></span></div>; }
function SectionHeading({ eyebrow, title, action, href }: { eyebrow: string; title: string; action?: string; href?: string }) { return <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4"><div className="min-w-0"><p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">{eyebrow}</p><h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-5xl">{title}</h2></div>{action && href && <a href={href} className="hidden items-center gap-2 text-sm font-bold text-primary hover:underline sm:flex">{action}<ArrowRight className="size-4" /></a>}</div>; }

function ProductCard({ product, favorite, onFavorite, onAdd }: { product: Product; favorite: boolean; onFavorite: () => void; onAdd: () => void }) {
  return <article className="group relative overflow-hidden rounded-2xl border border-border bg-background p-3 transition duration-300 hover:-translate-y-1 hover:shadow-glass"><div className="relative aspect-square overflow-hidden rounded-xl bg-secondary"><img src={product.image} alt={product.name} loading="lazy" width={1008} height={1008} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />{product.badge && <span className="absolute left-3 top-3 rounded-full bg-foreground px-3 py-1.5 text-[10px] font-extrabold uppercase text-background">{product.badge}</span>}<button onClick={onFavorite} aria-label={favorite ? "Quitar de favoritos" : "Añadir a favoritos"} className={`absolute right-3 top-3 grid size-10 place-items-center rounded-full border border-glass-border bg-glass backdrop-blur-lg transition ${favorite ? "text-destructive" : "text-foreground hover:text-destructive"}`}><Heart className={`size-4 ${favorite ? "fill-current" : ""}`} /></button></div><div className="p-2 pt-4"><p className="text-[11px] font-bold uppercase text-muted-foreground">{product.category}</p><h3 className="mt-1 min-h-12 font-bold leading-6">{product.name}</h3><div className="mt-2 flex items-center gap-1 text-xs"><span className="flex text-primary"><Star className="size-3.5 fill-current" /></span><strong>{product.rating}</strong><span className="text-muted-foreground">({product.reviews})</span></div><div className="mt-4 flex items-end justify-between gap-2"><div><strong className="text-xl">{money.format(product.price)}</strong><span className="ml-2 text-xs text-muted-foreground line-through">{money.format(product.oldPrice)}</span></div></div><Button onClick={onAdd} className="mt-4 h-11 w-full rounded-xl">Añadir al carrito <ShoppingBag /></Button></div></article>;
}

function PromoBanner({ title, text, image, action, dark = false }: { title: string; text: string; image: string; action: () => void; dark?: boolean }) { return <div className={`relative min-h-96 overflow-hidden rounded-[2rem] ${dark ? "bg-dark-surface text-primary-foreground" : "bg-secondary text-foreground"}`}><img src={image} alt="" loading="lazy" width={1008} height={1008} className="absolute right-0 top-0 h-full w-[62%] object-cover object-center opacity-90" /><div className={`absolute inset-0 ${dark ? "bg-gradient-to-r from-dark-surface via-dark-surface/90 to-transparent" : "bg-gradient-to-r from-secondary via-secondary/90 to-transparent"}`} /><div className="relative z-10 flex h-full min-h-96 max-w-[65%] flex-col justify-center p-7 sm:p-10"><p className={`text-xs font-extrabold uppercase tracking-[0.18em] ${dark ? "text-primary-foreground/60" : "text-primary"}`}>Oferta especial</p><h3 className="mt-3 text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h3><p className={`mt-3 text-sm leading-6 ${dark ? "text-primary-foreground/65" : "text-muted-foreground"}`}>{text}</p><Button variant={dark ? "secondary" : "default"} className="mt-7 w-fit rounded-xl" onClick={action}>Descubrir <ArrowRight /></Button></div></div>; }
function Reason({ icon: Icon, title, text }: { icon: typeof Truck; title: string; text: string }) { return <div><span className="grid size-12 place-items-center rounded-xl bg-card text-primary shadow-sm"><Icon className="size-5" /></span><h3 className="mt-5 font-extrabold">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p></div>; }
function Testimonial({ quote, name, label }: { quote: string; name: string; label: string }) { return <blockquote className="rounded-2xl border border-border bg-card p-7 shadow-sm"><div className="flex text-primary">{Array.from({ length: 5 }).map((_, index) => <Star key={index} className="size-4 fill-current" />)}</div><p className="mt-5 text-sm leading-7">“{quote}”</p><footer className="mt-6 border-t border-border pt-5"><strong className="block text-sm">{name}</strong><span className="text-xs text-muted-foreground">{label}</span></footer></blockquote>; }

function MobileMenu({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) { return <Sheet open={open} onOpenChange={setOpen}><SheetContent side="right" className="w-[88%]"><SheetHeader><SheetTitle>EssenciaShop</SheetTitle><SheetDescription>Explora nuestra tienda.</SheetDescription></SheetHeader><nav className="mt-10 flex flex-col">{[["Inicio", "#inicio"], ["Tienda", "#productos"], ["Categorías", "#categorias"], ["Ofertas", "#ofertas"], ["Novedades", "#productos"]].map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-border py-5 text-lg font-bold">{label}<ArrowRight className="size-4 text-primary" /></a>)}</nav></SheetContent></Sheet>; }

function CartDrawer({ open, setOpen, cart, total, setQuantity }: { open: boolean; setOpen: (open: boolean) => void; cart: Record<number, number>; total: number; setQuantity: (id: number, qty: number) => void }) {
  const rows = Object.entries(cart).map(([id, qty]) => ({ product: products.find((product) => product.id === Number(id)), qty })).filter((row): row is { product: Product; qty: number } => Boolean(row.product));
  return <Sheet open={open} onOpenChange={setOpen}><SheetContent side="right" className="flex w-[92%] flex-col sm:max-w-md"><SheetHeader><SheetTitle>Tu carrito</SheetTitle><SheetDescription>{rows.length ? `${rows.length} productos seleccionados` : "Aún no has añadido productos."}</SheetDescription></SheetHeader>{rows.length ? <><div className="mt-6 flex-1 space-y-4 overflow-y-auto">{rows.map(({ product, qty }) => <div key={product.id} className="grid grid-cols-[72px_minmax(0,1fr)] gap-3 rounded-xl border border-border p-2"><img src={product.image} alt="" width={1008} height={1008} className="aspect-square rounded-lg object-cover" /><div className="min-w-0"><strong className="block truncate text-sm">{product.name}</strong><span className="text-sm text-primary">{money.format(product.price)}</span><div className="mt-2 flex items-center gap-3"><button aria-label="Restar unidad" onClick={() => setQuantity(product.id, qty - 1)} className="grid size-7 place-items-center rounded-full bg-secondary"><Minus className="size-3" /></button><span className="text-sm font-bold">{qty}</span><button aria-label="Sumar unidad" onClick={() => setQuantity(product.id, qty + 1)} className="grid size-7 place-items-center rounded-full bg-secondary"><Plus className="size-3" /></button></div></div></div>)}</div><div className="border-t border-border pt-5"><div className="flex items-center justify-between"><span className="font-bold">Subtotal</span><strong className="text-xl">{money.format(total)}</strong></div><p className="mt-2 text-xs text-muted-foreground">Impuestos y envío se calculan en el siguiente paso.</p><Button className="mt-5 h-12 w-full rounded-xl">Continuar compra <ArrowRight /></Button></div></> : <div className="grid flex-1 place-items-center text-center"><div><ShoppingBag className="mx-auto size-10 text-muted-foreground" /><h3 className="mt-4 font-bold">Tu carrito está vacío</h3><Button variant="outline" className="mt-5" onClick={() => setOpen(false)}>Seguir comprando</Button></div></div>}</SheetContent></Sheet>;
}

function Footer() { return <footer className="bg-dark-surface text-primary-foreground"><div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20"><div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]"><div><a href="#inicio" className="text-2xl font-extrabold">Essencia<span className="text-electric">Shop</span></a><p className="mt-4 max-w-sm text-sm leading-6 text-primary-foreground/60">Tecnología útil y accesorios seleccionados para acompañarte cada día.</p><div className="mt-6 flex gap-2"><Social icon={Instagram} label="Instagram" /><Social icon={Heart} label="TikTok" /><Social icon={Smartphone} label="Facebook" /></div></div><FooterColumn title="Navegación" links={["Inicio", "Tienda", "Categorías", "Ofertas"]} /><FooterColumn title="Ayuda" links={["Preguntas frecuentes", "Envíos y entregas", "Cambios y devoluciones", "Seguimiento"]} /><div><h3 className="text-sm font-extrabold">Contacto</h3><ul className="mt-5 space-y-3 text-sm text-primary-foreground/60"><li>hola@essenciashop.com</li><li>Lunes a domingo, 24/7</li><li>Atención en todo el país</li></ul><div className="mt-7 flex gap-2">{["VISA", "MC", "AMEX"].map((method) => <span key={method} className="rounded-md border border-primary-foreground/20 px-2 py-1 text-[10px] font-extrabold">{method}</span>)}</div></div></div><div className="mt-14 flex flex-col justify-between gap-3 border-t border-primary-foreground/10 pt-6 text-xs text-primary-foreground/45 sm:flex-row"><span>© 2026 EssenciaShop. Prototipo visual.</span><span>Privacidad · Términos · Cookies</span></div></div></footer>; }
function Social({ icon: Icon, label }: { icon: typeof Instagram; label: string }) { return <a href="#inicio" aria-label={label} title={label} className="grid size-10 place-items-center rounded-full border border-primary-foreground/15 text-primary-foreground/70 transition hover:border-primary-foreground/40 hover:text-primary-foreground"><Icon className="size-4" /></a>; }
function FooterColumn({ title, links }: { title: string; links: string[] }) { return <div><h3 className="text-sm font-extrabold">{title}</h3><ul className="mt-5 space-y-3">{links.map((link) => <li key={link}><a href={link === "Inicio" ? "#inicio" : "#productos"} className="text-sm text-primary-foreground/60 transition hover:text-primary-foreground">{link}</a></li>)}</ul></div>; }

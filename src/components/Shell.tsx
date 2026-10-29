import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Home, LayoutGrid, IceCreamCone, ShoppingBag, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart";
import { BRAND, whatsappUrl } from "@/lib/config";
import type { Product } from "@/lib/catalog";
import { PRICE_LABEL } from "@/lib/catalog";

export function Logo() {
  return (
    <Link to="/" className="font-display text-2xl font-extrabold tracking-tight text-primary" aria-label="Caram, inicio">
      {BRAND.name.toLowerCase()}<span className="text-foreground">.</span>
    </Link>
  );
}

export function Header() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-30 bg-background/90 backdrop-blur border-b border-border">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
        <Logo />
        <nav className="hidden gap-6 text-sm font-medium md:flex" aria-label="Principal">
          <Link to="/" className="nav-link" activeOptions={{ exact: true }}>Inicio</Link>
          <Link to="/catalogo" className="nav-link" activeOptions={{ exact: true }}>Catálogo</Link>
          <Link to="/categoria/$id" params={{ id: "helados" }} className="nav-link">Helados</Link>
          <Link to="/dulces" className="nav-link">Dulces</Link>
        </nav>
        <Link to="/carrito" className="relative rounded-full bg-card p-2.5 shadow-soft" aria-label={`Carrito, ${count} productos`}>
          <ShoppingBag className="h-5 w-5" />
          {count > 0 && (
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">{count}</span>
          )}
        </Link>
      </div>
    </header>
  );
}

function BottomNav() {
  const { count } = useCart();
  const item = "flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-medium text-muted-foreground data-[status=active]:text-primary";
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card md:hidden" aria-label="Navegación inferior">
      <div className="mx-auto flex max-w-md">
        <Link to="/" className={item} activeOptions={{ exact: true }}><Home className="h-5 w-5" />Inicio</Link>
        <Link to="/catalogo" className={item}><LayoutGrid className="h-5 w-5" />Catálogo</Link>
        <Link to="/categoria/$id" params={{ id: "helados" }} className={item}><IceCreamCone className="h-5 w-5" />Helados</Link>
        <Link to="/carrito" className={item}><ShoppingBag className="h-5 w-5" />Carrito{count > 0 ? ` (${count})` : ""}</Link>
      </div>
    </nav>
  );
}

export function Page({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen pb-24 md:pb-10">
      <Header />
      <main className="mx-auto max-w-5xl px-5">{children}</main>
      <footer className="mx-auto mt-12 max-w-5xl px-5 text-center text-xs text-muted-foreground">
        © Helados {BRAND.name} · {BRAND.slogan}
      </footer>
      <BottomNav />
    </div>
  );
}

export function WhatsAppButton({ message, label = "Pedir por WhatsApp", className = "" }: { message: string; label?: string; className?: string }) {
  const url = whatsappUrl(message);
  if (!url)
    return (
      <div className={className}>
        <button type="button" disabled className="btn-whatsapp w-full" aria-describedby="wa-note">
          <MessageCircle className="h-5 w-5" /> {label}
        </button>
        <p id="wa-note" className="mt-2 text-center text-xs text-muted-foreground">WhatsApp aún no configurado.</p>
      </div>
    );
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={`btn-whatsapp ${className}`}>
      <MessageCircle className="h-5 w-5" /> {label}
    </a>
  );
}

export function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  return (
    <article className="group overflow-hidden rounded-3xl bg-card shadow-soft">
      <Link to="/producto/$id" params={{ id: p.id }} className="block">
        <img src={p.image} alt={p.name} loading="lazy" width={1024} height={1024} className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      </Link>
      <div className="p-3.5">
        <Link to="/producto/$id" params={{ id: p.id }} className="font-display text-[15px] font-bold leading-tight">{p.name}</Link>
        <p className="mt-1 text-[11px] text-muted-foreground">{PRICE_LABEL}</p>
        <button onClick={() => add(p.id)} className="mt-3 w-full rounded-full bg-primary py-2 text-xs font-semibold text-primary-foreground transition hover:brightness-105" aria-label={`Añadir ${p.name} al carrito`}>
          Añadir
        </button>
      </div>
    </article>
  );
}

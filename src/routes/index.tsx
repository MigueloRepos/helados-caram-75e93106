import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Page, ProductCard, WhatsAppButton } from "@/components/Shell";
import { CATEGORIES, PRODUCTS } from "@/lib/catalog";
import { BRAND } from "@/lib/config";
import hero from "@/assets/helados.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Helados Caram — La felicidad tiene un sabor" },
      { name: "description", content: "Helados y dulces Caram. Elige tus favoritos y pide por WhatsApp." },
      { property: "og:title", content: "Helados Caram — La felicidad tiene un sabor" },
      { property: "og:description", content: "Helados y dulces Caram. Pide por WhatsApp." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <Page>
      <section className="mt-5 overflow-hidden rounded-[2rem] bg-hero md:grid md:grid-cols-2 md:items-center">
        <div className="p-7 md:p-12">
          <h1 className="font-display text-7xl font-extrabold tracking-tight text-primary md:text-8xl">{BRAND.name}</h1>
          <p className="mt-1 text-lg font-semibold">{BRAND.slogan}</p>
          <h2 className="mt-6 font-display text-3xl font-extrabold leading-[1.1] md:text-5xl">Helados que hacen la vida más dulce</h2>
          <WhatsAppButton message="¡Hola Caram! Quiero hacer un pedido." label="Pedir ahora por WhatsApp" className="mt-6 max-w-xs" />
          <Link to="/catalogo" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">Ver productos <ArrowRight className="h-4 w-4" /></Link>
        </div>
        <img src={hero} alt="Helados Caram en vaso" width={1024} height={1024} className="aspect-square w-full object-cover" />
      </section>

      <ul className="mt-6 grid grid-cols-3 gap-2 text-center text-xs font-semibold">
        {["Domicilio en Puerto Padre", "Rápido y seguro", "100% artesanal"].map((t) => (
          <li key={t} className="rounded-2xl bg-card px-2 py-3 shadow-soft">{t}</li>
        ))}
      </ul>
      <section className="mt-10" aria-labelledby="cat-h">
        <div className="flex items-end justify-between">
          <h2 id="cat-h" className="font-display text-2xl font-bold">Categorías</h2>
          <Link to="/catalogo" className="text-sm font-semibold text-primary">Ver todo</Link>
        </div>
        <div className="-mx-5 mt-4 flex gap-3 overflow-x-auto px-5 pb-2">
          {CATEGORIES.map((c) => (
            <Link key={c.id} to="/categoria/$id" params={{ id: c.id }} className="w-24 shrink-0 text-center">
              <img src={c.image} alt="" loading="lazy" width={1024} height={1024} className="aspect-square w-24 rounded-full object-cover ring-2 ring-primary/20" />
              <span className="mt-2 block text-xs font-semibold">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10" aria-labelledby="fav-h">
        <h2 id="fav-h" className="font-display text-2xl font-bold">Nuestros sabores</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          {PRODUCTS.filter((p) => p.category === "helados").slice(0, 4).map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>

      <section className="mt-10 rounded-[2rem] bg-card p-7 text-center shadow-soft">
        <h2 className="font-display text-xl font-bold">¿Tienes antojo?</h2>
        <p className="mt-1 text-sm text-muted-foreground">Escríbenos y te confirmamos precios y disponibilidad.</p>
        <WhatsAppButton message="¡Hola Caram! Quiero información sobre sus helados y dulces." label="Escribir por WhatsApp" className="mx-auto mt-5 max-w-xs" />
      </section>
    </Page>
  );
}

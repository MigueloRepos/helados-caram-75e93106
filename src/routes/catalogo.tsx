import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/Shell";
import { CATEGORIES } from "@/lib/catalog";

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title: "Catálogo — Helados Caram" },
      { name: "description", content: "Helados, cake, brazo de gitano, mini cake, marquesitas y capuchinos Caram." },
      { property: "og:title", content: "Catálogo — Helados Caram" },
      { property: "og:description", content: "Todo lo que ofrece Caram." },
    ],
  }),
  component: Catalogo,
});

function Catalogo() {
  return (
    <Page>
      <h1 className="mt-6 font-display text-3xl font-extrabold">Catálogo</h1>
      <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3">
        {CATEGORIES.map((c) => (
          <Link key={c.id} to="/categoria/$id" params={{ id: c.id }} className="group relative overflow-hidden rounded-3xl shadow-soft">
            <img src={c.image} alt="" loading="lazy" width={1024} height={1024} className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <span className="absolute inset-x-3 bottom-3 rounded-2xl bg-card/95 px-3 py-2 font-display text-sm font-bold">{c.name}</span>
          </Link>
        ))}
      </div>
      <Link to="/dulces" className="mt-6 block rounded-3xl bg-primary p-5 font-display font-bold text-primary-foreground">Ver todos los dulces →</Link>
    </Page>
  );
}

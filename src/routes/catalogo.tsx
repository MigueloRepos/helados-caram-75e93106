import { createFileRoute, Link } from "@tanstack/react-router";
import { Page } from "@/components/Shell";
import { CATEGORIES, DULCES_IMAGE } from "@/lib/catalog";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/catalogo")({
  head: () => ({
    meta: [
      { title: "Nuestros Productos — Helados Caram" },
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
      <h1 className="mt-6 font-display text-3xl font-extrabold">Nuestros Productos</h1>
      <ul className="mt-5 space-y-3">
        {[CATEGORIES[0], { id: "dulces", name: "Dulces", image: DULCES_IMAGE }, ...CATEGORIES.slice(1)].map((c) => (
          <li key={c.id}>
            {c.id === "dulces" ? (
              <Link to="/dulces" className="flex items-center gap-4 rounded-3xl bg-card p-3 shadow-soft"><img src={c.image} alt="" loading="lazy" width={816} height={816} className="h-16 w-16 rounded-2xl object-cover" /><span className="flex-1 font-display font-bold">{c.name}</span><ChevronRight className="h-5 w-5 text-primary" /></Link>
            ) : (
              <Link to="/categoria/$id" params={{ id: c.id }} className="flex items-center gap-4 rounded-3xl bg-card p-3 shadow-soft"><img src={c.image} alt="" loading="lazy" width={816} height={816} className="h-16 w-16 rounded-2xl object-cover" /><span className="flex-1 font-display font-bold">{c.name}</span><ChevronRight className="h-5 w-5 text-primary" /></Link>
            )}
          </li>
        ))}
      </ul>
        ))}
      </div>
      <Link to="/dulces" className="mt-6 block rounded-3xl bg-primary p-5 font-display font-bold text-primary-foreground">Ver todos los dulces →</Link>
    </Page>
  );
}

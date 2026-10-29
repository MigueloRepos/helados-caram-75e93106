import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Page, ProductCard } from "@/components/Shell";
import { CATEGORIES, PRODUCTS, getCategory } from "@/lib/catalog";

export const Route = createFileRoute("/categoria/$id")({
  loader: ({ params }) => {
    const c = getCategory(params.id);
    if (!c) throw notFound();
    return { name: c.name };
  },
  head: ({ loaderData }) => {
    const t = `${loaderData?.name ?? "Categoría"} — Helados Caram`;
    return { meta: [
      { title: t }, { name: "description", content: `${loaderData?.name ?? ""} Caram. Pide por WhatsApp.` },
      { property: "og:title", content: t }, { property: "og:description", content: "Pide por WhatsApp." },
    ] };
  },
  component: CategoriaPage,
});

function CategoriaPage() {
  const { id } = Route.useParams();
  const cat = getCategory(id)!;
  return (
    <Page>
      <div className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1" role="tablist" aria-label="Categorías">
        {CATEGORIES.map((c) => (
          <Link key={c.id} to="/categoria/$id" params={{ id: c.id }} className="chip" aria-current={c.id === id ? "page" : undefined}>{c.name}</Link>
        ))}
      </div>
      <h1 className="mt-6 font-display text-3xl font-extrabold">{cat.name}</h1>
      {id === "helados" && <p className="mt-1 text-sm text-muted-foreground">8 sabores confirmados</p>}
      <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
        {PRODUCTS.filter((p) => p.category === id).map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </Page>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Page, ProductCard } from "@/components/Shell";
import { CATEGORIES, PRODUCTS } from "@/lib/catalog";

export const Route = createFileRoute("/dulces")({
  head: () => ({
    meta: [
      { title: "Dulces — Helados Caram" },
      { name: "description", content: "Cake, brazo de gitano, mini cake, marquesitas y capuchinos Caram." },
      { property: "og:title", content: "Dulces — Helados Caram" },
      { property: "og:description", content: "Los dulces de Caram." },
    ],
  }),
  component: Dulces,
});

function Dulces() {
  const ids = CATEGORIES.filter((c) => c.group === "dulces").map((c) => c.id);
  return (
    <Page>
      <h1 className="mt-6 font-display text-3xl font-extrabold">Dulces</h1>
      <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
        {PRODUCTS.filter((p) => ids.includes(p.category)).map((p) => <ProductCard key={p.id} p={p} />)}
      </div>
    </Page>
  );
}

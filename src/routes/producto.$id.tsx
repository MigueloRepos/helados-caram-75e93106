import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { Page, WhatsAppButton } from "@/components/Shell";
import { PRICE_LABEL, getCategory, getProduct } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/producto/$id")({
  loader: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return { name: p.name };
  },
  head: ({ loaderData }) => {
    const t = `${loaderData?.name ?? "Producto"} — Helados Caram`;
    return { meta: [
      { title: t }, { name: "description", content: `${loaderData?.name ?? ""}. ${PRICE_LABEL}.` },
      { property: "og:title", content: t }, { property: "og:description", content: PRICE_LABEL },
    ] };
  },
  component: Detalle,
});

function Detalle() {
  const { id } = Route.useParams();
  const p = getProduct(id)!;
  const cat = getCategory(p.category)!;
  const { add } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  return (
    <Page>
      <button onClick={() => router.history.back()} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-muted-foreground"><ArrowLeft className="h-4 w-4" /> Volver</button>
      <div className="mt-3 md:grid md:grid-cols-2 md:gap-10">
        <img src={p.image} alt={p.name} width={1024} height={1024} className="aspect-square w-full rounded-[2rem] object-cover shadow-soft" />
        <div className="mt-6 md:mt-0">
          <Link to="/categoria/$id" params={{ id: cat.id }} className="chip">{cat.name}</Link>
          <h1 className="mt-3 font-display text-3xl font-extrabold">{p.name}</h1>
          <p className="mt-1 text-muted-foreground">{p.subtitle}</p>
          <p className="mt-4 rounded-2xl bg-secondary px-4 py-3 text-sm font-semibold text-secondary-foreground">{PRICE_LABEL}</p>
          <div className="mt-6 flex items-center gap-4">
            <span className="text-sm font-medium">Cantidad</span>
            <div className="flex items-center rounded-full bg-card shadow-soft">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="p-3" aria-label="Restar"><Minus className="h-4 w-4" /></button>
              <span className="w-8 text-center font-bold" aria-live="polite">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="p-3" aria-label="Sumar"><Plus className="h-4 w-4" /></button>
            </div>
          </div>
          <button onClick={() => { add(p.id, qty); toast.success(`${qty} x ${p.name} añadido al carrito`); }} className="btn-primary mt-6 w-full">Añadir al carrito</button>
          <WhatsAppButton message={`¡Hola Caram! Quiero ${qty} x ${p.name}. ¿Me confirman precio y disponibilidad?`} className="mt-3 w-full" />
        </div>
      </div>
    </Page>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Page } from "@/components/Shell";
import { PRICE_LABEL, getProduct } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/carrito")({
  head: () => ({
    meta: [
      { title: "Tu carrito — Helados Caram" },
      { name: "description", content: "Revisa tu pedido y envíalo por WhatsApp." },
      { property: "og:title", content: "Tu carrito — Helados Caram" },
      { property: "og:description", content: "Envía tu pedido por WhatsApp." },
    ],
  }),
  component: Carrito,
});

function Carrito() {
  const { items, setQty, remove, clear, count } = useCart();
  return (
    <Page>
      <h1 className="mt-6 font-display text-3xl font-extrabold">Tu pedido</h1>
      {items.length === 0 ? (
        <div className="mt-8 rounded-3xl bg-card p-8 text-center shadow-soft">
          <p className="text-muted-foreground">Tu pedido está vacío.</p>
          <Link to="/catalogo" className="btn-primary mt-5">Ver catálogo</Link>
        </div>
      ) : (
        <div className="mt-5 md:grid md:grid-cols-[1fr_320px] md:gap-8">
          <ul className="space-y-3">
            {items.map((i) => {
              const p = getProduct(i.id);
              if (!p) return null;
              return (
                <li key={i.id} className="flex items-center gap-3 rounded-3xl bg-card p-3 shadow-soft">
                  <img src={p.image} alt="" width={1024} height={1024} loading="lazy" className="h-20 w-20 rounded-2xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="font-display font-bold leading-tight">{p.variant ? `Helado — ${p.variant}` : p.name}</p>
                    <p className="text-[11px] text-muted-foreground">{PRICE_LABEL}</p>
                    <div className="mt-2 flex items-center rounded-full bg-secondary w-fit">
                      <button onClick={() => setQty(i.id, i.qty - 1)} className="p-2" aria-label={`Restar ${p.name}`}><Minus className="h-3.5 w-3.5" /></button>
                      <span className="w-6 text-center text-sm font-bold">{i.qty}</span>
                      <button onClick={() => setQty(i.id, i.qty + 1)} className="p-2" aria-label={`Sumar ${p.name}`}><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                  </div>
                  <button onClick={() => remove(i.id)} className="rounded-full p-2 text-muted-foreground hover:text-destructive" aria-label={`Eliminar ${p.name}`}><Trash2 className="h-5 w-5" /></button>
                </li>
              );
            })}
          </ul>
          <aside className="mt-6 h-fit rounded-3xl bg-card p-5 shadow-soft md:mt-0">
            <p className="flex justify-between text-sm"><span>Productos</span><strong>{count}</strong></p>
            <p className="mt-2 text-xs text-muted-foreground">{PRICE_LABEL}</p>
            <Link to="/pedido-listo" className="btn-primary mt-5 w-full">Confirmar pedido</Link>
            <button onClick={clear} className="mt-3 w-full text-sm font-medium text-muted-foreground underline">Vaciar carrito</button>
          </aside>
        </div>
      )}
    </Page>
  );
}

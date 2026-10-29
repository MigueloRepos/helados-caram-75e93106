import { createFileRoute, Link } from "@tanstack/react-router";
import { PartyPopper } from "lucide-react";
import { Page, WhatsAppButton } from "@/components/Shell";
import { PRICE_LABEL, getProduct } from "@/lib/catalog";
import { buildOrderMessage, useCart } from "@/lib/cart";

export const Route = createFileRoute("/pedido-listo")({
  head: () => ({ meta: [
    { title: "¡Tu pedido está listo! — Helados Caram" },
    { name: "description", content: "Envía tu pedido a Caram por WhatsApp." },
    { property: "og:title", content: "¡Tu pedido está listo! — Helados Caram" },
    { property: "og:description", content: "Envía tu pedido por WhatsApp." },
  ] }),
  component: Listo,
});

function Listo() {
  const { items } = useCart();
  return (
    <Page>
      <section className="mx-auto mt-10 max-w-md rounded-[2rem] bg-card p-7 text-center shadow-soft">
        <PartyPopper className="mx-auto h-12 w-12 text-primary" aria-hidden />
        <h1 className="mt-4 font-display text-3xl font-extrabold">¡Tu pedido está listo!</h1>
        {items.length === 0 ? (
          <><p className="mt-3 text-muted-foreground">Aún no has añadido productos.</p><Link to="/catalogo" className="btn-primary mt-5">Ver productos</Link></>
        ) : (
          <>
            <ul className="mt-5 space-y-1 text-left text-sm">
              {items.map((i) => { const p = getProduct(i.id); return <li key={i.id} className="flex justify-between border-b border-border py-2"><span>{p?.variant ? `Helado — ${p.variant}` : p?.name}</span><strong>x{i.qty}</strong></li>; })}
            </ul>
            <p className="mt-3 text-xs text-muted-foreground">{PRICE_LABEL}</p>
            <WhatsAppButton message={buildOrderMessage(items)} label="Enviar pedido por WhatsApp" className="mt-5 w-full" />
            <Link to="/carrito" className="mt-3 block text-sm font-medium text-muted-foreground underline">Editar pedido</Link>
          </>
        )}
      </section>
    </Page>
  );
}

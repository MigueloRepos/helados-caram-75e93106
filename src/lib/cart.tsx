import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getProduct } from "./catalog";

export type CartItem = { id: string; qty: number };
type Ctx = {
  items: CartItem[]; count: number;
  add: (id: string, qty?: number) => void; setQty: (id: string, qty: number) => void;
  remove: (id: string) => void; clear: () => void;
};
const CartContext = createContext<Ctx | null>(null);
const KEY = "caram-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try { setItems(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch { /* ignore */ }
    setLoaded(true);
  }, []);
  useEffect(() => { if (loaded) localStorage.setItem(KEY, JSON.stringify(items)); }, [items, loaded]);

  const add = (id: string, qty = 1) =>
    setItems((cur) => {
      const f = cur.find((i) => i.id === id);
      return f ? cur.map((i) => (i.id === id ? { ...i, qty: i.qty + qty } : i)) : [...cur, { id, qty }];
    });
  const setQty = (id: string, qty: number) =>
    setItems((cur) => (qty <= 0 ? cur.filter((i) => i.id !== id) : cur.map((i) => (i.id === id ? { ...i, qty } : i))));
  const remove = (id: string) => setItems((cur) => cur.filter((i) => i.id !== id));
  const clear = () => setItems([]);
  const count = items.reduce((s, i) => s + i.qty, 0);
  return <CartContext.Provider value={{ items, count, add, setQty, remove, clear }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart fuera de CartProvider");
  return c;
}

export function buildOrderMessage(items: CartItem[]): string {
  const lines = items.map((i) => `• ${i.qty} x ${getProduct(i.id)?.name ?? i.id}`);
  return `¡Hola Caram! Quiero hacer este pedido:\n${lines.join("\n")}\n\n¿Me confirman precio y disponibilidad?`;
}

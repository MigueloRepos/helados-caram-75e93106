import helados from "@/assets/helados.jpg";
import cake from "@/assets/cake.jpg";
import brazo from "@/assets/brazo.jpg";
import marquesitas from "@/assets/marquesitas.jpg";

export type CategoryId =
  | "helados" | "cake" | "brazo-de-gitano" | "mini-cake" | "marquesitas" | "capuchinos";

export interface Category { id: CategoryId; name: string; image: string; group: "helados" | "dulces" }
export interface Product { id: string; name: string; category: CategoryId; image: string; subtitle: string }

export const CATEGORIES: Category[] = [
  { id: "helados", name: "Helados", image: helados, group: "helados" },
  { id: "cake", name: "Cake", image: cake, group: "dulces" },
  { id: "brazo-de-gitano", name: "Brazo de gitano", image: brazo, group: "dulces" },
  { id: "mini-cake", name: "Mini cake", image: cake, group: "dulces" },
  { id: "marquesitas", name: "Marquesitas", image: marquesitas, group: "dulces" },
  { id: "capuchinos", name: "Capuchinos", image: marquesitas, group: "dulces" },
];

export const FLAVORS = [
  "Mantecado", "Tiramisú", "Fresa", "Tres Leches", "Moscatel", "Limón", "Naranja-Piña", "Chocolate",
];

const slug = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-");

export const PRODUCTS: Product[] = [
  ...FLAVORS.map((f) => ({
    id: `helado-${slug(f)}`, name: `Helado de ${f}`, category: "helados" as const, image: helados, subtitle: `Sabor ${f}`,
  })),
  ...CATEGORIES.filter((c) => c.group === "dulces").map((c) => ({
    id: c.id, name: c.name, category: c.id, image: c.image, subtitle: "Dulce Caram",
  })),
];

export const PRICE_LABEL = "Precio por confirmar en WhatsApp";

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
export const getCategory = (id: string) => CATEGORIES.find((c) => c.id === id);

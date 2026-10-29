import helados from "@/assets/helados.jpg";
import cake from "@/assets/cake.jpg";
import brazo from "@/assets/brazo.jpg";
import marquesitas from "@/assets/marquesitas2.jpg";
import minicake from "@/assets/minicake.jpg";
import capuchinos from "@/assets/capuchinos.jpg";
import dulcesImg from "@/assets/dulces.jpg";
const flavorImgs = import.meta.glob("@/assets/f-*.jpg", { eager: true, import: "default" }) as Record<string, string>;
export const DULCES_IMAGE = dulcesImg;

export type CategoryId =
  | "helados" | "cake" | "brazo-de-gitano" | "mini-cake" | "marquesitas" | "capuchinos";

export interface Category { id: CategoryId; name: string; image: string; group: "helados" | "dulces" }
export interface Product { id: string; name: string; category: CategoryId; image: string; subtitle: string; variant?: string }

export const CATEGORIES: Category[] = [
  { id: "helados", name: "Helados", image: helados, group: "helados" },
  { id: "cake", name: "Cake", image: cake, group: "dulces" },
  { id: "brazo-de-gitano", name: "Brazo de gitano", image: brazo, group: "dulces" },
  { id: "mini-cake", name: "Mini cake", image: minicake, group: "dulces" },
  { id: "marquesitas", name: "Marquesitas", image: marquesitas, group: "dulces" },
  { id: "capuchinos", name: "Capuchinos", image: capuchinos, group: "dulces" },
];

export const FLAVORS = [
  "Mantecado", "Tiramisú", "Fresa", "Tres Leches", "Moscatel", "Limón", "Naranja-Piña", "Chocolate",
];

const slug = (s: string) =>
  s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-");

export const PRODUCTS: Product[] = [
  ...FLAVORS.map((f) => ({
    id: `helado-${slug(f)}`, name: f, variant: f, category: "helados" as const, image: Object.entries(flavorImgs).find(([k]) => k.endsWith(`f-${slug(f)}.jpg`))?.[1] ?? helados, subtitle: "Helado",
  })),
  ...CATEGORIES.filter((c) => c.group === "dulces").map((c) => ({
    id: c.id, name: c.name, category: c.id, image: c.image, subtitle: "Dulce Caram",
  })),
];

export const PRICE_LABEL = "Precio por confirmar en WhatsApp";

export const getProduct = (id: string) => PRODUCTS.find((p) => p.id === id);
export const getCategory = (id: string) => CATEGORIES.find((c) => c.id === id);

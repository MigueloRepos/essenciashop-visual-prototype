import casesImage from "@/assets/product-cases.jpg";
import chargingImage from "@/assets/product-charging.jpg";
import audioWatchImage from "@/assets/product-audio-watch.jpg";

export type Category =
  | "Todos"
  | "Fundas y Protectores"
  | "Cargadores y Cables"
  | "Audio"
  | "Power Banks"
  | "Relojes Inteligentes"
  | "Auto"
  | "Gaming"
  | "Gadgets Inteligentes";

export type Product = {
  id: number;
  name: string;
  category: Exclude<Category, "Todos">;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  badge?: string;
  image: string;
};

export const categories: Category[] = [
  "Todos",
  "Fundas y Protectores",
  "Cargadores y Cables",
  "Audio",
  "Power Banks",
  "Relojes Inteligentes",
  "Auto",
  "Gaming",
  "Gadgets Inteligentes",
];

export const products: Product[] = [
  { id: 1, name: "Funda MagSafe Air Shield", category: "Fundas y Protectores", price: 24.9, oldPrice: 34.9, rating: 4.9, reviews: 184, badge: "Más vendido", image: casesImage },
  { id: 2, name: "Cargador GaN Ultra 65W", category: "Cargadores y Cables", price: 42.9, oldPrice: 59.9, rating: 4.8, reviews: 126, badge: "-28%", image: chargingImage },
  { id: 3, name: "Auriculares Aura ANC", category: "Audio", price: 69.9, oldPrice: 89.9, rating: 4.9, reviews: 207, badge: "Nuevo", image: audioWatchImage },
  { id: 4, name: "Power Bank Slim 10.000 mAh", category: "Power Banks", price: 39.9, oldPrice: 49.9, rating: 4.7, reviews: 98, image: chargingImage },
  { id: 5, name: "Smartwatch Pulse S2", category: "Relojes Inteligentes", price: 84.9, oldPrice: 109.9, rating: 4.8, reviews: 152, badge: "Favorito", image: audioWatchImage },
  { id: 6, name: "Cable USB-C Trenzado 2 m", category: "Cargadores y Cables", price: 14.9, oldPrice: 19.9, rating: 4.8, reviews: 311, image: chargingImage },
  { id: 7, name: "Soporte Magnético Drive", category: "Auto", price: 29.9, oldPrice: 39.9, rating: 4.6, reviews: 77, image: chargingImage },
  { id: 8, name: "Base Glow RGB Compact", category: "Gaming", price: 34.9, oldPrice: 44.9, rating: 4.7, reviews: 63, image: audioWatchImage },
];

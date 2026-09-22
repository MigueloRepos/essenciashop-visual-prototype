import { createFileRoute } from "@tanstack/react-router";
import { ShopHome } from "@/components/shop/shop-home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EssenciaShop — Accesorios y tecnología para tu día a día" },
      { name: "description", content: "Descubre accesorios para teléfonos, audio, carga y tecnología seleccionada con envío a todo el país." },
      { property: "og:title", content: "EssenciaShop — Tecnología que encaja contigo" },
      { property: "og:description", content: "Accesorios tecnológicos seleccionados para mejorar tu día a día." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: ShopHome,
});
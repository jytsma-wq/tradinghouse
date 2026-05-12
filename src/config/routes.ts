export const CONTENT_LAST_MODIFIED = "2026-05-12";

export const categoryRoutes = [
  {
    key: "maschinen",
    slug: "maschinen",
    image: "/images/industrial-products.jpg",
    lastModified: CONTENT_LAST_MODIFIED,
  },
  {
    key: "chemie",
    slug: "chemie",
    image: "/images/warehouse.jpg",
    lastModified: CONTENT_LAST_MODIFIED,
  },
  {
    key: "agrar",
    slug: "agrar",
    image: "/images/agriculture.jpg",
    lastModified: CONTENT_LAST_MODIFIED,
  },
  {
    key: "baustoffe",
    slug: "baustoffe",
    image: "/images/construction-materials.jpg",
    lastModified: CONTENT_LAST_MODIFIED,
  },
  {
    key: "stahl",
    slug: "stahl-metalle",
    image: "/images/warehouse.jpg",
    lastModified: CONTENT_LAST_MODIFIED,
  },
  {
    key: "elektronik",
    slug: "elektronik",
    image: "/images/industrial-products.jpg",
    lastModified: CONTENT_LAST_MODIFIED,
  },
] as const;

export const serviceRoutes = [
  {
    key: "import",
    slug: "import",
    image: "/images/industrial-products.jpg",
    lastModified: CONTENT_LAST_MODIFIED,
  },
  {
    key: "export",
    slug: "export",
    image: "/images/shipping-logistics.jpg",
    lastModified: CONTENT_LAST_MODIFIED,
  },
  {
    key: "logistik",
    slug: "logistik-zoll",
    image: "/images/warehouse.jpg",
    lastModified: CONTENT_LAST_MODIFIED,
  },
] as const;

export const staticRoutes = [
  { path: "", lastModified: CONTENT_LAST_MODIFIED, priority: 1.0 },
  { path: "/produkte", lastModified: CONTENT_LAST_MODIFIED, priority: 0.8 },
  { path: "/leistungen", lastModified: CONTENT_LAST_MODIFIED, priority: 0.8 },
  { path: "/ueber-mich", lastModified: CONTENT_LAST_MODIFIED, priority: 0.7 },
  { path: "/kontakt", lastModified: CONTENT_LAST_MODIFIED, priority: 0.8 },
  { path: "/faq", lastModified: CONTENT_LAST_MODIFIED, priority: 0.7 },
  { path: "/impressum", lastModified: CONTENT_LAST_MODIFIED, priority: 0.4 },
  { path: "/datenschutz", lastModified: CONTENT_LAST_MODIFIED, priority: 0.4 },
] as const;

export type CategoryKey = (typeof categoryRoutes)[number]["key"];
export type ServiceKey = (typeof serviceRoutes)[number]["key"];

export function getCategoryBySlug(slug: string) {
  return categoryRoutes.find((category) => category.slug === slug);
}

export function getServiceBySlug(slug: string) {
  return serviceRoutes.find((service) => service.slug === slug);
}

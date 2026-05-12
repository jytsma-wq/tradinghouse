// ⚠️  Replace ALL placeholder values below before going live
export const siteConfig = {
  name: "Trading House", // TODO: replace with real value
  description: {
    de: "Ihr persönlicher Handelspartner zwischen Deutschland und der Ukraine. Warenhandel, Logistik und Zollabwicklung.",
    uk: "Ваш персональний торговий партнер між Німеччиною та Україною. Торгівля товарами, логістика та митне оформлення.",
  },
  url: "https://tradinghouse.de", // TODO: replace with real value
  locales: ["de", "uk"] as const,
  defaultLocale: "de" as const,
  email: "info@tradinghouse.de", // TODO: replace with real value
  phone: "+49 30 123 456 78", // TODO: replace with real value
  whatsapp: "493012345678", // TODO: replace with real value
  sameAs: [] as string[],
  address: {
    street: "Musterstraße 12", // TODO: replace with real value
    zip: "10115", // TODO: replace with real value
    city: "Berlin", // TODO: replace with real value
    country: "Deutschland", // TODO: replace with real value
  },
} as const;

export type Locale = (typeof siteConfig.locales)[number];

export const siteConfig = {
  name: "Trading House",
  description: {
    de: "Ihr persönlicher Handelspartner zwischen Deutschland und der Ukraine. Warenhandel, Logistik und Zollabwicklung.",
    uk: "Ваш персональний торговий партнер між Німеччиною та Україною. Торгівля товарами, логістика та митне оформлення.",
  },
  url: "https://tradinghouse.de",
  locales: ["de", "uk"] as const,
  defaultLocale: "de" as const,
  email: "info@tradinghouse.de",
  phone: "+49 30 123 456 78",
  whatsapp: "493012345678",
  address: {
    street: "Musterstraße 12",
    zip: "10115",
    city: "Berlin",
    country: "Deutschland",
  },
} as const;

export type Locale = (typeof siteConfig.locales)[number];

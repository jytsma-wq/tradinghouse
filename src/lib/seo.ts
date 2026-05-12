import { siteConfig } from "@/config/site";

export function absoluteUrl(path = "") {
  return new URL(path, siteConfig.url).toString();
}

export function localizedAlternates(path: string) {
  return {
    canonical: path,
    languages: {
      de: `/de${path.replace(/^\/(de|uk)/, "")}`,
      uk: `/uk${path.replace(/^\/(de|uk)/, "")}`,
      "x-default": `/de${path.replace(/^\/(de|uk)/, "")}`,
    },
  };
}

export function localizedPath(locale: string, path = "") {
  return `/${locale}${path}`;
}

export function breadcrumbJsonLd(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

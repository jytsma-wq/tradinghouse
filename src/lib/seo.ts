import type { Metadata } from "next";
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

export function localizedPageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const url = localizedPath(locale, path);
  const absoluteTitle = `${title} | ${siteConfig.name}`;

  return {
    title,
    description,
    alternates: localizedAlternates(url),
    openGraph: {
      title: absoluteTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: locale === "de" ? "de_DE" : "uk_UA",
      type: "website",
    },
  };
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

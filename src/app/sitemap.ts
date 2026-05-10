import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/produkte",
    "/produkte/maschinen",
    "/produkte/chemie",
    "/produkte/agrar",
    "/produkte/baustoffe",
    "/produkte/stahl-metalle",
    "/produkte/elektronik",
    "/leistungen",
    "/leistungen/import",
    "/leistungen/export",
    "/leistungen/logistik-zoll",
    "/ueber-mich",
    "/kontakt",
    "/impressum",
    "/datenschutz",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of siteConfig.locales) {
    for (const route of routes) {
      entries.push({
        url: `${siteConfig.url}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1.0 : route.split("/").length === 2 ? 0.8 : 0.6,
      });
    }
  }

  return entries;
}

import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { categoryRoutes, serviceRoutes, staticRoutes } from "@/config/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    ...staticRoutes,
    ...categoryRoutes.map(({ slug, lastModified }) => ({
      path: `/produkte/${slug}`,
      lastModified,
      priority: 0.6,
    })),
    ...serviceRoutes.map(({ slug, lastModified }) => ({
      path: `/leistungen/${slug}`,
      lastModified,
      priority: 0.6,
    })),
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of siteConfig.locales) {
    for (const route of routes) {
      entries.push({
        url: `${siteConfig.url}/${locale}${route.path}`,
        lastModified: new Date(route.lastModified),
        changeFrequency: route.path === "" ? "weekly" : "monthly",
        priority: route.priority,
      });
    }
  }

  return entries;
}

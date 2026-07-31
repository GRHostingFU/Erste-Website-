import type { MetadataRoute } from "next";

import { sitemapRoutes } from "@/lib/navigation";
import { absoluteUrl } from "@/lib/seo";

/**
 * Statische Sitemap.
 *
 * Die Routenliste liegt in `lib/navigation.ts`, damit Navigation und Sitemap
 * nicht auseinanderlaufen können.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return sitemapRoutes.map(({ path, changeFrequency, priority }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}

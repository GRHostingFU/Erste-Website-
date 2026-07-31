import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site.config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} – ${siteConfig.tagline}`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    lang: siteConfig.language,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1e9f9c",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}

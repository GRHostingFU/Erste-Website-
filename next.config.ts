import type { NextConfig } from "next";

/**
 * Sicherheits-Header nach OWASP Secure Headers Project.
 * Bewusst konservativ gewählt, damit sie für eine reine Marketing-Site
 * ohne Third-Party-Embeds sofort produktionstauglich sind.
 */
const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
] as const;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  /**
   * `typedRoutes` bleibt bewusst deaktiviert: Navigation, Footer und Sitemap
   * lesen ihre Ziele aus `lib/navigation.ts`, wo `href` ein `string` ist (die
   * Struktur mischt Routen, Sprungmarken und `tel:`-Links). Mit typisierten
   * Routen müsste dort jede Zeile gecastet werden – das wäre Typsicherheit auf
   * dem Papier, nicht in der Sache.
   */
  typedRoutes: false,

  images: {
    formats: ["image/avif", "image/webp"],
    // Bildschirmbreiten für `sizes`-basierte Auslieferung (Retina inklusive).
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1536, 1920, 2560],
    imageSizes: [16, 24, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  experimental: {
    // Barrel-Imports werden zu direkten Modul-Imports aufgelöst (kleinere Bundles).
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [...securityHeaders],
      },
    ];
  },
};

export default nextConfig;

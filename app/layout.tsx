import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "@/styles/globals.css";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SkipLink } from "@/components/layout/skip-link";
import { MotionProvider } from "@/components/motion/motion-provider";
import { JsonLd } from "@/components/seo/json-ld";
import { fontVariables } from "@/lib/fonts";
import {
  createMetadata,
  createOrganizationSchema,
  createWebsiteSchema,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site.config";
import { cn } from "@/utils";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} – ${siteConfig.tagline}`,
    // Unterseiten liefern nur ihren Titel; das Suffix ergänzt Next.js.
    template: `%s | ${siteConfig.name}`,
  },
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  // Telefonnummern sollen auf Mobilgeräten anwählbar bleiben.
  formatDetection: { telephone: true, email: true, address: false },
  ...createMetadata(),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1214" },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang={siteConfig.language}
      // `scroll-smooth` liegt in globals.css; hier nur die Font-Variablen.
      className={cn(fontVariables, "antialiased")}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col bg-background text-foreground">
        <SkipLink />

        <MotionProvider>
          <Navbar />
          {/* `#main` ist das Ziel des Sprunglinks. */}
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </MotionProvider>

        <JsonLd schema={[createOrganizationSchema(), createWebsiteSchema()]} />
      </body>
    </html>
  );
}

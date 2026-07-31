import type { Metadata } from "next";

import { siteConfig } from "@/lib/site.config";
import type { MetadataParams } from "@/types";
import { normalizePath } from "@/utils";

/** Baut aus einem relativen Pfad eine absolute URL auf Basis der Site-URL. */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${siteConfig.url}${normalizePath(path)}`;
}

/**
 * Erzeugt vollständige Next.js-Metadaten für eine Seite.
 *
 * Jede Route ruft diesen Helper auf, statt Metadaten von Hand zu schreiben.
 * Dadurch sind Canonical-URL, Open Graph, Twitter Card und Robots-Direktiven
 * seitenübergreifend garantiert konsistent.
 */
export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.ogImage,
  noIndex = false,
  keywords,
}: MetadataParams = {}): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  // Ohne `title` greift das Template aus dem Root-Layout.
  const resolvedTitle = title ?? `${siteConfig.name} – ${siteConfig.tagline}`;

  return {
    ...(title ? { title } : {}),
    description,
    ...(keywords ? { keywords: [...keywords] } : {}),

    alternates: {
      canonical: url,
    },

    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title: resolvedTitle,
      description,
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: resolvedTitle,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [imageUrl],
    },

    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

/** Minimale JSON-LD-Struktur ohne externe Typabhängigkeit. */
export type JsonLdSchema = Record<string, unknown> & {
  "@context": "https://schema.org";
  "@type": string;
};

/**
 * Strukturierte Daten für das Unternehmen.
 *
 * `LocalBusiness` ist für eine ortsgebundene Beratung die passendere Wahl als
 * `Organization`: Google kann daraus Öffnungszeiten, Adresse und Telefonnummer
 * direkt in den Suchergebnissen ausspielen.
 */
export function createOrganizationSchema(): JsonLdSchema {
  const { contact, legalName, name, url, description } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${url}/#organization`,
    name,
    legalName,
    description,
    url,
    telephone: contact.phone,
    email: contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      postalCode: contact.address.postalCode,
      addressLocality: contact.address.city,
      addressCountry: contact.address.country,
    },
    areaServed: contact.address.city,
    image: absoluteUrl(siteConfig.ogImage),
  };
}

/** Strukturierte Daten für die Website als Ganzes. */
export function createWebsiteSchema(): JsonLdSchema {
  const { name, url, locale, description } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}/#website`,
    name,
    description,
    url,
    inLanguage: locale,
    publisher: { "@id": `${url}/#organization` },
  };
}

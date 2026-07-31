/**
 * Zentrale Konfiguration der Website.
 *
 * Alles, was Marke, Kontakt oder Domain betrifft, steht ausschließlich hier.
 * Komponenten lesen daraus – niemals umgekehrt. Ein Rebranding oder ein
 * Domainwechsel ist damit eine Änderung an genau einer Datei.
 *
 * TODO(Inhalt): Platzhalterwerte vor dem Livegang durch echte Daten ersetzen.
 */
export const siteConfig = {
  name: "Pflegeberatung",
  legalName: "Pflegeberatung GmbH",
  /** Wird im Title-Template und in strukturierten Daten verwendet. */
  tagline: "Beratung, die Angehörige entlastet",
  description:
    "Unabhängige Pflegeberatung für Angehörige und Pflegebedürftige – " +
    "persönlich, verständlich und auf Augenhöhe.",

  /**
   * Produktionsdomain. `NEXT_PUBLIC_SITE_URL` erlaubt abweichende
   * Preview-Deployments, ohne den Code anzufassen.
   */
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.pflegeberatung-beispiel.de"
  ).replace(/\/$/, ""),

  locale: "de-DE",
  language: "de",

  contact: {
    phone: "+49 30 123456789",
    email: "kontakt@pflegeberatung-beispiel.de",
    address: {
      street: "Musterstraße 1",
      postalCode: "10115",
      city: "Berlin",
      country: "DE",
    },
    openingHours: "Mo–Fr 08:00–18:00 Uhr",
  },

  /** Standard-Vorschaubild für Open Graph und Twitter Cards. */
  ogImage: "/images/og-default.jpg",

  social: {
    linkedin: "",
    instagram: "",
    facebook: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;

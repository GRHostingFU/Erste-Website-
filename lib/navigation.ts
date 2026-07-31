import type { NavGroup, NavItem } from "@/types";

/**
 * Informationsarchitektur der Website.
 *
 * Navbar und Footer rendern ausschließlich diese Struktur – neue Seiten werden
 * hier eingetragen und erscheinen automatisch an beiden Stellen.
 *
 * Alle Einträge sind echte Routen (keine Sprungmarken mehr): Damit funktioniert
 * die Aktiv-Markierung in der Navigation, und jeder Link ist von jeder Seite
 * aus gültig.
 */
export const mainNav: readonly NavItem[] = [
  { label: "Leistungen", href: "/leistungen" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "FAQ", href: "/faq" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

/** Primäre Handlungsaufforderung im Header. */
export const primaryCta: NavItem = {
  label: "Beratung anfragen",
  href: "/kontakt",
} as const;

/** Spalten der Footer-Navigation. */
export const footerNav: readonly NavGroup[] = [
  {
    title: "Leistungen",
    items: [
      { label: "Pflegeberatung § 7a", href: "/leistungen" },
      { label: "Beratungseinsätze § 37.3", href: "/leistungen" },
      { label: "Angehörigenbegleitung", href: "/leistungen" },
    ],
  },
  {
    title: "Unternehmen",
    items: [
      { label: "Über uns", href: "/ueber-uns" },
      { label: "Häufige Fragen", href: "/faq" },
      { label: "Kontakt", href: "/kontakt" },
    ],
  },
] as const;

/** Rechtlich erforderliche Links – separat, da sie nie beworben werden. */
export const legalNav: readonly NavItem[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
] as const;

interface SitemapRoute {
  path: string;
  changeFrequency: "yearly" | "monthly" | "weekly";
  priority: number;
}

/** Alle indexierbaren Routen – einzige Quelle für `app/sitemap.ts`. */
export const sitemapRoutes: readonly SitemapRoute[] = [
  { path: "/", changeFrequency: "monthly", priority: 1 },
  { path: "/leistungen", changeFrequency: "monthly", priority: 0.9 },
  { path: "/ueber-uns", changeFrequency: "yearly", priority: 0.7 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.7 },
  { path: "/kontakt", changeFrequency: "yearly", priority: 0.8 },
  { path: "/impressum", changeFrequency: "yearly", priority: 0.2 },
  { path: "/datenschutz", changeFrequency: "yearly", priority: 0.2 },
] as const;

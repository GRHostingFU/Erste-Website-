/** Eingabeparameter für den `createMetadata()`-Helper in `lib/seo.ts`. */
export interface MetadataParams {
  /** Seitentitel ohne Marken-Suffix – das Template ergänzt ihn. */
  title?: string;
  description?: string;
  /** Pfad relativ zur Domain, z. B. `/leistungen`. Setzt den Canonical-Link. */
  path?: string;
  /** Absoluter oder relativer Pfad zum Open-Graph-Bild. */
  image?: string;
  /** Schließt die Seite aus dem Index aus (Danke-Seiten, Previews …). */
  noIndex?: boolean;
  keywords?: readonly string[];
}

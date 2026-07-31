import type { JsonLdSchema } from "@/lib/seo";

/**
 * Gibt strukturierte Daten als `application/ld+json` aus.
 *
 * Der Inhalt stammt ausschließlich aus eigenen, statisch definierten Objekten
 * in `lib/seo.ts` – niemals aus Nutzereingaben. `JSON.stringify` maskiert
 * zusätzlich alle `<`-Zeichen, damit kein Script-Tag ausbrechen kann.
 */
export function JsonLd({ schema }: { schema: JsonLdSchema | JsonLdSchema[] }) {
  const json = JSON.stringify(schema).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}

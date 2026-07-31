import { ShieldCheck } from "lucide-react";

import { LegalContent } from "@/components/sections/legal-content";
import { PageHero } from "@/components/sections/page-hero";
import { datenschutzSections } from "@/lib/content/legal";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Datenschutzerklärung",
  description:
    "Informationen nach Art. 12–22 DSGVO: welche Daten wir verarbeiten, auf welcher Rechtsgrundlage, wie lange wir sie speichern und welche Rechte Sie haben.",
  path: "/datenschutz",
});

/**
 * Datenschutzerklärung.
 *
 * Struktur bewusst entlang der Informationspflichten der DSGVO: Verantwortlicher,
 * Verarbeitungen mit Zweck und Rechtsgrundlage, Empfänger, Speicherdauer,
 * Betroffenenrechte, Beschwerderecht.
 */
export default function DatenschutzPage() {
  return (
    <>
      <PageHero
        eyebrow="Datenschutz"
        icon={<ShieldCheck className="size-3.5" aria-hidden="true" />}
        title={
          <>
            Ihre Daten bleiben{" "}
            <span className="text-gradient-brand">Ihre Sache.</span>
          </>
        }
        description="Diese Website kommt ohne Cookies, ohne Tracking und ohne eingebettete Dienste Dritter aus. Was wir dennoch verarbeiten müssen, steht hier vollständig."
      />
      <LegalContent sections={datenschutzSections} updatedAt="Juli 2026" />
    </>
  );
}

import { FileText } from "lucide-react";

import { LegalContent } from "@/components/sections/legal-content";
import { PageHero } from "@/components/sections/page-hero";
import { impressumSections } from "@/lib/content/legal";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Impressum",
  description:
    "Anbieterkennzeichnung nach § 5 DDG: Firma, Anschrift, Vertretung, Register, Umsatzsteuer-ID und Kontaktdaten unserer Pflegeberatung.",
  path: "/impressum",
});

/**
 * Impressum.
 *
 * Rechtstexte gehören nicht in Komponenten: Der Inhalt liegt vollständig in
 * `lib/content/legal.ts` und wird hier nur gerendert. Anpassungen durch die
 * Rechtsberatung berühren damit kein Markup.
 */
export default function ImpressumPage() {
  return (
    <>
      <PageHero
        eyebrow="Rechtliches"
        icon={<FileText className="size-3.5" aria-hidden="true" />}
        title={
          <>
            Impressum und{" "}
            <span className="text-gradient-brand">Anbieterkennzeichnung.</span>
          </>
        }
        description="Wer hinter dieser Website steht, wie Sie uns erreichen und welche rechtlichen Angaben für unsere Beratung gelten."
      />
      <LegalContent sections={impressumSections} updatedAt="Juli 2026" />
    </>
  );
}

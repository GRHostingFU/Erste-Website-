import { Sparkles } from "lucide-react";
import Link from "next/link";

import { PageCta } from "@/components/sections/page-cta";
import { PageHero } from "@/components/sections/page-hero";
import { ServicesGrid } from "@/components/sections/services-grid";
import { ServicesProcess } from "@/components/sections/services-process";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Leistungen",
  description:
    "Pflegeberatung, Pflegegrad, Anträge, Hausbesuche, Angehörigenberatung und Pflegeplanung – unabhängig, verständlich und für Versicherte kostenfrei.",
  path: "/leistungen",
  keywords: [
    "Pflegeberatung",
    "Pflegegrad",
    "Pflegeantrag",
    "Hausbesuch",
    "Angehörigenberatung",
    "Pflegeplanung",
  ],
});

/**
 * Leistungsseite.
 *
 * Server Component: Sie komponiert nur die Sektionen und liefert die
 * Metadaten. Interaktivität und Motion leben ausschließlich in den Sektionen.
 */
export default function LeistungenPage() {
  return (
    <>
      <PageHero
        eyebrow="Leistungen"
        icon={<Sparkles className="size-3.5" aria-hidden="true" />}
        title={
          <>
            Alles, was Pflege{" "}
            <span className="text-gradient-brand">planbar macht.</span>
          </>
        }
        description="Von der ersten Einschätzung bis zum fertigen Versorgungsplan: Wir übernehmen den formalen Teil und schaffen Ihnen den Kopf frei für das Wesentliche."
        actions={
          <>
            <Button size="lg" asChild>
              <Link href="/kontakt">Beratung anfragen</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/faq">Häufige Fragen</Link>
            </Button>
          </>
        }
      />
      <ServicesGrid />
      <ServicesProcess />
      <PageCta />
    </>
  );
}

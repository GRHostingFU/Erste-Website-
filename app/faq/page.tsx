import { HelpCircle } from "lucide-react";
import Link from "next/link";

import { FaqAccordion } from "@/components/sections/faq-accordion";
import { PageCta } from "@/components/sections/page-cta";
import { PageHero } from "@/components/sections/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { faqs } from "@/lib/content/faq";
import { createMetadata, type JsonLdSchema } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Häufige Fragen",
  description:
    "Antworten zu Kosten, Terminen, Pflegegrad, Begutachtung, Widerspruch, Pflegegeld, Umbauzuschüssen und Entlastung für Angehörige.",
  path: "/faq",
  keywords: ["FAQ Pflegeberatung", "Pflegegrad Fragen", "Pflegegeld"],
});

/**
 * Strukturierte Daten für die Fragenliste.
 *
 * Google kann daraus ein FAQ-Rich-Result erzeugen. Quelle ist derselbe
 * Datensatz wie in der Darstellung – Text und Markup können nicht auseinander
 * laufen.
 */
const faqSchema: JsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

/** FAQ-Seite mit interaktivem Accordion und Kategoriefilter. */
export default function FaqPage() {
  return (
    <>
      <JsonLd schema={faqSchema} />
      <PageHero
        eyebrow="FAQ"
        icon={<HelpCircle className="size-3.5" aria-hidden="true" />}
        title={
          <>
            Fragen, die fast jede Familie{" "}
            <span className="text-gradient-brand">zuerst stellt.</span>
          </>
        }
        description="Hier finden Sie die Antworten aus unseren Erstgesprächen – kurz, ohne Paragraphendeutsch und mit den Zahlen, die 2024 gelten."
        actions={
          <Button size="lg" variant="outline" asChild>
            <Link href="/kontakt">Frage direkt stellen</Link>
          </Button>
        }
      />
      <FaqAccordion />
      <PageCta
        title="Ihre Frage war nicht dabei?"
        description="Schreiben Sie uns – wir antworten in der Regel noch am selben Werktag."
      />
    </>
  );
}

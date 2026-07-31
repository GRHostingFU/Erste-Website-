import { MessageCircle } from "lucide-react";

import { ContactMap } from "@/components/sections/contact-map";
import { ContactSection } from "@/components/sections/contact-section";
import { PageHero } from "@/components/sections/page-hero";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { createMetadata, createOrganizationSchema } from "@/lib/seo";
import { siteConfig } from "@/lib/site.config";
import { toTelHref } from "@/utils";

export const metadata = createMetadata({
  title: "Kontakt",
  description:
    "Kontaktformular, Telefon, E-Mail, Adresse, Anfahrt und Öffnungszeiten unserer Pflegeberatung – Terminzusage meist innerhalb von 48 Stunden.",
  path: "/kontakt",
  keywords: ["Kontakt Pflegeberatung", "Termin Pflegeberatung", "Anfahrt"],
});

/** Kontaktseite: Formular, Kontaktwege, Öffnungszeiten und Anfahrt. */
export default function KontaktPage() {
  return (
    <>
      <JsonLd schema={createOrganizationSchema()} />
      <PageHero
        eyebrow="Kontakt"
        icon={<MessageCircle className="size-3.5" aria-hidden="true" />}
        title={
          <>
            Der erste Schritt ist{" "}
            <span className="text-gradient-brand">ein Gespräch.</span>
          </>
        }
        description="Schreiben Sie uns oder rufen Sie einfach an. Wir melden uns in der Regel am selben Werktag und finden gemeinsam heraus, was jetzt konkret ansteht."
        actions={
          <Button size="lg" variant="outline" asChild>
            <a href={toTelHref(siteConfig.contact.phone)}>
              {siteConfig.contact.phone}
            </a>
          </Button>
        }
      />
      <ContactSection />
      <ContactMap />
    </>
  );
}

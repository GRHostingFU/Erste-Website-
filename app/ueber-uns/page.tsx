import { Users } from "lucide-react";
import Link from "next/link";

import { AboutHistory } from "@/components/sections/about-history";
import { AboutMission } from "@/components/sections/about-mission";
import { AboutTeam } from "@/components/sections/about-team";
import { AboutValues } from "@/components/sections/about-values";
import { PageCta } from "@/components/sections/page-cta";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Über uns",
  description:
    "Mission, Vision, Werte, Team und Geschichte unserer unabhängigen Pflegeberatung – seit 2013 an der Seite pflegender Angehöriger.",
  path: "/ueber-uns",
  keywords: ["Über uns", "Pflegeberatung Team", "Unabhängige Beratung"],
});

/** Über-uns-Seite: Mission, Vision, Werte, Team und Geschichte. */
export default function UeberUnsPage() {
  return (
    <>
      <PageHero
        eyebrow="Über uns"
        icon={<Users className="size-3.5" aria-hidden="true" />}
        title={
          <>
            Beratung ist Vertrauenssache –{" "}
            <span className="text-gradient-brand">
              also zeigen wir Haltung.
            </span>
          </>
        }
        description="Wir sind ein kleines Team aus Pflegeberatung, Sozialpädagogik und Wohnberatung. Was uns verbindet, ist die Überzeugung, dass gute Pflege mit guter Information beginnt."
        actions={
          <>
            <Button size="lg" asChild>
              <Link href="/kontakt">Team kennenlernen</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/leistungen">Unsere Leistungen</Link>
            </Button>
          </>
        }
      />
      <AboutMission />
      <AboutValues />
      <AboutTeam />
      <AboutHistory />
      <PageCta
        title="Lernen Sie uns unverbindlich kennen."
        description="Ein Erstgespräch verpflichtet zu nichts – es klärt nur, ob wir zueinander passen."
      />
    </>
  );
}

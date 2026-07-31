import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Seite nicht gefunden",
  description: "Die aufgerufene Seite existiert nicht oder wurde verschoben.",
  noIndex: true,
});

export default function NotFound() {
  return (
    <Section spacing="xl" className="pt-header">
      <Container size="narrow" className="text-center">
        <Eyebrow className="justify-center" withDot={false}>
          Fehler 404
        </Eyebrow>

        <Heading as="h1" size="md" align="center" className="mt-5">
          Diese Seite gibt es nicht.
        </Heading>

        <p className="mx-auto mt-5 max-w-md text-foreground-muted">
          Möglicherweise wurde die Adresse geändert oder der Link ist veraltet.
          Über die Startseite finden Sie zurück.
        </p>

        <div className="mt-9 flex justify-center">
          <Button asChild size="lg">
            <Link href="/">Zur Startseite</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}

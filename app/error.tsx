"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";

/**
 * Fehlergrenze für alle Routen unterhalb des Root-Layouts.
 * Header und Footer bleiben erhalten – der Nutzer verliert nicht die
 * Orientierung, nur der fehlerhafte Bereich wird ersetzt.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Platzhalter für die spätere Anbindung eines Monitoring-Dienstes.
    console.error(error);
  }, [error]);

  return (
    <Section spacing="xl" className="pt-header">
      <Container size="narrow" className="text-center">
        <Eyebrow className="justify-center" withDot={false}>
          Unerwarteter Fehler
        </Eyebrow>

        <Heading as="h1" size="md" align="center" className="mt-5">
          Da ist etwas schiefgelaufen.
        </Heading>

        <p className="mx-auto mt-5 max-w-md text-foreground-muted">
          Bitte versuchen Sie es erneut. Besteht das Problem weiterhin,
          erreichen Sie uns jederzeit telefonisch.
        </p>

        <div className="mt-9 flex justify-center">
          <Button size="lg" onClick={reset}>
            Erneut versuchen
          </Button>
        </div>
      </Container>
    </Section>
  );
}

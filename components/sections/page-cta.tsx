"use client";

import { ArrowRight, PhoneCall } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/site.config";
import { toTelHref } from "@/utils";

interface PageCtaProps {
  title?: string;
  description?: string;
}

/**
 * Abschluss-Band jeder Unterseite.
 *
 * Eine Seite endet nie im Nichts: Am Ende steht immer genau ein primärer Weg
 * (Termin) und ein sofort nutzbarer Notausgang (Telefon).
 */
export function PageCta({
  title = "Sprechen wir über Ihre Situation.",
  description = "Ein erstes Gespräch kostet Sie nichts außer 20 Minuten – und nimmt in der Regel den größten Teil der Unsicherheit.",
}: PageCtaProps) {
  return (
    <Section tone="brand" spacing="lg" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-120 from-brand-500/20 via-transparent to-sage-400/20"
      />
      <Container size="content" className="relative text-center">
        <Reveal>
          <Heading as="h2" size="md" align="center" className="text-white">
            {title}
          </Heading>
          <p className="mx-auto mt-5 max-w-xl text-lead text-white/75">
            {description}
          </p>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Button size="lg" asChild>
            <Link href="/kontakt">
              Kostenlose Erstberatung
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="border-white/25 bg-white/10 text-white hover:border-white/40 hover:bg-white/15"
          >
            <a href={toTelHref(siteConfig.contact.phone)}>
              <PhoneCall className="size-4" aria-hidden="true" />
              {siteConfig.contact.phone}
            </a>
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}

"use client";

import { ArrowRight, Mail, PhoneCall } from "lucide-react";

import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/site.config";
import { toMailHref, toTelHref } from "@/utils";

/** Abschließender Handlungsaufruf auf dunkler Markenfläche. */
export function Cta() {
  return (
    <Section id="kontakt" tone="brand" spacing="lg" className="overflow-hidden">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 -z-0 h-96 w-[42rem] -translate-x-1/2 animate-float rounded-full bg-brand-500/25 blur-3xl"
      />

      <Container size="content" className="relative text-center">
        <Reveal>
          <Heading as="h2" size="md" align="center" className="text-white">
            Sprechen wir über Ihre Situation.
          </Heading>
          <p className="mx-auto mt-6 max-w-xl text-lead text-brand-100">
            Ein kostenloses Erstgespräch dauert 20 Minuten und schafft in den
            meisten Fällen schon spürbare Klarheit.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" asChild>
              <a href={toTelHref(siteConfig.contact.phone)}>
                <PhoneCall className="size-4" aria-hidden="true" />
                Jetzt anrufen
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-white/25 bg-white/10 text-white hover:border-white/40 hover:bg-white/15"
            >
              <a href={toMailHref(siteConfig.contact.email)}>
                <Mail className="size-4" aria-hidden="true" />
                E-Mail schreiben
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </Button>
          </div>

          <p className="mt-8 text-sm text-brand-200">
            {siteConfig.contact.openingHours} · Rückruf am selben Werktag
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

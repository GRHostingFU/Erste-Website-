"use client";

import { m } from "framer-motion";
import { Check } from "lucide-react";

import { Reveal } from "@/components/motion";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { services } from "@/lib/content/services";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

/**
 * Leistungsraster.
 *
 * Jede Karte trägt eine eigene `id` und ist damit direkt verlinkbar
 * (z. B. `/leistungen#pflegegrad`) – der Versatz zum Sticky-Header kommt
 * global über `scroll-padding-top`.
 */
export function ServicesGrid() {
  return (
    <Section id="leistungen" spacing="lg">
      <Container size="wide">
        <Reveal className="max-w-2xl">
          <Eyebrow>Unser Angebot</Eyebrow>
          <Heading as="h2" size="md" className="mt-5">
            Sechs Leistungen, ein Ziel: Klarheit im Pflegealltag.
          </Heading>
          <p className="mt-5 text-lead text-foreground-muted">
            Wir arbeiten unabhängig von Pflegediensten und Anbietern. Was wir
            empfehlen, empfehlen wir, weil es zu Ihrer Situation passt.
          </p>
        </Reveal>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <m.div key={service.id} variants={fadeInUp} id={service.id}>
              <Card
                interactive
                padding="lg"
                className="flex h-full scroll-mt-header flex-col"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                  <service.icon className="size-6" aria-hidden="true" />
                </span>

                <CardHeader className="mt-6">
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.summary}</CardDescription>
                </CardHeader>

                <ul className="mt-6 flex-1 space-y-3">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 text-sm">
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-primary"
                        aria-hidden="true"
                      />
                      <span className="text-foreground-muted">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-8 border-t border-border pt-5 text-xs font-semibold tracking-eyebrow text-primary uppercase">
                  {service.meta}
                </p>
              </Card>
            </m.div>
          ))}
        </m.div>
      </Container>
    </Section>
  );
}

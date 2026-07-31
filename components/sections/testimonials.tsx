"use client";

import { m } from "framer-motion";
import { Quote, Star } from "lucide-react";

import { Reveal } from "@/components/motion";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { staggerContainer, viewportOnce } from "@/lib/motion";

const testimonials = [
  {
    quote:
      "Nach dem ersten Gespräch hatten wir zum ersten Mal seit Monaten wieder das Gefühl, die Lage im Griff zu haben. Der Pflegegrad wurde am Ende sogar höher eingestuft.",
    name: "Familie Berger",
    role: "Angehörige, Berlin",
    initials: "FB",
  },
  {
    quote:
      "Sehr geduldig, sehr strukturiert. Alle Anträge wurden gemeinsam ausgefüllt, nichts blieb an mir hängen – das war für mich als Alleinpflegende entscheidend.",
    name: "Sabine K.",
    role: "Tochter und Pflegeperson",
    initials: "SK",
  },
  {
    quote:
      "Die Beratung zur Wohnraumanpassung hat uns den Umzug erspart. Zuschüsse wurden vollständig bewilligt, der Umbau war in sechs Wochen erledigt.",
    name: "Herr Altmann",
    role: "Pflegebedürftig, Potsdam",
    initials: "HA",
  },
] as const;

/** Drei Referenzen als moderne Karten mit Hover-Anhebung. */
export function Testimonials() {
  return (
    <Section tone="muted" spacing="lg">
      <Container size="wide">
        <Reveal className="max-w-2xl">
          <Eyebrow>Stimmen</Eyebrow>
          <Heading as="h2" size="md" className="mt-5">
            Was Familien nach der Beratung sagen.
          </Heading>
        </Reveal>

        <m.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 lg:grid-cols-3"
        >
          {testimonials.map((item) => (
            <m.li
              key={item.name}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Card
                as="figure"
                interactive
                padding="lg"
                className="group flex h-full flex-col"
              >
                <Quote
                  className="size-8 text-brand-300 transition-colors duration-500 group-hover:text-primary"
                  aria-hidden="true"
                />

                <blockquote className="mt-5 grow text-pretty text-foreground-muted">
                  „{item.quote}“
                </blockquote>

                <div
                  className="mt-6 flex gap-0.5 text-brand-500"
                  aria-label="5 von 5 Sternen"
                >
                  {Array.from({ length: 5 }, (_, index) => (
                    <Star
                      key={index}
                      className="size-4 fill-current"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-6">
                  <span
                    aria-hidden="true"
                    className="flex size-11 items-center justify-center rounded-full bg-primary-soft text-sm font-semibold text-primary"
                  >
                    {item.initials}
                  </span>
                  <span className="text-sm">
                    <span className="block font-semibold">{item.name}</span>
                    <span className="block text-foreground-muted">
                      {item.role}
                    </span>
                  </span>
                </figcaption>
              </Card>
            </m.li>
          ))}
        </m.ul>
      </Container>
    </Section>
  );
}

"use client";

import { m } from "framer-motion";

import { Reveal } from "@/components/motion";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

const steps = [
  {
    step: "01",
    title: "Erstgespräch",
    text: "Telefonisch oder per Video. Wir hören zu, sortieren die Lage und sagen ehrlich, was realistisch ist.",
  },
  {
    step: "02",
    title: "Hausbesuch",
    text: "Vor Ort sehen wir Wohnumfeld und Alltag – die Grundlage für jede belastbare Empfehlung.",
  },
  {
    step: "03",
    title: "Versorgungsplan",
    text: "Sie erhalten einen schriftlichen Plan mit Maßnahmen, Zuständigkeiten und Fristen.",
  },
  {
    step: "04",
    title: "Begleitung",
    text: "Wir bleiben ansprechbar – bei Anträgen, Begutachtung, Widerspruch und Veränderungen.",
  },
] as const;

/** Ablauf der Zusammenarbeit als nummerierte Zeitleiste. */
export function ServicesProcess() {
  return (
    <Section id="ablauf" tone="muted" spacing="lg">
      <Container size="wide">
        <Reveal className="max-w-2xl">
          <Eyebrow>So arbeiten wir</Eyebrow>
          <Heading as="h2" size="md" className="mt-5">
            Vier Schritte – ohne Fachchinesisch.
          </Heading>
        </Reveal>

        <m.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((item) => (
            <m.li key={item.step} variants={fadeInUp} className="relative">
              <span
                aria-hidden="true"
                className="font-display text-display-sm text-primary/25"
              >
                {item.step}
              </span>
              <span
                aria-hidden="true"
                className="mt-4 block h-px w-full bg-linear-to-r from-primary/40 to-transparent"
              />
              <h3 className="mt-5 text-lg font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                {item.text}
              </p>
            </m.li>
          ))}
        </m.ol>
      </Container>
    </Section>
  );
}

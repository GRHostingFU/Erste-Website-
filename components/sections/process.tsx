"use client";

import { m } from "framer-motion";

import { Reveal } from "@/components/motion";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { staggerContainer, viewportOnce } from "@/lib/motion";

const steps = [
  {
    title: "Erstgespräch",
    description:
      "Kostenlos und unverbindlich am Telefon: Wir hören zu und klären, wo der Schuh am meisten drückt.",
  },
  {
    title: "Analyse",
    description:
      "Wir sichten Bescheide, Pflegesituation und Wohnumfeld und ermitteln alle Leistungen, die Ihnen zustehen.",
  },
  {
    title: "Beratung vor Ort",
    description:
      "Persönlich bei Ihnen zu Hause: konkrete Empfehlungen, Anträge und ein schriftlicher Plan zum Mitnehmen.",
  },
  {
    title: "Begleitung",
    description:
      "Wir bleiben ansprechbar – bei Widersprüchen, Veränderungen im Pflegegrad oder neuen Fragen im Alltag.",
  },
] as const;

/** Vierschrittiger Ablauf mit durchgehender Verbindungslinie. */
export function Process() {
  return (
    <Section id="ablauf" spacing="lg">
      <Container size="wide">
        <Reveal className="max-w-2xl">
          <Eyebrow>Ablauf</Eyebrow>
          <Heading as="h2" size="md" className="mt-5">
            In vier Schritten zur passenden Lösung.
          </Heading>
          <p className="mt-5 text-lead text-foreground-muted">
            Klar strukturiert, ohne Fachjargon – Sie wissen jederzeit, was als
            Nächstes passiert.
          </p>
        </Reveal>

        <div className="relative mt-16">
          <span
            aria-hidden="true"
            className="absolute top-6 right-0 left-0 hidden h-px bg-linear-to-r from-transparent via-border-strong to-transparent lg:block"
          />

          <m.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
          >
            {steps.map((step, index) => (
              <m.li
                key={step.title}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="group relative"
              >
                <span className="relative z-10 flex size-12 items-center justify-center rounded-full border border-brand-200 bg-surface font-display text-lg font-semibold text-primary shadow-sm transition-all duration-500 ease-out-quint group-hover:scale-105 group-hover:border-transparent group-hover:bg-linear-120 group-hover:from-brand-500 group-hover:to-brand-600 group-hover:text-white group-hover:shadow-glow-brand dark:border-brand-900">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 text-lg font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                  {step.description}
                </p>
              </m.li>
            ))}
          </m.ol>
        </div>
      </Container>
    </Section>
  );
}

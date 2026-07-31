"use client";

import { m } from "framer-motion";
import { Award, Clock, Compass, Lock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/motion";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { staggerContainer, viewportOnce } from "@/lib/motion";

interface Reason {
  title: string;
  description: string;
  icon: LucideIcon;
}

const reasons: readonly Reason[] = [
  {
    title: "Unabhängig",
    description:
      "Wir arbeiten für Sie, nicht für einen Pflegedienst. Unsere Empfehlungen folgen ausschließlich Ihrer Situation.",
    icon: Compass,
  },
  {
    title: "Zertifiziert",
    description:
      "Anerkannte Pflegeberatung nach § 7a SGB XI, laufend fortgebildet und fachlich geprüft.",
    icon: Award,
  },
  {
    title: "Erreichbar",
    description:
      "Termine innerhalb von 48 Stunden, feste Ansprechpartner und Rückrufe noch am selben Tag.",
    icon: Clock,
  },
  {
    title: "Vertraulich",
    description:
      "Alles, was Sie uns anvertrauen, bleibt bei uns – dokumentiert nach DSGVO, nie an Dritte weitergegeben.",
    icon: Lock,
  },
] as const;

/** Vier Argumente als Karten auf ruhigem Untergrund. */
export function WhyUs() {
  return (
    <Section id="ueber-uns" tone="muted" spacing="lg">
      <Container size="wide">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Warum wir</Eyebrow>
            <Heading as="h2" size="md" className="mt-5">
              Verlässlichkeit, wenn es darauf ankommt.
            </Heading>
            <p className="mt-5 text-lead text-foreground-muted">
              Pflege beginnt oft plötzlich. Was dann zählt, ist jemand, der die
              Regeln kennt, schnell erreichbar ist und Ihre Interessen vertritt.
            </p>
          </Reveal>

          <m.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid gap-6 sm:grid-cols-2"
          >
            {reasons.map(({ title, description, icon: Icon }) => (
              <m.li
                key={title}
                variants={{
                  hidden: { opacity: 0, scale: 0.97 },
                  visible: { opacity: 1, scale: 1 },
                }}
              >
                <Card
                  variant="glass"
                  interactive
                  padding="lg"
                  className="group h-full"
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-linear-120 from-brand-500 to-brand-600 text-white shadow-glow-brand transition-transform duration-500 ease-out-quint group-hover:-rotate-6">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <CardTitle className="mt-6">{title}</CardTitle>
                  <CardDescription className="mt-3">
                    {description}
                  </CardDescription>
                </Card>
              </m.li>
            ))}
          </m.ul>
        </div>
      </Container>
    </Section>
  );
}

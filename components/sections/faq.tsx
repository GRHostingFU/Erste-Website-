"use client";

import { m } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { staggerContainer, viewportOnce } from "@/lib/motion";

const faqs = [
  {
    question: "Was kostet die Pflegeberatung?",
    answer:
      "Die Beratung nach § 7a SGB XI ist für Versicherte kostenfrei – die Pflegekasse trägt die Kosten. Zusatzleistungen besprechen wir vorher transparent.",
  },
  {
    question: "Wie schnell bekomme ich einen Termin?",
    answer:
      "In der Regel innerhalb von 48 Stunden. In akuten Situationen, etwa nach einem Krankenhausaufenthalt, auch am selben Tag.",
  },
  {
    question: "Beraten Sie auch bei mir zu Hause?",
    answer:
      "Ja. Der Hausbesuch ist die Regel, weil sich Wohnumfeld und Alltag nur vor Ort realistisch einschätzen lassen. Auf Wunsch beraten wir per Video.",
  },
  {
    question: "Was, wenn der Pflegegrad abgelehnt wurde?",
    answer:
      "Wir prüfen den Bescheid, bereiten den Widerspruch vor und begleiten die erneute Begutachtung – mit Dokumentation, die den Pflegeaufwand belegt.",
  },
] as const;

/** FAQ-Vorschau: native <details>, damit ohne JavaScript bedienbar. */
export function Faq() {
  return (
    <Section id="faq" spacing="lg">
      <Container size="content">
        <Reveal className="max-w-2xl">
          <Eyebrow>Häufige Fragen</Eyebrow>
          <Heading as="h2" size="md" className="mt-5">
            Kurz beantwortet.
          </Heading>
        </Reveal>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 space-y-4"
        >
          {faqs.map((faq) => (
            <m.details
              key={faq.question}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
              className="group rounded-2xl border border-border bg-surface px-6 shadow-xs transition-all duration-500 ease-out-quint open:shadow-md hover:border-border-strong hover:shadow-md"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left font-semibold tracking-tight focus-ring [&::-webkit-details-marker]:hidden">
                {faq.question}
                <Plus
                  className="size-5 shrink-0 text-primary transition-transform duration-300 ease-out-quint group-open:rotate-45"
                  aria-hidden="true"
                />
              </summary>
              <p className="pb-6 text-sm leading-relaxed text-foreground-muted">
                {faq.answer}
              </p>
            </m.details>
          ))}
        </m.div>

        <Reveal delay={0.1} className="mt-10 flex justify-center">
          <Button variant="soft" asChild>
            <Link href="/faq">
              Alle Fragen ansehen
              <ArrowRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}

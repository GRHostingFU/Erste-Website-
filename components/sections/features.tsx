"use client";

import { m } from "framer-motion";
import {
  ClipboardList,
  FileCheck2,
  HeartHandshake,
  Home,
  Scale,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/motion";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { staggerContainer, viewportOnce } from "@/lib/motion";

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
}

const features: readonly Feature[] = [
  {
    title: "Pflegegrad-Beratung",
    description:
      "Wir bereiten Sie auf die Begutachtung vor, prüfen Bescheide und begleiten Widersprüche – damit der Pflegegrad zur tatsächlichen Situation passt.",
    icon: ClipboardList,
    accent: "from-brand-400/20 to-brand-500/5",
  },
  {
    title: "Beratungseinsätze § 37.3",
    description:
      "Der gesetzlich vorgeschriebene Beratungsbesuch bei Pflegegeld – pünktlich, dokumentiert und ohne bürokratischen Aufwand für Sie.",
    icon: FileCheck2,
    accent: "from-sage-400/20 to-sage-500/5",
  },
  {
    title: "Angehörigenbegleitung",
    description:
      "Pflege verändert Familien. Wir hören zu, ordnen ein und zeigen Wege, wie Belastung fair verteilt und Überforderung vermieden wird.",
    icon: HeartHandshake,
    accent: "from-brand-300/25 to-brand-400/5",
  },
  {
    title: "Leistungen & Anträge",
    description:
      "Verhinderungspflege, Kurzzeitpflege, Entlastungsbetrag: Wir zeigen, was Ihnen zusteht, und füllen die Anträge gemeinsam mit Ihnen aus.",
    icon: Scale,
    accent: "from-sage-300/25 to-sage-400/5",
  },
  {
    title: "Wohnraumanpassung",
    description:
      "Vom Treppenlift bis zum barrierefreien Bad – wir planen sinnvolle Umbauten und sichern die Zuschüsse der Pflegekasse.",
    icon: Home,
    accent: "from-brand-400/20 to-sage-400/10",
  },
  {
    title: "Pflegekurse für Familien",
    description:
      "Praktisches Wissen für zu Hause: Transfer, Lagerung, Umgang mit Demenz – verständlich vermittelt, in Ihrem Tempo.",
    icon: Users,
    accent: "from-sage-400/20 to-brand-400/10",
  },
] as const;

/** Sechs Leistungen als individuell akzentuierte Karten mit Hover-Tiefe. */
export function Features() {
  return (
    <Section id="leistungen" spacing="lg">
      <Container size="wide">
        <Reveal className="max-w-2xl">
          <Eyebrow>Leistungen</Eyebrow>
          <Heading as="h2" size="md" className="mt-5">
            Alles, was Pflege zu Hause leichter macht.
          </Heading>
          <p className="mt-5 text-lead text-foreground-muted">
            Sechs Bereiche, in denen wir Familien seit über 15 Jahren entlasten
            – einzeln buchbar oder als durchgehende Begleitung.
          </p>
        </Reveal>

        <m.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map(({ title, description, icon: Icon, accent }) => (
            <m.li
              key={title}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Card
                interactive
                padding="lg"
                className="group h-full overflow-hidden"
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 bg-linear-160 ${accent} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                />
                <span className="relative flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-primary transition-transform duration-500 ease-out-quint group-hover:scale-110">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <CardTitle className="relative mt-6">{title}</CardTitle>
                <CardDescription className="relative mt-3">
                  {description}
                </CardDescription>
              </Card>
            </m.li>
          ))}
        </m.ul>
      </Container>
    </Section>
  );
}

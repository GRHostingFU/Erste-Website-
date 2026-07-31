"use client";

import { m } from "framer-motion";

import { Reveal } from "@/components/motion";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { team } from "@/lib/content/about";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

/**
 * Team.
 *
 * Statt Platzhalterfotos steht ein Initialen-Avatar auf Markenverlauf – das
 * bleibt bis zum Livegang optisch sauber und spart ein leeres Bild-Asset.
 * TODO(Inhalt): Porträts ergänzen und Avatar durch `next/image` ersetzen.
 */
export function AboutTeam() {
  return (
    <Section id="team" spacing="lg">
      <Container size="wide">
        <Reveal className="max-w-2xl">
          <Eyebrow>Team</Eyebrow>
          <Heading as="h2" size="md" className="mt-5">
            Menschen, die Sie beim Namen kennen.
          </Heading>
          <p className="mt-5 text-lead text-foreground-muted">
            Sie haben eine feste Ansprechperson – kein Ticketsystem und keine
            wechselnden Zuständigkeiten.
          </p>
        </Reveal>

        <m.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {team.map((member) => (
            <m.li key={member.name} variants={fadeInUp}>
              <Card interactive padding="md" className="h-full text-center">
                <span
                  aria-hidden="true"
                  className="mx-auto flex size-20 items-center justify-center rounded-full bg-linear-120 from-brand-400 to-brand-600 font-display text-2xl text-white shadow-md"
                >
                  {member.initials}
                </span>
                <h3 className="mt-6 text-lg font-semibold tracking-tight">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-primary">
                  {member.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                  {member.focus}
                </p>
              </Card>
            </m.li>
          ))}
        </m.ul>
      </Container>
    </Section>
  );
}

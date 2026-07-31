"use client";

import { m } from "framer-motion";

import { Reveal } from "@/components/motion";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { mission, vision } from "@/lib/content/about";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

const pillars = [mission, vision] as const;

/** Mission und Vision als gleichrangiges Kartenpaar. */
export function AboutMission() {
  return (
    <Section id="mission" spacing="lg">
      <Container size="content">
        <Reveal className="max-w-2xl">
          <Eyebrow>Wofür wir stehen</Eyebrow>
          <Heading as="h2" size="md" className="mt-5">
            Zwei Sätze, an denen wir uns messen lassen.
          </Heading>
        </Reveal>

        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-6 md:grid-cols-2"
        >
          {pillars.map((pillar) => (
            <m.div key={pillar.eyebrow} variants={fadeInUp}>
              <Card variant="gradient" padding="lg" className="h-full">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                  <pillar.icon className="size-6" aria-hidden="true" />
                </span>
                <Eyebrow className="mt-6">{pillar.eyebrow}</Eyebrow>
                <Heading as="h3" size="xs" className="mt-3">
                  {pillar.title}
                </Heading>
                <p className="mt-4 leading-relaxed text-foreground-muted">
                  {pillar.text}
                </p>
              </Card>
            </m.div>
          ))}
        </m.div>
      </Container>
    </Section>
  );
}

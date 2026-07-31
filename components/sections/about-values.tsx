"use client";

import { m } from "framer-motion";

import { Reveal } from "@/components/motion";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { values } from "@/lib/content/about";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

/** Werte als ruhiges Vierer-Raster ohne Kartenrahmen. */
export function AboutValues() {
  return (
    <Section id="werte" tone="muted" spacing="lg">
      <Container size="wide">
        <Reveal className="max-w-2xl">
          <Eyebrow>Werte</Eyebrow>
          <Heading as="h2" size="md" className="mt-5">
            Vier Prinzipien, die jede Empfehlung bestehen muss.
          </Heading>
        </Reveal>

        <m.dl
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2"
        >
          {values.map((value) => (
            <m.div
              key={value.title}
              variants={fadeInUp}
              className="flex gap-5 border-t border-border pt-6"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-surface text-primary shadow-xs">
                <value.icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <dt className="text-lg font-semibold tracking-tight">
                  {value.title}
                </dt>
                <dd className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {value.text}
                </dd>
              </div>
            </m.div>
          ))}
        </m.dl>
      </Container>
    </Section>
  );
}

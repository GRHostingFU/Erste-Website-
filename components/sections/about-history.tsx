"use client";

import { m, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";

import { Reveal } from "@/components/motion";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { milestones } from "@/lib/content/about";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";

/**
 * Geschichte als vertikale Zeitleiste.
 *
 * Die Linie füllt sich scrollabhängig (`scaleY`) – eine Bewegung, die den
 * Lesefortschritt abbildet statt bloß zu dekorieren. Bei
 * `prefers-reduced-motion` bleibt die Linie statisch vollständig gefüllt.
 */
export function AboutHistory() {
  const listRef = useRef<HTMLOListElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 75%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <Section id="geschichte" tone="muted" spacing="lg">
      <Container size="content">
        <Reveal className="max-w-2xl">
          <Eyebrow>Geschichte</Eyebrow>
          <Heading as="h2" size="md" className="mt-5">
            Aus einer eigenen Pflegesituation entstanden.
          </Heading>
        </Reveal>

        <m.ol
          ref={listRef}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative mt-14 space-y-12 ps-10"
        >
          {/* Ruhende Spur … */}
          <span
            aria-hidden="true"
            className="absolute inset-y-0 start-[7px] w-px bg-border"
          />
          {/* … und der scrollabhängige Fortschritt darüber. */}
          <m.span
            aria-hidden="true"
            style={prefersReducedMotion ? undefined : { scaleY: progress }}
            className="absolute inset-y-0 start-[7px] w-px origin-top bg-linear-to-b from-primary to-primary/0"
          />

          {milestones.map((item) => (
            <m.li key={item.year} variants={fadeInUp} className="relative">
              <span
                aria-hidden="true"
                className="absolute -start-10 top-1.5 size-3.5 rounded-full border-2 border-primary bg-background"
              />
              <p className="font-display text-xl text-primary">{item.year}</p>
              <h3 className="mt-2 text-lg font-semibold tracking-tight">
                {item.title}
              </h3>
              <p className="mt-3 max-w-xl leading-relaxed text-foreground-muted">
                {item.text}
              </p>
            </m.li>
          ))}
        </m.ol>
      </Container>
    </Section>
  );
}

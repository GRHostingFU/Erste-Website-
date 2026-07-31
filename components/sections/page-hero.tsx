"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { transitions } from "@/lib/motion";

interface PageHeroProps {
  /** Kicker über der Überschrift – ordnet die Seite ein. */
  eyebrow: string;
  /**
   * Optionales Icon als fertiges Element (z. B. `<Sparkles className="size-3.5" />`).
   * Bewusst kein Komponententyp: Funktionen lassen sich nicht von einer
   * Server- an eine Client-Komponente übergeben, Elemente hingegen schon.
   */
  icon?: ReactNode;
  title: ReactNode;
  description: string;
  /** Optionale Aktionen (Buttons) unter dem Text. */
  actions?: ReactNode;
}

/**
 * Einheitlicher Seitenkopf aller Unterseiten.
 *
 * Bewusst identisch aufgebaut wie der Hero der Startseite (gleiche Tonfläche,
 * gleicher `pt-header`-Ausgleich), aber flacher: Unterseiten sollen den Blick
 * schnell an den Inhalt weiterreichen. Above the fold wird per CSS animiert,
 * damit der Text unabhängig von der Hydration sofort sichtbar ist.
 */
export function PageHero({
  eyebrow,
  icon,
  title,
  description,
  actions,
}: PageHeroProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section tone="gradient" spacing="lg" className="overflow-hidden pt-header">
      <m.div
        aria-hidden="true"
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={transitions.slow}
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 mx-auto h-[30rem] max-w-4xl rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-800/20"
      />

      <Container size="content">
        <div className="max-w-3xl">
          <Eyebrow className="animate-fade-in">
            {icon}
            {eyebrow}
          </Eyebrow>

          <Heading
            as="h1"
            size="lg"
            className="mt-6 animate-fade-in-up [animation-delay:80ms]"
          >
            {title}
          </Heading>

          <p className="mt-6 max-w-2xl animate-fade-in-up text-lead text-foreground-muted [animation-delay:160ms]">
            {description}
          </p>

          {actions ? (
            <div className="mt-10 flex animate-fade-in-up flex-wrap items-center gap-3 [animation-delay:240ms]">
              {actions}
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}

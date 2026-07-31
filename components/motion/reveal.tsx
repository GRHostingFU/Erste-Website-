"use client";

import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import { transitions, viewportOnce } from "@/lib/motion";

const presets = {
  fade: { opacity: 0 },
  up: { opacity: 0, y: 24 },
  scale: { opacity: 0, scale: 0.97 },
} as const;

/**
 * Erlaubte Elemente. Bewusst eine geschlossene Liste statt `ElementType`:
 * Sie deckt jeden realen Anwendungsfall ab und macht den Zugriff auf `m.*`
 * ohne Type-Assertion typsicher.
 */
const elements = {
  div: m.div,
  section: m.section,
  article: m.article,
  aside: m.aside,
  header: m.header,
  footer: m.footer,
  li: m.li,
  p: m.p,
  span: m.span,
} as const;

export type RevealPreset = keyof typeof presets;
export type RevealElement = keyof typeof elements;

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Art der Einblendung. */
  preset?: RevealPreset;
  /** Verzögerung in Sekunden – für gestaffelte Listen `index * 0.08`. */
  delay?: number;
  /** Gerendertes Element. Wichtig, damit die Semantik erhalten bleibt. */
  as?: RevealElement;
}

/**
 * Blendet Inhalte ein, sobald sie in den Viewport scrollen.
 *
 * Wesentlich für die wahrgenommene Qualität: Die Animation läuft genau einmal
 * (`once`), die Distanz bleibt klein, und bei `prefers-reduced-motion` wird
 * der Inhalt ohne jede Bewegung ausgegeben – nicht nur schneller animiert.
 */
export function Reveal({
  children,
  className,
  preset = "up",
  delay = 0,
  as = "div",
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const MotionComponent = elements[as];

  if (prefersReducedMotion) {
    const Component = as;
    return <Component className={className}>{children}</Component>;
  }

  return (
    <MotionComponent
      className={className}
      initial={presets[preset]}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={viewportOnce}
      transition={{ ...transitions.slow, delay }}
    >
      {children}
    </MotionComponent>
  );
}

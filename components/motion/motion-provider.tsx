"use client";

import { domMax, LazyMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Lädt das Framer-Motion-Feature-Set gebündelt nach.
 *
 * `domMax` deckt Transforms, Opacity, Gesten, `whileInView` *und*
 * Layout-Animationen (`layout`, `layoutId`) ab. Letztere werden für den
 * gleitenden Indikator im FAQ-Filter benötigt – mit `domAnimation` würde er
 * ohne Fehlermeldung springen statt zu gleiten.
 *
 * Das Feature-Bundle wird weiterhin getrennt vom Haupt-Chunk geladen; im
 * Markup kommt ausschließlich `m.*` zum Einsatz, nie `motion.*`.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={domMax}>{children}</LazyMotion>;
}

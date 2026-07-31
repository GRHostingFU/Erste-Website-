"use client";

import { useMediaQuery } from "./use-media-query";

/**
 * Gibt zurück, ob die Nutzerin oder der Nutzer reduzierte Bewegung wünscht.
 *
 * Für Framer-Motion-Komponenten genügt meist `useReducedMotion()` aus der
 * Bibliothek. Dieser Hook deckt alles ab, was ohne Motion animiert wird –
 * Autoplay, Parallax, Zähler, Karussells.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

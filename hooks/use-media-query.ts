"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * SSR-sicherer Media-Query-Hook auf Basis von `useSyncExternalStore`.
 *
 * Gegenüber der klassischen `useEffect`-Variante entfällt der Flash beim ersten
 * Paint: React kennt den Server-Snapshot (`false`) und gleicht clientseitig
 * synchron ab, statt erst nach dem Mount ein Re-Render auszulösen.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener("change", onStoreChange);
      return () => mediaQueryList.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  // Auf dem Server gibt es keine Viewport-Information – konservativ `false`.
  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** Breakpoints des Designsystems, spiegelbildlich zu Tailwinds Defaults. */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/** `true`, sobald der Viewport mindestens den angegebenen Breakpoint erreicht. */
export function useBreakpoint(breakpoint: Breakpoint): boolean {
  return useMediaQuery(`(min-width: ${BREAKPOINTS[breakpoint]}px)`);
}

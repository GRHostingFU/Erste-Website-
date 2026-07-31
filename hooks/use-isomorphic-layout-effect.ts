"use client";

import { useEffect, useLayoutEffect } from "react";

/**
 * `useLayoutEffect` läuft auf dem Server nicht und erzeugt dort eine
 * React-Warnung. Dieser Alias fällt beim Server-Rendering auf `useEffect`
 * zurück und behält im Browser das Verhalten vor dem Paint bei.
 */
export const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

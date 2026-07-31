"use client";

import { useSyncExternalStore } from "react";

/** Store ohne Änderungen – der Wert unterscheidet sich nur Server/Client. */
const emptySubscribe = () => () => {};

/**
 * `true`, sobald die Komponente im Browser hydratisiert wurde.
 *
 * Umgesetzt über `useSyncExternalStore` statt über `useEffect` + `setState`:
 * Das vermeidet den zusätzlichen Render-Durchlauf nach dem Mount und ist die
 * von React empfohlene Form, Server- und Client-Snapshot zu unterscheiden.
 *
 * Gedacht für den seltenen Fall, dass sich Server- und Client-Ausgabe
 * zwangsläufig unterscheiden (z. B. Portale) – bewusst sparsam einsetzen.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

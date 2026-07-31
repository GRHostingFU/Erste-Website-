"use client";

import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect";

/**
 * Friert das Scrollen des Dokuments ein, solange `locked` gesetzt ist –
 * etwa während ein Overlay oder das mobile Menü geöffnet ist.
 *
 * Die Breite der Scrollbar wird als Padding kompensiert, damit das Layout beim
 * Öffnen nicht sichtbar springt. Der Layout-Effect sorgt dafür, dass die
 * Kompensation noch vor dem nächsten Paint greift.
 */
export function useLockBodyScroll(locked: boolean): void {
  useIsomorphicLayoutEffect(() => {
    if (!locked) return;

    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [locked]);
}

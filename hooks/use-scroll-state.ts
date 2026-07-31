"use client";

import { useEffect, useState } from "react";

export type ScrollDirection = "up" | "down";

export interface ScrollState {
  /** `true`, sobald der Schwellenwert überschritten wurde. */
  isScrolled: boolean;
  /** Letzte erkannte Scroll-Richtung – nützlich für Auto-Hide-Header. */
  direction: ScrollDirection;
  /** Aktuelle vertikale Scroll-Position in Pixeln. */
  y: number;
}

interface UseScrollStateOptions {
  /** Ab welcher Scroll-Position gilt `isScrolled`? */
  threshold?: number;
  /** Mindestdistanz, bevor ein Richtungswechsel gemeldet wird (entprellt). */
  directionThreshold?: number;
}

/**
 * Beobachtet die Scroll-Position mit rAF-Drosselung.
 *
 * Der Listener ist `passive`, State-Updates erfolgen nur bei tatsächlicher
 * Änderung – so bleibt der Main Thread beim Scrollen frei.
 */
export function useScrollState({
  threshold = 8,
  directionThreshold = 6,
}: UseScrollStateOptions = {}): ScrollState {
  const [state, setState] = useState<ScrollState>({
    isScrolled: false,
    direction: "up",
    y: 0,
  });

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;

      setState((previous) => {
        const direction: ScrollDirection =
          Math.abs(delta) < directionThreshold
            ? previous.direction
            : delta > 0
              ? "down"
              : "up";
        const isScrolled = y > threshold;

        if (
          previous.isScrolled === isScrolled &&
          previous.direction === direction &&
          previous.y === y
        ) {
          return previous;
        }

        return { isScrolled, direction, y };
      });

      if (Math.abs(delta) >= directionThreshold) lastY = y;
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [threshold, directionThreshold]);

  return state;
}

import type { Transition, Variants } from "framer-motion";

/**
 * Motion-Sprache der Marke.
 *
 * Bewegung ist hier ein Gestaltungsmittel, kein Effekt: kurze Distanzen,
 * ausschließlich ausklingende Easings, nie länger als 0,8 s. Alle Werte liegen
 * zentral, damit sich das Timing der gesamten Website an einer Stelle stimmen
 * lässt – und damit es identisch zu den CSS-Tokens in `globals.css` bleibt.
 */
type CubicBezier = [number, number, number, number];

export const EASE = {
  /** Standard für Ein- und Ausblendungen. */
  outQuint: [0.22, 1, 0.36, 1],
  /** Betont langes Ausklingen – für große Flächen. */
  outExpo: [0.16, 1, 0.3, 1],
  /** Symmetrisch, für Positionswechsel (Layout-Animationen). */
  inOutQuint: [0.83, 0, 0.17, 1],
} satisfies Record<string, CubicBezier>;

export const DURATION = {
  fast: 0.25,
  base: 0.45,
  slow: 0.7,
} as const;

/** Weiche Feder für Layout- und Hover-Bewegungen. */
export const SPRING: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 34,
  mass: 0.9,
};

export const transitions = {
  fast: { duration: DURATION.fast, ease: EASE.outQuint },
  base: { duration: DURATION.base, ease: EASE.outQuint },
  slow: { duration: DURATION.slow, ease: EASE.outExpo },
} as const satisfies Record<string, Transition>;

/** Reines Ein-/Ausblenden. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transitions.base },
};

/** Standard-Einblendung: kurzer Weg von unten, kein Overshoot. */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transitions.slow },
};

/** Für Karten und Bildflächen – minimale Skalierung wirkt hochwertiger. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: transitions.slow },
};

/** Elternvariante für gestaffelte Listen. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

/**
 * Viewport-Konfiguration für `whileInView`.
 *
 * `once: true` verhindert das billig wirkende Wiederholen beim Zurückscrollen;
 * der negative untere Rand löst aus, sobald das Element wirklich sichtbar ist.
 */
export const viewportOnce = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -10% 0px",
} as const;

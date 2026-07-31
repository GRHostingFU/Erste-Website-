import { Inter } from "next/font/google";

/**
 * Inter als einzige Schriftfamilie – Display und Fließtext.
 *
 * `next/font` lädt die Variable-Font-Datei selbst gehostet aus, entfernt damit
 * jeden Request an Drittanbieter (DSGVO-relevant) und verhindert per
 * `size-adjust`-Fallback jedes Layout-Shift beim Font-Swap.
 *
 * Die optische Achse `opsz` ist bewusst aktiviert: Inter rendert damit große
 * Headlines mit engerer, präziserer Zeichnung als kleinen Fließtext.
 */
export const fontSans = Inter({
  subsets: ["latin", "latin-ext"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-inter",
  fallback: [
    "system-ui",
    "-apple-system",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});

/** Alle Font-CSS-Variablen gebündelt für das `<html>`-Element. */
export const fontVariables = fontSans.variable;

import type { Config } from "tailwindcss";

/**
 * Tailwind CSS v4 – JavaScript-Konfiguration
 * ---------------------------------------------------------------------------
 * Ab v4 ist Tailwind "CSS-first": Design-Tokens (Farben, Typografie, Radien,
 * Schatten, Easings, Keyframes) leben als `@theme`-Variablen in
 * `styles/globals.css` und sind dort zugleich echte CSS-Custom-Properties.
 *
 * Diese Datei bleibt bewusst schlank und übernimmt nur die Aufgaben, die auch
 * in v4 in JavaScript besser aufgehoben sind:
 *   1. explizite Source-Pfade (deterministischer als Auto-Detection)
 *   2. die Dark-Mode-Strategie
 *   3. die Plugin-Registrierung
 *
 * Eingebunden wird sie über `@config "../tailwind.config.ts";` in
 * `styles/globals.css`. Es gibt also genau eine Quelle je Belang – keine
 * doppelte Token-Definition zwischen CSS und JS.
 */
const config: Config = {
  darkMode: "class",

  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./utils/**/*.{ts,tsx}",
  ],

  plugins: [],
};

export default config;

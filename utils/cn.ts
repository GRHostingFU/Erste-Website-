import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge kennt unsere eigenen Theme-Tokens nicht. Ohne diese Erweiterung
 * würde `cn("text-display-lg", "text-sm")` beide Klassen behalten und die
 * Kaskade entscheiden lassen. Registriert man sie, gewinnt zuverlässig die
 * zuletzt übergebene Klasse.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "display-sm",
            "display-md",
            "display-lg",
            "display-xl",
            "display-2xl",
            "lead",
          ],
        },
      ],
      shadow: [{ shadow: ["glow-brand", "glow-sage"] }],
      tracking: [{ tracking: ["tightest", "eyebrow"] }],
    },
  },
});

/**
 * Führt bedingte Klassennamen zusammen und löst Tailwind-Konflikte auf –
 * die Grundlage dafür, dass jede Komponente per `className` überschreibbar ist.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

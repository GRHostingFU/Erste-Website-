import { cn } from "@/utils";

/**
 * Sprunglink zum Hauptinhalt.
 *
 * Für Tastatur- und Screenreader-Nutzung verpflichtend (WCAG 2.4.1): Ohne ihn
 * müsste die gesamte Navigation bei jedem Seitenaufruf durchtabbt werden.
 * Sichtbar wird der Link ausschließlich bei Fokus.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className={cn(
        "sr-only rounded-full bg-primary px-5 py-3 text-primary-foreground",
        "text-sm font-semibold shadow-lg",
        "focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4",
        "focus-visible:z-100",
      )}
    >
      Zum Hauptinhalt springen
    </a>
  );
}

import type { ComponentPropsWithoutRef } from "react";

import { siteConfig } from "@/lib/site.config";
import { cn } from "@/utils";

interface LogoProps extends ComponentPropsWithoutRef<"span"> {
  /** Blendet den Schriftzug aus – z. B. für sehr enge Layouts. */
  markOnly?: boolean;
  /** Invertiert den Schriftzug für dunkle Flächen. */
  inverted?: boolean;
}

/**
 * Wort-Bild-Marke.
 *
 * Das Zeichen ist eine offene Umarmung mit einem Punkt im Zentrum: Schutz und
 * Zuwendung, ohne das abgegriffene Herz-Symbol. Als Inline-SVG eingebettet –
 * kein zusätzlicher Request, skaliert verlustfrei, erbt die Textfarbe.
 */
export function Logo({
  markOnly = false,
  inverted = false,
  className,
  ...props
}: LogoProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-2.5", className)}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          "grid size-9 place-items-center from-brand-500 to-brand-600",
          "rounded-xl bg-linear-140 text-white shadow-sm",
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="size-5"
          focusable="false"
        >
          <path
            d="M18.4 5.9a8.5 8.5 0 1 0 0 12.2"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          <circle cx="15.4" cy="12" r="2.5" fill="currentColor" />
        </svg>
      </span>

      {markOnly ? null : (
        <span
          className={cn(
            "text-[1.0625rem] font-semibold tracking-tight",
            inverted ? "text-white" : "text-foreground",
          )}
        >
          {siteConfig.name}
        </span>
      )}

      {/* Der Markenname bleibt für Screenreader immer verfügbar. */}
      {markOnly ? <span className="sr-only">{siteConfig.name}</span> : null}
    </span>
  );
}

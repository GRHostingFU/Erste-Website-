import type { ElementType } from "react";

import type { PolymorphicProps, ResolvedPolymorphicProps } from "@/types";
import { cn } from "@/utils";

/**
 * Maximalbreiten des Layouts. Bewusst wenige Stufen – ein Rastersystem wirkt
 * nur dann ruhig, wenn nicht jede Sektion ihre eigene Breite erfindet.
 */
const containerSizes = {
  /** Fließtext, Formulare – optimale Zeilenlänge. */
  narrow: "max-w-narrow",
  /** Standard für Textabschnitte mit Medien. */
  content: "max-w-content",
  /** Standard für Sektionen und Karten-Raster. */
  wide: "max-w-wide",
  /** Volle Seitenbreite für Hero-Flächen und Header. */
  page: "max-w-page",
  /** Ohne Begrenzung – nur für randlose Effektflächen. */
  full: "max-w-none",
} as const;

export type ContainerSize = keyof typeof containerSizes;

interface ContainerOwnProps {
  size?: ContainerSize;
  /** Deaktiviert die horizontale Randabstände (z. B. für Full-Bleed-Medien). */
  disableGutter?: boolean;
}

/**
 * Horizontale Layout-Klammer: zentriert Inhalte und hält den Seitenrand
 * konsistent. Der Gutter skaliert fluid mit dem Viewport (`--spacing-gutter`),
 * dadurch braucht es keine Breakpoint-Sprünge im Padding.
 */
export function Container<TElement extends ElementType = "div">(
  props: PolymorphicProps<TElement, ContainerOwnProps>,
) {
  const {
    as,
    size = "wide",
    disableGutter = false,
    className,
    ...rest
  } = props as ResolvedPolymorphicProps<"div", ContainerOwnProps>;

  const Component = as ?? "div";

  return (
    <Component
      className={cn(
        "mx-auto w-full",
        containerSizes[size],
        !disableGutter && "px-gutter",
        className,
      )}
      {...rest}
    />
  );
}

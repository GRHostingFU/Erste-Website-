import type { ElementType } from "react";

import type { PolymorphicProps, ResolvedPolymorphicProps } from "@/types";
import { cn } from "@/utils";

/**
 * Vertikaler Rhythmus. Die Werte sind fluide (`clamp`), skalieren also
 * stufenlos mit dem Viewport – auf dem Handy kompakt, auf großen Screens
 * großzügig, ohne einen einzigen Breakpoint.
 */
const spacings = {
  none: "",
  sm: "py-section-sm",
  md: "py-section-md",
  lg: "py-section-lg",
  xl: "py-section-xl",
} as const;

/** Flächenwirkung einer Sektion – der Rhythmus aus Hell und Ruhe. */
const tones = {
  default: "bg-background text-foreground",
  muted: "bg-surface-muted text-foreground",
  brand: "bg-brand-950 text-white",
  gradient:
    "bg-background text-foreground bg-radial-brand dark:bg-none dark:bg-surface-muted",
  transparent: "",
} as const;

export type SectionSpacing = keyof typeof spacings;
export type SectionTone = keyof typeof tones;

interface SectionOwnProps {
  spacing?: SectionSpacing;
  tone?: SectionTone;
  /**
   * Sprungmarke für die Ankernavigation. Der Versatz zum Sticky-Header
   * kommt global über `scroll-padding-top` auf `html` (siehe `globals.css`).
   */
  id?: string;
}

/**
 * Semantischer Seitenabschnitt.
 *
 * Bewusst ohne integrierten `Container`: Sektionen brauchen regelmäßig
 * randlose Hintergründe mit eingerücktem Inhalt. Die explizite Komposition
 * `<Section><Container>…</Container></Section>` bleibt dadurch in jedem Fall
 * korrekt und lesbar.
 */
export function Section<TElement extends ElementType = "section">(
  props: PolymorphicProps<TElement, SectionOwnProps>,
) {
  const {
    as,
    spacing = "lg",
    tone = "default",
    className,
    id,
    ...rest
  } = props as ResolvedPolymorphicProps<"section", SectionOwnProps>;

  const Component = as ?? "section";

  return (
    <Component
      id={id}
      className={cn(
        "relative w-full",
        spacings[spacing],
        tones[tone],
        className,
      )}
      {...rest}
    />
  );
}

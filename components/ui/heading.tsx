import type { ElementType, ReactNode } from "react";

import type {
  BaseProps,
  PolymorphicProps,
  ResolvedPolymorphicProps,
} from "@/types";
import { cn } from "@/utils";

/**
 * Typografische Größen sind bewusst von der HTML-Ebene entkoppelt:
 * `as` bestimmt die Semantik (und damit die Dokumentgliederung),
 * `size` bestimmt die Optik. Eine `h2` darf klein sein, ohne die
 * Überschriftenhierarchie zu brechen – wichtig für SEO und Screenreader.
 */
const sizes = {
  "2xl": "text-display-2xl",
  xl: "text-display-xl",
  lg: "text-display-lg",
  md: "text-display-md",
  sm: "text-display-sm",
  xs: "text-xl font-semibold tracking-tight sm:text-2xl",
} as const;

const alignments = {
  left: "text-left",
  center: "text-center mx-auto",
  right: "text-right ms-auto",
} as const;

export type HeadingSize = keyof typeof sizes;
export type HeadingAlign = keyof typeof alignments;

interface HeadingOwnProps {
  size?: HeadingSize;
  align?: HeadingAlign;
  /** Färbt die Überschrift im Markenverlauf ein. Sparsam einsetzen. */
  gradient?: boolean;
  /**
   * `text-wrap: balance` verteilt die Zeilen einer Überschrift gleichmäßig.
   * Standardmäßig aktiv – für sehr lange Fließtexte abschaltbar.
   */
  balance?: boolean;
}

/**
 * Überschrift des Designsystems.
 *
 * @example
 * <Heading as="h2" size="lg">Beratung, die trägt</Heading>
 */
export function Heading<TElement extends ElementType = "h2">(
  props: PolymorphicProps<TElement, HeadingOwnProps>,
) {
  const {
    as,
    size = "lg",
    align = "left",
    gradient = false,
    balance = true,
    className,
    ...rest
  } = props as ResolvedPolymorphicProps<"h2", HeadingOwnProps>;

  const Component = as ?? "h2";

  return (
    <Component
      className={cn(
        "font-display text-foreground",
        sizes[size],
        alignments[align],
        balance ? "text-balance" : "text-pretty",
        gradient && "text-gradient-brand",
        className,
      )}
      {...rest}
    />
  );
}

interface EyebrowProps extends BaseProps {
  /** Kleiner Punkt vor dem Text – setzt einen ruhigen visuellen Anker. */
  withDot?: boolean;
  children: ReactNode;
}

/**
 * Kicker über einer Überschrift: ordnet den Abschnitt ein, bevor die Headline
 * ihn benennt. Als `<p>` gerendert, damit die Überschriftenhierarchie
 * unangetastet bleibt.
 */
export function Eyebrow({ withDot = true, className, children }: EyebrowProps) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-xs font-semibold tracking-eyebrow text-primary uppercase",
        className,
      )}
    >
      {withDot ? (
        <span
          aria-hidden="true"
          className="size-1.5 shrink-0 rounded-full bg-primary"
        />
      ) : null}
      {children}
    </p>
  );
}

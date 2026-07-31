import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementType } from "react";

import type { PolymorphicProps, ResolvedPolymorphicProps } from "@/types";
import { cn } from "@/utils";

const cardVariants = cva(
  [
    "relative rounded-3xl",
    "transition-[transform,box-shadow,border-color,background-color]",
    "duration-500 ease-out-quint",
  ],
  {
    variants: {
      variant: {
        /** Standardkarte auf hellem Grund. */
        solid: "border border-border bg-surface shadow-sm",
        /** Nur Kontur – ruhig, ideal für dichte Raster. */
        outline: "border border-border bg-transparent",
        /** Glassmorphism – setzt eine Fläche darunter voraus. */
        glass: "glass-panel shadow-lg",
        /** Weicher Markenverlauf für hervorgehobene Karten. */
        gradient: [
          "border border-brand-100 bg-linear-160 from-brand-50 to-white",
          "dark:border-brand-900/50 dark:from-brand-950/40 dark:to-surface",
          "shadow-sm",
        ],
        /** Dunkle Akzentkarte, z. B. für ein Zitat oder einen CTA. */
        inverted: "border border-white/10 bg-ink-950 text-white shadow-lg",
      },
      padding: {
        none: "p-0",
        sm: "p-5",
        md: "p-6 sm:p-8",
        lg: "p-8 sm:p-10",
      },
      /** Hebt die Karte bei Hover leicht an – nur für klickbare Karten. */
      interactive: {
        true: "focus-within:-translate-y-1 hover:-translate-y-1 hover:shadow-xl",
        false: "",
      },
    },
    defaultVariants: {
      variant: "solid",
      padding: "md",
      interactive: false,
    },
  },
);

type CardOwnProps = VariantProps<typeof cardVariants>;

/**
 * Container für abgegrenzte Inhaltseinheiten.
 *
 * Aufgebaut als Komposition (`Card` + `CardHeader` + `CardTitle` + …), damit
 * jede Sektion die Reihenfolge frei bestimmen kann, ohne dass die Komponente
 * ein Dutzend Slot-Props braucht.
 */
export function Card<TElement extends ElementType = "div">(
  props: PolymorphicProps<TElement, CardOwnProps>,
) {
  const { as, variant, padding, interactive, className, ...rest } =
    props as ResolvedPolymorphicProps<"div", CardOwnProps>;

  const Component = as ?? "div";

  return (
    <Component
      className={cn(cardVariants({ variant, padding, interactive }), className)}
      {...rest}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("flex flex-col gap-2", className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold tracking-tight text-balance",
        className,
      )}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn("text-sm leading-relaxed text-foreground-muted", className)}
      {...props}
    />
  );
}

export function CardContent({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("mt-5", className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn("mt-6 flex flex-wrap items-center gap-3", className)}
      {...props}
    />
  );
}

export { cardVariants };

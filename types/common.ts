import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

/**
 * Löst verschachtelte Typ-Schnittmengen auf, damit Editor-Tooltips lesbar
 * bleiben. Rein kosmetisch, aber im Alltag Gold wert.
 */
export type Prettify<T> = { [K in keyof T]: T[K] } & {};

/** Basis-Props, die jede Komponente des Designsystems akzeptiert. */
export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

/**
 * Props einer polymorphen Komponente: Über `as` wird das gerenderte Element
 * bestimmt, alle übrigen Props werden typsicher davon abgeleitet.
 *
 * Bewusst ohne `Prettify`: Die Auflösung des Mapped Type würde die generische
 * Inferenz von `TElement` an der Aufrufstelle verhindern.
 *
 * @example
 * <Container as="section" aria-labelledby="…" />
 */
export type PolymorphicProps<
  TElement extends ElementType,
  TOwnProps = object,
> = TOwnProps & {
  as?: TElement;
} & Omit<ComponentPropsWithoutRef<TElement>, keyof TOwnProps | "as">;

/**
 * Aufgelöste Variante derselben Props für die *Implementierung*.
 *
 * Innerhalb der Komponente ist `TElement` noch ungebunden – TypeScript kann
 * Defaults beim Destrukturieren deshalb nicht prüfen. Ein einmaliger Cast auf
 * das Standardelement löst das lokal auf, ohne die Typsicherheit nach außen
 * anzutasten. Dieses Muster nutzen Radix UI und MUI identisch.
 */
export type ResolvedPolymorphicProps<
  TDefault extends ElementType,
  TOwnProps = object,
> = TOwnProps & {
  as?: ElementType;
} & Omit<ComponentPropsWithoutRef<TDefault>, keyof TOwnProps | "as">;

/** Erlaubt sowohl einen Wert als auch ein Array desselben Typs. */
export type MaybeArray<T> = T | readonly T[];

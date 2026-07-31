import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import type { ButtonHTMLAttributes, Ref } from "react";

import { cn } from "@/utils";

/**
 * Buttons sind vollständig gerundet (`rounded-full`). Das ist eine bewusste
 * Markenentscheidung: Die weiche Form passt zum Thema Pflege und hebt die
 * Seite sofort von den eckigen Standard-Layouts ab.
 */
const buttonVariants = cva(
  [
    "group relative inline-flex shrink-0 items-center justify-center gap-2",
    "rounded-full font-semibold whitespace-nowrap select-none",
    "transition-[transform,box-shadow,background-color,border-color,color]",
    "duration-300 ease-out-quint will-change-transform",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "disabled:pointer-events-none disabled:opacity-55",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        /** Primäre Handlung – pro Bildschirm möglichst nur eine. */
        primary: [
          "bg-linear-120 from-brand-500 to-brand-600 text-white",
          "shadow-md hover:shadow-glow-brand",
          "hover:-translate-y-0.5 active:translate-y-0",
        ],
        /** Ruhige, dunkle Alternative für sekundäre Hauptwege. */
        secondary: [
          "bg-ink-950 text-white hover:bg-ink-900",
          "shadow-sm hover:shadow-lg",
          "hover:-translate-y-0.5 active:translate-y-0",
          "dark:bg-white dark:text-ink-950 dark:hover:bg-ink-100",
        ],
        /** Gleichwertige Zweitoption neben einem primären Button. */
        outline: [
          "border border-border bg-surface text-foreground",
          "hover:border-border-strong hover:bg-surface-muted",
          "shadow-xs hover:shadow-sm",
        ],
        /** Weicher Markenton – für Karten und Inline-Aktionen. */
        soft: "bg-primary-soft text-primary hover:bg-brand-100 dark:hover:bg-brand-900/40",
        /** Tertiär, ohne eigene Fläche. */
        ghost:
          "text-foreground-muted hover:bg-surface-muted hover:text-foreground",
        /** Textlink in Button-Semantik. */
        link: "h-auto rounded-none px-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-13 px-7 text-base",
        icon: "size-11 p-0",
      },
      /** Streckt den Button auf die volle Breite des Elternelements. */
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    compoundVariants: [
      { variant: "link", size: "sm", class: "h-auto" },
      { variant: "link", size: "md", class: "h-auto" },
      { variant: "link", size: "lg", class: "h-auto" },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Rendert die Styles auf das Kindelement statt auf ein `<button>`.
   * Der korrekte Weg, einen `next/link` wie einen Button aussehen zu lassen –
   * ohne einen Link in einen Button zu verschachteln.
   *
   * @example
   * <Button asChild><Link href="/kontakt">Termin sichern</Link></Button>
   */
  asChild?: boolean;
  /** Zeigt einen Spinner und sperrt die Interaktion. */
  isLoading?: boolean;
  ref?: Ref<HTMLButtonElement>;
}

export function Button({
  className,
  variant,
  size,
  fullWidth,
  asChild = false,
  isLoading = false,
  disabled,
  children,
  ref,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  // `disabled` ist ein Button-Attribut. Bei `asChild` (meist ein `<a>`) würde
  // es als unbekanntes DOM-Attribut landen – dort greift `aria-disabled`.
  const stateProps = asChild
    ? { "aria-disabled": disabled || isLoading || undefined }
    : { disabled: disabled || isLoading };

  return (
    <Component
      ref={ref}
      className={cn(buttonVariants({ variant, size, fullWidth }), className)}
      aria-busy={isLoading || undefined}
      {...stateProps}
      {...props}
    >
      {/* Slot verlangt exakt ein Kindelement – dort bleibt `children` allein. */}
      {asChild ? (
        children
      ) : (
        <>
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          ) : null}
          {children}
        </>
      )}
    </Component>
  );
}

export { buttonVariants };

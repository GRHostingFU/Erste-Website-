import type { LucideIcon } from "lucide-react";

/**
 * Ein einzelner Navigationseintrag.
 *
 * `href` bleibt bewusst ein `string`: Die Navigation mischt Routen (`/leistungen`),
 * Sprungmarken (`#kontakt`) und Protokoll-Links (`tel:`, `mailto:`).
 */
export interface NavItem {
  label: string;
  href: string;
  /** Kurzbeschreibung, z. B. für Mega-Menüs oder Screenreader-Kontext. */
  description?: string;
  icon?: LucideIcon;
  /** Öffnet den Link in einem neuen Tab und setzt `rel` korrekt. */
  external?: boolean;
}

/** Gruppierte Navigationseinträge – etwa eine Spalte im Footer. */
export interface NavGroup {
  title: string;
  items: readonly NavItem[];
}

/** Verweis auf ein soziales Netzwerk inklusive Icon. */
export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

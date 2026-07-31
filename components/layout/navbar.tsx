"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { useLockBodyScroll, useScrollState } from "@/hooks";
import { transitions } from "@/lib/motion";
import { mainNav, primaryCta } from "@/lib/navigation";
import { siteConfig } from "@/lib/site.config";
import { cn, toTelHref } from "@/utils";

const MOBILE_MENU_ID = "mobile-navigation";

/** `true`, wenn `href` die aktuelle Route ist oder sie enthält. */
function isActivePath(pathname: string, href: string): boolean {
  if (!href.startsWith("/")) return false;
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Kopfbereich der Website.
 *
 * Gestalterische Idee: Der Header ist am Seitenanfang unsichtbar und legt sich
 * beim Scrollen als Glasleiste über den Inhalt. Dadurch bleibt der Hero
 * ungestört, während die Navigation jederzeit erreichbar ist.
 *
 * Der Indikator unter den Desktop-Links ist rein CSS-basiert (`scale-x`).
 * Das spart Layout-Animationen im Framer-Motion-Bundle und läuft auf dem
 * Compositor – also ohne Layout-Thrashing beim Hovern.
 */
export function Navbar() {
  const { isScrolled } = useScrollState({ threshold: 12 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();

  useLockBodyScroll(isMenuOpen);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // Ein Routenwechsel schließt das Menü – sonst bliebe es über der neuen Seite.
  // Die Korrektur erfolgt während des Renderings statt in einem Effect: React
  // verwirft den Render sofort und rendert neu, ohne dass ein Frame mit dem
  // veralteten Zustand sichtbar wird.
  const [renderedPathname, setRenderedPathname] = useState(pathname);
  if (renderedPathname !== pathname) {
    setRenderedPathname(pathname);
    setIsMenuOpen(false);
  }

  // Escape schließt das Menü, wie in jedem nativen Overlay erwartet.
  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMenuOpen, closeMenu]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50",
        "transition-[background-color,box-shadow,border-color,backdrop-filter]",
        "duration-500 ease-out-quint",
        isScrolled || isMenuOpen
          ? "border-b glass-panel shadow-sm"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container size="page">
        <nav
          aria-label="Hauptnavigation"
          className="flex h-header items-center justify-between gap-6"
        >
          <Link
            href="/"
            aria-label={`${siteConfig.name} – zur Startseite`}
            className="rounded-xl focus-ring"
          >
            <Logo />
          </Link>

          {/* Desktop-Navigation */}
          <ul className="hidden items-center gap-1 lg:flex">
            {mainNav.map((item) => {
              const isActive = isActivePath(pathname, item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group relative rounded-lg px-3 py-2 focus-ring",
                      "text-sm font-medium transition-colors duration-300",
                      isActive
                        ? "text-foreground"
                        : "text-foreground-muted hover:text-foreground",
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-3 bottom-1 h-px origin-left bg-primary",
                        "transition-transform duration-400 ease-out-quint",
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Aktionen */}
          <div className="flex items-center gap-2">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="hidden xl:inline-flex"
            >
              <a href={toTelHref(siteConfig.contact.phone)}>
                <Phone className="size-4" aria-hidden="true" />
                {siteConfig.contact.phone}
              </a>
            </Button>

            <Button asChild size="sm" className="hidden sm:inline-flex">
              <Link href={primaryCta.href}>{primaryCta.label}</Link>
            </Button>

            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              aria-expanded={isMenuOpen}
              aria-controls={MOBILE_MENU_ID}
              aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
              className={cn(
                "relative grid size-11 place-items-center border-border focus-ring",
                "rounded-full border text-foreground transition-colors",
                "hover:bg-surface-muted lg:hidden",
              )}
            >
              {/* Beide Icons liegen übereinander und werden gekreuzt
                  ein-/ausgeblendet – das ist ruhiger als ein harter Tausch. */}
              <Menu
                aria-hidden="true"
                className={cn(
                  "absolute size-5 transition-all duration-300 ease-out-quint",
                  isMenuOpen
                    ? "scale-75 rotate-90 opacity-0"
                    : "scale-100 rotate-0 opacity-100",
                )}
              />
              <X
                aria-hidden="true"
                className={cn(
                  "absolute size-5 transition-all duration-300 ease-out-quint",
                  isMenuOpen
                    ? "scale-100 rotate-0 opacity-100"
                    : "scale-75 -rotate-90 opacity-0",
                )}
              />
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Navigation */}
      <AnimatePresence initial={false}>
        {isMenuOpen ? (
          <m.div
            id={MOBILE_MENU_ID}
            key="mobile-navigation"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={transitions.base}
            // Deutlich blickdichter als die Kopfleiste: Über dem geöffneten
            // Menü darf kein Seiteninhalt durchscheinen – Lesbarkeit vor Effekt.
            className="overflow-hidden border-t border-border bg-surface/95 lg:hidden"
          >
            <Container size="page" className="py-6">
              <m.ul
                className="flex flex-col gap-1"
                initial={prefersReducedMotion ? false : "hidden"}
                animate="visible"
                variants={{
                  hidden: {},
                  visible: {
                    transition: { staggerChildren: 0.05, delayChildren: 0.08 },
                  },
                }}
              >
                {mainNav.map((item) => {
                  const isActive = isActivePath(pathname, item.href);

                  return (
                    <m.li
                      key={item.href}
                      variants={{
                        hidden: { opacity: 0, x: -12 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      transition={transitions.fast}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "flex items-center justify-between rounded-xl px-3 py-3 focus-ring",
                          "text-base font-medium transition-colors",
                          isActive
                            ? "bg-primary-soft text-primary"
                            : "text-foreground hover:bg-surface-muted",
                        )}
                      >
                        {item.label}
                        {isActive ? (
                          <span
                            aria-hidden="true"
                            className="size-1.5 rounded-full bg-primary"
                          />
                        ) : null}
                      </Link>
                    </m.li>
                  );
                })}
              </m.ul>

              <div className="mt-5 flex flex-col gap-3">
                <Button asChild size="lg" fullWidth>
                  <Link href={primaryCta.href} onClick={closeMenu}>
                    {primaryCta.label}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" fullWidth>
                  <a href={toTelHref(siteConfig.contact.phone)}>
                    <Phone className="size-4" aria-hidden="true" />
                    {siteConfig.contact.phone}
                  </a>
                </Button>
              </div>
            </Container>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

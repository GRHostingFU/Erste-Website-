import { ArrowUp, Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { footerNav, legalNav } from "@/lib/navigation";
import { siteConfig } from "@/lib/site.config";
import { cn, toMailHref, toTelHref } from "@/utils";

const { address } = siteConfig.contact;

const contactItems = [
  {
    icon: Phone,
    label: siteConfig.contact.phone,
    href: toTelHref(siteConfig.contact.phone),
  },
  {
    icon: Mail,
    label: siteConfig.contact.email,
    href: toMailHref(siteConfig.contact.email),
  },
] as const;

/**
 * Fußbereich.
 *
 * Bewusst als Server-Komponente ohne jedes JavaScript: Der Sprung nach oben
 * nutzt den nativen Fragment-Bezeichner `#top`, den Browser ohne Zielelement
 * auflösen – zusammen mit `scroll-behavior: smooth` ergibt das exakt dasselbe
 * Verhalten wie eine JS-Lösung, nur ohne Bundle-Kosten.
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface-muted">
      <Container size="page" className="py-section-md">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Marke & Kontakt */}
          <div className="lg:col-span-5">
            <Logo />

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-foreground-muted">
              {siteConfig.description}
            </p>

            <ul className="mt-7 flex flex-col gap-3 text-sm">
              {contactItems.map(({ icon: Icon, label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    className={cn(
                      "text-foreground-muted focus-ring hover:text-primary",
                      "inline-flex items-center gap-3 rounded-md transition-colors",
                    )}
                  >
                    <Icon
                      className="size-4 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                    {label}
                  </a>
                </li>
              ))}

              <li className="flex items-start gap-3 text-foreground-muted">
                <MapPin
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <address className="not-italic">
                  {address.street}
                  <br />
                  {address.postalCode} {address.city}
                </address>
              </li>

              <li className="flex items-center gap-3 text-foreground-muted">
                <Clock
                  className="size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                {siteConfig.contact.openingHours}
              </li>
            </ul>
          </div>

          {/* Navigationsspalten */}
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="text-xs font-semibold tracking-eyebrow text-foreground uppercase">
                  {group.title}
                </h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {group.items.map((item) => (
                    <li key={item.href + item.label}>
                      <Link
                        href={item.href}
                        className={cn(
                          "text-foreground-muted focus-ring hover:text-primary",
                          "rounded-md text-sm transition-colors",
                        )}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <nav aria-label="Rechtliches">
              <h2 className="text-xs font-semibold tracking-eyebrow text-foreground uppercase">
                Rechtliches
              </h2>
              <ul className="mt-5 flex flex-col gap-3">
                {legalNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "text-foreground-muted focus-ring hover:text-primary",
                        "rounded-md text-sm transition-colors",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Abschlusszeile */}
        <div
          className={cn(
            "mt-14 flex flex-col gap-4 border-t border-border pt-8",
            "sm:flex-row sm:items-center sm:justify-between",
          )}
        >
          <p className="text-sm text-foreground-subtle">
            © {year} {siteConfig.legalName}. Alle Rechte vorbehalten.
          </p>

          <a
            href="#top"
            className={cn(
              "text-foreground-muted focus-ring hover:text-primary",
              "inline-flex items-center gap-2 self-start rounded-full text-sm",
              "transition-colors sm:self-auto",
            )}
          >
            Nach oben
            <ArrowUp className="size-4" aria-hidden="true" />
          </a>
        </div>
      </Container>
    </footer>
  );
}

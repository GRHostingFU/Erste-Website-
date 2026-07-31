"use client";

import { m } from "framer-motion";
import { Clock, Mail, MapPin, PhoneCall } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { siteConfig } from "@/lib/site.config";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/motion";
import { toMailHref, toTelHref } from "@/utils";

const { contact } = siteConfig;
const { address } = contact;

const channels = [
  {
    icon: PhoneCall,
    label: "Telefon",
    value: contact.phone,
    href: toTelHref(contact.phone),
    note: "Persönlich erreichbar, kein Callcenter.",
  },
  {
    icon: Mail,
    label: "E-Mail",
    value: contact.email,
    href: toMailHref(contact.email),
    note: "Antwort in der Regel am selben Werktag.",
  },
  {
    icon: MapPin,
    label: "Adresse",
    value: `${address.street}, ${address.postalCode} ${address.city}`,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      `${address.street}, ${address.postalCode} ${address.city}`,
    )}`,
    note: "Barrierefreier Zugang im Erdgeschoss.",
  },
] as const;

/** Öffnungszeiten – Quelle für Anzeige und strukturierte Daten. */
export const openingHours = [
  { day: "Montag – Donnerstag", hours: "08:00 – 18:00 Uhr" },
  { day: "Freitag", hours: "08:00 – 15:00 Uhr" },
  { day: "Samstag", hours: "Nach Vereinbarung" },
  { day: "Sonntag & Feiertage", hours: "Geschlossen" },
] as const;

/** Kontaktwege und Öffnungszeiten als Karten-Stapel neben dem Formular. */
export function ContactInfo() {
  return (
    <m.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="space-y-6"
    >
      <m.ul variants={fadeInUp} className="space-y-4">
        {channels.map((channel) => (
          <li key={channel.label}>
            <Card
              as="a"
              href={channel.href}
              {...(channel.label === "Adresse"
                ? { target: "_blank", rel: "noreferrer" }
                : {})}
              interactive
              padding="md"
              className="flex items-start gap-4 focus-ring"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                <channel.icon className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-semibold tracking-eyebrow text-foreground-subtle uppercase">
                  {channel.label}
                </span>
                <span className="mt-1 block font-semibold tracking-tight break-words">
                  {channel.value}
                </span>
                <span className="mt-1 block text-sm text-foreground-muted">
                  {channel.note}
                </span>
              </span>
            </Card>
          </li>
        ))}
      </m.ul>

      <m.div variants={fadeInUp}>
        <Card variant="gradient" padding="md">
          <div className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-surface text-primary shadow-xs">
              <Clock className="size-5" aria-hidden="true" />
            </span>
            <Heading as="h2" size="xs">
              Öffnungszeiten
            </Heading>
          </div>

          <dl className="mt-6 divide-y divide-border">
            {openingHours.map((entry) => (
              <div
                key={entry.day}
                className="flex items-baseline justify-between gap-4 py-3 text-sm"
              >
                <dt className="text-foreground-muted">{entry.day}</dt>
                <dd className="font-semibold tracking-tight">{entry.hours}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-5 text-sm text-foreground-muted">
            In akuten Fällen – etwa bei einer Krankenhausentlassung – erreichen
            Sie uns auch außerhalb dieser Zeiten telefonisch.
          </p>
        </Card>
      </m.div>
    </m.div>
  );
}

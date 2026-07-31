"use client";

import { m, useReducedMotion } from "framer-motion";
import { ExternalLink, MapPin } from "lucide-react";

import { Reveal } from "@/components/motion";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/lib/site.config";

const { address } = siteConfig.contact;
const fullAddress = `${address.street}, ${address.postalCode} ${address.city}`;
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  fullAddress,
)}`;

/**
 * Karten-Platzhalter.
 *
 * Bewusst kein Google-Maps-iframe: Das würde vor jeder Einwilligung Daten an
 * Google senden. Die Fläche ist eine reine CSS-Grafik (Raster, Straßenbänder,
 * pulsierender Marker) und verlinkt stattdessen nach außen.
 *
 * TODO(Datenschutz): Bei Bedarf durch eine Consent-gesteuerte Einbettung
 * ersetzen – die Grafik bleibt dann als Vorschau vor der Zustimmung stehen.
 */
export function ContactMap() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Section id="anfahrt" tone="muted" spacing="lg">
      <Container size="wide">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <Eyebrow>Anfahrt</Eyebrow>
            <Heading as="h2" size="md" className="mt-5">
              So finden Sie zu uns.
            </Heading>
            <p className="mt-5 leading-relaxed text-foreground-muted">
              Unser Beratungsbüro liegt zentral, ist stufenlos zugänglich und
              mit Bus und Bahn in wenigen Minuten erreichbar. Parkplätze
              befinden sich direkt vor dem Haus.
            </p>

            <address className="mt-6 text-lg font-semibold tracking-tight not-italic">
              {address.street}
              <br />
              {address.postalCode} {address.city}
            </address>

            <Button variant="soft" asChild className="mt-8">
              <a href={mapsUrl} target="_blank" rel="noreferrer">
                Route planen
                <ExternalLink className="size-4" aria-hidden="true" />
              </a>
            </Button>
          </Reveal>

          <Reveal preset="scale" delay={0.1}>
            {/* Rein dekorative Kartenfläche – daher aria-hidden. */}
            <div
              aria-hidden="true"
              className="relative aspect-4/3 overflow-hidden rounded-[2rem] border border-border bg-linear-160 from-brand-50 via-surface to-sage-50 shadow-lg dark:from-brand-950/40 dark:via-surface dark:to-sage-950/30"
            >
              <div className="absolute inset-0 bg-grid-subtle opacity-70" />

              {/* Angedeutete Straßenzüge. */}
              <div className="absolute inset-x-0 top-[38%] h-3 -rotate-6 bg-border-strong/50" />
              <div className="absolute inset-x-0 top-[64%] h-2 rotate-3 bg-border-strong/40" />
              <div className="absolute inset-y-0 start-[30%] w-3 rotate-2 bg-border-strong/50" />
              <div className="absolute inset-y-0 start-[72%] w-2 -rotate-1 bg-border-strong/40" />

              {/* Grünfläche und Wasserband als Farbanker. */}
              <div className="absolute start-[6%] top-[10%] size-24 rounded-2xl bg-sage-200/60 dark:bg-sage-800/40" />
              <div className="absolute end-[8%] bottom-[8%] h-20 w-40 rounded-full bg-azure-200/60 blur-[2px] dark:bg-azure-900/40" />

              {/* Marker mit ruhigem Puls. */}
              <div className="absolute start-[30%] top-[38%] -translate-x-1/2 -translate-y-full">
                <m.span
                  className="absolute -bottom-1 left-1/2 size-10 -translate-x-1/2 rounded-full bg-brand-500/25"
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : { scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }
                  }
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />
                <span className="relative flex size-11 items-center justify-center rounded-full bg-linear-120 from-brand-500 to-brand-600 text-white shadow-glow-brand">
                  <MapPin className="size-5" />
                </span>
              </div>

              <span className="absolute bottom-4 left-4 rounded-xl glass-panel px-4 py-2 text-xs font-semibold">
                {fullAddress}
              </span>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

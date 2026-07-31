"use client";

import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, PhoneCall, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { transitions } from "@/lib/motion";
import { siteConfig } from "@/lib/site.config";
import { toTelHref } from "@/utils";

const trust = [
  { value: "3.000+", label: "Beratungen" },
  { value: "15+", label: "Jahre Erfahrung" },
  { value: "98 %", label: "Zufriedenheit" },
] as const;

/**
 * Hero der Startseite.
 *
 * Der Text erscheint per CSS-Animation (sofort im HTML, gut für LCP), das
 * Bild bewegt sich beim Scrollen leicht gegenläufig – ein Parallax-Effekt,
 * der bei `prefers-reduced-motion` vollständig entfällt.
 */
export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.35]);

  return (
    <Section tone="gradient" spacing="xl" className="overflow-hidden pt-header">
      <div
        ref={sectionRef}
        className="absolute inset-0 -z-20"
        aria-hidden="true"
      />
      {/* Dekorative Lichtflächen – rein visuell, daher aria-hidden. */}
      <m.div
        aria-hidden="true"
        style={prefersReducedMotion ? undefined : { y: glowY }}
        className="pointer-events-none absolute inset-x-0 -top-40 -z-10 mx-auto h-[36rem] max-w-5xl rounded-full bg-brand-200/40 blur-3xl dark:bg-brand-800/20"
      />

      <Container size="wide">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Eyebrow className="animate-fade-in">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Unabhängige Pflegeberatung
            </Eyebrow>

            <Heading
              as="h1"
              size="xl"
              className="mt-6 animate-fade-in-up [animation-delay:80ms]"
            >
              Pflegeberatung mit{" "}
              <span className="text-gradient-brand">Herz und Kompetenz.</span>
            </Heading>

            <p className="mt-6 max-w-xl animate-fade-in-up text-lead text-foreground-muted [animation-delay:160ms]">
              Wir begleiten Angehörige und Pflegebedürftige durch alle Fragen
              rund um Pflegegrad, Leistungen und Alltag – persönlich,
              verständlich und immer auf Augenhöhe.
            </p>

            <div className="mt-10 flex animate-fade-in-up flex-wrap items-center gap-3 [animation-delay:240ms]">
              <Button size="lg" asChild>
                <Link href="/kontakt">
                  Kostenlose Erstberatung
                  <ArrowRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href={toTelHref(siteConfig.contact.phone)}>
                  <PhoneCall className="size-4" aria-hidden="true" />
                  {siteConfig.contact.phone}
                </a>
              </Button>
            </div>

            <dl className="mt-14 grid max-w-lg animate-fade-in-up grid-cols-3 gap-6 border-t border-border pt-8 [animation-delay:320ms]">
              {trust.map((item) => (
                <div key={item.label}>
                  <dt className="sr-only">{item.label}</dt>
                  <dd>
                    <span className="block font-display text-display-sm text-foreground">
                      {item.value}
                    </span>
                    <span className="mt-1 block text-sm text-foreground-muted">
                      {item.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Bildfläche mit Parallax. */}
          <m.div
            style={prefersReducedMotion ? undefined : { y: imageY }}
            className="relative animate-scale-in [animation-delay:200ms]"
          >
            <div className="relative aspect-4/5 overflow-hidden rounded-[2rem] border border-border bg-linear-160 from-brand-100 via-brand-50 to-white shadow-2xl sm:aspect-4/3 lg:aspect-4/5 dark:from-brand-950 dark:via-surface dark:to-surface">
              <m.div
                aria-hidden="true"
                style={
                  prefersReducedMotion ? undefined : { opacity: overlayOpacity }
                }
                className="absolute inset-0 bg-radial-brand"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 animate-aurora bg-linear-120 from-brand-400/25 via-transparent to-sage-400/25"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-grid-subtle opacity-60"
              />
            </div>

            {/* Schwebende Vertrauenskarte. */}
            <m.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...transitions.slow, delay: 0.5 }}
              className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl glass-panel p-4 shadow-xl sm:left-8"
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-primary-soft text-primary">
                <ShieldCheck className="size-5" aria-hidden="true" />
              </span>
              <span className="text-sm">
                <span className="block font-semibold">Nach § 7a SGB XI</span>
                <span className="block text-foreground-muted">
                  Kostenfrei für Versicherte
                </span>
              </span>
            </m.div>
          </m.div>
        </div>
      </Container>
    </Section>
  );
}

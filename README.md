# Pflegeberatung – Premium-Unternehmenswebsite

Vollständige Unternehmenswebsite einer unabhängigen Pflegeberatung: Startseite,
alle Unterseiten, rechtliche Pflichtseiten, Designsystem, Motion-Schicht und
SEO-Basis. Alle Routen werden statisch vorgerendert.

---

## Schnellstart

```bash
npm install
npm run dev      # http://localhost:3000
```

Voraussetzung: Node.js ≥ 20.9 (siehe `.nvmrc`).

Optional vor dem Deployment: `.env.example` nach `.env.local` kopieren und
`NEXT_PUBLIC_SITE_URL` auf die echte Domain setzen.

## Skripte

| Befehl              | Zweck                                          |
| ------------------- | ---------------------------------------------- |
| `npm run dev`       | Entwicklungsserver                             |
| `npm run build`     | Produktionsbuild (inkl. Typprüfung)            |
| `npm run start`     | Produktionsserver                              |
| `npm run typecheck` | `tsc --noEmit`                                 |
| `npm run lint`      | ESLint (Flat Config, Next-Presets + a11y)      |
| `npm run format`    | Prettier inkl. Klassensortierung               |
| `npm run check`     | Typecheck + Lint + Formatprüfung in einem Lauf |

## Tech-Stack

| Baustein  | Wahl                    | Begründung                                                  |
| --------- | ----------------------- | ----------------------------------------------------------- |
| Framework | Next.js 16 (App Router) | Server Components, statisches Rendering, Metadata-API       |
| Sprache   | TypeScript 5.9 (strict) | inkl. `noUncheckedIndexedAccess` und `verbatimModuleSyntax` |
| Styling   | Tailwind CSS v4         | CSS-first Design-Tokens, Lightning CSS, keine Runtime       |
| Animation | Framer Motion 12        | via `LazyMotion` als getrenntes Chunk geladen               |
| Icons     | lucide-react            | konsistente Strichstärke, tree-shakebar                     |
| Varianten | CVA + tailwind-merge    | typsichere Varianten, konfliktfreies `className`-Override   |
| Schrift   | Inter (`next/font`)     | selbst gehostet – kein Google-Request, kein Layout-Shift    |

## Ordnerstruktur

```
app/                  Routen (App Router), jede Seite eine Server Component
  page.tsx            Startseite
  leistungen/         Leistungsübersicht
  ueber-uns/          Mission, Werte, Team, Geschichte
  faq/                Fragen mit Filter und FAQPage-JSON-LD
  kontakt/            Formular, Kontaktwege, Anfahrt
  impressum/          Anbieterkennzeichnung (§ 5 DDG)
  datenschutz/        DSGVO-Informationen (Art. 12–22)
  layout.tsx          Root-Layout: Fonts, Header, Footer, JSON-LD
  error.tsx           Fehlergrenze · not-found.tsx  404
  sitemap.ts robots.ts manifest.ts icon.svg

components/
  layout/             Navbar, Footer, SkipLink
  motion/             MotionProvider (LazyMotion) und Reveal
  sections/           Alle Seitenabschnitte, je Datei ein Abschnitt
  seo/                JSON-LD-Ausgabe
  ui/                 Designsystem: Button, Card, Container, Heading,
                      Section, Logo, Field

hooks/                useScrollState, useMediaQuery, useLockBodyScroll, …
lib/
  content/            Redaktionelle Inhalte (services, about, faq, legal)
  motion.ts           Easings, Dauern, Varianten – die Motion-Sprache
  navigation.ts       Informationsarchitektur + Sitemap-Routen
  seo.ts              createMetadata(), strukturierte Daten
  site.config.ts      Marke, Kontakt, Domain – eine einzige Quelle
styles/globals.css    Design-Tokens, Themes, Base-Layer, Utilities
types/                Geteilte Typen (Navigation, SEO, Polymorphie)
utils/                cn(), Formatierungs-Helfer
```

## Konventionen

- **Inhalt vor Markup.** Texte, Leistungen, Fragen und Rechtstexte liegen in
  `lib/content/` bzw. `lib/site.config.ts`. Eine neue Leistung ist ein
  Objekt-Eintrag, keine Layout-Änderung.
- **Server Components als Standard.** `"use client"` steht ausschließlich in
  Sektionen, die Interaktivität oder Motion benötigen.
- **Above the fold nur CSS-Animation** (`animate-fade-in-up`), damit der Inhalt
  unabhängig von der Hydration sofort sichtbar ist (LCP). `<Reveal>` mit Framer
  Motion ist für alles darunter gedacht.
- **`prefers-reduced-motion` wird respektiert** – Bewegung entfällt dann
  vollständig, statt nur schneller zu laufen.
- **Keine Barrel-Imports in Routen**: direkte Modulpfade halten die
  Client-Bundles je Route klein.
- **Datenschutz by design**: keine Cookies, kein Tracking, keine externen
  Schriften, kein eingebetteter Kartendienst.

## Vor dem Livegang

1. `lib/site.config.ts` – Marke, Anschrift, Telefon, E-Mail, Domain eintragen.
2. `lib/content/legal.ts` – alle mit „Platzhalter“ markierten Angaben in
   Impressum und Datenschutzerklärung ersetzen und juristisch prüfen lassen.
3. `components/sections/contact-form.tsx` – `handleSubmit` an eine Server Action
   oder einen Route Handler anbinden, dort erneut validieren und einen
   Spam-Schutz ergänzen.
4. `public/images/` – Open-Graph-Bild (`og-default.jpg`, 1200 × 630) und echte
   Bildmotive hinterlegen.
5. `npm run check && npm run build` ausführen – beides muss fehlerfrei
   durchlaufen.

import {
  ClipboardList,
  FileSignature,
  HeartHandshake,
  Home,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  /** Anker-ID – wird aus dem Titel abgeleitet und in der Sprungnavigation genutzt. */
  id: string;
  title: string;
  summary: string;
  icon: LucideIcon;
  /** Konkrete Leistungsbestandteile – bewusst als Nutzen formuliert. */
  bullets: readonly string[];
  /** Kurzer Hinweis auf Dauer, Kosten oder Rechtsgrundlage. */
  meta: string;
}

/**
 * Leistungsportfolio.
 *
 * Inhalt liegt getrennt von der Darstellung: Die Seite rendert nur, was hier
 * steht – eine neue Leistung ist ein Eintrag, keine Layout-Änderung.
 */
export const services: readonly Service[] = [
  {
    id: "pflegeberatung",
    title: "Pflegeberatung",
    summary:
      "Die persönliche Grundberatung nach § 7a SGB XI: Wir klären Ihre Situation, ordnen Ansprüche ein und entwickeln daraus die nächsten Schritte.",
    icon: HeartHandshake,
    bullets: [
      "Analyse der Pflegesituation und des Unterstützungsbedarfs",
      "Überblick über alle Leistungen der Pflegekasse",
      "Verständliche Einordnung von Bescheiden und Fristen",
      "Schriftliche Zusammenfassung nach jedem Gespräch",
    ],
    meta: "Kostenfrei für Versicherte · ca. 90 Minuten",
  },
  {
    id: "pflegegrad",
    title: "Pflegegrad",
    summary:
      "Vom ersten Einschätzen bis zur Höherstufung: Wir bereiten die Begutachtung so vor, dass der tatsächliche Aufwand sichtbar wird.",
    icon: Stethoscope,
    bullets: [
      "Realistische Ersteinschätzung des zu erwartenden Grades",
      "Vorbereitung auf den Termin mit dem Medizinischen Dienst",
      "Pflegetagebuch: Anleitung und Auswertung",
      "Prüfung des Bescheids, Widerspruch und Höherstufung",
    ],
    meta: "Begleitung bis zum Bescheid",
  },
  {
    id: "antraege",
    title: "Anträge",
    summary:
      "Formulare kosten Nerven, nicht Kompetenz. Wir füllen sie gemeinsam aus, prüfen die Nachweise und behalten die Fristen im Blick.",
    icon: FileSignature,
    bullets: [
      "Pflegegrad-, Entlastungs- und Verhinderungspflegeanträge",
      "Wohnumfeldverbessernde Maßnahmen bis 4.180 €",
      "Hilfsmittel- und Pflegehilfsmittelanträge",
      "Fristenkontrolle und Schriftverkehr mit der Pflegekasse",
    ],
    meta: "Inklusive Nachweis- und Fristencheck",
  },
  {
    id: "hausbesuche",
    title: "Hausbesuche",
    summary:
      "Beratung dort, wo gepflegt wird. Erst im Wohnumfeld zeigt sich, welche Hürden den Alltag wirklich schwer machen.",
    icon: Home,
    bullets: [
      "Beratungseinsätze nach § 37 Abs. 3 SGB XI",
      "Begehung von Bad, Schlafzimmer, Fluren und Zugängen",
      "Konkrete Vorschläge für Hilfsmittel und Umbauten",
      "Auf Wunsch als Videoberatung – ohne Anfahrtszeit",
    ],
    meta: "Termin meist innerhalb von 48 Stunden",
  },
  {
    id: "angehoerigenberatung",
    title: "Angehörigenberatung",
    summary:
      "Pflege betrifft die ganze Familie. Wir entlasten die Menschen, die tragen – rechtlich, organisatorisch und menschlich.",
    icon: Users,
    bullets: [
      "Vereinbarkeit von Beruf und Pflege, Pflegezeit und Freistellung",
      "Rollen und Aufgaben in der Familie fair verteilen",
      "Umgang mit Überlastung, Schuldgefühlen und Konflikten",
      "Vermittlung zu Selbsthilfe, Kurzzeit- und Tagespflege",
    ],
    meta: "Einzeln oder im Familiengespräch",
  },
  {
    id: "pflegeplanung",
    title: "Pflegeplanung",
    summary:
      "Ein schriftlicher Versorgungsplan, der Zuständigkeiten festhält und regelmäßig nachgeschärft wird – statt Absprachen im Kopf.",
    icon: ClipboardList,
    bullets: [
      "Individueller Versorgungsplan nach § 7a SGB XI",
      "Abstimmung mit Pflegedienst, Ärzten und Therapeuten",
      "Notfallplan für Krankenhaus- und Vertretungssituationen",
      "Halbjährliche Überprüfung und Anpassung",
    ],
    meta: "Schriftlich, verbindlich, jederzeit anpassbar",
  },
] as const;

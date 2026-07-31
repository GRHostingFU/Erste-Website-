import {
  Compass,
  Eye,
  HandHeart,
  Scale,
  ShieldCheck,
  Sprout,
  type LucideIcon,
} from "lucide-react";

export interface ValueItem {
  title: string;
  text: string;
  icon: LucideIcon;
}

export interface TeamMember {
  name: string;
  role: string;
  focus: string;
  /** Initialen für den Avatar-Platzhalter (kein Bild-Asset nötig). */
  initials: string;
}

export interface MilestoneItem {
  year: string;
  title: string;
  text: string;
}

/** Mission und Vision – zwei Sätze, die den Rest der Seite tragen. */
export const mission = {
  eyebrow: "Mission",
  icon: Compass,
  title: "Pflege verständlich machen.",
  text: "Wer plötzlich pflegt, verliert Zeit an Formulare, Zuständigkeiten und Fristen. Unsere Mission ist, diesen Teil zu übernehmen – damit aus Überforderung wieder Handlungsfähigkeit wird und Angehörige Angehörige bleiben dürfen.",
} as const;

export const vision = {
  eyebrow: "Vision",
  icon: Eye,
  title: "Niemand pflegt allein.",
  text: "Wir arbeiten auf eine Versorgung hin, in der jede Familie in ihrer Region eine unabhängige Ansprechperson hat – erreichbar, kompetent und frei von wirtschaftlichen Interessen an der Empfehlung.",
} as const;

export const values: readonly ValueItem[] = [
  {
    title: "Unabhängigkeit",
    text: "Wir vermitteln keine Pflegedienste gegen Provision. Unsere Empfehlung folgt Ihrer Situation, nicht einem Vertrag.",
    icon: Scale,
  },
  {
    title: "Verlässlichkeit",
    text: "Zugesagte Termine stehen, Rückrufe kommen am selben Tag, und jedes Gespräch endet mit einer schriftlichen Zusammenfassung.",
    icon: ShieldCheck,
  },
  {
    title: "Menschlichkeit",
    text: "Pflege ist selten nur organisatorisch. Wir nehmen uns die Zeit für das, was zwischen den Anträgen liegt.",
    icon: HandHeart,
  },
  {
    title: "Fachlichkeit",
    text: "Zertifizierte Pflegeberatung nach § 7a SGB XI, laufende Fortbildung und ein Netzwerk aus Recht, Medizin und Therapie.",
    icon: Sprout,
  },
] as const;

export const team: readonly TeamMember[] = [
  {
    name: "Andrea Vogt",
    role: "Gründerin & Pflegeberaterin",
    focus: "Pflegegrad-Begutachtung, Widerspruchsverfahren",
    initials: "AV",
  },
  {
    name: "Michael Brand",
    role: "Pflegeberater (§ 7a SGB XI)",
    focus: "Versorgungsplanung, Hausbesuche",
    initials: "MB",
  },
  {
    name: "Sarah Keller",
    role: "Sozialpädagogin",
    focus: "Angehörigenberatung, Beruf und Pflege",
    initials: "SK",
  },
  {
    name: "Tobias Lang",
    role: "Fachkraft Wohnberatung",
    focus: "Wohnumfeld, Hilfsmittel, Umbauförderung",
    initials: "TL",
  },
] as const;

/** Geschichte des Unternehmens – bewusst knapp, vier Wegmarken. */
export const milestones: readonly MilestoneItem[] = [
  {
    year: "2009",
    title: "Der Anlass",
    text: "Aus der Pflege der eigenen Mutter entsteht die Erkenntnis: Es fehlt nicht an Leistungen, sondern an jemandem, der sie erklärt.",
  },
  {
    year: "2013",
    title: "Die Gründung",
    text: "Start als Einzelberatung mit dem Anspruch, ausschließlich beratend und ohne Anbieterbindung zu arbeiten.",
  },
  {
    year: "2018",
    title: "Das Team",
    text: "Erweiterung um Sozialpädagogik und Wohnberatung – Pflege wird als Familien- und nicht als Einzelthema begleitet.",
  },
  {
    year: "2024",
    title: "Heute",
    text: "Über 500 begleitete Familien, Videoberatung im Regelangebot und feste Kooperationen mit Kliniken der Region.",
  },
] as const;

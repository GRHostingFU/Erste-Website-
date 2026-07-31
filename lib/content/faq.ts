export interface FaqItem {
  question: string;
  answer: string;
  category: FaqCategory;
}

export const faqCategories = [
  "Kosten & Ablauf",
  "Pflegegrad",
  "Leistungen",
] as const;

export type FaqCategory = (typeof faqCategories)[number];

/**
 * Fragenkatalog der FAQ-Seite.
 *
 * Reihenfolge = Häufigkeit im Erstgespräch. Antworten bleiben kurz genug,
 * um im aufgeklappten Zustand ohne Scrollen lesbar zu sein.
 */
export const faqs: readonly FaqItem[] = [
  {
    category: "Kosten & Ablauf",
    question: "Was kostet die Pflegeberatung?",
    answer:
      "Die Beratung nach § 7a SGB XI ist für Versicherte kostenfrei – die Kosten trägt die Pflegekasse. Zusätzliche Leistungen, etwa eine ausführliche Wohnraumplanung, besprechen wir vorher transparent und schriftlich.",
  },
  {
    category: "Kosten & Ablauf",
    question: "Wie schnell bekomme ich einen Termin?",
    answer:
      "In der Regel innerhalb von 48 Stunden. In akuten Situationen – etwa bei einer Entlassung aus dem Krankenhaus – versuchen wir, noch am selben Tag zu beraten.",
  },
  {
    category: "Kosten & Ablauf",
    question: "Wie läuft das Erstgespräch ab?",
    answer:
      "Wir hören zunächst zu: Wer pflegt, was fällt schwer, was ist bereits beantragt? Danach ordnen wir die Situation ein und benennen die nächsten drei Schritte. Das Gespräch dauert 20 bis 30 Minuten und verpflichtet zu nichts.",
  },
  {
    category: "Kosten & Ablauf",
    question: "Beraten Sie auch bei mir zu Hause?",
    answer:
      "Ja, der Hausbesuch ist bei uns der Regelfall. Wohnumfeld, Wege und Alltag lassen sich nur vor Ort realistisch einschätzen. Auf Wunsch beraten wir alternativ per Video – ohne technische Vorkenntnisse.",
  },
  {
    category: "Kosten & Ablauf",
    question: "Sind Sie unabhängig von Pflegediensten?",
    answer:
      "Vollständig. Wir vermitteln keine Dienste gegen Provision und sind an keinen Anbieter gebunden. Empfehlungen richten sich ausschließlich nach Ihrer Situation.",
  },
  {
    category: "Pflegegrad",
    question: "Wie beantrage ich einen Pflegegrad?",
    answer:
      "Ein formloser Anruf bei der Pflegekasse genügt, um den Antrag zu starten – wichtig ist das Datum, denn ab ihm werden Leistungen rückwirkend gezahlt. Den schriftlichen Teil und die Vorbereitung der Begutachtung übernehmen wir mit Ihnen gemeinsam.",
  },
  {
    category: "Pflegegrad",
    question: "Wie bereite ich mich auf die Begutachtung vor?",
    answer:
      "Entscheidend ist, den Aufwand an einem normalen Tag zu zeigen, nicht an einem guten. Wir führen mit Ihnen ein Pflegetagebuch, sammeln Befunde und gehen den Ablauf des Termins vorher durch. Auf Wunsch sind wir bei der Begutachtung dabei.",
  },
  {
    category: "Pflegegrad",
    question: "Was, wenn der Pflegegrad abgelehnt wurde?",
    answer:
      "Ein Widerspruch ist innerhalb eines Monats nach Zugang des Bescheids möglich. Wir prüfen das Gutachten, benennen die strittigen Module und begründen den Widerspruch mit belastbarer Dokumentation. Rund die Hälfte der begleiteten Widersprüche ist erfolgreich.",
  },
  {
    category: "Pflegegrad",
    question: "Wann lohnt sich eine Höherstufung?",
    answer:
      "Sobald sich der Hilfebedarf dauerhaft erhöht – etwa nach einem Sturz, bei fortschreitender Demenz oder wenn nächtliche Unterstützung nötig wird. Wir schätzen vorab realistisch ein, ob ein Antrag Aussicht auf Erfolg hat.",
  },
  {
    category: "Leistungen",
    question: "Was ist der Unterschied zwischen Pflegegeld und Sachleistung?",
    answer:
      "Pflegegeld wird direkt an die pflegebedürftige Person ausgezahlt, wenn Angehörige pflegen. Sachleistungen rechnet ein ambulanter Dienst mit der Pflegekasse ab. Beides lässt sich als Kombinationsleistung anteilig verbinden – wir rechnen die für Sie günstigste Variante durch.",
  },
  {
    category: "Leistungen",
    question: "Welche Zuschüsse gibt es für einen Umbau?",
    answer:
      "Für wohnumfeldverbessernde Maßnahmen – barrierefreies Bad, Treppenlift, Türverbreiterung – zahlt die Pflegekasse bis zu 4.180 € je Maßnahme. Bei mehreren Anspruchsberechtigten im Haushalt erhöht sich der Betrag. Wir stellen den Antrag vor Baubeginn.",
  },
  {
    category: "Leistungen",
    question: "Was ist der Beratungseinsatz nach § 37 Abs. 3 SGB XI?",
    answer:
      "Wer Pflegegeld bezieht, muss regelmäßig einen Beratungseinsatz abrufen: bei Pflegegrad 2 und 3 halbjährlich, bei 4 und 5 vierteljährlich. Bleibt er aus, kann die Pflegekasse das Pflegegeld kürzen. Wir übernehmen den Einsatz und die Meldung an die Kasse.",
  },
  {
    category: "Leistungen",
    question: "Wer hilft, wenn ich als Angehörige an meine Grenzen komme?",
    answer:
      "Genau dafür gibt es Verhinderungs- und Kurzzeitpflege, Tagespflege und Entlastungsbeträge. Wir prüfen Ihre Ansprüche, stellen die Anträge und vermitteln bei Bedarf an Selbsthilfegruppen oder psychologische Beratung.",
  },
] as const;

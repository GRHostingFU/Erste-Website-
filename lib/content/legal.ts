import { siteConfig } from "@/lib/site.config";

const { address, email, phone } = siteConfig.contact;

/**
 * Ein Abschnitt einer Rechtstextseite.
 *
 * Bewusst reine Daten statt JSX: Impressum und Datenschutzerklärung werden von
 * Juristinnen und Juristen geprüft und angepasst – dafür soll niemand Markup
 * anfassen müssen. `id` erzeugt Sprungmarke und Eintrag im Inhaltsverzeichnis.
 */
export interface LegalSection {
  id: string;
  title: string;
  /** Absätze in der gewünschten Reihenfolge. */
  paragraphs?: readonly string[];
  /** Optionale Aufzählung unterhalb der Absätze. */
  list?: readonly string[];
  /** Definitionsliste, z. B. für Anschrift oder Kontaktdaten. */
  details?: readonly { term: string; description: string }[];
}

/**
 * Impressum nach § 5 DDG (vormals § 5 TMG) und § 18 Abs. 2 MStV.
 *
 * TODO(Recht): Alle mit „Platzhalter“ markierten Angaben vor dem Livegang durch
 * die echten Unternehmensdaten ersetzen und den Text anwaltlich prüfen lassen.
 */
export const impressumSections: readonly LegalSection[] = [
  {
    id: "anbieter",
    title: "Angaben gemäß § 5 DDG",
    details: [
      { term: "Firma", description: siteConfig.legalName },
      {
        term: "Anschrift",
        description: `${address.street}, ${address.postalCode} ${address.city}`,
      },
      { term: "Vertreten durch", description: "Platzhalter: Geschäftsführung" },
      { term: "Rechtsform", description: "Platzhalter: GmbH" },
    ],
  },
  {
    id: "kontakt",
    title: "Kontakt",
    details: [
      { term: "Telefon", description: phone },
      { term: "E-Mail", description: email },
      { term: "Erreichbarkeit", description: siteConfig.contact.openingHours },
    ],
  },
  {
    id: "register",
    title: "Register und Steuern",
    details: [
      { term: "Registergericht", description: "Platzhalter: Amtsgericht" },
      { term: "Registernummer", description: "Platzhalter: HRB 000000" },
      {
        term: "Umsatzsteuer-ID",
        description:
          "Platzhalter: DE000000000 (USt-IdNr. gemäß § 27 a UStG). " +
          "Pflegeberatungsleistungen sind gemäß § 4 Nr. 16 UStG regelmäßig " +
          "umsatzsteuerbefreit.",
      },
    ],
  },
  {
    id: "aufsicht",
    title: "Berufsrechtliche Angaben",
    paragraphs: [
      "Platzhalter: Zuständige Aufsichtsbehörde, Berufsbezeichnung und Staat " +
        "der Verleihung sowie die maßgeblichen berufsrechtlichen Regelungen. " +
        "Für die anerkannte Pflegeberatung nach § 7a SGB XI ist hier die " +
        "Anerkennung durch die Landesverbände der Pflegekassen anzugeben.",
    ],
  },
  {
    id: "verantwortlich",
    title: "Redaktionell verantwortlich",
    paragraphs: [
      `Platzhalter: Vor- und Nachname, ${address.street}, ${address.postalCode} ${address.city} ` +
        "(Angabe gemäß § 18 Abs. 2 MStV).",
    ],
  },
  {
    id: "streitschlichtung",
    title: "Streitschlichtung",
    paragraphs: [
      "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung " +
        "bereit. Wir sind nicht verpflichtet und nicht bereit, an einem " +
        "Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle " +
        "teilzunehmen.",
    ],
  },
  {
    id: "haftung",
    title: "Haftung für Inhalte und Links",
    paragraphs: [
      "Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach " +
        "den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht " +
        "verpflichtet, übermittelte oder gespeicherte fremde Informationen zu " +
        "überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige " +
        "Tätigkeit hinweisen.",
      "Unser Angebot enthält Links zu externen Websites Dritter, auf deren " +
        "Inhalte wir keinen Einfluss haben. Für diese fremden Inhalte ist stets " +
        "der jeweilige Anbieter verantwortlich. Bei Bekanntwerden von " +
        "Rechtsverletzungen entfernen wir derartige Links umgehend.",
      "Die Inhalte dieser Website ersetzen keine individuelle Beratung im " +
        "Einzelfall und keine medizinische oder rechtliche Auskunft.",
    ],
  },
  {
    id: "urheberrecht",
    title: "Urheberrecht",
    paragraphs: [
      "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen " +
        "Seiten unterliegen dem deutschen Urheberrecht. Vervielfältigung, " +
        "Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der " +
        "Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des " +
        "jeweiligen Autors bzw. Erstellers.",
    ],
  },
] as const;

/**
 * Datenschutzerklärung – Struktur nach Art. 12–22 DSGVO.
 *
 * Der Text beschreibt bewusst genau die Technik, die dieses Projekt tatsächlich
 * einsetzt: selbst gehostete Schriften, keine Cookies, kein Tracking, keine
 * eingebetteten Karten Dritter. Wer Analytics oder externe Dienste ergänzt,
 * muss hier einen entsprechenden Abschnitt hinzufügen.
 *
 * TODO(Recht): Vor dem Livegang durch eine Datenschutzbeauftragte oder einen
 * Fachanwalt prüfen und um tatsächlich eingesetzte Dienste ergänzen.
 */
export const datenschutzSections: readonly LegalSection[] = [
  {
    id: "verantwortlicher",
    title: "1. Verantwortlicher",
    paragraphs: [
      "Verantwortlicher im Sinne der Datenschutz-Grundverordnung (DSGVO) und " +
        "anderer nationaler Datenschutzgesetze ist:",
    ],
    details: [
      { term: "Firma", description: siteConfig.legalName },
      {
        term: "Anschrift",
        description: `${address.street}, ${address.postalCode} ${address.city}`,
      },
      { term: "Telefon", description: phone },
      { term: "E-Mail", description: email },
    ],
  },
  {
    id: "datenschutzbeauftragter",
    title: "2. Datenschutzbeauftragte Person",
    paragraphs: [
      "Platzhalter: Name und Kontaktdaten der oder des Datenschutzbeauftragten. " +
        "Besteht keine Bestellpflicht nach § 38 BDSG, kann dieser Abschnitt " +
        "entfallen.",
    ],
  },
  {
    id: "grundsaetze",
    title: "3. Grundsätze der Verarbeitung",
    paragraphs: [
      "Wir verarbeiten personenbezogene Daten ausschließlich auf Grundlage der " +
        "gesetzlichen Bestimmungen und beschränken uns dabei auf das, was für " +
        "den jeweiligen Zweck erforderlich ist (Grundsatz der Datenminimierung, " +
        "Art. 5 Abs. 1 lit. c DSGVO).",
      "Diese Website setzt keine Cookies zu Analyse- oder Marketingzwecken ein. " +
        "Es findet kein Tracking und kein Profiling statt; eine automatisierte " +
        "Entscheidungsfindung im Sinne des Art. 22 DSGVO erfolgt nicht.",
    ],
  },
  {
    id: "hosting",
    title: "4. Hosting und Server-Logfiles",
    paragraphs: [
      "Beim Aufruf dieser Website werden durch den Hosting-Anbieter automatisch " +
        "Informationen in sogenannten Server-Logfiles gespeichert, die Ihr " +
        "Browser übermittelt:",
    ],
    list: [
      "Anonymisierte IP-Adresse der anfragenden Instanz",
      "Datum und Uhrzeit des Zugriffs",
      "Name und URL der abgerufenen Datei sowie übertragene Datenmenge",
      "Meldung über den erfolgreichen Abruf (HTTP-Statuscode)",
      "Verwendeter Browsertyp, Betriebssystem und Referrer-URL",
    ],
  },
  {
    id: "hosting-rechtsgrundlage",
    title: "5. Rechtsgrundlage und Speicherdauer der Logfiles",
    paragraphs: [
      "Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes " +
        "Interesse liegt im technisch fehlerfreien Betrieb, in der Sicherheit " +
        "und in der Abwehr von Angriffen auf unsere Systeme.",
      "Die Logfiles werden nach spätestens 30 Tagen gelöscht, sofern sie nicht " +
        "zur Aufklärung eines konkreten Sicherheitsvorfalls benötigt werden.",
      "Platzhalter: Name und Anschrift des Hosting-Anbieters sowie – falls " +
        "vorhanden – Hinweis auf den Vertrag zur Auftragsverarbeitung nach " +
        "Art. 28 DSGVO.",
    ],
  },
  {
    id: "kontaktformular",
    title: "6. Kontaktformular und Kontaktaufnahme",
    paragraphs: [
      "Wenn Sie uns über das Kontaktformular, per E-Mail oder telefonisch " +
        "erreichen, verarbeiten wir Ihre Angaben ausschließlich zur Bearbeitung " +
        "Ihrer Anfrage und für den Fall von Anschlussfragen.",
      "Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, sofern die Anfrage auf " +
        "die Anbahnung eines Beratungsvertrags gerichtet ist, im Übrigen " +
        "Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung " +
        "von Anfragen).",
      "Die Daten verbleiben bei uns, bis der Zweck der Speicherung entfällt " +
        "oder Sie uns zur Löschung auffordern. Zwingende gesetzliche " +
        "Aufbewahrungsfristen – insbesondere handels- und steuerrechtliche – " +
        "bleiben unberührt.",
    ],
  },
  {
    id: "gesundheitsdaten",
    title: "7. Gesundheitsbezogene Angaben",
    paragraphs: [
      "Im Rahmen einer Pflegeberatung können Sie uns Angaben mitteilen, die " +
        "Gesundheitsdaten im Sinne des Art. 9 DSGVO darstellen. Bitte teilen " +
        "Sie solche Angaben nicht über das Kontaktformular mit, sondern " +
        "persönlich oder telefonisch.",
      "Sofern uns derartige Daten dennoch zugehen, verarbeiten wir sie " +
        "ausschließlich auf Grundlage Ihrer ausdrücklichen Einwilligung " +
        "(Art. 9 Abs. 2 lit. a DSGVO) oder – im Rahmen der Beratung nach " +
        "§ 7a SGB XI – auf Grundlage des Art. 9 Abs. 2 lit. h DSGVO in " +
        "Verbindung mit § 22 BDSG.",
    ],
  },
  {
    id: "schriften",
    title: "8. Schriftarten und externe Inhalte",
    paragraphs: [
      "Diese Website lädt alle verwendeten Schriftarten lokal vom eigenen " +
        "Server. Es besteht dadurch keine Verbindung zu Servern Dritter, und es " +
        "werden keine IP-Adressen an Drittanbieter übermittelt.",
      "Es sind weder Kartendienste noch Videoplayer oder Social-Media-Plugins " +
        "Dritter eingebettet. Der Anfahrtsbereich verweist lediglich über einen " +
        "gewöhnlichen Link auf einen externen Kartendienst; dieser wird erst " +
        "nach Ihrem bewussten Klick aufgerufen.",
    ],
  },
  {
    id: "empfaenger",
    title: "9. Empfänger und Drittlandtransfer",
    paragraphs: [
      "Eine Weitergabe Ihrer Daten erfolgt nur, soweit dies zur Vertragserfüllung " +
        "erforderlich ist, Sie eingewilligt haben oder wir gesetzlich dazu " +
        "verpflichtet sind. Eingesetzte Dienstleister sind vertraglich nach " +
        "Art. 28 DSGVO gebunden.",
      "Eine Übermittlung in Länder außerhalb der EU bzw. des EWR findet nicht " +
        "statt.",
    ],
  },
  {
    id: "rechte",
    title: "10. Ihre Rechte als betroffene Person",
    paragraphs: ["Ihnen stehen gegenüber uns die folgenden Rechte zu:"],
    list: [
      "Auskunft über die zu Ihrer Person gespeicherten Daten (Art. 15 DSGVO)",
      "Berichtigung unrichtiger oder unvollständiger Daten (Art. 16 DSGVO)",
      "Löschung Ihrer Daten (Art. 17 DSGVO)",
      "Einschränkung der Verarbeitung (Art. 18 DSGVO)",
      "Datenübertragbarkeit in einem gängigen Format (Art. 20 DSGVO)",
      "Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen (Art. 21 DSGVO)",
      "Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)",
    ],
  },
  {
    id: "beschwerde",
    title: "11. Beschwerderecht bei der Aufsichtsbehörde",
    paragraphs: [
      "Unabhängig von anderen Rechtsbehelfen steht Ihnen ein Beschwerderecht bei " +
        "einer Datenschutz-Aufsichtsbehörde zu, insbesondere in dem Mitgliedstaat " +
        "Ihres Aufenthaltsorts, Ihres Arbeitsplatzes oder des Orts des " +
        "mutmaßlichen Verstoßes (Art. 77 DSGVO).",
      "Platzhalter: Name und Anschrift der für uns zuständigen Aufsichtsbehörde.",
    ],
  },
  {
    id: "sicherheit",
    title: "12. Datensicherheit",
    paragraphs: [
      "Diese Website nutzt eine TLS-Verschlüsselung (HTTPS). Ergänzend setzen " +
        "wir technische und organisatorische Maßnahmen nach Art. 32 DSGVO ein, " +
        "um Ihre Daten gegen Verlust, Zerstörung und unberechtigten Zugriff zu " +
        "schützen.",
    ],
  },
  {
    id: "aktualitaet",
    title: "13. Aktualität dieser Erklärung",
    paragraphs: [
      "Diese Datenschutzerklärung wird angepasst, sobald sich die Rechtslage " +
        "oder die Verarbeitung auf dieser Website ändert. Es gilt jeweils die " +
        "hier veröffentlichte Fassung.",
    ],
  },
] as const;

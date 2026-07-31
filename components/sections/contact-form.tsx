"use client";

import { AnimatePresence, m } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import Link from "next/link";
import { useId, useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { SelectField, TextAreaField, TextField } from "@/components/ui/field";
import { transitions } from "@/lib/motion";

const topics = [
  "Erstberatung",
  "Pflegegrad & Begutachtung",
  "Antrag & Widerspruch",
  "Hausbesuch vereinbaren",
  "Angehörigenberatung",
  "Sonstiges",
] as const;

interface FormValues {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  consent: boolean;
}

type Errors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  topic: topics[0],
  message: "",
  consent: false,
};

/** Minimale Validierung im Client – die verbindliche Prüfung gehört auf den Server. */
function validate(values: FormValues): Errors {
  const errors: Errors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Bitte geben Sie Ihren Namen an.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email)) {
    errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
  }
  if (values.message.trim().length < 10) {
    errors.message = "Ein bis zwei Sätze helfen uns, gezielt zu antworten.";
  }
  if (!values.consent) {
    errors.consent =
      "Ohne Einwilligung dürfen wir Ihre Daten nicht verarbeiten.";
  }

  return errors;
}

/**
 * Kontaktformular.
 *
 * Bewusst ohne Formular-Bibliothek: Sechs Felder rechtfertigen keine
 * zusätzliche Abhängigkeit. Der Absendeweg ist noch nicht angebunden –
 * TODO(Backend): `onSubmit` gegen eine Server Action oder Route Handler
 * tauschen und dort erneut validieren sowie ein Spam-Schutzverfahren ergänzen.
 */
export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const consentErrorId = `${useId()}-consent-error`;

  function update<TKey extends keyof FormValues>(
    key: TKey,
    value: FormValues[TKey],
  ) {
    setValues((previous) => ({ ...previous, [key]: value }));
    // Fehler verschwindet, sobald der Nutzer das Feld korrigiert.
    setErrors((previous) => ({ ...previous, [key]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    // Platzhalter für den echten Versand.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("sent");
    setValues(initialValues);
  }

  return (
    <Card variant="solid" padding="lg" className="relative overflow-hidden">
      <Heading as="h2" size="xs">
        Nachricht senden
      </Heading>
      <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
        Wir melden uns in der Regel innerhalb eines Werktages – auf dem Weg, den
        Sie uns angeben.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Name"
            required
            autoComplete="name"
            placeholder="Vor- und Nachname"
            value={values.name}
            error={errors.name}
            onChange={(event) => update("name", event.target.value)}
          />
          <TextField
            label="E-Mail"
            type="email"
            required
            autoComplete="email"
            placeholder="name@beispiel.de"
            value={values.email}
            error={errors.email}
            onChange={(event) => update("email", event.target.value)}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Telefon"
            type="tel"
            autoComplete="tel"
            placeholder="Optional – für den Rückruf"
            hint="Optional"
            value={values.phone}
            onChange={(event) => update("phone", event.target.value)}
          />
          <SelectField
            label="Anliegen"
            options={topics}
            value={values.topic}
            onChange={(event) => update("topic", event.target.value)}
          />
        </div>

        <TextAreaField
          label="Ihre Nachricht"
          required
          placeholder="Schildern Sie kurz Ihre Situation – Pflegegrad, Wohnsituation, dringendste Frage."
          value={values.message}
          error={errors.message}
          onChange={(event) => update("message", event.target.value)}
        />

        <div className="flex flex-col gap-2">
          <label className="flex cursor-pointer items-start gap-3 text-sm text-foreground-muted">
            <input
              type="checkbox"
              checked={values.consent}
              onChange={(event) => update("consent", event.target.checked)}
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? consentErrorId : undefined}
              className="mt-0.5 size-4 shrink-0 rounded border-border accent-[var(--color-primary)] focus-ring"
            />
            <span>
              Ich bin einverstanden, dass meine Angaben zur Bearbeitung meiner
              Anfrage gespeichert werden. Die Einwilligung ist jederzeit
              widerrufbar. Details in der{" "}
              <Link
                href="/datenschutz"
                className="rounded-sm text-primary underline underline-offset-4 focus-ring"
              >
                Datenschutzerklärung
              </Link>
              .
            </span>
          </label>
          {errors.consent ? (
            <p id={consentErrorId} className="text-xs text-danger">
              {errors.consent}
            </p>
          ) : null}
        </div>

        <Button
          type="submit"
          size="lg"
          fullWidth
          isLoading={status === "sending"}
        >
          {status === "sending" ? "Wird gesendet …" : "Anfrage absenden"}
          {status === "sending" ? null : (
            <Send
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          )}
        </Button>
      </form>

      {/* Erfolgsmeldung: `polite`, damit Screenreader sie nach dem Absenden hören. */}
      <AnimatePresence>
        {status === "sent" ? (
          <m.div
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={transitions.base}
            className="mt-6 flex items-start gap-3 rounded-2xl bg-primary-soft p-4 text-sm text-primary"
          >
            <CheckCircle2
              className="mt-0.5 size-5 shrink-0"
              aria-hidden="true"
            />
            <span>
              Vielen Dank – Ihre Anfrage ist eingegangen. Wir melden uns
              innerhalb eines Werktages bei Ihnen.
            </span>
          </m.div>
        ) : null}
      </AnimatePresence>
    </Card>
  );
}

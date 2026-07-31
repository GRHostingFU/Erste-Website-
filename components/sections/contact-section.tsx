"use client";

import { ContactForm } from "@/components/sections/contact-form";
import { ContactInfo } from "@/components/sections/contact-info";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

/** Zweispaltiges Kontaktlayout: Formular links, Kontaktwege rechts. */
export function ContactSection() {
  return (
    <Section id="kontakt" spacing="lg">
      <Container size="wide">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          <ContactForm />
          <ContactInfo />
        </div>
      </Container>
    </Section>
  );
}

"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { Plus } from "lucide-react";
import { useId, useState } from "react";

import { Reveal } from "@/components/motion";
import { Container } from "@/components/ui/container";
import { Eyebrow, Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { faqCategories, faqs, type FaqCategory } from "@/lib/content/faq";
import {
  SPRING,
  staggerContainer,
  transitions,
  viewportOnce,
} from "@/lib/motion";
import { cn, slugify } from "@/utils";

type Filter = FaqCategory | "Alle";

const filters: readonly Filter[] = ["Alle", ...faqCategories] as const;

/**
 * Interaktives FAQ-Accordion mit Kategoriefilter.
 *
 * Bewusst als kontrollierte Komponente statt `<details>`: Nur so lässt sich
 * genau ein offenes Element erzwingen und die Höhe animieren. Die
 * Zugänglichkeit wird dabei von Hand hergestellt – `button` mit
 * `aria-expanded`/`aria-controls`, Panel als `region` mit `aria-labelledby`.
 */
export function FaqAccordion() {
  const baseId = useId();
  const prefersReducedMotion = useReducedMotion();

  const [filter, setFilter] = useState<Filter>("Alle");
  /** Index der offenen Frage – `null` heißt: alles zu. */
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const visible = faqs.filter(
    (faq) => filter === "Alle" || faq.category === filter,
  );

  function selectFilter(next: Filter) {
    setFilter(next);
    // Nach einem Filterwechsel wäre der gemerkte Index inhaltlich falsch.
    setOpenIndex(null);
  }

  return (
    <Section id="faq" spacing="lg">
      <Container size="content">
        <Reveal className="max-w-2xl">
          <Eyebrow>Häufige Fragen</Eyebrow>
          <Heading as="h2" size="md" className="mt-5">
            Antworten auf die Fragen, die uns täglich erreichen.
          </Heading>
        </Reveal>

        {/* Kategoriefilter. */}
        <Reveal delay={0.05} className="mt-10 flex flex-wrap gap-2" as="div">
          {filters.map((item) => {
            const isActive = item === filter;
            return (
              <button
                key={item}
                type="button"
                onClick={() => selectFilter(item)}
                aria-pressed={isActive}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm font-semibold focus-ring transition-colors duration-300",
                  isActive
                    ? "text-white"
                    : "text-foreground-muted hover:text-foreground",
                )}
              >
                {isActive ? (
                  <m.span
                    layoutId={`${baseId}-filter`}
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 rounded-full bg-linear-120 from-brand-500 to-brand-600 shadow-md"
                    transition={SPRING}
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 rounded-full border border-border bg-surface"
                  />
                )}
                {item}
              </button>
            );
          })}
        </Reveal>

        <m.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-10 space-y-4"
        >
          {visible.map((faq, index) => {
            const isOpen = openIndex === index;
            const slug = slugify(faq.question);
            const buttonId = `${baseId}-trigger-${slug}`;
            const panelId = `${baseId}-panel-${slug}`;

            return (
              <m.li
                key={faq.question}
                layout={prefersReducedMotion ? false : "position"}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0 },
                }}
                className={cn(
                  "overflow-hidden rounded-2xl border bg-surface shadow-xs",
                  "transition-[border-color,box-shadow] duration-500 ease-out-quint",
                  isOpen
                    ? "border-border-strong shadow-md"
                    : "border-border hover:border-border-strong",
                )}
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full cursor-pointer items-center justify-between gap-6 px-6 py-5 text-left font-semibold tracking-tight focus-ring"
                  >
                    {faq.question}
                    <Plus
                      aria-hidden="true"
                      className={cn(
                        "size-5 shrink-0 text-primary transition-transform duration-300 ease-out-quint",
                        isOpen && "rotate-45",
                      )}
                    />
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <m.div
                      key="panel"
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={
                        prefersReducedMotion
                          ? { height: "auto", opacity: 1 }
                          : { height: 0, opacity: 0 }
                      }
                      animate={{ height: "auto", opacity: 1 }}
                      exit={
                        prefersReducedMotion
                          ? { opacity: 0 }
                          : { height: 0, opacity: 0 }
                      }
                      transition={transitions.base}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-foreground-muted">
                        {faq.answer}
                      </p>
                    </m.div>
                  ) : null}
                </AnimatePresence>
              </m.li>
            );
          })}
        </m.ul>
      </Container>
    </Section>
  );
}

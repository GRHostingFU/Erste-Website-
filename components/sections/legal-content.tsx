import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import type { LegalSection } from "@/lib/content/legal";
import { cn } from "@/utils";

interface LegalContentProps {
  sections: readonly LegalSection[];
  /** Datum der letzten Aktualisierung, z. B. „Juli 2026“. */
  updatedAt: string;
}

/**
 * Darstellung einer Rechtstextseite.
 *
 * Server Component ohne jedes JavaScript: Rechtstexte müssen sofort lesbar,
 * durchsuchbar und druckbar sein – Animationen wären hier reine Behinderung.
 * Auf großen Viewports steht links ein mitlaufendes Inhaltsverzeichnis
 * (`position: sticky`), das über gewöhnliche Sprungmarken arbeitet.
 */
export function LegalContent({ sections, updatedAt }: LegalContentProps) {
  return (
    <Section spacing="lg">
      <Container size="wide">
        <div className="grid gap-12 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
          <nav
            aria-label="Inhaltsverzeichnis"
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <h2 className="text-xs font-semibold tracking-eyebrow text-foreground uppercase">
              Inhalt
            </h2>
            <ol className="mt-5 flex flex-col gap-2.5">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={cn(
                      "text-foreground-muted focus-ring hover:text-primary",
                      "rounded-md text-sm transition-colors",
                    )}
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="max-w-content">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-title`}
                className="scroll-mt-header border-border not-first:mt-12 not-first:border-t not-first:pt-12"
              >
                <h2
                  id={`${section.id}-title`}
                  className="font-display text-xl font-semibold text-balance text-foreground"
                >
                  {section.title}
                </h2>

                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="mt-4 leading-relaxed text-foreground-muted"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.details ? (
                  <dl className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-[10rem_minmax(0,1fr)]">
                    {section.details.map(({ term, description }) => (
                      <div key={term} className="contents">
                        <dt className="text-sm font-semibold text-foreground">
                          {term}
                        </dt>
                        <dd className="text-sm leading-relaxed text-foreground-muted">
                          {description}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : null}

                {section.list ? (
                  <ul className="mt-5 flex flex-col gap-2.5">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="relative pl-6 leading-relaxed text-foreground-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute top-2.5 left-0 size-1.5 rounded-full bg-primary"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <p className="mt-12 border-t border-border pt-8 text-sm text-foreground-subtle">
              Stand dieser Fassung: {updatedAt}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

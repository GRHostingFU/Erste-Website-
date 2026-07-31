import { Cta } from "@/components/sections/cta";
import { Faq } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { WhyUs } from "@/components/sections/why-us";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  path: "/",
  keywords: [
    "Pflegeberatung",
    "Pflegegrad",
    "Beratungseinsatz § 37.3",
    "Angehörige entlasten",
  ],
});

/**
 * Startseite.
 *
 * Die Seite selbst bleibt eine Server Component: Sie komponiert nur die
 * Sektionen in ihrer inhaltlichen Reihenfolge. Interaktivität und Motion
 * leben ausschließlich in den einzelnen Sektionen.
 *
 * Bewusst ohne Barrel-Import: Direkte Modulpfade halten die Client-Bundles je
 * Route klein, weil nicht der gesamte Sektionsordner mitgezogen wird.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <WhyUs />
      <Process />
      <Testimonials />
      <Faq />
      <Cta />
    </>
  );
}

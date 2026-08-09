import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { notFound } from "next/navigation";
import SystemExplorer from "@/components/portfolio/SystemExplorer";
import { COMPARISON_ROWS, CONCEPTS, getConcept } from "@/lib/concepts";

export function generateStaticParams() {
  return CONCEPTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const concept = getConcept((await params).slug);
  if (!concept) return {};
  return {
    title: `${concept.name} concept study`,
    description: concept.description,
  };
}

export default async function ConceptPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const concept = getConcept((await params).slug);
  if (!concept) notFound();

  return (
    <div className="bg-ia-cream text-ia-ink">
      <header className="px-5 pb-14 pt-32 sm:px-8 md:px-12 md:pb-20 md:pt-40 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-[1540px]">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-ia-ink/55"
          >
            <ArrowLeft size={14} /> All concepts
          </Link>
          <div className="mt-10 grid gap-8 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ia-ink/45">
                Concept {concept.number} · {concept.use}
              </p>
              <h1 className="mt-5 font-display text-[clamp(4.5rem,11vw,11rem)] font-normal uppercase leading-[0.78] tracking-[-0.06em]">
                {concept.name}
              </h1>
            </div>
            <p className="max-w-xl font-editorial text-[clamp(1.6rem,3vw,3rem)] leading-[1.02] lg:justify-self-end">
              {concept.premise}
            </p>
          </div>
        </div>
      </header>

      <section className="px-0 pb-24 md:px-12 md:pb-36 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-[1540px]">
          <SystemExplorer concept={concept} />
          <p className="px-5 pt-4 text-xs text-ia-ink/52 md:px-0">
            Tap a numbered system to see its purpose, cost effect, maintenance
            and professional boundary.
          </p>
        </div>
      </section>

      <section className="bg-ia-paper px-5 py-24 sm:px-8 md:px-12 md:py-32 lg:px-16 xl:px-24">
        <div className="mx-auto grid max-w-[1540px] gap-14 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ia-ink/50">
              What this tests
            </p>
            <dl className="mt-7 divide-y divide-ia-line border-y border-ia-line text-sm">
              <div className="py-4">
                <dt className="text-xs text-ia-ink/45">Scale</dt>
                <dd className="mt-1">{concept.scale}</dd>
              </div>
              <div className="py-4">
                <dt className="text-xs text-ia-ink/45">Shelter path</dt>
                <dd className="mt-1">{concept.shelter}</dd>
              </div>
              <div className="py-4">
                <dt className="text-xs text-ia-ink/45">Investment basis</dt>
                <dd className="mt-1">{concept.investment}</dd>
              </div>
              <div className="py-4">
                <dt className="text-xs text-ia-ink/45">Grid target</dt>
                <dd className="mt-1">{concept.gridTarget}</dd>
              </div>
            </dl>
          </div>
          <div>
            <h2 className="max-w-[13ch] font-editorial text-[clamp(2.8rem,5.5vw,6rem)] leading-[0.94]">
              A system map before a purchase list.
            </h2>
            <p className="mt-7 max-w-2xl text-sm leading-relaxed text-ia-ink/68">
              {concept.description} Each technology remains an option until the
              site, occupancy, local rules, qualified professionals and supplier
              evidence make it appropriate.
            </p>
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {concept.hotspots.map((item) => (
                <p
                  key={item.id}
                  className="flex items-start gap-3 border-t border-ia-line pt-4 text-sm"
                >
                  <Check size={16} className="mt-0.5 shrink-0" />
                  {item.label}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ia-cream px-5 py-24 sm:px-8 md:px-12 md:py-36 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-[1540px]">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ia-ink/50">
            Same property question · different dependency
          </p>
          <h2 className="mt-5 max-w-[13ch] font-display text-[clamp(3.2rem,7vw,7rem)] font-normal uppercase leading-[0.84] tracking-[-0.05em]">
            Conventional versus integrated.
          </h2>
          <div className="mt-12 overflow-x-auto border-t border-ia-line">
            <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-ia-line text-[0.62rem] uppercase tracking-[0.15em] text-ia-ink/45">
                  <th className="py-4 pr-5">Measure</th>
                  <th className="px-5 py-4">Grid-dependent path</th>
                  <th className="py-4 pl-5">Integrated concept</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map(([measure, conventional, integrated]) => (
                  <tr
                    key={measure}
                    className="border-b border-ia-line align-top"
                  >
                    <th className="py-5 pr-5 font-editorial text-2xl font-normal">
                      {measure}
                    </th>
                    <td className="px-5 py-5 text-ia-ink/55">{conventional}</td>
                    <td className="py-5 pl-5 text-ia-ink/82">{integrated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 max-w-3xl text-xs leading-relaxed text-ia-ink/50">
            No generic percentage saving is claimed. The Opportunity Scan
            replaces these scenarios with property inputs; later phases add
            verified quotes and modeled operating assumptions.
          </p>
        </div>
      </section>

      <section className="bg-ia-earth px-5 py-24 text-ia-paper sm:px-8 md:px-12 md:py-36 lg:px-16 xl:px-24">
        <div className="mx-auto grid max-w-[1540px] gap-10 lg:grid-cols-[.7fr_1.3fr]">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ia-paper/55">
            Foodscaping · syntropic inspiration
          </p>
          <div>
            <h2 className="max-w-[13ch] font-editorial text-[clamp(3rem,6vw,6.5rem)] leading-[0.92]">
              Don’t landscape around the house. Grow the property into a living
              system.
            </h2>
            <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ia-paper/72">
              Inspired by Ernst Götsch’s syntropic agriculture, the concept
              organizes planting through ecological succession and vertical
              layers: fast support species, longer-lived fruit trees, shrubs,
              herbs, roots, climbers and groundcover. Pruning returns biomass to
              covered soil. It is a managed productive landscape—not a promise
              of automatic food or water independence.
            </p>
            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              {[
                "Succession across time",
                "Layers across light",
                "Continuous soil cover",
                "Pruning + biomass cycling",
                "Food, shade + habitat",
                "Paths + guest experience",
              ].map((item) => (
                <p
                  key={item}
                  className="border-t border-white/25 pt-4 font-editorial text-2xl"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ia-paper px-5 py-24 sm:px-8 md:px-12 md:py-36 lg:px-16 xl:px-24">
        <div className="mx-auto grid max-w-[1540px] gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <h2 className="max-w-[12ch] font-editorial text-[clamp(3rem,6vw,7rem)] leading-[0.92]">
            Turn the concept question into a property decision.
          </h2>
          <div className="lg:justify-self-end">
            <p className="max-w-lg text-sm leading-relaxed text-ia-ink/65">
              Start with land control, intended use, investment range and
              timing. The first paid step is a bounded Opportunity Scan.
            </p>
            <Link
              href="/#request-scan"
              className="mt-7 inline-flex min-h-12 items-center gap-3 bg-ia-ink px-6 py-3 text-sm font-semibold text-ia-paper"
            >
              Request a Site-to-Stay Scan <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

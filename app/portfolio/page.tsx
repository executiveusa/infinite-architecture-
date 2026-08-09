import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { COMPARISON_ROWS, CONCEPTS } from "@/lib/concepts";

export const metadata: Metadata = {
  title: "Off-grid property concept portfolio",
  description:
    "Explore three clearly labeled concept studies for phased, resilient hospitality properties near Puerto Vallarta.",
};

export default function PortfolioPage() {
  return (
    <div className="bg-ia-cream text-ia-ink">
      <header className="px-5 pb-20 pt-36 sm:px-8 md:px-12 md:pb-28 md:pt-44 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-[1540px]">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ia-ink/50">
            Portfolio · concept studies
          </p>
          <h1 className="mt-6 max-w-[13ch] text-balance font-display text-[clamp(3.7rem,9vw,9.5rem)] font-normal uppercase leading-[0.82] tracking-[-0.055em]">
            Three ways land can become more self-sufficient.
          </h1>
          <div className="mt-10 grid gap-6 border-t border-ia-line pt-7 md:grid-cols-[1.25fr_.75fr] md:items-end">
            <p className="max-w-3xl font-editorial text-[clamp(1.45rem,2.7vw,2.7rem)] leading-[1.08]">
              Concepts for owners who want the stay, shelter, water, energy and
              foodscape planned as one property system.
            </p>
            <p className="max-w-md text-sm leading-relaxed text-ia-ink/65 md:justify-self-end">
              These are AI-generated design studies—not built projects,
              engineering, quotes or performance guarantees. They show what the
              Opportunity Scan can clarify.
            </p>
          </div>
        </div>
      </header>

      <section
        className="px-5 pb-24 sm:px-8 md:px-12 md:pb-36 lg:px-16 xl:px-24"
        aria-labelledby="concepts-title"
      >
        <h2 id="concepts-title" className="sr-only">
          Concept studies
        </h2>
        <div className="mx-auto max-w-[1540px] space-y-16 md:space-y-24">
          {CONCEPTS.map((concept) => (
            <article
              key={concept.slug}
              className="grid gap-6 lg:grid-cols-[1.35fr_.65fr] lg:items-end"
            >
              <Link
                href={`/portfolio/${concept.slug}`}
                className="group relative block aspect-[3/2] overflow-hidden bg-ia-cave"
              >
                <Image
                  src={concept.image}
                  alt={concept.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 68vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
                <p className="absolute bottom-4 left-4 bg-black/60 px-3 py-2 text-[0.6rem] uppercase tracking-[0.15em] text-white/85">
                  AI-generated concept study
                </p>
              </Link>
              <div className="border-t border-ia-line pt-6">
                <p className="text-xs font-semibold tracking-[0.16em] text-ia-ink/45">
                  {concept.number} · {concept.scale}
                </p>
                <h2 className="mt-4 font-editorial text-[clamp(3rem,5vw,6rem)] leading-[0.88]">
                  {concept.name}
                </h2>
                <p className="mt-5 max-w-lg text-sm leading-relaxed text-ia-ink/68">
                  {concept.description}
                </p>
                <dl className="mt-7 divide-y divide-ia-line border-y border-ia-line text-xs">
                  <div className="flex justify-between gap-5 py-3">
                    <dt className="text-ia-ink/45">Investment basis</dt>
                    <dd className="text-right font-medium">
                      {concept.investment}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-5 py-3">
                    <dt className="text-ia-ink/45">Grid target</dt>
                    <dd className="text-right font-medium">
                      {concept.gridTarget}
                    </dd>
                  </div>
                </dl>
                <Link
                  href={`/portfolio/${concept.slug}`}
                  className="group mt-7 inline-flex items-center gap-3 border-b border-ia-ink pb-1 text-sm font-semibold"
                >
                  Explore the system{" "}
                  <ArrowUpRight
                    size={17}
                    className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-ia-leaf px-5 py-24 text-ia-paper sm:px-8 md:px-12 md:py-36 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-[1540px]">
          <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ia-paper/55">
              The comparison
            </p>
            <div>
              <h2 className="max-w-[13ch] font-display text-[clamp(3.3rem,7vw,7.5rem)] font-normal uppercase leading-[0.84] tracking-[-0.05em]">
                Grid-dependent versus integrated.
              </h2>
              <p className="mt-7 max-w-2xl text-sm leading-relaxed text-ia-paper/70">
                Integrated systems can cost more upfront. The test is whether
                they reduce recurring dependence, improve resilience and lower
                total ownership cost under transparent assumptions.
              </p>
            </div>
          </div>
          <div className="mt-14 overflow-x-auto border-t border-white/25">
            <table className="w-full min-w-[48rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/25 text-[0.62rem] uppercase tracking-[0.15em] text-ia-paper/55">
                  <th className="py-4 pr-5">Measure</th>
                  <th className="px-5 py-4">Conventional path</th>
                  <th className="py-4 pl-5">Integrated path</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map(([measure, conventional, integrated]) => (
                  <tr
                    key={measure}
                    className="border-b border-white/15 align-top"
                  >
                    <th className="py-5 pr-5 font-editorial text-2xl font-normal">
                      {measure}
                    </th>
                    <td className="px-5 py-5 text-ia-paper/60">
                      {conventional}
                    </td>
                    <td className="py-5 pl-5 text-ia-paper/88">{integrated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-5 text-xs leading-relaxed text-ia-paper/50">
            Cost and performance values remain scenario assumptions until
            verified by site data, qualified design and current supplier quotes.
          </p>
        </div>
      </section>

      <section className="bg-ia-paper px-5 py-24 sm:px-8 md:px-12 md:py-36 lg:px-16 xl:px-24">
        <div className="mx-auto grid max-w-[1540px] gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <h2 className="max-w-[12ch] font-editorial text-[clamp(3rem,6vw,7rem)] leading-[0.92]">
            Which system fits your land—not a generic lot?
          </h2>
          <div className="lg:justify-self-end">
            <p className="max-w-lg text-sm leading-relaxed text-ia-ink/65">
              The Site-to-Stay Scan tests the property, operating goal, climate
              assumptions, major risks and next decision before a full concept.
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

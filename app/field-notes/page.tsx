import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BatteryCharging,
  Droplets,
  Sprout,
  Warehouse,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Field Notes — energy, water, food and shelter",
  description:
    "Plain-language research for reducing property dependence through better energy, water, foodscape and shelter decisions.",
};

const PILLARS = [
  {
    title: "Energy independence",
    icon: BatteryCharging,
    body: "Solar sizing, batteries, passive comfort, backup planning and honest payback assumptions.",
    articles: [
      "What ‘off-grid’ actually means—and what it does not",
      "Solar without the sales pitch: panels, batteries and backup",
      "The real ten-year cost of depending on the grid",
    ],
  },
  {
    title: "Water independence",
    icon: Droplets,
    body: "Rain capture, storage, filtration, greywater, dry-season planning and the maintenance people forget.",
    articles: [
      "Can a Vallarta property produce its own water?",
      "The tank is not the water system",
      "Why self-sufficient does not mean having no backup",
    ],
  },
  {
    title: "Food independence",
    icon: Sprout,
    body: "Foodscaping, syntropic succession, tropical planting, biomass and realistic production expectations.",
    articles: [
      "From decorative landscaping to a productive foodscape",
      "How syntropic succession can shape a hospitality property",
      "Food independence is a spectrum, not a slogan",
    ],
  },
  {
    title: "Shelter + construction",
    icon: Warehouse,
    body: "Traditional masonry compared with lightweight, panelized, curved, modular and hybrid systems.",
    articles: [
      "Traditional construction versus an integrated property system",
      "The real cost of a glamping dome is not the dome",
      "Build the shade before you buy more air conditioning",
    ],
  },
];

const FIELD_RECORDS = [
  {
    label: "FIELD TEST",
    title: "First panel test: foam-core cement with AR mesh",
    body: "An early material test with strong mesh adhesion and a clear lesson: edges and cure discipline matter as much as the center panel.",
  },
  {
    label: "SOURCING NOTE",
    title: "AR fiberglass mesh is not standard fiberglass cloth",
    body: "Cementitious assemblies require verified alkali resistance. Supplier claims, stock and technical sheets must be checked before specification.",
  },
  {
    label: "RESEARCH COMPILATION",
    title: "Ferrocement barrel roofs: what requires engineering",
    body: "Curved shells can be material-efficient, but spans, reinforcement, mortar penetration, openings and foundations remain qualified design decisions.",
  },
];

export default function FieldNotesPage() {
  return (
    <div className="min-h-screen bg-ia-cream text-ia-ink">
      <header className="px-5 pb-20 pt-36 sm:px-8 md:px-12 md:pb-28 md:pt-44 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-[1540px]">
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ia-ink/50">
            Field Notes · research before purchase
          </p>
          <h1 className="mt-6 max-w-[13ch] font-display text-[clamp(4rem,10vw,10rem)] font-normal uppercase leading-[0.8] tracking-[-0.055em]">
            Depend less. Understand more.
          </h1>
          <div className="mt-10 grid gap-7 border-t border-ia-line pt-7 md:grid-cols-[1.25fr_.75fr] md:items-end">
            <p className="max-w-3xl font-editorial text-[clamp(1.5rem,2.8vw,2.8rem)] leading-[1.06]">
              Energy, water, food and shelter explained as connected property
              decisions—not isolated products.
            </p>
            <p className="max-w-md text-sm leading-relaxed text-ia-ink/62 md:justify-self-end">
              Every claim should reveal its source and confidence. Concept
              scenarios are not engineering, quotes or guarantees.
            </p>
          </div>
        </div>
      </header>

      <section className="px-5 pb-24 sm:px-8 md:px-12 md:pb-36 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-[1540px] border-t border-ia-line">
          {PILLARS.map(({ title, icon: Icon, body, articles }, index) => (
            <article
              key={title}
              className="grid gap-8 border-b border-ia-line py-10 lg:grid-cols-[.12fr_.58fr_1.3fr] lg:py-14"
            >
              <p className="text-xs tracking-[0.16em] text-ia-ink/40">
                {String(index + 1).padStart(2, "0")}
              </p>
              <div>
                <Icon size={22} strokeWidth={1.4} />
                <h2 className="mt-5 max-w-[10ch] font-editorial text-[clamp(2.4rem,4.5vw,4.8rem)] leading-[0.92]">
                  {title}
                </h2>
                <p className="mt-5 max-w-md text-sm leading-relaxed text-ia-ink/62">
                  {body}
                </p>
              </div>
              <div className="border-t border-ia-line">
                {articles.map((article) => (
                  <div
                    key={article}
                    className="flex items-center justify-between gap-5 border-b border-ia-line py-5"
                  >
                    <p className="font-editorial text-[clamp(1.5rem,2.5vw,2.6rem)] leading-[1.02]">
                      {article}
                    </p>
                    <span className="shrink-0 text-[0.6rem] uppercase tracking-[0.14em] text-ia-ink/40">
                      In development
                    </span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-ia-leaf px-5 py-24 text-ia-paper sm:px-8 md:px-12 md:py-36 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-[1540px]">
          <div className="grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ia-paper/55">
              Existing field records
            </p>
            <h2 className="max-w-[13ch] font-display text-[clamp(3.3rem,7vw,7.3rem)] font-normal uppercase leading-[0.84] tracking-[-0.05em]">
              Tests, sourcing and failures stay visible.
            </h2>
          </div>
          <div className="mt-14 border-t border-white/25">
            {FIELD_RECORDS.map((record) => (
              <article
                key={record.title}
                className="grid gap-4 border-b border-white/20 py-7 md:grid-cols-[.45fr_.75fr_1.3fr]"
              >
                <p className="text-[0.62rem] font-semibold tracking-[0.16em] text-ia-paper/45">
                  {record.label}
                </p>
                <h3 className="font-editorial text-3xl leading-[1.02]">
                  {record.title}
                </h3>
                <p className="max-w-xl text-sm leading-relaxed text-ia-paper/65">
                  {record.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ia-paper px-5 py-24 sm:px-8 md:px-12 md:py-32 lg:px-16 xl:px-24">
        <div className="mx-auto grid max-w-[1540px] gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <h2 className="max-w-[12ch] font-editorial text-[clamp(3rem,6vw,7rem)] leading-[0.92]">
            See those decisions placed on a property.
          </h2>
          <div className="lg:justify-self-end">
            <p className="max-w-lg text-sm leading-relaxed text-ia-ink/65">
              The concept portfolio turns the four research pillars into
              visible, tappable property systems.
            </p>
            <Link
              href="/portfolio"
              className="mt-7 inline-flex min-h-12 items-center gap-3 bg-ia-ink px-6 py-3 text-sm font-semibold text-ia-paper"
            >
              Explore concept properties <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

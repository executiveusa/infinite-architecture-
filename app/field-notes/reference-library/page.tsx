import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BatteryCharging, Droplets, Sprout, Warehouse } from "lucide-react";

export const metadata: Metadata = {
  title: "Reference Library - food, water, energy, shelter",
  description:
    "The Infinite Architecture reference library: reader-facing books on food, water, energy and shelter, grouped by category.",
};

const CATEGORIES = [
  {
    title: "Food",
    icon: Sprout,
    body: "Growing, storing and planning food for a property that depends less on outside supply.",
  },
  {
    title: "Water",
    icon: Droplets,
    body: "Capture, storage, filtration and dry-season planning for real lots and real budgets.",
  },
  {
    title: "Energy",
    icon: BatteryCharging,
    body: "Solar sizing, batteries, backup planning and honest payback assumptions.",
  },
  {
    title: "Shelter",
    icon: Warehouse,
    body: "Low-cost building systems, panels, coatings and the assemblies that hold them together.",
  },
];

export default function ReferenceLibraryPage() {
  return (
    <main className="min-h-screen bg-ia-cream text-ia-ink">
      <header className="px-5 pb-14 pt-32 sm:px-8 md:px-12 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-[1540px]">
          <Link
            href="/field-notes"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-ia-ink/55"
          >
            <ArrowLeft size={14} /> Field Notes
          </Link>
          <p className="mt-12 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ia-ink/50">
            Reference library
          </p>
          <h1 className="mt-5 max-w-[12ch] font-display text-[clamp(3.4rem,8vw,8rem)] uppercase leading-[0.85] tracking-[-0.05em]">
            Read further, by category.
          </h1>
          <p className="mt-8 max-w-2xl font-editorial text-[clamp(1.3rem,2.4vw,2.3rem)] leading-[1.08]">
            Books and references on food, water, energy and shelter, grouped so
            any reader can find the next thing worth reading.
          </p>
        </div>
      </header>

      <section className="px-5 pb-24 sm:px-8 md:px-12 lg:px-16 xl:px-24">
        <div className="mx-auto grid max-w-[1540px] gap-6 md:grid-cols-2">
          {CATEGORIES.map(({ title, icon: Icon, body }) => (
            <div key={title} className="border border-ia-line p-8">
              <Icon size={22} className="text-ia-ink/60" />
              <h2 className="mt-5 font-editorial text-3xl">{title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-ia-ink/62">{body}</p>
              <p className="mt-6 border-t border-ia-line pt-4 text-xs uppercase tracking-[0.14em] text-ia-ink/45">
                Books being catalogued - links land here as each title is verified
              </p>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-[1540px] text-sm leading-relaxed text-ia-ink/55">
          The library is assembled from the project&apos;s own reference books.
          Entries appear only after each link is checked against the actual
          document, so categories may sit short while cataloguing catches up.
        </p>
      </section>
    </main>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Info, X } from "lucide-react";
import type { Concept, Hotspot } from "@/lib/concepts";

export default function SystemExplorer({ concept }: { concept: Concept }) {
  const [selected, setSelected] = useState<Hotspot | null>(null);

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selected]);

  return (
    <div className="relative overflow-hidden bg-ia-cave">
      <div className="relative aspect-[3/2] w-full">
        <Image
          src={concept.image}
          alt={concept.alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 85vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
        {concept.hotspots.map((hotspot, index) => (
          <button
            key={hotspot.id}
            type="button"
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
            className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
            onClick={() => setSelected(hotspot)}
            aria-label={`Explain ${hotspot.label}`}
            aria-pressed={selected?.id === hotspot.id}
          >
            <span
              className="absolute inset-[-0.35rem] rounded-full border border-white/45 bg-black/10"
              aria-hidden="true"
            />
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-ia-paper text-xs font-semibold text-ia-ink shadow-lg transition-transform group-hover:scale-110 group-focus-visible:scale-110">
              {String(index + 1).padStart(2, "0")}
            </span>
          </button>
        ))}
        <p className="absolute bottom-4 left-4 z-10 bg-black/65 px-3 py-2 text-[0.62rem] uppercase tracking-[0.16em] text-white/85 backdrop-blur-sm">
          AI-generated concept study · not a built project
        </p>
      </div>

      {selected ? (
        <div
          className="fixed inset-0 z-[80] bg-black/45 lg:absolute lg:bg-transparent"
          role="presentation"
          onMouseDown={() => setSelected(null)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="system-panel-title"
            className="absolute inset-x-0 bottom-0 max-h-[82dvh] overflow-y-auto bg-ia-paper p-6 text-ia-ink shadow-2xl lg:inset-y-0 lg:left-auto lg:right-0 lg:max-h-none lg:w-[27rem] lg:p-8"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center"
              aria-label="Close system explanation"
            >
              <X size={20} />
            </button>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-ia-ink/45">
              System{" "}
              {String(
                concept.hotspots.findIndex((item) => item.id === selected.id) +
                  1,
              ).padStart(2, "0")}
            </p>
            <h2
              id="system-panel-title"
              className="mt-4 max-w-[12ch] font-editorial text-5xl leading-[0.92]"
            >
              {selected.label}
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-ia-ink/70">
              {selected.summary}
            </p>
            <dl className="mt-8 divide-y divide-ia-line border-y border-ia-line text-sm">
              {[
                ["Grid dependence", selected.independence],
                ["Cost effect", selected.cost],
                ["Maintenance", selected.maintenance],
                ["Professional boundary", selected.professional],
              ].map(([term, detail]) => (
                <div key={term} className="py-4">
                  <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-ia-ink/45">
                    {term}
                  </dt>
                  <dd className="mt-2 leading-relaxed text-ia-ink/72">
                    {detail}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 inline-flex items-center gap-2 text-xs font-medium">
              <Info size={14} /> Evidence status: {selected.status}
            </p>
          </section>
        </div>
      ) : null}
    </div>
  );
}

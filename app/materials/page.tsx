import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle, ArrowRight } from 'lucide-react'
import { getMaterials } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Materials',
  description: 'Complete material registry for foam, ferrocement, and thin-shell construction in Puerto Vallarta.',
}

const CATEGORY_LABELS: Record<string, string> = {
  foam: 'FOAM',
  reinforcement: 'REINFORCEMENT',
  binder: 'BINDER',
  aggregate: 'AGGREGATE',
  admixture: 'ADMIXTURE',
  adhesive: 'ADHESIVE',
  sealant: 'SEALANT',
  other: 'OTHER',
}

export default async function MaterialsPage() {
  const materials = await getMaterials()

  const byCategory = materials.reduce<Record<string, typeof materials>>((acc, m) => {
    const cat = m.category
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(m)
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-bg-base pt-32 pb-24">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="border-b border-ia-border pb-16 mb-16">
          <span className="label-text text-ia-blue block mb-4">MATERIAL REGISTRY</span>
          <h1 className="text-display-lg font-black text-ia-text mb-6">
            Puerto Vallarta<br />material library.
          </h1>
          <p className="text-lg text-ia-secondary max-w-2xl leading-relaxed">
            {materials.length} materials documented with local names, supplier notes,
            price observations, and hazard information.
          </p>
        </div>

        {/* Grouped by category */}
        {Object.entries(byCategory).map(([cat, mats]) => (
          <div key={cat} className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <span className="label-text text-ia-blue">{CATEGORY_LABELS[cat] ?? cat.toUpperCase()}</span>
              <div className="flex-1 h-px bg-ia-border" />
              <span className="label-text text-ia-muted">{mats.length} MATERIAL{mats.length > 1 ? 'S' : ''}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ia-border">
              {mats.map((material) => (
                <Link
                  key={material.id}
                  href={`/materials/${material.id}`}
                  className="bg-bg-base p-8 flex flex-col gap-4 group hover:bg-bg-surface transition-colors duration-200"
                >
                  {/* Name */}
                  <div>
                    <h2 className="text-lg font-bold text-ia-text group-hover:text-ia-blue transition-colors">
                      {material.name}
                    </h2>
                    <p className="text-sm text-ia-muted italic mt-1">{material.spanish_name}</p>
                  </div>

                  {/* Local names */}
                  {material.local_names.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {material.local_names.slice(0, 3).map((n) => (
                        <span key={n} className="label-text text-ia-muted border border-ia-border px-1.5 py-0.5">
                          {n}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Best uses preview */}
                  <p className="text-xs text-ia-secondary leading-relaxed">
                    {material.best_uses[0]}
                  </p>

                  {/* Risks indicator */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-ia-border-subtle">
                    {material.risks.length > 0 ? (
                      <div className="flex items-center gap-1.5">
                        <AlertTriangle size={12} className="text-ia-orange" />
                        <span className="label-text text-ia-orange">{material.risks.length} RISK{material.risks.length > 1 ? 'S' : ''}</span>
                      </div>
                    ) : (
                      <span className="label-text text-ia-sage">LOW HAZARD</span>
                    )}
                    <span className="label-text text-ia-muted group-hover:text-ia-blue transition-colors flex items-center gap-1">
                      VIEW <ArrowRight size={10} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

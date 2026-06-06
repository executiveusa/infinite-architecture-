import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, AlertTriangle, CheckCircle } from 'lucide-react'
import { getMaterials, getMaterial } from '@/lib/data'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const materials = await getMaterials()
  return materials.map((m) => ({ id: m.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const material = await getMaterial(id)
  if (!material) return {}
  return { title: material.name }
}

export default async function MaterialDetailPage({ params }: Props) {
  const { id } = await params
  const material = await getMaterial(id)
  if (!material) notFound()

  return (
    <div className="min-h-screen bg-bg-base pt-32 pb-24">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16">
        <Link
          href="/materials"
          className="inline-flex items-center gap-2 label-text text-ia-muted hover:text-ia-text transition-colors mb-12"
        >
          <ArrowLeft size={14} /> MATERIALS
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main */}
          <div className="lg:col-span-2">
            <span className="label-text text-ia-blue block mb-4">
              {material.category.toUpperCase()}
            </span>
            <h1 className="text-display-md font-black text-ia-text mb-2">{material.name}</h1>
            <p className="text-xl text-ia-muted italic mb-12">{material.spanish_name}</p>

            {/* Local names */}
            {material.local_names.length > 0 && (
              <div className="mb-10">
                <h2 className="text-sm font-bold text-ia-text mb-4 pb-3 border-b border-ia-border">
                  LOCAL NAMES (MEXICO)
                </h2>
                <div className="flex flex-wrap gap-2">
                  {material.local_names.map(n => (
                    <span key={n} className="label-text text-ia-secondary border border-ia-border px-3 py-1">
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Best uses */}
            <div className="mb-10">
              <h2 className="text-sm font-bold text-ia-text mb-4 pb-3 border-b border-ia-border">
                BEST USES
              </h2>
              <ul className="space-y-3">
                {material.best_uses.map(u => (
                  <li key={u} className="flex items-start gap-3 text-sm text-ia-secondary">
                    <CheckCircle size={14} className="text-ia-sage mt-0.5 flex-shrink-0" />
                    {u}
                  </li>
                ))}
              </ul>
            </div>

            {/* Avoid for */}
            {material.avoid_for.length > 0 && (
              <div className="mb-10">
                <h2 className="text-sm font-bold text-ia-text mb-4 pb-3 border-b border-ia-border">
                  AVOID FOR
                </h2>
                <ul className="space-y-3">
                  {material.avoid_for.map(a => (
                    <li key={a} className="flex items-start gap-3 text-sm text-ia-secondary">
                      <AlertTriangle size={14} className="text-ia-orange mt-0.5 flex-shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Risks */}
            {material.risks.length > 0 && (
              <div className="mb-10">
                <h2 className="text-sm font-bold text-ia-text mb-4 pb-3 border-b border-ia-border">
                  RISKS & HAZARDS
                </h2>
                <ul className="space-y-3">
                  {material.risks.map(r => (
                    <li key={r} className="flex items-start gap-3 text-sm text-ia-secondary border-l-2 border-ia-orange pl-4">
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Common sizes */}
            {material.common_sizes.length > 0 && (
              <div className="bg-bg-surface border border-ia-border p-6">
                <p className="label-text text-ia-muted mb-4">COMMON SIZES</p>
                <ul className="space-y-2">
                  {material.common_sizes.map(s => (
                    <li key={s} className="text-xs text-ia-secondary font-mono">{s}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Price */}
            {material.price_observations.length > 0 && (
              <div className="bg-bg-surface border border-ia-border p-6">
                <p className="label-text text-ia-muted mb-4">PRICE OBSERVATIONS</p>
                <ul className="space-y-2">
                  {material.price_observations.map(p => (
                    <li key={p} className="text-xs text-ia-gold">{p}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Supplier */}
            {material.supplier_notes.length > 0 && (
              <div className="bg-bg-surface border border-ia-border p-6">
                <p className="label-text text-ia-muted mb-4">SUPPLIERS (PV)</p>
                <ul className="space-y-2">
                  {material.supplier_notes.map(n => (
                    <li key={n} className="text-xs text-ia-secondary leading-relaxed">{n}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Substitutes */}
            {material.substitutes.length > 0 && (
              <div className="bg-bg-surface border border-ia-border p-6">
                <p className="label-text text-ia-muted mb-4">SUBSTITUTES</p>
                <ul className="space-y-2">
                  {material.substitutes.map(s => (
                    <li key={s}>
                      <Link
                        href={`/materials/${s}`}
                        className="text-xs text-ia-secondary hover:text-ia-text transition-colors font-mono"
                      >
                        → {s}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, AlertTriangle, CheckCircle, Circle } from 'lucide-react'
import { getBuildSystems, getBuildSystem } from '@/lib/data'
import { DIFFICULTY_COLORS, TEST_STATUS_LABELS } from '@/lib/types'
import { formatMXN, cn } from '@/lib/utils'

interface Props {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const systems = await getBuildSystems()
  return systems.map((s) => ({ id: s.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const system = await getBuildSystem(id)
  if (!system) return {}
  return { title: system.title, description: system.summary }
}

export default async function BuildSystemDetailPage({ params }: Props) {
  const { id } = await params
  const system = await getBuildSystem(id)
  if (!system) notFound()

  const isHighRisk = system.safety_notes.some((n) =>
    n.includes('⚠️') || n.toLowerCase().includes('engineering')
  )

  return (
    <div className="min-h-screen bg-bg-base pt-32 pb-24">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Back */}
        <Link
          href="/build-systems"
          className="inline-flex items-center gap-2 label-text text-ia-muted hover:text-ia-text transition-colors mb-12"
        >
          <ArrowLeft size={14} /> BUILD SYSTEMS
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-12">
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="label-text text-ia-muted border border-ia-border px-2 py-1">
                  {system.category.toUpperCase().replace(/-/g, ' ')}
                </span>
                <span className={cn('label-text border px-2 py-1', DIFFICULTY_COLORS[system.difficulty])}>
                  {system.difficulty.toUpperCase()}
                </span>
                <span className="label-text text-ia-sage border border-ia-sage px-2 py-1">
                  {TEST_STATUS_LABELS[system.test_status]}
                </span>
              </div>

              <h1 className="text-display-md font-black text-ia-text mb-4">{system.title}</h1>
              <p className="text-lg text-ia-secondary leading-relaxed">{system.summary}</p>
            </div>

            {/* Safety note (high risk) */}
            {isHighRisk && (
              <div className="border border-ia-orange bg-ia-rust bg-opacity-10 p-6 mb-10">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={16} className="text-ia-orange mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="label-text text-ia-orange mb-2">ENGINEERING REVIEW REQUIRED</p>
                    {system.safety_notes.map((note) => (
                      <p key={note} className="text-sm text-ia-secondary leading-relaxed mb-2">
                        {note}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Steps */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-ia-text mb-6 pb-4 border-b border-ia-border">
                Construction Steps
              </h2>
              <ol className="space-y-4">
                {system.steps.map((step, i) => (
                  <li key={i} className="flex gap-4 text-sm text-ia-secondary leading-relaxed">
                    <span className="label-text text-ia-muted w-6 flex-shrink-0">{String(i + 1).padStart(2, '0')}</span>
                    <span>{step.replace(/^\d+\.\s*/, '')}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Mixes */}
            {system.mixes.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xl font-bold text-ia-text mb-6 pb-4 border-b border-ia-border">
                  Mix Ratios
                </h2>
                <div className="space-y-4">
                  {system.mixes.map((mix) => (
                    <div key={mix.name} className="bg-bg-surface border border-ia-border p-6">
                      <p className="label-text text-ia-gold mb-2">{mix.name.toUpperCase()}</p>
                      <p className="text-sm text-ia-text font-mono mb-1">{mix.ratio}</p>
                      {mix.admixture && (
                        <p className="text-xs text-ia-muted mt-2">{mix.admixture}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Risks */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-ia-text mb-6 pb-4 border-b border-ia-border">
                Risks & Warnings
              </h2>
              <ul className="space-y-3">
                {system.risks.map((risk) => (
                  <li key={risk} className="flex items-start gap-3 text-sm text-ia-secondary">
                    <AlertTriangle size={14} className="text-ia-orange mt-0.5 flex-shrink-0" />
                    {risk}
                  </li>
                ))}
              </ul>
            </div>

            {/* Local substitutions */}
            {system.local_substitutions.length > 0 && (
              <div className="mb-12">
                <h2 className="text-xl font-bold text-ia-text mb-6 pb-4 border-b border-ia-border">
                  Local Substitutions
                </h2>
                <ul className="space-y-3">
                  {system.local_substitutions.map((sub) => (
                    <li key={sub} className="flex items-start gap-3 text-sm text-ia-secondary">
                      <CheckCircle size={14} className="text-ia-sage mt-0.5 flex-shrink-0" />
                      {sub}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Quick stats */}
            <div className="bg-bg-surface border border-ia-border p-6 space-y-4">
              <p className="label-text text-ia-muted">QUICK STATS</p>
              <div className="space-y-3">
                {system.estimated_cost_mxn && (
                  <div>
                    <p className="label-text text-ia-muted text-xs mb-1">ESTIMATED COST</p>
                    <p className="text-ia-gold font-mono font-bold">~{formatMXN(system.estimated_cost_mxn)}</p>
                  </div>
                )}
                <div>
                  <p className="label-text text-ia-muted text-xs mb-1">EXPECTED LIFESPAN</p>
                  <p className="text-sm text-ia-text">{system.expected_lifespan}</p>
                </div>
                <div>
                  <p className="label-text text-ia-muted text-xs mb-1">TEST STATUS</p>
                  <p className={cn('label-text', system.test_status === 'field-tested' ? 'text-ia-sage' : 'text-ia-gold')}>
                    {TEST_STATUS_LABELS[system.test_status]}
                  </p>
                </div>
              </div>
            </div>

            {/* Materials */}
            <div className="bg-bg-surface border border-ia-border p-6">
              <p className="label-text text-ia-muted mb-4">MATERIALS REQUIRED</p>
              <ul className="space-y-2">
                {system.materials.map((id) => (
                  <li key={id}>
                    <Link
                      href={`/materials/${id}`}
                      className="text-xs text-ia-secondary hover:text-ia-text transition-colors font-mono"
                    >
                      → {id}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools */}
            <div className="bg-bg-surface border border-ia-border p-6">
              <p className="label-text text-ia-muted mb-4">TOOLS REQUIRED</p>
              <ul className="space-y-2">
                {system.tools.map((tool) => (
                  <li key={tool} className="flex items-start gap-2 text-xs text-ia-secondary">
                    <Circle size={4} className="mt-1.5 flex-shrink-0" />
                    {tool}
                  </li>
                ))}
              </ul>
            </div>

            {/* Supplier notes */}
            {system.supplier_notes.length > 0 && (
              <div className="bg-bg-surface border border-ia-border p-6">
                <p className="label-text text-ia-muted mb-4">SUPPLIER NOTES (PV)</p>
                <ul className="space-y-2">
                  {system.supplier_notes.map((note) => (
                    <li key={note} className="text-xs text-ia-secondary leading-relaxed">{note}</li>
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

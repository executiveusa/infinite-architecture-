import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getBuildSystems } from '@/lib/data'
import { DIFFICULTY_COLORS, TEST_STATUS_LABELS } from '@/lib/types'
import { formatMXN, cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Build Systems',
  description: 'Open-source construction systems for foam, ferrocement, thin-shell concrete, and more.',
}

export default async function BuildSystemsPage() {
  const systems = await getBuildSystems()

  return (
    <div className="min-h-screen bg-bg-base pt-32 pb-24">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="border-b border-ia-border pb-16 mb-16">
          <span className="label-text text-ia-orange block mb-4">BUILD SYSTEMS</span>
          <h1 className="text-display-lg font-black text-ia-text mb-6">
            Open construction<br />knowledge base.
          </h1>
          <p className="text-lg text-ia-secondary max-w-2xl leading-relaxed">
            {systems.length} build systems documented, field-tested, and freely available.
            All materials sourced locally in Puerto Vallarta, Jalisco, México.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ia-border">
          {systems.map((system) => (
            <Link
              key={system.id}
              href={`/build-systems/${system.id}`}
              className="build-card bg-bg-base p-8 flex flex-col gap-5 group"
            >
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="label-text text-ia-muted border border-ia-border px-2 py-1">
                  {system.category.toUpperCase().replace(/-/g, ' ')}
                </span>
                <span
                  className={cn(
                    'label-text border px-2 py-1',
                    DIFFICULTY_COLORS[system.difficulty]
                  )}
                >
                  {system.difficulty.toUpperCase()}
                </span>
              </div>

              {/* Thumbnail */}
              <div className="aspect-video bg-bg-surface border border-ia-border flex items-center justify-center">
                <span className="label-text text-ia-muted text-center px-4">
                  {system.category.toUpperCase().replace(/-/g, ' ')}
                </span>
              </div>

              {/* Content */}
              <h2 className="text-xl font-bold text-ia-text group-hover:text-ia-orange transition-colors leading-tight">
                {system.title}
              </h2>

              <p className="text-sm text-ia-secondary leading-relaxed line-clamp-3 flex-1">
                {system.summary}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-between pt-4 border-t border-ia-border-subtle">
                <span className="label-text text-ia-muted">
                  {TEST_STATUS_LABELS[system.test_status]}
                </span>
                <span className="label-text text-ia-gold">
                  {system.estimated_cost_mxn ? `~${formatMXN(system.estimated_cost_mxn)}` : 'COST TBD'}
                </span>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-2 label-text text-ia-muted group-hover:text-ia-orange transition-colors">
                View system <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

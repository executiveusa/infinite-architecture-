import { getBuildSystems } from '@/lib/data'
import Link from 'next/link'
import { DIFFICULTY_COLORS, TEST_STATUS_LABELS } from '@/lib/types'
import { formatMXN, cn } from '@/lib/utils'

export default async function DashboardBuildSystemsPage() {
  const systems = await getBuildSystems()

  return (
    <div className="space-y-6">
      <div>
        <span className="label-text text-ia-orange block mb-2">BUILD SYSTEMS REGISTRY</span>
        <h1 className="text-2xl font-black text-ia-text">{systems.length} Systems</h1>
      </div>

      <div className="dashboard-panel overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-5 gap-4 px-5 py-3 border-b border-ia-border bg-bg-elevated">
          <span className="label-text text-ia-muted col-span-2">SYSTEM</span>
          <span className="label-text text-ia-muted">DIFFICULTY</span>
          <span className="label-text text-ia-muted">TEST STATUS</span>
          <span className="label-text text-ia-muted">COST (MXN)</span>
        </div>

        {systems.map((sys) => (
          <div
            key={sys.id}
            className="grid grid-cols-5 gap-4 px-5 py-4 border-b border-ia-border-subtle hover:bg-bg-elevated transition-colors"
          >
            <div className="col-span-2">
              <p className="text-sm text-ia-text font-medium">{sys.title}</p>
              <p className="label-text text-ia-muted text-xs font-mono">{sys.id}</p>
            </div>
            <span className={cn('label-text border px-2 py-0.5 self-center w-fit text-xs', DIFFICULTY_COLORS[sys.difficulty])}>
              {sys.difficulty.toUpperCase()}
            </span>
            <span className={`label-text self-center text-xs ${sys.test_status === 'field-tested' ? 'text-ia-sage' : 'text-ia-gold'}`}>
              {TEST_STATUS_LABELS[sys.test_status]}
            </span>
            <span className="label-text text-ia-gold self-center text-xs">
              {sys.estimated_cost_mxn ? formatMXN(sys.estimated_cost_mxn) : '—'}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <Link
          href="/build-systems"
          className="label-text text-ia-secondary border border-ia-border px-4 py-2 hover:border-ia-orange hover:text-ia-orange transition-all"
        >
          VIEW PUBLIC PAGES →
        </Link>
      </div>
    </div>
  )
}

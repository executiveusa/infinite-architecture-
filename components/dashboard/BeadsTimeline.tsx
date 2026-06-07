'use client'

import type { Bead } from '@/lib/types'
import { cn } from '@/lib/utils'
import { GitBranch, RotateCcw, FileCode, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

interface BeadsTimelineProps {
  beads: Bead[]
}

const STATUS_COLORS: Record<string, string> = {
  active: 'bg-ia-orange',
  complete: 'bg-ia-sage',
  planned: 'bg-ia-blue',
  blocked: 'bg-ia-rust',
  failed: 'bg-ia-rust',
}

const PHASE_COLORS: Record<string, string> = {
  discovery: 'text-ia-blue',
  architecture: 'text-ia-gold',
  backend: 'text-ia-sage',
  ui: 'text-ia-orange',
  dashboard: 'text-ia-blue',
  editorial: 'text-ia-gold',
  testing: 'text-ia-sage',
  review: 'text-ia-gold',
  merge: 'text-ia-sage',
}

function BeadEntry({ bead }: { bead: Bead }) {
  const [expanded, setExpanded] = useState(bead.status === 'active')

  return (
    <div className="relative pl-8">
      {/* Timeline line */}
      <div className="absolute left-3 top-0 bottom-0 w-px bg-ia-border" />

      {/* Status dot */}
      <div
        className={cn(
          'absolute left-0 top-5 w-6 h-6 rounded-sm flex items-center justify-center',
          'border border-ia-border bg-bg-elevated'
        )}
      >
        <div className={cn('w-2 h-2 rounded-full', STATUS_COLORS[bead.status] ?? 'bg-ia-muted')} />
      </div>

      {/* Card */}
      <div className="dashboard-panel mb-4 overflow-hidden">
        {/* Header */}
        <button
          className="w-full p-5 flex items-start justify-between gap-4 text-left hover:bg-bg-elevated transition-colors"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="label-text text-ia-muted font-mono">{bead.id}</span>
              <span
                className={cn(
                  'label-text border px-2 py-0.5',
                  bead.status === 'complete' ? 'text-ia-sage border-ia-sage' :
                  bead.status === 'active' ? 'text-ia-orange border-ia-orange' :
                  bead.status === 'blocked' ? 'text-ia-rust border-ia-rust' :
                  'text-ia-muted border-ia-border'
                )}
              >
                {bead.status.toUpperCase()}
              </span>
              <span className={cn('label-text', PHASE_COLORS[bead.phase] ?? 'text-ia-muted')}>
                {bead.phase.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-ia-secondary">{bead.summary}</p>
            <span className="label-text text-ia-muted text-xs">{bead.timestamp}</span>
          </div>
          {expanded ? (
            <ChevronUp size={16} className="text-ia-muted flex-shrink-0 mt-1" />
          ) : (
            <ChevronDown size={16} className="text-ia-muted flex-shrink-0 mt-1" />
          )}
        </button>

        {/* Expanded detail */}
        {expanded && (
          <div className="border-t border-ia-border p-5 space-y-5">
            {/* Decisions */}
            {bead.decisions.length > 0 && (
              <div>
                <p className="label-text text-ia-muted mb-2">DECISIONS</p>
                <ul className="space-y-1">
                  {bead.decisions.map((d) => (
                    <li key={d} className="text-xs text-ia-secondary leading-relaxed">— {d}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Files touched */}
            {bead.files_touched.length > 0 && (
              <div>
                <p className="label-text text-ia-muted mb-2">FILES TOUCHED</p>
                <div className="flex flex-wrap gap-1">
                  {bead.files_touched.slice(0, 12).map((f) => (
                    <span key={f} className="label-text text-ia-muted border border-ia-border px-1.5 py-0.5 font-mono text-xs">
                      {f}
                    </span>
                  ))}
                  {bead.files_touched.length > 12 && (
                    <span className="label-text text-ia-muted">+{bead.files_touched.length - 12} more</span>
                  )}
                </div>
              </div>
            )}

            {/* Risks */}
            {bead.risks.length > 0 && (
              <div>
                <p className="label-text text-ia-orange mb-2">RISKS</p>
                <ul className="space-y-1">
                  {bead.risks.map((r) => (
                    <li key={r} className="text-xs text-ia-secondary">— {r}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button className="flex items-center gap-1.5 label-text text-ia-muted hover:text-ia-orange transition-colors text-xs">
                <RotateCcw size={12} /> ROLLBACK
              </button>
              <button className="flex items-center gap-1.5 label-text text-ia-muted hover:text-ia-blue transition-colors text-xs">
                <FileCode size={12} /> VIEW FILES
              </button>
              <button className="flex items-center gap-1.5 label-text text-ia-muted hover:text-ia-text transition-colors text-xs">
                <GitBranch size={12} /> VIEW DIFF
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function BeadsTimeline({ beads }: BeadsTimelineProps) {
  const sorted = [...beads].reverse()

  return (
    <div className="space-y-6">
      <div>
        <span className="label-text text-ia-orange block mb-2">BEADS TIMELINE</span>
        <h1 className="text-2xl font-black text-ia-text">Checkpoint History</h1>
        <p className="text-sm text-ia-muted mt-2">{beads.length} beads recorded — newest first</p>
      </div>

      <div className="pt-4">
        {sorted.map((bead) => (
          <BeadEntry key={bead.id} bead={bead} />
        ))}
      </div>
    </div>
  )
}

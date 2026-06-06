'use client'

import type { Bead, SocialQueueItem } from '@/lib/types'
import { GitBranch, FileText, Share2, Activity, AlertTriangle, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Stats {
  activeBeads: number
  totalBeads: number
  latestBead: Bead | null
  socialDrafts: number
  socialApproved: number
}

interface CommandCenterProps {
  stats: Stats
  beads: Bead[]
  socialQueue: SocialQueueItem[]
}

const STATUS_COLORS: Record<string, string> = {
  active: 'text-ia-orange border-ia-orange',
  complete: 'text-ia-sage border-ia-sage',
  planned: 'text-ia-blue border-ia-blue',
  blocked: 'text-ia-rust border-ia-rust',
  failed: 'text-ia-rust border-ia-rust',
}

const PHASE_COLORS: Record<string, string> = {
  discovery: 'text-ia-blue',
  architecture: 'text-ia-gold',
  backend: 'text-ia-sage',
  ui: 'text-ia-orange',
  dashboard: 'text-ia-blue',
  editorial: 'text-ia-gold',
}

export default function CommandCenter({ stats, beads, socialQueue }: CommandCenterProps) {
  const STAT_CARDS = [
    {
      icon: GitBranch,
      label: 'ACTIVE BEADS',
      value: stats.activeBeads,
      sub: `${stats.totalBeads} total`,
      color: 'text-ia-orange',
    },
    {
      icon: Activity,
      label: 'PENDING REVIEW',
      value: 0,
      sub: 'Safety blocks: 0',
      color: 'text-ia-gold',
    },
    {
      icon: FileText,
      label: 'DRAFT CONTENT',
      value: 0,
      sub: 'No changes',
      color: 'text-ia-blue',
    },
    {
      icon: Share2,
      label: 'SOCIAL QUEUE',
      value: stats.socialDrafts,
      sub: `${stats.socialApproved} approved`,
      color: 'text-ia-sage',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <span className="label-text text-ia-orange block mb-2">COMMAND CENTER</span>
        <h1 className="text-2xl font-black text-ia-text">System Status</h1>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map(({ icon: Icon, label, value, sub, color }) => (
          <div
            key={label}
            className="dashboard-panel p-6 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="label-text text-ia-muted">{label}</span>
              <Icon size={14} className={color} />
            </div>
            <div className="text-3xl font-black text-ia-text">{value}</div>
            <div className="label-text text-ia-muted">{sub}</div>
          </div>
        ))}
      </div>

      {/* Status strip */}
      {stats.latestBead && (
        <div className="dashboard-panel p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="label-text text-ia-muted font-mono">{stats.latestBead.id}</span>
            <span
              className={cn(
                'label-text border px-2 py-1',
                STATUS_COLORS[stats.latestBead.status] ?? 'text-ia-muted border-ia-border'
              )}
            >
              {stats.latestBead.status.toUpperCase()}
            </span>
            <span className={cn('label-text', PHASE_COLORS[stats.latestBead.phase] ?? 'text-ia-muted')}>
              {stats.latestBead.phase.toUpperCase()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="label-text text-ia-muted">NEXT:</span>
            <span className="label-text text-ia-text">{stats.latestBead.next_action}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent beads */}
        <div className="dashboard-panel p-6">
          <p className="label-text text-ia-muted mb-6">RECENT BEADS</p>
          <div className="space-y-4">
            {beads.slice(-5).reverse().map((bead) => (
              <div key={bead.id} className="flex items-start gap-4 pb-4 border-b border-ia-border-subtle last:border-0 last:pb-0">
                <div className="flex flex-col items-center gap-1 mt-1">
                  <div className={cn(
                    'w-2 h-2 rounded-full',
                    bead.status === 'complete' ? 'bg-ia-sage' :
                    bead.status === 'active' ? 'bg-ia-orange' :
                    bead.status === 'blocked' ? 'bg-ia-rust' :
                    'bg-ia-muted'
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="label-text text-ia-muted font-mono text-xs">{bead.id}</span>
                    <span className={cn('label-text text-xs', PHASE_COLORS[bead.phase] ?? 'text-ia-muted')}>
                      {bead.phase}
                    </span>
                  </div>
                  <p className="text-xs text-ia-secondary leading-relaxed line-clamp-2">{bead.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social queue status */}
        <div className="dashboard-panel p-6">
          <p className="label-text text-ia-muted mb-6">SOCIAL QUEUE</p>
          {socialQueue.length === 0 ? (
            <p className="text-sm text-ia-muted">No items in queue.</p>
          ) : (
            <div className="space-y-4">
              {socialQueue.map((item) => (
                <div key={item.id} className="flex items-start gap-4 pb-4 border-b border-ia-border-subtle last:border-0 last:pb-0">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="label-text text-ia-muted uppercase text-xs">{item.platform}</span>
                      <span className={cn(
                        'label-text text-xs border px-1.5 py-0.5',
                        item.status === 'approved' ? 'text-ia-sage border-ia-sage' :
                        item.status === 'draft' ? 'text-ia-muted border-ia-border' :
                        item.status === 'published' ? 'text-ia-blue border-ia-blue' :
                        'text-ia-gold border-ia-gold'
                      )}>
                        {item.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-ia-secondary line-clamp-2">{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Risks strip */}
      {stats.latestBead && stats.latestBead.risks.length > 0 && (
        <div className="dashboard-panel p-5 border-l-2 border-ia-orange">
          <div className="flex items-start gap-3">
            <AlertTriangle size={14} className="text-ia-orange mt-0.5" />
            <div>
              <p className="label-text text-ia-orange mb-3">CURRENT RISKS</p>
              <ul className="space-y-1.5">
                {stats.latestBead.risks.map((risk) => (
                  <li key={risk} className="text-xs text-ia-secondary">{risk}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Questions for Bambu */}
      {stats.latestBead && stats.latestBead.questions_for_bambu.length > 0 && (
        <div className="dashboard-panel p-5 border-l-2 border-ia-blue">
          <div className="flex items-start gap-3">
            <CheckCircle size={14} className="text-ia-blue mt-0.5" />
            <div>
              <p className="label-text text-ia-blue mb-3">QUESTIONS FOR BAMBU</p>
              <ul className="space-y-1.5">
                {stats.latestBead.questions_for_bambu.map((q) => (
                  <li key={q} className="text-xs text-ia-secondary">{q}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

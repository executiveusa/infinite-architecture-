'use client'

import { useState } from 'react'
import type { SocialQueueItem } from '@/lib/types'
import { Instagram, Twitter, Linkedin, Youtube, CheckCircle, Clock, XCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SocialStudioProps {
  queue: SocialQueueItem[]
}

const PLATFORM_ICONS: Record<string, React.ReactNode> = {
  instagram: <Instagram size={14} />,
  x: <Twitter size={14} />,
  linkedin: <Linkedin size={14} />,
  'youtube-shorts': <Youtube size={14} />,
  tiktok: <span className="label-text text-xs">TT</span>,
  facebook: <span className="label-text text-xs">FB</span>,
}

const STATUS_CONFIG: Record<string, { color: string; icon: React.ReactNode }> = {
  draft: { color: 'text-ia-muted border-ia-border', icon: <Clock size={10} /> },
  needs_review: { color: 'text-ia-gold border-ia-gold', icon: <Clock size={10} /> },
  approved: { color: 'text-ia-sage border-ia-sage', icon: <CheckCircle size={10} /> },
  scheduled: { color: 'text-ia-blue border-ia-blue', icon: <Clock size={10} /> },
  published: { color: 'text-ia-sage border-ia-sage', icon: <CheckCircle size={10} /> },
  failed: { color: 'text-ia-rust border-ia-rust', icon: <XCircle size={10} /> },
}

export default function SocialStudio({ queue }: SocialStudioProps) {
  const [selected, setSelected] = useState<SocialQueueItem | null>(queue[0] ?? null)
  const [filter, setFilter] = useState<string>('all')

  const filtered = queue.filter(item =>
    filter === 'all' || item.status === filter || item.platform === filter
  )

  return (
    <div className="space-y-6">
      <div>
        <span className="label-text text-ia-sage block mb-2">SOCIAL STUDIO</span>
        <h1 className="text-2xl font-black text-ia-text">Social Queue</h1>
        <p className="text-sm text-ia-muted mt-1">{queue.length} items — all pending Bambu approval</p>
      </div>

      {/* Status filter chips */}
      <div className="flex flex-wrap gap-2">
        {['all', 'draft', 'needs_review', 'approved', 'scheduled'].map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              'label-text border px-3 py-1.5 transition-colors',
              filter === s ? 'border-ia-sage text-ia-sage' : 'border-ia-border text-ia-muted hover:border-ia-secondary'
            )}
          >
            {s.toUpperCase().replace('_', ' ')}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-96">
        {/* Queue list */}
        <div className="dashboard-panel overflow-hidden">
          <div className="p-4 border-b border-ia-border">
            <p className="label-text text-ia-muted">QUEUE ({filtered.length})</p>
          </div>
          <div className="overflow-y-auto max-h-[600px]">
            {filtered.length === 0 ? (
              <div className="p-8 text-center">
                <p className="label-text text-ia-muted">NO ITEMS</p>
              </div>
            ) : (
              filtered.map((item) => {
                const statusCfg = STATUS_CONFIG[item.status]
                return (
                  <button
                    key={item.id}
                    className={cn(
                      'w-full p-4 border-b border-ia-border-subtle text-left hover:bg-bg-elevated transition-colors',
                      selected?.id === item.id ? 'bg-bg-elevated' : ''
                    )}
                    onClick={() => setSelected(item)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-ia-secondary">{PLATFORM_ICONS[item.platform]}</span>
                        <span className="label-text text-ia-muted uppercase">{item.platform}</span>
                      </div>
                      <div className={cn('flex items-center gap-1 label-text border px-2 py-0.5', statusCfg?.color)}>
                        {statusCfg?.icon}
                        <span>{item.status.toUpperCase().replace('_', ' ')}</span>
                      </div>
                    </div>
                    <p className="text-xs text-ia-secondary line-clamp-2">{item.hook}</p>
                    <p className="label-text text-ia-muted mt-1 text-xs">{item.source_content}</p>
                  </button>
                )
              })
            )}
          </div>
        </div>

        {/* Preview panel */}
        <div className="dashboard-panel overflow-hidden">
          <div className="p-4 border-b border-ia-border">
            <p className="label-text text-ia-muted">PREVIEW</p>
          </div>
          {!selected ? (
            <div className="p-8 text-center">
              <p className="label-text text-ia-muted">SELECT AN ITEM</p>
            </div>
          ) : (
            <div className="p-6 space-y-6 overflow-y-auto max-h-[600px]">
              {/* Hook */}
              <div>
                <p className="label-text text-ia-muted mb-2">HOOK</p>
                <p className="text-sm text-ia-text font-medium">{selected.hook}</p>
              </div>

              {/* Caption */}
              <div>
                <p className="label-text text-ia-muted mb-2">CAPTION</p>
                <p className="text-sm text-ia-secondary leading-relaxed whitespace-pre-wrap">{selected.caption}</p>
              </div>

              {/* Hashtags */}
              <div>
                <p className="label-text text-ia-muted mb-2">HASHTAGS</p>
                <div className="flex flex-wrap gap-1">
                  {selected.hashtags.map(h => (
                    <span key={h} className="label-text text-ia-blue border border-ia-blue px-1.5 py-0.5 text-xs">{h}</span>
                  ))}
                </div>
              </div>

              {/* Visual prompt */}
              <div>
                <p className="label-text text-ia-muted mb-2">VISUAL PROMPT</p>
                <p className="text-xs text-ia-secondary italic leading-relaxed border border-ia-border p-3">{selected.visual_prompt}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-ia-border">
                <button className="flex-1 bg-ia-sage text-bg-base label-text py-2 hover:bg-ia-text transition-colors">
                  APPROVE
                </button>
                <button className="flex-1 border border-ia-rust text-ia-rust label-text py-2 hover:bg-ia-rust hover:text-bg-base transition-colors">
                  REJECT
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

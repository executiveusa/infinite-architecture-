'use client'

import { useState } from 'react'
import type { Material } from '@/lib/types'
import { AlertTriangle, Search, Plus } from 'lucide-react'

interface MaterialRegistryProps {
  materials: Material[]
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

export default function MaterialRegistry({ materials }: MaterialRegistryProps) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<string>('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const categories = Array.from(new Set(materials.map(m => m.category)))

  const filtered = materials.filter(m => {
    const matchesSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.spanish_name.toLowerCase().includes(search.toLowerCase()) ||
      m.local_names.some(n => n.toLowerCase().includes(search.toLowerCase()))
    const matchesCategory = filter === 'all' || m.category === filter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <span className="label-text text-ia-blue block mb-2">MATERIAL REGISTRY</span>
          <h1 className="text-2xl font-black text-ia-text">
            {materials.length} Materials
          </h1>
        </div>
        <button className="flex items-center gap-2 bg-ia-orange text-bg-base label-text px-4 py-2 hover:bg-ia-text transition-colors">
          <Plus size={14} /> ADD MATERIAL
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ia-muted" />
          <input
            type="text"
            placeholder="Search materials..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-bg-surface border border-ia-border pl-9 pr-4 py-2 text-sm text-ia-text placeholder:text-ia-muted focus:outline-none focus:border-ia-blue transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`label-text px-3 py-1.5 border transition-colors ${filter === 'all' ? 'border-ia-blue text-ia-blue' : 'border-ia-border text-ia-muted hover:border-ia-secondary'}`}
          >
            ALL
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`label-text px-3 py-1.5 border transition-colors ${filter === cat ? 'border-ia-blue text-ia-blue' : 'border-ia-border text-ia-muted hover:border-ia-secondary'}`}
            >
              {CATEGORY_LABELS[cat] ?? cat.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="dashboard-panel overflow-hidden">
        {/* Header row */}
        <div className="grid grid-cols-5 gap-4 px-5 py-3 border-b border-ia-border bg-bg-elevated">
          <span className="label-text text-ia-muted">NAME</span>
          <span className="label-text text-ia-muted">SPANISH NAME</span>
          <span className="label-text text-ia-muted">CATEGORY</span>
          <span className="label-text text-ia-muted">RISKS</span>
          <span className="label-text text-ia-muted">ACTIONS</span>
        </div>

        {/* Data rows */}
        {filtered.map((mat) => (
          <div key={mat.id}>
            <button
              className="w-full grid grid-cols-5 gap-4 px-5 py-4 border-b border-ia-border-subtle text-left hover:bg-bg-elevated transition-colors group"
              onClick={() => setExpanded(expanded === mat.id ? null : mat.id)}
            >
              <div>
                <p className="text-sm text-ia-text font-medium group-hover:text-ia-blue transition-colors">{mat.name}</p>
                <p className="text-xs text-ia-muted font-mono">{mat.id}</p>
              </div>
              <p className="text-sm text-ia-secondary italic self-center">{mat.spanish_name}</p>
              <span className="label-text text-ia-muted self-center">
                {CATEGORY_LABELS[mat.category] ?? mat.category.toUpperCase()}
              </span>
              <div className="flex items-center gap-1.5 self-center">
                {mat.risks.length > 0 ? (
                  <>
                    <AlertTriangle size={12} className="text-ia-orange" />
                    <span className="label-text text-ia-orange">{mat.risks.length}</span>
                  </>
                ) : (
                  <span className="label-text text-ia-sage">NONE</span>
                )}
              </div>
              <div className="flex items-center gap-3 self-center">
                <button className="label-text text-ia-muted hover:text-ia-blue transition-colors text-xs">EDIT</button>
                <button className="label-text text-ia-muted hover:text-ia-text transition-colors text-xs">VIEW</button>
              </div>
            </button>

            {/* Expanded detail */}
            {expanded === mat.id && (
              <div className="px-5 py-5 bg-bg-elevated border-b border-ia-border grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="label-text text-ia-muted mb-2">BEST USES</p>
                  <ul className="space-y-1">
                    {mat.best_uses.map(u => <li key={u} className="text-xs text-ia-secondary">— {u}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="label-text text-ia-muted mb-2">RISKS</p>
                  <ul className="space-y-1">
                    {mat.risks.length > 0
                      ? mat.risks.map(r => <li key={r} className="text-xs text-ia-secondary flex gap-2"><AlertTriangle size={10} className="text-ia-orange mt-0.5 flex-shrink-0" />{r}</li>)
                      : <li className="text-xs text-ia-sage">No significant risks.</li>
                    }
                  </ul>
                </div>
                <div>
                  <p className="label-text text-ia-muted mb-2">SUPPLIER NOTES (PV)</p>
                  <ul className="space-y-1">
                    {mat.supplier_notes.map(n => <li key={n} className="text-xs text-ia-secondary">{n}</li>)}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="px-5 py-12 text-center">
            <p className="label-text text-ia-muted">NO MATERIALS MATCH YOUR FILTERS</p>
          </div>
        )}
      </div>
    </div>
  )
}

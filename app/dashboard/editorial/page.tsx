export default function EditorialPipelinePage() {
  const COLUMNS = [
    { id: 'raw', label: 'RAW', color: 'text-ia-muted', items: [] },
    { id: 'processed', label: 'PROCESSED', color: 'text-ia-blue', items: [] },
    { id: 'drafted', label: 'DRAFTED', color: 'text-ia-gold', items: [] },
    { id: 'design-ready', label: 'DESIGN READY', color: 'text-ia-orange', items: [] },
    { id: 'reviewed', label: 'REVIEWED', color: 'text-ia-sage', items: [] },
    { id: 'published', label: 'PUBLISHED', color: 'text-ia-sage', items: [] },
  ]

  return (
    <div className="space-y-6">
      <div>
        <span className="label-text text-ia-gold block mb-2">EDITORIAL PIPELINE</span>
        <h1 className="text-2xl font-black text-ia-text">Content Pipeline</h1>
        <p className="text-sm text-ia-muted mt-1">Drag cards between columns to update status.</p>
      </div>

      {/* Kanban board */}
      <div className="overflow-x-auto">
        <div className="flex gap-4 min-w-max pb-4">
          {COLUMNS.map((col) => (
            <div key={col.id} className="w-64 flex flex-col gap-3">
              {/* Column header */}
              <div className="flex items-center justify-between px-3 py-2 bg-bg-elevated border border-ia-border">
                <span className={`label-text ${col.color}`}>{col.label}</span>
                <span className="label-text text-ia-muted">{col.items.length}</span>
              </div>

              {/* Cards */}
              <div className="space-y-2 min-h-[400px] p-2 bg-bg-surface border border-ia-border-subtle">
                {col.items.length === 0 ? (
                  <div className="h-32 flex items-center justify-center">
                    <p className="label-text text-ia-muted">EMPTY</p>
                  </div>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Agent status */}
      <div className="dashboard-panel p-6">
        <p className="label-text text-ia-muted mb-4">EDITORIAL TEAM STATUS</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Research Miner', status: 'idle' },
            { name: 'Construction Editor', status: 'idle' },
            { name: 'Safety Reviewer', status: 'idle' },
            { name: 'Adams Reviewer', status: 'idle' },
          ].map(({ name, status }) => (
            <div key={name} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-ia-muted rounded-full" />
              <div>
                <p className="label-text text-ia-muted text-xs">{name}</p>
                <p className="label-text text-ia-muted uppercase text-xs">{status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

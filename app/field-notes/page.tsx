import type { Metadata } from 'next'
import { FlaskConical, MessageSquare, Youtube, Wrench } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Field Notes',
  description: 'Raw research, field tests, and construction observations from the Puerto Vallarta material laboratory.',
}

const NOTES = [
  {
    id: '001',
    date: '2026-06-06',
    title: 'First panel test: foam-core cement with AR mesh',
    source: 'field-test' as const,
    tags: ['foam', 'cement', 'AR mesh', 'test panel'],
    excerpt: 'Tested 1:1.5 cement:sand mix with SikaLatex on 2" XPS foam. Mesh adhesion excellent. Edges require more attention to avoid thin spots. Cured 7 days damp — minimal cracking.',
    status: 'published',
  },
  {
    id: '002',
    date: '2026-06-06',
    title: 'Sourcing AR fiberglass mesh in Puerto Vallarta',
    source: 'conversation' as const,
    tags: ['AR mesh', 'sourcing', 'Puerto Vallarta', 'suppliers'],
    excerpt: 'Standard construction mesh is NOT alkali-resistant. Fiberglass cloth from boat building will degrade in cement. Must specify AR grade. Found at SIKA distributor on main highway — confirm stock before ordering.',
    status: 'published',
  },
  {
    id: '003',
    date: '2026-06-06',
    title: 'Ferrocement barrel roof research compilation',
    source: 'youtube' as const,
    tags: ['barrel roof', 'ferrocement', 'cattle panel', 'shell'],
    excerpt: 'Reviewed 6 YouTube builders using cattle panel barrel vaults. Key learning: spans up to 4m work well with 10-gauge panel. Mortar must penetrate all mesh layers or delamination risk exists.',
    status: 'published',
  },
]

const SOURCE_ICONS = {
  'field-test': Wrench,
  'conversation': MessageSquare,
  'youtube': Youtube,
  'repo': FlaskConical,
  'local-note': FlaskConical,
}

const SOURCE_LABELS = {
  'field-test': 'FIELD TEST',
  'conversation': 'CONVERSATION',
  'youtube': 'YOUTUBE RESEARCH',
  'repo': 'REPOSITORY',
  'local-note': 'LOCAL NOTE',
}

export default function FieldNotesPage() {
  return (
    <div className="min-h-screen bg-bg-base pt-32 pb-24">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="border-b border-ia-border pb-16 mb-16">
          <span className="label-text text-ia-gold block mb-4">FIELD NOTES</span>
          <h1 className="text-display-lg font-black text-ia-text mb-6">
            Raw research.<br />Real experiments.
          </h1>
          <p className="text-lg text-ia-secondary max-w-2xl leading-relaxed">
            Unfiltered observations from the material laboratory. Source-tagged and
            bead-linked. Failures and lessons included.
          </p>
        </div>

        {/* Notes list */}
        <div className="space-y-px">
          {NOTES.map((note) => {
            const Icon = SOURCE_ICONS[note.source]
            return (
              <article
                key={note.id}
                className="bg-bg-base border border-ia-border p-8 hover:bg-bg-surface transition-colors duration-200 grid grid-cols-1 md:grid-cols-4 gap-6"
              >
                {/* Meta column */}
                <div className="md:col-span-1 flex flex-col gap-3">
                  <time className="label-text text-ia-muted" dateTime={note.date}>
                    {new Date(note.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <div className="flex items-center gap-1.5">
                    <Icon size={12} className="text-ia-gold" />
                    <span className="label-text text-ia-gold">{SOURCE_LABELS[note.source]}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {note.tags.map((tag) => (
                      <span key={tag} className="label-text text-ia-muted border border-ia-border px-1.5 py-0.5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content column */}
                <div className="md:col-span-3">
                  <h2 className="text-xl font-bold text-ia-text mb-3 leading-tight">{note.title}</h2>
                  <p className="text-sm text-ia-secondary leading-relaxed">{note.excerpt}</p>
                </div>
              </article>
            )
          })}
        </div>

        {/* Empty state when no notes */}
        {NOTES.length === 0 && (
          <div className="text-center py-24">
            <p className="label-text text-ia-muted mb-4">NO FIELD NOTES YET</p>
            <p className="text-sm text-ia-muted">The Research Miner is processing incoming data.</p>
          </div>
        )}
      </div>
    </div>
  )
}

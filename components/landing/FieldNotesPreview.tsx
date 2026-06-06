import Link from 'next/link'
import { ArrowRight, FlaskConical, MessageSquare, Youtube, Wrench } from 'lucide-react'

const PREVIEW_NOTES = [
  {
    id: '001',
    date: '2026-06-06',
    title: 'First panel test: foam-core cement with AR mesh',
    source: 'field-test' as const,
    excerpt: 'Tested 1:1.5 cement:sand mix with SikaLatex on 2" XPS foam. Mesh adhesion excellent. Edges require more attention.',
  },
  {
    id: '002',
    date: '2026-06-06',
    title: 'Sourcing AR fiberglass mesh in Puerto Vallarta',
    source: 'conversation' as const,
    excerpt: 'Standard construction mesh is NOT alkali-resistant. Must specify AR grade. Found at SIKA distributor on highway.',
  },
  {
    id: '003',
    date: '2026-06-06',
    title: 'Ferrocement barrel roof research compilation',
    source: 'youtube' as const,
    excerpt: 'Reviewed 6 YouTube builders. Key learning: cattle panel spans work well up to 4m. Mortar must penetrate all mesh layers.',
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

export default function FieldNotesPreview() {
  return (
    <section className="py-32 bg-bg-surface border-t border-ia-border">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex items-end justify-between mb-16">
          <div>
            <span className="label-text text-ia-gold block mb-4">FIELD NOTES</span>
            <h2 className="text-display-md font-black text-ia-text">
              Raw research.<br />Real experiments.
            </h2>
          </div>
          <Link
            href="/field-notes"
            className="hidden md:inline-flex items-center gap-2 label-text text-ia-secondary hover:text-ia-gold transition-colors"
          >
            ALL FIELD NOTES <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ia-border">
          {PREVIEW_NOTES.map((note) => {
            const Icon = SOURCE_ICONS[note.source]
            return (
              <Link
                key={note.id}
                href={`/field-notes/${note.id}`}
                className="group bg-bg-surface p-8 flex flex-col gap-4 hover:bg-bg-elevated transition-colors duration-200"
              >
                {/* Date + source */}
                <div className="flex items-center justify-between">
                  <span className="label-text text-ia-muted">
                    {new Date(note.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <Icon size={12} className="text-ia-gold" />
                    <span className="label-text text-ia-gold">
                      {SOURCE_LABELS[note.source]}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-ia-text group-hover:text-ia-gold transition-colors leading-snug">
                  {note.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-ia-secondary leading-relaxed">{note.excerpt}</p>

                {/* CTA */}
                <div className="flex items-center gap-1.5 mt-auto pt-4 border-t border-ia-border-subtle label-text text-ia-muted group-hover:text-ia-gold transition-colors">
                  Read note <ArrowRight size={12} />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

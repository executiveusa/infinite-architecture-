import Link from 'next/link'
import { ArrowRight, Bot } from 'lucide-react'

export default function AgentTeaser() {
  return (
    <section className="py-32 bg-bg-base border-t border-ia-border blueprint-grid">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="max-w-2xl">
          {/* Icon */}
          <div className="w-12 h-12 border border-ia-border flex items-center justify-center mb-8">
            <Bot size={20} className="text-ia-blue" />
          </div>

          {/* Label */}
          <span className="label-text text-ia-blue block mb-6">AGENT-OPERATED</span>

          {/* Heading */}
          <h2 className="text-display-lg font-black text-ia-text mb-6">
            This site is<br />agent-operated.
          </h2>

          {/* Body */}
          <p className="text-lg text-ia-secondary leading-relaxed mb-4">
            Pi Agent manages content updates, knowledge queries, material registry edits,
            and build system drafts through a private owner dashboard.
          </p>
          <p className="text-sm text-ia-muted leading-relaxed mb-12">
            The Editorial Team — Research Miner, Construction Editor, Design Editor, Safety Reviewer,
            Social Producer, Adams Reviewer, Publisher — are autonomous agent roles that process,
            review, and publish all content before it reaches you.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 border border-ia-blue text-ia-blue label-text px-5 py-2.5 hover:bg-ia-blue hover:text-bg-base transition-all duration-200"
            >
              OWNER DASHBOARD <ArrowRight size={14} />
            </Link>
            <Link
              href="/field-notes"
              className="inline-flex items-center gap-2 label-text text-ia-secondary hover:text-ia-text transition-colors"
            >
              READ THE FIELD NOTES <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Decorative: recent beads */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
          {[
            {
              id: 'IA-BEAD-0001',
              phase: 'DISCOVERY',
              status: 'COMPLETE',
              summary: 'Repo inspected — blank. Stack decided. Build started.',
            },
            {
              id: 'IA-BEAD-0002',
              phase: 'ARCHITECTURE',
              status: 'ACTIVE',
              summary: 'Docs, data, agents, UI, landing page, dashboard all in flight.',
            },
          ].map((bead) => (
            <div
              key={bead.id}
              className="glass border border-ia-border p-5 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between">
                <span className="label-text text-ia-muted">{bead.id}</span>
                <span
                  className={`label-text ${
                    bead.status === 'COMPLETE' ? 'text-ia-sage' : 'text-ia-orange'
                  }`}
                >
                  {bead.status}
                </span>
              </div>
              <p className="label-text text-ia-blue">{bead.phase}</p>
              <p className="text-xs text-ia-secondary">{bead.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

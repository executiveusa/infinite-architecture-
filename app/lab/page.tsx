import type { Metadata } from 'next'
import { FlaskConical, Calendar, CheckCircle, Circle, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Lab',
  description: 'Experimental prototypes, test panel results, and material observations from the Infinite Architecture laboratory.',
}

const LAB_ENTRIES = [
  {
    id: 'panel-001',
    date: '2026-06-06',
    title: 'Test Panel 001: 1:1.5 Cement:Sand + SikaLatex',
    bead: 'IA-BEAD-0001',
    status: 'complete' as const,
    system: 'foam-core-cement-panel',
    results: {
      sevenDay: 'Minimal cracking. Good adhesion. Edge thin spots identified.',
      twentyEightDay: 'Pending — curing in progress.',
    },
    observations: [
      'SikaLatex at 1:3 dilution provides excellent workability',
      'AR mesh press-in requires firm consistent pressure for good embedment',
      'Edge corners need double-pass mortar application',
      'Foam surface scoring improves adhesion noticeably',
    ],
    risks_observed: [
      'Thin mortar on edges — must monitor for cracking at day 28',
    ],
  },
]

export default function LabPage() {
  return (
    <div className="min-h-screen bg-bg-base pt-32 pb-24">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="border-b border-ia-border pb-16 mb-16">
          <span className="label-text text-ia-gold block mb-4">LABORATORY</span>
          <h1 className="text-display-lg font-black text-ia-text mb-6">
            Experiments.<br />Observations.<br />Honest results.
          </h1>
          <p className="text-lg text-ia-secondary max-w-2xl leading-relaxed">
            All prototype work and test panels from the Puerto Vallarta material laboratory.
            Every entry is bead-linked for full traceability. Failures documented alongside successes.
          </p>
        </div>

        {/* Lab entries */}
        <div className="space-y-6">
          {LAB_ENTRIES.map((entry) => (
            <article key={entry.id} className="bg-bg-surface border border-ia-border p-10">
              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="label-text text-ia-muted font-mono">{entry.id}</span>
                    <span className="label-text text-ia-muted">//</span>
                    <span className="label-text text-ia-muted font-mono">{entry.bead}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-ia-text mb-2">{entry.title}</h2>
                  <div className="flex items-center gap-2 label-text text-ia-muted">
                    <Calendar size={12} />
                    {new Date(entry.date).toLocaleDateString('en-US', {
                      year: 'numeric', month: 'long', day: 'numeric'
                    })}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FlaskConical size={14} className="text-ia-gold" />
                  <span className="label-text text-ia-gold uppercase">{entry.status}</span>
                </div>
              </div>

              {/* Results */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-bg-elevated border border-ia-border p-6">
                  <p className="label-text text-ia-muted mb-3">7-DAY RESULT</p>
                  <p className="text-sm text-ia-secondary">{entry.results.sevenDay}</p>
                </div>
                <div className="bg-bg-elevated border border-ia-border p-6">
                  <p className="label-text text-ia-muted mb-3">28-DAY RESULT</p>
                  <p className="text-sm text-ia-secondary">{entry.results.twentyEightDay}</p>
                </div>
              </div>

              {/* Observations */}
              <div className="mb-6">
                <p className="label-text text-ia-text mb-4">OBSERVATIONS</p>
                <ul className="space-y-2">
                  {entry.observations.map((obs) => (
                    <li key={obs} className="flex items-start gap-3 text-sm text-ia-secondary">
                      <CheckCircle size={14} className="text-ia-sage mt-0.5 flex-shrink-0" />
                      {obs}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Risks */}
              {entry.risks_observed.length > 0 && (
                <div>
                  <p className="label-text text-ia-orange mb-4">RISKS OBSERVED</p>
                  <ul className="space-y-2">
                    {entry.risks_observed.map((risk) => (
                      <li key={risk} className="flex items-start gap-3 text-sm text-ia-secondary">
                        <AlertTriangle size={14} className="text-ia-orange mt-0.5 flex-shrink-0" />
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Test panel protocol CTA */}
        <div className="mt-16 p-8 border border-ia-border bg-bg-surface flex items-center justify-between">
          <div>
            <p className="label-text text-ia-gold mb-2">RUN YOUR OWN TESTS</p>
            <p className="text-sm text-ia-secondary max-w-lg">
              The Material Test Panel Protocol is the starting point for all experiments.
              Document everything. Link to a bead.
            </p>
          </div>
          <a
            href="/build-systems/material-test-panel-protocol"
            className="flex-shrink-0 border border-ia-gold text-ia-gold label-text px-4 py-2 hover:bg-ia-gold hover:text-bg-base transition-all duration-200"
          >
            VIEW PROTOCOL →
          </a>
        </div>
      </div>
    </div>
  )
}

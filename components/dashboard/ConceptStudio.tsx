'use client'

import { FormEvent, useMemo, useState } from 'react'
import {
  Bot,
  Box,
  Calculator,
  CheckCircle2,
  CircleDollarSign,
  Cuboid,
  Send,
  Sparkles,
  TriangleAlert,
} from 'lucide-react'

type Brief = {
  projectId: string
  projectName: string
  summary: string
  location: string
  propertyType: string
  targetUnits: number | null
  assumptions: string[]
  nextQuestions: string[]
  conceptDirections: {
    title: string
    rationale: string
    supplierCategory: string
    visualizationFocus: string
  }[]
  costTemplate: {
    label: string
    category: string
    sourceStatus: 'verified-quote' | 'estimate' | 'allowance'
  }[]
  safetyBoundary: string
}

type CostLine = {
  label: string
  category: string
  quantity: number
  unitCost: number
  sourceStatus: 'verified-quote' | 'estimate' | 'allowance'
  notes: string
}

type Estimate = {
  currency: 'MXN' | 'USD'
  targetMarginPct: number
  landedCost: number
  sellingPrice: number
  grossProfit: number
  markupPctOnCost: number
  warnings: string[]
}

type BlenderResult = {
  status: string
  workerConfigured: boolean
  jobId: string
  spec: Record<string, unknown>
  next?: string
}

type ChatMessage = {
  role: 'user' | 'agent'
  content: string
}

const STARTERS = [
  'Create a six-dome glamping retreat near Puerto Vallarta with shared amenities, solar, water storage, native planting, and a strong guest arrival sequence.',
  'Turn an existing Airbnb property into a biophilic stay with a private outdoor bathing area, shade, foodscape, and a stronger listing story.',
  'Show me how a small off-grid compound could fit on a sloped tropical site with passive cooling and a shared kitchen pavilion.',
]

const money = (value: number, currency: string) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)

export default function ConceptStudio() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [brief, setBrief] = useState<Brief | null>(null)
  const [mode, setMode] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'agent',
      content:
        'State the outcome you want. I will turn it into a concept brief, supplier/cost framework, and a bounded 3D production job without exposing the underlying tools.',
    },
  ])
  const [costLines, setCostLines] = useState<CostLine[]>([])
  const [currency, setCurrency] = useState<'MXN' | 'USD'>('MXN')
  const [targetMarginPct, setTargetMarginPct] = useState(30)
  const [estimate, setEstimate] = useState<Estimate | null>(null)
  const [blender, setBlender] = useState<BlenderResult | null>(null)
  const [error, setError] = useState('')

  const quoteProgress = useMemo(() => {
    if (!costLines.length) return { verified: 0, total: 0 }
    return {
      verified: costLines.filter((line) => line.sourceStatus === 'verified-quote').length,
      total: costLines.length,
    }
  }, [costLines])

  async function createBrief(message: string) {
    if (!message.trim() || loading) return
    setLoading(true)
    setError('')
    setEstimate(null)
    setBlender(null)
    setMessages((current) => [...current, { role: 'user', content: message.trim() }])
    setInput('')

    try {
      const response = await fetch('/api/studio/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error ?? 'Could not create the concept brief.')

      const nextBrief = data.brief as Brief
      setBrief(nextBrief)
      setMode(String(data.mode ?? ''))
      setCostLines(
        nextBrief.costTemplate.map((line) => ({
          ...line,
          quantity: 1,
          unitCost: 0,
          notes: '',
        }))
      )
      setMessages((current) => [
        ...current,
        {
          role: 'agent',
          content: `${nextBrief.projectName} is mapped. I have separated assumptions from facts and prepared the cost and 3D workstreams. The next questions on the right are the items that materially improve the concept.`,
        },
      ])
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not create the concept brief.')
    } finally {
      setLoading(false)
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void createBrief(input)
  }

  async function calculate() {
    setError('')
    try {
      const response = await fetch('/api/studio/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currency,
          targetMarginPct,
          lineItems: costLines,
        }),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error ?? 'Could not calculate the offer.')
      setEstimate(data.estimate)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not calculate the offer.')
    }
  }

  async function prepareBlender() {
    if (!brief) return
    setError('')
    try {
      const response = await fetch('/api/studio/blender', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId: brief.projectId,
          projectName: brief.projectName,
          location: brief.location,
          structureType: brief.conceptDirections[0]?.title ?? brief.propertyType,
          targetUnits: brief.targetUnits ?? 1,
          outputs: ['blend', 'glb', 'stills', 'walkthrough'],
        }),
      })
      const data = await response.json()
      if (!response.ok && response.status !== 202) {
        throw new Error(data.error ?? 'Could not prepare the Blender job.')
      }
      setBlender(data)
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not prepare the Blender job.')
    }
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <span className="label-text text-ia-orange block mb-2">PRIVATE CONCEPT STUDIO</span>
          <h1 className="text-3xl font-black text-ia-text">Outcome → concept → offer → 3D</h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ia-secondary">
            One private chat coordinates the concept. Supplier quotes, cost assumptions, margin math,
            and 3D jobs remain visible for owner approval underneath.
          </p>
        </div>
        <div className="label-text text-ia-muted">
          {brief ? `${brief.projectId} · ${mode}` : 'NO ACTIVE CONCEPT'}
        </div>
      </header>

      <div className="grid gap-6 2xl:grid-cols-[1.05fr_.95fr]">
        <section className="dashboard-panel min-h-[42rem] flex flex-col">
          <div className="border-b border-ia-border p-5 flex items-center gap-3">
            <Bot size={16} className="text-ia-blue" />
            <div>
              <p className="label-text text-ia-blue">STUDIO CHAT</p>
              <p className="text-xs text-ia-muted mt-1">Describe outcomes, not software commands.</p>
            </div>
          </div>

          <div className="flex-1 p-5 space-y-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={message.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
              >
                <div
                  className={
                    message.role === 'user'
                      ? 'max-w-[85%] bg-ia-orange text-bg-base p-4 text-sm leading-relaxed'
                      : 'max-w-[85%] bg-bg-elevated border border-ia-border p-4 text-sm leading-relaxed text-ia-secondary'
                  }
                >
                  {message.content}
                </div>
              </div>
            ))}

            {loading ? (
              <div className="flex items-center gap-2 text-xs text-ia-muted">
                <Sparkles size={14} className="text-ia-gold" />
                Mapping the concept…
              </div>
            ) : null}

            {!brief && messages.length === 1 ? (
              <div className="grid gap-2 pt-3">
                {STARTERS.map((starter) => (
                  <button
                    key={starter}
                    type="button"
                    onClick={() => void createBrief(starter)}
                    className="text-left border border-ia-border bg-bg-surface p-4 text-xs leading-relaxed text-ia-secondary hover:border-ia-blue hover:text-ia-text"
                  >
                    {starter}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <form onSubmit={submit} className="border-t border-ia-border p-4">
            <div className="flex gap-3">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                rows={3}
                placeholder="Example: Create a six-dome glamping retreat near Puerto Vallarta..."
                className="flex-1 resize-none bg-bg-elevated border border-ia-border px-4 py-3 text-sm text-ia-text outline-none focus:border-ia-blue"
              />
              <button
                type="submit"
                disabled={loading || input.trim().length < 8}
                className="self-stretch px-5 bg-ia-blue text-bg-base disabled:opacity-40"
                aria-label="Send outcome"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </section>

        <div className="space-y-6">
          <section className="dashboard-panel p-6">
            <div className="flex items-center justify-between gap-4 mb-5">
              <div className="flex items-center gap-3">
                <Sparkles size={16} className="text-ia-gold" />
                <p className="label-text text-ia-gold">CONCEPT BRIEF</p>
              </div>
              {brief ? (
                <span className="label-text text-ia-sage">READY FOR OWNER REVIEW</span>
              ) : null}
            </div>

            {brief ? (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-black text-ia-text">{brief.projectName}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ia-secondary">{brief.summary}</p>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {[
                    ['TYPE', brief.propertyType],
                    ['LOCATION', brief.location],
                    ['UNITS', brief.targetUnits?.toString() ?? 'TBD'],
                  ].map(([label, value]) => (
                    <div key={label} className="bg-bg-elevated border border-ia-border p-3">
                      <p className="label-text text-ia-muted">{label}</p>
                      <p className="mt-2 text-xs text-ia-text">{value}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <p className="label-text text-ia-muted mb-3">DIRECTIONS</p>
                  <div className="space-y-3">
                    {brief.conceptDirections.map((direction) => (
                      <div key={direction.title} className="border-l-2 border-ia-blue pl-4">
                        <p className="text-sm font-semibold text-ia-text">{direction.title}</p>
                        <p className="mt-1 text-xs leading-relaxed text-ia-secondary">{direction.rationale}</p>
                        <p className="mt-2 label-text text-ia-muted">{direction.visualizationFocus}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="label-text text-ia-muted mb-3">NEXT QUESTIONS</p>
                  <ul className="space-y-2">
                    {brief.nextQuestions.map((question) => (
                      <li key={question} className="text-xs leading-relaxed text-ia-secondary">
                        • {question}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-start gap-3 border border-ia-gold/40 bg-ia-gold/5 p-4">
                  <TriangleAlert size={15} className="text-ia-gold mt-0.5 shrink-0" />
                  <p className="text-xs leading-relaxed text-ia-secondary">{brief.safetyBoundary}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-ia-muted">State an outcome to create the first concept brief.</p>
            )}
          </section>

          <section className="dashboard-panel p-6">
            <div className="flex items-center gap-3 mb-5">
              <CircleDollarSign size={16} className="text-ia-sage" />
              <p className="label-text text-ia-sage">INTERNAL OFFER MATH</p>
            </div>

            {brief ? (
              <div className="space-y-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  <label>
                    <span className="label-text text-ia-muted block mb-2">CURRENCY</span>
                    <select
                      value={currency}
                      onChange={(event) => setCurrency(event.target.value as 'MXN' | 'USD')}
                      className="w-full bg-bg-elevated border border-ia-border p-2.5 text-sm text-ia-text"
                    >
                      <option value="MXN">MXN</option>
                      <option value="USD">USD</option>
                    </select>
                  </label>
                  <label>
                    <span className="label-text text-ia-muted block mb-2">TARGET GROSS MARGIN %</span>
                    <input
                      type="number"
                      min={5}
                      max={60}
                      value={targetMarginPct}
                      onChange={(event) => setTargetMarginPct(Number(event.target.value))}
                      className="w-full bg-bg-elevated border border-ia-border p-2.5 text-sm text-ia-text"
                    />
                  </label>
                </div>

                <div className="space-y-2">
                  {costLines.map((line, index) => (
                    <div key={`${line.category}-${index}`} className="grid gap-2 sm:grid-cols-[1.2fr_.55fr_.7fr]">
                      <div className="bg-bg-elevated border border-ia-border p-2.5 text-xs text-ia-secondary">
                        {line.label}
                      </div>
                      <input
                        type="number"
                        min={0}
                        value={line.unitCost}
                        onChange={(event) => {
                          const value = Number(event.target.value)
                          setCostLines((current) =>
                            current.map((item, itemIndex) =>
                              itemIndex === index ? { ...item, unitCost: value } : item
                            )
                          )
                        }}
                        className="bg-bg-elevated border border-ia-border p-2.5 text-xs text-ia-text"
                        aria-label={`Cost for ${line.label}`}
                      />
                      <select
                        value={line.sourceStatus}
                        onChange={(event) => {
                          const value = event.target.value as CostLine['sourceStatus']
                          setCostLines((current) =>
                            current.map((item, itemIndex) =>
                              itemIndex === index ? { ...item, sourceStatus: value } : item
                            )
                          )
                        }}
                        className="bg-bg-elevated border border-ia-border p-2.5 text-xs text-ia-text"
                        aria-label={`Source status for ${line.label}`}
                      >
                        <option value="allowance">Allowance</option>
                        <option value="estimate">Estimate</option>
                        <option value="verified-quote">Verified quote</option>
                      </select>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ia-border pt-4">
                  <span className="label-text text-ia-muted">
                    VERIFIED QUOTES {quoteProgress.verified}/{quoteProgress.total}
                  </span>
                  <button
                    type="button"
                    onClick={() => void calculate()}
                    className="inline-flex items-center gap-2 bg-ia-sage text-bg-base px-4 py-2.5 text-sm font-semibold"
                  >
                    <Calculator size={15} />
                    Calculate offer
                  </button>
                </div>

                {estimate ? (
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="bg-bg-elevated border border-ia-border p-4">
                      <p className="label-text text-ia-muted">LANDED COST</p>
                      <p className="mt-2 text-lg font-black text-ia-text">{money(estimate.landedCost, estimate.currency)}</p>
                    </div>
                    <div className="bg-bg-elevated border border-ia-sage p-4">
                      <p className="label-text text-ia-sage">CLIENT PRICE</p>
                      <p className="mt-2 text-lg font-black text-ia-text">{money(estimate.sellingPrice, estimate.currency)}</p>
                    </div>
                    <div className="bg-bg-elevated border border-ia-border p-4">
                      <p className="label-text text-ia-muted">GROSS PROFIT</p>
                      <p className="mt-2 text-lg font-black text-ia-text">{money(estimate.grossProfit, estimate.currency)}</p>
                    </div>
                    <div className="sm:col-span-3 text-xs leading-relaxed text-ia-muted">
                      {estimate.warnings.join(' ')}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <p className="text-sm text-ia-muted">Cost lanes appear after a concept brief is created.</p>
            )}
          </section>

          <section className="dashboard-panel p-6">
            <div className="flex items-center justify-between gap-4 mb-5">
              <div className="flex items-center gap-3">
                <Cuboid size={16} className="text-ia-blue" />
                <p className="label-text text-ia-blue">3D PRODUCTION</p>
              </div>
              {blender ? (
                <span className={`label-text ${blender.workerConfigured ? 'text-ia-sage' : 'text-ia-gold'}`}>
                  {blender.workerConfigured ? 'WORKER CONNECTED' : 'JOB DRAFTED'}
                </span>
              ) : null}
            </div>

            {brief ? (
              <div>
                <p className="text-sm leading-relaxed text-ia-secondary">
                  Blender is the owned scene of record. AI-generated assets may assist with concept
                  studies, but the worker accepts a bounded scene specification—not arbitrary code.
                </p>
                <button
                  type="button"
                  onClick={() => void prepareBlender()}
                  className="mt-5 inline-flex items-center gap-2 border border-ia-blue text-ia-blue px-4 py-2.5 text-sm font-semibold hover:bg-ia-blue hover:text-bg-base"
                >
                  <Box size={15} />
                  Prepare Blender package
                </button>

                {blender ? (
                  <div className="mt-4 bg-bg-elevated border border-ia-border p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-ia-sage" />
                      <span className="label-text text-ia-text">{blender.jobId}</span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-ia-muted">
                      {blender.workerConfigured
                        ? 'The controlled worker accepted the job.'
                        : blender.next ?? 'Connect the worker to render this spec.'}
                    </p>
                  </div>
                ) : null}
              </div>
            ) : (
              <p className="text-sm text-ia-muted">3D production starts from an approved concept brief.</p>
            )}
          </section>

          {error ? (
            <div role="alert" className="dashboard-panel border-l-2 border-ia-rust p-4 text-sm text-ia-rust">
              {error}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

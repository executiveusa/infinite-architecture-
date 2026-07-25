'use client'

import { FormEvent, useState } from 'react'
import { ArrowUpRight, CheckCircle2 } from 'lucide-react'

const PROJECT_TYPES = [
  'Airbnb or boutique stay',
  'Glamping or retreat site',
  'Off-grid home or compound',
  'Land concept or feasibility',
  'Real-estate 3D visualization',
  'Existing property transformation',
  'Other',
]

const PROJECT_STAGES = [
  'I have an idea',
  'I own or control land',
  'I have plans or a floor plan',
  'I have an existing property',
  'I am already speaking with builders',
  'Construction has started',
]

const BUDGET_RANGES = [
  'Still researching',
  'Under $25,000',
  '$25,000–$75,000',
  '$75,000–$150,000',
  '$150,000–$300,000',
  '$300,000+',
]

export default function ProjectIntake() {
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') ?? '').trim()
    const email = String(form.get('email') ?? '').trim()
    const projectType = String(form.get('projectType') ?? '').trim()
    const location = String(form.get('location') ?? '').trim()
    const stage = String(form.get('stage') ?? '').trim()
    const budget = String(form.get('budget') ?? '').trim()
    const outcome = String(form.get('outcome') ?? '').trim()
    const propertyLink = String(form.get('propertyLink') ?? '').trim()
    const phone = String(form.get('phone') ?? '').trim()

    if (!name || !email || !projectType || !location || !stage || !budget || !outcome) {
      setError('Complete the required fields so the project can be reviewed properly.')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address.')
      return
    }

    const subject = encodeURIComponent(
      `Infinite Architecture inquiry — ${projectType} — ${location}`
    )
    const body = encodeURIComponent(
      [
        'INFINITE ARCHITECTURE PROJECT INQUIRY',
        '',
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone / WhatsApp: ${phone || 'Not provided'}`,
        `Project type: ${projectType}`,
        `Location: ${location}`,
        `Current stage: ${stage}`,
        `Approximate budget: ${budget}`,
        `Property / listing / plan link: ${propertyLink || 'Not provided'}`,
        '',
        'Desired outcome:',
        outcome,
        '',
        'Please attach any plans, photos, surveys, or inspiration images to this email before sending.',
      ].join('\n')
    )

    setSubmitted(true)
    window.location.href = `mailto:executiveusa@gmail.com?subject=${subject}&body=${body}`
  }

  const inputClass =
    'w-full border-b border-ia-line bg-transparent px-0 py-3 text-sm text-ia-ink outline-none transition-colors placeholder:text-ia-ink/[0.40] focus:border-ia-ink'

  return (
    <form onSubmit={handleSubmit} className="grid gap-8" noValidate>
      <div className="grid gap-6 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="ia-form-label">Your name *</span>
          <input name="name" autoComplete="name" className={inputClass} required />
        </label>

        <label className="grid gap-2">
          <span className="ia-form-label">Email *</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            className={inputClass}
            required
          />
        </label>

        <label className="grid gap-2">
          <span className="ia-form-label">Phone or WhatsApp</span>
          <input name="phone" autoComplete="tel" className={inputClass} />
        </label>

        <label className="grid gap-2">
          <span className="ia-form-label">Project location *</span>
          <input
            name="location"
            placeholder="Puerto Vallarta, Sayulita, another region..."
            className={inputClass}
            required
          />
        </label>

        <label className="grid gap-2">
          <span className="ia-form-label">Project type *</span>
          <select name="projectType" defaultValue="" className={inputClass} required>
            <option value="" disabled>
              Select one
            </option>
            {PROJECT_TYPES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="ia-form-label">Current stage *</span>
          <select name="stage" defaultValue="" className={inputClass} required>
            <option value="" disabled>
              Select one
            </option>
            {PROJECT_STAGES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="ia-form-label">Approximate budget *</span>
          <select name="budget" defaultValue="" className={inputClass} required>
            <option value="" disabled>
              Select one
            </option>
            {BUDGET_RANGES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="ia-form-label">Property, listing, or plan link</span>
          <input
            name="propertyLink"
            type="url"
            placeholder="https://"
            className={inputClass}
          />
        </label>
      </div>

      <label className="grid gap-2">
        <span className="ia-form-label">What should this project become? *</span>
        <textarea
          name="outcome"
          rows={5}
          placeholder="Describe the guest experience, land, current problem, and the result you want."
          className={`${inputClass} resize-y`}
          required
        />
      </label>

      {error && (
        <p role="alert" className="text-sm text-red-800">
          {error}
        </p>
      )}

      {submitted && (
        <div className="flex items-start gap-3 border border-ia-line bg-ia-paper p-4 text-sm text-ia-ink">
          <CheckCircle2 className="mt-0.5 shrink-0" size={18} />
          <p>
            Your email app should open with the project summary. Attach any plans or photos, then
            send the message. No information is stored by this preview form.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-4 border-t border-ia-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-xs leading-relaxed text-ia-ink/[0.55]">
          This starts a fit review, not a construction contract. Licensed design, engineering,
          permitting, and regulated trade work remain with qualified local professionals.
        </p>
        <button
          type="submit"
          className="group inline-flex min-h-12 items-center justify-center gap-3 bg-ia-ink px-6 py-3 text-sm font-medium text-ia-paper transition-colors hover:bg-ia-leaf"
        >
          Prepare inquiry
          <ArrowUpRight
            size={17}
            className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </button>
      </div>
    </form>
  )
}

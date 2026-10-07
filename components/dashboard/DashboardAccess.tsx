'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, LockKeyhole } from 'lucide-react'

export default function DashboardAccess() {
  const router = useRouter()
  const [secret, setSecret] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoading(true)
    try {
      const response = await fetch('/api/dashboard-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret }),
      })
      const data = await response.json()
      if (!response.ok) {
        setError(data.error ?? 'Access denied.')
        return
      }
      router.replace('/dashboard/studio')
      router.refresh()
    } catch {
      setError('The private studio could not be reached.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-bg-base text-ia-text flex items-center justify-center px-5">
      <section className="w-full max-w-md dashboard-panel p-7 md:p-9">
        <div className="flex items-center gap-3 text-ia-orange mb-7">
          <LockKeyhole size={18} />
          <span className="label-text text-ia-orange">PRIVATE OWNER STUDIO</span>
        </div>
        <h1 className="text-3xl font-black">Infinite Architecture</h1>
        <p className="mt-3 text-sm leading-relaxed text-ia-secondary">
          Private concept, 3D, supplier, costing, and coordination workspace.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-5">
          <label className="block">
            <span className="label-text text-ia-muted block mb-2">ACCESS KEY</span>
            <input
              type="password"
              value={secret}
              onChange={(event) => setSecret(event.target.value)}
              autoComplete="current-password"
              className="w-full bg-bg-elevated border border-ia-border px-4 py-3 text-sm text-ia-text outline-none focus:border-ia-orange"
              required
            />
          </label>

          {error ? <p role="alert" className="text-sm text-ia-rust">{error}</p> : null}

          <button
            type="submit"
            disabled={loading || secret.length < 12}
            className="w-full min-h-12 bg-ia-orange text-bg-base font-semibold inline-flex items-center justify-center gap-2 disabled:opacity-40"
          >
            {loading ? 'Checking…' : 'Enter private studio'}
            {!loading ? <ArrowRight size={17} /> : null}
          </button>
        </form>
      </section>
    </main>
  )
}

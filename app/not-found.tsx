import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center px-6">
      <div className="text-center">
        <span className="label-text text-ia-muted block mb-4">404</span>
        <h1 className="text-display-lg font-black text-ia-text mb-4">Not Found</h1>
        <p className="text-ia-secondary mb-8">This page does not exist in the knowledge base.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-ia-orange text-bg-base label-text px-5 py-2.5 hover:bg-ia-text transition-colors"
        >
          RETURN HOME
        </Link>
      </div>
    </div>
  )
}

import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-ia-border bg-bg-base">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex flex-col leading-none mb-4">
              <span className="label-text text-ia-muted">INFINITE</span>
              <span className="text-sm font-bold tracking-widest text-ia-text uppercase">ARCHITECTURE</span>
            </div>
            <p className="text-xs text-ia-muted leading-relaxed">
              Free construction knowledge.
              Open-source build systems.
              Puerto Vallarta, Jalisco, México.
            </p>
          </div>

          {/* Knowledge */}
          <div>
            <p className="label-text text-ia-muted mb-4">KNOWLEDGE</p>
            <nav className="flex flex-col gap-2">
              {[
                ['Build Systems', '/build-systems'],
                ['Materials', '/materials'],
                ['Guides', '/guides'],
                ['Field Notes', '/field-notes'],
                ['Lab', '/lab'],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="text-xs text-ia-secondary hover:text-ia-text transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Build Systems */}
          <div>
            <p className="label-text text-ia-muted mb-4">BUILD SYSTEMS</p>
            <nav className="flex flex-col gap-2">
              {[
                'Foam-Core Cement Panel',
                'Ferrocement Barrel Roof',
                'XPS Kitchen Counter',
                'Raised Bed System',
                'Outdoor Kitchen',
                'Bathroom / Shower Form',
              ].map((name) => (
                <span key={name} className="text-xs text-ia-muted">
                  {name}
                </span>
              ))}
            </nav>
          </div>

          {/* Safety */}
          <div>
            <p className="label-text text-ia-muted mb-4">IMPORTANT</p>
            <nav className="flex flex-col gap-2">
              <Link
                href="/safety"
                className="text-xs text-ia-orange hover:text-ia-text transition-colors"
              >
                Safety Canon
              </Link>
              <p className="text-xs text-ia-muted leading-relaxed mt-2">
                Infinite Architecture provides free construction knowledge — not engineering certification.
                Always obtain local permits and engineering review for structural and inhabited-space work.
              </p>
            </nav>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-ia-border-subtle flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="label-text text-ia-muted">
            © {year} INFINITE ARCHITECTURE — FREE & OPEN SOURCE
          </p>
          <p className="label-text text-ia-muted">
            PUERTO VALLARTA, JALISCO, MÉXICO
          </p>
        </div>
      </div>
    </footer>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/build-systems', label: 'Build Systems' },
  { href: '/field-notes', label: 'Field Notes' },
  { href: '/materials', label: 'Materials' },
  { href: '/guides', label: 'Guides' },
  { href: '/lab', label: 'Lab' },
]

export default function NavBar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const isDashboard = pathname.startsWith('/dashboard')

  if (isDashboard) return null

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'glass border-b border-ia-border py-3'
          : 'bg-transparent py-6'
      )}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex flex-col leading-none group"
        >
          <span className="text-[0.6rem] label-text group-hover:text-ia-orange transition-colors">
            INFINITE
          </span>
          <span className="text-sm font-bold tracking-widest text-ia-text uppercase">
            ARCHITECTURE
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'label-text hover:text-ia-text transition-colors duration-200',
                pathname === href ? 'text-ia-text' : ''
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Dashboard link */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/dashboard"
            className="label-text border border-ia-border px-3 py-1.5 hover:border-ia-orange hover:text-ia-orange transition-all duration-200"
          >
            DASHBOARD
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-ia-secondary hover:text-ia-text transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-ia-border mt-3">
          <nav className="max-w-screen-xl mx-auto px-6 py-6 flex flex-col gap-5">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="label-text hover:text-ia-text transition-colors"
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              className="label-text border border-ia-border px-3 py-2 hover:border-ia-orange hover:text-ia-orange transition-all w-fit"
              onClick={() => setOpen(false)}
            >
              DASHBOARD
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

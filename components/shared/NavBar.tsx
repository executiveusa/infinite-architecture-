'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/#studio', label: 'Studio' },
  { href: '/#projects', label: 'Projects' },
  { href: '/#build-types', label: 'Build Types' },
  { href: '/field-notes', label: 'Field Notes' },
]

export default function NavBar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 36)
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  if (pathname.startsWith('/dashboard')) return null

  const isHome = pathname === '/'
  const editorialState = isHome && !scrolled

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-all duration-500',
        editorialState
          ? 'border-transparent bg-transparent py-5 text-ia-paper'
          : isHome
            ? 'border-ia-line bg-ia-paper/[0.92] py-3 text-ia-ink backdrop-blur-xl'
            : 'border-ia-border bg-bg-base/[0.88] py-3 text-ia-text backdrop-blur-xl'
      )}
    >
      <div className="mx-auto flex max-w-[1540px] items-center justify-between px-5 sm:px-8 md:px-12 lg:px-16 xl:px-24">
        <Link href="/" className="group flex flex-col leading-none" aria-label="Infinite Architecture home">
          <span
            className={cn(
              'text-[0.58rem] font-medium uppercase tracking-[0.22em] transition-opacity',
              editorialState ? 'text-ia-paper/[0.70]' : isHome ? 'text-ia-ink/[0.52]' : 'text-ia-muted'
            )}
          >
            Infinite
          </span>
          <span className="mt-1 font-display text-[1.05rem] uppercase tracking-[0.02em]">
            Architecture
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'text-[0.7rem] font-medium uppercase tracking-[0.14em] transition-opacity hover:opacity-55',
                !isHome && pathname === href ? 'opacity-100' : 'opacity-80'
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/#start"
            className={cn(
              'group inline-flex min-h-10 items-center gap-2 border px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.12em] transition-colors',
              editorialState
                ? 'border-white/[0.55] text-ia-paper hover:bg-white hover:text-ia-ink'
                : isHome
                  ? 'border-ia-ink bg-ia-ink text-ia-paper hover:bg-ia-leaf'
                  : 'border-ia-border text-ia-text hover:border-ia-orange hover:text-ia-orange'
            )}
          >
            Start a concept
            <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div
          id="mobile-navigation"
          className={cn(
            'mt-3 border-t px-5 py-6 sm:px-8',
            isHome ? 'border-ia-line bg-ia-paper text-ia-ink' : 'border-ia-border bg-bg-base text-ia-text'
          )}
        >
          <nav className="mx-auto flex max-w-[1540px] flex-col" aria-label="Mobile navigation">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  'border-b py-4 font-editorial text-3xl',
                  isHome ? 'border-ia-line' : 'border-ia-border-subtle'
                )}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/#start"
              className={cn(
                'mt-6 inline-flex min-h-12 items-center justify-center gap-3 px-5 py-3 text-sm font-medium',
                isHome ? 'bg-ia-ink text-ia-paper' : 'bg-ia-orange text-bg-base'
              )}
              onClick={() => setOpen(false)}
            >
              Start a concept
              <ArrowUpRight size={17} />
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

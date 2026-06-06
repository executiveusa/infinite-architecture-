'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  FileText,
  Package,
  Wrench,
  Share2,
  MessageSquare,
  GitBranch,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Command Center' },
  { href: '/dashboard/editorial', icon: FileText, label: 'Editorial Pipeline' },
  { href: '/dashboard/materials', icon: Package, label: 'Material Registry' },
  { href: '/dashboard/build-systems', icon: Wrench, label: 'Build Systems' },
  { href: '/dashboard/social', icon: Share2, label: 'Social Studio' },
  { href: '/dashboard/pi-agent', icon: MessageSquare, label: 'Pi Agent' },
  { href: '/dashboard/beads', icon: GitBranch, label: 'Beads Timeline' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-bg-base flex">
      {/* Nav Rail */}
      <aside className="fixed top-0 left-0 bottom-0 w-16 bg-bg-surface border-r border-ia-border flex flex-col items-center py-6 gap-2 z-50">
        {/* Logo dot */}
        <div className="w-8 h-8 border border-ia-orange flex items-center justify-center mb-6">
          <div className="w-2 h-2 bg-ia-orange rounded-full" />
        </div>

        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              title={label}
              className={cn(
                'relative w-10 h-10 flex items-center justify-center transition-colors duration-200 group',
                isActive ? 'text-ia-orange' : 'text-ia-muted hover:text-ia-secondary'
              )}
            >
              <Icon size={18} />
              {isActive && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-ia-orange" />
              )}
              {/* Tooltip */}
              <div className="absolute left-14 top-1/2 -translate-y-1/2 bg-bg-elevated border border-ia-border px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 whitespace-nowrap">
                <span className="label-text text-ia-text">{label}</span>
              </div>
            </Link>
          )
        })}
      </aside>

      {/* Main area */}
      <div className="flex-1 ml-16">
        {/* Top bar */}
        <header className="h-14 border-b border-ia-border flex items-center justify-between px-6 bg-bg-surface sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <span className="label-text text-ia-text">INFINITE ARCHITECTURE</span>
            <span className="label-text text-ia-muted">//</span>
            <span className="label-text text-ia-muted">DASHBOARD</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-ia-sage rounded-full animate-pulse-slow" />
              <span className="label-text text-ia-sage">SYSTEM ACTIVE</span>
            </div>
            <Link
              href="/"
              className="label-text text-ia-muted hover:text-ia-text transition-colors"
            >
              ← PUBLIC SITE
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  )
}

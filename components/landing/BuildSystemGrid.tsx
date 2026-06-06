'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { BuildSystem } from '@/lib/types'
import { DIFFICULTY_COLORS, TEST_STATUS_LABELS } from '@/lib/types'
import { formatMXN, cn } from '@/lib/utils'

interface BuildSystemGridProps {
  systems: BuildSystem[]
}

export default function BuildSystemGrid({ systems }: BuildSystemGridProps) {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    async function init() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (!sectionRef.current) return

      const cards = sectionRef.current.querySelectorAll('.build-card-animated')

      gsap.fromTo(
        cards,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      )
    }

    init()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-bg-surface border-t border-ia-border"
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="flex items-end justify-between mb-16">
          <div>
            <span className="label-text text-ia-orange block mb-4">BUILD SYSTEMS</span>
            <h2 className="text-display-md font-black text-ia-text">
              Open construction<br />knowledge base.
            </h2>
          </div>
          <Link
            href="/build-systems"
            className="hidden md:inline-flex items-center gap-2 label-text text-ia-secondary hover:text-ia-orange transition-colors"
          >
            VIEW ALL <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ia-border">
          {systems.map((system) => (
            <Link
              key={system.id}
              href={`/build-systems/${system.id}`}
              className="build-card-animated build-card bg-bg-surface p-8 flex flex-col gap-5 opacity-0 group"
            >
              {/* Category + difficulty */}
              <div className="flex items-center gap-3">
                <span className="label-text text-ia-muted border border-ia-border px-2 py-1">
                  {system.category.toUpperCase().replace('-', ' ')}
                </span>
                <span
                  className={cn(
                    'label-text border px-2 py-1',
                    DIFFICULTY_COLORS[system.difficulty]
                  )}
                >
                  {system.difficulty.toUpperCase()}
                </span>
              </div>

              {/* Thumbnail placeholder */}
              <div className="aspect-video bg-bg-elevated border border-ia-border flex items-center justify-center">
                <span className="label-text text-ia-muted">
                  {system.category.toUpperCase().replace('-', ' ')}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-ia-text group-hover:text-ia-orange transition-colors leading-tight">
                {system.title}
              </h3>

              {/* Summary */}
              <p className="text-sm text-ia-secondary leading-relaxed line-clamp-2">
                {system.summary}
              </p>

              {/* Meta row */}
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-ia-border-subtle">
                <span className="label-text text-ia-muted">
                  {TEST_STATUS_LABELS[system.test_status]}
                </span>
                {system.estimated_cost_mxn && (
                  <span className="label-text text-ia-gold">
                    ~{formatMXN(system.estimated_cost_mxn)}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link
            href="/build-systems"
            className="inline-flex items-center gap-2 label-text text-ia-secondary hover:text-ia-orange transition-colors"
          >
            VIEW ALL SYSTEMS <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}

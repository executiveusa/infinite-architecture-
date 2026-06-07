'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { AlertTriangle, ArrowRight } from 'lucide-react'
import type { Material } from '@/lib/types'

interface MaterialLabProps {
  materials: Material[]
}

const CATEGORY_LABELS: Record<string, string> = {
  foam: 'FOAM',
  reinforcement: 'REINFORCEMENT',
  binder: 'BINDER',
  aggregate: 'AGGREGATE',
  admixture: 'ADMIXTURE',
  adhesive: 'ADHESIVE',
  other: 'OTHER',
}

export default function MaterialLab({ materials }: MaterialLabProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function init() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (!sectionRef.current) return

      gsap.fromTo(
        sectionRef.current.querySelector('.lab-header'),
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      )
    }

    init()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-bg-base border-t border-ia-border overflow-hidden"
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="lab-header flex items-end justify-between mb-12 opacity-0">
          <div>
            <span className="label-text text-ia-blue block mb-4">MATERIAL LABORATORY</span>
            <h2 className="text-display-md font-black text-ia-text">
              Puerto Vallarta<br />material registry.
            </h2>
          </div>
          <Link
            href="/materials"
            className="hidden md:inline-flex items-center gap-2 label-text text-ia-secondary hover:text-ia-blue transition-colors"
          >
            FULL REGISTRY <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Horizontal scroll strip */}
      <div
        ref={scrollContainerRef}
        className="flex gap-px overflow-x-auto scrollbar-none pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex-shrink-0 w-6 md:w-12 lg:w-16" />
        {materials.map((material) => (
          <Link
            key={material.id}
            href={`/materials/${material.id}`}
            className="flex-shrink-0 w-72 bg-bg-surface border border-ia-border p-8 flex flex-col gap-4 group hover:border-ia-blue transition-colors duration-200"
          >
            {/* Category badge */}
            <span className="label-text text-ia-blue border border-ia-blue border-opacity-40 px-2 py-1 w-fit">
              {CATEGORY_LABELS[material.category] ?? material.category.toUpperCase()}
            </span>

            {/* Name */}
            <div>
              <h3 className="text-lg font-bold text-ia-text group-hover:text-ia-blue transition-colors leading-tight">
                {material.name}
              </h3>
              <p className="text-sm text-ia-muted mt-1 italic">{material.spanish_name}</p>
            </div>

            {/* Best uses */}
            <div>
              <p className="label-text text-ia-muted mb-2">BEST USES</p>
              <ul className="space-y-1">
                {material.best_uses.slice(0, 2).map((use) => (
                  <li key={use} className="text-xs text-ia-secondary leading-relaxed">
                    — {use}
                  </li>
                ))}
              </ul>
            </div>

            {/* Risk indicator */}
            {material.risks.length > 0 && (
              <div className="flex items-center gap-2 mt-auto pt-4 border-t border-ia-border-subtle">
                <AlertTriangle size={12} className="text-ia-orange" />
                <span className="label-text text-ia-orange">{material.risks.length} RISK NOTE{material.risks.length > 1 ? 'S' : ''}</span>
              </div>
            )}
          </Link>
        ))}
        <div className="flex-shrink-0 w-6 md:w-12 lg:w-16" />
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16 mt-8 md:hidden">
        <Link
          href="/materials"
          className="inline-flex items-center gap-2 label-text text-ia-secondary hover:text-ia-blue transition-colors"
        >
          FULL MATERIAL REGISTRY <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import { BookOpen, MapPin, Shield } from 'lucide-react'

const PILLARS = [
  {
    icon: BookOpen,
    title: 'FREE KNOWLEDGE',
    body: 'All construction systems are free and open source. No paywalls. No subscriptions. Build anything.',
  },
  {
    icon: MapPin,
    title: 'LOCAL-FIRST',
    body: 'Primary experiments in Puerto Vallarta, Jalisco, México. Materials sourced and priced locally.',
  },
  {
    icon: Shield,
    title: 'SAFETY-AWARE',
    body: 'Safety canon enforced across all content. No structural claims without evidence. Engineering disclaimers on every spanning system.',
  },
]

export default function Mission() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    async function init() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      if (!sectionRef.current) return

      const cards = sectionRef.current.querySelectorAll('.mission-card')

      gsap.fromTo(
        cards,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
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
      className="py-32 bg-bg-base border-t border-ia-border"
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Section label */}
        <span className="label-text text-ia-orange block mb-6">MISSION</span>

        {/* Section heading */}
        <h2 className="text-display-md font-black text-ia-text mb-4">
          Free, open, and local.
        </h2>
        <p className="text-ia-secondary max-w-2xl mb-20 text-lg leading-relaxed">
          Infinite Architecture exists to put real construction knowledge in the hands of builders,
          makers, and experimenters — without cost, without gatekeeping.
        </p>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-ia-border">
          {PILLARS.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="mission-card bg-bg-base p-10 flex flex-col gap-6 opacity-0"
            >
              <div className="w-10 h-10 border border-ia-border flex items-center justify-center">
                <Icon size={18} className="text-ia-orange" />
              </div>
              <div>
                <p className="label-text text-ia-text mb-3">{title}</p>
                <p className="text-ia-secondary text-sm leading-relaxed">{body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

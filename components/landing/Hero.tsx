'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'

export default function Hero() {
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let gsap: typeof import('gsap').gsap | undefined

    async function init() {
      const gsapModule = await import('gsap')
      gsap = gsapModule.gsap

      if (!titleRef.current) return

      const words = titleRef.current.querySelectorAll('.hero-word')
      const tl = gsap.timeline()

      tl.fromTo(
        labelRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      )
        .fromTo(
          words,
          { opacity: 0, y: 60, skewY: 2 },
          {
            opacity: 1,
            y: 0,
            skewY: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
          },
          '-=0.2'
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
          '-=0.4'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
          '-=0.3'
        )
        .fromTo(
          scrollRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: 'power2.out' },
          '+=0.4'
        )
    }

    init()
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden grain-overlay">
      {/* Background layers */}
      <div className="absolute inset-0 bg-bg-base" />

      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 blueprint-grid opacity-40" />

      {/* Gradient vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-bg-base via-transparent to-bg-base pointer-events-none" />

      {/* Horizontal accent line */}
      <div className="absolute top-1/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ia-border to-transparent opacity-60" />

      {/* Content */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16 pt-32 pb-24">
        {/* Label */}
        <span
          ref={labelRef}
          className="label-text text-ia-orange opacity-0 block mb-8"
          style={{ opacity: 0 }}
        >
          OPEN-SOURCE CONSTRUCTION KNOWLEDGE — PUERTO VALLARTA, MX
        </span>

        {/* Title */}
        <div
          ref={titleRef}
          className="overflow-hidden"
          aria-label="Infinite Architecture"
        >
          {['INFINITE', 'ARCHITECTURE'].map((word) => (
            <div key={word} className="overflow-hidden">
              <span
                className="hero-word block text-display-xl font-black text-ia-text leading-none tracking-tighter"
                style={{ opacity: 0 }}
              >
                {word}
              </span>
            </div>
          ))}
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-8 text-lg text-ia-secondary max-w-2xl leading-relaxed"
          style={{ opacity: 0 }}
        >
          Free construction systems for foam, ferrocement, thin-shell concrete,
          and climate-aware DIY infrastructure. Every system field-tested in the
          Puerto Vallarta material laboratory.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="mt-12 flex flex-wrap items-center gap-4"
          style={{ opacity: 0 }}
        >
          <Link
            href="/build-systems"
            className="inline-flex items-center gap-2 bg-ia-orange text-bg-base text-sm font-bold tracking-wide px-6 py-3 hover:bg-ia-text transition-colors duration-200"
          >
            Explore Build Systems
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/safety"
            className="inline-flex items-center gap-2 border border-ia-border text-ia-secondary text-sm tracking-wide px-6 py-3 hover:border-ia-orange hover:text-ia-orange transition-all duration-200 label-text"
          >
            READ SAFETY CANON
          </Link>
        </div>

        {/* Stats strip */}
        <div className="mt-20 flex flex-wrap gap-12 border-t border-ia-border-subtle pt-10">
          {[
            { value: '8', label: 'Build Systems' },
            { value: '9+', label: 'Materials Registered' },
            { value: '100%', label: 'Free & Open Source' },
            { value: 'PV', label: 'Puerto Vallarta Lab' },
          ].map(({ value, label }) => (
            <div key={label}>
              <div className="text-2xl font-bold text-ia-text">{value}</div>
              <div className="label-text text-ia-muted mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
      >
        <span className="label-text text-ia-muted">SCROLL</span>
        <ChevronDown size={14} className="text-ia-muted animate-bounce" />
      </div>
    </section>
  )
}

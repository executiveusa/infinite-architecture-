import type { Metadata } from 'next'
import { BookOpen, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Guides',
  description: 'Beginner-friendly construction tutorials for foam, ferrocement, and thin-shell cement systems.',
}

const GUIDES = [
  {
    id: 'test-panel-protocol',
    title: 'How to Run a Test Panel',
    subtitle: 'The first step before any build.',
    difficulty: 'BEGINNER',
    readTime: '10 min',
    tags: ['test panel', 'mix ratio', 'methodology'],
    excerpt: 'Before committing to a full build, every new material combination should be tested on a 12"×12" panel. This guide walks through the complete test panel protocol.',
  },
  {
    id: 'cement-mixing-ratios',
    title: 'Cement Mix Ratios for Thin Shells',
    subtitle: 'Getting your mortar mix right.',
    difficulty: 'BEGINNER',
    readTime: '8 min',
    tags: ['cement', 'mortar', 'mix ratio', 'ferrocement'],
    excerpt: 'Thin-shell cement and ferrocement rely on precise mix ratios. Too much water creates weakness. Too little makes it unworkable. This guide covers the key ratios for different applications.',
  },
  {
    id: 'damp-curing',
    title: 'Damp Curing: Why It Matters',
    subtitle: 'The step most DIY builders skip.',
    difficulty: 'BEGINNER',
    readTime: '6 min',
    tags: ['curing', 'cement', 'quality'],
    excerpt: 'Cement doesn\'t dry — it cures through a chemical hydration process that requires moisture. Skipping damp curing is the #1 cause of cracked and weak cement panels.',
  },
  {
    id: 'waterproofing-sequence',
    title: 'Waterproofing Sequence for Wet Areas',
    subtitle: 'Shower pans, countertops, and outdoor surfaces.',
    difficulty: 'INTERMEDIATE',
    readTime: '12 min',
    tags: ['waterproofing', 'shower', 'counter', 'outdoor'],
    excerpt: 'The sequence of waterproofing layers matters. Apply them in the wrong order and you trap moisture rather than excluding it. This guide covers the correct sequence for common applications.',
  },
]

const DIFFICULTY_COLORS: Record<string, string> = {
  'BEGINNER': 'text-ia-sage border-ia-sage',
  'INTERMEDIATE': 'text-ia-gold border-ia-gold',
  'ADVANCED': 'text-ia-orange border-ia-orange',
}

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-bg-base pt-32 pb-24">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <div className="border-b border-ia-border pb-16 mb-16">
          <span className="label-text text-ia-sage block mb-4">GUIDES</span>
          <h1 className="text-display-lg font-black text-ia-text mb-6">
            Beginner-friendly<br />construction guides.
          </h1>
          <p className="text-lg text-ia-secondary max-w-2xl leading-relaxed">
            Step-by-step tutorials for the core techniques. Safety notes included.
            Local Puerto Vallarta context throughout.
          </p>
        </div>

        {/* Guides grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-ia-border">
          {GUIDES.map((guide) => (
            <article
              key={guide.id}
              className="bg-bg-base p-8 flex flex-col gap-4 group hover:bg-bg-surface transition-colors duration-200"
            >
              {/* Badges */}
              <div className="flex items-center gap-3">
                <span className={`label-text border px-2 py-1 ${DIFFICULTY_COLORS[guide.difficulty] ?? 'text-ia-muted border-ia-border'}`}>
                  {guide.difficulty}
                </span>
                <div className="flex items-center gap-1.5 label-text text-ia-muted">
                  <Clock size={11} />
                  {guide.readTime}
                </div>
              </div>

              {/* Content */}
              <div>
                <h2 className="text-xl font-bold text-ia-text mb-1 group-hover:text-ia-sage transition-colors leading-tight">
                  {guide.title}
                </h2>
                <p className="text-sm text-ia-muted">{guide.subtitle}</p>
              </div>

              <p className="text-sm text-ia-secondary leading-relaxed flex-1">{guide.excerpt}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 pt-4 border-t border-ia-border-subtle">
                {guide.tags.map((tag) => (
                  <span key={tag} className="label-text text-ia-muted border border-ia-border px-1.5 py-0.5">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Coming soon */}
        <div className="mt-16 p-8 border border-ia-border bg-bg-surface">
          <div className="flex items-start gap-4">
            <BookOpen size={20} className="text-ia-sage mt-1" />
            <div>
              <p className="label-text text-ia-sage mb-2">MORE GUIDES IN PROGRESS</p>
              <p className="text-sm text-ia-secondary">
                The Construction Editor agent is processing field notes into guides.
                Check back soon for guides on mix ratios, mesh layering, barrel roof forming,
                and material substitutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

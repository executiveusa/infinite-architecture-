import type { Metadata } from 'next'
import { AlertTriangle, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Safety Canon',
  description: 'Safety requirements and disclaimers for all Infinite Architecture construction systems.',
}

export default function SafetyPage() {
  return (
    <div className="min-h-screen bg-bg-base pt-32 pb-24">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 lg:px-16">
        <div className="border-b border-ia-border pb-16 mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 border border-ia-orange flex items-center justify-center">
              <Shield size={18} className="text-ia-orange" />
            </div>
            <span className="label-text text-ia-orange">SAFETY CANON</span>
          </div>
          <h1 className="text-display-lg font-black text-ia-text mb-6">
            Safety First.<br />Always.
          </h1>
          <p className="text-lg text-ia-secondary max-w-2xl leading-relaxed">
            Infinite Architecture provides free construction knowledge — not engineering certification.
            This page outlines the safety requirements enforced across all content.
          </p>
        </div>

        {/* Engineering note */}
        <div className="border border-ia-orange bg-ia-rust bg-opacity-10 p-8 mb-12">
          <div className="flex items-start gap-4">
            <AlertTriangle size={20} className="text-ia-orange mt-1 flex-shrink-0" />
            <div>
              <p className="text-ia-orange font-bold mb-3">MANDATORY ENGINEERING NOTE</p>
              <p className="text-ia-secondary leading-relaxed">
                Any inhabited structure, load-bearing element, spanning roof, retaining wall, or elevated platform
                must be reviewed by a licensed local engineer and must comply with local building codes.
                Infinite Architecture provides open knowledge — not engineering certification.
                Always obtain proper permits and inspections.
              </p>
            </div>
          </div>
        </div>

        {/* Risk table */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-ia-text mb-8">Risk Categories</h2>
          <div className="space-y-px">
            {[
              { level: 'LOW', color: 'text-ia-sage', desc: 'Decorative elements, garden beds, non-load-bearing planters', action: 'Safety note only' },
              { level: 'MEDIUM', color: 'text-ia-gold', desc: 'Countertops, sinks, outdoor kitchens, freestanding walls', action: 'Material warnings + cure protocol' },
              { level: 'HIGH', color: 'text-ia-orange', desc: 'Roofs, spanning structures, load-bearing walls, inhabited structures', action: 'Engineer disclaimer + local permit note required' },
              { level: 'CRITICAL', color: 'text-ia-rust', desc: 'Retaining walls over 1m, elevated floors, bridges', action: 'Blocked from publication until engineer review documented' },
            ].map(({ level, color, desc, action }) => (
              <div key={level} className="grid grid-cols-3 gap-4 p-6 bg-bg-surface border border-ia-border">
                <span className={`label-text font-bold ${color}`}>{level}</span>
                <p className="text-sm text-ia-secondary">{desc}</p>
                <p className="text-sm text-ia-muted">{action}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Material hazards */}
        <div>
          <h2 className="text-xl font-bold text-ia-text mb-8">Material Hazards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                material: 'Foam (XPS / EPS)',
                hazards: [
                  'COMBUSTIBLE — must always be fully encapsulated',
                  'UV degradation if left uncoated',
                  'Toxic smoke when burned',
                ],
              },
              {
                material: 'Portland Cement',
                hazards: [
                  'Caustic when wet — use gloves and eye protection',
                  'Requires damp curing 7–28 days',
                  'Wrong water:cement ratio causes weakness',
                ],
              },
              {
                material: 'Fiberglass Mesh',
                hazards: [
                  'Ordinary fiberglass is NOT alkali-resistant',
                  'Non-AR mesh degrades rapidly in cement',
                  'Always confirm AR rating before purchase',
                ],
              },
              {
                material: 'Adhesives & Admixtures',
                hazards: [
                  'Pegapiso: thin bond coat only — not structural',
                  'SikaLatex: follow dilution ratios exactly',
                  'Overuse of admixtures can trap moisture',
                ],
              },
            ].map(({ material, hazards }) => (
              <div key={material} className="bg-bg-surface border border-ia-border p-6">
                <p className="label-text text-ia-text mb-4">{material.toUpperCase()}</p>
                <ul className="space-y-2">
                  {hazards.map(h => (
                    <li key={h} className="flex items-start gap-3 text-sm text-ia-secondary">
                      <AlertTriangle size={12} className="text-ia-orange mt-0.5 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

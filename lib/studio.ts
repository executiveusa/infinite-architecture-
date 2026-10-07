import { z } from 'zod'

export const StudioPlanInputSchema = z.object({
  message: z.string().trim().min(8).max(6000),
  projectId: z.string().trim().min(1).max(120).optional(),
})

export const CostSourceStatusSchema = z.enum(['verified-quote', 'estimate', 'allowance'])

export const CostTemplateLineSchema = z.object({
  label: z.string(),
  category: z.string(),
  sourceStatus: CostSourceStatusSchema,
})

export const ConceptDirectionSchema = z.object({
  title: z.string(),
  rationale: z.string(),
  supplierCategory: z.string(),
  visualizationFocus: z.string(),
})

export const StudioBriefSchema = z.object({
  projectId: z.string(),
  projectName: z.string(),
  summary: z.string(),
  location: z.string(),
  propertyType: z.string(),
  targetUnits: z.number().int().positive().nullable(),
  assumptions: z.array(z.string()),
  nextQuestions: z.array(z.string()),
  conceptDirections: z.array(ConceptDirectionSchema).min(1).max(6),
  costTemplate: z.array(CostTemplateLineSchema).min(1),
  safetyBoundary: z.string(),
})

export type StudioBrief = z.infer<typeof StudioBriefSchema>

export const EstimateLineSchema = z.object({
  label: z.string().trim().min(1).max(160),
  category: z.string().trim().min(1).max(120),
  quantity: z.number().positive(),
  unitCost: z.number().nonnegative(),
  sourceStatus: CostSourceStatusSchema,
  notes: z.string().max(600).optional().default(''),
})

export const EstimateInputSchema = z.object({
  currency: z.enum(['MXN', 'USD']).default('MXN'),
  targetMarginPct: z.number().min(5).max(60).default(30),
  lineItems: z.array(EstimateLineSchema).min(1).max(80),
})

export function calculateOffer(input: z.infer<typeof EstimateInputSchema>) {
  const landedCost = input.lineItems.reduce(
    (sum, line) => sum + line.quantity * line.unitCost,
    0
  )
  const marginRate = input.targetMarginPct / 100
  const sellingPrice = landedCost === 0 ? 0 : landedCost / (1 - marginRate)
  const grossProfit = sellingPrice - landedCost
  const unverified = input.lineItems
    .filter((line) => line.sourceStatus !== 'verified-quote')
    .map((line) => line.label)

  return {
    currency: input.currency,
    targetMarginPct: input.targetMarginPct,
    landedCost,
    sellingPrice,
    grossProfit,
    markupPctOnCost: landedCost === 0 ? 0 : (grossProfit / landedCost) * 100,
    warnings: [
      ...(unverified.length
        ? [`Unverified cost inputs: ${unverified.join(', ')}.`]
        : []),
      'Internal offer math only. Taxes, financing, permits, professional fees, and exclusions must be explicit if they are not already line items.',
      'Compensation and supplier margins must be disclosed as required by the client contract and applicable law.',
    ],
  }
}

export const BlenderJobInputSchema = z.object({
  projectId: z.string().trim().min(1).max(120),
  projectName: z.string().trim().min(1).max(200),
  location: z.string().trim().min(1).max(200),
  structureType: z.string().trim().min(1).max(160),
  targetUnits: z.number().int().min(1).max(100).default(1),
  outputs: z
    .array(z.enum(['blend', 'glb', 'stills', 'walkthrough']))
    .min(1)
    .default(['blend', 'glb', 'stills']),
})

function detectPropertyType(message: string) {
  const lower = message.toLowerCase()
  if (lower.includes('glamp')) return 'Glamping / retreat'
  if (lower.includes('airbnb') || lower.includes('vacation rental')) return 'Airbnb / hospitality'
  if (lower.includes('off-grid') || lower.includes('off grid')) return 'Off-grid property'
  if (lower.includes('real estate') || lower.includes('listing')) return 'Real-estate visualization'
  return 'Biophilic property concept'
}

function detectUnits(message: string) {
  const match = message.match(/\b(\d{1,2})\s+(?:domes?|units?|cabins?|pods?|villas?|structures?)\b/i)
  return match ? Number(match[1]) : null
}

function detectLocation(message: string) {
  const known = ['Puerto Vallarta', 'Sayulita', 'Riviera Nayarit', 'Mexico City']
  return known.find((place) => message.toLowerCase().includes(place.toLowerCase())) ?? 'Needs confirmation'
}

export function buildFallbackBrief(message: string, projectId?: string): StudioBrief {
  const propertyType = detectPropertyType(message)
  const targetUnits = detectUnits(message)
  const location = detectLocation(message)
  const lower = message.toLowerCase()
  const dome = lower.includes('dome')
  const projectName = targetUnits
    ? `${targetUnits}-unit ${dome ? 'dome ' : ''}${propertyType} concept`
    : `${propertyType} concept`

  const nextQuestions = [
    ...(location === 'Needs confirmation' ? ['Where is the property?'] : []),
    ...(targetUnits === null ? ['How many guest or residential units should the concept test?'] : []),
    'Do you control the site, and do you have a survey, plan, listing, or site photos?',
    'What investment range should the concept respect before supplier quotes?',
    'What date or operating season matters?',
  ]

  return StudioBriefSchema.parse({
    projectId: projectId ?? `IA-STUDIO-${Date.now()}`,
    projectName,
    summary: message,
    location,
    propertyType,
    targetUnits,
    assumptions: [
      'This is a concept and coordination study, not construction documentation.',
      'Supplier pricing remains unverified until a written quote is attached.',
      'Local architect, engineering, permitting, and regulated trades remain separate qualified scopes.',
    ],
    nextQuestions,
    conceptDirections: [
      {
        title: dome ? 'Supplier-backed dome village' : 'Supplier-backed shelter system',
        rationale: 'Start with a repeatable primary structure, then design the site and guest experience around real supplier constraints.',
        supplierCategory: dome ? 'Geodesic dome supplier' : 'Prefabricated / specialty structure supplier',
        visualizationFocus: 'Site massing, unit placement, arrival, privacy, views, and shared amenities.',
      },
      {
        title: 'Living systems layer',
        rationale: 'Coordinate water, power, shade, ventilation, waste, planting, and maintenance before vendor decisions fragment the project.',
        supplierCategory: 'Water, solar, landscape, and site systems',
        visualizationFocus: 'Utility zones, rain flow, solar exposure, shade, planting, and service access.',
      },
      {
        title: 'Client-facing 3D story',
        rationale: 'Use Blender as the owned scene and rendering layer so the same concept can support decisions, suppliers, marketing, and investor conversations.',
        supplierCategory: '3D visualization',
        visualizationFocus: 'Aerial plan, hero stills, unit interior/exterior studies, and walkthrough path.',
      },
    ],
    costTemplate: [
      { label: 'Primary structure / supplier package', category: 'structure', sourceStatus: 'allowance' },
      { label: 'Freight, import, and last-mile delivery', category: 'logistics', sourceStatus: 'allowance' },
      { label: 'Site work and foundations', category: 'site', sourceStatus: 'allowance' },
      { label: 'Water, power, waste, and utility systems', category: 'utilities', sourceStatus: 'allowance' },
      { label: 'Local labor and installation', category: 'labor', sourceStatus: 'allowance' },
      { label: 'Landscape, planting, paths, and guest areas', category: 'landscape', sourceStatus: 'allowance' },
      { label: 'Contingency', category: 'contingency', sourceStatus: 'allowance' },
    ],
    safetyBoundary:
      'Concept visualization only. Dimensions, loads, foundations, MEP, fire/life-safety, accessibility, geotechnical conditions, permits, and construction documents require qualified local professionals.',
  })
}

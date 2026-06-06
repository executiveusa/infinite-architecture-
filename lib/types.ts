import { z } from 'zod'

// ─── MATERIAL ─────────────────────────────────────────────────────────────────

export const MaterialSchema = z.object({
  id: z.string(),
  name: z.string(),
  spanish_name: z.string(),
  category: z.enum(['foam', 'reinforcement', 'binder', 'aggregate', 'admixture', 'adhesive', 'sealant', 'other']),
  local_names: z.array(z.string()),
  common_sizes: z.array(z.string()),
  best_uses: z.array(z.string()),
  avoid_for: z.array(z.string()),
  supplier_notes: z.array(z.string()),
  price_observations: z.array(z.string()),
  risks: z.array(z.string()),
  substitutes: z.array(z.string()),
})

export type Material = z.infer<typeof MaterialSchema>

// ─── BUILD SYSTEM ─────────────────────────────────────────────────────────────

export const MixSchema = z.object({
  name: z.string(),
  ratio: z.string(),
  admixture: z.string().optional(),
})

export const BuildSystemSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  category: z.enum(['foam-composite', 'ferrocement-shell', 'research-protocol', 'masonry', 'other']),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  use_cases: z.array(z.string()),
  materials: z.array(z.string()),
  tools: z.array(z.string()),
  mixes: z.array(MixSchema),
  steps: z.array(z.string()),
  risks: z.array(z.string()),
  safety_notes: z.array(z.string()),
  local_substitutions: z.array(z.string()),
  supplier_notes: z.array(z.string()),
  estimated_cost_mxn: z.number().nullable(),
  expected_lifespan: z.string(),
  test_status: z.enum(['untested', 'sample-tested', 'field-tested']),
  related_beads: z.array(z.string()),
})

export type BuildSystem = z.infer<typeof BuildSystemSchema>

// ─── FIELD NOTE ───────────────────────────────────────────────────────────────

export const FieldNoteSchema = z.object({
  id: z.string(),
  title: z.string(),
  source: z.enum(['conversation', 'youtube', 'field-test', 'repo', 'local-note']),
  summary: z.string(),
  raw_input_path: z.string(),
  extracted_materials: z.array(z.string()),
  extracted_methods: z.array(z.object({
    name: z.string(),
    description: z.string(),
    confidence: z.enum(['high', 'medium', 'low']),
  })),
  risks: z.array(z.string()),
  draft_status: z.enum(['raw', 'processed', 'drafted', 'design-ready', 'reviewed', 'approved', 'published', 'retracted']),
  related_build_systems: z.array(z.string()),
  bead_id: z.string(),
})

export type FieldNote = z.infer<typeof FieldNoteSchema>

// ─── SOCIAL QUEUE ─────────────────────────────────────────────────────────────

export const SocialQueueItemSchema = z.object({
  id: z.string(),
  source_content: z.string(),
  platform: z.enum(['instagram', 'x', 'linkedin', 'youtube-shorts', 'tiktok', 'facebook']),
  status: z.enum(['draft', 'needs_review', 'approved', 'scheduled', 'published', 'failed']),
  caption: z.string(),
  hook: z.string(),
  visual_prompt: z.string(),
  short_video_script: z.string(),
  hashtags: z.array(z.string()),
  scheduled_for: z.string().nullable(),
  review_bead: z.string().nullable(),
})

export type SocialQueueItem = z.infer<typeof SocialQueueItemSchema>

// ─── BEAD ─────────────────────────────────────────────────────────────────────

export const BeadSchema = z.object({
  id: z.string(),
  parent: z.string().nullable(),
  phase: z.enum(['discovery', 'architecture', 'backend', 'ui', 'dashboard', 'editorial', 'automation', 'testing', 'review', 'merge']),
  status: z.enum(['planned', 'active', 'blocked', 'complete', 'failed']),
  timestamp: z.string(),
  summary: z.string(),
  decisions: z.array(z.string()),
  files_touched: z.array(z.string()),
  commands_run: z.array(z.string()),
  tests_run: z.array(z.string()),
  rollback: z.string(),
  risks: z.array(z.string()),
  next_action: z.string(),
  questions_for_bambu: z.array(z.string()),
})

export type Bead = z.infer<typeof BeadSchema>

// ─── REVIEW LOG ───────────────────────────────────────────────────────────────

export const ReviewLogEntrySchema = z.object({
  id: z.string(),
  bead_id: z.string(),
  reviewer: z.string(),
  timestamp: z.string(),
  status: z.enum(['pending', 'approved', 'approved-with-notes', 'changes-required', 'blocked']),
  blockers: z.array(z.string()),
  important: z.array(z.string()),
  nitpicks: z.array(z.string()),
  praise: z.array(z.string()),
  merge_recommendation: z.enum(['pending', 'APPROVE', 'APPROVE WITH NOTES', 'REQUEST CHANGES', 'BLOCK']),
  notes: z.string(),
})

export type ReviewLogEntry = z.infer<typeof ReviewLogEntrySchema>

// ─── UTILITY TYPES ────────────────────────────────────────────────────────────

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced'
export type SafetyLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
export type TestStatus = 'untested' | 'sample-tested' | 'field-tested'
export type BeadPhase = Bead['phase']
export type BeadStatus = Bead['status']

export const DIFFICULTY_COLORS: Record<DifficultyLevel, string> = {
  beginner: 'text-ia-sage border-ia-sage',
  intermediate: 'text-ia-gold border-ia-gold',
  advanced: 'text-ia-orange border-ia-orange',
}

export const SAFETY_COLORS: Record<SafetyLevel, string> = {
  LOW: 'text-ia-sage',
  MEDIUM: 'text-ia-gold',
  HIGH: 'text-ia-orange',
  CRITICAL: 'text-ia-rust',
}

export const TEST_STATUS_LABELS: Record<TestStatus, string> = {
  'untested': 'UNTESTED',
  'sample-tested': 'SAMPLE TESTED',
  'field-tested': 'FIELD TESTED',
}

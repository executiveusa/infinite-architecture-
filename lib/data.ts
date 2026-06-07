import { promises as fs } from 'fs'
import path from 'path'
import type { Material, BuildSystem, SocialQueueItem, Bead, ReviewLogEntry } from './types'
import { MaterialSchema, BuildSystemSchema, SocialQueueItemSchema, BeadSchema, ReviewLogEntrySchema } from './types'
import { z } from 'zod'

const DATA_DIR = path.join(process.cwd(), 'data')

async function readJSON<T>(filename: string, schema: z.ZodType<T>): Promise<T[]> {
  const filepath = path.join(DATA_DIR, filename)
  const raw = await fs.readFile(filepath, 'utf-8')
  const parsed = JSON.parse(raw)
  return z.array(schema).parse(parsed)
}

async function writeJSON(filename: string, data: unknown): Promise<void> {
  const filepath = path.join(DATA_DIR, filename)
  await fs.writeFile(filepath, JSON.stringify(data, null, 2), 'utf-8')
}

// ─── MATERIALS ───────────────────────────────────────────────────────────────

export async function getMaterials(): Promise<Material[]> {
  return readJSON('materials.json', MaterialSchema)
}

export async function getMaterial(id: string): Promise<Material | null> {
  const materials = await getMaterials()
  return materials.find(m => m.id === id) ?? null
}

// ─── BUILD SYSTEMS ────────────────────────────────────────────────────────────

export async function getBuildSystems(): Promise<BuildSystem[]> {
  return readJSON('build-systems.json', BuildSystemSchema)
}

export async function getBuildSystem(id: string): Promise<BuildSystem | null> {
  const systems = await getBuildSystems()
  return systems.find(s => s.id === id) ?? null
}

// ─── SOCIAL QUEUE ─────────────────────────────────────────────────────────────

export async function getSocialQueue(): Promise<SocialQueueItem[]> {
  return readJSON('social-queue.json', SocialQueueItemSchema)
}

export async function updateSocialItem(id: string, updates: Partial<SocialQueueItem>): Promise<void> {
  const queue = await getSocialQueue()
  const index = queue.findIndex(item => item.id === id)
  if (index === -1) throw new Error(`Social item ${id} not found`)
  queue[index] = { ...queue[index], ...updates }
  await writeJSON('social-queue.json', queue)
}

// ─── BEADS ────────────────────────────────────────────────────────────────────

export async function getBeads(): Promise<Bead[]> {
  return readJSON('beads.json', BeadSchema)
}

export async function getLatestBead(): Promise<Bead | null> {
  const beads = await getBeads()
  return beads.at(-1) ?? null
}

export async function addBead(bead: Bead): Promise<void> {
  const beads = await getBeads()
  beads.push(bead)
  await writeJSON('beads.json', beads)
}

// ─── REVIEW LOG ───────────────────────────────────────────────────────────────

export async function getReviewLog(): Promise<ReviewLogEntry[]> {
  return readJSON('review-log.json', ReviewLogEntrySchema)
}

// ─── STATS (dashboard) ────────────────────────────────────────────────────────

export async function getDashboardStats() {
  const [beads, queue] = await Promise.all([
    getBeads(),
    getSocialQueue(),
  ])

  const activeBeads = beads.filter(b => b.status === 'active').length
  const socialDrafts = queue.filter(i => i.status === 'draft').length
  const socialApproved = queue.filter(i => i.status === 'approved').length

  return {
    activeBeads,
    totalBeads: beads.length,
    latestBead: beads.at(-1) ?? null,
    socialDrafts,
    socialApproved,
  }
}

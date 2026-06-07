import { NextRequest, NextResponse } from 'next/server'
import { getBuildSystems, getMaterials, getBeads } from '@/lib/data'

const PI_AGENT_BASE_URL = process.env.PI_AGENT_BASE_URL
const PI_AGENT_API_KEY = process.env.PI_AGENT_API_KEY

async function localKnowledgeResponse(message: string): Promise<string> {
  const lower = message.toLowerCase()

  const [systems, materials, beads] = await Promise.all([
    getBuildSystems(),
    getMaterials(),
    getBeads(),
  ])

  if (lower.includes('material') || lower.includes('registry')) {
    const names = materials.map(m => `${m.name} (${m.spanish_name})`).join(', ')
    return `The material registry contains ${materials.length} materials: ${names}. You can view and edit the full registry in the Materials module.`
  }

  if (lower.includes('build system') || lower.includes('systems')) {
    const names = systems.map(s => `${s.title} [${s.test_status}]`).join(', ')
    return `There are ${systems.length} build systems: ${names}. Field-tested systems: ${systems.filter(s => s.test_status === 'field-tested').map(s => s.title).join(', ')}.`
  }

  if (lower.includes('bead')) {
    const latest = beads.at(-1)
    return latest
      ? `Latest bead: ${latest.id} | Phase: ${latest.phase} | Status: ${latest.status} | ${latest.summary}`
      : 'No beads recorded yet.'
  }

  if (lower.includes('ferrocement') || lower.includes('barrel')) {
    const sys = systems.find(s => s.id === 'ferrocement-barrel-roof')
    return sys
      ? `Ferrocement Barrel Roof: ${sys.summary} Difficulty: ${sys.difficulty}. Test status: ${sys.test_status}. Est. cost: MXN ${sys.estimated_cost_mxn}.`
      : 'Ferrocement barrel roof system not found in registry.'
  }

  if (lower.includes('foam') || lower.includes('xps') || lower.includes('panel')) {
    const sys = systems.find(s => s.id === 'foam-core-cement-panel')
    return sys
      ? `Foam-Core Cement Panel: ${sys.summary} Difficulty: ${sys.difficulty}. Test status: ${sys.test_status}. Est. cost: MXN ${sys.estimated_cost_mxn}.`
      : 'Foam-Core Cement Panel system not found.'
  }

  return `I'm running in local knowledge mode (Pi Agent not configured). I can answer questions about build systems (${systems.length}), materials (${materials.length}), field notes, and beads. What would you like to know?`
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'message is required' }, { status: 400 })
    }

    // If Pi Agent is configured, proxy to it
    if (PI_AGENT_BASE_URL && PI_AGENT_API_KEY) {
      const upstream = await fetch(`${PI_AGENT_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${PI_AGENT_API_KEY}`,
        },
        body: JSON.stringify({
          message,
          context: 'infinite-architecture',
        }),
      })

      if (upstream.ok) {
        const data = await upstream.json()
        return NextResponse.json({ response: data.response ?? data.message ?? data.content })
      }
    }

    // Fallback: local knowledge base response
    const response = await localKnowledgeResponse(message)
    return NextResponse.json({ response, mode: 'local-knowledge' })
  } catch (error) {
    console.error('Pi Agent route error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

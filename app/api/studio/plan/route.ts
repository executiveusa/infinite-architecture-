import { NextRequest, NextResponse } from 'next/server'
import { isDashboardRequestAuthorized } from '@/lib/dashboard-auth'
import {
  StudioBriefSchema,
  StudioPlanInputSchema,
  buildFallbackBrief,
} from '@/lib/studio'

function extractJson(value: string) {
  const start = value.indexOf('{')
  const end = value.lastIndexOf('}')
  if (start === -1 || end <= start) return null
  try {
    return JSON.parse(value.slice(start, end + 1))
  } catch {
    return null
  }
}

function parseBrief(raw: string) {
  const candidate = extractJson(raw)
  const validated = StudioBriefSchema.safeParse(candidate)
  return validated.success ? validated.data : null
}

function plannerPrompt(message: string, projectId?: string) {
  return [
    'You are the private Infinite Architecture concept-studio planner.',
    'Return JSON only. Do not return markdown or chain-of-thought.',
    'This is concept visualization and project coordination, not licensed architectural or engineering work.',
    'Never invent supplier quotes, code compliance, permit approval, structural performance, or completed projects.',
    'Separate known facts from assumptions. Ask only questions that materially affect scope, cost, geometry, climate response, or supplier selection.',
    'Schema:',
    JSON.stringify({
      projectId: projectId ?? 'IA-STUDIO-generated-id',
      projectName: 'short name',
      summary: 'one-paragraph outcome summary',
      location: 'known location or Needs confirmation',
      propertyType: 'Airbnb / hospitality | Glamping / retreat | Off-grid property | Real-estate visualization | Biophilic property concept',
      targetUnits: 6,
      assumptions: ['assumption'],
      nextQuestions: ['only questions that materially unblock the concept'],
      conceptDirections: [
        {
          title: 'direction name',
          rationale: 'why it fits',
          supplierCategory: 'supplier category',
          visualizationFocus: 'what Blender should show',
        },
      ],
      costTemplate: [
        {
          label: 'Primary structure / supplier package',
          category: 'structure',
          sourceStatus: 'allowance',
        },
      ],
      safetyBoundary:
        'Concept visualization only. Licensed and regulated scopes require qualified local professionals.',
    }),
    'Valid sourceStatus values: verified-quote, estimate, allowance.',
    'Keep conceptDirections between 2 and 4.',
    'Include cost lines for structure, logistics, site/foundation, utilities, labor, landscape/guest areas, professional services if applicable, and contingency.',
    'User outcome:',
    message,
  ].join('\n')
}

async function planWithPiAgent(prompt: string) {
  const baseUrl = process.env.PI_AGENT_BASE_URL?.replace(/\/$/, '')
  const apiKey = process.env.PI_AGENT_API_KEY
  if (!baseUrl || !apiKey) return null

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 25_000)
  try {
    const upstream = await fetch(`${baseUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        message: prompt,
        context: 'infinite-architecture-private-concept-studio',
      }),
      signal: controller.signal,
      cache: 'no-store',
    })
    if (!upstream.ok) return null

    const data = await upstream.json()
    return String(data.response ?? data.message ?? data.content ?? '')
  } finally {
    clearTimeout(timeout)
  }
}

async function planWithVercelGateway(prompt: string) {
  const oidcToken = process.env.VERCEL_OIDC_TOKEN
  const apiKey = process.env.AI_GATEWAY_API_KEY
  const credential = apiKey || oidcToken
  if (!credential) return null

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 25_000)
  try {
    const upstream = await fetch('https://ai-gateway.vercel.sh/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${credential}`,
      },
      body: JSON.stringify({
        model: process.env.IA_STUDIO_MODEL || 'openai/gpt-5.6-sol',
        messages: [
          {
            role: 'system',
            content:
              'You are the private Infinite Architecture planning engine. Follow the JSON-only response contract exactly.',
          },
          { role: 'user', content: prompt },
        ],
      }),
      signal: controller.signal,
      cache: 'no-store',
    })
    if (!upstream.ok) return null

    const data = await upstream.json()
    return String(data.choices?.[0]?.message?.content ?? '')
  } finally {
    clearTimeout(timeout)
  }
}

export async function POST(request: NextRequest) {
  if (!isDashboardRequestAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON.' }, { status: 400 })
  }

  const parsed = StudioPlanInputSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Describe the project outcome in more detail.' },
      { status: 400 }
    )
  }

  const fallback = buildFallbackBrief(parsed.data.message, parsed.data.projectId)
  const prompt = plannerPrompt(parsed.data.message, parsed.data.projectId)

  try {
    const piRaw = await planWithPiAgent(prompt)
    if (piRaw) {
      const brief = parseBrief(piRaw)
      if (brief) return NextResponse.json({ brief, mode: 'pi-agent' })
    }
  } catch {
    // Continue to the managed model fallback.
  }

  try {
    const gatewayRaw = await planWithVercelGateway(prompt)
    if (gatewayRaw) {
      const brief = parseBrief(gatewayRaw)
      if (brief) {
        return NextResponse.json({
          brief,
          mode: `vercel-gateway:${process.env.IA_STUDIO_MODEL || 'openai/gpt-5.6-sol'}`,
        })
      }
    }
  } catch {
    // The deterministic planner keeps the private studio usable when inference is unavailable.
  }

  return NextResponse.json({ brief: fallback, mode: 'deterministic-fallback' })
}

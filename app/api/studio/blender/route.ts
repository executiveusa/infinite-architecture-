import { randomUUID } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { isDashboardRequestAuthorized } from '@/lib/dashboard-auth'
import { BlenderJobInputSchema } from '@/lib/studio'

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

  const parsed = BlenderJobInputSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Check the Blender job inputs.' }, { status: 400 })
  }

  const jobId = `IA3D-${randomUUID().slice(0, 8).toUpperCase()}`
  const spec = {
    version: 1,
    jobId,
    projectId: parsed.data.projectId,
    projectName: parsed.data.projectName,
    location: parsed.data.location,
    scene: {
      units: 'METRIC',
      coordinateSystem: 'Z_UP',
      structureType: parsed.data.structureType,
      targetUnits: parsed.data.targetUnits,
    },
    outputs: parsed.data.outputs,
    constraints: {
      arbitraryPythonAllowed: false,
      conceptVisualizationOnly: true,
      structuralCertification: false,
      preserveEditableBlendFile: true,
    },
  }

  const workerUrl = process.env.BLENDER_WORKER_URL?.replace(/\/$/, '')
  const workerKey = process.env.BLENDER_WORKER_API_KEY

  if (!workerUrl || !workerKey) {
    return NextResponse.json(
      {
        status: 'draft',
        workerConfigured: false,
        jobId,
        spec,
        next: 'Connect a controlled Blender worker to queue this bounded job spec.',
      },
      { status: 202 }
    )
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 30_000)
    const upstream = await fetch(`${workerUrl}/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${workerKey}`,
      },
      body: JSON.stringify(spec),
      signal: controller.signal,
      cache: 'no-store',
    })
    clearTimeout(timeout)

    if (!upstream.ok) {
      return NextResponse.json(
        { error: 'Blender worker rejected the job.', jobId, spec },
        { status: 502 }
      )
    }

    const data = await upstream.json().catch(() => ({}))
    return NextResponse.json({
      status: data.status ?? 'queued',
      workerConfigured: true,
      jobId: data.jobId ?? jobId,
      spec,
    })
  } catch {
    return NextResponse.json(
      { error: 'Blender worker is unavailable.', jobId, spec },
      { status: 502 }
    )
  }
}

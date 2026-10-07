import { NextRequest, NextResponse } from 'next/server'
import { isDashboardRequestAuthorized } from '@/lib/dashboard-auth'
import { EstimateInputSchema, calculateOffer } from '@/lib/studio'

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

  const parsed = EstimateInputSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Check the estimate inputs.' }, { status: 400 })
  }

  return NextResponse.json({ estimate: calculateOffer(parsed.data) })
}

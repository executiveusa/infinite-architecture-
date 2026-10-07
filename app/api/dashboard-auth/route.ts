import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import {
  DASHBOARD_COOKIE,
  dashboardToken,
  validDashboardSecret,
} from '@/lib/dashboard-auth'

const LoginSchema = z.object({
  secret: z.string().min(12).max(512),
})

export async function POST(request: NextRequest) {
  const configuredSecret = process.env.DASHBOARD_SECRET
  if (!configuredSecret) {
    return NextResponse.json(
      { error: 'Dashboard access is not configured.' },
      { status: 503 }
    )
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const parsed = LoginSchema.safeParse(body)
  if (!parsed.success || !validDashboardSecret(parsed.data.secret, configuredSecret)) {
    return NextResponse.json({ error: 'Access denied.' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set(DASHBOARD_COOKIE, dashboardToken(configuredSecret), {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 12,
  })
  return response
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true })
  response.cookies.set(DASHBOARD_COOKIE, '', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  })
  return response
}

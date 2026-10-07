import { createHash } from 'node:crypto'
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

type Attempt = { count: number; resetAt: number }
const attempts = new Map<string, Attempt>()
const WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 8

function clientKey(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const raw = forwarded || request.headers.get('x-real-ip') || 'unknown'
  return createHash('sha256').update(raw).digest('hex')
}

function rateLimited(key: string) {
  const now = Date.now()
  const current = attempts.get(key)
  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  current.count += 1
  return current.count > MAX_ATTEMPTS
}

function clearAttempts(key: string) {
  attempts.delete(key)
}

export async function POST(request: NextRequest) {
  const key = clientKey(request)
  if (rateLimited(key)) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again later.' },
      { status: 429 }
    )
  }

  const configuredSecret = process.env.DASHBOARD_SECRET
  if (!configuredSecret || configuredSecret.length < 24) {
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

  clearAttempts(key)
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

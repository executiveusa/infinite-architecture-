import { createHash, timingSafeEqual } from 'node:crypto'
import type { NextRequest } from 'next/server'

export const DASHBOARD_COOKIE = 'ia_dashboard_v1'

function hash(value: string) {
  return createHash('sha256').update(value).digest('hex')
}

export function dashboardToken(secret: string) {
  return hash(`infinite-architecture-dashboard-v1:${secret}`)
}

export function validDashboardToken(token: string | undefined, secret: string | undefined) {
  if (!token || !secret) return false
  const expected = Buffer.from(dashboardToken(secret))
  const provided = Buffer.from(token)
  return provided.length === expected.length && timingSafeEqual(provided, expected)
}

export function validDashboardSecret(candidate: string, secret: string) {
  const expected = Buffer.from(hash(secret))
  const provided = Buffer.from(hash(candidate))
  return provided.length === expected.length && timingSafeEqual(provided, expected)
}

export function isDashboardRequestAuthorized(request: NextRequest) {
  const secret = process.env.DASHBOARD_SECRET
  const token = request.cookies.get(DASHBOARD_COOKIE)?.value
  return validDashboardToken(token, secret)
}

import type { Metadata } from 'next'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { DASHBOARD_COOKIE, validDashboardToken } from '@/lib/dashboard-auth'

export const metadata: Metadata = {
  title: 'Dashboard — Infinite Architecture',
  description: 'Private owner dashboard',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

export default async function Layout({ children }: { children: React.ReactNode }) {
  const secret = process.env.DASHBOARD_SECRET
  const cookieStore = await cookies()
  const token = cookieStore.get(DASHBOARD_COOKIE)?.value

  if (!validDashboardToken(token, secret)) {
    redirect('/studio-access')
  }

  return <DashboardLayout>{children}</DashboardLayout>
}

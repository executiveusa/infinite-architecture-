import type { Metadata } from 'next'
import DashboardAccess from '@/components/dashboard/DashboardAccess'

export const metadata: Metadata = {
  title: 'Private Studio Access — Infinite Architecture',
  robots: { index: false, follow: false },
}

export default function StudioAccessPage() {
  return <DashboardAccess />
}

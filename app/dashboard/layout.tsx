import type { Metadata } from 'next'
import DashboardLayout from '@/components/dashboard/DashboardLayout'

export const metadata: Metadata = {
  title: 'Dashboard — Infinite Architecture',
  description: 'Private owner dashboard',
  robots: { index: false, follow: false },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>
}

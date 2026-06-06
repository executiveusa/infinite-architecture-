import { getDashboardStats, getBeads, getSocialQueue } from '@/lib/data'
import CommandCenter from '@/components/dashboard/CommandCenter'

export default async function DashboardPage() {
  const [stats, beads, socialQueue] = await Promise.all([
    getDashboardStats(),
    getBeads(),
    getSocialQueue(),
  ])

  return (
    <CommandCenter
      stats={stats}
      beads={beads}
      socialQueue={socialQueue}
    />
  )
}

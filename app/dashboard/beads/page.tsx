import { getBeads } from '@/lib/data'
import BeadsTimeline from '@/components/dashboard/BeadsTimeline'

export default async function BeadsPage() {
  const beads = await getBeads()
  return <BeadsTimeline beads={beads} />
}

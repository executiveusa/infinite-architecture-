import { getSocialQueue } from '@/lib/data'
import SocialStudio from '@/components/dashboard/SocialStudio'

export default async function SocialPage() {
  const queue = await getSocialQueue()
  return <SocialStudio queue={queue} />
}

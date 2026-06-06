import { getMaterials } from '@/lib/data'
import MaterialRegistry from '@/components/dashboard/MaterialRegistry'

export default async function DashboardMaterialsPage() {
  const materials = await getMaterials()
  return <MaterialRegistry materials={materials} />
}

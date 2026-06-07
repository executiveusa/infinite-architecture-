import Hero from '@/components/landing/Hero'
import Mission from '@/components/landing/Mission'
import BuildSystemGrid from '@/components/landing/BuildSystemGrid'
import MaterialLab from '@/components/landing/MaterialLab'
import FieldNotesPreview from '@/components/landing/FieldNotesPreview'
import AgentTeaser from '@/components/landing/AgentTeaser'
import { getBuildSystems, getMaterials } from '@/lib/data'

export default async function HomePage() {
  const [buildSystems, materials] = await Promise.all([
    getBuildSystems(),
    getMaterials(),
  ])

  const featuredSystems = buildSystems.slice(0, 6)
  const featuredMaterials = materials.slice(0, 6)

  return (
    <>
      <Hero />
      <Mission />
      <BuildSystemGrid systems={featuredSystems} />
      <MaterialLab materials={featuredMaterials} />
      <FieldNotesPreview />
      <AgentTeaser />
    </>
  )
}

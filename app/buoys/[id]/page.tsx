import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { BuoyProfile } from "@/components/buoy-profile"

interface Props {
  params: Promise<{ id: string }>
}

export default async function BuoyDetailPage({ params }: Props) {
  const { id } = await params

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <DashboardHeader />
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Buoy {id}</h1>
            <p className="text-muted-foreground">Detailed buoy information and sensor readings</p>
          </div>
          <BuoyProfile buoyId={id} />
        </div>
      </main>
    </div>
  )
}

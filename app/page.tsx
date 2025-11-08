"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { OverviewCards } from "@/components/overview-cards"
import { WaterLevelChart } from "@/components/water-level-chart"
import { BuoyStatusMap } from "@/components/buoy-status-map"
import { Buoy3DViewer } from "@/components/buoy-3d-viewer"
import { AlertsChart } from "@/components/alerts-chart"

export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    const user = getCurrentUser()
    if (!user) {
      router.push("/login")
    }
  }, [router])

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <DashboardHeader />
        <div className="p-4 lg:p-6 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Monitor real-time flood data across all stations</p>
          </div>
          <OverviewCards />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <WaterLevelChart />
            </div>
            <div className="space-y-6">
              <Buoy3DViewer 
                title="Buoy Information" 
                description="Interactive 3D model of IoT monitoring buoy"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AlertsChart />
            <BuoyStatusMap />
          </div>
        </div>
      </main>
    </div>
  )
}

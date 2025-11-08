"use client"

import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { MapView } from "@/components/map-view-enhanced"
import { BuoyMarkerInfo } from "@/components/buoy-marker-info"
import { useState } from "react"

export default function MapPage() {
  const [selectedBuoy, setSelectedBuoy] = useState<string | null>(null)

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        <DashboardHeader />
        <div className="h-[calc(100vh-73px)] flex flex-col md:flex-row">
          <div className="flex-1 relative">
            <MapView onBuoySelect={setSelectedBuoy} />
          </div>
          {selectedBuoy && (
            <div className="w-full md:w-80 border-l border-border bg-card p-4 overflow-auto">
              <BuoyMarkerInfo buoyId={selectedBuoy} />
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

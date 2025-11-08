"use client"

import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { AnalyticsFilters } from "@/components/analytics-filters"
import { WaterLevelAnalytics } from "@/components/water-level-analytics"
import { TurbulenceHeatmap } from "@/components/turbulence-heatmap"
import { RiskHeatmap } from "@/components/risk-heatmap"
import { ExportData } from "@/components/export-data"

export default function AnalyticsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <DashboardHeader />
        <div className="p-6 space-y-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Data Analytics</h1>
            <p className="text-muted-foreground">Comprehensive flood monitoring analysis and insights</p>
          </div>

          <AnalyticsFilters />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WaterLevelAnalytics />
            <TurbulenceHeatmap />
          </div>

          <RiskHeatmap />
          <ExportData />
        </div>
      </main>
    </div>
  )
}

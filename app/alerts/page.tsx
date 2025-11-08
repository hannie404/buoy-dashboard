"use client"

import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { AlertsList } from "@/components/alerts-list"
import { AlertsChart } from "@/components/alerts-chart"

export default function AlertsPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <DashboardHeader />
        <div className="p-6 space-y-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Alerts & Notifications</h1>
            <p className="text-muted-foreground">Real-time alerts and system notifications</p>
          </div>

          <AlertsChart />
          <AlertsList />
        </div>
      </main>
    </div>
  )
}

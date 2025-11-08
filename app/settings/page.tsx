"use client"

import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { SettingsPanel } from "@/components/settings-panel"
import { useEffect, useState } from "react"
import { getCurrentUser } from "@/lib/auth"

export default function SettingsPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
  }, [])

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <DashboardHeader />
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground">Manage system configuration and preferences</p>
          </div>
          {user && <SettingsPanel user={user} />}
        </div>
      </main>
    </div>
  )
}

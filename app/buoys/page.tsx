"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { getCurrentUser } from "@/lib/auth"
import { Sidebar } from "@/components/sidebar"
import { DashboardHeader } from "@/components/dashboard-header"
import { BuoysList } from "@/components/buoys-list"

export default function BuoysPage() {
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
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground">Buoy Management</h1>
            <p className="text-muted-foreground">Monitor and manage all deployed buoys</p>
          </div>
          <BuoysList />
        </div>
      </main>
    </div>
  )
}

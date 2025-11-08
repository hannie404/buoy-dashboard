"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Signal } from "lucide-react"
import { AddBuoyModal } from "@/components/add-buoy-modal"
import { mockBuoys, type Buoy } from "@/lib/mock-data"

export function BuoysList() {
  const [selectedBuoy, setSelectedBuoy] = useState<string | null>(null)
  const [buoysData, setBuoysData] = useState<Buoy[]>(mockBuoys)

  const handleAddBuoy = (newBuoy: Buoy) => {
    setBuoysData([...buoysData, newBuoy])
  }

  const getStatusColor = (status: string) => {
    return status === "online"
      ? "bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300"
      : "bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300"
  }

  const getSignalColor = (signal: number) => {
    if (signal >= 85) return "text-green-600"
    if (signal >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getBatteryColor = (battery: number) => {
    if (battery >= 80) return "bg-green-500"
    if (battery >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <AddBuoyModal onAdd={handleAddBuoy} />
      </div>

      <div className="overflow-x-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-primary">Active Buoys</CardTitle>
            <CardDescription>{buoysData.length} buoys deployed</CardDescription>
          </CardHeader>
          <CardContent>
            <table className="w-full">
              <thead>
                <tr className="border-b border-border text-left text-sm font-semibold text-muted-foreground">
                  <th className="pb-3 px-4">Buoy ID</th>
                  <th className="pb-3 px-4">Location</th>
                  <th className="pb-3 px-4">River</th>
                  <th className="pb-3 px-4">Status</th>
                  <th className="pb-3 px-4">Signal</th>
                  <th className="pb-3 px-4">Battery</th>
                  <th className="pb-3 px-4">Water Level</th>
                  <th className="pb-3 px-4">Last Tx</th>
                  <th className="pb-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {buoysData.map((buoy) => (
                  <tr key={buoy.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="py-4 px-4 font-medium text-primary">{buoy.id}</td>
                    <td className="py-4 px-4 text-sm">{buoy.name}</td>
                    <td className="py-4 px-4 text-sm">{buoy.river}</td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(buoy.status === "offline" ? "offline" : "online")}>
                        {buoy.status === "offline" ? "Offline" : "Online"}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Signal size={14} className={getSignalColor(buoy.signalStrength)} />
                        <span className="text-sm">{buoy.signalStrength}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getBatteryColor(buoy.batteryLevel)}`}
                            style={{ width: `${buoy.batteryLevel}%` }}
                          />
                        </div>
                        <span className="text-xs">{buoy.batteryLevel}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm">{buoy.waterLevel}m</td>
                    <td className="py-4 px-4 text-xs text-muted-foreground">
                      {new Date(buoy.lastTransmission).toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <Link href={`/buoys/${buoy.id}`}>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
